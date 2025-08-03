import {
  users,
  applications,
  paymentMethods,
  qrCodes,
  scans,
  monthlyPayouts,
  notificationPreferences,
  type User,
  type InsertUser,
  type Application,
  type InsertApplication,
  type PaymentMethod,
  type InsertPaymentMethod,
  type QrCode,
  type InsertQrCode,
  type Scan,
  type InsertScan,
  type MonthlyPayout,
  type NotificationPreference,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Application operations
  submitApplication(application: InsertApplication): Promise<Application>;
  getApplicationByUserId(userId: string): Promise<Application | undefined>;
  getApplicationByEmail(email: string): Promise<Application | undefined>;
  getPendingApplications(): Promise<Application[]>;
  reviewApplication(applicationId: string, status: 'approved' | 'rejected', reviewedBy: string): Promise<Application>;
  
  // Payment method operations
  savePaymentMethod(paymentMethod: InsertPaymentMethod): Promise<PaymentMethod>;
  getPaymentMethodByUserId(userId: string): Promise<PaymentMethod | undefined>;
  
  // QR code operations
  claimQrCode(qrCodeId: string, userId: string): Promise<QrCode>;
  getQrCodeById(qrCodeId: string): Promise<QrCode | undefined>;
  getUserQrCodes(userId: string): Promise<QrCode[]>;
  updateQrCodeStats(qrCodeId: string): Promise<void>;
  
  // Scan operations
  recordScan(scan: InsertScan): Promise<Scan>;
  
  // User stats operations
  getUserStats(userId: string): Promise<{
    totalEarnings: number;
    totalScans: number;
    activeStickers: number;
    currentTier: number;
  }>;
  
  // Monthly payout operations
  getUsersEligibleForPayout(): Promise<User[]>;
  createMonthlyPayout(userId: string, amount: number, month: number, year: number): Promise<MonthlyPayout>;
  
  // Notification operations
  getNotificationPreferences(userId: string): Promise<NotificationPreference | undefined>;
  updateNotificationDismissal(userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async submitApplication(application: InsertApplication): Promise<Application> {
    const [newApplication] = await db
      .insert(applications)
      .values(application)
      .returning();
    return newApplication;
  }

  async getApplicationByUserId(userId: string): Promise<Application | undefined> {
    const [application] = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId))
      .orderBy(desc(applications.submittedAt))
      .limit(1);
    return application;
  }

  async getApplicationByEmail(email: string): Promise<Application | undefined> {
    const [application] = await db
      .select()
      .from(applications)
      .where(eq(applications.email, email))
      .orderBy(desc(applications.submittedAt))
      .limit(1);
    return application;
  }

  async getPendingApplications(): Promise<Application[]> {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.status, 'pending'))
      .orderBy(desc(applications.submittedAt));
  }

  async reviewApplication(applicationId: string, status: 'approved' | 'rejected', reviewedBy: string): Promise<Application> {
    const [application] = await db
      .update(applications)
      .set({
        status,
        reviewedBy,
        reviewedAt: new Date(),
      })
      .where(eq(applications.id, applicationId))
      .returning();
    return application;
  }

  async savePaymentMethod(paymentMethod: InsertPaymentMethod): Promise<PaymentMethod> {
    // Deactivate existing payment methods for this user
    await db
      .update(paymentMethods)
      .set({ isActive: false })
      .where(eq(paymentMethods.userId, paymentMethod.userId));

    const [newPaymentMethod] = await db
      .insert(paymentMethods)
      .values(paymentMethod)
      .returning();
    return newPaymentMethod;
  }

  async getPaymentMethodByUserId(userId: string): Promise<PaymentMethod | undefined> {
    const [paymentMethod] = await db
      .select()
      .from(paymentMethods)
      .where(and(
        eq(paymentMethods.userId, userId),
        eq(paymentMethods.isActive, true)
      ))
      .limit(1);
    return paymentMethod;
  }

  async claimQrCode(qrCodeId: string, userId: string, placementDescription?: string): Promise<QrCode> {
    const [qrCode] = await db
      .insert(qrCodes)
      .values({
        id: qrCodeId,
        userId,
        placementDescription: placementDescription || '',
        claimedAt: new Date(),
      })
      .returning();
    return qrCode;
  }

  async getQrCodeById(qrCodeId: string): Promise<QrCode | undefined> {
    const [qrCode] = await db
      .select()
      .from(qrCodes)
      .where(eq(qrCodes.id, qrCodeId));
    return qrCode;
  }

  async getUserQrCodes(userId: string): Promise<QrCode[]> {
    return await db
      .select()
      .from(qrCodes)
      .where(and(
        eq(qrCodes.userId, userId),
        eq(qrCodes.isActive, true)
      ))
      .orderBy(desc(qrCodes.claimedAt));
  }

  async updateQrCodeStats(qrCodeId: string): Promise<void> {
    await db
      .update(qrCodes)
      .set({
        totalScans: sql`${qrCodes.totalScans} + 1`,
        totalEarnings: sql`${qrCodes.totalEarnings} + 0.01`,
      })
      .where(eq(qrCodes.id, qrCodeId));
  }

  async recordScan(scan: InsertScan): Promise<Scan> {
    const [newScan] = await db
      .insert(scans)
      .values(scan)
      .returning();
    
    // Update QR code stats
    await this.updateQrCodeStats(scan.qrCodeId);
    
    return newScan;
  }

  async getUserStats(userId: string): Promise<{
    totalEarnings: number;
    totalScans: number;
    activeStickers: number;
    currentTier: number;
  }> {
    const userQrCodes = await this.getUserQrCodes(userId);
    
    const totalEarnings = userQrCodes.reduce((sum, qr) => sum + parseFloat(qr.totalEarnings), 0);
    const totalScans = userQrCodes.reduce((sum, qr) => sum + qr.totalScans, 0);
    const activeStickers = userQrCodes.length;
    
    let currentTier = 1;
    if (totalScans >= 1000) currentTier = 3;
    else if (totalScans >= 500) currentTier = 2;
    
    return {
      totalEarnings,
      totalScans,
      activeStickers,
      currentTier,
    };
  }

  async getUsersEligibleForPayout(): Promise<User[]> {
    const result = await db
      .select({
        user: users,
        totalEarnings: sql<number>`COALESCE(SUM(${qrCodes.totalEarnings}), 0)`,
      })
      .from(users)
      .leftJoin(qrCodes, eq(users.id, qrCodes.userId))
      .groupBy(users.id)
      .having(sql`COALESCE(SUM(${qrCodes.totalEarnings}), 0) >= 5`);
    
    return result.map(r => r.user);
  }

  async createMonthlyPayout(userId: string, amount: number, month: number, year: number): Promise<MonthlyPayout> {
    const paymentMethod = await this.getPaymentMethodByUserId(userId);
    
    const [payout] = await db
      .insert(monthlyPayouts)
      .values({
        userId,
        amount: amount.toString(),
        month,
        year,
        paymentMethodId: paymentMethod?.id,
      })
      .returning();
    return payout;
  }

  async getNotificationPreferences(userId: string): Promise<NotificationPreference | undefined> {
    const [preferences] = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId));
    
    if (!preferences) {
      // Create default preferences
      const [newPreferences] = await db
        .insert(notificationPreferences)
        .values({ userId })
        .returning();
      return newPreferences;
    }
    
    return preferences;
  }

  async updateNotificationDismissal(userId: string): Promise<void> {
    await db
      .insert(notificationPreferences)
      .values({
        userId,
        lastDismissedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: notificationPreferences.userId,
        set: {
          lastDismissedAt: new Date(),
        },
      });
  }
}

export const storage = new DatabaseStorage();
