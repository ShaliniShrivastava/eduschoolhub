
const MainWebsiteContent = require("../../models/mainWebsite/MainWebsiteContent");

// Get published Features Page content (Public Website)
const getFeaturesPage = async (req, res) => {
  try {
    const featuresPage = await MainWebsiteContent.findOne({
      page: "features",
    }).select("publishedContent publishedAt");

    if (!featuresPage || !featuresPage.publishedContent) {
      return res.status(404).json({
        success: false,
        message: "Features page content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: featuresPage.publishedContent,
    });
  } catch (error) {
    console.error("Get Features Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Features Page content.",
    });
  }
};

// Get Features Page content for Super Admin
const getFeaturesPageForAdmin = async (req, res) => {
  try {
    const featuresPage = await MainWebsiteContent.findOne({
      page: "features",
    });

    return res.status(200).json({
      success: true,
      data: featuresPage || null,
    });
  } catch (error) {
    console.error("Get Features Page Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Features Page content.",
    });
  }
};

// Save Features Page content as Draft
const saveFeaturesPageDraft = async (req, res) => {
  try {
    const { content } = req.body;

    if (
      !content ||
      typeof content !== "object" ||
      Array.isArray(content)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid Features Page content is required.",
      });
    }

    const featuresPage = await MainWebsiteContent.findOneAndUpdate(
      { page: "features" },
      {
        $set: {
          draftContent: content,
          updatedBy: req.user._id,
        },
        $setOnInsert: {
          page: "features",
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
      message: "Features Page draft saved successfully.",
      data: featuresPage,
    });
  } catch (error) {
    console.error("Save Features Page Draft Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save Features Page draft.",
    });
  }
};

// Publish Features Page content
const publishFeaturesPage = async (req, res) => {
  try {
    const featuresPage = await MainWebsiteContent.findOne({
      page: "features",
    });

    if (!featuresPage || !featuresPage.draftContent) {
      return res.status(404).json({
        success: false,
        message: "No Features Page draft available to publish.",
      });
    }

    featuresPage.publishedContent = featuresPage.draftContent;
    featuresPage.publishedAt = new Date();
    featuresPage.updatedBy = req.user._id;

    await featuresPage.save();

    return res.status(200).json({
      success: true,
      message: "Features Page published successfully.",
      data: featuresPage.publishedContent,
    });
  } catch (error) {
    console.error("Publish Features Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to publish Features Page.",
    });
  }
};

module.exports = {
  getFeaturesPage,
  getFeaturesPageForAdmin,
  saveFeaturesPageDraft,
  publishFeaturesPage,
};
