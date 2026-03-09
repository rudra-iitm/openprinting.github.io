import {
  getGsocProjectsByYear,
  getGsocYearOverview,
  getGsocYears,
  getGsocPostsByYear,
} from "@/lib/gsoc";
import {
  getContributorsByYear,
  getOrgUrlByYear,
} from "@/data/gsoc-contributors";
import { getWorkSummariesByYear } from "@/data/gsoc-work-summaries";
import { GsocYearClient } from "./year-client";

export async function generateStaticParams() {
  const years = await getGsocYears();
  return years.map((year) => ({ year }));
}

export default async function GsocYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const allProjects = await getGsocProjectsByYear(year);
  const overview = await getGsocYearOverview(year);
  const contributors = getContributorsByYear(Number(year));
  const orgUrl = getOrgUrlByYear(Number(year));
  const allPostsByYear = await getGsocPostsByYear();
  const relatedPosts = allPostsByYear[year] ?? [];
  const workSummaries = getWorkSummariesByYear(Number(year));

  // Only show projects that were actually done (have a contributor)
  const doneSlugs = new Set(contributors.map((c) => c.slug).filter(Boolean));
  const doneProjects = allProjects.filter((p) => doneSlugs.has(p.slug));

  return (
    <GsocYearClient
      year={year}
      yearTitle={overview.title}
      yearContent={overview.content}
      projects={doneProjects}
      contributors={contributors}
      orgUrl={orgUrl}
      relatedPosts={relatedPosts}
      workSummaries={workSummaries}
    />
  );
}
