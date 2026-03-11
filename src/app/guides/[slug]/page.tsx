import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideCard from "@/components/GuideCard";
import { guides, getGuideBySlug, getRelatedGuides } from "@/lib/guides-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const keywords = [
    guide.title.toLowerCase(),
    guide.category.toLowerCase(),
    "maternity pay",
    "maternity leave",
    "UK",
    "2026/27",
  ];

  return {
    title: guide.title,
    description: guide.description,
    keywords,
    alternates: {
      canonical: `https://maternitypaycalculator.co.uk/guides/${guide.slug}/`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://maternitypaycalculator.co.uk/guides/${guide.slug}/`,
      siteName: "Maternity Pay Calculator",
      type: "article",
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      locale: "en_GB",
      section: guide.category,
    },
    twitter: {
      card: "summary",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuides = getRelatedGuides(slug);

  // Simple markdown-to-HTML conversion for guide content
  const contentHtml = guide.content
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-slate-800 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-3">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-violet-600 hover:underline font-medium">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 ml-4"><span class="text-violet-400 mt-1">•</span><span>$1</span></li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-2 ml-4"><span class="text-violet-600 font-semibold">$1.</span><span>$2</span></li>')
    .replace(/^- \[[ x]\] (.+)$/gm, '<li class="flex items-start gap-2 ml-4"><span class="text-violet-400">☐</span><span>$1</span></li>')
    .replace(/\n\n/g, '</p><p class="text-slate-600 leading-relaxed mb-3">')
    .replace(/\|(.+)\|/g, ""); // Remove table markdown (simplified)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      {/* Article header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
            {guide.category}
          </span>
          <span className="text-sm text-slate-400">{guide.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          {guide.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {guide.description}
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
          <span>
            Published:{" "}
            {new Date(guide.publishedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>
            Updated:{" "}
            {new Date(guide.updatedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* Quick CTA */}
      <div className="bg-violet-50 rounded-xl p-5 mb-8 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
        <svg className="w-8 h-8 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm3.75-7.5H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V8.25A2.25 2.25 0 0018.75 6zM5.25 7.5h13.5v3H5.25v-3z" /></svg>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-medium text-slate-800">
            Want to see your numbers?
          </p>
          <p className="text-sm text-slate-500">
            Use our free calculator to get your personalised maternity pay breakdown
          </p>
        </div>
        <Link
          href="/"
          className="bg-violet-700 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-violet-800 transition-all text-sm whitespace-nowrap"
        >
          Calculate now
        </Link>
      </div>

      {/* Article content */}
      <div
        className="prose prose max-w-none text-slate-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Related calculators */}
      <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm3.75-7.5H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V8.25A2.25 2.25 0 0018.75 6zM5.25 7.5h13.5v3H5.25v-3z" /></svg>
            <div>
              <p className="font-medium text-slate-800 group-hover:text-violet-700 text-sm">
                Maternity Pay Calculator
              </p>
              <p className="text-xs text-slate-500">Calculate your SMP</p>
            </div>
          </Link>
          <Link
            href="/calculators/maternity-leave-planner/"
            className="flex items-center gap-3 p-4 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
            <div>
              <p className="font-medium text-slate-800 group-hover:text-violet-700 text-sm">
                Maternity Leave Planner
              </p>
              <p className="text-xs text-slate-500">Plan your key dates</p>
            </div>
          </Link>
          <Link
            href="/calculators/maternity-allowance/"
            className="flex items-center gap-3 p-4 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
            <div>
              <p className="font-medium text-slate-800 group-hover:text-violet-700 text-sm">
                Maternity Allowance
              </p>
              <p className="text-xs text-slate-500">Alternative to SMP</p>
            </div>
          </Link>
          <Link
            href="/calculators/child-benefit/"
            className="flex items-center gap-3 p-4 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            <div>
              <p className="font-medium text-slate-800 group-hover:text-violet-700 text-sm">
                Child Benefit Calculator
              </p>
              <p className="text-xs text-slate-500">Estimate your payments</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGuides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      )}

      {/* Schema.org Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.description,
            datePublished: guide.publishedDate,
            dateModified: guide.updatedDate,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://maternitypaycalculator.co.uk/guides/${guide.slug}`,
            },
            author: {
              "@type": "Organization",
              name: "Maternity Pay Calculator",
              url: "https://maternitypaycalculator.co.uk/",
            },
            publisher: {
              "@type": "Organization",
              name: "Maternity Pay Calculator",
              url: "https://maternitypaycalculator.co.uk/",
            },
            articleSection: guide.category,
            wordCount: guide.content.split(/\s+/).length,
            inLanguage: "en-GB",
          }),
        }}
      />
      {/* BreadcrumbList structured data */}
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
                name: "Home",
                item: "https://maternitypaycalculator.co.uk/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Guides",
                item: "https://maternitypaycalculator.co.uk/guides/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: guide.title,
                item: `https://maternitypaycalculator.co.uk/guides/${guide.slug}`,
              },
            ],
          }),
        }}
      />
    </article>
  );
}
