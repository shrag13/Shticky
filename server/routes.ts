import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getSession, isAuthenticated, hashPassword, verifyPassword } from "./auth";
import { insertApplicationSchema, insertPaymentMethodSchema, insertQrCodeSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(getSession());

  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await verifyPassword(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.userId = user.id;
      res.json({ message: "Login successful", user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logout successful" });
    });
  });

  app.get('/api/auth/user', async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Application routes
  app.post('/api/applications', async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(applicationData.email);
      if (existingUser) {
        return res.status(400).json({ message: "An account with this email already exists" });
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(applicationData.passwordHash);
      
      const application = await storage.submitApplication({
        ...applicationData,
        passwordHash: hashedPassword,
      });
      
      res.json(application);
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  app.get('/api/applications/me', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const application = await storage.getApplicationByUserId(userId);
      res.json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  // Admin routes
  app.get('/api/admin/applications', isAuthenticated, async (req, res) => {
    try {
      // TODO: Add admin role check
      const applications = await storage.getPendingApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching pending applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.patch('/api/admin/applications/:id/review', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const reviewedBy = req.session.userId;
      
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      // Get the application first
      const applications = await storage.getPendingApplications();
      const application = applications.find(app => app.id === id);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      // Review the application
      const reviewedApplication = await storage.reviewApplication(id, status, reviewedBy);
      
      // If approved, create the user account
      if (status === 'approved') {
        const newUser = await storage.createUser({
          email: application.email,
          passwordHash: application.passwordHash,
          firstName: application.fullName.split(' ')[0],
          lastName: application.fullName.split(' ').slice(1).join(' ') || '',
          profileImageUrl: null,
          lastDismissedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        // You could update the application with the new userId here if needed
      }
      
      res.json(reviewedApplication);
    } catch (error) {
      console.error("Error reviewing application:", error);
      res.status(500).json({ message: "Failed to review application" });
    }
  });

  // Payment method routes
  app.post('/api/payment-methods', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
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

  app.get('/api/payment-methods/me', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const paymentMethod = await storage.getPaymentMethodByUserId(userId);
      res.json(paymentMethod);
    } catch (error) {
      console.error("Error fetching payment method:", error);
      res.status(500).json({ message: "Failed to fetch payment method" });
    }
  });

  // QR code routes
  app.post('/api/qr-codes/claim', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const { claimCode, placementDescription } = req.body;
      
      if (!claimCode || typeof claimCode !== 'string') {
        return res.status(400).json({ message: "Claim code is required" });
      }

      if (!placementDescription || typeof placementDescription !== 'string') {
        return res.status(400).json({ message: "Placement description is required" });
      }

      // Validate Shticky code format (SH-T1-XXX)
      const shtickPattern = /^SH-T\d+-[A-Z0-9]+$/i;
      if (!shtickPattern.test(claimCode)) {
        return res.status(400).json({ message: "Invalid Shticky code format. Must be SH-T1-XXX format" });
      }
      
      // Check if user has approved application
      const application = await storage.getApplicationByUserId(userId);
      if (!application || application.status !== 'approved') {
        return res.status(403).json({ message: "Application must be approved to claim stickers" });
      }
      
      // Check if QR code already exists
      const existingQrCode = await storage.getQrCodeById(claimCode);
      if (existingQrCode) {
        return res.status(400).json({ message: "This Shticky code has already been claimed" });
      }
      
      // Check tier limits
      const userStats = await storage.getUserStats(userId);
      const maxStickers = userStats.currentTier === 1 ? 1 : userStats.currentTier === 2 ? 2 : 3;
      
      if (userStats.activeStickers >= maxStickers) {
        return res.status(400).json({ message: `Maximum ${maxStickers} stickers allowed for your tier` });
      }
      
      const qrCode = await storage.claimQrCode(claimCode, userId, placementDescription);
      res.json(qrCode);
    } catch (error) {
      console.error("Error claiming QR code:", error);
      res.status(500).json({ message: "Failed to claim QR code" });
    }
  });

  app.get('/api/qr-codes/me', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
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
  app.get('/api/users/me/stats', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Notification preferences routes
  app.get('/api/notifications/preferences', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const preferences = await storage.getNotificationPreferences(userId);
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
      res.status(500).json({ message: "Failed to fetch notification preferences" });
    }
  });

  app.post('/api/notifications/dismiss', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
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
