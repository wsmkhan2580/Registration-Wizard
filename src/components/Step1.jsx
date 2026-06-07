import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../validation/schema";

/**
 * Step1 — Personal Information
 *
 * Handles First Name, Last Name, and Date of Birth.
 * Uses RHF uncontrolled inputs with Zod validation.
 * Calls onNext(data) when form is valid so the wizard can advance.
 */
const Step1 = ({ defaultValues, onNext, animClass }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <div className={animClass}>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-white mb-1.5">
          Personal Information
        </h2>
        <p className="text-sm text-white/40">
          Let's start with the basics. All fields are required.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} noValidate>
        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="field-label">First Name</label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              className={`field-input ${errors.firstName ? "error" : ""}`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="field-error"><ErrorIcon />{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="field-label">Last Name</label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              className={`field-input ${errors.lastName ? "error" : ""}`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="field-error"><ErrorIcon />{errors.lastName.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="field-label">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              autoComplete="bday"
              className={`field-input ${errors.dateOfBirth ? "error" : ""} [color-scheme:dark]`}
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="field-error"><ErrorIcon />{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={!isValid}
            className="btn-primary min-w-[140px] flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRightIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

const ErrorIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Step1;
