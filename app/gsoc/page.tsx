import Link from "next/link";
import { getGsocPostsByYear, getGsocYearSummaries } from "@/lib/gsoc";
import { GsocRelatedPosts } from "@/components/gsoc-related-posts";

export default async function GsocIndexPage() {
  const years = await getGsocYearSummaries();
  const gsocPostsByYear = await getGsocPostsByYear();

  return (
    <main className="min-h-screen bg-background px-6 pb-16 pt-24 text-foreground">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-border pb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Google Summer of Code
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Browse OpenPrinting GSoC projects year by year. Each year page
            contains the program context and all project entries.
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {years.map((item) => {
              return (
                <article
                  key={item.year}
                  className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-md card-glow"
                >
                  <Link
                    href={`/gsoc/${item.year}`}
                    className="group block rounded-sm transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        GSoC {item.year}
                      </h3>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        {item.projectCount} Projects
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      OpenPrinting projects and mentoring topics for {item.year}
                      .
                    </p>
                    <p className="mt-4 text-sm text-blue-600 dark:text-blue-400 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-300">
                      View projects →
                    </p>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <GsocRelatedPosts years={years} postsByYear={gsocPostsByYear} />
      </div>
    </main>
  );
}
