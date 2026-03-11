import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternity Leave Planner & Date Calculator — UK 2026/27",
  description:
    "Free UK maternity leave date planner. Calculate your earliest start date, notification deadline, qualifying week, and maternity leave end date based on your due date.",
  keywords: [
    "maternity leave planner",
    "maternity leave date calculator",
    "maternity leave start date",
    "qualifying week calculator",
    "when to start maternity leave",
    "maternity leave dates UK",
    "MATB1 form when to get",
    "maternity leave notification deadline",
    "earliest maternity leave start date",
    "how long is maternity leave UK",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/calculators/maternity-leave-planner/",
  },
  openGraph: {
    title: "Maternity Leave Planner & Date Calculator — UK 2026/27",
    description:
      "Enter your due date and instantly calculate all key maternity leave dates. Free tool updated for 2026/27.",
    type: "website",
    url: "https://maternitypaycalculator.co.uk/calculators/maternity-leave-planner/",
    siteName: "Maternity Pay Calculator",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Maternity Leave Planner — UK 2026/27",
    description:
      "Calculate your maternity leave start date, notification deadline, and key dates.",
  },
};

export default function MaternityLeavePlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
