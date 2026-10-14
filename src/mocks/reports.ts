/** @format */

/**
 * Temporary in-memory data so the UI can be explored without the backend.
 * Opt in with NEXT_PUBLIC_USE_MOCKS=true (development only); the real API is used otherwise.
 * Mutations (upvote, comment, resolve, create) update this store until the page reloads.
 */

import {
  ActivityType,
  ActorType,
  ReportStatus,
  UserRole,
  type Creator,
  type Report,
  type ReportActivity,
  type User,
} from "@/types/api";

export const USE_MOCKS =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_USE_MOCKS === "true";

const HOUR = 3600 * 1000;
const ago = (hours: number) => new Date(Date.now() - hours * HOUR).toISOString();
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
const clone = <T>(value: T): T => structuredClone(value);

export const mockUser: User = {
  id: "user-you",
  fullName: "Kunal Rana",
  address: "12 Lake View Road",
  contactNo: "9876543210",
  createdAt: ago(24 * 90),
};

const you: Creator = { id: mockUser.id, fullName: mockUser.fullName, role: UserRole.USER };
const priya: Creator = { id: "user-priya", fullName: "Priya Sharma", role: UserRole.USER };
const arjun: Creator = { id: "user-arjun", fullName: "Arjun Mehta", role: UserRole.USER };
const meera: Creator = { id: "user-meera", fullName: "Meera Iyer", role: UserRole.USER };
const works: Creator = { id: "auth-works", fullName: "Ward 14 Public Works", role: UserRole.AUTHORITY };

const report = (r: Omit<Report, "duplicateCount" | "hasLiked"> & Partial<Report>): Report => ({
  duplicateCount: 0,
  hasLiked: false,
  ...r,
});

const reports: Report[] = [
  report({
    id: "rep-a1b2c3",
    title: "Large pothole near the bus stop on Park Road",
    description:
      "There's a deep pothole right where the buses pull in. Two scooters have already skidded on it this week, and after rain it fills up so you can't see how deep it is.\n\nIt's on the left side heading towards the market, just past the chemist.",
    imageUrl: ["/mocks/pothole.svg", "/mocks/drain.svg"],
    latitude: 28.6139,
    longitude: 77.209,
    category: "ROAD_ISSUE",
    status: ReportStatus.IN_PROGRESS,
    createdAt: ago(72),
    creator: priya,
    upvotes: 24,
    duplicateCount: 2,
  }),
  report({
    id: "rep-d4e5f6",
    title: "Streetlight out on the corner of 5th Cross",
    description: "The light at the corner has been out for over a week. The lane is pitch dark after 7pm.",
    imageUrl: ["/mocks/streetlight.svg"],
    latitude: 28.6145,
    longitude: 77.2101,
    category: "STREET_LIGHT",
    status: ReportStatus.RESOLVED,
    createdAt: ago(30),
    creator: arjun,
    upvotes: 9,
  }),
  report({
    id: "rep-g7h8i9",
    title: "Overflowing bins behind the market",
    description: "Bins haven't been cleared since the weekend. Stray dogs are pulling bags onto the road.",
    imageUrl: ["/mocks/bins.svg"],
    latitude: 28.6128,
    longitude: 77.2079,
    category: "GARBAGE",
    status: ReportStatus.IN_PROGRESS,
    createdAt: ago(200),
    creator: meera,
    upvotes: 41,
  }),
  report({
    id: "rep-j1k2l3",
    title: "Broken bench in Lake View park",
    description: "One of the benches near the walking track has a snapped plank. Kids climb on it.",
    imageUrl: ["/mocks/park.svg"],
    latitude: 28.6152,
    longitude: 77.2085,
    category: "OTHER",
    status: ReportStatus.PENDING,
    createdAt: ago(50),
    creator: you,
    upvotes: 3,
  }),
  report({
    id: "rep-m4n5o6",
    title: "Blocked drain flooding the lane",
    description: "Every time it rains the drain backs up and the whole lane floods ankle deep.",
    imageUrl: ["/mocks/drain.svg"],
    latitude: 28.6133,
    longitude: 77.2112,
    category: "WATER_LEAK",
    status: ReportStatus.PENDING,
    createdAt: ago(8),
    creator: arjun,
    upvotes: 17,
  }),
  report({
    id: "rep-p7q8r9",
    title: "Fallen branch blocking the footpath",
    description: "A large branch came down in last night's storm and blocks the whole footpath.",
    imageUrl: ["/mocks/tree.svg"],
    latitude: 28.6121,
    longitude: 77.2095,
    category: "ROAD_ISSUE",
    status: ReportStatus.PENDING,
    createdAt: ago(3),
    creator: meera,
    upvotes: 6,
  }),
  report({
    id: "rep-s1t2u3",
    title: "Graffiti on the community hall wall",
    description: "Someone sprayed over the mural on the side wall of the community hall.",
    imageUrl: [],
    latitude: 28.6149,
    longitude: 77.2072,
    category: "OTHER",
    status: ReportStatus.RESOLVED,
    createdAt: ago(400),
    creator: priya,
    upvotes: 5,
  }),
  report({
    id: "rep-v4w5x6",
    title: "Loose manhole cover outside school gate",
    description: "The manhole cover rocks when cars go over it. Right where kids cross in the morning.",
    imageUrl: [],
    latitude: 28.6137,
    longitude: 77.2068,
    category: "ROAD_ISSUE",
    status: ReportStatus.PENDING,
    createdAt: ago(20),
    creator: you,
    upvotes: 12,
  }),
];

