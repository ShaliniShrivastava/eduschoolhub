
const express = require("express");
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

// Middleware
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Controllers
const {
  getHomePage,
  getHomePageForAdmin,
  saveHomePageDraft,
  publishHomePage,
} = require("../controllers/mainWebsite/homeController");

const {
  getAboutPage,
  getAboutPageForAdmin,
  saveAboutPageDraft,
  publishAboutPage,
} = require("../controllers/mainWebsite/aboutController");

const {
  getFeaturesPage,
  getFeaturesPageForAdmin,
  saveFeaturesPageDraft,
  publishFeaturesPage,
} = require("../controllers/mainWebsite/featuresController");

const {
  getModulesPage,
  getModulesPageForAdmin,
  saveModulesPageDraft,
  publishModulesPage,
} = require("../controllers/mainWebsite/modulesController");

const {
  getPricingPage,
  getPricingPageForAdmin,
  savePricingPageDraft,
  publishPricingPage,
} = require("../controllers/mainWebsite/pricingController");

const {
  submitContactEnquiry,
  getContactEnquiries,
} = require("../controllers/mainWebsite/contactController");

const {
  createDemoRequest,
  getDemoRequests,
  updateDemoRequest,
} = require("../controllers/mainWebsite/demoController");

// Rate Limiters
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries submitted. Please try again later.",
  },
});

const adminOnly = [
  authMiddleware,
  roleMiddleware("superAdmin"),
];

// HOME PAGE
router.get("/", getHomePage);
router.get("/home/admin", ...adminOnly, getHomePageForAdmin);
router.put("/home/draft", ...adminOnly, saveHomePageDraft);
router.patch("/home/publish", ...adminOnly, publishHomePage);

// ABOUT PAGE
router.get("/about", getAboutPage);
router.get("/about/admin", ...adminOnly, getAboutPageForAdmin);
router.put("/about/draft", ...adminOnly, saveAboutPageDraft);
router.patch("/about/publish", ...adminOnly, publishAboutPage);

// FEATURES PAGE
router.get("/features", getFeaturesPage);
router.get("/features/admin", ...adminOnly, getFeaturesPageForAdmin);
router.put("/features/draft", ...adminOnly, saveFeaturesPageDraft);
router.patch("/features/publish", ...adminOnly, publishFeaturesPage);

// MODULES PAGE
router.get("/modules", getModulesPage);
router.get("/modules/admin", ...adminOnly, getModulesPageForAdmin);
router.put("/modules/draft", ...adminOnly, saveModulesPageDraft);
router.patch("/modules/publish", ...adminOnly, publishModulesPage);

// PRICING PAGE
router.get("/pricing", getPricingPage);
router.get("/pricing/admin", ...adminOnly, getPricingPageForAdmin);
router.put("/pricing/draft", ...adminOnly, savePricingPageDraft);
router.patch("/pricing/publish", ...adminOnly, publishPricingPage);

// CONTACT
router.post("/contact", contactLimiter, submitContactEnquiry);
router.get("/contact", ...adminOnly, getContactEnquiries);

// DEMO REQUESTS
router.post("/demo", createDemoRequest);
router.get("/demo", ...adminOnly, getDemoRequests);
router.patch("/demo/:id", ...adminOnly, updateDemoRequest);

module.exports = router;
