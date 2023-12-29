import { Post } from "@/core/model/posts.model";
import Image from "next/image";
import Blogs from "../_componment/blogs";

export const dynamic = "force-dynamic";

async function getServerSideProps(context: any) {
  const id = context.params?.id;
  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();
  const post = data.data;

  return {
    props: {
      post,
    },
  };
}

async function fetchBlogs() {
  const response = await fetch("http://localhost:3000/api/blogs", {
    // cache: "force-cache", ///< SSG getStaticSideProps
    cache: "no-store", ///< SSR getServerSideProps
    // next: {
    //   revalidate: 20, ///< ISR revalidate
    // },
  });

  // await wait(4000);
  console.log("fetching Products");
  return response.json().then((data) => data.data);
}

export default async function Home() {
  const blogs = await fetchBlogs();

  return (
    <div className="p-10">
      <Blogs data={blogs} />
    </div>
  );
}