let nextId = 1;
const activity = (
  type: ActivityType,
  actorType: ActorType,
  createdBy: Creator | null,
  hoursAgo: number,
  extra: Partial<ReportActivity> = {},
): ReportActivity => ({
  id: `act-${nextId++}`,
  type,
  actorType,
  createdBy,
  content: "",
  images: [],
  createdAt: ago(hoursAgo),
  ...extra,
});

const activities: Record<string, ReportActivity[]> = {
  "rep-a1b2c3": [
    activity(ActivityType.REPORT_CREATED, ActorType.SYSTEM, priya, 72),
    activity(ActivityType.USER_COMMENTED, ActorType.USER, arjun, 70, {
      content: "Same here, nearly lost my front wheel in it yesterday evening. Added a photo from after the rain.",
      images: ["/mocks/drain.svg"],
    }),
    activity(ActivityType.DUPLICATE_MERGED, ActorType.SYSTEM, null, 60),
    activity(ActivityType.UPVOTE_MILESTONE, ActorType.SYSTEM, null, 40, {
      content: "This report has reached 10 upvotes!",
    }),
    activity(ActivityType.AUTHORITY_COMMENTED, ActorType.AUTHORITY, works, 30, {
      content: "Thanks for flagging this. We've inspected the spot and scheduled a patch repair. The crew will be there on Monday morning.",
    }),
    activity(ActivityType.STATUS_UPDATED, ActorType.AUTHORITY, works, 29.9, {
      oldStatus: ReportStatus.PENDING,
      newStatus: ReportStatus.IN_PROGRESS,
    }),
    activity(ActivityType.USER_COMMENTED, ActorType.USER, meera, 6, {
      content: "Saw cones and barricades go up this afternoon. Fingers crossed!",
    }),
  ],
  "rep-d4e5f6": [
    activity(ActivityType.REPORT_CREATED, ActorType.SYSTEM, arjun, 30),
    activity(ActivityType.STATUS_UPDATED, ActorType.AUTHORITY, works, 20, {
      oldStatus: ReportStatus.PENDING,
      newStatus: ReportStatus.IN_PROGRESS,
    }),
    activity(ActivityType.MARKED_RESOLVED, ActorType.AUTHORITY, works, 4),
    activity(ActivityType.USER_COMMENTED, ActorType.USER, arjun, 2, {
      content: "Working again tonight. Thank you!",
    }),
  ],
  "rep-g7h8i9": [
    activity(ActivityType.REPORT_CREATED, ActorType.SYSTEM, meera, 200),
    activity(ActivityType.UPVOTE_MILESTONE, ActorType.SYSTEM, null, 150, {
      content: "This report has reached 10 upvotes!",
    }),
    activity(ActivityType.STATUS_UPDATED, ActorType.AUTHORITY, works, 100, {
      oldStatus: ReportStatus.PENDING,
      newStatus: ReportStatus.IN_PROGRESS,
    }),
  ],
};

function findReport(id: string) {
  const found = reports.find((r) => r.id === id);
  if (!found) throw Object.assign(new Error("Report not found"), { status: 404 });
  return found;
}

function addActivity(reportId: string, entry: ReportActivity) {
  (activities[reportId] ??= [
    activity(ActivityType.REPORT_CREATED, ActorType.SYSTEM, findReport(reportId).creator, 0),
  ]).push(entry);
}

export const mockApi = {
  async getReports() {
    await delay();
    return clone(reports);
  },
  async getReportById(id: string) {
    await delay();
    return clone(findReport(id));
  },
  async getReportActivities(id: string) {
    await delay(500);
    findReport(id);
    return clone(activities[id] ?? []);
  },
  async getUserReports() {
    await delay();
    return clone(reports.filter((r) => r.creator.id === mockUser.id));
  },
  async upvote(id: string) {
    await delay();
    const target = findReport(id);
    if (target.hasLiked) {
      throw Object.assign(new Error("Already upvoted"), { status: 400 });
    }
    target.upvotes += 1;
    target.hasLiked = true;
    if ([10, 50, 100, 500, 1000].includes(target.upvotes)) {
      addActivity(
        id,
        activity(ActivityType.UPVOTE_MILESTONE, ActorType.SYSTEM, null, 0, {
          content: `This report has reached ${target.upvotes} upvotes!`,
        }),
      );
    }
  },
  async addComment(id: string, text: string, images: string[] = []) {
    await delay();
    findReport(id);
    const entry = activity(ActivityType.USER_COMMENTED, ActorType.USER, you, 0, {
      content: text,
      images,
    });
    addActivity(id, entry);
    return clone(entry);
  },
  async resolve(id: string) {
    await delay();
    const target = findReport(id);
    target.status = ReportStatus.RESOLVED;
    addActivity(id, activity(ActivityType.MARKED_RESOLVED, ActorType.USER, you, 0));
    return clone(target);
  },
  async create(input: {
    title: string;
    description: string;
    image: string;
    location: [number, number];
  }) {
    await delay(600);
    const created = report({
      id: `rep-${Math.random().toString(36).slice(2, 8)}`,
      title: input.title,
      description: input.description,
      imageUrl: input.image ? [input.image] : [],
      latitude: input.location[0],
      longitude: input.location[1],
      category: "OTHER",
      status: ReportStatus.PENDING,
      createdAt: new Date().toISOString(),
      creator: you,
      upvotes: 0,
    });
    reports.unshift(created);
    activities[created.id] = [
      activity(ActivityType.REPORT_CREATED, ActorType.SYSTEM, you, 0),
    ];
    return { report: clone(created), merged: false };
  },
  async getProfile() {
    await delay(150);
    return clone(mockUser);
  },
};
