"use client";

import { useState } from "react";
import { calculateSMP, formatCurrency, type SMPResult } from "@/lib/calculations";
import { SMP_RATES } from "@/lib/constants";
import Link from "next/link";

export default function MaternityPayCalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>("");
  const [isEmployed, setIsEmployed] = useState(true);
  const [weeksEmployed, setWeeksEmployed] = useState<string>("26");
  const [result, setResult] = useState<SMPResult | null>(null);
  const [showFullBreakdown, setShowFullBreakdown] = useState(false);

  const handleCalculate = () => {
    const salary = parseFloat(annualSalary);
    if (isNaN(salary) || salary <= 0) return;

    const weeks = parseInt(weeksEmployed) || 26;
    const smpResult = calculateSMP(salary, isEmployed, weeks);
    setResult(smpResult);
    setShowFullBreakdown(false);
  };

  const handleReset = () => {
    setAnnualSalary("");
    setIsEmployed(true);
    setWeeksEmployed("26");
    setResult(null);
    setShowFullBreakdown(false);
  };

  return (
    <div className="w-full">
      {/* Calculator Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <div className="space-y-6">
          {/* Annual Salary */}
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Annual Salary (before tax)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                £
              </span>
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

          {/* Employment Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Are you currently employed?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setIsEmployed(true)}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                  isEmployed
                    ? "border-violet-600 bg-violet-50 text-violet-700"
                    : "border-slate-200 bg-white text-slate-500 hover:border-violet-300"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setIsEmployed(false)}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                  !isEmployed
                    ? "border-violet-600 bg-violet-50 text-violet-700"
                    : "border-slate-200 bg-white text-slate-500 hover:border-violet-300"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Weeks of employment */}
          {isEmployed && (
            <div>
              <label
                htmlFor="weeks"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Weeks of continuous employment with current employer
              </label>
              <input
                id="weeks"
                type="number"
                value={weeksEmployed}
                onChange={(e) => setWeeksEmployed(e.target.value)}
                placeholder="26"
                min="0"
                className="calc-input w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none bg-slate-50/50"
              />
              <p className="text-xs text-slate-500 mt-1">
                You need at least 26 weeks by the 15th week before your due date
              </p>
            </div>
          )}

          {/* Calculate Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCalculate}
              disabled={!annualSalary || parseFloat(annualSalary) <= 0}
              className="flex-1 bg-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Calculate My Maternity Pay
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="py-3.5 px-5 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600 transition-all font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 animate-fade-in-up">
          {!result.qualifies ? (
            /* Not Eligible */
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 text-lg">
                    You may not qualify for SMP
                  </h3>
                  <p className="text-amber-700 mt-2">{result.reason}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/calculators/maternity-allowance/"
                      className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-800 bg-white px-4 py-2 rounded-lg border border-violet-200 transition-colors"
                    >
                      Try Maternity Allowance Calculator →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Eligible - Show Results */
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    Total Gross Pay
                  </p>
                  <p className="text-2xl font-bold gradient-text mt-1">
                    {formatCurrency(result.totalGross)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">39 weeks</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    Est. Take Home
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {formatCurrency(result.totalNet)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">after tax & NI</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    First 6 Weeks
                  </p>
                  <p className="text-2xl font-bold text-violet-600 mt-1">
                    {formatCurrency(result.higherRateWeekly)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">per week (90%)</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    Weeks 7-39
                  </p>
                  <p className="text-2xl font-bold text-sky-600 mt-1">
                    {formatCurrency(result.lowerRateWeekly)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">per week</p>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Your 52-Week Maternity Leave Overview
                </h3>
                <div className="flex rounded-lg overflow-hidden h-10">
                  <div
                    className="bg-gradient-to-r from-violet-600 to-violet-700 flex items-center justify-center text-white text-xs font-medium"
                    style={{ width: `${(6 / 52) * 100}%` }}
                    title="Weeks 1-6: 90% pay"
                  >
                    90%
                  </div>
                  <div
                    className="bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center text-white text-xs font-medium"
                    style={{ width: `${(33 / 52) * 100}%` }}
                    title={`Weeks 7-39: ${formatCurrency(SMP_RATES.FLAT_RATE_WEEKLY)}/wk`}
                  >
                    £{SMP_RATES.FLAT_RATE_WEEKLY}/wk
                  </div>
                  <div
                    className="bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-medium"
                    style={{ width: `${(13 / 52) * 100}%` }}
                    title="Weeks 40-52: Unpaid"
                  >
                    Unpaid
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>Week 1</span>
                  <span>Week 6</span>
                  <span>Week 39</span>
                  <span>Week 52</span>
                </div>
              </div>

              {/* Weekly Breakdown Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 pb-4 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">
                    Week-by-Week Breakdown
                  </h3>
                  <button
                    onClick={() => setShowFullBreakdown(!showFullBreakdown)}
                    className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    {showFullBreakdown ? "Show Less" : "Show All 52 Weeks"}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-violet-50 text-left">
                        <th className="px-6 py-3 font-semibold text-slate-700">Week</th>
                        <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
                        <th className="px-6 py-3 font-semibold text-slate-700 text-right">
                          Gross
                        </th>
                        <th className="px-6 py-3 font-semibold text-slate-700 text-right">
                          Tax
                        </th>
                        <th className="px-6 py-3 font-semibold text-slate-700 text-right">
                          NI
                        </th>
                        <th className="px-6 py-3 font-semibold text-slate-700 text-right">
                          Net Pay
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showFullBreakdown
                        ? result.weeklyBreakdown
                        : result.weeklyBreakdown.slice(0, 12)
                      ).map((week) => (
                        <tr
                          key={week.week}
                          className={`border-t border-slate-100 ${
                            week.type === "unpaid" ? "bg-slate-50 text-slate-400" : ""
                          }`}
                        >
                          <td className="px-6 py-3 font-medium">{week.week}</td>
                          <td className="px-6 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                week.type === "higher"
                                  ? "bg-violet-100 text-violet-700"
                                  : week.type === "lower"
                                  ? "bg-sky-100 text-sky-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {week.type === "higher"
                                ? "90% Pay"
                                : week.type === "lower"
                                ? "Flat Rate"
                                : "Unpaid"}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right font-medium">
                            {formatCurrency(week.grossPay)}
                          </td>
                          <td className="px-6 py-3 text-right text-red-500">
                            {week.tax > 0 ? `-${formatCurrency(week.tax)}` : "—"}
                          </td>
                          <td className="px-6 py-3 text-right text-red-500">
                            {week.ni > 0 ? `-${formatCurrency(week.ni)}` : "—"}
                          </td>
                          <td className="px-6 py-3 text-right font-semibold text-green-600">
                            {formatCurrency(week.netPay)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!showFullBreakdown && (
                  <div className="p-4 text-center border-t border-slate-100">
                    <button
                      onClick={() => setShowFullBreakdown(true)}
                      className="text-violet-600 hover:text-violet-700 font-medium text-sm"
                    >
                      Show all 52 weeks →
                    </button>
                  </div>
                )}
              </div>

              {/* Tax Summary */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Estimated Tax & NI Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-xs text-red-600 font-medium">
                      Est. Income Tax
                    </p>
                    <p className="text-xl font-bold text-red-700 mt-1">
                      {formatCurrency(result.totalTax)}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-xs text-orange-600 font-medium">
                      Est. National Insurance
                    </p>
                    <p className="text-xl font-bold text-orange-700 mt-1">
                      {formatCurrency(result.totalNI)}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-xs text-green-600 font-medium">
                      Est. Total Take Home
                    </p>
                    <p className="text-xl font-bold text-green-700 mt-1">
                      {formatCurrency(result.totalNet)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  * Tax estimates are simplified and based on 2026/27 rates.
                  Actual deductions may vary. Use our{" "}
                  <Link
                    href="/calculators/take-home-pay/"
                    className="text-violet-600 hover:underline"
                  >
                    Take-Home Pay Calculator
                  </Link>{" "}
                  for a more detailed breakdown.
                </p>
              </div>

              {/* Related Actions */}
              <div className="bg-violet-50 rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">
                  Next Steps
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/calculators/maternity-leave-planner/"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-violet-700">
                        Plan Your Dates
                      </p>
                      <p className="text-xs text-slate-500">
                        Calculate key maternity dates
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/guides/statutory-maternity-pay-explained/"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-violet-700">
                        SMP Guide
                      </p>
                      <p className="text-xs text-slate-500">
                        Learn how maternity pay works
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/calculators/child-benefit/"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-violet-700">
                        Child Benefit
                      </p>
                      <p className="text-xs text-slate-500">
                        Calculate your Child Benefit
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/guides/financial-planning-for-maternity/"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-violet-700">
                        Financial Planning
                      </p>
                      <p className="text-xs text-slate-500">
                        Budget for maternity leave
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
