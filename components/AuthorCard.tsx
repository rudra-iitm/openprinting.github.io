import Image from "next/image";
import { MapPin, Mail, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import authors, { Author } from "@/data/authors";

interface Props {
  name: string;          
  className?: string;
}

export default function AuthorCard({ name, className }: Props) {
  const author: Author | undefined = authors.find(a => a.name === name);

  if (!author) return null;

  const placeholder = "/authors/placeholder.jpg";
  const imgRaw = author.image && author.image !== "NA" ? author.image : placeholder;
  const imgSrc = imgRaw.startsWith("/") ? imgRaw : `/${imgRaw}`;

  const avatarSize = 120;
  const ringSize = avatarSize + 15;

  return (
    <div
      className={cn(
        "bg-black text-gray-300 rounded-none shadow-none mx-auto",
        "p-8 w-full max-w-[360px]",
        className
      )}
    >
      <div className="flex flex-col items-start">

        <div
          className="relative flex items-center justify-center mb-6"
          style={{ width: ringSize, height: ringSize }}
        >
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: ringSize,
              height: ringSize,
              border: "0.7px solid rgba(255,255,255,0.8)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.3), inset 0 0 20px rgba(0,0,0,0.4)"
            }}
          />

          <div
            className="rounded-full overflow-hidden"
            style={{ width: avatarSize, height: avatarSize }}
          >
            <Image
              src={imgSrc}
              alt={author.name}
              width={avatarSize}
              height={avatarSize}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-gray-300 mb-3 pl-2">
          {author.name}
        </h2>

        {author.role && (
          <p className="text-lg text-gray-300 mb-5 pl-2">{author.role}</p>
        )}

        {author.location && (
          <div className="flex items-center gap-3 text-gray-400 mb-4 pl-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-sm">{author.location}</span>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-start pl-2",
            author.email && author.github
              ? "gap-4"
              : author.email || author.github
              ? "gap-2"
              : "gap-0"
          )}
        >
          {author.email && (
            <a
              href={author.email}
              className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Mail size={18} className="text-gray-500" />
              <span className="text-sm">Email</span>
            </a>
          )}

          {author.github && (
            <a
              href={author.github}
              className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-200 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} className="text-gray-500" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
