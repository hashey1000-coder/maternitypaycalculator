# Maternity Pay Calculator - Copilot Instructions

## Project Overview
This is a Next.js 16 website (maternitypaycalculator.co.uk) built with TypeScript and Tailwind CSS. It provides UK maternity pay calculators and informational guides.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans & Geist Mono

## Project Structure
- `src/app/` — App Router pages and layouts
- `src/components/` — Reusable React components
- `src/lib/` — Business logic, calculations, constants, and guide data
- `src/types/` — TypeScript type definitions

## Key Files
- `src/lib/constants.ts` — SMP rates, tax rates, site config
- `src/lib/calculations.ts` — All calculator logic (SMP, MA, child benefit, tax)
- `src/lib/guides-data.ts` — Guide/article content and metadata

## Conventions
- Use UK English throughout content
- All monetary values use GBP (£) formatting
- Tax year references should be 2025/26
- SMP rates: £187.18/week flat rate, £125 lower earnings limit
- Components use Tailwind utility classes with purple/pink gradient theme
- SEO: Every page has proper metadata, canonical URLs, and structured data

## Calculator Pages
- `/` — Main SMP calculator (homepage)
- `/calculators/maternity-leave-planner` — Date planner
- `/calculators/maternity-allowance` — MA calculator
- `/calculators/child-benefit` — Child benefit calculator
- `/calculators/take-home-pay` — After-tax calculator

## Guide Pages
- Dynamic routes at `/guides/[slug]`
- Content stored in `src/lib/guides-data.ts`
- Each guide has related guides and internal links to calculators
