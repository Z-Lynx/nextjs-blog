"use client";

import { ApiResponse, Post } from "@/core/model/posts.model";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Blogs({ data }: { data: ApiResponse }) {
  const [dataApi, setDataApi] = useState<ApiResponse>(data);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts([...posts, ...dataApi.posts]);
  }, []);

  useEffect(() => {
    setPosts([...posts, ...dataApi.posts]);
  }, [dataApi]);

  return (
    <div className="w-full flex flex-col justify-start">
      {posts.map((post: Post) => (
        <Link
          key={post.id}
          href={`/blogs/${post.id}`}
          className="w-full space-y-6"
        >
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
              "https://dummyjson.com/blogs/?page=" + page
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
