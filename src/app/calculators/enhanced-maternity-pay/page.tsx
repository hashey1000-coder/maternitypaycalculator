"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateEnhancedMaternityPay,
  formatCurrency,
} from "@/lib/calculations";
import type { EnhancedPayResult } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { SITE_CONFIG } from "@/lib/constants";

const faqs = [
  {
    question: "What is enhanced maternity pay?",
    answer:
      "Enhanced maternity pay (also called occupational or contractual maternity pay) is any pay your employer gives you above the statutory minimum (SMP). Many employers offer full or partial salary for a set number of weeks — for example, 12 weeks at full pay followed by SMP. Enhanced maternity pay is part of your employment contract and varies between employers.",
  },
  {
    question: "Is enhanced maternity pay the same as SMP?",
    answer:
      "No. SMP (Statutory Maternity Pay) is the legal minimum your employer must pay — 6 weeks at 90% of your average weekly earnings, then 33 weeks at £194.32/week (2026/27). Enhanced maternity pay is anything your employer offers on top of this. Your employer can include SMP within the enhanced amount, meaning they top up the statutory pay to a higher level.",
  },
  {
    question: "Do all employers offer enhanced maternity pay?",
    answer:
      "No. Enhanced maternity pay is not a legal requirement. Many large employers and public sector organisations offer it, but some smaller employers pay only the statutory minimum. Check your employment contract, employee handbook, or HR department for your company's maternity pay policy.",
  },
  {
    question: "Do I have to pay back enhanced maternity pay?",
    answer:
      "Some employers include a clawback clause requiring you to repay some or all of the enhanced pay if you don't return to work for a specified period (often 3–6 months). This only applies to the enhanced portion — you never have to repay statutory SMP. Check your contract carefully before accepting enhanced pay.",
  },
  {
    question: "Is enhanced maternity pay taxable?",
    answer:
      "Yes. Enhanced maternity pay is treated as earnings and is subject to Income Tax and National Insurance deductions, just like your normal salary. SMP is also taxable. Your employer will deduct tax through PAYE as normal.",
  },
  {
    question: "Can I negotiate enhanced maternity pay?",
    answer:
      "Yes. If your employer doesn't have an enhanced maternity pay policy, or if the existing policy could be improved, you can discuss this with your employer or HR department. Many employers are willing to improve their offering to attract and retain talented staff. Having a clear understanding of the market rate from similar employers can help your negotiation.",
  },
];

