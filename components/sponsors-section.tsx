"use client"

import Image from "next/image"
import Link from "next/link"

type SponsorTier = "Supporter" | "Platinum Member" | "Gold Member" | "Silver Member"

type Sponsor = {
  name: string
  logo: string
  url: string
  tier: SponsorTier
}

const sponsors: Sponsor[] = [
  {
    name: "Sovereign Tech Agency",
    logo: "/sponsors/sovereign-tech-agency.png",
    url: "https://www.sovereigntechfund.de/",
    tier: "Supporter",
  },
]

export default function SponsorsSection() {
  return (
    <section className="py-4 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-normal text-muted-foreground opacity-100 mb-2">
            Supported by
          </p>

          <div className="flex flex-wrap items-start justify-center gap-x-7 gap-y-1">
            {sponsors.map((sponsor) => (
              <Link
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center opacity-70 transition-opacity duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                aria-label={sponsor.name}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={160}
                  height={32}
                  className="h-6 w-auto dark:invert"
                />
                <span className="mt-1 text-xs text-muted-foreground leading-none">
                  {sponsor.tier}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

