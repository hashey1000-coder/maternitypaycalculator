import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Maternity Pay Calculator UK",
  description:
    "About maternitypaycalculator.co.uk — free UK maternity pay calculators and expert guides to help you plan your maternity leave finances for 2026/27.",
  keywords: [
    "maternity pay calculator",
    "about maternity pay calculator",
    "UK maternity pay",
    "maternity leave calculator",
  ],
  alternates: {
    canonical: "https://maternitypaycalculator.co.uk/about/",
  },
  openGraph: {
    title: "About — Maternity Pay Calculator UK",
    description:
      "Free UK maternity pay calculators and expert guides to help you plan your maternity leave finances.",
    url: "https://maternitypaycalculator.co.uk/about/",
    siteName: "Maternity Pay Calculator",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "About — Maternity Pay Calculator",
    description:
      "Free UK maternity pay calculators and guides to plan your maternity leave finances.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "About" }]} />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
        About <span className="gradient-text">Maternity Pay Calculator</span>
      </h1>

      <div className="prose prose max-w-none text-slate-600 space-y-6">
        <p className="text-lg leading-relaxed">
          <strong>maternitypaycalculator.co.uk</strong> is a free resource
          helping UK parents understand and plan their maternity pay and leave.
          Our calculators are updated with the latest 2026/27 rates and
          thresholds.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">What We Offer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <svg className="w-7 h-7 text-violet-600 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm3.75-7.5H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V8.25A2.25 2.25 0 0018.75 6zM5.25 7.5h13.5v3H5.25v-3z" /></svg>
            <h3 className="font-semibold text-slate-800 mb-1">Free Calculators</h3>
            <p className="text-sm text-slate-500">
              Maternity pay, maternity allowance, child benefit, take-home pay,
              and maternity leave date planners.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <svg className="w-7 h-7 text-violet-600 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h3 className="font-semibold text-slate-800 mb-1">Expert Guides</h3>
            <p className="text-sm text-slate-500">
              Comprehensive guides covering SMP, maternity rights, financial
              planning, shared parental leave, and more.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <svg className="w-7 h-7 text-violet-600 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
            <h3 className="font-semibold text-slate-800 mb-1">Current Rates</h3>
            <p className="text-sm text-slate-500">
              All calculators use the latest 2026/27 UK statutory rates, tax
              bands, and National Insurance thresholds.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <svg className="w-7 h-7 text-violet-600 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            <h3 className="font-semibold text-slate-800 mb-1">Privacy First</h3>
            <p className="text-sm text-slate-500">
              All calculations happen in your browser. We don&apos;t store any
              personal data or salary information.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-8">Important Disclaimer</h2>
        <p>
          The calculators and guides on this website are provided for
          informational purposes only. They give estimates based on current UK
          statutory rates and should not be treated as financial or legal advice.
        </p>
        <p>
          Your actual maternity pay may differ based on your employer&apos;s
          enhanced maternity scheme, your tax code, and other individual
          circumstances. Always confirm your entitlement with your employer or
          HMRC.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">Sources</h2>
        <p>
          Our rates and information are based on official UK government sources
          including GOV.UK, HMRC guidance, and ACAS resources.
        </p>

        <div className="bg-violet-50 rounded-xl p-6 not-prose mt-8">
          <h3 className="font-semibold text-slate-800 mb-2">Get Started</h3>
          <p className="text-sm text-slate-600 mb-4">
            Use our free calculators to plan your maternity leave finances.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-violet-700 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-violet-800 transition-all text-sm"
            >
              Calculate maternity pay
            </Link>
            <Link
              href="/guides/"
              className="bg-white text-violet-700 font-medium px-5 py-2.5 rounded-lg border border-slate-200 hover:border-violet-300 transition-all text-sm"
            >
              Browse guides
            </Link>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Maternity Pay Calculator",
            description: "Free UK maternity pay calculators and expert guides to help you plan your maternity leave finances.",
            url: "https://maternitypaycalculator.co.uk/about/",
            mainEntity: {
              "@type": "Organization",
              name: "Maternity Pay Calculator",
              url: "https://maternitypaycalculator.co.uk/",
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
              { "@type": "ListItem", position: 2, name: "About", item: "https://maternitypaycalculator.co.uk/about/" },
            ],
          }),
        }}
      />
    </div>
  );
}
