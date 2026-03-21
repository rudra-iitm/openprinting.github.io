"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site.config";
import type { Mapping } from "giscus";

export default function GiscusComments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-10">
      <Giscus
        id="comments"
        repo={siteConfig.giscus.repo as `${string}/${string}`}
        repoId={siteConfig.giscus.repoId as `R_${string}`}
        category={siteConfig.giscus.category}
        categoryId={siteConfig.giscus.categoryId as `DIC_${string}`}
        mapping={siteConfig.giscus.mapping as Mapping}
        term={siteConfig.giscus.term}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "transparent_dark" : "noborder_light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
