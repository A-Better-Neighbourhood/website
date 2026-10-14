/** @format */

"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search, SearchX, WifiOff } from "lucide-react";
import { EmptyNoticeboard } from "@/components/empty-noticeboard";
import { ReportCard } from "@/components/report-card";
import { ReportGridSkeleton } from "@/components/report-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useReports } from "@/hooks/reports/useReports";
import { ReportStatus, type Report } from "@/types/api";

const statusFilters = [
  { value: "all", label: "All" },
  { value: ReportStatus.PENDING, label: "Open" },
  { value: ReportStatus.IN_PROGRESS, label: "In progress" },
  { value: ReportStatus.RESOLVED, label: "Fixed" },
] as const;

const sorts = {
  newest: {
    label: "Newest first",
    compare: (a: Report, b: Report) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  },
  upvoted: {
    label: "Most upvoted",
    compare: (a: Report, b: Report) => b.upvotes - a.upvotes,
  },
};

type SortKey = keyof typeof sorts;

export function ReportsBrowser() {
  const { data: reports, isPending, isError, refetch, isRefetching } =
    useReports();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "all";
  const sort: SortKey = searchParams.get("sort") === "upvoted" ? "upvoted" : "newest";

  function setParam(key: string, value: string, fallback: string) {
    const params = new URLSearchParams(searchParams);
    if (!value || value === fallback) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const counts = useMemo(() => {
    const byStatus: Record<string, number> = { all: reports?.length ?? 0 };
    for (const report of reports ?? []) {
      byStatus[report.status] = (byStatus[report.status] ?? 0) + 1;
    }
    return byStatus;
  }, [reports]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (reports ?? [])
      .filter((r) => status === "all" || r.status === status)
      .filter(
        (r) =>
          !needle ||
          [r.title, r.description, r.category]
            .filter((text): text is string => Boolean(text))
            .some((text) => text.toLowerCase().includes(needle)),
      )
      .sort(sorts[sort].compare);
  }, [reports, query, status, sort]);

  const hasFilters = query !== "" || status !== "all";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <InputGroup className="sm:max-w-md">
            <InputGroupInput
              enterKeyHint="search"
              aria-label="Search reports"
              placeholder="Search potholes, streetlights, bins..."
              value={query}
              onChange={(e) => setParam("q", e.target.value, "")}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Select value={sort} onValueChange={(value) => setParam("sort", value, "newest")}>
            <SelectTrigger aria-label="Sort reports" className="sm:ml-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {Object.entries(sorts).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="-mx-4 overflow-x-auto px-4">
          <ToggleGroup
            type="single"
            variant="outline"
            size="lg"
            aria-label="Filter by status"
            value={status}
            onValueChange={(value) => value && setParam("status", value, "all")}
          >
            {statusFilters.map((filter) => (
              <ToggleGroupItem key={filter.value} value={filter.value}>
                {filter.label}
                {reports && (
                  <span className="tabular-nums opacity-70">
                    {counts[filter.value] ?? 0}
                  </span>
                )}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      {isPending ? (
        <ReportGridSkeleton />
      ) : isError ? (
        <Message
          icon={WifiOff}
          title="We couldn't load reports"
          description="Something went wrong on our side or your connection dropped. Give it another go."
          action={
            <Button variant="outline" onClick={() => refetch()} disabled={isRefetching}>
              <RotateCcw data-icon="inline-start" />
              Try again
            </Button>
          }
        />
      ) : reports.length === 0 ? (
        <EmptyNoticeboard />
      ) : visible.length === 0 ? (
        <Message
          icon={SearchX}
          title="Nothing matches that"
          description="Try a different word, or clear the filters to see every report."
          action={
            hasFilters && (
              <Button variant="outline" onClick={() => router.replace(pathname, { scroll: false })}>
                Clear filters
              </Button>
            )
          }
        />
      ) : (
        <>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Showing {visible.length} of {reports.length}{" "}
            {reports.length === 1 ? "report" : "reports"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Message({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card px-6 py-16 text-center">
      <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="size-7" />
      </span>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="max-w-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
