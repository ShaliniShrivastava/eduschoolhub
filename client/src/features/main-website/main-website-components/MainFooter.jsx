
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-12 lg:px-10 lg:py-16">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-3"
            aria-label="EduSchoolHub home"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-600/20 transition-transform duration-200 group-hover:scale-105">
              <GraduationCap size={27} strokeWidth={2.2} />
            </span>

            <span className="text-xl font-extrabold tracking-tight text-white">
              Edu<span className="text-blue-400">SchoolHub</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            One powerful platform to simplify school management, empower
            educators, and support student success.
          </p>

          <Link
            to="/about"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            Learn more about us
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Quick Links
          </h3>

          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-blue-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="transition-colors hover:text-blue-400"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/modules"
                className="transition-colors hover:text-blue-400"
              >
                Modules
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="transition-colors hover:text-blue-400"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="transition-colors hover:text-blue-400"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-colors hover:text-blue-400"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Platform
          </h3>

          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <Link
                to="/super-admin/login"
                className="transition-colors hover:text-blue-400"
              >
                Super Admin Login
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-colors hover:text-blue-400"
              >
                Book a Demo
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="transition-colors hover:text-blue-400"
              >
                School Management
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="transition-colors hover:text-blue-400"
              >
                Subscription Plans
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Get in Touch
          </h3>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            Have questions about EduSchoolHub? Tell us about your school
            and explore the right solution for your needs.
          </p>

          <a
            href="mailto:hello@eduschoolhub.com"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            <Mail size={16} />
            hello@eduschoolhub.com
          </a>

          {/* WhatsApp Support */}
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <MessageCircle size={21} />
              </span>

              <div>
                <p className="text-sm font-bold text-white">
                  WhatsApp Support
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Need help? Our WhatsApp contact details will be available
                  here soon.
                </p>

                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-green-400 transition-colors hover:text-green-300"
                >
                  Contact our team
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left lg:px-10">
          <p>
            © {currentYear} EduSchoolHub. All rights reserved.
          </p>

          <p className="inline-flex items-center justify-center gap-1.5">
            Built for smarter school management.
          </p>
        </div>
      </div>
    </footer>
  );
}
