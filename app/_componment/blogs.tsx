"use client";

import { ApiResponse, Post } from "@/core/model/posts.model";
import Link from "next/link";
import React from "react";

export default function Blogs({ data }: { data: ApiResponse }) {
  const [dataApi, setDataApi] = React.useState<ApiResponse>(data);
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    setPosts([...posts, ...dataApi.posts]);
  }, [dataApi]);

  return (
    <div className="w-full flex flex-col justify-start">
      {posts.map((post: Post) => (
        <Link href={`/blogs/${post.id}`} className="w-full space-y-6">
          <div className="text-start">
            {post.id}. {post.title}
          </div>
        </Link>
      ))}
      {posts.length > 0 && (
        <button
          onClick={async () => {
            const page: number = dataApi.skip / 10 + 1;

            const response = await fetch(
              "http://localhost:3000/api/blogs/?page=" + page
            );
            const res = await response.json();
            setDataApi(res.data);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

/* 
0->10  // skip 0
10->20 // skip 10
20->30 // skip 20
*/
