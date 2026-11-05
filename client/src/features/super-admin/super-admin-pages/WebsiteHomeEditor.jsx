
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Globe,
  RefreshCw,
  Eye,
  Upload,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Image,
  FileText,
  Layout,
  CheckCircle2,
  AlertCircle,
  Monitor,
} from "lucide-react";

import apiClient from "../../../app-services/apiClient";

const initialContent = {
  hero: {
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: "",
  },
  banners: [],
  highlights: [],
};

const tabs = [
  { id: "hero", label: "Hero Section", icon: Layout },
  { id: "banners", label: "Banner Manager", icon: Image },
  { id: "highlights", label: "Highlights", icon: FileText },
  { id: "preview", label: "Live Preview", icon: Eye },
];

function moveItem(items, index, direction) {
  const next = [...items];
  const target = index + direction;

  if (target < 0 || target >= next.length) return next;

  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export default function WebsiteHomeEditor() {
  const navigate = useNavigate();

  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [publishedAt, setPublishedAt] = useState(null);

  const currentContent = JSON.stringify(content);
  const hasChanges = currentContent !== savedContent;

  // -----------------------------------------
  // Load CMS Content
  // -----------------------------------------

  const loadContent = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await apiClient.get(
        "/main-website/home/admin"
      );

      const pageData = response.data?.data;

      const loadedContent =
        pageData?.draftContent ??
        pageData?.publishedContent ??
        initialContent;

      const normalizedContent = {
        ...initialContent,
        ...loadedContent,
        hero: {
          ...initialContent.hero,
          ...(loadedContent.hero || {}),
        },
        banners: Array.isArray(loadedContent.banners)
          ? loadedContent.banners
          : [],
        highlights: Array.isArray(loadedContent.highlights)
          ? loadedContent.highlights
          : [],
      };

      setContent(normalizedContent);
      setSavedContent(JSON.stringify(normalizedContent));
      setPublishedAt(pageData?.publishedAt || null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load website content."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // -----------------------------------------
  // Update Hero
  // -----------------------------------------

  const updateHero = (field, value) => {
    setContent((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        [field]: value,
      },
    }));
    setError("");
    setSuccess("");
  };

  // -----------------------------------------
  // Banner Management
  // -----------------------------------------

  const addBanner = () => {
    setContent((previous) => ({
      ...previous,
      banners: [
        ...previous.banners,
        {
          title: "",
          subtitle: "",
          image: "",
          buttonText: "",
          buttonLink: "",
          isVisible: true,
        },
      ],
    }));
  };

  const updateBanner = (index, field, value) => {
    setContent((previous) => ({
      ...previous,
      banners: previous.banners.map((banner, i) =>
        i === index
          ? { ...banner, [field]: value }
          : banner
      ),
    }));
    setError("");
    setSuccess("");
  };

  const deleteBanner = (index) => {
    if (!window.confirm("Delete this banner?")) return;

    setContent((previous) => ({
      ...previous,
      banners: previous.banners.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const reorderBanner = (index, direction) => {
    setContent((previous) => ({
      ...previous,
      banners: moveItem(
        previous.banners,
        index,
        direction
      ),
    }));
  };

  // -----------------------------------------
  // Highlights Management
  // -----------------------------------------

  const addHighlight = () => {
    setContent((previous) => ({
      ...previous,
      highlights: [
        ...previous.highlights,
        {
          title: "",
          description: "",
          icon: "",
          isVisible: true,
        },
      ],
    }));
  };

  const updateHighlight = (index, field, value) => {
    setContent((previous) => ({
      ...previous,
      highlights: previous.highlights.map(
        (highlight, i) =>
          i === index
            ? { ...highlight, [field]: value }
            : highlight
      ),
    }));
    setError("");
    setSuccess("");
  };

  const deleteHighlight = (index) => {
    if (!window.confirm("Delete this highlight?")) return;

    setContent((previous) => ({
      ...previous,
      highlights: previous.highlights.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const reorderHighlight = (index, direction) => {
    setContent((previous) => ({
      ...previous,
      highlights: moveItem(
        previous.highlights,
        index,
        direction
      ),
    }));
  };

  // -----------------------------------------
  // Save Draft
  // -----------------------------------------

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await apiClient.put(
        "/main-website/home/draft",
        { content }
      );

      const saved = response.data?.data?.draftContent ?? content;

      setContent(saved);
      setSavedContent(JSON.stringify(saved));

      setSuccess("Website draft saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save draft."
      );
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------
  // Publish
  // -----------------------------------------

  const handlePublish = async () => {
    if (hasChanges) {
      setError("Please save your changes before publishing.");
      return;
    }

    if (!window.confirm("Publish this website content?")) {
      return;
    }

    try {
      setPublishing(true);
      setError("");
      setSuccess("");

      const response = await apiClient.patch(
        "/main-website/home/publish"
      );

      const published = response.data?.data?.publishedContent;

      if (published) {
        const normalized = {
          ...initialContent,
          ...published,
          hero: {
            ...initialContent.hero,
            ...(published.hero || {}),
          },
          banners: Array.isArray(published.banners)
            ? published.banners
            : [],
          highlights: Array.isArray(published.highlights)
            ? published.highlights
            : [],
        };

        setContent(normalized);
        setSavedContent(JSON.stringify(normalized));
      }

      setPublishedAt(new Date().toISOString());
      setSuccess("Website published successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to publish website."
      );
    } finally {
      setPublishing(false);
    }
  };

  // -----------------------------------------
  // Reusable Input
  // -----------------------------------------

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50";

  const labelClass =
    "text-xs font-bold text-slate-700";

  const renderInput = (
    label,
    value,
    onChange,
    placeholder = "",
    type = "text"
  ) => (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );

  const renderTextarea = (
    label,
    value,
    onChange,
    placeholder = ""
  ) => (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        rows={4}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass + " resize-y"}
      />
    </label>
  );

  // -----------------------------------------
  // Page Layout
  // -----------------------------------------

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">

          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/super-admin/dashboard")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Website CMS
              </h1>
              <p className="text-xs text-slate-500">
                Manage your public website
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={loadContent}
              disabled={loading || saving || publishing}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={15} />
              <span className="hidden sm:inline">Reload</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={loading || saving || publishing || !hasChanges}
              className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-3 sm:px-4 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={loading || saving || publishing || hasChanges}
              className="flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3 sm:px-4 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Upload size={15} />
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">

        {/* Page Heading */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Globe size={17} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Main Website / Home Page
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
            Home Page Editor
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your website sections without editing code.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {/* Status */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold text-slate-500">
              Editor Status
            </p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">
              {hasChanges ? "Unsaved Changes" : "Up to Date"}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold text-slate-500">
              Draft Status
            </p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">
              {hasChanges ? "Modified" : "Saved"}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold text-slate-500">
              Last Published
            </p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">
              {publishedAt
                ? new Date(publishedAt).toLocaleDateString("en-IN")
                : "Not published"}
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-500">
            <RefreshCw size={18} className="mr-2 animate-spin" />
            Loading CMS content...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">

            {/* Sidebar */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3">
              <p className="px-3 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Home Page Sections
              </p>

              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                        active
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={17} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Editor */}
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Edit your Home Page content
                  </p>
                </div>
                <Monitor size={20} className="text-slate-400" />
              </div>

              <div className="p-5 sm:p-6">

                {/* HERO EDITOR */}
                {activeTab === "hero" && (
                  <div className="space-y-5">
                    {renderInput(
                      "Main Heading",
                      content.hero.title,
                      (value) => updateHero("title", value),
                      "Welcome to EduSchoolHub"
                    )}

                    {renderTextarea(
                      "Subtitle / Description",
                      content.hero.subtitle,
                      (value) => updateHero("subtitle", value),
                      "Describe your school management platform..."
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {renderInput(
                        "Button Text",
                        content.hero.buttonText,
                        (value) => updateHero("buttonText", value),
                        "Get Started"
                      )}

                      {renderInput(
                        "Button Link",
                        content.hero.buttonLink,
                        (value) => updateHero("buttonLink", value),
                        "/book-demo"
                      )}
                    </div>

                    {renderInput(
                      "Hero Image URL",
                      content.hero.image,
                      (value) => updateHero("image", value),
                      "https://example.com/hero-image.webp",
                      "url"
                    )}

                    {content.hero.image && (
                      <div className="overflow-hidden rounded-xl border border-slate-200 p-2">
                        <img
                          src={content.hero.image}
                          alt="Hero preview"
                          className="max-h-64 w-full rounded-lg object-contain"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* BANNER EDITOR */}
                {activeTab === "banners" && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Website Banners
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                          Add and manage your banner slides.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addBanner}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        <Plus size={16} />
                        Add Banner
                      </button>
                    </div>

                    {content.banners.length === 0 && (
                      <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                        <Image size={30} className="mx-auto text-slate-300" />
                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No banners added yet
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Click Add Banner to create your first slide.
                        </p>
                      </div>
                    )}

                    {content.banners.map((banner, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-200 p-4 sm:p-5"
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">
                            Banner {index + 1}
                          </h4>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => reorderBanner(index, -1)}
                              disabled={index === 0}
                              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                              aria-label="Move banner up"
                            >
                              <ChevronUp size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => reorderBanner(index, 1)}
                              disabled={index === content.banners.length - 1}
                              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                              aria-label="Move banner down"
                            >
                              <ChevronDown size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteBanner(index)}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                              aria-label="Delete banner"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {renderInput(
                            "Banner Title",
                            banner.title,
                            (value) => updateBanner(index, "title", value),
                            "Enter banner heading"
                          )}

                          {renderTextarea(
                            "Banner Description",
                            banner.subtitle,
                            (value) => updateBanner(index, "subtitle", value),
                            "Enter banner description"
                          )}

                          {renderInput(
                            "Image URL",
                            banner.image,
                            (value) => updateBanner(index, "image", value),
                            "https://example.com/banner.webp",
                            "url"
                          )}

                          {banner.image && (
                            <img
                              src={banner.image}
                              alt={`Banner ${index + 1}`}
                              className="max-h-52 w-full rounded-xl border border-slate-200 object-contain"
                            />
                          )}

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {renderInput(
                              "Button Text",
                              banner.buttonText,
                              (value) => updateBanner(index, "buttonText", value),
                              "Learn More"
                            )}

                            {renderInput(
                              "Button Link",
                              banner.buttonLink,
                              (value) => updateBanner(index, "buttonLink", value),
                              "/features"
                            )}
                          </div>

                          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                            <input
                              type="checkbox"
                              checked={banner.isVisible !== false}
                              onChange={(event) =>
                                updateBanner(index, "isVisible", event.target.checked)
                              }
                              className="h-4 w-4 accent-blue-600"
                            />
                            Show this banner
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* HIGHLIGHTS EDITOR */}
                {activeTab === "highlights" && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Website Highlights
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                          Manage key platform highlights.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addHighlight}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        <Plus size={16} />
                        Add Highlight
                      </button>
                    </div>

                    {content.highlights.length === 0 && (
                      <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                        <FileText size={30} className="mx-auto text-slate-300" />
                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No highlights added yet
                        </p>
                      </div>
                    )}

                    {content.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-200 p-4 sm:p-5"
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">
                            Highlight {index + 1}
                          </h4>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => reorderHighlight(index, -1)}
                              disabled={index === 0}
                              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                            >
                              <ChevronUp size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => reorderHighlight(index, 1)}
                              disabled={index === content.highlights.length - 1}
                              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                            >
                              <ChevronDown size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteHighlight(index)}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {renderInput(
                            "Title",
                            highlight.title,
                            (value) => updateHighlight(index, "title", value),
                            "Enter highlight title"
                          )}

                          {renderTextarea(
                            "Description",
                            highlight.description,
                            (value) => updateHighlight(index, "description", value),
                            "Enter description"
                          )}

                          {renderInput(
                            "Icon Name",
                            highlight.icon,
                            (value) => updateHighlight(index, "icon", value),
                            "Example: GraduationCap"
                          )}

                          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                            <input
                              type="checkbox"
                              checked={highlight.isVisible !== false}
                              onChange={(event) =>
                                updateHighlight(index, "isVisible", event.target.checked)
                              }
                              className="h-4 w-4 accent-blue-600"
                            />
                            Show this highlight
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LIVE PREVIEW */}
                {activeTab === "preview" && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-slate-950 px-6 py-12 text-center text-white sm:px-10">
                      {content.hero.image && (
                        <img
                          src={content.hero.image}
                          alt=""
                          className="mx-auto mb-6 max-h-52 max-w-full rounded-xl object-contain"
                        />
                      )}

                      <p className="text-3xl font-extrabold sm:text-4xl">
                        {content.hero.title || "Your Hero Heading"}
                      </p>

                      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                        {content.hero.subtitle || "Your hero description will appear here."}
                      </p>

                      {content.hero.buttonText && (
                        <span className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white">
                          {content.hero.buttonText}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="mb-4 text-lg font-bold text-slate-900">
                        Banner Preview
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {content.banners
                          .filter((banner) => banner.isVisible !== false)
                          .map((banner, index) => (
                            <div
                              key={index}
                              className="overflow-hidden rounded-xl border border-slate-200"
                            >
                              {banner.image && (
                                <img
                                  src={banner.image}
                                  alt=""
                                  className="h-40 w-full object-cover"
                                />
                              )}
                              <div className="p-4">
                                <h4 className="font-bold text-slate-800">
                                  {banner.title || "Banner Title"}
                                </h4>
                                <p className="mt-2 text-sm text-slate-500">
                                  {banner.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-lg font-bold text-slate-900">
                        Highlights Preview
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {content.highlights
                          .filter((item) => item.isVisible !== false)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="rounded-xl border border-slate-200 p-5"
                            >
                              <h4 className="font-bold text-slate-800">
                                {item.title || "Highlight Title"}
                              </h4>
                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </section>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Eye size={18} className="mt-0.5 text-amber-600" />
          <p className="text-xs leading-5 text-amber-800">
            Save your draft before publishing. Draft changes will not appear
            on the public website until you publish them.
          </p>
        </div>
      </main>
    </div>
  );
}
