"use client";

import { useState } from "react";
import { calculateMaternityDates } from "@/lib/calculations";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function MaternityLeavePlannerPage() {
  const [dueDate, setDueDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateMaternityDates> | null>(null);

  const handleCalculate = () => {
    if (!dueDate) return;
    const dates = calculateMaternityDates(new Date(dueDate));
    setResult(dates);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Calculators", href: "/calculators" },
          { label: "Maternity Leave Planner" },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
        Maternity Leave <span className="gradient-text">Planner</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        Enter your due date to calculate all your key maternity leave dates —
        including when to notify your employer, earliest start date, and your
        qualifying week.
      </p>

      {/* Calculator */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="due-date" className="block text-sm font-semibold text-slate-700 mb-2">
              When is your baby due?
            </label>
            <input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="calc-input w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none bg-slate-50/50"
            />
          </div>
          <button
            onClick={handleCalculate}
            disabled={!dueDate}
            className="w-full bg-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-200"
          >
            Calculate My Dates
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-4 animate-fade-in-up">
          <h2 className="text-xl font-bold text-slate-900">Your Key Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25" /></svg>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Notify Employer By
                </p>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {formatDate(result.notifyByDate)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                15 weeks before due date
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Qualifying Week
                </p>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {formatDate(result.qualifyingWeek)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Must have 26 weeks employment by this date
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full bg-green-500 shrink-0"></span>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Earliest Start Date
                </p>
              </div>
              <p className="text-lg font-semibold text-green-700">
                {formatDate(result.earliestStart)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                11 weeks before due date
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full bg-red-500 shrink-0"></span>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Latest Start Date
                </p>
              </div>
              <p className="text-lg font-semibold text-red-700">
                {formatDate(result.latestStart)}
              </p>
              <p className="text-xs text-slate-500 mt-1">Your due date</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full bg-violet-600 shrink-0"></span>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Maternity Leave End Date (52 weeks)
                </p>
              </div>
              <p className="text-lg font-semibold text-violet-700">
                {formatDate(result.endDate)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Full 52-week entitlement from due date
              </p>
            </div>
          </div>

          <div className="bg-violet-50 rounded-xl p-6 mt-6">
            <h3 className="font-semibold text-slate-800 mb-3">Next Steps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors group"
              >
                <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm3.75-7.5H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V8.25A2.25 2.25 0 0018.75 6zM5.25 7.5h13.5v3H5.25v-3z" /></svg>
                <div>
                  <p className="font-medium text-slate-800 group-hover:text-violet-700">
                    Calculate your SMP
                  </p>
                  <p className="text-xs text-slate-500">See your week-by-week pay</p>
                </div>
              </Link>
              <Link
                href="/guides/maternity-leave-rights/"
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors group"
              >
                <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                <div>
                  <p className="font-medium text-slate-800 group-hover:text-violet-700">
                    Your rights
                  </p>
                  <p className="text-xs text-slate-500">Maternity leave rights guide</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          How to Plan Your Maternity Leave Dates
        </h2>
        <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
          <p>
            Planning your maternity leave dates is one of the most important steps in
            preparing for your baby&apos;s arrival. Every pregnant employee in the UK is entitled
            to <strong>52 weeks of maternity leave</strong> — this is a statutory right regardless of
            how long you&apos;ve worked for your employer, how many hours you work per week, or how
            much you earn. Our maternity leave date planner helps you work out all the key dates
            you need to know, from when to notify your employer right through to when your leave ends.
          </p>
          <p>
            Getting your dates right is essential because they affect your{" "}
            <Link href="/guides/statutory-maternity-pay-explained/" className="text-violet-600 hover:underline">
              Statutory Maternity Pay (SMP)
            </Link>{" "}
            eligibility, your employer notification deadline, and when you can start and end your leave.
            Use our calculator above by entering your due date, and we&apos;ll instantly show you every
            date that matters.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Understanding the Qualifying Week
          </h3>
          <p>
            The <strong>qualifying week</strong> is arguably the most important date in your maternity
            leave timeline. It falls in the <strong>15th week before your expected week of childbirth
            (EWC)</strong> — specifically, the Saturday at the end of that week. This date is critical
            because it determines whether you qualify for Statutory Maternity Pay.
          </p>
          <p>
            To receive SMP, you must have been continuously employed by the same employer for at
            least <strong>26 weeks</strong> by the end of the qualifying week. This means you need
            to have started your current job at least 26 weeks before that Saturday. If you don&apos;t
            meet this requirement, you won&apos;t qualify for SMP through your employer — but you may
            still be eligible for{" "}
            <Link href="/calculators/maternity-allowance/" className="text-violet-600 hover:underline">
              Maternity Allowance
            </Link>{" "}
            from the government instead.
          </p>
          <p>
            Your average weekly earnings (AWE) are also measured against the qualifying week. HMRC
            looks at your gross pay over an 8-week reference period ending on the last normal pay
            day on or before the Saturday of the qualifying week. Your AWE must be at least
            <strong> £129 per week</strong> (the Lower Earnings Limit for 2026/27) to qualify for SMP.
            Use our{" "}
            <Link href="/" className="text-violet-600 hover:underline">
              maternity pay calculator
            </Link>{" "}
            to work out exactly how much SMP you&apos;ll receive.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            When to Notify Your Employer
          </h3>
          <p>
            By law, you must tell your employer about your pregnancy and intended maternity leave
            start date <strong>no later than the 15th week before your baby is due</strong> — this
            is the same as the qualifying week. In practice, many women tell their employer earlier
            than this, but you are not legally required to do so.
          </p>
          <p>When you notify your employer, you need to provide three pieces of information:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>That you are pregnant</li>
            <li>Your expected week of childbirth (your due date)</li>
            <li>The date you want to start your maternity leave</li>
          </ul>
          <p>
            Your employer must then respond in writing within 28 days, confirming the date your
            maternity leave will end. You&apos;ll also need to provide a <strong>MATB1 certificate</strong>{" "}
            — this is a form your midwife or GP will give you, usually around week 20 of your pregnancy.
            Your employer needs this to process your SMP claim.
          </p>
          <p>
            If you change your mind about when you want your leave to start, you can change the date
            as long as you give your employer at least <strong>28 days&apos; notice</strong> of the
            new start date. For a full overview of your notification obligations and protections,
            read our guide on{" "}
            <Link href="/guides/maternity-leave-rights/" className="text-violet-600 hover:underline">
              your maternity leave rights
            </Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Earliest and Latest Maternity Leave Start Dates
          </h3>
          <p>
            You have flexibility over when you start your maternity leave, within certain limits.
            The <strong>earliest you can start</strong> maternity leave is <strong>11 weeks before
            your due date</strong>. Many women choose to start closer to their due date to maximise
            their time off after the birth, while others prefer to stop working earlier for rest
            and preparation.
          </p>
          <p>
            The <strong>latest you can start</strong> is the day after your baby is born. If your baby
            arrives before your planned leave start date, your maternity leave is automatically
            triggered from the day after the birth. Similarly, if you are off work with a
            pregnancy-related illness in the last 4 weeks before your due date, your employer can
            start your maternity leave from the following day.
          </p>
          <p>
            When choosing your start date, consider these practical factors:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Annual leave:</strong> You continue to accrue holiday during maternity leave, so some women take annual leave before their maternity leave officially begins to extend their overall time off</li>
            <li><strong>Financial impact:</strong> Starting earlier means your SMP payments begin sooner — and end sooner. Use our{" "}
              <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline">
                take-home pay calculator
              </Link>{" "}
              to understand the financial implications
            </li>
            <li><strong>Health and comfort:</strong> The final weeks of pregnancy can be physically demanding, and your wellbeing should be the top priority</li>
            <li><strong>Work handover:</strong> Allow time for a proper handover to colleagues before you leave</li>
          </ul>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            What Happens If Your Baby Arrives Early?
          </h3>
          <p>
            If your baby is born before your intended maternity leave start date, your leave
            automatically starts on the day after the birth. Your employer still needs to pay
            you SMP (assuming you qualify), and the 39-week payment period runs from the week
            your baby is born. Premature births don&apos;t change your eligibility — if you had
            already met the qualifying week requirements, you&apos;re entitled to the full SMP period.
          </p>
          <p>
            If your baby is born before the qualifying week (more than 15 weeks early), the
            rules are slightly different. In this situation, you may still qualify for SMP if
            you had been employed for a continuous period that includes some part of the
            qualifying week. Speak to your employer or HMRC if you&apos;re in this situation.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Ordinary vs Additional Maternity Leave
          </h3>
          <p>
            Your 52 weeks of maternity leave is split into two halves:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Ordinary Maternity Leave (OML)</strong> — the first 26 weeks. During OML, you have the right to return to exactly the same job</li>
            <li><strong>Additional Maternity Leave (AML)</strong> — the second 26 weeks. During AML, your employer must offer you the same job or a suitable alternative on no less favourable terms</li>
          </ul>
          <p>
            Remember that SMP is only paid for <strong>39 weeks</strong>, so if you take the full
            52 weeks, the last 13 weeks are unpaid. This is an important consideration for your{" "}
            <Link href="/guides/financial-planning-for-maternity/" className="text-violet-600 hover:underline">
              maternity leave financial plan
            </Link>. You must take a minimum of <strong>2 weeks</strong> after your baby is born
            (4 weeks if you work in a factory) — this is called compulsory maternity leave.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Keeping In Touch (KIT) Days
          </h3>
          <p>
            During your maternity leave, you can work for up to <strong>10 Keeping In Touch (KIT) days</strong>{" "}
            without it affecting your SMP or ending your maternity leave. KIT days are completely
            optional — your employer cannot require you to work, and you cannot insist on working.
            Both parties must agree.
          </p>
          <p>
            KIT days are useful for attending important meetings, training sessions, or simply
            staying connected with your workplace. Your employer should pay you for KIT days at
            your normal rate, and this is on top of your SMP (not instead of it). Any work done
            on a KIT day counts as a full day, even if you only work for an hour.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Shared Parental Leave — An Alternative
          </h3>
          <p>
            If you&apos;d like to share some of your maternity leave with your partner, you
            can opt into{" "}
            <Link href="/guides/shared-parental-leave-guide/" className="text-violet-600 hover:underline">
              Shared Parental Leave (SPL)
            </Link>. This allows you to end your maternity leave early and convert the remaining
            weeks into shared leave that either parent can take. SPL can be taken in blocks,
            meaning both parents could even be off work at the same time.
          </p>
          <p>
            To use SPL, you must give your employer at least 8 weeks&apos; notice and you must
            end your maternity leave at least 2 weeks after the birth. The remaining weeks of
            pay (up to the 39-week SMP entitlement) convert to Shared Parental Leave Pay at the
            flat rate of £194.32 per week.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Returning to Work After Maternity Leave
          </h3>
          <p>
            If you plan to return to work at the end of your full 52-week leave, you don&apos;t
            need to give your employer any notice — they already know the end date from when they
            confirmed your maternity leave. However, if you want to return early, you must give
            at least <strong>8 weeks&apos; notice</strong>.
          </p>
          <p>
            Many women choose to return part-time or with flexible working arrangements. You have
            the legal right to request flexible working, and your employer must consider your
            request seriously. For advice on managing the transition, read our guide on{" "}
            <Link href="/guides/returning-to-work-after-maternity/" className="text-violet-600 hover:underline">
              returning to work after maternity leave
            </Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-8 !mb-2">
            Your Complete Maternity Leave Checklist
          </h3>
          <p>
            Use this checklist alongside the dates from our planner to make sure you&apos;ve
            covered everything:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Inform your employer by the qualifying week deadline</li>
            <li>Provide your MATB1 certificate (available from week 20)</li>
            <li>Choose your maternity leave start date</li>
            <li>Use the{" "}
              <Link href="/" className="text-violet-600 hover:underline">
                SMP calculator
              </Link>{" "}
              to estimate your maternity pay
            </li>
            <li>Check your employer&apos;s enhanced maternity pay policy</li>
            <li>Check your{" "}
              <Link href="/calculators/child-benefit/" className="text-violet-600 hover:underline">
                Child Benefit entitlement
              </Link>
            </li>
            <li>Review your budget with our{" "}
              <Link href="/calculators/take-home-pay/" className="text-violet-600 hover:underline">
                take-home pay calculator
              </Link>
            </li>
            <li>Consider whether{" "}
              <Link href="/guides/shared-parental-leave-guide/" className="text-violet-600 hover:underline">
                Shared Parental Leave
              </Link>{" "}
              might work for your family
            </li>
            <li>Plan your work handover before leave begins</li>
            <li>Agree on keeping-in-touch arrangements with your manager</li>
          </ul>

          <p className="mt-6">
            Planning ahead gives you peace of mind and helps you enjoy your maternity leave
            without unexpected surprises. If you have questions about your specific situation,
            speak to your HR department, contact ACAS on 0300 123 1100, or visit GOV.UK for
            the latest official guidance on maternity leave and pay.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-violet-50 rounded-xl p-6 border border-slate-200 mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Related Articles</h2>
        <p className="text-slate-600 mb-4">Plan every aspect of your maternity leave with these helpful guides:</p>
        <ul className="space-y-2 text-sm">
          <li><Link href="/guides/maternity-leave-rights/" className="text-violet-600 hover:underline">Your Maternity Leave Rights</Link> — everything you&apos;re legally entitled to</li>
          <li><Link href="/guides/when-to-start-maternity-leave/" className="text-violet-600 hover:underline">When to Start Maternity Leave</Link> — choosing the best start date for you</li>
          <li><Link href="/guides/maternity-leave-letter-to-employer/" className="text-violet-600 hover:underline">Maternity Leave Letter to Employer</Link> — templates and notification tips</li>
          <li><Link href="/guides/matb1-form-guide/" className="text-violet-600 hover:underline">MATB1 Form Guide</Link> — what it is, when you get it, and how to use it</li>
          <li><Link href="/guides/maternity-leave-checklist/" className="text-violet-600 hover:underline">Maternity Leave Checklist</Link> — everything you need to do before leave starts</li>
          <li><Link href="/guides/keeping-in-touch-days-explained/" className="text-violet-600 hover:underline">Keeping in Touch Days Explained</Link> — staying connected during leave</li>
        </ul>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UK Maternity Leave Planner 2026/27",
            description: "Free maternity leave date planner. Calculate your earliest start date, qualifying week, and key notification deadlines.",
            url: "https://maternitypaycalculator.co.uk/calculators/maternity-leave-planner/",
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
              { "@type": "ListItem", position: 3, name: "Maternity Leave Planner", item: "https://maternitypaycalculator.co.uk/calculators/maternity-leave-planner/" },
            ],
          }),
        }}
      />
    </div>
  );
}
