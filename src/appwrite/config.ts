export interface Post {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  featuredMap?: string;
  status: "active" | "inactive";
  userId: string;
  location?: { lat: number; lng: number };
}

export interface PostInput {
  title: string;
  slug: string;
  content: string;
  status: "active" | "inactive";
  featuredImage?: string;
  userId: string;
  location?: { lat: number; lng: number };
}