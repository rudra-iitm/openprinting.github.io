import { Metadata } from "next";
import authors from "@/data/authors";
import AuthorSection from "@/components/AuthorSection";

export const metadata: Metadata = {
  title: "Contributors | OpenPrinting",
  description: "Meet the amazing contributors behind OpenPrinting",
};

export default function AuthorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <AuthorSection
        authors={authors}
        title="Our Contributors"
        subtitle="Meet the dedicated team behind OpenPrinting's success"
      />
    </div>
  );
}