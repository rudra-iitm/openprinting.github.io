"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Github, Globe, Linkedin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  className?: string;
}

export default function OpenPrintingCard({ className }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
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

  return (
    <>
      <div className="lg:hidden flex items-center gap-3 px-4 py-4">
        <div className="flex-1 min-w-0 flex flex-col items-center text-center">
          <div className="mb-3">
            <Image
              src={`${basePath}/openprinting.png`}
              alt="OpenPrinting Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-base font-semibold text-foreground leading-tight">
            OpenPrinting
          </h2>
          <p className="text-[15px] text-muted-foreground mt-0.5">
            Making Printing Just Work!
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-1.5 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Follow
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded shadow-xl border border-border py-1 z-50">
              <div className="flex items-center gap-2 px-3 py-2 text-foreground">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm">The Linux Foundation</span>
              </div>

              <a
                href={siteConfig.urls.baseUrl}
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted"
              >
                <Globe size={16} className="text-muted-foreground" />
                <span className="text-sm">Website</span>
              </a>

              <a
                href="https://github.com/OpenPrinting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted"
              >
                <Github size={16} className="text-muted-foreground" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://ubuntu.social/tags/OpenPrinting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted"
              >
                <MastodonIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Mastodon</span>
              </a>

              <a
                href="https://www.linkedin.com/company/openprinting/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted"
              >
                <Linkedin size={16} className="text-muted-foreground" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:block bg-card text-foreground pt-2 px-6 pb-6 w-full max-w-[260px] rounded-lg border border-border",
          className
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Image
              src={`${basePath}/openprinting.png`}
              alt="OpenPrinting Logo"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-3">
            OpenPrinting
          </h2>

          <p className="text-[15px] text-muted-foreground mb-5 pl-2">
            Making Printing Just Work!
          </p>

          <div className="flex items-center gap-3 text-muted-foreground mb-4 pl-2 self-start">
            <MapPin size={16} />
            <span className="text-sm">Linux Foundation</span>
          </div>

          <div className="flex flex-col items-start pl-2 gap-3 self-start">
            <a
              href={siteConfig.urls.baseUrl}
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary"
            >
              <Globe size={18} />
              <span className="text-sm">Website</span>
            </a>

            <a
              href="https://github.com/OpenPrinting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://ubuntu.social/tags/OpenPrinting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary"
            >
              <MastodonIcon className="w-[18px] h-[18px]" />
              <span className="text-sm">Mastodon</span>
            </a>

            <a
              href="https://www.linkedin.com/company/openprinting/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary"
            >
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
