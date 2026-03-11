"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateSMPvsMA, formatCurrency } from "@/lib/calculations";
import type { SMPvsMAResult } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { SITE_CONFIG } from "@/lib/constants";

const faqs = [
  {
    question: "What is the difference between SMP and Maternity Allowance?",
    answer:
      "Statutory Maternity Pay (SMP) is paid by your employer if you've worked for them for at least 26 weeks by the 15th week before your due date and earn at least £129/week. Maternity Allowance (MA) is paid by the Department for Work and Pensions (DWP) if you don't qualify for SMP but have worked or been self-employed in at least 26 of the 66 weeks before your due date.",
  },
  {
    question: "Can I choose between SMP and Maternity Allowance?",
    answer:
      "If you qualify for SMP, you must claim SMP from your employer — you cannot choose to claim Maternity Allowance instead. MA is only available if you don't qualify for SMP. If your employer refuses to pay SMP and you believe they should, you can ask HMRC to make a formal decision.",
  },
  {
    question: "Is Maternity Allowance taxable?",
    answer:
      "No. Maternity Allowance is a tax-free benefit. SMP, on the other hand, is subject to Income Tax and National Insurance deductions. This means your net MA payment equals your gross MA payment, while SMP is reduced by tax and NI.",
  },
  {
    question: "How much is Maternity Allowance in 2026/27?",
    answer:
      "Maternity Allowance is paid at 90% of your average weekly earnings, up to a maximum of £194.32 per week (2026/27). It's paid for up to 39 weeks. If you earn less than £30 per week, you may receive MA at a lower rate of £27 per week.",
  },
  {
    question: "Can I get Maternity Allowance if I'm self-employed?",
    answer:
      "Yes. Self-employed women can claim Maternity Allowance if they've been registered as self-employed with HMRC and paid Class 2 National Insurance for at least 26 of the 66 weeks before the due date. You don't need to have earned a specific amount — Class 2 NI contributions are what matter.",
  },
  {
    question: "What if I don't qualify for either SMP or Maternity Allowance?",
    answer:
      "If you don't qualify for SMP or MA, you may be able to claim Universal Credit, Employment and Support Allowance (ESA), or other benefits. Contact your local Jobcentre Plus or use the GOV.UK benefits calculator to check what you're entitled to.",
  },
  {
    question: "Can I work while receiving Maternity Allowance?",
    answer:
      "You can do up to 10 'Keeping in Touch' (KIT) days without losing your MA. You can also do up to 10 days of work as a 'test period' for a new employer. If you work for more than 10 days for any one employer during your MA period, your MA will stop.",
  },
];

