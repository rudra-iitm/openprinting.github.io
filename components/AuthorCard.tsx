import Image from "next/image";
import { MapPin, Mail, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import authors from "@/data/authors";
import styles from "./AuthorCard.module.css";

interface Props {
  authorKey: string;
  className?: string;
}

export default function AuthorCard({ authorKey, className }: Props) {
  const author = authors.find((a) => a.key === authorKey);

  if (!author) return null;

  const placeholder = "/authors/placeholder.jpg";
  const imgRaw = author.image && author.image !== "NA" ? author.image : placeholder;
  const imgSrc = imgRaw.startsWith("/") ? imgRaw : `/${imgRaw}`;

  return (
    <div
      className={cn(
        "bg-black text-gray-300 rounded-none shadow-none mx-auto",
        "p-8 w-full max-w-[360px]",
        className
      )}
    >
      <div className="flex flex-col items-start">
        <div className={`${styles.ringWrapper} w-[135px] h-[135px]`}>
          <div aria-hidden className={`${styles.ringAbsolute} rounded-full w-full h-full`} />
          <div className={`${styles.avatarCircle} w-[120px] h-[120px]`}>
            <Image
              src={imgSrc}
              alt={author.name}
              width={120}
              height={120}
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
