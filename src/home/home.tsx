import React, { useEffect, useState } from "react";
import { Container } from "../components";

interface Post {
  $id: string;
  title: string;
  content: string;
  featuredImage?: string;
  status: "active" | "inactive";
  userId: string;
  location?: { lat: number; lng: number };
  road?: string;
  upvotes?: number;
}

const getDistance = (loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }) => {
  // Haversine formula for distance in km
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation(null)
    );
    // Load reports from localStorage
    const storedReports = localStorage.getItem("reports");
    if (storedReports) setPosts(JSON.parse(storedReports));
    const handleStorage = () => {
      const updatedReports = localStorage.getItem("reports");
      setPosts(updatedReports ? JSON.parse(updatedReports) : []);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Filter nearby reports (within 10km)
  const nearbyPosts = userLocation
    ? posts.filter(
        post =>
          post.location &&
          getDistance(userLocation, post.location) <= 10
      )
    : [];

  // Group by road/album
  const groupByRoad = (posts: Post[]) => {
    const albums: { [road: string]: Post[] } = {};
    posts.forEach(post => {
      const road = post.road || "Unknown Road";
      if (!albums[road]) albums[road] = [];
      albums[road].push(post);
    });
    return albums;
  };

  const albums = groupByRoad(nearbyPosts);

  return (
    <div className="w-full py-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          Nearby Reports
        </h1>
        {!userLocation && (
          <div className="mb-6 text-center text-gray-500">
            <span>Enable location to see nearby reports.</span>
          </div>
        )}
        {Object.keys(albums).length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-8 rounded-2xl shadow-lg bg-white/80 border border-gray-100">
            <span className="text-lg text-gray-600">No nearby reports found.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {Object.entries(albums).map(([road, posts]) => (
              <div key={road} className="rounded-2xl bg-white shadow-xl border border-gray-100 p-4">
                <h2 className="text-xl font-bold text-gray-700 mb-4">{road}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {posts.map(post => (
                    <div
                      key={post.$id}
                      className="rounded-xl bg-gray-50 shadow border border-gray-200 p-4 flex flex-col"
                    >
                      <img
                        src={post.featuredImage || "/placeholder.png"}
                        alt={post.title}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow mb-2"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{post.title}</h3>
                      <div className="text-xs text-gray-500 mb-2">{post.status}</div>
                      <div className="mb-1 text-gray-700 font-medium">
                        <span className="font-semibold">Location:</span>{" "}
                        {post.location ? `Lat: ${post.location.lat}, Lng: ${post.location.lng}` : "Unknown"}
                      </div>
                      <div className="mb-2 text-gray-700">
                        <span className="font-semibold">Description:</span> {post.content}
                      </div>
                      <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-blue-700 font-semibold mt-auto">
                        Upvotes: {post.upvotes || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;