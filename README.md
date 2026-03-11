# Maternity Pay Calculator

**maternitypaycalculator.co.uk** — Free UK maternity pay calculators and guides to help you plan your maternity leave finances.

## Features

- **Maternity Pay Calculator** — Week-by-week SMP breakdown with tax estimates
- **Maternity Leave Planner** — Calculate key maternity leave dates
- **Maternity Allowance Calculator** — For self-employed and those not qualifying for SMP
- **Child Benefit Calculator** — With High Income Charge calculations
- **Take-Home Pay Calculator** — After-tax maternity pay estimates
- **Comprehensive Guides** — Articles on SMP, maternity rights, financial planning, and more
- **SEO Optimised** — Structured data, sitemaps, canonical URLs, internal linking

## Tech Stack

- [Next.js 16](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage with main SMP calculator
│   ├── layout.tsx          # Root layout with header/footer
│   ├── about/              # About page
│   ├── calculators/        # Calculator pages
│   │   ├── page.tsx        # All calculators index
│   │   ├── maternity-leave-planner/
│   │   ├── maternity-allowance/
│   │   ├── child-benefit/
│   │   ├── take-home-pay/
│   │   ├── shared-parental-leave/
│   │   ├── enhanced-maternity-pay/
│   │   └── smp-vs-maternity-allowance/
│   ├── guides/             # Guide/article pages
│   │   ├── page.tsx        # All guides index
│   │   └── [slug]/         # Dynamic guide pages
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # robots.txt
├── components/             # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MaternityPayCalculator.tsx
│   ├── CalculatorCards.tsx
│   ├── Breadcrumbs.tsx
│   ├── FAQSection.tsx
│   └── GuideCard.tsx
├── lib/                    # Business logic
│   ├── constants.ts        # Rates, config, navigation
│   ├── calculations.ts     # All calculator functions
│   ├── guides-data.ts      # Guide content and metadata
│   ├── guides-new.ts       # Additional guide content
│   └── guides-additional.ts # More guide content
└── types/
    └── index.ts            # TypeScript type definitions
```

## Rates (2026/27)

- SMP first 6 weeks: 90% of average weekly earnings
- SMP weeks 7-39: £194.32/week (or 90% of AWE if lower)
- Lower Earnings Limit: £129/week
- Total maternity leave: 52 weeks (39 paid + 13 unpaid)
