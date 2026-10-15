
import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Features", id: "features" },
  { name: "Modules", id: "modules" },
  { name: "Pricing", id: "pricing" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (id) => {
    setIsMenuOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <button
          onClick={() => handleNavigation("home")}
          className="flex items-center gap-2 text-left"
          aria-label="EduSchoolHub home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl font-extrabold text-white">
            E
          </span>

          <span>
            <span className="block text-xl font-extrabold tracking-tight text-slate-950">
              Edu<span className="text-blue-600">SchoolHub</span>
            </span>
            <span className="block text-[9px] font-semibold tracking-widest text-slate-500">
              SMART SCHOOL MANAGEMENT
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/super-admin/login"
            className="rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Super Admin Login
          </Link>

          <button
            onClick={() => handleNavigation("contact")}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Book Demo →
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 sm:hidden"
        >
          {isMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className="py-1 text-left text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                {link.name}
              </button>
            ))}

            <Link
              to="/super-admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg border border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600"
            >
              Super Admin Login
            </Link>

            <button
              onClick={() => handleNavigation("contact")}
              className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Book Demo →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
