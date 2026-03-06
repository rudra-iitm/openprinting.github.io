import Link from "next/link";
import { getGsocProjectsByYear, getGsocYearOverview, getGsocYears } from "@/lib/gsoc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderStudentsAsCards(markdown: string): string {
  const sectionPattern = /(##\s+[^\n]*students[^\n]*\n)([\s\S]*?)(?=\n##\s+|$)/gi;

  return markdown.replace(sectionPattern, (_match, heading, body) => {
    const entryPattern =
      /###\s+([^\n]+)\n+!\[([^\]]*)\]\(([^)]+)\)\n+([\s\S]*?)(?=(?:\n###\s+)|$)/gi;

    const cards: string[] = [];
    let entryMatch: RegExpExecArray | null = entryPattern.exec(body);

    while (entryMatch) {
      const name = entryMatch[1].trim();
      const alt = entryMatch[2].trim() || name;
      const src = entryMatch[3].trim();
      const description = entryMatch[4].replace(/\n+/g, " ").trim();

      cards.push(
        `<article class="not-prose rounded-lg border border-gray-800 bg-gray-900/60 p-4">
          <div class="flex items-start gap-4">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="h-[100px] w-[100px] rounded-full object-cover border border-gray-700" loading="lazy" />
            <div>
              <h3 class="m-0 text-base font-semibold text-white">${escapeHtml(name)}</h3>
              <p class="mt-2 text-sm text-gray-300">${escapeHtml(description)}</p>
            </div>
          </div>
        </article>`,
      );

      entryMatch = entryPattern.exec(body);
    }

    if (cards.length === 0) return `${heading}${body}`;

    return `${heading}
<div class="mt-4 grid gap-4 md:grid-cols-2">
${cards.join("\n")}
</div>
`;
  });
}

export async function generateStaticParams() {
  const years = await getGsocYears();
  return years.map((year) => ({ year }));
}

export default async function GsocYearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const projects = await getGsocProjectsByYear(year);
  const overview = await getGsocYearOverview(year);
  const yearTitle = overview.title;
  const yearContent = renderStudentsAsCards(overview.content);

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-gray-800 pb-4">
          <Link href="/gsoc" className="text-sm text-blue-300 hover:text-blue-200">
            ← Back to all years
          </Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">{yearTitle}</h1>
        </header>

        <section className="mb-10 rounded-md border border-gray-800 bg-gray-950 p-5 md:p-6">
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {yearContent}
            </ReactMarkdown>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-800 pb-3">
            <h2 className="text-2xl font-semibold tracking-tight">Project Ideas</h2>
            <span className="text-sm text-gray-400">{projects.length} entries</span>
          </div>

          <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/gsoc/${year}/${encodeURIComponent(project.slug)}`}
              className="block rounded-md border border-gray-800 bg-gray-950 p-5 transition-colors hover:border-gray-700 hover:bg-gray-900/70"
            >
              <h2 className="text-lg font-semibold text-white">{project.title}</h2>
              <p className="mt-2 text-sm text-gray-400 line-clamp-2">{project.excerpt}</p>
            </Link>
          ))}
          </div>
        </section>
        </div>
    </main>
  );
}
