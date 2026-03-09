import Link from "next/link";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import {
  getGsocProject,
  getGsocProjectsByYear,
  getGsocYears,
} from "@/lib/gsoc";

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

  return (
    <main className="min-h-screen bg-background px-6 pb-16 pt-24 text-foreground">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-border pb-4">
          <Link
            href={`/gsoc/${year}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            ← Back to GSoC {year}
          </Link>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            {post.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <MarkdownRenderer content={post.content} />
            </div>

            {post.tags.length > 0 && (
              <div className="mt-8 border-t border-border pt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tags
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <TableOfContents content={post.content} />

              <div className="rounded-lg bg-muted p-4">
                <h2 className="mb-3 text-lg font-semibold text-foreground">
                  More in GSoC {year}
                </h2>
                <ul className="space-y-2">
                  {yearProjects.map((item) => {
                    const href = `/gsoc/${year}/${encodeURIComponent(item.slug)}`;
                    const isCurrent = item.slug === currentSlug;

                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          className={
                            isCurrent
                              ? "block rounded-md bg-accent px-2 py-1 text-sm text-foreground"
                              : "block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                          }
                        >
                          {item.title}
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
