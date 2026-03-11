import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternity Allowance Calculator — UK 2026/27 | Check Your Entitlement",
  description:
    "Free UK Maternity Allowance calculator for 2026/27. Calculate your weekly MA payment if you're self-employed, recently changed jobs, or don't qualify for SMP.",
  keywords: [
    "maternity allowance calculator",
    "maternity allowance UK 2026",
    "maternity allowance self-employed",
    "MA calculator",
    "maternity allowance how much",
    "maternity allowance eligibility",
    "maternity allowance agency workers",
    "maternity allowance zero hours contract",
    "maternity allowance if changed jobs",
    "maternity allowance rate 2026/27",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/calculators/maternity-allowance/",
  },
  openGraph: {
    title: "Maternity Allowance Calculator — UK 2026/27",
    description:
      "Calculate your Maternity Allowance entitlement. Free tool for self-employed workers and those who don't qualify for Statutory Maternity Pay.",
    type: "website",
    url: "https://maternitypaycalculator.co.uk/calculators/maternity-allowance/",
    siteName: "Maternity Pay Calculator",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Maternity Allowance Calculator — UK 2026/27",
    description:
      "Calculate your Maternity Allowance if you're self-employed or don't qualify for SMP.",
  },
};

export default function MaternityAllowanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
