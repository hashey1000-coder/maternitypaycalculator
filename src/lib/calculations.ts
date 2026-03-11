import { SMP_RATES, TAX_RATES_2025_26, CHILD_BENEFIT_RATES } from "./constants";

export interface SMPWeek {
  week: number;
  grossPay: number;
  tax: number;
  ni: number;
  netPay: number;
  type: "higher" | "lower" | "unpaid";
}

export interface SMPResult {
  qualifies: boolean;
  reason?: string;
  weeklyBreakdown: SMPWeek[];
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalNI: number;
  higherRateWeekly: number;
  lowerRateWeekly: number;
  averageWeeklyEarnings: number;
}

export function calculateSMP(
  annualSalary: number,
  isEmployed: boolean = true,
  weeksContinuousEmployment: number = 26
): SMPResult {
  const weeklyEarnings = annualSalary / 52;

  // Check eligibility
  if (!isEmployed) {
    return {
      qualifies: false,
      reason:
        "You must be employed to qualify for SMP. You may be eligible for Maternity Allowance instead.",
      weeklyBreakdown: [],
      totalGross: 0,
      totalNet: 0,
      totalTax: 0,
      totalNI: 0,
      higherRateWeekly: 0,
      lowerRateWeekly: 0,
      averageWeeklyEarnings: weeklyEarnings,
    };
  }

  if (weeksContinuousEmployment < 26) {
    return {
      qualifies: false,
      reason:
        "You need at least 26 weeks of continuous employment with your employer by the 15th week before your due date.",
      weeklyBreakdown: [],
      totalGross: 0,
      totalNet: 0,
      totalTax: 0,
      totalNI: 0,
      higherRateWeekly: 0,
      lowerRateWeekly: 0,
      averageWeeklyEarnings: weeklyEarnings,
    };
  }

  if (weeklyEarnings < SMP_RATES.LOWER_EARNINGS_LIMIT) {
    return {
      qualifies: false,
      reason: `Your average weekly earnings (£${weeklyEarnings.toFixed(2)}) are below the Lower Earnings Limit of £${SMP_RATES.LOWER_EARNINGS_LIMIT}. You may be eligible for Maternity Allowance.`,
      weeklyBreakdown: [],
      totalGross: 0,
      totalNet: 0,
      totalTax: 0,
      totalNI: 0,
      higherRateWeekly: 0,
      lowerRateWeekly: 0,
      averageWeeklyEarnings: weeklyEarnings,
    };
  }

  // Calculate higher rate (90% of AWE)
  const higherRateWeekly = weeklyEarnings * SMP_RATES.FIRST_6_WEEKS_RATE;

  // Calculate lower rate (lesser of 90% AWE or flat rate)
  const lowerRateWeekly = Math.min(
    weeklyEarnings * SMP_RATES.FIRST_6_WEEKS_RATE,
    SMP_RATES.FLAT_RATE_WEEKLY
  );

  const weeklyBreakdown: SMPWeek[] = [];
  let totalGross = 0;

  // Build 52-week breakdown
  for (let week = 1; week <= SMP_RATES.TOTAL_LEAVE_WEEKS; week++) {
    let grossPay = 0;
    let type: "higher" | "lower" | "unpaid" = "unpaid";

    if (week <= SMP_RATES.HIGHER_RATE_WEEKS) {
      grossPay = higherRateWeekly;
      type = "higher";
    } else if (week <= SMP_RATES.TOTAL_WEEKS) {
      grossPay = lowerRateWeekly;
      type = "lower";
    }

    // Estimate tax and NI (simplified)
    const annualizedPay = grossPay * 52;
    const { tax, ni } = calculateWeeklyDeductions(grossPay, annualizedPay);

    const netPay = Math.max(0, grossPay - tax - ni);
    totalGross += grossPay;

    weeklyBreakdown.push({
      week,
      grossPay: Math.round(grossPay * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      ni: Math.round(ni * 100) / 100,
      netPay: Math.round(netPay * 100) / 100,
      type,
    });
  }

  const totalTax = weeklyBreakdown.reduce((sum, w) => sum + w.tax, 0);
  const totalNI = weeklyBreakdown.reduce((sum, w) => sum + w.ni, 0);
  const totalNet = totalGross - totalTax - totalNI;

  return {
    qualifies: true,
    weeklyBreakdown,
    totalGross: Math.round(totalGross * 100) / 100,
    totalNet: Math.round(totalNet * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    totalNI: Math.round(totalNI * 100) / 100,
    higherRateWeekly: Math.round(higherRateWeekly * 100) / 100,
    lowerRateWeekly: Math.round(lowerRateWeekly * 100) / 100,
    averageWeeklyEarnings: Math.round(weeklyEarnings * 100) / 100,
  };
}

function calculateWeeklyDeductions(
  weeklyGross: number,
  annualizedPay: number
): { tax: number; ni: number } {
  // Weekly tax calculation
  let weeklyTax = 0;
  const weeklyPersonalAllowance =
    TAX_RATES_2025_26.PERSONAL_ALLOWANCE / 52;
  const weeklyBasicUpper = TAX_RATES_2025_26.BASIC_RATE_UPPER / 52;

  if (weeklyGross > weeklyPersonalAllowance) {
    const taxableIncome = weeklyGross - weeklyPersonalAllowance;
    if (annualizedPay <= TAX_RATES_2025_26.BASIC_RATE_UPPER) {
      weeklyTax = taxableIncome * TAX_RATES_2025_26.BASIC_RATE;
    } else {
      const basicPortion = weeklyBasicUpper - weeklyPersonalAllowance;
      weeklyTax = basicPortion * TAX_RATES_2025_26.BASIC_RATE;
      weeklyTax +=
        (taxableIncome - basicPortion) * TAX_RATES_2025_26.HIGHER_RATE;
    }
  }

  // Weekly NI calculation
  let weeklyNI = 0;
  const weeklyNIThreshold = TAX_RATES_2025_26.NI_THRESHOLD_YEARLY / 52;
  const weeklyNIUpper = TAX_RATES_2025_26.NI_UPPER_YEARLY / 52;

  if (weeklyGross > weeklyNIThreshold) {
    const niableIncome = Math.min(
      weeklyGross - weeklyNIThreshold,
      weeklyNIUpper - weeklyNIThreshold
    );
    weeklyNI = niableIncome * TAX_RATES_2025_26.NI_RATE;

    if (weeklyGross > weeklyNIUpper) {
      weeklyNI +=
        (weeklyGross - weeklyNIUpper) * TAX_RATES_2025_26.NI_UPPER_RATE;
    }
  }

  return {
    tax: Math.max(0, weeklyTax),
    ni: Math.max(0, weeklyNI),
  };
}

export function calculateMaternityAllowance(
  weeklyEarnings: number
): { weeklyAmount: number; totalAmount: number; qualifies: boolean } {
  const rate = Math.min(weeklyEarnings * 0.9, SMP_RATES.FLAT_RATE_WEEKLY);
  return {
    weeklyAmount: Math.round(rate * 100) / 100,
    totalAmount: Math.round(rate * 39 * 100) / 100,
    qualifies: weeklyEarnings >= 30,
  };
}

export function calculateChildBenefit(
  numberOfChildren: number,
  annualIncome: number
): {
  weeklyAmount: number;
  annualAmount: number;
  clawbackPercent: number;
  netAnnualAmount: number;
} {
  if (numberOfChildren <= 0) {
    return { weeklyAmount: 0, annualAmount: 0, clawbackPercent: 0, netAnnualAmount: 0 };
  }

  const weekly =
    CHILD_BENEFIT_RATES.FIRST_CHILD_WEEKLY + Math.max(0, numberOfChildren - 1) * CHILD_BENEFIT_RATES.ADDITIONAL_CHILD_WEEKLY;

  const annual = weekly * 52;

  let clawbackPercent = 0;
  if (annualIncome > CHILD_BENEFIT_RATES.HIGH_INCOME_CAP) {
    clawbackPercent = 100;
  } else if (annualIncome > CHILD_BENEFIT_RATES.HIGH_INCOME_THRESHOLD) {
    clawbackPercent = Math.round(
      ((annualIncome - CHILD_BENEFIT_RATES.HIGH_INCOME_THRESHOLD) / (CHILD_BENEFIT_RATES.HIGH_INCOME_CAP - CHILD_BENEFIT_RATES.HIGH_INCOME_THRESHOLD)) * 100
    );
  }

  const netAnnual = annual * (1 - clawbackPercent / 100);

  return {
    weeklyAmount: Math.round(weekly * 100) / 100,
    annualAmount: Math.round(annual * 100) / 100,
    clawbackPercent,
    netAnnualAmount: Math.round(netAnnual * 100) / 100,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculateMaternityDates(dueDate: Date): {
  earliestStart: Date;
  latestStart: Date;
  notifyByDate: Date;
  qualifyingWeek: Date;
  endDate: Date;
} {
  const earliest = new Date(dueDate);
  earliest.setDate(earliest.getDate() - 77); // 11 weeks before

  const latest = new Date(dueDate);

  const notifyBy = new Date(dueDate);
  notifyBy.setDate(notifyBy.getDate() - 105); // 15 weeks before

  const qualifying = new Date(dueDate);
  qualifying.setDate(qualifying.getDate() - 105); // 15th week before due date

  const endDate = new Date(dueDate);
  endDate.setDate(endDate.getDate() + 364); // 52 weeks from due date

  return {
    earliestStart: earliest,
    latestStart: latest,
    notifyByDate: notifyBy,
    qualifyingWeek: qualifying,
    endDate,
  };
}

// ---- Shared Parental Leave Calculator ----

export interface SPLResult {
  motherWeeks: number;
  partnerWeeks: number;
  motherSMPWeeks: number;
  partnerShPPWeeks: number;
  motherTotalGross: number;
  partnerTotalGross: number;
  combinedTotalGross: number;
  motherHigherRateWeeks: number;
  motherHigherRateWeekly: number;
  flatRateWeekly: number;
  totalPaidWeeks: number;
}

export function calculateSharedParentalLeave(
  annualSalary: number,
  motherLeaveWeeks: number,
  partnerLeaveWeeks: number
): SPLResult {
  const weeklyEarnings = annualSalary / 52;
  const higherRateWeekly = weeklyEarnings * SMP_RATES.FIRST_6_WEEKS_RATE;
  const flatRate = SMP_RATES.FLAT_RATE_WEEKLY;

  // Mother must take minimum 2 weeks compulsory leave
  const motherWeeks = Math.max(2, Math.min(motherLeaveWeeks, 50));
  // Partner can take remainder up to 50 weeks shared pool
  const partnerWeeks = Math.min(partnerLeaveWeeks, 50 - motherWeeks);

  // Mother always gets first 6 weeks at 90% rate, then flat rate
  const motherHigherWeeks = Math.min(motherWeeks, SMP_RATES.HIGHER_RATE_WEEKS);
  const motherFlatWeeks = Math.max(
    0,
    Math.min(motherWeeks - SMP_RATES.HIGHER_RATE_WEEKS, SMP_RATES.TOTAL_WEEKS - SMP_RATES.HIGHER_RATE_WEEKS)
  );
  const motherSMPWeeks = motherHigherWeeks + motherFlatWeeks;

  // Remaining paid weeks go to partner as ShPP at flat rate
  const totalPaidWeeksAvailable = SMP_RATES.TOTAL_WEEKS;
  const remainingPaidWeeks = Math.max(0, totalPaidWeeksAvailable - motherSMPWeeks);
  const partnerShPPWeeks = Math.min(partnerWeeks, remainingPaidWeeks);

  const motherHigherGross = motherHigherWeeks * higherRateWeekly;
  const motherFlatGross = motherFlatWeeks * flatRate;
  const motherTotalGross = motherHigherGross + motherFlatGross;

  const partnerTotalGross = partnerShPPWeeks * flatRate;
  const combinedTotalGross = motherTotalGross + partnerTotalGross;

  return {
    motherWeeks,
    partnerWeeks,
    motherSMPWeeks,
    partnerShPPWeeks,
    motherTotalGross: Math.round(motherTotalGross * 100) / 100,
    partnerTotalGross: Math.round(partnerTotalGross * 100) / 100,
    combinedTotalGross: Math.round(combinedTotalGross * 100) / 100,
    motherHigherRateWeeks: motherHigherWeeks,
    motherHigherRateWeekly: Math.round(higherRateWeekly * 100) / 100,
    flatRateWeekly: flatRate,
    totalPaidWeeks: motherSMPWeeks + partnerShPPWeeks,
  };
}

// ---- Enhanced Maternity Pay Calculator ----

export interface EnhancedPayResult {
  enhancedWeeks: number;
  enhancedWeeklyAmount: number;
  enhancedTotalGross: number;
  smpOnlyTotalGross: number;
  enhancedDifference: number;
  weeklyBreakdown: {
    week: number;
    grossPay: number;
    type: "enhanced" | "higher-smp" | "lower-smp" | "unpaid";
    label: string;
  }[];
  totalGross: number;
}

export function calculateEnhancedMaternityPay(
  annualSalary: number,
  enhancedWeeks: number,
  enhancedPercent: number
): EnhancedPayResult {
  const weeklyEarnings = annualSalary / 52;
  const higherRateWeekly = weeklyEarnings * SMP_RATES.FIRST_6_WEEKS_RATE;
  const flatRate = SMP_RATES.FLAT_RATE_WEEKLY;
  const enhancedWeeklyAmount = weeklyEarnings * (enhancedPercent / 100);

  const breakdown: EnhancedPayResult["weeklyBreakdown"] = [];
  let totalGross = 0;
  let smpOnlyTotal = 0;

  for (let week = 1; week <= SMP_RATES.TOTAL_LEAVE_WEEKS; week++) {
    let grossPay = 0;
    let type: "enhanced" | "higher-smp" | "lower-smp" | "unpaid" = "unpaid";
    let label = "Unpaid leave";
    let smpPay = 0;

    if (week <= enhancedWeeks) {
      grossPay = enhancedWeeklyAmount;
      type = "enhanced";
      label = `Enhanced pay (${enhancedPercent}%)`;
    } else if (week <= SMP_RATES.HIGHER_RATE_WEEKS) {
      grossPay = higherRateWeekly;
      type = "higher-smp";
      label = "SMP at 90% of AWE";
    } else if (week <= SMP_RATES.TOTAL_WEEKS) {
      grossPay = flatRate;
      type = "lower-smp";
      label = "SMP flat rate";
    }

    // Calculate SMP-only for comparison
    if (week <= SMP_RATES.HIGHER_RATE_WEEKS) {
      smpPay = higherRateWeekly;
    } else if (week <= SMP_RATES.TOTAL_WEEKS) {
      smpPay = flatRate;
    }

    totalGross += grossPay;
    smpOnlyTotal += smpPay;

    breakdown.push({
      week,
      grossPay: Math.round(grossPay * 100) / 100,
      type,
      label,
    });
  }

  return {
    enhancedWeeks,
    enhancedWeeklyAmount: Math.round(enhancedWeeklyAmount * 100) / 100,
    enhancedTotalGross: Math.round(totalGross * 100) / 100,
    smpOnlyTotalGross: Math.round(smpOnlyTotal * 100) / 100,
    enhancedDifference: Math.round((totalGross - smpOnlyTotal) * 100) / 100,
    weeklyBreakdown: breakdown,
    totalGross: Math.round(totalGross * 100) / 100,
  };
}

// ---- SMP vs Maternity Allowance Comparison ----

export interface SMPvsMAResult {
  smpQualifies: boolean;
  maQualifies: boolean;
  smpWeeklyHigher: number;
  smpWeeklyFlat: number;
  smpTotalGross: number;
  smpTotalNet: number;
  maWeekly: number;
  maTotalGross: number;
  maTotalNet: number; // Same as gross since MA is tax-free
  recommendation: "smp" | "ma" | "ma-only" | "neither";
  netDifference: number;
  explanation: string;
}

export function calculateSMPvsMA(
  annualSalary: number,
  weeklyEarningsForMA: number,
  weeksEmployed: number,
  weeksWorkedForMA: number
): SMPvsMAResult {
  const weeklyEarnings = annualSalary / 52;
  const higherRate = weeklyEarnings * SMP_RATES.FIRST_6_WEEKS_RATE;
  const flatRate = SMP_RATES.FLAT_RATE_WEEKLY;
  const maWeekly = Math.min(weeklyEarningsForMA * 0.9, SMP_RATES.FLAT_RATE_WEEKLY);

  // SMP eligibility: employed 26+ weeks by qualifying week + earn >= LEL
  const smpQualifies =
    weeksEmployed >= 26 && weeklyEarnings >= SMP_RATES.LOWER_EARNINGS_LIMIT;

  // MA eligibility: worked 26 of 66 weeks before due date + earn >= £30/week in 13 of those weeks
  const maQualifies = weeksWorkedForMA >= 26 && weeklyEarningsForMA >= 30;

  // SMP total gross
  const smpHigherGross = SMP_RATES.HIGHER_RATE_WEEKS * higherRate;
  const smpFlatGross =
    (SMP_RATES.TOTAL_WEEKS - SMP_RATES.HIGHER_RATE_WEEKS) * flatRate;
  const smpTotalGross = smpHigherGross + smpFlatGross;

  // SMP approximate net (basic rate taxpayer estimate)
  const smpAnnualTax =
    smpTotalGross > TAX_RATES_2025_26.PERSONAL_ALLOWANCE
      ? (smpTotalGross - TAX_RATES_2025_26.PERSONAL_ALLOWANCE) * TAX_RATES_2025_26.BASIC_RATE
      : 0;
  const smpNI =
    smpTotalGross > 12570 ? (smpTotalGross - 12570) * 0.08 : 0;
  const smpTotalNet = smpTotalGross - smpAnnualTax - smpNI;

  // MA total gross (39 weeks)
  const maTotalGross = maWeekly * 39;
  // MA is not taxable
  const maTotalNet = maTotalGross;

  let recommendation: SMPvsMAResult["recommendation"];
  let explanation: string;

  if (smpQualifies && maQualifies) {
    if (smpTotalNet > maTotalNet) {
      recommendation = "smp";
      explanation = `You qualify for both SMP and Maternity Allowance. SMP gives you approximately ${formatCurrency(smpTotalNet - maTotalNet)} more over the pay period because it includes 6 weeks at 90% of your earnings. SMP is the better option.`;
    } else {
      recommendation = "ma";
      explanation = `You qualify for both. Maternity Allowance may be slightly better in your case because MA is tax-free, giving you approximately ${formatCurrency(maTotalNet - smpTotalNet)} more net income. However, SMP is usually claimed first if you qualify, as your employer pays it.`;
    }
  } else if (smpQualifies) {
    recommendation = "smp";
    explanation =
      "You qualify for Statutory Maternity Pay through your employer. SMP is paid for 39 weeks: 6 weeks at 90% of your average weekly earnings, then 33 weeks at the flat rate.";
  } else if (maQualifies) {
    recommendation = "ma-only";
    explanation =
      "You don't qualify for SMP but you do qualify for Maternity Allowance. MA is paid for 39 weeks at 90% of your average weekly earnings (up to the maximum rate). MA is claimed from the DWP and is tax-free.";
  } else {
    recommendation = "neither";
    explanation =
      "Based on the details you've entered, you may not qualify for SMP or Maternity Allowance. You should contact your local Jobcentre Plus to discuss other support options, including Universal Credit.";
  }

  return {
    smpQualifies,
    maQualifies,
    smpWeeklyHigher: Math.round(higherRate * 100) / 100,
    smpWeeklyFlat: flatRate,
    smpTotalGross: Math.round(smpTotalGross * 100) / 100,
    smpTotalNet: Math.round(smpTotalNet * 100) / 100,
    maWeekly: Math.round(maWeekly * 100) / 100,
    maTotalGross: Math.round(maTotalGross * 100) / 100,
    maTotalNet: Math.round(maTotalNet * 100) / 100,
    recommendation,
    netDifference: Math.round(
      Math.abs(smpTotalNet - maTotalNet) * 100
    ) / 100,
    explanation,
  };
}
