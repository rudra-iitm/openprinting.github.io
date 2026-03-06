import Link from "next/link";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import { getGsocProject, getGsocProjectsByYear, getGsocYears } from "@/lib/gsoc";

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
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-gray-800 pb-4">
          <Link href={`/gsoc/${year}`} className="text-sm text-blue-300 hover:text-blue-200">
            ← Back to GSoC {year}
          </Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">{post.title}</h1>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
              <MarkdownRenderer content={post.content} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <TableOfContents content={post.content} />

              <div className="rounded-lg bg-gray-900 p-4">
                <h2 className="mb-3 text-lg font-semibold text-white">More in GSoC {year}</h2>
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
                              ? "block rounded-md bg-white/10 px-2 py-1 text-sm text-white"
                              : "block rounded-md px-2 py-1 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
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
