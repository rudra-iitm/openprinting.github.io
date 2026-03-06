import { getAllPosts } from "@/lib/posts";
import NewsArchive from "@/components/news-archive";

export default async function NewsPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            All News & Blog Posts
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Browse the full archive with search and date filtering.
          </p>
        </header>

        <NewsArchive posts={posts} />
      </div>
    </main>
  );
}
