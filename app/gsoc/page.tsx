import Link from "next/link";
import { getGsocPostsByYear, getGsocYearSummaries } from "@/lib/gsoc";
import { getContributorsByYear } from "@/data/gsoc-contributors";
import { GsocRelatedPosts } from "@/components/gsoc-related-posts";
import { ArrowRight, Users, FolderOpen } from "lucide-react";

export default async function GsocIndexPage() {
  const years = await getGsocYearSummaries();
  const gsocPostsByYear = await getGsocPostsByYear();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="hero-glow-blue opacity-40" />
        <div className="grid-pattern absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">
            Open Source Contributions
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-gradient">Google Summer</span>{" "}
            <span className="text-gradient-blue">of Code</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            OpenPrinting participates in GSoC under The Linux Foundation,
            mentoring contributors on printing infrastructure, desktop
            integration, and open-source development.
          </p>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Year cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">
              Browse by Year
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              All Editions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {years.map((item) => {
              const contributors = getContributorsByYear(Number(item.year));
              return (
                <Link
                  key={item.year}
                  href={`/gsoc/${item.year}`}
                  className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] card-glow"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {item.year}
                    </h3>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-neutral-400">
                      GSoC
                    </span>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <FolderOpen className="w-3.5 h-3.5 text-neutral-500" />
                      <span>
                        {item.projectCount} project{" "}
                        {item.projectCount === 1 ? "idea" : "ideas"}
                      </span>
                    </div>
                    {contributors.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Users className="w-3.5 h-3.5 text-neutral-500" />
                        <span>
                          {contributors.length} contributor
                          {contributors.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View projects
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Related posts */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <GsocRelatedPosts years={years} postsByYear={gsocPostsByYear} />
        </div>
      </section>
    </main>
  );
}
