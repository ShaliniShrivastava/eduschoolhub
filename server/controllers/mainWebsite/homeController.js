
const MainWebsiteContent = require("../../models/mainWebsite/MainWebsiteContent");

// Get published Home Page content (Public Website)
const getHomePage = async (req, res) => {
  try {
    const homePage = await MainWebsiteContent.findOne({
      page: "home",
    }).select("publishedContent publishedAt");

    if (!homePage || !homePage.publishedContent) {
      return res.status(404).json({
        success: false,
        message: "Home page content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: homePage.publishedContent,
    });
  } catch (error) {
    console.error("Get Home Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Home Page content.",
    });
  }
};

// Get Home Page content for Super Admin
const getHomePageForAdmin = async (req, res) => {
  try {
    const homePage = await MainWebsiteContent.findOne({
      page: "home",
    });

    return res.status(200).json({
      success: true,
      data: homePage || null,
    });
  } catch (error) {
    console.error("Get Home Page Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Home Page content.",
    });
  }
};

// Save Home Page content as Draft
const saveHomePageDraft = async (req, res) => {
  try {
    const { content } = req.body;

    if (
      !content ||
      typeof content !== "object" ||
      Array.isArray(content)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid Home Page content is required.",
      });
    }

    const homePage = await MainWebsiteContent.findOneAndUpdate(
      { page: "home" },
      {
        $set: {
          draftContent: content,
          updatedBy: req.user._id,
        },
        $setOnInsert: {
          page: "home",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Home Page draft saved successfully.",
      data: homePage,
    });
  } catch (error) {
    console.error("Save Home Page Draft Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save Home Page draft.",
    });
  }
};

// Publish Home Page content
const publishHomePage = async (req, res) => {
  try {
    const homePage = await MainWebsiteContent.findOne({
      page: "home",
    });

    if (!homePage || !homePage.draftContent) {
      return res.status(404).json({
        success: false,
        message: "No Home Page draft available to publish.",
      });
    }

    homePage.publishedContent = homePage.draftContent;
    homePage.publishedAt = new Date();
    homePage.updatedBy = req.user._id;

    await homePage.save();

    return res.status(200).json({
      success: true,
      message: "Home Page published successfully.",
      data: homePage.publishedContent,
    });
  } catch (error) {
    console.error("Publish Home Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to publish Home Page.",
    });
  }
};

module.exports = {
  getHomePage,
  getHomePageForAdmin,
  saveHomePageDraft,
  publishHomePage,
};
