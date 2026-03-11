"use client";

import { useState } from "react";
import { calculateSMP, formatCurrency } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function TakeHomePayPage() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateSMP> | null>(null);

  const handleCalculate = () => {
    const salary = parseFloat(annualSalary);
    if (isNaN(salary) || salary <= 0) return;
    setResult(calculateSMP(salary, true, 26));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Calculators", href: "/calculators" },
          { label: "Take-Home Pay Calculator" },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
        Maternity Take-Home Pay <span className="gradient-text">Calculator</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        See exactly what your maternity pay will look like after Income Tax and
        National Insurance deductions. Plan your budget with confidence.
      </p>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="salary" className="block text-sm font-semibold text-slate-700 mb-2">
              Annual Salary (before tax)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">£</span>
              <input
                id="salary"
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                placeholder="e.g. 35000"
                className="calc-input w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none bg-slate-50/50"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            disabled={!annualSalary}
            className="w-full bg-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-200"
          >
            Calculate Take-Home Pay
          </button>
        </div>
      </div>

      {result && result.qualifies && (
        <div className="mt-8 space-y-6 animate-fade-in-up">
          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Gross</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{formatCurrency(result.totalGross)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Deductions</p>
              <p className="text-2xl font-bold text-red-500 mt-1">
                -{formatCurrency(result.totalTax + result.totalNI)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-green-200 p-5 text-center bg-green-50">
              <p className="text-xs text-green-600 uppercase tracking-wider font-medium">Take Home</p>
              <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(result.totalNet)}</p>
            </div>
          </div>

          {/* Monthly breakdown by phase */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Monthly Take-Home Comparison</h3>
            <div className="space-y-4">
              {/* Normal salary */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Normal Monthly Salary (net)</span>
                  <span className="font-medium text-slate-800">
                    ~{formatCurrency(parseFloat(annualSalary) / 12 * 0.7)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
              {/* Higher rate */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Weeks 1-6 (per month equivalent)</span>
                  <span className="font-medium text-violet-700">
                    ~{formatCurrency(result.weeklyBreakdown[0].netPay * 4.33)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className="bg-violet-500 h-3 rounded-full"
                    style={{
                      width: `${(result.weeklyBreakdown[0].netPay * 4.33) / (parseFloat(annualSalary) / 12 * 0.7) * 100}%`,
                    }}
                  />
                </div>
              </div>
              {/* Lower rate */}
              {result.weeklyBreakdown.length > 6 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Weeks 7-39 (per month equivalent)</span>
                    <span className="font-medium text-sky-700">
                      ~{formatCurrency(result.weeklyBreakdown[6].netPay * 4.33)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-sky-500 h-3 rounded-full"
                      style={{
                        width: `${Math.max(5, (result.weeklyBreakdown[6].netPay * 4.33) / (parseFloat(annualSalary) / 12 * 0.7) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
              {/* Unpaid */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Weeks 40-52 (unpaid)</span>
                  <span className="font-medium text-slate-400">£0.00</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-slate-300 h-3 rounded-full" style={{ width: "2%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tax breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Tax & NI Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-xs text-slate-500 font-medium">Gross SMP</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{formatCurrency(result.totalGross)}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-xs text-red-500 font-medium">Income Tax</p>
                <p className="text-lg font-bold text-red-600 mt-1">-{formatCurrency(result.totalTax)}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-xs text-orange-500 font-medium">Nat. Insurance</p>
                <p className="text-lg font-bold text-orange-600 mt-1">-{formatCurrency(result.totalNI)}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-xs text-green-500 font-medium">Take Home</p>
                <p className="text-lg font-bold text-green-600 mt-1">{formatCurrency(result.totalNet)}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              * Tax calculations are estimates based on 2026/27 rates. Your actual deductions may
              vary depending on your tax code and other factors.
            </p>
          </div>

          {/* Budgeting tips */}
          <div className="bg-violet-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3">Plan Your Budget</h3>
            <p className="text-sm text-slate-600 mb-4">
              Understanding your take-home maternity pay is the first step to budgeting for your leave.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/financial-planning-for-maternity/"
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors"
              >
                Financial planning guide
              </Link>
              <Link
                href="/calculators/child-benefit/"
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors"
              >
                Calculate Child Benefit
              </Link>
            </div>
          </div>
        </div>
      )}

      {result && !result.qualifies && (
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 animate-fade-in-up">
          <p className="text-amber-700">{result.reason}</p>
          <Link
            href="/calculators/maternity-allowance/"
            className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 mt-3"
          >
            Try Maternity Allowance Calculator →
          </Link>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Understanding Your Maternity Take-Home Pay
        </h2>
        <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
          <p>
            One of the biggest financial surprises for new parents is discovering the difference
            between their <strong>gross maternity pay</strong> and what they actually receive in
            their bank account. Our maternity take-home pay calculator bridges this gap by showing
            you exactly what your{" "}
            <Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">
              Statutory Maternity Pay (SMP)
            </Link>{" "}
            will look like after Income Tax and National Insurance deductions for the 2026/27 tax year.
          </p>
          <p>
            Unlike{" "}
            <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline">
              Maternity Allowance
            </Link>{" "}
            (which is tax-free), SMP is treated as earnings and is subject to the same tax rules as
            your normal salary. This means your employer will deduct Income Tax and employee National
            Insurance contributions from your SMP payments through the PAYE system. Understanding
            these deductions is essential for creating an accurate maternity leave budget.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            How Income Tax Works on Maternity Pay
          </h3>
          <p>
            For the 2026/27 tax year, Income Tax is calculated on your total annual income. The
            key thresholds are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Personal Allowance:</strong> £12,570 — you pay no tax on this amount</li>
            <li><strong>Basic rate (20%):</strong> On income from £12,571 to £50,270</li>
            <li><strong>Higher rate (40%):</strong> On income from £50,271 to £125,140</li>
            <li><strong>Additional rate (45%):</strong> On income above £125,140</li>
          </ul>
          <p>
            During maternity leave, your income drops significantly compared to your normal salary.
            This often means you move into a lower tax bracket — or even fall within the Personal
            Allowance entirely during the flat-rate SMP period. For example, if you&apos;re only
            receiving the flat rate of £194.32 per week (£9,733.36 annualised), this is below the
            Personal Allowance, meaning <strong>no Income Tax</strong> is due during those weeks.
          </p>
          <p>
            However, tax is calculated cumulatively by your employer through PAYE. If you were
            earning your full salary for the first few months of the tax year before starting
            maternity leave, you may have already used up a large portion of your Personal
            Allowance. The tax on your SMP payments will depend on when in the tax year your
            maternity leave falls.
          </p>
          <p>
            <strong>Tax refund possibility:</strong> If your total income for the tax year
            (combining your pre-leave salary and SMP) is less than you would normally earn, you
            may be entitled to a tax refund. HMRC typically adjusts this through your tax code
            automatically, but if you think you&apos;ve overpaid, you can contact HMRC or check
            through your Personal Tax Account.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            National Insurance During Maternity Leave
          </h3>
          <p>
            Employee National Insurance contributions for 2026/27 are charged at <strong>8%</strong>{" "}
            on earnings between the Primary Threshold (£242 per week) and the Upper Earnings Limit
            (£967 per week), and at <strong>2%</strong> on earnings above the Upper Earnings Limit.
          </p>
          <p>
            During the first 6 weeks of SMP (at 90% of your earnings), you will likely still pay
            NI contributions as your weekly pay will usually exceed the Primary Threshold. However,
            during the flat-rate period (£194.32 per week), your SMP is <strong>below the NI
            Primary Threshold of £242 per week</strong>. This means you won&apos;t pay any National
            Insurance during weeks 7 to 39 — a small but welcome saving.
          </p>
          <p>
            <strong>Important:</strong> Even though you&apos;re not paying NI during the low-pay
            weeks, you&apos;re still protected. The weeks you receive SMP are treated as if you
            had paid NI for State Pension purposes, so there&apos;s no gap in your NI record.
            Additionally, claiming{" "}
            <Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">
              Child Benefit
            </Link>{" "}
            gives you NI credits for any remaining weeks where you&apos;re not earning enough.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Your Maternity Pay Month by Month
          </h3>
          <p>
            Understanding how your monthly income changes throughout maternity leave is critical
            for budgeting. Here&apos;s what a typical maternity leave looks like financially for
            someone on a £30,000 salary:
          </p>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Period</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Gross Weekly</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Approx Monthly Net</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">vs Normal Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-slate-200 font-medium">Weeks 1–6</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£519.23</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">~£1,960</td>
                  <td className="px-4 py-2 border border-slate-200 text-right text-amber-600">~95%</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-2 border border-slate-200 font-medium">Weeks 7–39</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£194.32</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">~£810</td>
                  <td className="px-4 py-2 border border-slate-200 text-right text-red-600">~39%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-slate-200 font-medium">Weeks 40–52</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£0.00</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£0</td>
                  <td className="px-4 py-2 border border-slate-200 text-right text-red-600">0%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            As you can see, the biggest income shock comes at week 7 when the 90% rate drops to
            the flat rate. Your monthly take-home drops from around £1,960 to approximately £796
            — a reduction of over 60%. Planning for this transition is essential. Use the
            calculator above with your actual salary to get your personalised figures.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Employer Enhanced Maternity Pay
          </h3>
          <p>
            Many UK employers offer enhanced maternity pay above the statutory minimum. Common
            enhanced packages include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Full pay for a set period</strong> — typically 12 to 26 weeks at full salary, then reverting to SMP</li>
            <li><strong>Topped-up SMP</strong> — your employer pays the difference between SMP and your normal salary for a period</li>
            <li><strong>Occupational maternity pay (OMP)</strong> — a separate scheme with its own rules, often found in the public sector and larger companies</li>
          </ul>
          <p>
            If your employer offers enhanced pay, the amount above SMP is taxed just like your
            normal salary — at your marginal tax rate. Our calculator shows the SMP-only
            take-home, but if you receive enhanced pay, your actual take-home will be higher
            during that period. Check your employee handbook or speak to your HR department to
            find out what your employer offers.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Budgeting Tips for the Maternity Leave Income Drop
          </h3>
          <p>
            The transition from full salary to SMP requires careful budgeting. Here are practical
            strategies to help manage the income reduction:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Start saving before maternity leave:</strong> If possible, set aside money
              each month during pregnancy to build a maternity leave fund. Even small amounts add up
              over 9 months
            </li>
            <li>
              <strong>Review and reduce your outgoings:</strong> Go through direct debits and
              subscriptions now. Cancel anything you won&apos;t need and negotiate better deals on
              insurance, broadband, and utilities
            </li>
            <li>
              <strong>Claim all benefits you&apos;re entitled to:</strong> Make sure you&apos;re
              claiming{" "}
              <Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">
                Child Benefit
              </Link>{" "}
              (worth up to £1,406.60/year for your first child) and check eligibility for Tax-Free
              Childcare, Universal Credit, and council tax reductions
            </li>
            <li>
              <strong>Use annual leave strategically:</strong> You continue accruing holiday during
              maternity leave. Some women take annual leave before or after maternity leave to extend
              paid time off
            </li>
            <li>
              <strong>Plan for the unpaid period:</strong> If you&apos;re taking the full 52 weeks,
              weeks 40 to 52 are completely unpaid. You need savings or partner income to cover this
              period
            </li>
            <li>
              <strong>Consider Keeping In Touch (KIT) days:</strong> You can work up to 10 KIT days
              during maternity leave without affecting your SMP, and your employer pays you for these
              on top of your SMP
            </li>
          </ul>
          <p>
            For a comprehensive budgeting guide, read our{" "}
            <Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">
              financial planning for maternity leave
            </Link>{" "}
            article.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Tax Codes and Maternity Pay
          </h3>
          <p>
            Your tax code determines how much tax-free income you receive each pay period. The
            standard tax code for 2026/27 is <strong>1257L</strong>, which gives you the full
            Personal Allowance of £12,570. During maternity leave, your tax code shouldn&apos;t
            change unless there are other factors (like company benefits or outstanding tax).
          </p>
          <p>
            If your employer processes your SMP through their payroll (as they should), the
            PAYE system will automatically adjust your tax calculations based on your cumulative
            earnings for the tax year. This means if you&apos;ve had months of lower SMP
            payments, you may find your tax deductions are reduced or even zero in later months
            as HMRC catches up with your lower annual earnings.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Maternity Allowance vs SMP — Take-Home Comparison
          </h3>
          <p>
            If you don&apos;t qualify for SMP, you may receive{" "}
            <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline">
              Maternity Allowance
            </Link>{" "}
            instead. A key advantage of MA is that it&apos;s <strong>completely tax-free</strong>.
            This means the maximum MA rate of £194.32 per week is exactly what you receive —
            no deductions at all.
          </p>
          <p>
            For SMP recipients, the flat-rate of £194.32 per week is also likely to be close to
            the take-home amount because it falls below the NI Primary Threshold and, depending
            on your annual earnings, may also fall within your remaining Personal Allowance. The
            biggest difference is during the first 6 weeks: SMP pays 90% of your earnings
            (taxed), while MA pays a maximum of £194.32 (tax-free). For higher earners, SMP
            is significantly more generous during this period.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Pension Contributions During Maternity Leave
          </h3>
          <p>
            Your pension is another important consideration during maternity leave. Here&apos;s
            how pensions interact with SMP:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Employer contributions:</strong> Your employer must continue contributing to your pension during paid maternity leave, based on your <strong>normal</strong> salary (not your reduced SMP)</li>
            <li><strong>Employee contributions:</strong> Your contributions during SMP are based on your actual pay (the SMP amount), which will be lower</li>
            <li><strong>Unpaid leave:</strong> During weeks 40 to 52 (unpaid), neither employer nor employee pension contributions are required, though some employers continue voluntarily</li>
          </ul>
          <p>
            This means your pension pot continues to grow during maternity leave, mainly thanks
            to your employer&apos;s contributions remaining at the pre-leave level. Check your
            pension scheme rules and speak to your HR department for your specific arrangements.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Plan Your Complete Maternity Leave Finances
          </h3>
          <p>
            Your take-home maternity pay is just one component of your financial picture. Use
            our full suite of calculators and guides to prepare comprehensively:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><Link href="/" className="text-violet-600 hover:underline">SMP Calculator</Link>{" "}
              — calculate your gross Statutory Maternity Pay
            </li>
            <li><Link href="/calculators/maternity-leave-planner/" className="text-violet-600 hover:underline">Maternity Leave Planner</Link>{" "}
              — work out your key dates and deadlines
            </li>
            <li><Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">Child Benefit Calculator</Link>{" "}
              — check your Child Benefit entitlement
            </li>
            <li><Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline">Maternity Allowance Calculator</Link>{" "}
              — if you don&apos;t qualify for SMP
            </li>
          </ul>
          <p className="mt-4">
            And don&apos;t miss our comprehensive guides:{" "}
            <Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">
              financial planning for maternity
            </Link>,{" "}
            <Link href="/guides/maternity-leave-rights/" className="text-violet-600 hover:underline">
              your maternity leave rights
            </Link>, and{" "}
            <Link href="/guides/returning-to-work-after-maternity/" className="text-violet-600 hover:underline">
              returning to work after maternity
            </Link>.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-violet-50 rounded-xl p-6 border border-slate-200 mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
        <p className="text-slate-600 mb-4">Understand your maternity pay, tax, and financial planning options:</p>
        <ul className="space-y-2 text-sm">
          <li><Link href="/guides/is-maternity-pay-taxed/" className="text-violet-600 hover:underline">Is Maternity Pay Taxed?</Link> — full guide to tax and NI on maternity pay</li>
          <li><Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">Financial Planning for Maternity Leave</Link> — budgeting strategies and saving tips</li>
          <li><Link href="/guides/how-much-maternity-pay-will-i-get/" className="text-violet-600 hover:underline">How Much Maternity Pay Will I Get?</Link> — worked examples at different salary levels</li>
          <li><Link href="/guides/maternity-pay-on-minimum-wage/" className="text-violet-600 hover:underline">Maternity Pay on Minimum Wage</Link> — what to expect on lower earnings</li>
          <li><Link href="/guides/returning-to-work-after-maternity/" className="text-violet-600 hover:underline">Returning to Work After Maternity</Link> — planning your transition back</li>
          <li><Link href="/guides/childcare-costs-after-maternity-leave/" className="text-violet-600 hover:underline">Childcare Costs After Maternity Leave</Link> — what childcare will cost you</li>
        </ul>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Maternity Take-Home Pay Calculator 2026/27",
            description: "Free calculator to see your maternity pay after tax and National Insurance deductions. See what you'll actually receive.",
            url: "https://maternitypaycalculator.co.uk/calculators/take-home-pay/",
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
              { "@type": "ListItem", position: 3, name: "Take-Home Pay Calculator", item: "https://maternitypaycalculator.co.uk/calculators/take-home-pay/" },
            ],
          }),
        }}
      />
    </div>
  );
}
