
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

function BookDemoForm() {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactPerson: "",
    phone: "",
    email: "",
    role: "",
    studentStrength: "",
    preference: "Online",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!/^[+\d\s().-]{7,20}$/.test(formData.phone.trim())) {
      setMessage({
        type: "error",
        text: "Please enter a valid mobile number.",
      });
      return;
    }

    setLoading(true);

    try {
      // Replace this temporary logic with your backend API.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMessage({
        type: "success",
        text: "Demo request form tested successfully. Backend connection is pending.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "box-border w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  return (
    <div className="box-border w-full min-w-0 px-5 py-6 sm:px-8 sm:py-8 lg:px-9">
      {/* Form Header */}
      <div className="mb-6">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600">
          Free Consultation
        </span>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Book Your Free Demo
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Tell us about your school. Our team will help you
          explore the right solution for your needs.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/80 px-3 py-3 sm:px-4">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <span className="text-xs font-medium leading-5 text-blue-800 sm:text-sm">
            Personalized walkthrough of EduSchoolHub
          </span>
        </div>
      </div>

      {/* Demo Request Form */}
      <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
        {/* School Name */}
        <div className="min-w-0">
          <label htmlFor="schoolName" className={labelClass}>
            School Name <span className="text-red-500">*</span>
          </label>

          <input
            id="schoolName"
            name="schoolName"
            type="text"
            placeholder="Enter school name"
            className={inputClass}
            value={formData.schoolName}
            onChange={handleChange}
            maxLength={150}
            autoComplete="organization"
            required
          />
        </div>

        {/* Contact Person */}
        <div className="min-w-0">
          <label htmlFor="contactPerson" className={labelClass}>
            Contact Person <span className="text-red-500">*</span>
          </label>

          <input
            id="contactPerson"
            name="contactPerson"
            type="text"
            placeholder="Principal, owner or administrator"
            className={inputClass}
            value={formData.contactPerson}
            onChange={handleChange}
            maxLength={100}
            autoComplete="name"
            required
          />
        </div>

        {/* Phone and Email */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="phone" className={labelClass}>
              Mobile Number <span className="text-red-500">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Mobile number"
              className={inputClass}
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={20}
              required
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              maxLength={254}
            />
          </div>
        </div>

        {/* Designation and Student Strength */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="role" className={labelClass}>
              Your Designation
            </label>

            <select
              id="role"
              name="role"
              className={inputClass}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select designation</option>
              <option value="Principal">Principal</option>
              <option value="School Owner">School Owner</option>
              <option value="Administrator">Administrator</option>
              <option value="Teacher">Teacher</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="studentStrength" className={labelClass}>
              Student Strength
            </label>

            <select
              id="studentStrength"
              name="studentStrength"
              className={inputClass}
              value={formData.studentStrength}
              onChange={handleChange}
            >
              <option value="">Select strength</option>
              <option value="Below 200">Below 200</option>
              <option value="200-500">200–500</option>
              <option value="500-1000">500–1,000</option>
              <option value="1000-2000">1,000–2,000</option>
              <option value="Above 2000">Above 2,000</option>
            </select>
          </div>
        </div>

        {/* Demo Preference */}
        <fieldset className="min-w-0">
          <legend className={labelClass}>Demo Preference</legend>

          <div className="grid grid-cols-2 gap-3">
            {["Online", "Offline"].map((option) => (
              <label
                key={option}
                className={`flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  formData.preference === option
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="preference"
                  value={option}
                  checked={formData.preference === option}
                  onChange={handleChange}
                  className="accent-blue-600"
                />

                {option} Demo
              </label>
            ))}
          </div>
        </fieldset>

        {/* Success / Error Message */}
        {message.text && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl p-3 text-sm leading-6 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle size={19} className="animate-spin" />
              Please wait...
            </>
          ) : (
            <>
              Book My Free Demo
              <ArrowRight size={19} />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-5 text-slate-400">
          By submitting this form, you agree to be contacted by
          our team regarding your demo request.
        </p>
      </form>
    </div>
  );
}

export default BookDemoForm;
