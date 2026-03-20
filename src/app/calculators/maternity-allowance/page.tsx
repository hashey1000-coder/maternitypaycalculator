"use client";

import { useState } from "react";
import { calculateMaternityAllowance, formatCurrency } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function MaternityAllowancePage() {
  const [weeklyEarnings, setWeeklyEarnings] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateMaternityAllowance> | null>(null);

  const handleCalculate = () => {
    const earnings = parseFloat(weeklyEarnings);
    if (isNaN(earnings) || earnings <= 0) return;
    setResult(calculateMaternityAllowance(earnings));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Calculators", href: "/calculators" },
          { label: "Maternity Allowance Calculator" },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
        Maternity Allowance <span className="gradient-text">Calculator</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        Calculate your Maternity Allowance if you don&apos;t qualify for Statutory
        Maternity Pay. MA is available for self-employed women and those who&apos;ve
        recently changed jobs.
      </p>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="weekly-earnings" className="block text-sm font-semibold text-slate-700 mb-2">
              Average Weekly Earnings
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">£</span>
              <input
                id="weekly-earnings"
                type="number"
                value={weeklyEarnings}
                onChange={(e) => setWeeklyEarnings(e.target.value)}
                placeholder="e.g. 350"
                className="calc-input w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none bg-slate-50/50"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Your average earnings over any 13 weeks in the 66 weeks before your due date
            </p>
          </div>
          <button
            onClick={handleCalculate}
            disabled={!weeklyEarnings}
            className="w-full bg-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-200"
          >
            Calculate Maternity Allowance
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-8 animate-fade-in-up">
          {!result.qualifies ? (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <p className="text-amber-700">
                Your earnings may be below the minimum threshold for Maternity Allowance (£30/week).
                You may be eligible for other benefits — contact your local Jobcentre Plus.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Weekly Amount</p>
                  <p className="text-3xl font-bold gradient-text mt-1">{formatCurrency(result.weeklyAmount)}</p>
                  <p className="text-xs text-slate-400 mt-1">per week for 39 weeks</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Amount</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{formatCurrency(result.totalAmount)}</p>
                  <p className="text-xs text-slate-400 mt-1">over 39 weeks</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-sm text-green-700">
                  <strong>Tax-free:</strong> Unlike SMP, Maternity Allowance is not subject to Income Tax or National Insurance.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">What Is Maternity Allowance?</h2>
        <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
          <p>
            Maternity Allowance (MA) is a weekly government benefit paid by the Department for
            Work and Pensions (DWP) to pregnant women and new mothers who do not qualify for{" "}
            <Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">
              Statutory Maternity Pay (SMP)
            </Link>{" "}
            from their employer. It provides financial support for up to <strong>39 weeks</strong>,
            with a maximum weekly rate of <strong>£194.32</strong> for 2026/27 — the same flat rate
            as SMP. However, unlike SMP, Maternity Allowance has a significant advantage:{" "}
            <strong>it is completely tax-free</strong>.
          </p>
          <p>
            Maternity Allowance is designed to support women who work but don&apos;t meet the
            specific employment requirements for SMP. This includes self-employed women, agency
            workers, those who&apos;ve recently changed employers, and women who work for small
            employers. If you&apos;ve been told you don&apos;t qualify for SMP, Maternity Allowance
            should be your next step.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Who Qualifies for Maternity Allowance?
          </h3>
          <p>
            The eligibility criteria for Maternity Allowance are deliberately broader than SMP,
            reflecting the fact that MA is designed to catch those who fall through the SMP net.
            You may qualify for Maternity Allowance if you meet <strong>one of these conditions</strong>:
          </p>
          <p><strong>Employed or self-employed workers:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>You&apos;ve been employed or self-employed for at least <strong>26 weeks</strong> in the 66 weeks before your expected week of childbirth (the &quot;test period&quot;)</li>
            <li>These 26 weeks do not need to be consecutive — they can be spread across the 66-week window</li>
            <li>You earned at least <strong>£30 per week</strong> in any 13 of those weeks</li>
          </ul>
          <p><strong>You might also qualify if:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>You&apos;re employed but don&apos;t qualify for SMP (e.g., you haven&apos;t worked for your employer long enough)</li>
            <li>You&apos;re self-employed and pay Class 2 National Insurance contributions</li>
            <li>You&apos;ve recently stopped working</li>
            <li>You&apos;re an agency worker</li>
            <li>Your employer has gone out of business</li>
          </ul>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Maternity Allowance vs Statutory Maternity Pay — Key Differences
          </h3>
          <p>
            While MA and SMP serve a similar purpose, there are important differences between
            the two benefits that can significantly affect your finances:
          </p>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-700 border border-slate-200"></th>
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Statutory Maternity Pay</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Maternity Allowance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-slate-200 font-medium">Paid by</td>
                  <td className="px-4 py-2 border border-slate-200">Your employer</td>
                  <td className="px-4 py-2 border border-slate-200">DWP (government)</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-2 border border-slate-200 font-medium">Rate structure</td>
                  <td className="px-4 py-2 border border-slate-200">6 weeks at 90% of AWE (no cap), then 33 weeks at £194.32/wk or 90% of AWE (whichever is lower)</td>
                  <td className="px-4 py-2 border border-slate-200">Same rate for all 39 weeks: 90% of AWE or £194.32 (whichever is lower)</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-2 border border-slate-200 font-medium">Tax</td>
                  <td className="px-4 py-2 border border-slate-200">Subject to Income Tax &amp; NI</td>
                  <td className="px-4 py-2 border border-slate-200 font-medium text-green-700">Tax-free</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-slate-200 font-medium">Employment required</td>
                  <td className="px-4 py-2 border border-slate-200">26 continuous weeks with same employer</td>
                  <td className="px-4 py-2 border border-slate-200">26 weeks in 66-week window (any employer)</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-2 border border-slate-200 font-medium">Minimum earnings</td>
                  <td className="px-4 py-2 border border-slate-200">£129/week average</td>
                  <td className="px-4 py-2 border border-slate-200">£30/week in 13 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The most significant difference is taxation. Because SMP is paid through your employer&apos;s
            payroll, it is subject to Income Tax and National Insurance. Maternity Allowance is
            paid directly by the government and is <strong>completely tax-free</strong>. This means that
            for many women, the actual take-home amount from MA is very similar to — or even higher
            than — what they&apos;d receive from SMP after deductions. Use our{" "}
            <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline">
              take-home pay calculator
            </Link>{" "}
            to compare SMP after tax with the MA rate.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            How Much Maternity Allowance Will You Receive?
          </h3>
          <p>
            The amount of Maternity Allowance you receive depends on your earnings. The DWP
            calculates your MA based on your <strong>best 13 weeks of earnings</strong> within
            the 66-week test period. There are two possible rates:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Standard rate:</strong> If your average weekly earnings in the best 13 weeks are £194.32 or more, you&apos;ll receive £194.32 per week</li>
            <li><strong>Reduced rate:</strong> If your average weekly earnings are between £30 and £194.32, you&apos;ll receive 90% of your average weekly earnings</li>
          </ul>
          <p>
            For self-employed women, the calculation is slightly different. If you&apos;re registered as
            self-employed with HMRC and pay Class 2 National Insurance contributions, you&apos;ll
            typically receive the standard rate of £194.32 per week, as long as you meet the
            employment test.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            How to Claim Maternity Allowance
          </h3>
          <p>
            Claiming Maternity Allowance involves a straightforward process, but it&apos;s important
            to apply at the right time:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li><strong>Get your MATB1 certificate</strong> — your midwife or GP will give you this from around week 20 of your pregnancy. You&apos;ll need it for your claim</li>
            <li><strong>Complete the MA1 claim form</strong> — you can download this from GOV.UK or request it from Jobcentre Plus</li>
            <li><strong>Gather your evidence</strong> — you&apos;ll need payslips from your employers (the last 13 weeks from each job) or evidence of self-employment</li>
            <li><strong>Submit your claim</strong> — you can apply from 26 weeks of pregnancy onwards. The earliest MA can start is 11 weeks before your due date</li>
            <li><strong>Wait for the decision</strong> — the DWP aims to process claims within 24 working days</li>
          </ol>
          <p>
            <strong>Tip:</strong> Apply as early as possible. You can claim from the 26th week
            of pregnancy, and early applications help avoid any gaps in payment. If your employer
            has refused SMP, they should have given you a form SMP1 — include this with your
            MA claim.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Maternity Allowance for the Self-Employed
          </h3>
          <p>
            If you&apos;re self-employed, Maternity Allowance is your primary source of maternity
            income — self-employed women cannot claim SMP. To qualify, you need to be registered
            as self-employed with HMRC and have paid (or been treated as having paid) Class 2
            National Insurance contributions for at least 13 of the 66 weeks in the test period.
          </p>
          <p>
            For the 2026/27 tax year, Class 2 NI contributions are voluntary and cost £3.50 per week.
            Even if you haven&apos;t been paying them, you may still qualify if HMRC treats you as
            having paid based on your Self Assessment returns. If you&apos;re unsure about your NI
            record, contact HMRC before applying.
          </p>
          <p>
            Self-employed mothers should also plan for the period after MA ends. Unlike employed
            women who may return to a salaried position, you&apos;ll need to rebuild your client
            base and income stream. Our{" "}
            <Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">
              financial planning for maternity guide
            </Link>{" "}
            has specific advice for self-employed parents.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Maternity Allowance and Other Benefits
          </h3>
          <p>
            Receiving Maternity Allowance can affect your entitlement to other benefits. Here&apos;s
            what you need to know:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Child Benefit:</strong> You can claim{" "}
              <Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">
                Child Benefit
              </Link>{" "}
              in addition to MA — they are separate benefits
            </li>
            <li><strong>Universal Credit:</strong> MA is counted as income for Universal Credit purposes, which may reduce your UC payment</li>
            <li><strong>Housing Benefit:</strong> MA may affect your Housing Benefit calculation</li>
            <li><strong>Council Tax Reduction:</strong> MA may be counted as income depending on your local council&apos;s scheme</li>
          </ul>
          <p>
            It&apos;s always worth checking your entitlement to all benefits, as the combination
            of MA, Child Benefit, and other support can significantly help your household finances
            during maternity leave.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            What If You Don&apos;t Qualify for Either SMP or MA?
          </h3>
          <p>
            If you don&apos;t meet the requirements for either Statutory Maternity Pay or Maternity
            Allowance, you may still be able to get financial support. Options include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Universal Credit</strong> — you can apply for UC based on your household circumstances</li>
            <li><strong>Employment and Support Allowance (ESA)</strong> — if you&apos;re unable to work due to pregnancy complications</li>
            <li><strong>Sure Start Maternity Grant</strong> — a one-off payment of £500 if you&apos;re on certain benefits and expecting your first child</li>
            <li><strong>Healthy Start vouchers</strong> — help with buying food and milk during pregnancy</li>
          </ul>
          <p>
            Contact your local Jobcentre Plus or Citizens Advice for personalised guidance on
            the benefits available to you.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Plan Your Maternity Finances
          </h3>
          <p>
            Whether you&apos;re receiving Maternity Allowance or Statutory Maternity Pay,
            understanding your full financial picture is essential. Use our suite of free
            calculators to plan ahead:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><Link href="/" className="text-violet-600 hover:underline">SMP Calculator</Link>{" "}
              — check your Statutory Maternity Pay entitlement
            </li>
            <li><Link href="/calculators/maternity-leave-planner/" className="text-violet-600 hover:underline">Maternity Leave Planner</Link>{" "}
              — work out your key dates
            </li>
            <li><Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">Child Benefit Calculator</Link>{" "}
              — calculate your Child Benefit payments
            </li>
            <li><Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline">Take-Home Pay Calculator</Link>{" "}
              — see your SMP after tax and NI deductions
            </li>
          </ul>
          <p className="mt-4">
            For a comprehensive guide to Maternity Allowance, including worked examples and
            step-by-step claiming instructions, read our full{" "}
            <Link href="/guides/maternity-allowance-guide/" className="text-violet-600 hover:underline">
              Maternity Allowance guide
            </Link>.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-violet-50 rounded-xl p-6 border border-slate-200 mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
        <p className="text-slate-600 mb-4">Explore our guides on maternity pay, rights, and alternatives to SMP:</p>
        <ul className="space-y-2 text-sm">
          <li><Link href="/guides/maternity-allowance-guide/" className="text-violet-600 hover:underline">Maternity Allowance Complete Guide</Link> — in-depth guide with worked examples</li>
          <li><Link href="/guides/maternity-pay-self-employed/" className="text-violet-600 hover:underline">Maternity Pay for Self-Employed</Link> — your options when you work for yourself</li>
          <li><Link href="/guides/maternity-pay-agency-zero-hours-workers/" className="text-violet-600 hover:underline">Maternity Pay for Agency &amp; Zero-Hours Workers</Link> — rights for variable-hour contracts</li>
          <li><Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">Statutory Maternity Pay Explained</Link> — how SMP compares to Maternity Allowance</li>
          <li><Link href="/guides/maternity-pay-changing-jobs/" className="text-violet-600 hover:underline">Maternity Pay When Changing Jobs</Link> — what happens to your entitlement</li>
          <li><Link href="/guides/benefits-during-maternity-leave/" className="text-violet-600 hover:underline">Benefits During Maternity Leave</Link> — other financial support available</li>
        </ul>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UK Maternity Allowance Calculator 2026/27",
            description: "Free Maternity Allowance calculator for self-employed and those not qualifying for SMP. Calculate your MA entitlement.",
            url: "https://maternitypaycalculator.co.uk/calculators/maternity-allowance/",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
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
              { "@type": "ListItem", position: 3, name: "Maternity Allowance Calculator", item: "https://maternitypaycalculator.co.uk/calculators/maternity-allowance/" },
            ],
          }),
        }}
      />
    </div>
  );
}
