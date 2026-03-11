import Link from "next/link";
import { NAV_LINKS, CALCULATORS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-sm text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Free UK maternity pay calculators and guides to help you
              plan your maternity leave finances with confidence.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Calculators</h3>
            <ul className="space-y-2.5">
              {CALCULATORS.map((calc) => (
                <li key={calc.href}>
                  <Link
                    href={calc.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Popular Guides</h3>
            <ul className="space-y-2.5">
              <li><Link href="/guides/statutory-maternity-pay-explained/" className="text-sm text-slate-400 hover:text-white transition-colors">SMP Explained</Link></li>
              <li><Link href="/guides/maternity-allowance-guide/" className="text-sm text-slate-400 hover:text-white transition-colors">Maternity Allowance Guide</Link></li>
              <li><Link href="/guides/maternity-leave-rights/" className="text-sm text-slate-400 hover:text-white transition-colors">Your Maternity Rights</Link></li>
              <li><Link href="/guides/maternity-pay-self-employed/" className="text-sm text-slate-400 hover:text-white transition-colors">Maternity Pay Self-Employed</Link></li>
              <li><Link href="/guides/matb1-form-guide/" className="text-sm text-slate-400 hover:text-white transition-colors">MATB1 Form Guide</Link></li>
              <li><Link href="/guides/returning-to-work-after-maternity/" className="text-sm text-slate-400 hover:text-white transition-colors">Returning to Work</Link></li>
              <li><Link href="/guides/financial-planning-for-maternity/" className="text-sm text-slate-400 hover:text-white transition-colors">Financial Planning</Link></li>
              <li><Link href="/guides/" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">View all guides →</Link></li>
            </ul>
          </div>

          {/* More Guides */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">More Guides</h3>
            <ul className="space-y-2.5">
              <li><Link href="/guides/pregnancy-discrimination-at-work/" className="text-sm text-slate-400 hover:text-white transition-colors">Pregnancy Discrimination</Link></li>
              <li><Link href="/guides/neonatal-care-leave-and-pay/" className="text-sm text-slate-400 hover:text-white transition-colors">Neonatal Care Leave</Link></li>
              <li><Link href="/guides/adoption-leave-and-pay-uk/" className="text-sm text-slate-400 hover:text-white transition-colors">Adoption Leave &amp; Pay</Link></li>
              <li><Link href="/guides/maternity-pay-agency-zero-hours-workers/" className="text-sm text-slate-400 hover:text-white transition-colors">Agency &amp; Zero-Hours Workers</Link></li>
              <li><Link href="/guides/resigning-during-maternity-leave/" className="text-sm text-slate-400 hover:text-white transition-colors">Resigning During Maternity</Link></li>
              <li><Link href="/guides/how-much-does-a-baby-cost-uk/" className="text-sm text-slate-400 hover:text-white transition-colors">How Much Does a Baby Cost?</Link></li>
              <li><Link href="/guides/tax-free-childcare-guide/" className="text-sm text-slate-400 hover:text-white transition-colors">Tax-Free Childcare</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {SITE_CONFIG.domain}
            </p>
            <p className="text-xs text-slate-500 max-w-lg text-center sm:text-right">
              This calculator provides estimates based on current UK statutory
              rates. Always check with your employer or HMRC for your exact
              entitlement. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
