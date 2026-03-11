import Link from "next/link";
import { Guide } from "@/types";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="card-hover bg-white rounded-xl border border-slate-200 p-6 flex flex-col group"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700">
          {guide.category}
        </span>
        <span className="text-xs text-slate-400">{guide.readTime}</span>
      </div>
      <h3 className="font-semibold text-slate-800 group-hover:text-violet-700 transition-colors mb-2 text-lg leading-snug">
        {guide.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">
        {guide.description}
      </p>
      <span className="inline-flex items-center text-sm text-violet-600 font-medium mt-4 group-hover:gap-2 transition-all">
        Read guide
        <svg
          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </Link>
  );
}
