import { z } from "zod";

/**
 * Step 1 schema — Personal Information
 */
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Please enter a valid date")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const minAge = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      );
      return date <= minAge;
    }, "You must be at least 13 years old")
    .refine((val) => {
      const date = new Date(val);
      const minDate = new Date("1900-01-01");
      return date >= minDate;
    }, "Please enter a valid date of birth"),
});

/**
 * Step 2 schema — Account Details
 */
export const step2Schema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
