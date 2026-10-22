
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
  })
);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
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

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/google-auth", googleAuthRoutes);
app.use("/api/demo-requests", demoRoutes);
// Contact enquiry API
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "EduSchoolHub API is running",
  });
});

// Start server after database connection
async function startServer() {
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
}

startServer();
