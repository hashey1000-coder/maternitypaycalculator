import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Shared Parental Leave Calculator 2026/27 | Split Maternity Leave & ShPP",
  description:
    "Calculate how to split maternity leave and pay between parents with our free Shared Parental Leave (SPL) calculator. Work out ShPP entitlement, weeks available, and total pay for mother and partner in 2026/27.",
  keywords: [
    "shared parental leave calculator",
    "ShPP calculator",
    "shared parental pay calculator 2026",
    "split maternity leave calculator",
    "shared parental leave entitlement",
    "how to share maternity leave",
    "shared parental leave pay rates",
    "ShPP rates 2026/27",
    "can my partner take my maternity leave",
    "shared parental leave how much pay",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/calculators/shared-parental-leave/`,
  },
  openGraph: {
    title: "Shared Parental Leave Calculator 2026/27 | ShPP Pay Calculator",
    description:
      "Work out how to split maternity leave between parents. Calculate ShPP entitlement, weeks available, and total pay for mother and partner.",
    url: `${SITE_CONFIG.url}/calculators/shared-parental-leave/`,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shared Parental Leave Calculator 2026/27",
    description:
      "Calculate how to split maternity leave and Shared Parental Pay (ShPP) between parents.",
  },
};

export default function SharedParentalLeaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
