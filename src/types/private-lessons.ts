import { z } from "zod";

export const POSITIONS = [
  "Forward",
  "Defense",
  "Goalie",
  "Not Sure Yet",
] as const;

export const LOCATIONS = [
  "Thayer Sports Center",
  "Gallo Ice Arena",
] as const;

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const SKILLS_FOCUS_OPTIONS = [
  "Skating",
  "Shooting",
  "Puck Handling",
  "Passing",
  "Defense",
  "Goaltending",
  "Overall Development",
] as const;

export const PrivateLessonsFormSchema = z.object({
  playerName: z
    .string()
    .min(2, "Player name is required.")
    .max(150),
  guardianName: z
    .string()
    .min(2, "Guardian/Parent name is required.")
    .max(150),
  email: z.string().email("Please enter a valid email address."),
  currentTeam: z
    .string()
    .max(150)
    .optional()
    .or(z.literal("")),
  birthdate: z.object({
    month: z
      .string()
      .regex(/^(0?[1-9]|1[0-2])$/, "Please select a valid month."),
    day: z
      .string()
      .regex(/^(0?[1-9]|[12]\d|3[01])$/, "Please select a valid day."),
    year: z
      .string()
      .regex(/^\d{4}$/, "Please enter a valid year.")
      .refine(
        (y) => parseInt(y) >= 2005 && parseInt(y) <= new Date().getFullYear(),
        "Please enter a valid birth year."
      ),
  }),
  position: z.enum(POSITIONS, {
    error: "Please select a position.",
  }),
  location: z.enum(LOCATIONS, {
    error: "Please select a rink location.",
  }),
  dayAvailability: z
    .array(z.enum(DAYS_OF_WEEK))
    .min(1, "Please select at least one day of availability."),
  preferredTime: z
    .string()
    .min(1, "Please provide a preferred time.")
    .max(200),
  skillsFocus: z.enum(SKILLS_FOCUS_OPTIONS, {
    error: "Please select a skills focus.",
  }),
  additionalInfo: z.string().max(1000).optional().or(z.literal("")),
});

export type PrivateLessonsFormData = z.infer<typeof PrivateLessonsFormSchema>;
