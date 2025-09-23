"use client";


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Container } from "../components";
import PostCard from "../components/postCard";
// import appwriteService from "../appwrite/config";

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


const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalPostId, setModalPostId] = useState<string | null>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    // Load reports from localStorage
    const storedReports = localStorage.getItem("reports");
    if (storedReports) {
      setPosts(JSON.parse(storedReports));
    }
    // Listen for storage changes (optional, for multi-tab)
    const handleStorage = () => {
      const updatedReports = localStorage.getItem("reports");
      setPosts(updatedReports ? JSON.parse(updatedReports) : []);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Group posts by road (location)
  const groupByRoad = (posts: Post[]) => {
    const albums: { [road: string]: Post[] } = {};
    posts.forEach(post => {
      const road = post.road || "Unknown Road";
      if (!albums[road]) albums[road] = [];
      albums[road].push(post);
    });
    return albums;
  };

  // Show all submitted reports
  const albums = groupByRoad(posts);

  // Upvote handler: only allow one upvote per report per session, disables button after upvote
  const [upvotedReports, setUpvotedReports] = useState<string[]>([]);

  useEffect(() => {
    const upvoted = JSON.parse(localStorage.getItem("upvotedReports") || "[]");
    setUpvotedReports(upvoted);
  }, []);

  const handleUpvote = (postId: string) => {
    if (upvotedReports.includes(postId)) {
      return;
    }
    setPosts(prev => {
      const updated = prev.map(post => post.$id === postId ? { ...post, upvotes: (post.upvotes || 0) + 1 } : post);
      localStorage.setItem("reports", JSON.stringify(updated));
      const newUpvoted = [...upvotedReports, postId];
      localStorage.setItem("upvotedReports", JSON.stringify(newUpvoted));
      setUpvotedReports(newUpvoted);
      return updated;
    });
  };

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(albums).map(([road, posts]) => {
            // Album upvotes: sum upvotes of all posts in this album
            const albumUpvotes = posts.reduce((sum, p) => sum + (p.upvotes || 0), 0);
            return (
              <div key={road} className="rounded-2xl bg-white/90 shadow-xl border border-blue-200 p-4 flex flex-col">
                <h2 className="text-lg font-bold text-blue-800 mb-2 truncate">{posts[0].title}</h2>
                <div className="mb-2 text-gray-700 font-medium">Road: {road}</div>
                {posts.map(post => {
                  const isUpvoted = upvotedReports.includes(post.$id);
                  return (
                    <div key={post.$id} className="mb-4 p-2 rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                      <img
                        src={post.featuredImage || "/placeholder.png"}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-md mb-2"
                      />
                      <div className="text-sm text-gray-700 mb-1">Location: {post.location ? `Lat: ${post.location.lat}, Lng: ${post.location.lng}` : "Unknown"}</div>
                      <div className="text-sm text-gray-700 mb-1">Description: {post.content}</div>
                      <button
                        className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this report?")) {
                            setPosts(prev => {
                              const updated = prev.filter(p => p.$id !== post.$id);
                              localStorage.setItem("reports", JSON.stringify(updated));
                              return updated;
                            });
                          }
                        }}
                      >Delete</button>
                      <button
                        className={`mt-2 ml-2 px-4 py-1 rounded transition font-semibold text-white ${isUpvoted ? "bg-gray-400 cursor-not-allowed opacity-60" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={isUpvoted}
                        onClick={() => handleUpvote(post.$id)}
                      >{isUpvoted ? "Upvoted" : "Upvote"}</button>
                      <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold">Upvotes: {post.upvotes || 0}</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between mt-auto gap-2">
                  <button
                    className="px-3 py-1 text-xs rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                    onClick={() => handleUpvote(road)}
                  >
                    Upvote
                  </button>
                  <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold">Upvotes: {albumUpvotes}</span>
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 font-semibold">{posts[0].status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for image with edit/delete */}
        {modalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl p-6 relative max-w-xs w-full flex flex-col items-center">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl" onClick={() => setModalImage(null)}>&times;</button>
              <img src={modalImage} alt="Post" className="w-64 h-64 object-contain rounded-xl mb-4" />
              <div className="flex gap-4">
                {/* Edit and Delete buttons removed as functions are undefined */}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );


}

export default AllPosts;