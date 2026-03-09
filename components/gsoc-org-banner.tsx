"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, MessageCircle, ExternalLink } from "lucide-react";

export function GsocOrgBanner({ year }: { year: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 card-glow"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-400 tracking-wide uppercase mb-2">
            About Us
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            OpenPrinting — The Linux Foundation
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            We develop the printing infrastructure for Linux and similar
            operating systems under The Linux Foundation. Every year we
            participate in Google Summer of Code, mentoring contributors on
            printing, scanning, CUPS, and related projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:flex-col md:items-end shrink-0">
          <Link
            href={`https://wiki.linuxfoundation.org/gsoc/google-summer-code-${year}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            LF GSoC {year} Wiki
          </Link>
          <Link
            href="https://github.com/OpenPrinting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <Github className="w-3 h-3" />
            GitHub
          </Link>
          <Link
            href="mailto:printing-architecture@lists.linux-foundation.org"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3" />
            Mailing List
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400">
            <MessageCircle className="w-3 h-3" />
            #openprinting on IRC
          </span>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/[0.06]">
        <p className="text-xs text-neutral-500">
          <span className="font-medium text-neutral-400">Admins:</span> Till
          Kamppeter &amp; Aveek Basu
          <span className="mx-2 text-neutral-600">·</span>
          <span className="font-medium text-neutral-400">Technologies:</span> C,
          C++, CUPS, IPP, Python
          <span className="mx-2 text-neutral-600">·</span>
          <span className="font-medium text-neutral-400">Topics:</span>{" "}
          Printing, Scanning, Desktop Integration
        </p>
      </div>
    </motion.section>
  );
}
