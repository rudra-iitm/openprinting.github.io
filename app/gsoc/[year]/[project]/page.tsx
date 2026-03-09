import Link from "next/link";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import {
  getGsocProject,
  getGsocProjectsByYear,
  getGsocYears,
} from "@/lib/gsoc";
import { getContributorsBySlug } from "@/data/gsoc-contributors";
import { ArrowLeft, User } from "lucide-react";

export async function generateStaticParams() {
  const years = await getGsocYears();
  const allParams: Array<{ year: string; project: string }> = [];

  for (const year of years) {
    const projects = await getGsocProjectsByYear(year);
    for (const project of projects) {
      allParams.push({ year, project: project.slug });
    }
  }

  return allParams;
}

export default async function GsocProjectPage({
  params,
}: {
  params: Promise<{ year: string; project: string }>;
}) {
  const { year, project } = await params;
  const post = await getGsocProject(year, decodeURIComponent(project));
  const yearProjects = await getGsocProjectsByYear(year);
  const currentSlug = decodeURIComponent(project);
  const contributors = getContributorsBySlug(Number(year), currentSlug);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="hero-glow-blue opacity-20" />
        <div className="grid-pattern absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link
            href={`/gsoc/${year}`}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to GSoC {year}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main content */}
          <div className="min-w-0 space-y-10">
            {/* Contributor & mentor info */}
            {contributors.length > 0 && (
              <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                {/* Mentors (shown once) */}
                {(() => {
                  const mentors = [
                    ...new Set(contributors.flatMap((c) => c.mentors)),
                  ];
                  if (mentors.length === 0) return null;
                  return (
                    <div className="mb-4">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                        {mentors.length === 1 ? "Mentor" : "Mentors"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mentors.map((mentor) => (
                          <span
                            key={mentor}
                            className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-500/10 pl-1 pr-2.5 py-1 text-xs font-medium text-purple-300"
                          >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                              <User className="w-3 h-3" />
                            </span>
                            {mentor}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Contributors */}
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                  {contributors.length === 1 ? "Contributor" : "Contributors"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {contributors.map((contributor, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 pl-1 pr-2.5 py-1 text-xs font-medium text-blue-300"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20">
                        <User className="w-3 h-3 text-blue-400" />
                      </span>
                      {contributor.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Markdown content */}
            <section>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-a:text-blue-400 prose-strong:text-white prose-li:text-neutral-400 prose-code:text-neutral-300">
                  <MarkdownRenderer content={post.content} />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <TableOfContents content={post.content} />

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <h2 className="mb-3 text-sm font-semibold text-white uppercase tracking-wide">
                  More in GSoC {year}
                </h2>
                <ul className="space-y-1 max-h-[50vh] overflow-y-auto">
                  {yearProjects.map((item) => {
                    const href = `/gsoc/${year}/${encodeURIComponent(item.slug)}`;
                    const isCurrent = item.slug === currentSlug;

                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          className={
                            isCurrent
                              ? "block rounded-lg bg-blue-500/10 border border-blue-400/20 px-3 py-2 text-xs font-medium text-blue-300"
                              : "block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-white/[0.04] hover:text-white transition-colors"
                          }
                        >
                          <span className="line-clamp-2">{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