export default function SMPvsMACalculator() {
  const [salary, setSalary] = useState("");
  const [weeklyMA, setWeeklyMA] = useState("");
  const [weeksEmployed, setWeeksEmployed] = useState("");
  const [weeksWorked, setWeeksWorked] = useState("");
  const [result, setResult] = useState<SMPvsMAResult | null>(null);

  const calculate = () => {
    const annualSalary = parseFloat(salary) || 0;
    const weeklyForMA = parseFloat(weeklyMA) || 0;
    const empWeeks = parseInt(weeksEmployed) || 0;
    const workedWeeks = parseInt(weeksWorked) || 0;

    setResult(
      calculateSMPvsMA(annualSalary, weeklyForMA, empWeeks, workedWeeks)
    );
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: "SMP vs Maternity Allowance" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SMP vs Maternity Allowance Calculator 2026/27",
    description:
      "Compare Statutory Maternity Pay (SMP) and Maternity Allowance (MA). Check eligibility and calculate which pays more.",
    url: `${SITE_CONFIG.url}/calculators/smp-vs-maternity-allowance/`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const recommendationStyles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    smp: {
      bg: "bg-violet-50",
      border: "border-slate-200",
      text: "text-violet-800",
      icon: "£",
    },
    ma: {
      bg: "bg-sky-50",
      border: "border-slate-200",
      text: "text-sky-800",
      icon: "MA",
    },
    "ma-only": {
      bg: "bg-sky-50",
      border: "border-slate-200",
      text: "text-sky-800",
      icon: "MA",
    },
    neither: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      icon: "!",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            SMP vs Maternity Allowance{" "}
            <span className="text-violet-600">Comparison Calculator</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Not sure if you&apos;ll get Statutory Maternity Pay (SMP) or
            Maternity Allowance (MA)? Enter your details to check your
            eligibility for both and compare how much you&apos;d receive.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Check Your Eligibility & Compare
          </h2>
          <div className="space-y-6">
            {/* SMP Section */}
            <div className="bg-violet-50 rounded-xl p-5">
              <h3 className="font-semibold text-violet-700 mb-3">
                For SMP Eligibility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Annual Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      £
                    </span>
                    <input
                      type="number"
                      id="salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="e.g. 28000"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="weeksEmployed"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Weeks Employed by Same Employer
                  </label>
                  <input
                    type="number"
                    id="weeksEmployed"
                    value={weeksEmployed}
                    onChange={(e) => setWeeksEmployed(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="e.g. 40"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    By the 15th week before due date
                  </p>
                </div>
              </div>
            </div>

            {/* MA Section */}
            <div className="bg-sky-50 rounded-xl p-5">
              <h3 className="font-semibold text-sky-700 mb-3">
                For Maternity Allowance Eligibility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="weeklyMA"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Average Weekly Earnings
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      £
                    </span>
                    <input
                      type="number"
                      id="weeklyMA"
                      value={weeklyMA}
                      onChange={(e) => setWeeklyMA(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="e.g. 350"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Highest 13 weeks in the 66-week test period
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="weeksWorked"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Weeks Worked in 66-Week Period
                  </label>
                  <input
                    type="number"
                    id="weeksWorked"
                    value={weeksWorked}
                    onChange={(e) => setWeeksWorked(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="e.g. 30"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Need at least 26 of 66 weeks before due date
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-violet-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-violet-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Compare SMP vs Maternity Allowance
            </button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              {/* Recommendation */}
              <div
                className={`rounded-xl p-5 border ${
                  recommendationStyles[result.recommendation].bg
                } ${recommendationStyles[result.recommendation].border}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${recommendationStyles[result.recommendation].bg} ${recommendationStyles[result.recommendation].text}`}>
                    {recommendationStyles[result.recommendation].icon}
                  </span>
                  <div>
                    <h3
                      className={`font-semibold text-lg ${
                        recommendationStyles[result.recommendation].text
                      }`}
                    >
                      {result.recommendation === "smp"
                        ? "You Qualify for SMP (Recommended)"
                        : result.recommendation === "ma"
                          ? "Both Available — MA May Pay More Net"
                          : result.recommendation === "ma-only"
                            ? "You Qualify for Maternity Allowance"
                            : "Further Investigation Needed"}
                    </h3>
                    <p className="text-slate-700 mt-1">{result.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Side-by-side Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`rounded-xl p-5 border ${
                    result.smpQualifies
                      ? "bg-violet-50 border-slate-200"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  <h3 className="font-semibold text-violet-700 mb-3 flex items-center gap-2">
                    SMP
                    {result.smpQualifies ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Eligible
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        Not Eligible
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">First 6 weeks</span>
                      <span className="font-medium">
                        {formatCurrency(result.smpWeeklyHigher)}/wk
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Weeks 7–39</span>
                      <span className="font-medium">
                        {formatCurrency(result.smpWeeklyFlat)}/wk
                      </span>
                    </div>
                    <hr className="border-slate-200" />
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total gross</span>
                      <span className="font-bold">
                        {formatCurrency(result.smpTotalGross)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estimated net</span>
                      <span className="font-bold text-violet-700">
                        {formatCurrency(result.smpTotalNet)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Subject to Income Tax &amp; NI
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl p-5 border ${
                    result.maQualifies
                      ? "bg-sky-50 border-slate-200"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  <h3 className="font-semibold text-sky-700 mb-3 flex items-center gap-2">
                    Maternity Allowance
                    {result.maQualifies ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Eligible
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        Not Eligible
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Weekly rate</span>
                      <span className="font-medium">
                        {formatCurrency(result.maWeekly)}/wk
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration</span>
                      <span className="font-medium">39 weeks</span>
                    </div>
                    <hr className="border-slate-200" />
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total gross</span>
                      <span className="font-bold">
                        {formatCurrency(result.maTotalGross)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Net (tax-free)</span>
                      <span className="font-bold text-sky-700">
                        {formatCurrency(result.maTotalNet)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      MA is not taxable ✓
                    </p>
                  </div>
                </div>
              </div>

              {/* Net Difference */}
              {(result.smpQualifies || result.maQualifies) && (
                <div className="bg-gradient-to-r from-violet-50 to-sky-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-slate-600 mb-1">
                    Net Difference Over 39 Weeks
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {formatCurrency(result.netDifference)}
                  </p>
                  <p className="text-sm text-slate-500">
                    {result.recommendation === "smp"
                      ? "more from SMP (after tax)"
                      : result.recommendation === "ma"
                        ? "more from MA (tax-free)"
                        : ""}
                  </p>
                </div>
              )}

              <p className="text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <strong>Note:</strong> SMP net figures are estimates based on basic-rate
                tax. Your actual deductions depend on your full tax code, other income,
                and personal circumstances. Maternity Allowance figures are exact as MA
                is tax-free. This tool is for guidance only — for a formal decision on
                SMP eligibility, contact HMRC.
              </p>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="prose prose max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            SMP vs Maternity Allowance: Which Will You Get?
          </h2>
          <p className="text-slate-700 mb-4">
            In the UK, there are two main types of maternity pay: Statutory Maternity Pay (SMP)
            paid by your employer, and Maternity Allowance (MA) paid by the government. You
            cannot claim both at the same time, and which one you receive depends on your
            employment status and earnings history.
          </p>
          <p className="text-slate-700 mb-4">
            Understanding the difference between SMP and Maternity Allowance is crucial for
            planning your finances during maternity leave. While both provide up to 39 weeks
            of pay, the amounts and tax treatment differ significantly.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            SMP vs Maternity Allowance at a Glance
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left p-3 border border-slate-200">Feature</th>
                  <th className="text-left p-3 border border-slate-200">SMP</th>
                  <th className="text-left p-3 border border-slate-200">Maternity Allowance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Paid by</td>
                  <td className="p-3 border border-slate-200">Your employer</td>
                  <td className="p-3 border border-slate-200">DWP (government)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Duration</td>
                  <td className="p-3 border border-slate-200">39 weeks</td>
                  <td className="p-3 border border-slate-200">39 weeks</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Higher rate</td>
                  <td className="p-3 border border-slate-200">
                    6 weeks at 90% of AWE
                  </td>
                  <td className="p-3 border border-slate-200">
                    No higher rate period
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Standard rate</td>
                  <td className="p-3 border border-slate-200">
                    £194.32/wk or 90% (lower)
                  </td>
                  <td className="p-3 border border-slate-200">
                    90% of AWE (max £194.32/wk)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Taxable?</td>
                  <td className="p-3 border border-slate-200">Yes — Income Tax &amp; NI</td>
                  <td className="p-3 border border-slate-200">No — tax-free</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Employment needed</td>
                  <td className="p-3 border border-slate-200">
                    26 weeks with same employer
                  </td>
                  <td className="p-3 border border-slate-200">
                    26 of 66 weeks (any work)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Minimum earnings</td>
                  <td className="p-3 border border-slate-200">£129/wk (LEL)</td>
                  <td className="p-3 border border-slate-200">£30/wk for 13 weeks</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Self-employed?</td>
                  <td className="p-3 border border-slate-200">No</td>
                  <td className="p-3 border border-slate-200">Yes (with Class 2 NI)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Who Qualifies for SMP?
          </h3>
          <p className="text-slate-700 mb-4">
            To qualify for Statutory Maternity Pay (SMP), you must meet all of the following
            conditions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
            <li>
              <strong>Continuous employment</strong> — You&apos;ve worked for the same employer
              for at least 26 continuous weeks by the 15th week before your expected due date
              (the &quot;qualifying week&quot;)
            </li>
            <li>
              <strong>Earnings threshold</strong> — You earn at least £129 per week on average
              (the Lower Earnings Limit for 2026/27) in the 8-week &quot;relevant period&quot;
            </li>
            <li>
              <strong>Proper notice</strong> — You&apos;ve given your employer at least 28 days&apos;
              notice (or as soon as reasonably practical)
            </li>
            <li>
              <strong>Medical evidence</strong> — You&apos;ve provided a MATB1 certificate from
              your midwife or doctor
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Who Qualifies for Maternity Allowance?
          </h3>
          <p className="text-slate-700 mb-4">
            Maternity Allowance is designed for women who don&apos;t qualify for SMP. You may be
            eligible if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
            <li>
              <strong>Employed but not eligible for SMP</strong> — You&apos;ve changed jobs during
              pregnancy, work part-time for multiple employers, or haven&apos;t been employed long enough
            </li>
            <li>
              <strong>Self-employed</strong> — You&apos;re registered as self-employed with HMRC
              and have paid Class 2 NI contributions for at least 26 of the 66 weeks before your
              due date
            </li>
            <li>
              <strong>Recently stopped working</strong> — You&apos;ve worked in at least 26 of
              the 66 weeks before your due date (the &quot;test period&quot;)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Why SMP is Usually Worth More Than MA
          </h3>
          <p className="text-slate-700 mb-4">
            For most employed women, SMP pays more than MA because of the 6-week higher rate
            period. During these first 6 weeks, SMP is paid at 90% of your average weekly
            earnings with no cap. For someone earning £30,000 per year, that&apos;s about
            £519/week — significantly more than the MA flat rate of £194.32/week.
          </p>
          <p className="text-slate-700 mb-4">
            However, MA has one important advantage: it&apos;s <strong>completely tax-free</strong>.
            SMP is subject to Income Tax and National Insurance, which reduces the amount you
            actually take home. For lower earners close to the Lower Earnings Limit, the tax
            savings on MA can sometimes mean you&apos;re better off overall — though this is rare.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            What If My Employer Refuses to Pay SMP?
          </h3>
          <p className="text-slate-700 mb-4">
            If you believe you qualify for SMP but your employer refuses to pay, they must give
            you form SMP1 explaining why. You can then contact HMRC&apos;s statutory payments
            disputes team, who will make a formal decision. If HMRC agrees you&apos;re entitled
            to SMP, they can direct your employer to pay. In the meantime, you may be able to
            claim Maternity Allowance while the dispute is resolved.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Agency Workers, Zero-Hours Contracts &amp; Maternity Pay
          </h3>
          <p className="text-slate-700 mb-4">
            If you work through an employment agency, you may qualify for SMP from the agency
            if you meet the standard employment and earnings criteria. Zero-hours contract
            workers can also qualify for SMP if they&apos;ve been employed by the same employer
            for 26+ weeks and their average earnings meet the Lower Earnings Limit.
          </p>
          <p className="text-slate-700 mb-4">
            For agency workers and those on irregular hours, Maternity Allowance is often
            a better fit because the eligibility rules are more flexible — you don&apos;t
            need 26 weeks with the same employer, just 26 weeks of any work out of 66.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            How to Claim Maternity Allowance
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-700 mb-4">
            <li>
              <strong>Get your MATB1 certificate</strong> from your midwife or doctor (available
              from 20 weeks of pregnancy)
            </li>
            <li>
              <strong>Complete form MA1</strong> — available online from GOV.UK or from your
              Jobcentre Plus
            </li>
            <li>
              <strong>Send your application</strong> from the 26th week of pregnancy onwards
            </li>
            <li>
              <strong>Include evidence of earnings</strong> — payslips from the relevant test
              period
            </li>
          </ol>

          <div className="bg-violet-50 border border-slate-200 rounded-xl p-6 mt-8 mb-6">
            <h3 className="text-lg font-semibold text-violet-800 mb-3">
              Related Calculators
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  Maternity Pay Calculator
                </Link>{" "}
                — Calculate your full SMP week by week
              </li>
              <li>
                <Link
                  href="/calculators/maternity-allowance/"
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  Maternity Allowance Calculator
                </Link>{" "}
                — Calculate your MA entitlement
              </li>
              <li>
                <Link
                  href="/calculators/take-home-pay/"
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  Take-Home Pay Calculator
                </Link>{" "}
                — See your after-tax maternity income
              </li>
            </ul>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-violet-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
          <p className="text-slate-600 mb-4">Learn more about SMP and Maternity Allowance with our detailed guides:</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">Statutory Maternity Pay Explained</Link> — full breakdown of SMP eligibility and rates</li>
            <li><Link href="/guides/maternity-allowance-guide/" className="text-violet-600 hover:underline">Maternity Allowance Guide</Link> — how MA works and how to claim</li>
            <li><Link href="/guides/maternity-pay-agency-zero-hours-workers/" className="text-violet-600 hover:underline">Maternity Pay for Agency &amp; Zero-Hours Workers</Link> — SMP vs MA for non-standard contracts</li>
            <li><Link href="/guides/maternity-pay-self-employed/" className="text-violet-600 hover:underline">Maternity Pay for Self-Employed</Link> — your Maternity Allowance entitlement</li>
          </ul>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
