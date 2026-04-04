"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Mail, Github, Linkedin, Globe, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import authors from "@/data/authors";
import { siteConfig } from "@/config/site.config";

const basePath = siteConfig.urls.basePath;
function MastodonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.536-.766 3.536-.766l-.072-1.574s-1.619.511-3.338.449c-1.693-.063-3.476-.194-3.752-2.448a4.198 4.198 0 0 1-.037-.575s1.661.406 3.764.502c1.287.059 2.495-.075 3.724-.221 2.354-.28 4.405-1.724 4.663-3.043.405-2.089.372-5.098.372-5.098l-.001-.002zm-3.809 5.447h-2.494V8.818c0-1.143-.48-1.723-1.443-1.723-1.063 0-1.596.688-1.596 2.047v2.964h-2.48V9.142c0-1.359-.534-2.047-1.596-2.047-.962 0-1.443.58-1.443 1.723v5.195H4.972V8.648c0-1.142.291-2.048.875-2.717.601-.67 1.389-1.013 2.368-1.013 1.132 0 1.989.435 2.556 1.305l.551.924.551-.924c.568-.87 1.425-1.305 2.556-1.305.979 0 1.767.344 2.368 1.013.583.669.875 1.575.875 2.717v5.365z" />
    </svg>
  )
}

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
  const imgRaw =
    author.image && author.image !== "NA" ? author.image : placeholder;
  const imgSrc = imgRaw.startsWith("/") ? `${basePath}${imgRaw}` : `${basePath}/${imgRaw}`;

  const extraLinks =
    author.links?.filter((l) => typeof l?.href === "string" && l.href.trim() !== "") ?? [];

  const linkItems: { label: string; href: string; icon: React.ReactNode; external?: boolean }[] = [
    ...(author.email
      ? [
        {
          label: "Email",
          href: author.email,
          icon: <Mail size={14} className="text-muted-foreground" />,
          external: false,
        },
      ]
      : []),
    ...(author.github
      ? [
        {
          label: "GitHub",
          href: author.github,
          icon: <Github size={14} className="text-muted-foreground" />,
          external: true,
        },
      ]
      : []),
    ...extraLinks.map((l) => {
      const kind = l.kind ?? "other";
      const icon =
        kind === "linkedin" ? (
          <Linkedin size={14} className="text-muted-foreground" />
        ) : kind === "website" ? (
          <Globe size={14} className="text-muted-foreground" />
        ) : kind === "mastodon" ? (
          <MastodonIcon className="w-[14px] h-[14px] text-muted-foreground" />
        ) : (
          <Link2 size={14} className="text-muted-foreground" />
        );
      return { label: l.label, href: l.href, icon, external: true };
    }),
  ];

  return (
    <>
      <div className="lg:hidden flex items-center gap-3 px-4 py-4">
        <div className="rounded-full overflow-hidden w-[52px] h-[52px] border border-border">
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
          <h2 className="text-base font-semibold text-foreground leading-tight tracking-tight">
            {author.name}
          </h2>
          {author.bio && (
            <p className="text-[13px] text-muted-foreground mt-1 leading-snug">
              {author.bio}
            </p>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-1.5 text-xs font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200"
          >
            Follow
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover rounded-lg shadow-xl border border-border py-1 z-50">
              {author.location && (
                <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span className="text-sm">{author.location}</span>
                </div>
              )}

              {linkItems.map((item) => (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:block bg-inherit text-neutral-300 pt-2 px-6 pb-6 w-full max-w-[260px]",
          className
        )}
      >
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-center mb-6 w-[135px] h-[135px] relative">
            <div
              aria-hidden
              className="absolute rounded-full w-full h-full border-[0.5px] border-border [box-shadow:0_0_0_1px_rgba(255,255,255,0.05)]"
            />
            <div className="rounded-full overflow-hidden w-[120px] h-[120px] border border-border">
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

          <h2 className="text-xl font-bold tracking-tight text-foreground mb-2 pl-2">
            {author.name}
          </h2>

          {author.bio && (
            <p className="text-sm text-muted-foreground mb-5 pl-2 leading-snug">
              {author.bio}
            </p>
          )}

          {author.location && (
            <div className="flex items-center gap-3 text-muted-foreground mb-4 pl-2">
              <MapPin size={14} />
              <span className="text-sm">{author.location}</span>
            </div>
          )}

          <div className="flex flex-col items-start pl-2 gap-3">
            {linkItems.map((item) => (
              <a
                key={`${item.label}-${item.href}-desktop`}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label === "Email" ? (
                  <Mail size={16} />
                ) : item.label === "GitHub" ? (
                  <Github size={16} />
                ) : item.label === "LinkedIn" ? (
                  <Linkedin size={16} />
                ) : item.label === "Website" ? (
                  <Globe size={16} />
                ) : item.label === "Mastodon" ? (
                  <MastodonIcon className="w-[16px] h-[16px]" />
                ) : (
                  <Link2 size={16} />
                )}
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div >
    </>
  );
}
