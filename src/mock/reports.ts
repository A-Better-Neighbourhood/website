/** @format */

import { Report, ReportStatus } from "@/types/report";

export const mockReports: Report[] = [
  {
    id: "rpt-001",
    title: "Broken streetlight on Oak Avenue",
    description:
      "The streetlight at the corner of Oak Avenue and 3rd Street has been out for over a week. This creates a safety hazard for pedestrians walking at night, especially near the bus stop.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    location: [40.7128, -74.006], // NYC coordinates as example
    creator: "John D.",
    status: ReportStatus.PENDING,
    upvotes: 12,
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
  },
  {
    id: "rpt-002",
    title: "Large pothole on Main Street",
    description:
      "There's a significant pothole near 1247 Main Street that's damaging vehicle tires. It's about 2 feet wide and quite deep. Multiple residents have reported near-accidents trying to avoid it.",
    image: "https://images.unsplash.com/photo-1629654857040-4e1b7e9abb40?w=400&h=300&fit=crop",
    location: [40.7589, -73.9851],
    creator: "Sarah W.",
    status: ReportStatus.IN_PROGRESS,
    upvotes: 28,
    createdAt: "2024-01-12T14:22:00Z",
    updatedAt: "2024-01-18T10:15:00Z",
  },
  {
    id: "rpt-003",
    title: "Graffiti on community center wall",
    description:
      "Someone spray-painted inappropriate content on the east wall of the Riverside Community Center. This is visible from the children's playground and should be cleaned as soon as possible.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
    location: [40.7831, -73.9712],
    creator: "Mike R.",
    status: ReportStatus.RESOLVED,
    upvotes: 7,
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "rpt-004",
    title: "Overflowing trash bins in Central Park",
    description:
      "The trash bins near the main entrance of Central Park have been overflowing for several days. This is attracting rodents and creating an unsanitary environment for families with children.",
    image: "https://images.unsplash.com/photo-1586829135343-132950070391?w=400&h=300&fit=crop",
    location: [40.7851, -73.9683],
    creator: "Anonymous",
    status: ReportStatus.PENDING,
    upvotes: 15,
    createdAt: "2024-01-20T08:15:00Z",
    updatedAt: "2024-01-20T08:15:00Z",
  },
  {
    id: "rpt-005",
    title: "Dangerous tree branch hanging over sidewalk",
    description:
      "A large tree branch on Elm Street is hanging very low over the sidewalk after the recent storm. It's forcing pedestrians to walk in the street, which is dangerous with the heavy traffic.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    location: [40.7505, -73.9934],
    creator: "Emma J.",
    status: ReportStatus.IN_PROGRESS,
    upvotes: 22,
    createdAt: "2024-01-16T12:00:00Z",
    updatedAt: "2024-01-19T09:45:00Z",
  },
  {
    id: "rpt-006",
    title: "Broken playground equipment at Lincoln Elementary",
    description:
      "The swing set at Lincoln Elementary playground has two broken swings with exposed chains. This poses a safety risk to children. The school has requested community support to get this fixed.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    location: [40.7282, -74.0776],
    creator: "David C.",
    status: ReportStatus.PENDING,
    upvotes: 34,
    createdAt: "2024-01-22T07:30:00Z",
    updatedAt: "2024-01-22T07:30:00Z",
  },
  {
    id: "rpt-007",
    title: "Noise complaint - construction starting too early",
    description:
      "Construction crew at the new apartment building on 5th Avenue starts work at 6 AM daily, violating city noise ordinances. This is disturbing residents and violates the 7 AM start time rule.",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
    location: [40.7614, -73.9776],
    status: ReportStatus.RESOLVED,
    upvotes: 19,
    createdAt: "2024-01-10T06:30:00Z",
    updatedAt: "2024-01-17T15:20:00Z",
  },
  {
    id: "rpt-008",
    title: "Stray dog pack in residential area",
    description:
      "A pack of 3-4 stray dogs has been roaming the neighborhood around Maple Street for the past week. While they seem friendly, residents are concerned about safety, especially for children and elderly.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    location: [40.739, -74.0026],
    creator: "Lisa M.",
    status: ReportStatus.IN_PROGRESS,
    upvotes: 11,
    createdAt: "2024-01-18T11:15:00Z",
    updatedAt: "2024-01-21T14:00:00Z",
  },
  {
    id: "rpt-009",
    title: "Illegal dumping behind grocery store",
    description:
      "Someone has been illegally dumping furniture and household items behind Pete's Grocery on Washington Avenue. This is creating an eyesore and potentially attracting pests to the area.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    location: [40.7198, -74.0028],
    creator: "Robert T.",
    status: ReportStatus.PENDING,
    upvotes: 8,
    createdAt: "2024-01-21T13:45:00Z",
    updatedAt: "2024-01-21T13:45:00Z",
  },
  {
    id: "rpt-010",
    title: "Crosswalk signal not working",
    description:
      "The pedestrian crossing signal at the intersection of Broadway and 42nd Street is malfunctioning. The walk signal doesn't illuminate, making it dangerous for pedestrians to cross during rush hour.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    location: [40.759, -73.9845],
    status: ReportStatus.IN_PROGRESS,
    upvotes: 41,
    createdAt: "2024-01-14T17:20:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
];
