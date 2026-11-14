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
  getMyContactEnquiries,
  getContactEnquiryById,
  deleteContactEnquiry,
} = require("../controllers/mainWebsite/contactController");

const {
  createDemoRequest,
  getDemoRequests,
  getMyDemoRequests,
  getDemoRequestById,
  updateDemoRequest,
  deleteDemoRequest,
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

const adminOnly = [authMiddleware, roleMiddleware("superAdmin")];

// HOME PAGE
router.get("/", getHomePage);
router.get("/home/admin", ...adminOnly, getHomePageForAdmin);
router.put("/home/draft", ...adminOnly, saveHomePageDraft);
router.post("/home/publish", ...adminOnly, publishHomePage);

// ABOUT PAGE
router.get("/about", getAboutPage);
router.get("/about/admin", ...adminOnly, getAboutPageForAdmin);
router.put("/about/draft", ...adminOnly, saveAboutPageDraft);
router.post("/about/publish", ...adminOnly, publishAboutPage);

// FEATURES PAGE
router.get("/features", getFeaturesPage);
router.get("/features/admin", ...adminOnly, getFeaturesPageForAdmin);
router.put("/features/draft", ...adminOnly, saveFeaturesPageDraft);
router.post("/features/publish", ...adminOnly, publishFeaturesPage);

// MODULES PAGE
router.get("/modules", getModulesPage);
router.get("/modules/admin", ...adminOnly, getModulesPageForAdmin);
router.put("/modules/draft", ...adminOnly, saveModulesPageDraft);
router.post("/modules/publish", ...adminOnly, publishModulesPage);

// PRICING PAGE
router.get("/pricing", getPricingPage);
router.get("/pricing/admin", ...adminOnly, getPricingPageForAdmin);
router.put("/pricing/draft", ...adminOnly, savePricingPageDraft);
router.post("/pricing/publish", ...adminOnly, publishPricingPage);

// CONTACT

router.post("/contact", authMiddleware, contactLimiter, submitContactEnquiry);

router.get("/contact/my-enquiries", authMiddleware, getMyContactEnquiries);

router.get("/contact", ...adminOnly, getContactEnquiries);

router.get("/contact/:id", authMiddleware, getContactEnquiryById);

router.delete("/contact/:id", ...adminOnly, deleteContactEnquiry);

// DEMO REQUESTS

router.post("/demo", authMiddleware, createDemoRequest);

router.get("/demo/my-requests", authMiddleware, getMyDemoRequests);

router.get("/demo", ...adminOnly, getDemoRequests);

router.get("/demo/:id", authMiddleware, getDemoRequestById);

router.put("/demo/:id", ...adminOnly, updateDemoRequest);

router.delete("/demo/:id", ...adminOnly, deleteDemoRequest);
module.exports = router;
