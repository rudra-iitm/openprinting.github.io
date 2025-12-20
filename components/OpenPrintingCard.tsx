"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Github, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-white leading-tight">
            OpenPrinting
          </h2>
          <p className="text-[15px] text-gray-400 mt-0.5">
            Making Printing Just Work!
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-1.5 text-sm font-medium rounded bg-white text-black hover:bg-gray-100"
          >
            Follow
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-xl border border-gray-200 py-1 z-50">
              <div className="flex items-center gap-2 px-3 py-2 text-gray-700">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-sm">Linux Foundation</span>
              </div>

              <a
                href="https://openprinting.github.io/"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                <Globe size={16} className="text-gray-500" />
                <span className="text-sm">Website</span>
              </a>

              <a
                href="https://github.com/OpenPrinting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                <Github size={16} className="text-gray-500" />
                <span className="text-sm">GitHub</span>
              </a>
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
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-300 mb-3 pl-2">
            OpenPrinting
          </h2>

          <p className="text-[15px] text-gray-300 mb-5 pl-2">
            Making Printing Just Work!
          </p>

          <div className="flex items-center gap-3 text-gray-400 mb-4 pl-2">
            <MapPin size={16} />
            <span className="text-sm">Linux Foundation</span>
          </div>

          <div className="flex flex-col items-start pl-2 gap-3">
            <a
              href="https://openprinting.github.io/"
              className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-200"
            >
              <Globe size={18} />
              <span className="text-sm">Website</span>
            </a>

            <a
              href="https://github.com/OpenPrinting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-200"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
