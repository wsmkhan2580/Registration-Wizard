import React, { useState, useCallback } from "react";
import { useWizard } from "./hooks/useWizard";
import ProgressBar from "./components/ProgressBar";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import SuccessScreen from "./components/SuccessScreen";

/**
 * App.jsx
 *
 * Root component. Composes the wizard shell:
 * - Animated background (orbs + noise)
 * - Glassmorphism card container
 * - ProgressBar (hidden on success)
 * - Step routing with direction-aware animations
 * - SuccessScreen on completion
 */
export default function App() {
  const {
    currentStep,
    totalSteps,
    formData,
    isComplete,
    navDirection,
    nextStep,
    prevStep,
    submitForm,
  } = useWizard();

  const [animKey, setAnimKey] = useState(0);

  const handleNext = useCallback(
    (data) => {
      setAnimKey((k) => k + 1);
      nextStep(data);
    },
    [nextStep]
  );

  const handleBack = useCallback(() => {
    setAnimKey((k) => k + 1);
    prevStep();
  }, [prevStep]);

  const handleSubmit = useCallback(() => {
    submitForm({});
  }, [submitForm]);

  const animClass =
    navDirection === "forward" ? "step-enter" : "step-enter-back";

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 noise-overlay overflow-hidden">
      {/* Ambient background orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* Fine grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand mark */}
        {!isComplete && (
          <div className="flex items-center justify-center gap-2.5 mb-6 animate-fade-up">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #4f8ef7 0%, #9b6dff 100%)",
                boxShadow: "0 4px 12px rgba(79, 142, 247, 0.3)",
              }}
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L1 4v3c0 3 2.5 5.5 6 6 3.5-.5 6-3 6-6V4L7 1z"
                  stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-display text-sm font-medium text-white/60 tracking-wide">
              Phase 3
            </span>
          </div>
        )}

        {/* Glass card */}
        <div
          className="glass-card p-7 sm:p-9 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          {isComplete ? (
            <SuccessScreen formData={formData} />
          ) : (
            <>
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

              <div key={animKey}>
                {currentStep === 1 && (
                  <Step1
                    defaultValues={{
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      dateOfBirth: formData.dateOfBirth,
                    }}
                    onNext={handleNext}
                    animClass={animClass}
                  />
                )}
                {currentStep === 2 && (
                  <Step2
                    defaultValues={{
                      email: formData.email,
                      password: formData.password,
                      confirmPassword: formData.confirmPassword,
                    }}
                    onNext={handleNext}
                    onBack={handleBack}
                    animClass={animClass}
                  />
                )}
                {currentStep === 3 && (
                  <Step3
                    formData={formData}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                    animClass={animClass}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Sign in link */}
        {!isComplete && (
          <p
            className="text-center mt-5 text-xs text-white/20 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Already have an account?{" "}
            <span className="text-aurora-blue/60 hover:text-aurora-blue cursor-pointer transition-colors duration-200">
              Sign in
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
