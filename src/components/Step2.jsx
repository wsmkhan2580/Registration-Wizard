import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../validation/schema";

/**
 * Step2 — Account Details
 *
 * Handles Email, Password, and Confirm Password.
 * Features show/hide password toggles and a password strength meter.
 * Calls onNext(data) on valid submit, onBack() to go back.
 */
const Step2 = ({ defaultValues, onNext, onBack, animClass }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues,
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { level: 2, label: "Fair", color: "bg-yellow-500" };
    if (score === 3) return { level: 3, label: "Good", color: "bg-aurora-blue" };
    return { level: 4, label: "Strong", color: "bg-aurora-cyan" };
  };

  const strength = getPasswordStrength(passwordValue);

  return (
    <div className={animClass}>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-white mb-1.5">
          Account Details
        </h2>
        <p className="text-sm text-white/40">
          Secure your account with a strong password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} noValidate>
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="field-label">Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane.doe@example.com"
              className={`field-input ${errors.email ? "error" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <p className="field-error"><ErrorIcon />{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="field-label">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className={`field-input pr-12 ${errors.password ? "error" : ""}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Password strength meter */}
            {passwordValue && (
              <div className="mt-2.5 space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                        bar <= strength.level ? strength.color : "bg-white/[0.08]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/40">
                  Strength:{" "}
                  <span className={`font-medium ${
                    strength.level <= 1 ? "text-red-400"
                    : strength.level === 2 ? "text-yellow-400"
                    : strength.level === 3 ? "text-aurora-blue"
                    : "text-aurora-cyan"
                  }`}>
                    {strength.label}
                  </span>
                </p>
              </div>
            )}

            {errors.password && (
              <p className="field-error mt-1"><ErrorIcon />{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="field-label">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className={`field-input pr-12 ${errors.confirmPassword ? "error" : ""}`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error"><ErrorIcon />{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={onBack} className="btn-ghost">
            <span className="flex items-center gap-2"><ArrowLeftIcon />Back</span>
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="btn-primary min-w-[140px] flex items-center justify-center gap-2"
          >
            Review
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

const EyeIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none">
    <path d="M10 4C5.5 4 2 10 2 10s3.5 6 8 6 8-6 8-6-3.5-6-8-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none">
    <path d="M3 3l14 14M8.5 8.56A2.5 2.5 0 0012.43 12.5M6.3 6.32C4.2 7.6 2.5 10 2.5 10S5.5 16 10 16c1.48 0 2.86-.48 4.04-1.27M10.5 4.05C10.33 4.02 10.17 4 10 4c-4.5 0-7.5 6-7.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M17.5 10s-.8 1.6-2.3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Step2;
