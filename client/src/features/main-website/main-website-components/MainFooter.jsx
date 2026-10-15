
import { Link } from "react-router-dom";

export default function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              E
            </span>
            <span className="text-xl font-extrabold text-white">
              Edu<span className="text-blue-400">SchoolHub</span>
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
            One powerful platform to simplify school management, empower
            educators and support student success.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="/#home" className="hover:text-blue-400">Home</a></li>
            <li><a href="/#features" className="hover:text-blue-400">Features</a></li>
            <li><a href="/#modules" className="hover:text-blue-400">Modules</a></li>
            <li><a href="/#pricing" className="hover:text-blue-400">Pricing</a></li>
            <li><a href="/#about" className="hover:text-blue-400">About Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">Platform</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/super-admin/login" className="hover:text-blue-400">
                Super Admin Login
              </Link>
            </li>
            <li><a href="/#contact" className="hover:text-blue-400">Book a Demo</a></li>
            <li><a href="/#features" className="hover:text-blue-400">School Management</a></li>
            <li><a href="/#pricing" className="hover:text-blue-400">Subscription Plans</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">Get in Touch</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Have questions about EduSchoolHub? Contact our team to find the
            right solution for your school.
          </p>
          <a
            href="mailto:hello@eduschoolhub.com"
            className="mt-3 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            hello@eduschoolhub.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {currentYear} EduSchoolHub. All rights reserved.</p>
          <p>Built for smarter school management.</p>
        </div>
      </div>
    </footer>
  );
}
