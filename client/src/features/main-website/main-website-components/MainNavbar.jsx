
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  GraduationCap,
  Menu,
  X,
  CalendarDays,
} from "lucide-react";

import BookDemoForm from "./BookDemoForm.jsx";

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
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close the demo modal when the route changes.
  useEffect(() => {
    setIsDemoModalOpen(false);
  }, [location.pathname, location.hash]);

  // Handle Escape key and prevent background scrolling.
  useEffect(() => {
    if (!isDemoModalOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDemoModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDemoModalOpen]);

  // Track homepage sections.
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

  // Navigate to homepage sections.
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

  // Open the shared demo form modal.
  const openDemoModal = () => {
    setIsMenuOpen(false);
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

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

  const renderNavLink = (link, mobile = false) => {
    const isPageLink = Boolean(pageRoutes[link.name]);

    const isActive = isPageLink
      ? location.pathname === pageRoutes[link.name]
      : isHomePage && activeSection === link.id;

    const commonProps = {
      tabIndex: mobile && !isMenuOpen ? -1 : undefined,
      "aria-current": isActive
        ? isPageLink
          ? "page"
          : "location"
        : undefined,
      className: getLinkClass(isActive, mobile),
    };

    if (isPageLink) {
      return (
        <Link
          key={link.id}
          {...commonProps}
          to={pageRoutes[link.name]}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.name}
          {renderActiveIndicator(isActive, mobile)}
        </Link>
      );
    }

    return (
      <button
        key={link.id}
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
    <>
      {/* Navbar */}
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
              onClick={openDemoModal}
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
                    onClick={openDemoModal}
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

      {/* Shared Book a Demo Modal */}
      {isDemoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/65 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDemoModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="relative my-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl shadow-slate-950/30 sm:rounded-3xl"
          >
            {/* Modal Header */}
            <div className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 sm:px-8 sm:py-6">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <CalendarDays size={14} />
                  Free Consultation
                </div>

                <h2
                  id="demo-modal-title"
                  className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Book a Free Demo
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Discover how EduSchoolHub can simplify your
                  school's daily operations.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDemoModal}
                aria-label="Close demo form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8">
              <BookDemoForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
