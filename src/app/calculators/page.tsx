import { Metadata } from "next";
import CalculatorCards from "@/components/CalculatorCards";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free UK Maternity Calculators — SMP, Maternity Allowance & More 2026/27",
  description:
    "Free online calculators for UK maternity pay, maternity allowance, child benefit, maternity leave dates, and take-home pay. Updated for 2026/27.",
  keywords: [
    "maternity pay calculator",
    "maternity allowance calculator",
    "child benefit calculator",
    "maternity leave date calculator",
    "take-home maternity pay",
    "SMP calculator UK",
    "maternity pay after tax",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/calculators/",
  },
  openGraph: {
    title: "Free UK Maternity Calculators — SMP, Maternity Allowance & More",
    description:
      "Free online calculators for UK maternity pay, maternity allowance, child benefit, maternity leave dates, and take-home pay.",
    url: "https://maternitypaycalculator.co.uk/calculators/",
    siteName: "Maternity Pay Calculator",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Free UK Maternity Calculators 2026/27",
    description:
      "Calculate your maternity pay, maternity allowance, child benefit, and take-home pay with our free tools.",
  },
};

export default function CalculatorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "All Calculators" }]} />
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Maternity <span className="gradient-text">Calculators</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          All the free tools you need to plan your maternity leave finances.
          Updated with the latest 2026/27 UK rates.
        </p>
      </div>
      <CalculatorCards />

      <div className="mt-16 bg-violet-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Need help understanding your entitlement?
        </h2>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          Read our comprehensive guides covering everything from SMP
          eligibility to financial planning for maternity leave.
        </p>
        <Link
          href="/guides/"
          className="inline-flex items-center gap-2 bg-violet-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-800 transition-colors"
        >
          Browse guides
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Free UK Maternity Calculators 2026/27",
            description: "Free online calculators for UK maternity pay, maternity allowance, child benefit, maternity leave dates, and take-home pay.",
            url: "https://maternitypaycalculator.co.uk/calculators/",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Maternity Pay Calculator", url: "https://maternitypaycalculator.co.uk/" },
                { "@type": "ListItem", position: 2, name: "Maternity Leave Planner", url: "https://maternitypaycalculator.co.uk/calculators/maternity-leave-planner/" },
                { "@type": "ListItem", position: 3, name: "Maternity Allowance Calculator", url: "https://maternitypaycalculator.co.uk/calculators/maternity-allowance/" },
                { "@type": "ListItem", position: 4, name: "Child Benefit Calculator", url: "https://maternitypaycalculator.co.uk/calculators/child-benefit/" },
                { "@type": "ListItem", position: 5, name: "Take-Home Pay Calculator", url: "https://maternitypaycalculator.co.uk/calculators/take-home-pay/" },
                { "@type": "ListItem", position: 6, name: "Shared Parental Leave Calculator", url: "https://maternitypaycalculator.co.uk/calculators/shared-parental-leave/" },
                { "@type": "ListItem", position: 7, name: "Enhanced Maternity Pay Calculator", url: "https://maternitypaycalculator.co.uk/calculators/enhanced-maternity-pay/" },
                { "@type": "ListItem", position: 8, name: "SMP vs Maternity Allowance", url: "https://maternitypaycalculator.co.uk/calculators/smp-vs-maternity-allowance/" },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://maternitypaycalculator.co.uk/" },
              { "@type": "ListItem", position: 2, name: "Calculators", item: "https://maternitypaycalculator.co.uk/calculators/" },
            ],
          }),
        }}
      />
    </div>
  );
}
