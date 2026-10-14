/** @format */

import { getReports } from "@/actions/reports";
import { CommunityStats } from "@/components/landing/community-stats";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { JoinCta } from "@/components/landing/join-cta";
import { RecentReports } from "@/components/landing/recent-reports";
import type { Report } from "@/types/api";

export const revalidate = 60;

export default async function Home() {
  const reports: Report[] = await getReports().catch(() => []);

  return (
    <>
      <Hero />
      {reports.length > 0 && <CommunityStats reports={reports} />}
      <HowItWorks />
      <RecentReports reports={reports.slice(0, 3)} />
      <JoinCta />
    </>
  );
}
