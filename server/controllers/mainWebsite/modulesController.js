const MainWebsiteContent = require("../../models/mainWebsite/MainWebsiteContent");

// Get published Modules Page content (Public Website)
const getModulesPage = async (req, res) => {
  try {
    const modulesPage = await MainWebsiteContent.findOne({
      page: "modules",
    }).select("publishedContent publishedAt");

    if (!modulesPage || !modulesPage.publishedContent) {
      return res.status(404).json({
        success: false,
        message: "Modules page content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: modulesPage.publishedContent,
    });
  } catch (error) {
    console.error("Get Modules Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Modules Page content.",
    });
  }
};

// Get Modules Page content for Super Admin
const getModulesPageForAdmin = async (req, res) => {
  try {
    const modulesPage = await MainWebsiteContent.findOne({
      page: "modules",
    });

    return res.status(200).json({
      success: true,
      data: modulesPage || null,
    });
  } catch (error) {
    console.error("Get Modules Page Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Modules Page content.",
    });
  }
};

// Save Modules Page content as Draft
const saveModulesPageDraft = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return res.status(400).json({
        success: false,
        message: "Valid Modules Page content is required.",
      });
    }

    const modulesPage = await MainWebsiteContent.findOneAndUpdate(
      { page: "modules" },
      {
        $set: {
          draftContent: content,
          updatedBy: req.user._id,
        },
        $setOnInsert: {
          page: "modules",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Modules Page draft saved successfully.",
      data: modulesPage,
    });
  } catch (error) {
    console.error("Save Modules Page Draft Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save Modules Page draft.",
    });
  }
};

// Publish Modules Page content
const publishModulesPage = async (req, res) => {
  try {
    const modulesPage = await MainWebsiteContent.findOne({
      page: "modules",
    });

    if (!modulesPage || !modulesPage.draftContent) {
      return res.status(404).json({
        success: false,
        message: "No Modules Page draft available to publish.",
      });
    }

    modulesPage.publishedContent = modulesPage.draftContent;
    modulesPage.publishedAt = new Date();
    modulesPage.updatedBy = req.user._id;

    await modulesPage.save();

    return res.status(200).json({
      success: true,
      message: "Modules Page published successfully.",
      data: modulesPage.publishedContent,
    });
  } catch (error) {
    console.error("Publish Modules Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to publish Modules Page.",
    });
  }
};

module.exports = {
  getModulesPage,
  getModulesPageForAdmin,
  saveModulesPageDraft,
  publishModulesPage,
};
