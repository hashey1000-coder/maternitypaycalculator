import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Enhanced Maternity Pay Calculator 2026/27 | Occupational Maternity Pay",
  description:
    "Calculate your enhanced maternity pay from your employer with our free calculator. Compare occupational maternity pay vs statutory SMP, work out your total income during maternity leave in 2026/27.",
  keywords: [
    "enhanced maternity pay calculator",
    "occupational maternity pay calculator",
    "employer maternity pay calculator",
    "enhanced maternity pay vs SMP",
    "full pay maternity leave calculator",
    "company maternity pay policy",
    "maternity pay above SMP",
    "enhanced maternity pay rates",
    "how much maternity pay will I get from employer",
    "contractual maternity pay calculator",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/calculators/enhanced-maternity-pay/`,
  },
  openGraph: {
    title:
      "Enhanced Maternity Pay Calculator 2026/27 | Occupational Maternity Pay",
    description:
      "Calculate your employer's enhanced maternity pay and compare it to statutory SMP. See how much extra your company maternity policy pays.",
    url: `${SITE_CONFIG.url}/calculators/enhanced-maternity-pay/`,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enhanced Maternity Pay Calculator 2026/27",
    description:
      "Calculate your employer's enhanced maternity pay and compare it to statutory SMP.",
  },
};

export default function EnhancedMaternityPayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
