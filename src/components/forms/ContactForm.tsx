"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { ContactFormSchema, type ContactFormData } from "@/types/contact";
import { submitContactForm } from "@/actions/contact.actions";

const inputClass =
  "border-0 border-b border-white/30 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-[#4CAF50] transition-colors rounded-none py-3 w-full";

const labelClass = "text-white/60 text-sm uppercase tracking-wide mb-2 block";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  birthYear: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    birthYear: "",
    message: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof FormFields>(key: K, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as keyof FieldErrors];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const data = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      birthYear: fields.birthYear || undefined,
      message: fields.message,
    };

    const parsed = ContactFormSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof FieldErrors;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await submitContactForm(parsed.data as ContactFormData);
      if (result.success) {
        setSuccess(true);
      } else {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#111111] rounded-2xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-6" />
        <h3 className="section-heading text-white text-2xl mb-4">
          MESSAGE SENT
        </h3>
        <p className="text-white/60">
          Thanks for reaching out! We&apos;ll get back to you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* First + Last Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            FIRST NAME <span className="text-[#F78E2B]">*</span>
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="First name"
            value={fields.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>
            LAST NAME <span className="text-[#F78E2B]">*</span>
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Last name"
            value={fields.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>
          EMAIL <span className="text-[#F78E2B]">*</span>
        </label>
        <input
          type="email"
          className={inputClass}
          placeholder="your@email.com"
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Birth Year */}
      <div>
        <label className={labelClass}>BIRTH YEAR (OPTIONAL)</label>
        <input
          type="text"
          className={inputClass}
          placeholder="YYYY"
          value={fields.birthYear}
          onChange={(e) => setField("birthYear", e.target.value)}
        />
        {errors.birthYear && (
          <p className="text-red-400 text-xs mt-1">{errors.birthYear}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>
          MESSAGE <span className="text-[#F78E2B]">*</span>
        </label>
        <textarea
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="How can we help?"
          value={fields.message}
          onChange={(e) => setField("message", e.target.value)}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full py-5 bg-[#4CAF50] text-white font-black uppercase text-sm tracking-widest hover:bg-[#43A047] transition-colors disabled:opacity-50"
      >
        {loading ? "SENDING..." : "SEND MESSAGE"}
      </button>

      {submitError && (
        <p className="text-red-400 text-sm text-center">{submitError}</p>
      )}
    </form>
  );
}
