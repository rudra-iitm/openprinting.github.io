import type { AnchorHTMLAttributes, ReactNode } from "react";

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
    <a href={href} {...props}>
      {children}
    </a>
  );
}
