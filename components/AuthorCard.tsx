"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import authors from "@/data/authors";

interface Props {
  authorKey: string;
  className?: string;
}

export default function AuthorCard({ authorKey, className }: Props) {
  const [open, setOpen] = useState(false);
  const author = authors.find((a) => a.key === authorKey);

  if (!author) return null;

  const placeholder = "/authors/placeholder.jpg";
  const imgRaw =
    author.image && author.image !== "NA" ? author.image : placeholder;
  const imgSrc = imgRaw.startsWith("/") ? imgRaw : `/${imgRaw}`;

  return (
    <>
      <div className="lg:hidden flex items-center gap-3 px-4 py-4">
        <div className="rounded-full overflow-hidden w-[52px] h-[52px] border border-white/20">
          <Image
            src={imgSrc}
            alt={author.name}
            width={52}
            height={52}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-white leading-tight">
            {author.name}
          </h2>
          {author.role && (
            <p className="text-[15px] text-gray-400 mt-0.5">{author.role}</p>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-1.5 text-sm font-medium rounded bg-white text-black hover:bg-gray-100"
          >
            Follow
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-xl border border-gray-200 py-1 z-50">
              {author.location && (
                <div className="flex items-center gap-2 px-3 py-2 text-gray-700">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm">{author.location}</span>
                </div>
              )}

              {author.email && (
                <a
                  href={author.email}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-sm">Email</span>
                </a>
              )}

              {author.github && (
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <Github size={16} className="text-gray-500" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:block bg-inherit text-gray-300 pt-2 px-6 pb-6 w-full max-w-[260px]",
          className
        )}
      >
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-center mb-6 w-[135px] h-[135px] relative">
            <div
              aria-hidden
              className="absolute rounded-full w-full h-full border-[0.7px] border-[rgba(255,255,255,0.8)] [box-shadow:0_0_0_1px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(0,0,0,0.4)]"
            />
            <div className="rounded-full overflow-hidden w-[120px] h-[120px] border border-white/5">
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

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-300 mb-3 pl-2">
            {author.name}
          </h2>

          {author.role && (
            <p className="text-[15px] text-gray-300 mb-5 pl-2">
              {author.role}
            </p>
          )}

          {author.location && (
            <div className="flex items-center gap-3 text-gray-400 mb-4 pl-2">
              <MapPin size={16} />
              <span className="text-sm">{author.location}</span>
            </div>
          )}

          <div className="flex flex-col items-start pl-2 gap-3">
            {author.email && (
              <a
                href={author.email}
                className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-200"
              >
                <Mail size={18} />
                <span className="text-sm">Email</span>
              </a>
            )}

            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-200"
              >
                <Github size={18} />
                <span className="text-sm">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
