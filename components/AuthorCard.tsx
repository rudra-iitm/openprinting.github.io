"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Mail, Github, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import authors from "@/data/authors";

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

interface Props {
  authorKey: string;
  className?: string;
}

export default function AuthorCard({ authorKey, className }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: globalThis.MouseEvent | globalThis.TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const author = authors.find((a) => a.key === authorKey);

  if (!author) return null;

  const placeholder = `${basePath}/authors/placeholder.jpg`;
  const imgRaw = author.image && author.image !== "NA" ? author.image : placeholder;
  const imgSrc = imgRaw.startsWith("/") ? `${basePath}${imgRaw}` : `${basePath}/${imgRaw}`;

  return (
    <>
      {/* Mobile card */}
      <div className="modern-card lg:hidden">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-gray-300 dark:border-slate-500/60">
            <Image
              src={imgSrc}
              alt={author.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-gray-900 dark:text-slate-100">{author.name}</h2>
            {author.role && <p className="truncate text-sm text-gray-500 dark:text-slate-400">{author.role}</p>}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white/70 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-cyan-500/60 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-cyan-300/60 dark:hover:text-cyan-200"
            >
              Profile
              <ChevronDown size={14} />
            </button>

            {open && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white/95 p-2 shadow-xl dark:border-slate-700 dark:bg-slate-950/95">
                {author.location && (
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-600 dark:text-slate-300">
                    <MapPin size={16} className="text-gray-400 dark:text-slate-400" />
                    <span className="text-sm">{author.location}</span>
                  </div>
                )}

                {author.email && (
                  <a
                    href={author.email}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-cyan-200"
                  >
                    <Mail size={16} className="text-gray-400 dark:text-slate-400" />
                    <span className="text-sm">Email</span>
                  </a>
                )}

                {author.github && (
                  <a
                    href={author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-cyan-200"
                  >
                    <Github size={16} className="text-gray-400 dark:text-slate-400" />
                    <span className="text-sm">GitHub</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop card */}
      <div
        className={cn(
          "modern-card hidden w-full max-w-[280px] lg:block",
          className
        )}
      >
        <div className="flex flex-col items-start">
          <div className="mb-5 flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded-full border border-gray-300 dark:border-slate-500/70">
            <Image
              src={imgSrc}
              alt={author.name}
              width={108}
              height={108}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-slate-100">{author.name}</h2>

          {author.role && (
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{author.role}</p>
          )}

          {author.location && (
            <div className="mt-4 flex items-center gap-2 text-gray-500 dark:text-slate-400">
              <MapPin size={15} />
              <span className="text-sm">{author.location}</span>
            </div>
          )}

          <div className="mt-5 flex flex-col items-start gap-2">
            {author.email && (
              <a
                href={author.email}
                className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-200"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            )}

            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-200"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
