import React from "react";

/**
 * SuccessScreen
 *
 * Shown after a successful form submission.
 * Displays animated success icon, confirmation message,
 * and a brief summary of the registered account.
 */
const SuccessScreen = ({ formData }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="animate-fade-in text-center">
      {/* Animated success ring + icon */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
              animationDuration: "2s",
            }}
          />
          <div className="absolute -inset-3 rounded-full border border-aurora-cyan/20 animate-pulse-slow" />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center animate-success-pop"
            style={{
              background: "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(79,142,247,0.15) 100%)",
              border: "1px solid rgba(34,211,238,0.3)",
              boxShadow: "0 0 40px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <svg className="w-9 h-9 text-aurora-cyan" viewBox="0 0 36 36" fill="none">
              <path d="M8 18l7 7 13-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <h2 className="font-display text-3xl font-semibold shimmer-text mb-3">
        You're all set!
      </h2>
      <p className="text-sm text-white/45 mb-10 max-w-xs mx-auto">
        Your account has been created successfully. Welcome aboard.
      </p>

      {/* Account summary card */}
      <div
        className="text-left rounded-xl p-5 space-y-3 mb-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
          Account Summary
        </p>
        {[
          { label: "Full Name", value: `${formData.firstName} ${formData.lastName}` },
          { label: "Date of Birth", value: formatDate(formData.dateOfBirth) },
          { label: "Email", value: formData.email },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 py-2 border-b border-white/[0.05] last:border-0"
          >
            <span className="text-xs text-white/35">{item.label}</span>
            <span className="text-sm text-white/80 text-right break-all">{item.value}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn-primary w-full flex items-center justify-center gap-2"
        onClick={() => window.location.reload()}
      >
        <HomeIcon />
        Back to Home
      </button>

      <p className="mt-5 text-xs text-white/20">
        A confirmation email has been sent to{" "}
        <span className="text-aurora-blue/60">{formData.email}</span>
      </p>
    </div>
  );
};

const HomeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M2 8.5L8 2l6 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 7v6h3v-3h2v3h3V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SuccessScreen;
