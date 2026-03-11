import type { Metadata } from "next";
import MaternityPayCalculator from "@/components/MaternityPayCalculator";
import CalculatorCards from "@/components/CalculatorCards";
import FAQSection from "@/components/FAQSection";
import GuideCard from "@/components/GuideCard";
import { getFeaturedGuides } from "@/lib/guides-data";
import { SMP_RATES, SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: `UK Maternity Pay Calculator 2026/27 — Free SMP Calculator | ${SITE_CONFIG.name}`,
  description:
    "Free UK Maternity Pay Calculator for 2026/27. Calculate your Statutory Maternity Pay (SMP) week by week, see take-home pay after tax, and plan your maternity leave finances instantly.",
  keywords: [
    "maternity pay calculator",
    "SMP calculator",
    "statutory maternity pay calculator",
    "maternity pay calculator UK 2026",
    "how much maternity pay will I get",
    "maternity pay 2026/27",
    "maternity leave pay calculator",
    "UK maternity pay",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
  openGraph: {
    title: "UK Maternity Pay Calculator 2026/27 — Free SMP Calculator",
    description:
      "Calculate your Statutory Maternity Pay (SMP) instantly. Week-by-week breakdown with take-home pay after tax. Updated for 2026/27.",
    url: `${SITE_CONFIG.url}/`,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Maternity Pay Calculator 2026/27",
    description:
      "Free SMP calculator — see your week-by-week maternity pay breakdown and take-home pay after tax.",
  },
};

export default function Home() {
  const featuredGuides = getFeaturedGuides();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              UK Maternity Pay{" "}
              <span className="gradient-text">Calculator</span>{" "}
              <span className="text-2xl sm:text-3xl lg:text-4xl">2026/27</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Calculate your Statutory Maternity Pay (SMP) instantly. See your
              week-by-week breakdown, estimated take-home pay after tax, and
              plan your maternity leave finances.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Updated for 2026/27
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% Free
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Week-by-week breakdown
              </span>
            </div>
          </div>

          {/* Calculator */}
          <div className="max-w-2xl mx-auto">
            <MaternityPayCalculator />
          </div>
        </div>
      </section>

      {/* Pillar Content Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Understanding Statutory Maternity Pay (SMP) in the UK
          </h2>
          <div className="prose prose max-w-none text-slate-600 space-y-4">
            <p className="text-lg leading-relaxed">
              Statutory Maternity Pay (SMP) is the legal minimum your employer must pay you
              during maternity leave. If you qualify, you&apos;ll receive SMP for up to{" "}
              <strong>39 weeks</strong>: the first 6 weeks at <strong>90% of your average
              weekly earnings</strong>, followed by 33 weeks at the flat rate of{" "}
              <strong>£{SMP_RATES.FLAT_RATE_WEEKLY} per week</strong> (or 90% of AWE if lower).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Weeks 1–6</h3>
                <p className="text-2xl font-bold text-violet-600">90%</p>
                <p className="text-xs text-slate-500 mt-1">of average weekly earnings</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Weeks 7–39</h3>
                <p className="text-2xl font-bold text-sky-600">£{SMP_RATES.FLAT_RATE_WEEKLY}</p>
                <p className="text-xs text-slate-500 mt-1">per week (flat rate)</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Weeks 40–52</h3>
                <p className="text-2xl font-bold text-slate-400">Unpaid</p>
                <p className="text-xs text-slate-500 mt-1">additional leave entitlement</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Do You Qualify for SMP?
            </h3>
            <p>To receive Statutory Maternity Pay you must:</p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                Have been continuously employed for at least <strong>26 weeks</strong> by the 15th week before your due date
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                Earn at least <strong>£{SMP_RATES.LOWER_EARNINGS_LIMIT} per week</strong> on average (the Lower Earnings Limit)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                Give your employer correct <strong>notice</strong> and provide a MATB1 certificate
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                Still be employed in the qualifying week (but you don&apos;t need to still be working)
              </li>
            </ul>
            <p className="mt-4">
              Don&apos;t qualify for SMP? You may be eligible for{" "}
              <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline font-medium">
                Maternity Allowance
              </Link>{" "}
              instead. Read our{" "}
              <Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline font-medium">
                complete SMP guide
              </Link>{" "}
              for detailed information.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              How Our Maternity Pay Calculator Works
            </h3>
            <p>
              Our free maternity pay calculator uses the latest 2026/27 UK statutory rates to provide you
              with a personalised, week-by-week breakdown of your Statutory Maternity Pay. Simply enter your
              annual salary before tax, confirm your employment status, and the calculator instantly shows you
              how much you&apos;ll receive each week for the full 52-week maternity leave period.
            </p>
            <p>
              The calculator also estimates your Income Tax and National Insurance deductions so you can see
              your approximate{" "}
              <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline font-medium">
                take-home pay during maternity leave
              </Link>. This helps you budget effectively for the months ahead. For a more detailed after-tax
              breakdown, visit our dedicated take-home pay calculator.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              How SMP Is Calculated — Step by Step
            </h3>
            <p>
              Your Statutory Maternity Pay is based on your <strong>Average Weekly Earnings (AWE)</strong>. HMRC
              calculates your AWE using your gross pay over an 8-week reference period that ends on the last
              normal pay day on or before the Saturday at the end of the qualifying week.
            </p>
            <p>
              For most monthly-paid employees, this means your AWE is based on two months&apos; pay. If you
              receive a bonus or pay rise during this period, it can increase your AWE and therefore your SMP
              for the first 6 weeks.
            </p>
            <p>
              <strong>Example:</strong> If your annual salary is £30,000, your weekly earnings are approximately
              £576.92. The first 6 weeks of SMP would be paid at 90% — that&apos;s <strong>£519.23 per week</strong>.
              For weeks 7 to 39, you&apos;d receive the flat rate of <strong>£{SMP_RATES.FLAT_RATE_WEEKLY} per week</strong>,
              because 90% of your earnings exceeds the flat rate cap. Your total gross SMP would be approximately
              £9,527.94 over the 39-week paid period.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              SMP for Different Salary Levels
            </h3>
            <p>
              The amount of SMP you receive varies significantly depending on your salary. The higher-rate
              period (first 6 weeks) is always 90% of your earnings with no cap, which means higher earners
              benefit more during this period. However, the flat-rate period levels out the playing field.
            </p>
            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-violet-50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-slate-200">Annual Salary</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-700 border border-slate-200">Weeks 1–6 (weekly)</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-700 border border-slate-200">Weeks 7–39 (weekly)</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-700 border border-slate-200">Total Gross SMP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2.5 border border-slate-200 font-medium">£20,000</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£346.15</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£194.32</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right font-medium">£8,489.46</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2.5 border border-slate-200 font-medium">£30,000</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£519.23</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£194.32</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right font-medium">£9,527.94</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 border border-slate-200 font-medium">£40,000</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£692.31</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£194.32</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right font-medium">£10,566.42</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2.5 border border-slate-200 font-medium">£50,000</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£865.38</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right">£194.32</td>
                    <td className="px-4 py-2.5 border border-slate-200 text-right font-medium">£11,604.84</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              As the table shows, the total gross SMP difference between a £20,000 and £50,000 salary is
              around £3,115 — entirely driven by the first 6 weeks. Use the calculator above to see your
              exact figures, or visit our{" "}
              <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline font-medium">
                take-home pay calculator
              </Link>{" "}
              to see what you&apos;ll actually receive after deductions.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Tax and National Insurance on Maternity Pay
            </h3>
            <p>
              SMP is treated as earnings, which means you&apos;ll pay both Income Tax and National Insurance
              contributions on your maternity pay. However, because your income is lower during maternity
              leave, you&apos;ll typically pay less tax overall compared to your normal working months.
            </p>
            <p>
              For the 2026/27 tax year, the Personal Allowance is <strong>£12,570</strong> — you won&apos;t pay
              any tax on the first £12,570 of annual income. The basic rate of Income Tax is 20% on earnings
              between £12,571 and £50,270, and the employee National Insurance rate is 8% on earnings above
              the Primary Threshold.
            </p>
            <p>
              During the flat-rate SMP period (£{SMP_RATES.FLAT_RATE_WEEKLY}/week), your annualised earnings
              fall within the Personal Allowance for most people, meaning you may pay little or no tax during
              those weeks. This is one reason why your{" "}
              <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline font-medium">
                take-home maternity pay
              </Link>{" "}
              may be closer to the gross figure than you expect.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              What If You Don&apos;t Qualify for SMP?
            </h3>
            <p>
              If you don&apos;t meet the eligibility requirements for Statutory Maternity Pay, don&apos;t
              worry — there are other options. Your employer must issue you a form SMP1 explaining why
              you don&apos;t qualify, and you can then apply for{" "}
              <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline font-medium">
                Maternity Allowance (MA)
              </Link>{" "}
              from the Department for Work and Pensions.
            </p>
            <p>
              Maternity Allowance is particularly relevant for self-employed women, agency workers, and
              those who&apos;ve recently changed employer. The maximum MA rate is the same as the SMP flat
              rate (£{SMP_RATES.FLAT_RATE_WEEKLY}/week), but it has a key advantage:{" "}
              <strong>Maternity Allowance is tax-free</strong>. Read our comprehensive{" "}
              <Link href="/guides/maternity-allowance-guide/" className="text-violet-600 hover:underline font-medium">
                Maternity Allowance guide
              </Link>{" "}
              or use the{" "}
              <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline font-medium">
                MA calculator
              </Link>{" "}
              to check your entitlement.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Planning Your Maternity Leave Finances
            </h3>
            <p>
              Understanding how much maternity pay you&apos;ll receive is just the first step. A solid
              financial plan will help you manage the income drop during your leave. Here are the key
              things to consider:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                <strong>Budget for the flat-rate period</strong> — weeks 7 to 39 at £{SMP_RATES.FLAT_RATE_WEEKLY}/week
                is the biggest financial adjustment for most families
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                <strong>Don&apos;t forget the unpaid period</strong> — if you take the full 52 weeks, the last
                13 weeks are completely unpaid
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                <strong>Claim{" "}
                <Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">Child Benefit</Link>
                </strong> — worth up to £27.05/week for your first child and £17.90 for additional children
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                <strong>Check your employer&apos;s policy</strong> — many employers offer enhanced maternity pay
                above the statutory minimum
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">✓</span>
                <strong>Use your annual leave</strong> — you continue to accrue holiday during maternity leave,
                which can extend your paid time off
              </li>
            </ul>
            <p className="mt-4">
              For a complete financial planning strategy, read our{" "}
              <Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline font-medium">
                financial planning for maternity leave guide
              </Link>, and use our{" "}
              <Link href="/calculators/maternity-leave-planner/" className="text-violet-600 hover:underline font-medium">
                maternity leave planner
              </Link>{" "}
              to work out all your key dates.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Your Maternity Leave Rights
            </h3>
            <p>
              Every pregnant employee in the UK is entitled to <strong>52 weeks of maternity leave</strong>,
              regardless of how long you&apos;ve worked for your employer or how many hours you work. This
              is split into 26 weeks of Ordinary Maternity Leave and 26 weeks of Additional Maternity Leave.
              You must take a minimum of 2 weeks after your baby is born (4 weeks if you work in a factory).
            </p>
            <p>
              During maternity leave, you continue to accrue annual leave, your pension contributions
              should continue (at least on the employer&apos;s side during paid leave), and you have
              protection against unfair dismissal and redundancy. You also have the right to return to
              your same job after Ordinary Maternity Leave, or a suitable alternative after Additional
              Maternity Leave.
            </p>
            <p>
              To learn more, read our detailed guide on{" "}
              <Link href="/guides/maternity-leave-rights/" className="text-violet-600 hover:underline font-medium">
                your maternity leave rights
              </Link>, or explore our guide on{" "}
              <Link href="/guides/returning-to-work-after-maternity/" className="text-violet-600 hover:underline font-medium">
                returning to work after maternity leave
              </Link>{" "}
              if you&apos;re already thinking about coming back.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Shared Parental Leave — An Alternative Option
            </h3>
            <p>
              If you&apos;d like to share your maternity leave with your partner, you can convert some
              of your entitlement into{" "}
              <Link href="/guides/shared-parental-leave-guide/" className="text-violet-600 hover:underline font-medium">
                Shared Parental Leave (SPL)
              </Link>. This allows both parents to take leave in flexible blocks during the
              first year. Shared Parental Leave Pay is paid at the same flat rate as SMP
              (£{SMP_RATES.FLAT_RATE_WEEKLY}/week), but note that the first 6 weeks of enhanced
              90% pay cannot be shared — that always belongs to the mother.
            </p>
            <p>
              To be eligible for Shared Parental Leave, the mother must have been entitled to maternity leave
              or SMP/Maternity Allowance, and her partner must have been employed for at least 26 weeks in the
              66 weeks before the due date, and earned at least £30 per week in 13 of those weeks. Both parents
              must give notice to their employers. Use our{" "}
              <Link href="/calculators/shared-parental-leave/" className="text-violet-600 hover:underline font-medium">
                Shared Parental Leave calculator
              </Link>{" "}
              to see how splitting your leave could work for your family.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Enhanced Maternity Pay — What Your Employer Might Offer
            </h3>
            <p>
              Many employers choose to offer maternity pay above the statutory minimum, known as enhanced
              or occupational maternity pay. This varies widely: some employers pay full salary for a set
              number of weeks, while others top up SMP to a percentage of your normal pay. Enhanced maternity
              pay is entirely at your employer&apos;s discretion and will be set out in your employment
              contract or company maternity policy.
            </p>
            <p>
              Common enhanced maternity pay structures include 12 weeks at full pay followed by SMP, or 6
              months at 90% of salary. If your employer offers enhanced pay, the statutory SMP element is
              included within it — your employer doesn&apos;t pay SMP on top. Always check your contract or
              ask HR before your maternity leave begins. Use our{" "}
              <Link href="/calculators/enhanced-maternity-pay/" className="text-violet-600 hover:underline font-medium">
                enhanced maternity pay calculator
              </Link>{" "}
              to model different scenarios and see how enhanced pay affects your total income during leave.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Key Maternity Leave Dates and Deadlines
            </h3>
            <p>
              Timing is crucial when it comes to maternity leave. You must notify your employer by the
              15th week before your due date (roughly 25 weeks pregnant) to confirm your pregnancy and
              your intended start date. Your employer then has 28 days to respond with your expected
              return date.
            </p>
            <p>
              The <strong>qualifying week</strong> is the 15th week before your expected week of childbirth.
              You must have been continuously employed for 26 weeks by this date to qualify for SMP. The
              earliest you can start maternity leave is 11 weeks before your due date, and the latest is
              the day after your baby is born. If you have a pregnancy-related illness in the 4 weeks before
              your due date, your maternity leave and pay will start automatically.
            </p>
            <p>
              Use our{" "}
              <Link href="/calculators/maternity-leave-planner/" className="text-violet-600 hover:underline font-medium">
                maternity leave planner
              </Link>{" "}
              to calculate all your key dates including the qualifying week, earliest start date, notification
              deadline, and full 52-week leave end date based on your due date.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Maternity Pay for Special Circumstances
            </h3>
            <p>
              Certain employment situations can affect how SMP works. If you&apos;re on a{" "}
              <Link href="/guides/maternity-pay-agency-zero-hours-workers/" className="text-violet-600 hover:underline font-medium">
                zero-hours contract or agency work
              </Link>, you can still qualify for SMP provided you meet the continuous employment and earnings
              requirements. Your average weekly earnings are calculated in the same way, though variable
              hours may mean your AWE fluctuates.
            </p>
            <p>
              <Link href="/guides/maternity-pay-part-time-workers/" className="text-violet-600 hover:underline font-medium">
                Part-time workers
              </Link>{" "}
              have exactly the same maternity leave and pay rights as full-time employees. SMP is based on
              your average weekly earnings regardless of hours worked. If you work multiple jobs, you may
              be entitled to SMP from each employer separately, as long as you meet the qualifying conditions
              with each one.
            </p>
            <p>
              If you&apos;re{" "}
              <Link href="/guides/maternity-pay-self-employed/" className="text-violet-600 hover:underline font-medium">
                self-employed
              </Link>, you won&apos;t qualify for SMP (as you don&apos;t have an employer), but you can claim
              Maternity Allowance from the government if you&apos;ve been registered as self-employed for at
              least 26 weeks in the 66-week test period before your due date. The maximum MA rate is £{SMP_RATES.FLAT_RATE_WEEKLY}
              per week for 39 weeks, and crucially, it&apos;s completely tax-free.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Keeping in Touch Days (KIT Days)
            </h3>
            <p>
              During your maternity leave, you&apos;re entitled to work up to 10{" "}
              <Link href="/guides/keeping-in-touch-days-explained/" className="text-violet-600 hover:underline font-medium">
                Keeping in Touch (KIT) days
              </Link>{" "}
              without losing any SMP or ending your maternity leave. These are entirely voluntary — neither
              you nor your employer can insist on them. KIT days can be used for training, team meetings,
              or simply staying connected with your workplace. The pay for KIT days is agreed between you
              and your employer, and any amount paid above your SMP entitlement for that week is treated
              as additional earnings.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Your MATB1 Certificate
            </h3>
            <p>
              To claim SMP, you need to provide your employer with a{" "}
              <Link href="/guides/matb1-form-guide/" className="text-violet-600 hover:underline font-medium">
                MATB1 certificate
              </Link>{" "}
              (Maternity Certificate). This is issued by your midwife or doctor, usually from 20 weeks of
              pregnancy onwards. The MATB1 confirms your expected week of childbirth and is the medical
              evidence your employer needs to process your SMP. You should give this to your employer as
              soon as possible — ideally at the same time as your formal maternity leave notification.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Other Financial Support During Maternity
            </h3>
            <p>
              Beyond SMP and{" "}
              <Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline font-medium">
                Child Benefit
              </Link>, there are several other forms of financial support available to new parents.
              The{" "}
              <Link href="/guides/sure-start-maternity-grant/" className="text-violet-600 hover:underline font-medium">
                Sure Start Maternity Grant
              </Link>{" "}
              provides a one-off payment of £500 for those on qualifying benefits. You may also be entitled
              to Universal Credit, Housing Benefit, or Council Tax Reduction during your leave.
            </p>
            <p>
              Once your baby arrives, it&apos;s worth looking into{" "}
              <Link href="/guides/tax-free-childcare-guide/" className="text-violet-600 hover:underline font-medium">
                Tax-Free Childcare
              </Link>{" "}
              for when you return to work. The government tops up your childcare payments by 25%, up to a
              maximum of £2,000 per child per year (or £4,000 for disabled children). For a full breakdown
              of the costs to expect, see our guide on{" "}
              <Link href="/guides/how-much-does-a-baby-cost-uk/" className="text-violet-600 hover:underline font-medium">
                how much a baby costs in the UK
              </Link>.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Redundancy and Job Protection During Maternity
            </h3>
            <p>
              It&apos;s illegal for your employer to dismiss you because of your pregnancy or maternity leave.
              If a genuine redundancy situation arises during your leave, you have{" "}
              <Link href="/guides/redundancy-during-pregnancy-maternity/" className="text-violet-600 hover:underline font-medium">
                special priority for suitable alternative vacancies
              </Link>. Your employer must offer you any available suitable role before offering it to other
              employees. If you believe you&apos;ve been unfairly treated, you can contact ACAS or seek
              advice from{" "}
              <Link href="/guides/pregnancy-discrimination-at-work/" className="text-violet-600 hover:underline font-medium">
                our guide on pregnancy discrimination
              </Link>.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8">
              Preparing to Return to Work
            </h3>
            <p>
              As your maternity leave draws to a close, you&apos;ll need to think about your return. If
              you want to return at the end of your full 52-week entitlement, you don&apos;t need to give
              notice. If you want to come back earlier, you must give your employer at least 8 weeks&apos;
              notice. Many parents choose to explore{" "}
              <Link href="/guides/flexible-working-after-maternity-leave/" className="text-violet-600 hover:underline font-medium">
                flexible working arrangements
              </Link>{" "}
              such as part-time hours, compressed weeks, or remote working.
            </p>
            <p>
              You have a legal right to request flexible working from day one of your employment, and your
              employer must deal with your request in a reasonable manner. For tips on managing the transition
              back, read our{" "}
              <Link href="/guides/returning-to-work-after-maternity/" className="text-violet-600 hover:underline font-medium">
                returning to work after maternity leave guide
              </Link>, and consider your{" "}
              <Link href="/guides/childcare-costs-after-maternity-leave/" className="text-violet-600 hover:underline font-medium">
                childcare cost options
              </Link>{" "}
              early to avoid last-minute stress.
            </p>
          </div>
        </div>
      </section>

      {/* Other Calculators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              More Maternity Calculators
            </h2>
            <p className="mt-2 text-slate-500">
              Plan every aspect of your maternity leave with our free tools
            </p>
          </div>
          <CalculatorCards exclude="/" />
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Maternity Leave Guides
          </h2>
          <p className="mt-2 text-slate-500">
            Expert guides to help you navigate maternity leave with confidence
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/guides/"
            className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 font-medium px-6 py-3 rounded-xl hover:bg-violet-100 transition-colors"
          >
            View all guides
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UK Maternity Pay Calculator",
            description: "Free UK Statutory Maternity Pay (SMP) calculator for 2026/27. Calculate your maternity pay week by week.",
            url: "https://maternitypaycalculator.co.uk/",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much is Statutory Maternity Pay in 2026/27?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SMP is paid for 39 weeks: the first 6 weeks at 90% of your average weekly earnings, then 33 weeks at £194.32 per week (or 90% of AWE if lower). The remaining 13 weeks of your 52-week leave entitlement are unpaid.",
                },
              },
              {
                "@type": "Question",
                name: "Who qualifies for Statutory Maternity Pay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You qualify for SMP if you've been employed continuously for at least 26 weeks by the 15th week before your due date, and you earn at least £129 per week on average. You must also provide your employer with medical evidence of pregnancy and correct notice.",
                },
              },
              {
                "@type": "Question",
                name: "When can I start my maternity leave?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can start maternity leave up to 11 weeks before your due date. The latest you can start is the day after your baby is born. If you have a pregnancy-related illness in the 4 weeks before your due date, your leave starts automatically.",
                },
              },
              {
                "@type": "Question",
                name: "Is maternity pay taxable?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Statutory Maternity Pay is treated as earnings and is subject to Income Tax and National Insurance. However, Maternity Allowance (paid by the DWP) is not taxable.",
                },
              },
              {
                "@type": "Question",
                name: "What if I don't qualify for SMP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you don't qualify for SMP, you may be eligible for Maternity Allowance from the Department for Work and Pensions. This is available to self-employed workers and those who've recently changed jobs. The maximum rate is £194.32 per week for 39 weeks and it's completely tax-free.",
                },
              },
              {
                "@type": "Question",
                name: "Can I work during maternity leave?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can work up to 10 'Keeping in Touch' (KIT) days during your maternity leave without affecting your SMP or ending your leave. These are voluntary for both you and your employer.",
                },
              },
            ],
          }),
        }}
      />
      {/* BreadcrumbList schema for homepage */}
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
                name: "Maternity Pay Calculator",
                item: "https://maternitypaycalculator.co.uk/",
              },
            ],
          }),
        }}
      />
    </>
  );
}
