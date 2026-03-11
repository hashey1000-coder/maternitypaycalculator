import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternity Take-Home Pay Calculator — After Tax & NI | UK 2026/27",
  description:
    "Free UK maternity take-home pay calculator for 2026/27. See your maternity pay after Income Tax and National Insurance deductions, with a month-by-month budget comparison.",
  keywords: [
    "maternity pay after tax",
    "maternity take-home pay",
    "SMP after tax calculator",
    "maternity pay tax deductions",
    "maternity pay net calculator",
    "is maternity pay taxed",
    "maternity pay tax code",
    "how much tax on maternity pay",
    "maternity pay budget planner",
    "SMP national insurance deductions",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/calculators/take-home-pay/",
  },
  openGraph: {
    title: "Maternity Take-Home Pay Calculator — UK 2026/27",
    description:
      "Calculate what your maternity pay looks like after tax and NI. Compare your normal salary to each phase of SMP.",
    type: "website",
    url: "https://maternitypaycalculator.co.uk/calculators/take-home-pay/",
    siteName: "Maternity Pay Calculator",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Maternity Take-Home Pay Calculator — UK 2026/27",
    description:
      "See what your maternity pay looks like after Income Tax and National Insurance deductions.",
  },
};

export default function TakeHomePayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
