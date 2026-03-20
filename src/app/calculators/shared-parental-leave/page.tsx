"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateSharedParentalLeave, formatCurrency } from "@/lib/calculations";
import type { SPLResult } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { SITE_CONFIG } from "@/lib/constants";

const faqs = [
  {
    question: "What is Shared Parental Leave (SPL)?",
    answer:
      "Shared Parental Leave allows eligible mothers and their partners to share up to 50 weeks of leave and up to 37 weeks of pay between them after the birth of a child. The mother must curtail her maternity leave to create the shared leave, and both parents can take leave at the same time or separately.",
  },
  {
    question: "Who is eligible for Shared Parental Leave?",
    answer:
      "Both parents must meet eligibility requirements. The mother must be entitled to maternity leave or SMP/MA. The partner (the person taking SPL) must have been employed continuously for at least 26 weeks by the 15th week before the due date and earn at least £129 per week on average. Separately, the mother must also pass an 'employment and earnings test' — she must have worked for at least 26 of the 66 weeks before the due date and earned at least £390 in total across any 13 of those weeks. These are two different tests for two different parents.",
  },
  {
    question: "How much is Shared Parental Pay (ShPP)?",
    answer:
      "Shared Parental Pay (ShPP) is paid at the statutory flat rate of £194.32 per week (2026/27), or 90% of your average weekly earnings if that's less. It's the same rate as the lower SMP rate. The 6 weeks at 90% pay are always part of the mother's SMP, not the shared portion.",
  },
  {
    question: "Can both parents take Shared Parental Leave at the same time?",
    answer:
      "Yes. One of the key advantages of SPL over traditional maternity/paternity leave is that both parents can be off work at the same time. This allows families to spend time together during the early weeks or transition care between parents gradually.",
  },
  {
    question: "Do I have to take Shared Parental Leave in one block?",
    answer:
      "No. SPL can be taken in up to three separate blocks (unless your employer agrees to more). You can return to work between blocks. Each block requires a notice period of at least 8 weeks. Your employer can refuse a discontinuous leave pattern but must accept a continuous block.",
  },
  {
    question: "How does Shared Parental Leave affect my pension and holiday?",
    answer:
      "During SPL, you continue to accrue holiday entitlement as normal. Employer pension contributions are based on actual pay received during SPL. You also retain all your employment rights during SPL, just as with maternity leave. Your job is protected under employment law.",
  },
];

