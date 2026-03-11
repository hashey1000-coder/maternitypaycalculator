import Link from "next/link";
import { SMP_RATES } from "@/lib/constants";

interface FAQSectionProps {
  faqs?: { question: string; answer: string }[];
}

export default function FAQSection({ faqs: customFaqs }: FAQSectionProps = {}) {
  const defaultFaqs = [
    {
      question: "How much is Statutory Maternity Pay in 2026/27?",
      answer: `SMP is paid for 39 weeks: the first 6 weeks at 90% of your average weekly earnings, then 33 weeks at £${SMP_RATES.FLAT_RATE_WEEKLY} per week (or 90% of AWE if that's lower). The remaining 13 weeks of your 52-week leave entitlement are unpaid.`,
    },
    {
      question: "Who qualifies for Statutory Maternity Pay?",
      answer: `You qualify for SMP if you've been employed continuously for at least 26 weeks by the 15th week before your due date, and you earn at least £${SMP_RATES.LOWER_EARNINGS_LIMIT} per week on average. You must also provide your employer with medical evidence of pregnancy and correct notice.`,
    },
    {
      question: "When can I start my maternity leave?",
      answer:
        "You can start maternity leave up to 11 weeks before your due date. The latest you can start is the day after your baby is born. If you have a pregnancy-related illness in the 4 weeks before your due date, your leave starts automatically.",
    },
    {
      question: "Is maternity pay taxable?",
      answer:
        "Yes, Statutory Maternity Pay is treated as earnings and is subject to Income Tax and National Insurance. However, Maternity Allowance (paid by the DWP) is not taxable.",
    },
    {
      question: "What if I don't qualify for SMP?",
      answer:
        "If you don't qualify for SMP, you may be eligible for Maternity Allowance from the Department for Work and Pensions. This is available to self-employed workers and those who've recently changed jobs.",
    },
    {
      question: "Can I work during maternity leave?",
      answer:
        "Yes, you can work up to 10 'Keeping in Touch' (KIT) days during your maternity leave without affecting your SMP or ending your leave. These are voluntary for both you and your employer.",
    },
  ];

  const faqs = customFaqs || defaultFaqs;

  return (
    <section className="mt-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white rounded-xl border border-slate-200 group"
          >
            <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-800 hover:text-violet-700 transition-colors">
              {faq.question}
              <svg
                className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/guides/statutory-maternity-pay-explained/"
          className="text-violet-600 hover:text-violet-700 font-medium text-sm"
        >
          Read our complete SMP guide for more details →
        </Link>
      </div>
    </section>
  );
}
