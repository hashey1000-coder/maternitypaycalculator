import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Benefit Calculator — UK 2026/27 | High Income Charge Check",
  description:
    "Free UK Child Benefit calculator for 2026/27. Calculate your weekly and annual payments, and check whether the High Income Child Benefit Charge affects you.",
  keywords: [
    "child benefit calculator",
    "child benefit UK 2026",
    "high income child benefit charge",
    "child benefit how much",
    "child benefit calculator 2026",
    "HICBC calculator",
    "child benefit rates 2026/27",
    "child benefit pension credits",
    "should I claim child benefit",
    "child benefit for second child",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/calculators/child-benefit/",
  },
  openGraph: {
    title: "Child Benefit Calculator — UK 2026/27",
    description:
      "Calculate your Child Benefit payments and check if the High Income Child Benefit Charge reduces your entitlement.",
    type: "website",
    url: "https://maternitypaycalculator.co.uk/calculators/child-benefit/",
    siteName: "Maternity Pay Calculator",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Child Benefit Calculator — UK 2026/27",
    description:
      "Calculate your Child Benefit payments and check the High Income Charge.",
  },
};

export default function ChildBenefitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
