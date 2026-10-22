
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const WHATSAPP_NUMBER = ""; // Add number later, e.g. 919876543210

const initialForm = {
  fullName: "",
  schoolName: "",
  email: "",
  phone: "",
  role: "",
  studentCount: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function ContactField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${inputClass} ${
          error ? "border-red-400 focus:border-red-500" : ""
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p id={`${name}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setStatusMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!form.schoolName.trim()) {
      nextErrors.schoolName = "Please enter your school name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.role) {
      nextErrors.role = "Please select your role.";
    }

    if (!form.studentCount) {
      nextErrors.studentCount = "Please select the student strength.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please tell us how we can help.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage("");

    if (!validateForm()) return;

    // Frontend only: connect your backend API to save enquiries.
    setStatusMessage(
      "Your form is valid! Enquiry submission will work after the backend API is connected."
    );
  };

  const handleWhatsApp = () => {
    if (!WHATSAPP_NUMBER) return;

    const message = encodeURIComponent(
      "Hi EduSchoolHub! I would like to know more about your school management platform."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
              <Sparkles size={15} />
              We're here to help
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Let's Build a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Smarter School
              </span>{" "}
              Together
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Have questions about EduSchoolHub? Tell us about your school,
              explore the right solution, and take the first step toward
              simpler school management.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact-form"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
              >
                Request a Demo
                <ArrowRight size={17} />
              </a>

              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={!WHATSAPP_NUMBER}
                title={
                  WHATSAPP_NUMBER
                    ? "Chat with EduSchoolHub on WhatsApp"
                    : "WhatsApp number will be added soon"
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <MessageCircle size={18} className="text-green-600" />
                WhatsApp Support
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                School-focused solutions
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                Demo enquiry
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                Friendly assistance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section
        id="contact-form"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Left Information */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Contact our team
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                Tell us what your school needs.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-slate-600">
                Whether you're exploring school management software or
                looking for a product walkthrough, share your requirements
                and help us understand how we can assist.
              </p>

              <div className="mt-9 space-y-4">
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <GraduationCap size={23} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      School-focused guidance
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Tell us about your institution and the way you manage
                      daily school activities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <Users size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Find the right solution
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Share your school's size and requirements so your
                      enquiry has the right context.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      WhatsApp support
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Our WhatsApp contact will be available here once the
                      official support number is configured.
                    </p>
                    <button
                      type="button"
                      disabled={!WHATSAPP_NUMBER}
                      onClick={handleWhatsApp}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-800 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      {WHATSAPP_NUMBER
                        ? "Chat with us"
                        : "Number coming soon"}
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-700"
                />
                <p className="text-sm leading-6 text-slate-600">
                  Please share only the contact details needed for your
                  enquiry. Student or other sensitive personal information
                  is not required.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-8 lg:p-9">
              <div className="mb-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  <Send size={13} />
                  DEMO ENQUIRY
                </span>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">
                  Let's talk about your school
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill in the details below. Fields marked with * are
                  required.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <ContactField
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    placeholder="Enter your full name"
                    required
                    error={errors.fullName}
                  />

                  <ContactField
                    label="School Name"
                    name="schoolName"
                    value={form.schoolName}
                    onChange={updateField}
                    placeholder="Enter school name"
                    required
                    error={errors.schoolName}
                  />

                  <ContactField
                    label="Work Email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@school.com"
                    type="email"
                    required
                    error={errors.email}
                  />

                  <ContactField
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="Enter phone number"
                    type="tel"
                    required
                    error={errors.phone}
                  />

                  <div className="space-y-2">
                    <label
                      htmlFor="role"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Your Role <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={updateField}
                      required
                      className={`${inputClass} ${
                        errors.role ? "border-red-400" : ""
                      }`}
                    >
                      <option value="">Select your role</option>
                      <option value="School Owner">School Owner</option>
                      <option value="Principal">Principal</option>
                      <option value="School Administrator">
                        School Administrator
                      </option>
                      <option value="Teacher">Teacher</option>
                      <option value="Other">Other</option>
                    </select>

                    {errors.role && (
                      <p className="text-xs text-red-600">
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="studentCount"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Number of Students{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="studentCount"
                      name="studentCount"
                      value={form.studentCount}
                      onChange={updateField}
                      required
                      className={`${inputClass} ${
                        errors.studentCount ? "border-red-400" : ""
                      }`}
                    >
                      <option value="">Select student strength</option>
                      <option value="Under 200">Under 200</option>
                      <option value="200–500">200–500</option>
                      <option value="501–1000">501–1,000</option>
                      <option value="1001–2000">1,001–2,000</option>
                      <option value="Above 2000">Above 2,000</option>
                    </select>

                    {errors.studentCount && (
                      <p className="text-xs text-red-600">
                        {errors.studentCount}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      How can we help?{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={updateField}
                      placeholder="Tell us about your school's requirements..."
                      required
                      className={`${inputClass} min-h-28 resize-y ${
                        errors.message ? "border-red-400" : ""
                      }`}
                      aria-invalid={Boolean(errors.message)}
                    />

                    {errors.message && (
                      <p className="text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {statusMessage && (
                  <div
                    role="status"
                    className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
                  >
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                >
                  Request a Demo
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Submitting this form will not send your details until the
                  backend enquiry API is connected.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <GraduationCap size={30} />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Ready to simplify school management?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Explore the platform and discover how EduSchoolHub can support
            your school's everyday workflows.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/modules"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Explore Modules
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View Pricing
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
