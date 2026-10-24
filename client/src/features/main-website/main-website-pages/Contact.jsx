
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const WHATSAPP_NUMBER = ""; // Example: 919876543210

const plans = ["Starter", "Professional", "Enterprise"];

const initialForm = {
  fullName: "",
  schoolName: "",
  email: "",
  phone: "",
  role: "",
  studentCount: "",
  interestedPlan: "",
  billingCycle: "monthly",
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

function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
  optional = false,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
        {!optional && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={!optional}
        className={`${inputClass} ${
          error ? "border-red-400 focus:border-red-500" : ""
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">{placeholder}</option>

        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${name}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function InfoCard({ icon, iconClass, title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  // Automatically select plan and billing from Pricing page.
  useEffect(() => {
    const requestedPlan = searchParams.get("plan") || "";
    const requestedBilling = searchParams.get("billing") || "monthly";

    const validPlan = plans.includes(requestedPlan)
      ? requestedPlan
      : "";

    const validBilling = [
      "monthly",
      "yearly",
      "custom",
    ].includes(requestedBilling)
      ? requestedBilling
      : "monthly";

    setForm((previous) => ({
      ...previous,
      interestedPlan: validPlan,
      billingCycle: validBilling,
    }));
  }, [searchParams]);

  // Scroll to the form when the URL contains #contact-form.
  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const timer = window.setTimeout(() => {
        document
          .getElementById("contact-form")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      return () => window.clearTimeout(timer);
    }
  }, []);

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

    setStatus({ type: "", message: "" });
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    } else if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Name must contain at least 2 characters.";
    }

    if (!form.schoolName.trim()) {
      nextErrors.schoolName = "Please enter your school name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (
      !/^[0-9+\-\s()]+$/.test(form.phone.trim()) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.role) {
      nextErrors.role = "Please select your role.";
    }

    if (!form.studentCount) {
      nextErrors.studentCount = "Please select student strength.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please tell us how we can help.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!validateForm()) {
      return;
    }

    // Frontend demo only. No data is stored or sent yet.
    setStatus({
      type: "demo",
      message:
        "Your details passed validation. The enquiry has not been sent or saved yet because the backend API is not connected.",
    });
  };

  const handleWhatsApp = () => {
    if (!WHATSAPP_NUMBER) {
      setStatus({
        type: "demo",
        message:
          "WhatsApp support is not configured yet. Add your official WhatsApp number to enable this feature.",
      });
      return;
    }

    const message = encodeURIComponent(
      `Hi EduSchoolHub! I would like to know more about your school management platform.${
        form.schoolName ? ` School: ${form.schoolName}.` : ""
      }`
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:w-auto"
              >
                <MessageCircle size={18} className="text-green-600" />
                WhatsApp Support
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 sm:text-sm">
              {[
                "School-focused solutions",
                "Demo enquiry",
                "Friendly assistance",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact-form"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* LEFT INFORMATION */}
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
                <InfoCard
                  icon={<GraduationCap size={23} />}
                  iconClass="bg-blue-100 text-blue-700"
                  title="School-focused guidance"
                  description="Tell us about your institution and how you manage daily school activities."
                />

                <InfoCard
                  icon={<Users size={22} />}
                  iconClass="bg-indigo-100 text-indigo-700"
                  title="Find the right solution"
                  description="Share your school's size and requirements so your enquiry has the right context."
                />

                <InfoCard
                  icon={<MessageCircle size={22} />}
                  iconClass="bg-green-100 text-green-700"
                  title="WhatsApp support"
                  description="Contact our team through WhatsApp once the official support number is configured."
                />
              </div>

              <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-700"
                />
                <p className="text-sm leading-6 text-slate-600">
                  Please share only the contact details needed for your
                  enquiry. Student-specific or sensitive personal information
                  is not required.
                </p>
              </div>
            </div>

            {/* FORM */}
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
                  Fill in the details below. Fields marked with * are required.
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

                  <SelectField
                    label="Your Role"
                    name="role"
                    value={form.role}
                    onChange={updateField}
                    error={errors.role}
                    placeholder="Select your role"
                    options={[
                      ["School Owner", "School Owner"],
                      ["Principal", "Principal"],
                      ["School Administrator", "School Administrator"],
                      ["Teacher", "Teacher"],
                      ["Other", "Other"],
                    ]}
                  />

                  <SelectField
                    label="Number of Students"
                    name="studentCount"
                    value={form.studentCount}
                    onChange={updateField}
                    error={errors.studentCount}
                    placeholder="Select student strength"
                    options={[
                      ["Under 200", "Under 200"],
                      ["200–500", "200–500"],
                      ["501–1000", "501–1,000"],
                      ["1001–2000", "1,001–2,000"],
                      ["Above 2000", "Above 2,000"],
                    ]}
                  />

                  <SelectField
                    label="Interested Plan"
                    name="interestedPlan"
                    value={form.interestedPlan}
                    onChange={updateField}
                    placeholder="Select a plan (optional)"
                    optional
                    options={plans.map((plan) => [plan, plan])}
                  />

                  <SelectField
                    label="Billing Preference"
                    name="billingCycle"
                    value={form.billingCycle}
                    onChange={updateField}
                    placeholder="Select billing preference"
                    options={[
                      ["monthly", "Monthly"],
                      ["yearly", "Yearly"],
                      ["custom", "Custom / Discuss with team"],
                    ]}
                  />

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
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />

                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {status.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${
                      status.type === "success"
                        ? "border-green-200 bg-green-50 text-green-800"
                        : "border-amber-200 bg-amber-50 text-amber-900"
                    }`}
                  >
                    {status.message}
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
                  This form is currently a frontend demo. Enquiries will not
                  be saved until the backend API is connected.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
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
