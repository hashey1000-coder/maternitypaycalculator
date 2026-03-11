// UK Statutory Maternity Pay rates for 2026/2027 tax year
export const SMP_RATES = {
  // First 6 weeks: 90% of average weekly earnings (no cap)
  FIRST_6_WEEKS_RATE: 0.9,
  // Remaining 33 weeks: lower of 90% AWE or flat rate
  FLAT_RATE_WEEKLY: 194.32, // £194.32 per week for 2026/2027
  // Minimum earnings threshold to qualify
  LOWER_EARNINGS_LIMIT: 129.0, // £129 per week for 2026/2027
  // Total SMP duration
  TOTAL_WEEKS: 39,
  HIGHER_RATE_WEEKS: 6,
  LOWER_RATE_WEEKS: 33,
  // Total maternity leave entitlement
  TOTAL_LEAVE_WEEKS: 52,
  UNPAID_WEEKS: 13,
};

export const TAX_RATES_2025_26 = {
  PERSONAL_ALLOWANCE: 12570,
  BASIC_RATE: 0.2,
  BASIC_RATE_UPPER: 50270,
  HIGHER_RATE: 0.4,
  HIGHER_RATE_UPPER: 125140,
  ADDITIONAL_RATE: 0.45,
  NI_RATE: 0.08,
  NI_THRESHOLD_YEARLY: 12570,
  NI_UPPER_YEARLY: 50270,
  NI_UPPER_RATE: 0.02,
};

// Alias for 2026/27 (thresholds remain frozen)
export const TAX_RATES_2026_27 = TAX_RATES_2025_26;

export const CHILD_BENEFIT_RATES = {
  FIRST_CHILD_WEEKLY: 27.05,
  ADDITIONAL_CHILD_WEEKLY: 17.90,
  HIGH_INCOME_THRESHOLD: 60000,
  HIGH_INCOME_CAP: 80000,
};

export const SITE_CONFIG = {
  name: "Maternity Pay Calculator",
  domain: "maternitypaycalculator.co.uk",
  description:
    "Free UK Maternity Pay Calculator — instantly calculate your Statutory Maternity Pay (SMP), maternity allowance, and plan your maternity leave finances.",
  url: "https://maternitypaycalculator.co.uk",
};

export const CALCULATORS = [
  {
    title: "Maternity Pay Calculator",
    description:
      "Calculate your Statutory Maternity Pay (SMP) week by week and see exactly what you'll receive during your maternity leave.",
    href: "/",
    icon: "calculator",
    featured: true,
  },
  {
    title: "Maternity Leave Planner",
    description:
      "Plan your maternity leave dates, including when to notify your employer and your earliest/latest start dates.",
    href: "/calculators/maternity-leave-planner/",
    icon: "calendar",
    featured: false,
  },
  {
    title: "Maternity Allowance Calculator",
    description:
      "Calculate your Maternity Allowance if you don't qualify for Statutory Maternity Pay from your employer.",
    href: "/calculators/maternity-allowance/",
    icon: "banknotes",
    featured: false,
  },
  {
    title: "Child Benefit Calculator",
    description:
      "Work out your weekly and annual Child Benefit payments, including the High Income Child Benefit Charge.",
    href: "/calculators/child-benefit/",
    icon: "users",
    featured: false,
  },
  {
    title: "Take-Home Pay Calculator",
    description:
      "See what your maternity pay looks like after tax and National Insurance deductions.",
    href: "/calculators/take-home-pay/",
    icon: "wallet",
    featured: false,
  },
  {
    title: "Shared Parental Leave Calculator",
    description:
      "Work out how to split maternity leave and Shared Parental Pay (ShPP) between you and your partner.",
    href: "/calculators/shared-parental-leave/",
    icon: "people",
    featured: false,
  },
  {
    title: "Enhanced Maternity Pay Calculator",
    description:
      "Calculate your total maternity pay when your employer offers enhanced pay above SMP.",
    href: "/calculators/enhanced-maternity-pay/",
    icon: "sparkle",
    featured: false,
  },
  {
    title: "SMP vs Maternity Allowance",
    description:
      "Check if you qualify for SMP or Maternity Allowance and compare how much you'd receive.",
    href: "/calculators/smp-vs-maternity-allowance/",
    icon: "scale",
    featured: false,
  },
];

export const NAV_LINKS = [
  { label: "SMP Calculator", href: "/" },
  { label: "Guides", href: "/guides/" },
  { label: "About", href: "/about/" },
];

export const CALCULATOR_NAV_LINKS = [
  { label: "SMP Calculator", href: "/", shortLabel: "SMP" },
  { label: "Maternity Allowance", href: "/calculators/maternity-allowance/", shortLabel: "MA" },
  { label: "Leave Planner", href: "/calculators/maternity-leave-planner/", shortLabel: "Planner" },
  { label: "Take-Home Pay", href: "/calculators/take-home-pay/", shortLabel: "Take-Home" },
  { label: "Child Benefit", href: "/calculators/child-benefit/", shortLabel: "Child Benefit" },
  { label: "Shared Parental Leave", href: "/calculators/shared-parental-leave/", shortLabel: "SPL" },
  { label: "Enhanced Pay", href: "/calculators/enhanced-maternity-pay/", shortLabel: "Enhanced" },
  { label: "SMP vs MA", href: "/calculators/smp-vs-maternity-allowance/", shortLabel: "SMP vs MA" },
];
