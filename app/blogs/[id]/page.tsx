import { Post } from "@/core/model/posts.model";

//🌨️ Next.js 12 implementation
async function getStaticSideProps(context: any) {
  const id = context.params?.id;
  const postResponse = await fetch("http://localhost:3000/api/blogs?limit=150");
  const post = await postResponse.json();
  const data = post.data.posts;

  return {
    props: {
      data,
    },
  };
}

//Same as: getStaticPaths // ssr
export async function generateStaticParams() {
  const postsResponse = await fetch(
    "http://localhost:3000/api/blogs?limit=150"
  );

  const posts = await postsResponse.json();
  const data = posts.data.posts;

  return data.map((post: any) => ({
    id: String(post.id),
  }));
}

async function fetchPost(id: string) {
  const postResponse = await fetch(`http://localhost:3000/api/blogs/${id}`);

  console.log("Fetching blog post with id: ", id);
  const data = await postResponse.json();
  return data.data;
}

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const id = params.id;

  const post: Post = await fetchPost(id);

  console.log("Rerendering BlogPost component");

  return (
    <div className="flex flex-col p-12">
      <h1 className="text-5xl max-w-4xl font-bold leading-tight">
        {post.title}
      </h1>
      <article className="text-lg font-medium max-w-4xl mt-8 text-black">
        {post.body}
      </article>
    </div>
  );
}
