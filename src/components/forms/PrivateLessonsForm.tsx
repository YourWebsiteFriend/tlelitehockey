"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import {
  PrivateLessonsFormSchema,
  POSITIONS,
  LOCATIONS,
  DAYS_OF_WEEK,
  SKILLS_FOCUS_OPTIONS,
  type PrivateLessonsFormData,
} from "@/types/private-lessons";
import { submitPrivateLessonsInquiry } from "@/actions/private-lessons.actions";

const inputClass =
  "border-0 border-b border-white/30 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-[#4CAF50] transition-colors rounded-none py-3 w-full";

const labelClass = "text-white/60 text-sm uppercase tracking-wide mb-2 block";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2004 }, (_, i) =>
  String(currentYear - i)
);
const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

type FormFields = {
  playerName: string;
  guardianName: string;
  email: string;
  currentTeam: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  position: string;
  location: string;
  dayAvailability: string[];
  preferredTime: string;
  skillsFocus: string;
  additionalInfo: string;
};

type FieldErrors = Partial<Record<keyof PrivateLessonsFormData | "birthdate", string>>;

export function PrivateLessonsForm() {
  const [fields, setFields] = useState<FormFields>({
    playerName: "",
    guardianName: "",
    email: "",
    currentTeam: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    position: "",
    location: "",
    dayAvailability: [],
    preferredTime: "",
    skillsFocus: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as keyof FieldErrors];
      return next;
    });
  };

  const toggleDay = (day: string) => {
    setFields((prev) => {
      const has = prev.dayAvailability.includes(day);
      return {
        ...prev,
        dayAvailability: has
          ? prev.dayAvailability.filter((d) => d !== day)
          : [...prev.dayAvailability, day],
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.dayAvailability;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const data = {
      playerName: fields.playerName,
      guardianName: fields.guardianName,
      email: fields.email,
      currentTeam: fields.currentTeam || undefined,
      birthdate: {
        month: fields.birthMonth,
        day: fields.birthDay,
        year: fields.birthYear,
      },
      position: fields.position,
      location: fields.location,
      dayAvailability: fields.dayAvailability,
      preferredTime: fields.preferredTime,
      skillsFocus: fields.skillsFocus,
      additionalInfo: fields.additionalInfo || undefined,
    };

    const parsed = PrivateLessonsFormSchema.safeParse(data);
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
      const result = await submitPrivateLessonsInquiry(
        parsed.data as PrivateLessonsFormData
      );
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
      <div className="bg-[#111111] rounded-2xl p-12 text-center max-w-xl mx-auto">
        <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-6" />
        <h3 className="section-heading text-white text-2xl mb-4">
          INQUIRY RECEIVED
        </h3>
        <p className="text-white/60 leading-relaxed">
          Your inquiry has been received. Brendan will be in touch within 48
          hours.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-[#4CAF50] rounded-full px-8 py-3 text-white font-bold uppercase text-sm hover:bg-[#43A047] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const selectClass =
    "border-0 border-b border-white/30 bg-black text-white focus:outline-none focus:border-[#4CAF50] transition-colors rounded-none py-3 w-full";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {/* Player Name */}
      <div>
        <label className={labelClass}>
          PLAYER NAME <span className="text-[#F78E2B]">*</span>
        </label>
        <input
          type="text"
          className={inputClass}
          placeholder="Player's full name"
          value={fields.playerName}
          onChange={(e) => setField("playerName", e.target.value)}
        />
        {errors.playerName && (
          <p className="text-red-400 text-xs mt-1">{errors.playerName}</p>
        )}
      </div>

      {/* Guardian Name */}
      <div>
        <label className={labelClass}>
          PARENT / GUARDIAN NAME <span className="text-[#F78E2B]">*</span>
        </label>
        <input
          type="text"
          className={inputClass}
          placeholder="Guardian's full name"
          value={fields.guardianName}
          onChange={(e) => setField("guardianName", e.target.value)}
        />
        {errors.guardianName && (
          <p className="text-red-400 text-xs mt-1">{errors.guardianName}</p>
        )}
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

      {/* Current Team */}
      <div>
        <label className={labelClass}>CURRENT TEAM (OPTIONAL)</label>
        <input
          type="text"
          className={inputClass}
          placeholder="e.g., South Shore Kings Squirts"
          value={fields.currentTeam}
          onChange={(e) => setField("currentTeam", e.target.value)}
        />
      </div>

      {/* Birthdate */}
      <div>
        <label className={labelClass}>
          PLAYER BIRTHDATE <span className="text-[#F78E2B]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <select
              className={selectClass}
              value={fields.birthMonth}
              onChange={(e) => setField("birthMonth", e.target.value)}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className={selectClass}
              value={fields.birthDay}
              onChange={(e) => setField("birthDay", e.target.value)}
            >
              <option value="" disabled>
                Day
              </option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className={selectClass}
              value={fields.birthYear}
              onChange={(e) => setField("birthYear", e.target.value)}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.birthdate && (
          <p className="text-red-400 text-xs mt-1">{errors.birthdate}</p>
        )}
      </div>

      {/* Position */}
      <div>
        <label className={labelClass}>
          POSITION <span className="text-[#F78E2B]">*</span>
        </label>
        <div className="flex flex-wrap gap-4 mt-1">
          {POSITIONS.map((pos) => {
            const selected = fields.position === pos;
            return (
              <button
                key={pos}
                type="button"
                onClick={() => setField("position", pos)}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  selected ? "text-[#4CAF50]" : "text-white/70 hover:text-white"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                    selected
                      ? "border-[#4CAF50] bg-[#4CAF50]"
                      : "border-white/30"
                  }`}
                />
                {pos}
              </button>
            );
          })}
        </div>
        {errors.position && (
          <p className="text-red-400 text-xs mt-2">{errors.position}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className={labelClass}>
          PREFERRED LOCATION <span className="text-[#F78E2B]">*</span>
        </label>
        <div className="flex flex-wrap gap-4 mt-1">
          {LOCATIONS.map((loc) => {
            const selected = fields.location === loc;
            const label =
              loc === "Thayer Sports Center"
                ? "Thayer Sports Center (Braintree)"
                : "Gallo Ice Arena (Bourne)";
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setField("location", loc)}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  selected ? "text-[#4CAF50]" : "text-white/70 hover:text-white"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                    selected
                      ? "border-[#4CAF50] bg-[#4CAF50]"
                      : "border-white/30"
                  }`}
                />
                {label}
              </button>
            );
          })}
        </div>
        {errors.location && (
          <p className="text-red-400 text-xs mt-2">{errors.location}</p>
        )}
      </div>

      {/* Day Availability */}
      <div>
        <label className={labelClass}>
          AVAILABILITY <span className="text-[#F78E2B]">*</span>
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-1">
          {DAYS_OF_WEEK.map((day) => {
            const selected = fields.dayAvailability.includes(day);
            const short = day.slice(0, 3);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`cursor-pointer px-2 py-2 rounded-full text-sm font-bold border transition-colors ${
                  selected
                    ? "border-[#4CAF50] text-[#4CAF50] bg-[#4CAF50]/10"
                    : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                }`}
              >
                {short}
              </button>
            );
          })}
        </div>
        {errors.dayAvailability && (
          <p className="text-red-400 text-xs mt-2">{errors.dayAvailability}</p>
        )}
      </div>

      {/* Preferred Time */}
      <div>
        <label className={labelClass}>
          PREFERRED TIME <span className="text-[#F78E2B]">*</span>
        </label>
        <input
          type="text"
          className={inputClass}
          placeholder="e.g., Evenings after 6pm, Saturday mornings"
          value={fields.preferredTime}
          onChange={(e) => setField("preferredTime", e.target.value)}
        />
        {errors.preferredTime && (
          <p className="text-red-400 text-xs mt-1">{errors.preferredTime}</p>
        )}
      </div>

      {/* Skills Focus */}
      <div>
        <label className={labelClass}>
          SKILLS FOCUS <span className="text-[#F78E2B]">*</span>
        </label>
        <select
          className={selectClass}
          value={fields.skillsFocus}
          onChange={(e) => setField("skillsFocus", e.target.value)}
        >
          <option value="" disabled>
            Select a focus area
          </option>
          {SKILLS_FOCUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.skillsFocus && (
          <p className="text-red-400 text-xs mt-1">{errors.skillsFocus}</p>
        )}
      </div>

      {/* Additional Info */}
      <div>
        <label className={labelClass}>ADDITIONAL INFO</label>
        <textarea
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Anything else you'd like us to know (optional)"
          value={fields.additionalInfo}
          onChange={(e) => setField("additionalInfo", e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full py-5 bg-[#4CAF50] text-white font-black uppercase text-sm tracking-widest mt-10 hover:bg-[#43A047] transition-colors disabled:opacity-50"
      >
        {loading ? "SUBMITTING..." : "SUBMIT INQUIRY"}
      </button>

      {submitError && (
        <p className="text-red-400 text-sm mt-4 text-center">{submitError}</p>
      )}
    </form>
  );
}