export default function EnhancedMaternityPayCalculator() {
  const [salary, setSalary] = useState("");
  const [enhancedWeeks, setEnhancedWeeks] = useState("12");
  const [enhancedPercent, setEnhancedPercent] = useState("100");
  const [result, setResult] = useState<EnhancedPayResult | null>(null);

  const calculate = () => {
    const annualSalary = parseFloat(salary);
    if (isNaN(annualSalary) || annualSalary <= 0) return;

    const weeks = parseInt(enhancedWeeks) || 12;
    const percent = parseInt(enhancedPercent) || 100;

    setResult(calculateEnhancedMaternityPay(annualSalary, weeks, percent));
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: "Enhanced Maternity Pay Calculator" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Enhanced Maternity Pay Calculator 2026/27",
    description:
      "Calculate your enhanced maternity pay from your employer. Compare occupational maternity pay to statutory SMP.",
    url: `${SITE_CONFIG.url}/calculators/enhanced-maternity-pay/`,
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

  // Colour coding for breakdown bars
  const typeColors: Record<string, string> = {
    enhanced: "bg-green-500",
    "higher-smp": "bg-violet-500",
    "lower-smp": "bg-sky-400",
    unpaid: "bg-slate-200",
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
            Enhanced Maternity Pay Calculator{" "}
            <span className="text-violet-600">2026/27</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your total maternity pay when your employer offers
            enhanced (occupational) maternity pay above the statutory minimum.
            See exactly how much extra you&apos;ll receive compared to SMP alone.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Enter Your Enhanced Pay Details
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Annual Salary (before tax)
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
                  placeholder="e.g. 35000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enhancedWeeks"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Enhanced Pay Duration (weeks)
                </label>
                <input
                  type="number"
                  id="enhancedWeeks"
                  value={enhancedWeeks}
                  onChange={(e) => setEnhancedWeeks(e.target.value)}
                  min="1"
                  max="39"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">
                  How many weeks your employer pays enhanced rate
                </p>
              </div>
              <div>
                <label
                  htmlFor="enhancedPercent"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Enhanced Pay Rate (% of salary)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="enhancedPercent"
                    value={enhancedPercent}
                    onChange={(e) => setEnhancedPercent(e.target.value)}
                    min="10"
                    max="100"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Common rates: 100% (full pay), 90%, 75%, 50%
                </p>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-violet-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-violet-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Calculate Enhanced Maternity Pay
            </button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">
                    With Enhanced Pay
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(result.enhancedTotalGross)}
                  </p>
                  <p className="text-xs text-green-500">total gross pay</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600 font-medium">
                    SMP Only
                  </p>
                  <p className="text-2xl font-bold text-violet-700">
                    {formatCurrency(result.smpOnlyTotalGross)}
                  </p>
                  <p className="text-xs text-violet-500">statutory minimum</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600 font-medium">
                    Extra From Employer
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    +{formatCurrency(result.enhancedDifference)}
                  </p>
                  <p className="text-xs text-slate-500">above statutory SMP</p>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4">
                  52-Week Pay Timeline
                </h3>
                <div className="flex gap-0.5 h-8 rounded overflow-hidden mb-3">
                  {result.weeklyBreakdown.map((week) => (
                    <div
                      key={week.week}
                      className={`flex-1 ${typeColors[week.type]} transition-all`}
                      title={`Week ${week.week}: ${week.label} — ${formatCurrency(week.grossPay)}`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-green-500" />
                    Enhanced pay ({result.enhancedWeeks} weeks)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-violet-500" />
                    SMP at 90% of AWE
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-sky-400" />
                    SMP flat rate (£194.32/wk)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-slate-200" />
                    Unpaid
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Pay Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">
                      Enhanced pay ({enhancedPercent}% for {result.enhancedWeeks} weeks)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(result.enhancedWeeklyAmount)}/week
                    </span>
                  </div>
                  {result.enhancedWeeks < 6 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">
                        SMP at 90% (weeks {result.enhancedWeeks + 1}–6)
                      </span>
                      <span className="font-medium">
                        {formatCurrency(
                          result.weeklyBreakdown.find(
                            (w) => w.type === "higher-smp"
                          )?.grossPay ?? 0
                        )}
                        /week
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">SMP flat rate (weeks 7–39)</span>
                    <span className="font-medium">£194.32/week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Unpaid leave (weeks 40–52)</span>
                    <span className="font-medium">£0.00/week</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <strong>Note:</strong> Enhanced maternity pay is subject to tax and
                National Insurance. Your employer pays enhanced maternity pay through
                PAYE. Amounts shown are gross (before deductions). Check your contract
                for any clawback clauses.
              </p>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="prose prose max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What is Enhanced Maternity Pay?
          </h2>
          <p className="text-slate-700 mb-4">
            Enhanced maternity pay — also known as occupational maternity pay or contractual
            maternity pay — is any maternity pay your employer offers above the statutory
            minimum (SMP). While the government sets the minimum at 6 weeks at 90% of your
            average earnings followed by 33 weeks at £194.32/week, many employers choose to
            top this up as part of their employee benefits package.
          </p>
          <p className="text-slate-700 mb-4">
            Enhanced maternity pay is becoming increasingly common as employers compete to
            attract and retain talent. According to research, around 48% of UK employers
            now offer some form of enhanced maternity pay, with the most generous policies
            found in the public sector, financial services, and technology companies.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Common Enhanced Maternity Pay Policies
          </h3>
          <p className="text-slate-700 mb-4">
            Enhanced maternity pay policies vary widely between employers, but here are some
            typical examples:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left p-3 border border-slate-200">Employer Type</th>
                  <th className="text-left p-3 border border-slate-200">Typical Enhanced Policy</th>
                  <th className="text-left p-3 border border-slate-200">Then</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200">NHS</td>
                  <td className="p-3 border border-slate-200">8 weeks at full pay + 18 weeks at half pay</td>
                  <td className="p-3 border border-slate-200">Then SMP flat rate</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200">Civil Service</td>
                  <td className="p-3 border border-slate-200">26 weeks at full pay</td>
                  <td className="p-3 border border-slate-200">Then SMP flat rate</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">Large Tech Companies</td>
                  <td className="p-3 border border-slate-200">16–26 weeks at full pay</td>
                  <td className="p-3 border border-slate-200">Then SMP</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200">Mid-Size Employer</td>
                  <td className="p-3 border border-slate-200">6–12 weeks at full pay</td>
                  <td className="p-3 border border-slate-200">Then SMP</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">Small Employer</td>
                  <td className="p-3 border border-slate-200">Statutory SMP only</td>
                  <td className="p-3 border border-slate-200">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            How Enhanced Maternity Pay Works Alongside SMP
          </h3>
          <p className="text-slate-700 mb-4">
            When your employer offers enhanced maternity pay, they typically include your SMP
            entitlement within the enhanced amount. For example, if your employer offers 12 weeks
            at full pay, this includes the SMP element — your employer claims back the SMP portion
            from HMRC and tops up the rest from their own funds.
          </p>
          <p className="text-slate-700 mb-4">
            After the enhanced pay period ends, you continue to receive statutory SMP for the
            remaining paid weeks (up to 39 weeks total). Then you have 13 weeks of unpaid
            additional maternity leave if you choose to take it.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Enhanced Maternity Pay and Tax
          </h3>
          <p className="text-slate-700 mb-4">
            All maternity pay — both enhanced and statutory — is subject to Income Tax and
            National Insurance. Your employer deducts these through PAYE as normal. During
            weeks when you receive full salary, your deductions will be the same as usual.
            During SMP-only weeks, your deductions will be significantly lower because
            your gross pay is much less.
          </p>
          <p className="text-slate-700 mb-4">
            Use our{" "}
            <Link
              href="/calculators/take-home-pay/"
              className="text-violet-600 hover:text-violet-800 underline"
            >
              maternity take-home pay calculator
            </Link>{" "}
            to estimate your after-tax income during each phase of your maternity leave.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Do I Have to Pay Back Enhanced Maternity Pay?
          </h3>
          <p className="text-slate-700 mb-4">
            One of the most common concerns about enhanced maternity pay is whether you have
            to repay it if you decide not to return to work. Many employers include a
            &quot;clawback&quot; clause in their maternity policy or your contract. This typically
            requires you to repay some or all of the enhanced portion (not the SMP) if you
            don&apos;t return to work for a specified period, usually 3 to 6 months.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Important:</strong> You never have to repay statutory SMP, regardless of
            whether you return to work. Clawback clauses can only apply to the employer-funded
            enhanced portion. Always read your contract carefully before your maternity leave starts.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            How to Find Out About Your Employer&apos;s Maternity Pay Policy
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
            <li>Check your employment contract or staff handbook</li>
            <li>Ask your HR department or line manager</li>
            <li>Look on your company intranet</li>
            <li>Contact your trade union representative if applicable</li>
            <li>Check if there&apos;s a family-friendly policy document</li>
          </ul>

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
                — Calculate your statutory SMP entitlement
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
              <li>
                <Link
                  href="/calculators/smp-vs-maternity-allowance/"
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  SMP vs Maternity Allowance
                </Link>{" "}
                — Compare the two maternity benefit types
              </li>
            </ul>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-violet-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
          <p className="text-slate-600 mb-4">Learn more about maternity pay and your rights with our free guides:</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">Statutory Maternity Pay Explained</Link> — how SMP works alongside enhanced pay</li>
            <li><Link href="/guides/maternity-leave-rights/" className="text-violet-600 hover:underline">Your Maternity Leave Rights</Link> — your full legal entitlements</li>
            <li><Link href="/guides/returning-to-work-after-maternity/" className="text-violet-600 hover:underline">Returning to Work After Maternity</Link> — planning your return</li>
            <li><Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">Financial Planning for Maternity Leave</Link> — budgeting and saving tips</li>
          </ul>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
