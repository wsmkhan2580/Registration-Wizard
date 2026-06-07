import React from "react";

/**
 * Step3 — Review & Submit
 *
 * Displays a clean summary of all collected formData.
 * Masks the password for security.
 * Calls onSubmit() when the user confirms, onBack() to revise.
 */
const Step3 = ({ formData, onSubmit, onBack, animClass }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const maskPassword = (pwd) => "•".repeat(Math.min(pwd.length, 12));

  const sections = [
    {
      title: "Personal Information",
      icon: <PersonIcon />,
      color: "text-aurora-blue",
      borderColor: "border-aurora-blue/20",
      bgColor: "bg-aurora-blue/[0.06]",
      rows: [
        { label: "First Name", value: formData.firstName },
        { label: "Last Name", value: formData.lastName },
        { label: "Date of Birth", value: formatDate(formData.dateOfBirth) },
      ],
    },
    {
      title: "Account Details",
      icon: <ShieldIcon />,
      color: "text-aurora-purple",
      borderColor: "border-aurora-purple/20",
      bgColor: "bg-aurora-purple/[0.06]",
      rows: [
        { label: "Email", value: formData.email },
        { label: "Password", value: maskPassword(formData.password), isMono: true },
      ],
    },
  ];

  return (
    <div className={animClass}>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-white mb-1.5">
          Review &amp; Confirm
        </h2>
        <p className="text-sm text-white/40">
          Everything look right? Submit to create your account.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`rounded-xl border ${section.borderColor} ${section.bgColor} p-4`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className={section.color}>{section.icon}</span>
              <span className={`text-xs font-semibold uppercase tracking-widest ${section.color}`}>
                {section.title}
              </span>
            </div>
            <div className="space-y-2.5">
              {section.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4">
                  <span className="text-xs text-white/35 flex-shrink-0 pt-0.5">{row.label}</span>
                  <span className={`text-sm text-white/85 text-right break-all ${row.isMono ? "font-mono tracking-widest text-white/50" : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-white/25 leading-relaxed">
        By submitting you agree to our{" "}
        <span className="text-aurora-blue/70 cursor-pointer hover:text-aurora-blue transition-colors">Terms of Service</span>{" "}
        and{" "}
        <span className="text-aurora-blue/70 cursor-pointer hover:text-aurora-blue transition-colors">Privacy Policy</span>.
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="btn-ghost">
          <span className="flex items-center gap-2"><ArrowLeftIcon />Back</span>
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="btn-primary min-w-[160px] flex items-center justify-center gap-2"
        >
          <CheckIcon />
          Create Account
        </button>
      </div>
    </div>
  );
};

const PersonIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 14s5-2.5 5-5.5v-4L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 8.5l4 4 7-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Step3;
