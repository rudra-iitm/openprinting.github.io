"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  User,
  ExternalLink,
  Code2,
  BookOpen,
  Newspaper,
  Quote,
} from "lucide-react";
import { GsocOrgBanner } from "@/components/gsoc-org-banner";
import type { GsocContributor } from "@/data/gsoc-contributors";
import type { GsocWorkSummary } from "@/data/gsoc-work-summaries";

type ProjectSummary = {
  year: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
};

type RelatedPost = {
  title: string;
  url: string;
  snippet: string;
  tags: string[];
};

export function GsocYearClient({
  year,
  yearTitle,
  projects,
  contributors,
  orgUrl,
  relatedPosts,
  workSummaries,
}: {
  year: string;
  yearTitle: string;
  yearContent: string;
  projects: ProjectSummary[];
  contributors: GsocContributor[];
  orgUrl: string;
  relatedPosts: RelatedPost[];
  workSummaries: GsocWorkSummary[];
}) {
  // Contributors whose project wasn't in the ideas list (contributor-provided)
  const contributorOnlyProjects = contributors.filter((c) => !c.slug);

  // Helper to look up work summary by contributor name
  const getSummary = (name: string) =>
    workSummaries.find((s) => s.name === name);
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="hero-glow-blue opacity-30" />
        <div className="grid-pattern absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link
            href="/gsoc"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All GSoC years
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient blk">{yearTitle}</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl leading-relaxed">
            Contributors, completed projects, and mentoring details for GSoC{" "}
            {year}.
          </p>
          {orgUrl && (
            <Link
              href={orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View on GSoC Archive
            </Link>
          )}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Org info banner */}
        <GsocOrgBanner year={year} />

        {/* Contributors section */}
        {contributors.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                GSoC {year}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Contributors
              </h2>
              {/* <p className="mt-2 text-sm text-neutral-400">
                {contributors.length} contributor
                {contributors.length === 1 ? "" : "s"} worked on OpenPrinting
                projects in {year}.
              </p> */}
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {contributors.map((contributor, index) => (
                <motion.div
                  key={`${contributor.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="group relative"
                >
                  <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 py-1 transition-all duration-300 hover:border-border/80 hover:bg-accent">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-border">
                      <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-foreground whitespace-nowrap">
                      {contributor.name}
                    </span>
                  </div>

                  {/* Hover tooltip showing project, status, summary & links */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 rounded-lg border border-border bg-popover p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    <p className="text-[11px] font-medium text-foreground leading-snug mb-1.5">
                      {contributor.project}
                    </p>
                    {getSummary(contributor.name)?.summary && (
                      <p className="text-[10px] text-muted-foreground leading-relaxed mb-2 line-clamp-3">
                        {getSummary(contributor.name)!.summary}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {contributor.projectUrl && (
                        <Link
                          href={contributor.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <BookOpen className="w-2.5 h-2.5" />
                          GSoC
                        </Link>
                      )}
                      {contributor.codeUrl && (
                        <Link
                          href={contributor.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <Code2 className="w-2.5 h-2.5" />
                          Code
                        </Link>
                      )}
                      {contributor.slug && (
                        <Link
                          href={`/gsoc/${year}/${encodeURIComponent(contributor.slug)}`}
                          className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-colors"
                        >
                          <ArrowRight className="w-2.5 h-2.5" />
                          Project
                        </Link>
                      )}
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45 border-r border-b border-border bg-popover" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <div className="section-divider" />

        {/* Completed projects */}
        {(projects.length > 0 || contributorOnlyProjects.length > 0) && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                    Completed Work
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    GSoC {year} Projects
                  </h2>
                </div>
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {projects.length + contributorOnlyProjects.length} project
                  {projects.length + contributorOnlyProjects.length === 1
                    ? ""
                    : "s"}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, index) => {
                const projectContributors = contributors.filter(
                  (c) => c.slug === project.slug,
                );
                const mentors = [
                  ...new Set(projectContributors.flatMap((c) => c.mentors)),
                ];
                // Grab the first contributor's work summary for this project
                const firstSummary = projectContributors
                  .map((c) => getSummary(c.name))
                  .find(Boolean);
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <Link
                      href={`/gsoc/${year}/${encodeURIComponent(project.slug)}`}
                      className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow"
                    >
                      <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {firstSummary?.summary || project.excerpt}
                      </p>

                      {projectContributors.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {projectContributors.map((c, i) => (
                            <span
                              key={`c-${i}`}
                              className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/10 pl-0.5 pr-2 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-300"
                            >
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20">
                                <User className="w-2.5 h-2.5" />
                              </span>
                              {c.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {mentors.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                            Mentors
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {mentors.map((mentor) => (
                              <span
                                key={mentor}
                                className="inline-flex items-center gap-1 rounded-full border border-purple-500/20 dark:border-purple-400/20 bg-purple-500/10 pl-0.5 pr-2 py-0.5 text-[10px] font-medium text-purple-700 dark:text-purple-300"
                              >
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-500/20">
                                  <User className="w-2.5 h-2.5" />
                                </span>
                                {mentor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read details
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Contributor-provided projects (not in project ideas list) */}
              {contributorOnlyProjects.map((contributor, index) => {
                const contribSummary = getSummary(contributor.name);
                return (
                  <motion.div
                    key={`contrib-${contributor.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: (projects.length + index) * 0.04,
                    }}
                  >
                    <div className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow">
                      <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                        {contributor.project}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {contribSummary?.summary || (
                          <span className="italic text-muted-foreground/70">
                            Contributor-provided project
                          </span>
                        )}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/10 pl-0.5 pr-2 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-300">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20">
                            <User className="w-2.5 h-2.5" />
                          </span>
                          {contributor.name}
                        </span>
                      </div>

                      {contributor.mentors.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                            Mentors
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {contributor.mentors.map((mentor) => (
                              <span
                                key={mentor}
                                className="inline-flex items-center gap-1 rounded-full border border-purple-500/20 dark:border-purple-400/20 bg-purple-500/10 pl-0.5 pr-2 py-0.5 text-[10px] font-medium text-purple-700 dark:text-purple-300"
                              >
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-500/20">
                                  <User className="w-2.5 h-2.5" />
                                </span>
                                {mentor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(contributor.projectUrl || contributor.codeUrl) && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {contributor.projectUrl && (
                            <Link
                              href={contributor.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                            >
                              <BookOpen className="w-2.5 h-2.5" />
                              GSoC
                            </Link>
                          )}
                          {contributor.codeUrl && (
                            <Link
                              href={contributor.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                            >
                              <Code2 className="w-2.5 h-2.5" />
                              Code
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contributor Highlights — quotes from blog */}
        {workSummaries.filter((s) => s.quote).length > 0 && (
          <>
            <div className="section-divider" />
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                  In Their Words
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Contributor Highlights
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workSummaries
                  .filter((s) => s.quote)
                  .map((s, index) => (
                    <motion.div
                      key={`quote-${s.name}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <Quote className="w-4 h-4 text-blue-400/40 mb-2" />
                      <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-4">
                        &ldquo;{s.quote}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-border">
                          <User className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[11px] font-medium text-foreground">
                          {s.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>
          </>
        )}

        {/* Related news posts */}
        {relatedPosts.length > 0 && (
          <>
            <div className="section-divider" />
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                  From the Blog
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  News &amp; Updates
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Blog posts related to GSoC {year}.
                </p>
              </motion.div>

              <div className="space-y-3">
                {relatedPosts.map((post, index) => (
                  <motion.div
                    key={post.url}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <Link
                      href={post.url}
                      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-border/80 hover:bg-accent"
                    >
                      <Newspaper className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        {post.snippet && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {post.snippet}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
