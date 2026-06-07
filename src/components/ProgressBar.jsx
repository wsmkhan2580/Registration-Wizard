import React from "react";

/**
 * ProgressBar
 *
 * Displays step count, step dots, and an animated fill bar.
 * Receives currentStep and totalSteps as props — purely presentational.
 */
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const stepLabels = ["Personal Info", "Account Details", "Review"];

  return (
    <div className="w-full mb-8">
      {/* Step counter text */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-white/40 tracking-widest uppercase">
          Step{" "}
          <span className="text-aurora-blue font-medium">{currentStep}</span>{" "}
          of {totalSteps}
        </p>
        <p className="text-xs font-medium text-white/50">
          {stepLabels[currentStep - 1]}
        </p>
      </div>

      {/* Step dots + connecting bar */}
      <div className="relative flex items-center justify-between">
        {/* Track line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10 z-0" />

        {/* Filled progress line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px z-0 transition-all duration-700 ease-in-out"
          style={{
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #4f8ef7 0%, #9b6dff 100%)",
          }}
        />

        {/* Step dots */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={stepNum} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  border transition-all duration-500 ease-in-out
                  ${isCompleted
                    ? "bg-aurora-blue border-aurora-blue shadow-glow"
                    : isActive
                    ? "bg-aurora-blue/20 border-aurora-blue shadow-glow"
                    : "bg-white/[0.04] border-white/[0.12]"
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={`text-xs font-mono font-medium transition-colors duration-300 ${isActive ? "text-aurora-blue" : "text-white/30"}`}>
                    {stepNum}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Thin animated progress bar */}
      <div className="mt-5 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-in-out"
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            background: "linear-gradient(90deg, #4f8ef7 0%, #9b6dff 60%, #22d3ee 100%)",
            boxShadow: "0 0 8px rgba(79, 142, 247, 0.6)",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
