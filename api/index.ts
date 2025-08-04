import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { initializeVault } from "../server/secure-admin-vault";

const createApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Initialize secure vault
  initializeVault();

  // Register all routes
  await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  return app;
};

// Export for Vercel
export default createApp();