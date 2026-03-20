"use client";

import { useState } from "react";
import { calculateChildBenefit, formatCurrency } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function ChildBenefitPage() {
  const [children, setChildren] = useState("1");
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateChildBenefit> | null>(null);

  const handleCalculate = () => {
    const numChildren = parseInt(children);
    const annualIncome = parseFloat(income) || 0;
    if (numChildren <= 0) return;
    setResult(calculateChildBenefit(numChildren, annualIncome));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Calculators", href: "/calculators" },
          { label: "Child Benefit Calculator" },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
        Child Benefit <span className="gradient-text">Calculator</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        Calculate your weekly and annual Child Benefit payments. See how the
        High Income Child Benefit Charge affects your payments.
      </p>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="children" className="block text-sm font-semibold text-slate-700 mb-2">
              Number of Children
            </label>
            <select
              id="children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="calc-input w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none bg-slate-50/50"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "child" : "children"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="income" className="block text-sm font-semibold text-slate-700 mb-2">
              Highest Earner&apos;s Annual Income (optional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">£</span>
              <input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 55000"
                className="calc-input w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none bg-slate-50/50"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Used to calculate the High Income Child Benefit Charge (applies if over £60,000)
            </p>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-violet-800 transition-all shadow-lg shadow-violet-200"
          >
            Calculate Child Benefit
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-8 space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Weekly</p>
              <p className="text-2xl font-bold gradient-text mt-1">{formatCurrency(result.weeklyAmount)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Annual</p>
              <p className="text-2xl font-bold text-violet-600 mt-1">{formatCurrency(result.annualAmount)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Net Annual</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(result.netAnnualAmount)}</p>
              {result.clawbackPercent > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {result.clawbackPercent}% clawback applies
                </p>
              )}
            </div>
          </div>

          {result.clawbackPercent > 0 && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-sm text-amber-700">
                <strong>High Income Child Benefit Charge:</strong> Because the highest
                earner in your household earns over £60,000, {result.clawbackPercent}% of your
                Child Benefit will be clawed back through tax. You&apos;ll still receive the full
                amount but will need to repay {formatCurrency(result.annualAmount - result.netAnnualAmount)}{" "}
                through Self Assessment.
              </p>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-700">
              <strong>Tip:</strong> Even if subject to the High Income Charge, it&apos;s still worth
              claiming Child Benefit to protect your National Insurance record for State Pension purposes.
            </p>
          </div>
        </div>
      )}

      {/* SEO content */}
      <div className="mt-16 max-w-3xl space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">About Child Benefit in the UK — 2026/27 Guide</h2>
        <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
          <p>
            Child Benefit is a regular tax-free payment from the UK government to anyone who is
            responsible for bringing up a child. It is one of the most widely claimed benefits
            in the UK, and for good reason — it provides a reliable income boost during the early
            years of parenthood, and it&apos;s particularly valuable when combined with your{" "}
            <Link href="/" className="text-violet-600 hover:underline">
              Statutory Maternity Pay
            </Link>{" "}
            or{" "}
            <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline">
              Maternity Allowance
            </Link>.
          </p>
          <p>
            For the 2026/27 tax year, the Child Benefit rates are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>First child:</strong> £27.05 per week (£1,406.60 per year)</li>
            <li><strong>Each additional child:</strong> £17.90 per week (£930.80 per year)</li>
          </ul>
          <p>
            These payments are made every 4 weeks directly into your bank account. You can claim
            from the moment your child is born and continue receiving Child Benefit until your
            child turns 16, or until they turn 20 if they stay in approved education or training.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            How to Claim Child Benefit
          </h3>
          <p>
            Claiming Child Benefit is straightforward and you should do it as soon as your baby
            is born. Here&apos;s the process:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li><strong>Register the birth</strong> — this is a legal requirement within 42 days in England and Wales (21 days in Scotland)</li>
            <li><strong>Complete the Child Benefit claim form (CH2)</strong> — you can download this from GOV.UK or claim online</li>
            <li><strong>Include your child&apos;s birth certificate</strong> — the original, which will be returned to you</li>
            <li><strong>Submit within 3 months</strong> — claims can be backdated by up to 3 months, so don&apos;t delay</li>
          </ol>
          <p>
            <strong>Important:</strong> Even if you think you might be affected by the High Income
            Child Benefit Charge (see below), it is still highly recommended that you register
            for Child Benefit. You can choose to receive the payments and pay back some or all
            through tax, or you can opt not to receive payments while still being registered.
            Registration protects your National Insurance record.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            The High Income Child Benefit Charge (HICBC)
          </h3>
          <p>
            The High Income Child Benefit Charge is a tax clawback that applies when the
            higher-earning partner in a household has an adjusted net income above{" "}
            <strong>£60,000 per year</strong> (increased from £50,000 in April 2024). This is
            one of the most misunderstood aspects of Child Benefit, so let&apos;s break it down clearly.
          </p>
          <p>
            <strong>How the clawback works:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>If the higher earner has income between £60,000 and £80,000, the charge is <strong>1% of the Child Benefit for every £200 over £60,000</strong></li>
            <li>At exactly £80,000, the charge equals 100% of the Child Benefit — effectively wiping it out entirely</li>
            <li>If the higher earner is above £80,000, you lose all the benefit through tax</li>
          </ul>
          <p>
            <strong>Example:</strong> If you have one child and the higher earner makes £70,000,
            they&apos;re £10,000 over the threshold. That&apos;s 50 lots of £200, so the clawback
            is 50% of the annual Child Benefit (£1,406.60 × 50% = £703.30 repaid through
            Self Assessment). Your net benefit is £703.30 per year.
          </p>
          <p>
            Note that the HICBC is based on <strong>individual income</strong>, not household income.
            It applies to whichever partner earns more. If both partners earn £59,000 each
            (combined £118,000), there is no charge. But if one partner earns £80,000 and the other
            earns nothing, the full charge applies.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Why You Should Still Claim Even If You&apos;re Affected by HICBC
          </h3>
          <p>
            There are two powerful reasons to claim Child Benefit even if the higher earner&apos;s
            income means you&apos;ll lose some or all of it to the HICBC:
          </p>
          <p>
            <strong>1. National Insurance credits:</strong> The parent who claims Child Benefit
            receives National Insurance credits for each week they&apos;re not working (or earning
            below the NI threshold). These credits count towards your State Pension entitlement.
            This is especially important during maternity leave when your earnings drop — your{" "}
            <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline">
              take-home maternity pay
            </Link>{" "}
            may be below the NI Primary Threshold, and without Child Benefit credits you could
            have gaps in your NI record.
          </p>
          <p>
            <strong>2. You can opt out of payments:</strong> You can register for Child Benefit
            but choose not to receive the actual payments. This means you get the NI credits
            without having to deal with the HICBC or Self Assessment. This &quot;best of both
            worlds&quot; option is often overlooked.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Child Benefit During Maternity Leave
          </h3>
          <p>
            Child Benefit is a crucial part of your income during maternity leave. When you&apos;re
            receiving the flat rate of{" "}
            <Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">
              Statutory Maternity Pay
            </Link>{" "}
            (£194.32 per week), an extra £27.05 per week for your first child adds up to a
            significant boost — that&apos;s an additional <strong>£1,406.60 over the year</strong>.
          </p>
          <p>
            Also consider that during maternity leave, the higher earner&apos;s income may not
            change, but your own income will be significantly lower. If the HICBC is based on
            your partner&apos;s income and it&apos;s above the threshold, your reduced maternity
            pay unfortunately doesn&apos;t help avoid the charge. However, if <strong>you</strong>{" "}
            are the higher earner and your maternity leave reduces your annual income below
            £60,000 for the tax year, you may find that the HICBC doesn&apos;t apply — or applies
            at a lower rate — for that year.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Child Benefit for Multiple Children
          </h3>
          <p>
            If you have more than one child, your Child Benefit increases with each additional
            child, though at a lower per-child rate. Here&apos;s the annual breakdown:
          </p>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Children</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Weekly</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-700 border border-slate-200">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-slate-200">1 child</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£27.05</td>
                  <td className="px-4 py-2 border border-slate-200 text-right font-medium">£1,406.60</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-2 border border-slate-200">2 children</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£44.95</td>
                  <td className="px-4 py-2 border border-slate-200 text-right font-medium">£2,337.40</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-slate-200">3 children</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£62.85</td>
                  <td className="px-4 py-2 border border-slate-200 text-right font-medium">£3,268.20</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-2 border border-slate-200">4 children</td>
                  <td className="px-4 py-2 border border-slate-200 text-right">£80.75</td>
                  <td className="px-4 py-2 border border-slate-200 text-right font-medium">£4,199.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Note that the two-child limit introduced in 2017 for some means-tested benefits
            (such as Universal Credit) does <strong>not</strong> apply to Child Benefit. You
            receive Child Benefit for every eligible child, regardless of how many you have.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Child Benefit and Your State Pension
          </h3>
          <p>
            One of the most overlooked benefits of claiming Child Benefit is its impact on your
            State Pension. If you&apos;re a parent who stays at home or works part-time while
            caring for a child under 12, the Child Benefit claim automatically gives you
            National Insurance credits. These credits fill gaps in your NI record and count
            towards the 35 qualifying years you need for the full new State Pension (£241.30
            per week in 2026/27, up from £230.25 in 2025/26).
          </p>
          <p>
            Without these credits, a period of maternity leave followed by part-time work or
            being a stay-at-home parent could leave you with a reduced State Pension decades
            later. This is why financial advisers strongly recommend that the primary carer
            always claims Child Benefit — even if the household is subject to the HICBC.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Reducing the HICBC Through Salary Sacrifice or Pension Contributions
          </h3>
          <p>
            There are legitimate ways to reduce or eliminate the High Income Child Benefit
            Charge. The most common strategy is for the higher earner to make additional pension
            contributions (either through salary sacrifice or personal pension contributions).
            Pension contributions reduce your adjusted net income, which is the figure used to
            calculate the HICBC.
          </p>
          <p>
            <strong>Example:</strong> If the higher earner makes £70,000 and contributes £10,000
            to a pension, their adjusted net income drops to £60,000 — below the HICBC threshold.
            They keep the full Child Benefit, get tax relief on the pension contribution, and
            build their retirement savings at the same time.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Plan Your Complete Maternity Finances
          </h3>
          <p>
            Child Benefit is just one piece of the puzzle. To get a complete picture of your
            finances during maternity leave, explore our other free tools:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><Link href="/" className="text-violet-600 hover:underline">SMP Calculator</Link>{" "}
              — calculate your Statutory Maternity Pay week by week
            </li>
            <li><Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline">Maternity Allowance Calculator</Link>{" "}
              — for self-employed or recently changed jobs
            </li>
            <li><Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline">Take-Home Pay Calculator</Link>{" "}
              — see your maternity pay after tax
            </li>
            <li><Link href="/calculators/maternity-leave-planner/" className="text-violet-600 hover:underline">Maternity Leave Planner</Link>{" "}
              — work out all your key dates
            </li>
          </ul>
          <p className="mt-4">
            For a full guide to managing your money during maternity leave, including budgeting
            tips and benefit maximisation strategies, read our{" "}
            <Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">
              financial planning for maternity leave guide
            </Link>.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-violet-50 rounded-xl p-6 border border-slate-200 mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
        <p className="text-slate-600 mb-4">Learn more about benefits, tax, and financial planning for new parents:</p>
        <ul className="space-y-2 text-sm">
          <li><Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">Financial Planning for Maternity Leave</Link> — budgeting tips and saving strategies</li>
          <li><Link href="/guides/is-maternity-pay-taxed/" className="text-violet-600 hover:underline">Is Maternity Pay Taxed?</Link> — understand tax on SMP and Maternity Allowance</li>
          <li><Link href="/guides/benefits-during-maternity-leave/" className="text-violet-600 hover:underline">Benefits During Maternity Leave</Link> — all the support you can claim</li>
          <li><Link href="/guides/tax-free-childcare-guide/" className="text-violet-600 hover:underline">Tax-Free Childcare Guide</Link> — save up to £2,000 a year on childcare</li>
          <li><Link href="/guides/how-much-does-a-baby-cost-uk/" className="text-violet-600 hover:underline">How Much Does a Baby Cost in the UK?</Link> — realistic costs to plan for</li>
          <li><Link href="/guides/sure-start-maternity-grant/" className="text-violet-600 hover:underline">Sure Start Maternity Grant</Link> — a one-off £500 payment for eligible families</li>
        </ul>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UK Child Benefit Calculator 2026/27",
            description: "Free Child Benefit calculator with High Income Child Benefit Charge. Calculate your weekly and annual payments.",
            url: "https://maternitypaycalculator.co.uk/calculators/child-benefit/",
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
              { "@type": "ListItem", position: 3, name: "Child Benefit Calculator", item: "https://maternitypaycalculator.co.uk/calculators/child-benefit/" },
            ],
          }),
        }}
      />
    </div>
  );
}
