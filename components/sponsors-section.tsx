import Image from "next/image"
import Link from "next/link"

type SponsorTier = "Platinum Member" | "Gold Member" | "Silver Member" | "Supporter"

type Sponsor = {
  name: string
  logo: string
  url: string
  tier: SponsorTier
}

const TIER_STYLES: Record<SponsorTier, string> = {
  "Platinum Member": "text-slate-400 border-slate-400/40",
  "Gold Member": "text-amber-500 border-amber-400/40",
  "Silver Member": "text-zinc-400  border-zinc-400/40",
  Supporter: "text-brand-lightBlue border-brand-lightBlue/40",
}

const TIER_LABELS: Record<SponsorTier, string> = {
  "Platinum Member": "Platinum",
  "Gold Member": "Gold",
  "Silver Member": "Silver",
  Supporter: "Supporter",
}

const sponsors: Sponsor[] = [
  {
    name: "Sovereign Tech Agency",
    logo: "/sponsors/sovereign-tech-agency.png",
    url: "/donations/",
    tier: "Supporter",
  },
]

const marqueeItems = [...sponsors, ...sponsors]

export default function SponsorsSection() {
  return (
    <section className="border-y border-border/40 bg-background py-2.5 overflow-hidden">
      <div className="flex items-center">

        <div className="flex-shrink-0 border-r border-border/40 px-5 mr-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            Supported&nbsp;by
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
            {marqueeItems.map((sponsor, i) => (
              <Link
                key={`${sponsor.name}-${i}`}
                href={sponsor.url}
                aria-label={`${sponsor.name} — ${sponsor.tier}`}
                className="group flex flex-shrink-0 items-center gap-2 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={100}
                  height={28}
                  className="h-6 w-auto opacity-60 transition-opacity duration-200 group-hover:opacity-100 dark:invert"
                />
                <span
                  className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide opacity-70 transition-opacity duration-200 group-hover:opacity-100 ${TIER_STYLES[sponsor.tier]}`}
                >
                  {TIER_LABELS[sponsor.tier]}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 border-l border-border/40 px-5 ml-4 hidden sm:block">
          <Link
            href="/donations/"
            className="text-xs font-medium text-muted-foreground border border-border/60 rounded-md px-3 py-1 transition-all duration-200 hover:border-border hover:text-foreground whitespace-nowrap"
          >
            + Become a sponsor
          </Link>
        </div>

      </div>
    </section>
  )
}