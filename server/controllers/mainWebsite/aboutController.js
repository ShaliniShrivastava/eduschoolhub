
const MainWebsiteContent = require("../../models/mainWebsite/MainWebsiteContent");

// Get published About Page content (Public Website)
const getAboutPage = async (req, res) => {
  try {
    const aboutPage = await MainWebsiteContent.findOne({
      page: "about",
    }).select("publishedContent publishedAt");

    if (!aboutPage || !aboutPage.publishedContent) {
      return res.status(404).json({
        success: false,
        message: "About page content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: aboutPage.publishedContent,
    });
  } catch (error) {
    console.error("Get About Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch About Page content.",
    });
  }
};

// Get About Page content for Super Admin
const getAboutPageForAdmin = async (req, res) => {
  try {
    const aboutPage = await MainWebsiteContent.findOne({
      page: "about",
    });

    return res.status(200).json({
      success: true,
      data: aboutPage || null,
    });
  } catch (error) {
    console.error("Get About Page Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch About Page content.",
    });
  }
};

// Save About Page content as Draft
const saveAboutPageDraft = async (req, res) => {
  try {
    const { content } = req.body;

    if (
      !content ||
      typeof content !== "object" ||
      Array.isArray(content)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid About Page content is required.",
      });
    }

    const aboutPage = await MainWebsiteContent.findOneAndUpdate(
      { page: "about" },
      {
        $set: {
          draftContent: content,
          updatedBy: req.user._id,
        },
        $setOnInsert: {
          page: "about",
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
      message: "About Page draft saved successfully.",
      data: aboutPage,
    });
  } catch (error) {
    console.error("Save About Page Draft Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save About Page draft.",
    });
  }
};

// Publish About Page content
const publishAboutPage = async (req, res) => {
  try {
    const aboutPage = await MainWebsiteContent.findOne({
      page: "about",
    });

    if (!aboutPage || !aboutPage.draftContent) {
      return res.status(404).json({
        success: false,
        message: "No About Page draft available to publish.",
      });
    }

    aboutPage.publishedContent = aboutPage.draftContent;
    aboutPage.publishedAt = new Date();
    aboutPage.updatedBy = req.user._id;

    await aboutPage.save();

    return res.status(200).json({
      success: true,
      message: "About Page published successfully.",
      data: aboutPage.publishedContent,
    });
  } catch (error) {
    console.error("Publish About Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to publish About Page.",
    });
  }
};

module.exports = {
  getAboutPage,
  getAboutPageForAdmin,
  saveAboutPageDraft,
  publishAboutPage,
};
