import React from "react";
import AuthorCard from "@/components/AuthorCard";
import { Author } from "@/data/authors";

interface Props {
  authors: Author[];
  title?: string;
  subtitle?: string;
}

export default function AuthorSection({
  authors,
  title = "Our Contributors",
  subtitle = "People who contribute to OpenPrinting",
}: Props) {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">{title}</h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-400">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.name} author={author} />
          ))}
        </div>
      </div>
    </section>
  );
}
