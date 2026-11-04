
const MainWebsiteContent = require("../../models/mainWebsite/MainWebsiteContent");

// Get published Pricing Page content (Public Website)
const getPricingPage = async (req, res) => {
  try {
    const pricingPage = await MainWebsiteContent.findOne({
      page: "pricing",
    }).select("publishedContent publishedAt");

    if (!pricingPage || !pricingPage.publishedContent) {
      return res.status(404).json({
        success: false,
        message: "Pricing page content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: pricingPage.publishedContent,
    });
  } catch (error) {
    console.error("Get Pricing Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Pricing Page content.",
    });
  }
};

// Get Pricing Page content for Super Admin
const getPricingPageForAdmin = async (req, res) => {
  try {
    const pricingPage = await MainWebsiteContent.findOne({
      page: "pricing",
    });

    return res.status(200).json({
      success: true,
      data: pricingPage || null,
    });
  } catch (error) {
    console.error("Get Pricing Page Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Pricing Page content.",
    });
  }
};

// Save Pricing Page content as Draft
const savePricingPageDraft = async (req, res) => {
  try {
    const { content } = req.body;

    if (
      !content ||
      typeof content !== "object" ||
      Array.isArray(content)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid Pricing Page content is required.",
      });
    }

    const pricingPage = await MainWebsiteContent.findOneAndUpdate(
      { page: "pricing" },
      {
        $set: {
          draftContent: content,
          updatedBy: req.user._id,
        },
        $setOnInsert: {
          page: "pricing",
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
      message: "Pricing Page draft saved successfully.",
      data: pricingPage,
    });
  } catch (error) {
    console.error("Save Pricing Page Draft Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save Pricing Page draft.",
    });
  }
};

// Publish Pricing Page content
const publishPricingPage = async (req, res) => {
  try {
    const pricingPage = await MainWebsiteContent.findOne({
      page: "pricing",
    });

    if (!pricingPage || !pricingPage.draftContent) {
      return res.status(404).json({
        success: false,
        message: "No Pricing Page draft available to publish.",
      });
    }

    pricingPage.publishedContent = pricingPage.draftContent;
    pricingPage.publishedAt = new Date();
    pricingPage.updatedBy = req.user._id;

    await pricingPage.save();

    return res.status(200).json({
      success: true,
      message: "Pricing Page published successfully.",
      data: pricingPage.publishedContent,
    });
  } catch (error) {
    console.error("Publish Pricing Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to publish Pricing Page.",
    });
  }
};

module.exports = {
  getPricingPage,
  getPricingPageForAdmin,
  savePricingPageDraft,
  publishPricingPage,
};
