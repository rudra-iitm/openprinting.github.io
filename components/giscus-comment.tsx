"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/site-config";

export default function GiscusComments() {
    const { resolvedTheme } = useTheme();
    const { giscus } = siteConfig;

    return (
        <div className="mt-10">
            <Giscus
                id="comments"
                repo={giscus.repo}
                repoId={giscus.repoId}
                category={giscus.category}
                categoryId={giscus.categoryId}
                mapping={giscus.mapping}
                term={giscus.term}
                reactionsEnabled={giscus.reactionsEnabled}
                emitMetadata={giscus.emitMetadata}
                inputPosition={giscus.inputPosition}
                theme={resolvedTheme === "dark" ? "transparent_dark" : "noborder_light"}
                lang={giscus.lang}
                loading={giscus.loading}
            />
        </div>
    );
}
