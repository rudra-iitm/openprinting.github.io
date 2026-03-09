import {
  getGsocProjectsByYear,
  getGsocYearOverview,
  getGsocYears,
} from "@/lib/gsoc";
import {
  getContributorsByYear,
  getOrgUrlByYear,
} from "@/data/gsoc-contributors";
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
  const projects = await getGsocProjectsByYear(year);
  const overview = await getGsocYearOverview(year);
  const contributors = getContributorsByYear(Number(year));
  const orgUrl = getOrgUrlByYear(Number(year));

  return (
    <GsocYearClient
      year={year}
      yearTitle={overview.title}
      yearContent={overview.content}
      projects={projects}
      contributors={contributors}
      orgUrl={orgUrl}
    />
  );
}
