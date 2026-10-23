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

app.use(
  helmet({
    crossOriginOpenerPolicy: {
      policy: "same-origin-allow-popups",
    },
  }),
);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

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

// Health endpoint
app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "EduSchoolHub API is running",
  });
});

// Vercel serverless handler
let dbConnectionPromise;

app.use(async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
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
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Export Express app for Vercel
module.exports = app;

// Run a normal server locally
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  (async () => {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from .env");
      }

      await connectDB();

      app.listen(PORT, () => {
        console.log(`EduSchoolHub server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Server startup failed:", error.message);
      process.exit(1);
    }
  })();
}
