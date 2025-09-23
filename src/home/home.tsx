import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";

type Post = {
  $id: string;
  title: string;
  content: string;
  featuredImage?: string;
  status: "active" | "inactive";
  userId: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulate fetching posts with mock data
    const mockPosts: Post[] = [
      {
        $id: "1",
        title: "Report 1",
        content: "This is the first report.",
        featuredImage: "",
        status: "active",
        userId: "user1",
      },
      {
        $id: "2",
        title: "Report 2",
        content: "This is the second report.",
        featuredImage: "",
        status: "inactive",
        userId: "user2",
      },
    ];
    setPosts(mockPosts);
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-blue-50 to-blue-200 min-h-[400px] flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[300px] p-8 rounded-2xl shadow-lg bg-white/80 border border-blue-100">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-3 tracking-tight drop-shadow">No Reports Yet</h1>
            <p className="text-lg text-gray-600 mb-6">Be the first to add a report and help your neighbourhood!</p>
            <a href="/addReport" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">Add Report</a>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gradient-to-br from-blue-50 to-blue-200 min-h-[600px]">
      <Container>
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center tracking-tight drop-shadow">Latest Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl">
              <PostCard {...post} featuredImage={post.featuredImage || ""} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;