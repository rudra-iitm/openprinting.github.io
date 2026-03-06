import Link from "next/link";
import { getGsocPostsByYear, getGsocYearSummaries } from "@/lib/gsoc";

export default async function GsocIndexPage() {
  const years = await getGsocYearSummaries();
  const gsocPostsByYear = await getGsocPostsByYear();

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Google Summer of Code
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-400">
            Browse OpenPrinting GSoC projects year by year. Each year page
            contains the program context and all project entries.
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {years.map((item) => {
              return (
                <article
                  key={item.year}
                  className="rounded-md border border-gray-800 bg-gray-950 p-5"
                >
                  <Link
                    href={`/gsoc/${item.year}`}
                    className="group block rounded-sm transition-colors hover:text-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">
                        GSoC {item.year}
                      </h3>
                      <span className="rounded-full border border-gray-700 px-2 py-0.5 text-[11px] text-gray-300">
                        {item.projectCount} Projects
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-400">
                      OpenPrinting projects and mentoring topics for {item.year}
                      .
                    </p>
                    <p className="mt-4 text-sm text-blue-300 transition-colors group-hover:text-blue-200">
                      View projects →
                    </p>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 border-t border-gray-800 pt-6">
          <h2 className="text-xl font-semibold text-white">Related Posts</h2>
          <div className="mt-4 space-y-4">
            {years.map((item) => {
              const relatedPosts = gsocPostsByYear[item.year] ?? [];
              if (relatedPosts.length === 0) return null;

              return (
                <div
                  key={`posts-${item.year}`}
                  className="rounded-md border border-gray-800 bg-gray-950 p-4"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                    {item.year}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {relatedPosts.map((post) => (
                      <li key={post.url}>
                        <Link
                          href={post.url}
                          className="text-sm text-gray-300 transition-colors hover:text-blue-300"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
