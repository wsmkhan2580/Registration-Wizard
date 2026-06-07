import { useState, useCallback } from "react";
import { initialFormData } from "../data/initialFormData";

/**
 * useWizard
 *
 * Central state management hook for the multi-step registration wizard.
 * Tracks current step, accumulated form data, and navigation direction
 * (used to drive slide-in animation direction).
 */
export function useWizard() {
  const TOTAL_STEPS = 3;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [isComplete, setIsComplete] = useState(false);
  const [navDirection, setNavDirection] = useState("forward");

  /**
   * Merge partial step data into the accumulated formData and advance to next step.
   * @param {object} stepValues - validated values from the current step's RHF handleSubmit
   */
  const nextStep = useCallback(
    (stepValues) => {
      setFormData((prev) => ({ ...prev, ...stepValues }));
      setNavDirection("forward");
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    },
    [TOTAL_STEPS]
  );

  /**
   * Go back one step without losing accumulated data.
   */
  const prevStep = useCallback(() => {
    setNavDirection("back");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  /**
   * Final submit — log payload and mark wizard as complete.
   */
  const submitForm = useCallback(
    (finalStepValues) => {
      const payload = { ...formData, ...finalStepValues };
      setFormData(payload);

      console.group("🚀 Registration Payload");
      console.log(JSON.stringify(payload, null, 2));
      console.groupEnd();

      setIsComplete(true);
    },
    [formData]
  );

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    isComplete,
    navDirection,
    nextStep,
    prevStep,
    submitForm,
  };
}
