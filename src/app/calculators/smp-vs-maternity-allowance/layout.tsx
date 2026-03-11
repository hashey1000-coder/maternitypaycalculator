import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "SMP vs Maternity Allowance Calculator 2026/27 | Which Do You Qualify For?",
  description:
    "Find out if you qualify for Statutory Maternity Pay (SMP) or Maternity Allowance (MA) with our free comparison calculator. Compare amounts, see eligibility rules, and discover which maternity benefit pays more in 2026/27.",
  keywords: [
    "SMP vs maternity allowance",
    "maternity allowance vs SMP",
    "do I qualify for SMP or maternity allowance",
    "which maternity pay will I get",
    "SMP eligibility checker",
    "maternity allowance eligibility",
    "SMP or MA which is better",
    "maternity pay comparison calculator",
    "can I get maternity allowance instead of SMP",
    "maternity pay if not eligible for SMP",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/calculators/smp-vs-maternity-allowance/`,
  },
  openGraph: {
    title:
      "SMP vs Maternity Allowance Calculator 2026/27 | Eligibility Comparison",
    description:
      "Check whether you qualify for SMP or Maternity Allowance and compare how much you'd receive under each scheme.",
    url: `${SITE_CONFIG.url}/calculators/smp-vs-maternity-allowance/`,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMP vs Maternity Allowance — Which Do You Qualify For?",
    description:
      "Compare Statutory Maternity Pay and Maternity Allowance eligibility and amounts side by side.",
  },
};

export default function SMPvsMALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
