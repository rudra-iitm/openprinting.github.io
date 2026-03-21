import type { AnchorHTMLAttributes, ReactNode } from "react";
import { normalizeInternalHref } from "@/lib/site";

type SiteLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href"
> & {
  children: ReactNode;
  href: string;
  prefetch?: boolean;
};

export default function SiteLink({
  children,
  href,
  prefetch,
  ...props
}: SiteLinkProps) {
  void prefetch;

  return (
    <a href={normalizeInternalHref(href)} {...props}>
      {children}
    </a>
  );
}
