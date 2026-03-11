import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maternity Leave Guides — Expert UK Maternity Advice 2026/27",
  description:
    "Comprehensive guides on maternity pay, maternity leave rights, returning to work, financial planning, and more. Free expert advice for UK parents in 2026/27.",
  keywords: [
    "maternity leave guides",
    "maternity pay guide",
    "maternity rights UK",
    "maternity leave rights",
    "SMP explained",
    "maternity allowance guide",
    "returning to work after maternity",
    "shared parental leave",
    "maternity financial planning",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/guides/",
  },
  openGraph: {
    title: "Maternity Leave Guides — Expert UK Maternity Advice 2026/27",
    description:
      "Comprehensive guides on maternity pay, maternity leave rights, returning to work, financial planning, and more.",
    url: "https://maternitypaycalculator.co.uk/guides/",
    siteName: "Maternity Pay Calculator",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Maternity Leave Guides — Expert UK Advice",
    description:
      "Free expert guides on maternity pay, leave rights, financial planning, and more for UK parents.",
  },
};

export default function GuidesPage() {
  const categories = [...new Set(guides.map((g) => g.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Maternity Leave <span className="gradient-text">Guides</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Everything you need to know about maternity pay, your rights,
          financial planning, and returning to work. Written by experts,
          updated for 2026/27.
        </p>
      </div>

      {/* Category sections */}
      {categories.map((category) => {
        const categoryGuides = guides.filter((g) => g.category === category);
        return (
          <section key={category} className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-violet-600 rounded-full" />
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <div className="mt-12 bg-violet-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Ready to calculate your maternity pay?
        </h2>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          Use our free calculator to get your personalised week-by-week maternity
          pay breakdown.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-violet-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-800 transition-all shadow-lg shadow-violet-200"
        >
          Calculate my maternity pay
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

      {/* CollectionPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Maternity Leave Guides",
            description:
              "Comprehensive guides on maternity pay, maternity leave rights, returning to work, financial planning, and more.",
            url: "https://maternitypaycalculator.co.uk/guides/",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: guides.length,
              itemListElement: guides.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://maternitypaycalculator.co.uk/guides/${guide.slug}/`,
                name: guide.title,
              })),
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://maternitypaycalculator.co.uk/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Guides",
                item: "https://maternitypaycalculator.co.uk/guides/",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
