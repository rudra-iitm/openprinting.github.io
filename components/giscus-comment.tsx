"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusComments() {
    const { resolvedTheme } = useTheme();

    return (
        <div className="mt-10">
            <Giscus
                id="comments"
                repo="rudra-iitm/openprinting.github.io"
                repoId="R_kgDOOJ9tYQ"
                category="Blog Comments"
                categoryId="DIC_kwDOOJ9tYc4C4B5V"
                mapping="url"
                term="Welcome to OpenPrinting Blog"
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