export default function SharedParentalLeaveCalculator() {
  const [salary, setSalary] = useState("");
  const [motherWeeks, setMotherWeeks] = useState("26");
  const [partnerWeeks, setPartnerWeeks] = useState("24");
  const [result, setResult] = useState<SPLResult | null>(null);

  const calculate = () => {
    const annualSalary = parseFloat(salary);
    if (isNaN(annualSalary) || annualSalary <= 0) return;

    const mWeeks = parseInt(motherWeeks) || 26;
    const pWeeks = parseInt(partnerWeeks) || 24;

    setResult(calculateSharedParentalLeave(annualSalary, mWeeks, pWeeks));
  };

  const breadcrumbs = [
    { label: "Calculators", href: "/calculators/" },
    { label: "Shared Parental Leave Calculator" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shared Parental Leave Calculator 2026/27",
    description:
      "Calculate how to split maternity leave and pay between parents. Work out ShPP entitlement, weeks available, and total pay.",
    url: `${SITE_CONFIG.url}/calculators/shared-parental-leave/`,
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
            Shared Parental Leave Calculator{" "}
            <span className="text-violet-600">2026/27</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Work out how to split your maternity leave and Shared Parental Pay
            (ShPP) between you and your partner. See how many paid weeks each
            parent receives and the total family income.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Calculate Your Shared Parental Leave
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Mother&apos;s Annual Salary (before tax)
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
                  htmlFor="motherWeeks"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Mother&apos;s Leave (weeks)
                </label>
                <input
                  type="number"
                  id="motherWeeks"
                  value={motherWeeks}
                  onChange={(e) => setMotherWeeks(e.target.value)}
                  min="2"
                  max="50"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">Minimum 2 weeks compulsory leave</p>
              </div>
              <div>
                <label
                  htmlFor="partnerWeeks"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Partner&apos;s Leave (weeks)
                </label>
                <input
                  type="number"
                  id="partnerWeeks"
                  value={partnerWeeks}
                  onChange={(e) => setPartnerWeeks(e.target.value)}
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">Maximum 50 weeks total between parents</p>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-violet-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-violet-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Calculate Shared Parental Leave
            </button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600 font-medium">Mother&apos;s Total Pay</p>
                  <p className="text-2xl font-bold text-violet-700">
                    {formatCurrency(result.motherTotalGross)}
                  </p>
                  <p className="text-xs text-violet-500">
                    {result.motherSMPWeeks} paid weeks
                  </p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-sky-600 font-medium">Partner&apos;s Total Pay</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {formatCurrency(result.partnerTotalGross)}
                  </p>
                  <p className="text-xs text-sky-500">
                    {result.partnerShPPWeeks} paid weeks
                  </p>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600 font-medium">Combined Total</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(result.combinedTotalGross)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {result.totalPaidWeeks} total paid weeks
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Mother&apos;s first 6 weeks (90% of AWE)</span>
                    <span className="font-medium">
                      {formatCurrency(result.motherHigherRateWeekly)}/week
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">
                      Mother&apos;s remaining SMP weeks (flat rate)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(result.flatRateWeekly)}/week
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">
                      Partner&apos;s ShPP weeks (flat rate)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(result.flatRateWeekly)}/week × {result.partnerShPPWeeks} weeks
                    </span>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Mother&apos;s total leave</span>
                    <span className="font-medium">{result.motherWeeks} weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Partner&apos;s total leave</span>
                    <span className="font-medium">{result.partnerWeeks} weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total unpaid weeks</span>
                    <span className="font-medium">
                      {result.motherWeeks + result.partnerWeeks - result.totalPaidWeeks} weeks
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <strong>Note:</strong> ShPP is paid at the statutory flat rate of £194.32/week
                (2026/27). The 6 weeks at 90% of earnings are always part of the mother&apos;s SMP.
                This calculator shows gross amounts before tax and National Insurance deductions.
              </p>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="prose prose max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How Does Shared Parental Leave Work in the UK?
          </h2>
          <p className="text-slate-700 mb-4">
            Shared Parental Leave (SPL) was introduced in April 2015 to give families more
            flexibility in how they care for their newborn baby. Instead of the traditional model
            where the mother takes all 52 weeks of maternity leave, SPL allows eligible parents
            to share up to 50 weeks of leave and 37 weeks of pay between them.
          </p>
          <p className="text-slate-700 mb-4">
            The mother must &quot;curtail&quot; (end early) her maternity leave or SMP to create
            the pool of shared leave. She must take a minimum of 2 weeks of compulsory maternity
            leave after the birth (4 weeks if she works in a factory). After that, any remaining
            leave and pay can be shared with her partner.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Shared Parental Leave Eligibility Requirements
          </h3>
          <p className="text-slate-700 mb-4">
            To take SPL, both parents must meet specific eligibility criteria. The rules are
            slightly different for the mother and her partner:
          </p>

          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h4 className="font-semibold text-violet-700 mb-3">Mother&apos;s Eligibility</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-1">✓</span>
                <span>Be entitled to maternity leave, or to SMP or Maternity Allowance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-1">✓</span>
                <span>Have given notice to curtail maternity leave or SMP/MA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-1">✓</span>
                <span>Still be working for the same employer (or it&apos;s not reasonably practicable to return)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h4 className="font-semibold text-sky-700 mb-3">Partner&apos;s Eligibility</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">✓</span>
                <span>Employed continuously for at least 26 weeks by the 15th week before the due date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">✓</span>
                <span>Still employed by the same employer when taking SPL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">✓</span>
                <span>Earn at least £129 per week on average (the Lower Earnings Limit for 2026/27)</span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            How Much is Shared Parental Pay (ShPP)?
          </h3>
          <p className="text-slate-700 mb-4">
            Shared Parental Pay (ShPP) is paid at the statutory flat rate of <strong>£194.32 per
            week</strong> for the 2026/27 tax year, or 90% of your average weekly earnings if
            that&apos;s lower. This is the same as the lower rate of Statutory Maternity Pay (SMP).
          </p>
          <p className="text-slate-700 mb-4">
            The mother always receives the first 6 weeks of maternity pay at 90% of her average
            weekly earnings — this higher rate cannot be transferred to the partner. Only the
            remaining 33 weeks of flat-rate pay form the shared pool. Combined with the mother&apos;s
            SMP, there are a maximum of 39 paid weeks available to split between parents.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            How to Apply for Shared Parental Leave
          </h3>
          <p className="text-slate-700 mb-2">
            You need to follow these steps to take Shared Parental Leave:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-700 mb-4">
            <li>
              <strong>Give notice to curtail maternity leave.</strong> The mother submits a
              binding notice to her employer that she will end her maternity leave early.
            </li>
            <li>
              <strong>Submit an SPL notice.</strong> Each parent gives their employer at least
              8 weeks&apos; notice of their intention to take SPL, including proposed dates.
            </li>
            <li>
              <strong>Book your leave.</strong> Submit a period of leave notice at least 8 weeks
              before you want to start. You can take up to 3 separate blocks of leave.
            </li>
            <li>
              <strong>Provide evidence.</strong> Your employer can ask for a copy of the birth
              certificate and details of the other parent&apos;s employer.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Shared Parental Leave vs Maternity Leave
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left p-3 border border-slate-200">Feature</th>
                  <th className="text-left p-3 border border-slate-200">Maternity Leave</th>
                  <th className="text-left p-3 border border-slate-200">Shared Parental Leave</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Total weeks</td>
                  <td className="p-3 border border-slate-200">52 weeks (mother only)</td>
                  <td className="p-3 border border-slate-200">50 weeks shared between parents</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Paid weeks</td>
                  <td className="p-3 border border-slate-200">39 weeks</td>
                  <td className="p-3 border border-slate-200">37 weeks (shared pool)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Higher rate pay</td>
                  <td className="p-3 border border-slate-200">6 weeks at 90% of AWE</td>
                  <td className="p-3 border border-slate-200">Mother keeps 6 weeks at 90%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Can both be off?</td>
                  <td className="p-3 border border-slate-200">No (just 2 weeks paternity)</td>
                  <td className="p-3 border border-slate-200">Yes — at the same time</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Flexibility</td>
                  <td className="p-3 border border-slate-200">One continuous block</td>
                  <td className="p-3 border border-slate-200">Up to 3 blocks, with breaks</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">KIT/SPLIT days</td>
                  <td className="p-3 border border-slate-200">10 KIT days</td>
                  <td className="p-3 border border-slate-200">20 SPLIT days each</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            SPLIT Days: Keeping in Touch During Shared Parental Leave
          </h3>
          <p className="text-slate-700 mb-4">
            During SPL, each parent is entitled to 20 &quot;Shared Parental Leave In Touch&quot;
            (SPLIT) days. These are in addition to the 10 Keeping In Touch (KIT) days available
            during maternity leave. SPLIT days allow you to work for your employer without ending
            your SPL. They&apos;re entirely optional — neither you nor your employer can insist on
            them.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            Can Self-Employed Parents Take Shared Parental Leave?
          </h3>
          <p className="text-slate-700 mb-4">
            Self-employed parents cannot take SPL themselves, but a self-employed mother receiving
            Maternity Allowance can curtail her MA to allow her employed partner to take SPL.
            The partner must meet the employment and earnings requirements with their own employer.
            This is a common scenario for freelancers and contractors whose partners are employed.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            How Does Shared Parental Leave Affect Other Benefits?
          </h3>
          <p className="text-slate-700 mb-4">
            During SPL, you continue to accrue annual leave and your pension rights are protected.
            If you receive employer benefits such as a company car, phone, or health insurance,
            these generally continue during SPL just as they would during maternity leave. Your
            contract of employment continues throughout, and you have the right to return to the
            same job if your total leave is 26 weeks or less, or a suitable alternative role if
            it&apos;s longer.
          </p>

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
                — Calculate your full SMP entitlement
              </li>
              <li>
                <Link
                  href="/calculators/enhanced-maternity-pay/"
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  Enhanced Maternity Pay Calculator
                </Link>{" "}
                — See what your employer pays above SMP
              </li>
              <li>
                <Link
                  href="/calculators/take-home-pay/"
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  Take-Home Pay Calculator
                </Link>{" "}
                — Work out your after-tax maternity pay
              </li>
            </ul>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-violet-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
          <p className="text-slate-600 mb-4">Explore our guides on shared parental leave and maternity rights:</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/guides/shared-parental-leave-guide/" className="text-violet-600 hover:underline">Complete Guide to Shared Parental Leave</Link> — everything you need to know about SPL</li>
            <li><Link href="/guides/paternity-leave-and-pay/" className="text-violet-600 hover:underline">Paternity Leave and Pay Guide</Link> — your partner&apos;s entitlements</li>
            <li><Link href="/guides/maternity-leave-rights/" className="text-violet-600 hover:underline">Your Maternity Leave Rights</Link> — full legal entitlements for mothers</li>
            <li><Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">Financial Planning for Maternity Leave</Link> — budgeting for shared leave</li>
          </ul>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
