
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Features", id: "features" },
  { name: "Modules", id: "modules" },
  { name: "Pricing", id: "pricing" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

const pageRoutes = {
  Features: "/features",
  Modules: "/modules",
  Pricing: "/pricing",
  About: "/about",
  Contact: "/contact",
};

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  // Close mobile menu when the route or URL hash changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Track active sections on the homepage only.
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["home", "contact"];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage]);

  // Navigate to a homepage section.
  const handleNavigation = (id) => {
    setIsMenuOpen(false);

    if (!isHomePage) {
      navigate(`/#${id}`);
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", `/#${id}`);
      setActiveSection(id);
    }
  };

  // Shared styles for desktop and mobile navigation.
  const getLinkClass = (isActive, mobile) =>
    mobile
      ? `flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold transition-colors ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
        }`
      : `relative whitespace-nowrap py-2 text-sm font-semibold transition-colors duration-200 ${
          isActive
            ? "text-blue-700"
            : "text-slate-600 hover:text-blue-700"
        }`;

  // Desktop underline and mobile active dot.
  const renderActiveIndicator = (isActive, mobile) => {
    if (mobile) {
      return isActive ? (
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
      ) : null;
    }

    return (
      <span
        className={`absolute -bottom-[2px] left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-200 ${
          isActive ? "w-full" : "w-0"
        }`}
      />
    );
  };

  // Render navigation links and homepage section buttons.
  const renderNavLink = (link, mobile = false) => {
    const isPageLink = Boolean(pageRoutes[link.name]);

    const isActive = isPageLink
      ? location.pathname === pageRoutes[link.name]
      : isHomePage && activeSection === link.id;

    const className = getLinkClass(isActive, mobile);

    const commonProps = {
      key: link.id,
      tabIndex: mobile && !isMenuOpen ? -1 : undefined,
      "aria-current": isActive
        ? isPageLink
          ? "page"
          : "location"
        : undefined,
      className,
    };

    // Standalone pages: Features, Modules, Pricing, About and Contact.
    if (isPageLink) {
      return (
        <Link
          {...commonProps}
          to={pageRoutes[link.name]}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.name}
          {renderActiveIndicator(isActive, mobile)}
        </Link>
      );
    }

    // Home navigates to the homepage hero section.
    return (
      <button
        {...commonProps}
        type="button"
        onClick={() => handleNavigation(link.id)}
      >
        {link.name}
        {renderActiveIndicator(isActive, mobile)}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNavigation("home")}
          className="group flex shrink-0 items-center gap-3 text-left"
          aria-label="EduSchoolHub home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20 transition-transform duration-200 group-hover:scale-105">
            <GraduationCap size={27} strokeWidth={2.2} />
          </span>

          <span className="block">
            <span className="block text-[19px] font-extrabold leading-tight tracking-tight text-slate-950 sm:text-[21px]">
              Edu<span className="text-blue-600">SchoolHub</span>
            </span>

            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.19em] text-slate-500">
              Smarter School Management
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((link) => renderNavLink(link))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <Link
            to="/super-admin/login"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-700 lg:px-4"
          >
            Admin Login
            <ArrowUpRight size={15} />
          </Link>

          <button
            type="button"
            onClick={() => handleNavigation("contact")}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 lg:px-5"
          >
            Book a Demo
            <ArrowUpRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out sm:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="min-h-0">
          <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 shadow-lg shadow-slate-900/5">
            <div className="mx-auto flex max-w-xl flex-col">
              {navLinks.map((link) => renderNavLink(link, true))}

              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4">
                <Link
                  to="/super-admin/login"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Admin Login
                  <ArrowUpRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={() => handleNavigation("contact")}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Book a Demo
                  <ArrowUpRight size={17} />
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Simplifying school management, one step at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
