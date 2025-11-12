import Image from "next/image";
import { MapPin, Mail, Github } from "lucide-react";
import { Author } from "@/data/authors";

interface Props {
  author: Author;
}

export default function AuthorCard({ author }: Props) {
  // normalize image path and fallback
  const placeholder = "/authors/placeholder.jpg";
  let imgSrc = author.image || "";
  if (!imgSrc || imgSrc === "NA") imgSrc = placeholder;
  // ensure leading slash
  if (imgSrc && !imgSrc.startsWith("/")) imgSrc = `/${imgSrc}`;

  return (
    <div className="bg-black text-white p-6">
      <div className="flex flex-col">
        {/* Centered profile picture */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full border border-gray-400 p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={imgSrc}
                alt={author.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Centered name */}
        <h3 className="text-center text-xl font-semibold mb-1">{author.name}</h3>

        {/* Centered role */}
        {author.role && (
          <p className="text-center text-base text-white mb-4">{author.role}</p>
        )}

        {/* Left-aligned location */}
        {author.location && (
          <div className="flex items-center gap-2 text-sm text-white mb-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{author.location}</span>
          </div>
        )}

        {/* Left-aligned email */}
        {author.email && author.email !== "" && (
          <div className="flex items-center gap-2 text-sm text-white mb-2">
            <Mail size={16} className="text-gray-400" />
            <a
              href={author.email}
              className="hover:underline"
              aria-label={`Email ${author.name}`}
            >
              Email
            </a>
          </div>
        )}

        {/* Left-aligned GitHub */}
        {author.github && author.github !== "" && (
          <div className="flex items-center gap-2 text-sm text-white">
            <Github size={16} className="text-gray-400" />
            <a
              href={author.github}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} on GitHub`}
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
