import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertApplicationSchema, insertPaymentMethodSchema, insertQrCodeSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Application routes
  app.post('/api/applications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applicationData = insertApplicationSchema.parse({
        ...req.body,
        userId,
      });
      
      // Check if user already has an application
      const existingApplication = await storage.getApplicationByUserId(userId);
      if (existingApplication) {
        return res.status(400).json({ message: "Application already submitted" });
      }
      
      const application = await storage.submitApplication(applicationData);
      res.json(application);
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  app.get('/api/applications/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const application = await storage.getApplicationByUserId(userId);
      res.json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  // Admin routes
  app.get('/api/admin/applications', isAuthenticated, async (req: any, res) => {
    try {
      // TODO: Add admin role check
      const applications = await storage.getPendingApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching pending applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.patch('/api/admin/applications/:id/review', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const reviewedBy = req.user.claims.sub;
      
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const application = await storage.reviewApplication(id, status, reviewedBy);
      res.json(application);
    } catch (error) {
      console.error("Error reviewing application:", error);
      res.status(500).json({ message: "Failed to review application" });
    }
  });

  // Payment method routes
  app.post('/api/payment-methods', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const paymentMethodData = insertPaymentMethodSchema.parse({
        ...req.body,
        userId,
      });
      
      const paymentMethod = await storage.savePaymentMethod(paymentMethodData);
      res.json(paymentMethod);
    } catch (error) {
      console.error("Error saving payment method:", error);
      res.status(500).json({ message: "Failed to save payment method" });
    }
  });

  app.get('/api/payment-methods/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const paymentMethod = await storage.getPaymentMethodByUserId(userId);
      res.json(paymentMethod);
    } catch (error) {
      console.error("Error fetching payment method:", error);
      res.status(500).json({ message: "Failed to fetch payment method" });
    }
  });

  // QR code routes
  app.post('/api/qr-codes/claim', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { qrCodeId } = req.body;
      
      if (!qrCodeId || typeof qrCodeId !== 'string') {
        return res.status(400).json({ message: "QR code ID is required" });
      }
      
      // Check if user has approved application
      const application = await storage.getApplicationByUserId(userId);
      if (!application || application.status !== 'approved') {
        return res.status(403).json({ message: "Application must be approved to claim stickers" });
      }
      
      // Check if QR code already exists
      const existingQrCode = await storage.getQrCodeById(qrCodeId);
      if (existingQrCode) {
        return res.status(400).json({ message: "QR code already claimed" });
      }
      
      // Check tier limits
      const userStats = await storage.getUserStats(userId);
      const maxStickers = userStats.currentTier === 1 ? 1 : userStats.currentTier === 2 ? 2 : 3;
      
      if (userStats.activeStickers >= maxStickers) {
        return res.status(400).json({ message: `Maximum ${maxStickers} stickers allowed for your tier` });
      }
      
      const qrCode = await storage.claimQrCode(qrCodeId, userId);
      res.json(qrCode);
    } catch (error) {
      console.error("Error claiming QR code:", error);
      res.status(500).json({ message: "Failed to claim QR code" });
    }
  });

  app.get('/api/qr-codes/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const qrCodes = await storage.getUserQrCodes(userId);
      res.json(qrCodes);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      res.status(500).json({ message: "Failed to fetch QR codes" });
    }
  });

  // Public scan route (no authentication required)
  app.post('/api/scans/:qrCodeId', async (req, res) => {
    try {
      const { qrCodeId } = req.params;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');
      
      const qrCode = await storage.getQrCodeById(qrCodeId);
      if (!qrCode || !qrCode.isActive) {
        return res.status(404).json({ message: "QR code not found or inactive" });
      }
      
      const scan = await storage.recordScan({
        qrCodeId,
        ipAddress,
        userAgent,
      });
      
      res.json({ message: "Scan recorded successfully", scan });
    } catch (error) {
      console.error("Error recording scan:", error);
      res.status(500).json({ message: "Failed to record scan" });
    }
  });

  // User stats route
  app.get('/api/users/me/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Notification preferences routes
  app.get('/api/notifications/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferences = await storage.getNotificationPreferences(userId);
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
      res.status(500).json({ message: "Failed to fetch notification preferences" });
    }
  });

  app.post('/api/notifications/dismiss', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.updateNotificationDismissal(userId);
      res.json({ message: "Notification dismissed" });
    } catch (error) {
      console.error("Error dismissing notification:", error);
      res.status(500).json({ message: "Failed to dismiss notification" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
