import Image from "next/image";
import Link from "next/link";
import { getLatestPosts, PostSummary } from "@/lib/posts";
import authors from "@/data/authors";
import { basePath } from "@/lib/utils";

function getPublisherProfile(authorKey: string) {
  const author = authors.find((item) => item.key === authorKey);
  const rawImage =
    author?.image && author.image !== "NA"
      ? author.image
      : "/authors/placeholder.jpg";
  const imagePath = rawImage.startsWith("/")
    ? `${basePath}${rawImage}`
    : `${basePath}/${rawImage}`;

  return {
    name: author?.name || authorKey || "OpenPrinting",
    imagePath,
  };
}

function formatCardDate(dateValue: string) {
  if (!dateValue) {
    return "";
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function NewsSection() {
  const posts = await getLatestPosts(3);

  return (
    <section className="relative z-10 bg-black py-16 text-white" id="news">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((item) => {
            const href = `/${encodeURIComponent(item.slug)}`;
            const publisher = getPublisherProfile(item.author);
            return (
              <Link
                key={item.slug}
                href={href}
                className="block cursor-pointer rounded-md border border-gray-800 bg-gray-950 p-5 transition-colors hover:border-gray-700 hover:bg-gray-900/70"
              >
                <article>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    {item.date && (
                      <span className="mt-0.5 shrink-0 rounded-full border border-gray-700 px-2 py-0.5 text-[11px] text-gray-400">
                        {formatCardDate(item.date)}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Image
                      src={publisher.imagePath}
                      alt={publisher.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full border border-gray-700 object-cover"
                    />
                    <span className="text-sm text-gray-300">
                      {publisher.name}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-gray-300 line-clamp-4">
                    {item.excerpt}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center rounded-md border border-gray-700 bg-gray-950 px-4 py-2 text-sm text-gray-200 transition-colors hover:border-gray-600 hover:bg-gray-900 hover:text-white"
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
