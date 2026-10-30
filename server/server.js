require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const demoRoutes = require("./routes/demoRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginOpenerPolicy: {
      policy: "same-origin-allow-popups",
    },
  }),
);

// CORS configuration for deployed and local frontends
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      const normalizedOrigin = origin?.replace(/\/+$/, "");

      if (!origin || allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Health endpoint
app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "EduSchoolHub API is running",
  });
});

// Database connection cache for Vercel
let dbConnectionPromise;

const ensureDBConnection = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB().catch((error) => {
        dbConnectionPromise = null;
        throw error;
      });
    }

    await dbConnectionPromise;
    return next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

// Ensure database connection before API routes
app.use("/api/auth", ensureDBConnection);
app.use("/api/superadmin", ensureDBConnection);
app.use("/api/google-auth", ensureDBConnection);
app.use("/api/demo-requests", ensureDBConnection);
app.use("/api/contact", ensureDBConnection);

// Authentication rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

// Existing routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/google-auth", googleAuthRoutes);
app.use("/api/demo-requests", demoRoutes);
app.use("/api/contact", contactRoutes);

// Export Express app for Vercel
module.exports = app;

// Run local server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  (async () => {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from .env");
      }

      await connectDB();

      if (process.env.NODE_ENV !== "production") {
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      }
    } catch (error) {
      console.error("Server startup failed:", error.message);
      process.exitCode = 1;
    }
  })();
}
