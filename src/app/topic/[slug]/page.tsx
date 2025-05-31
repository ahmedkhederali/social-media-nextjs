import PostList from "@/Components/posts/post-list";
import PostCreateForm from "@/Components/topics/post-create-form";
import { getPostsByTopicSlug } from "@/db/queries/post";

interface SnippetPageProps {
  params: {
    slug: string;
  };
}
export default async function TopicShowPage({ params }: SnippetPageProps) {
  // asynchronous access of `params.id`.
  const { slug } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl m-2 font-bold">{slug}</h1>
        <PostList fetchPosts={()=>getPostsByTopicSlug(slug)}/>
        {/* <PostList fetchPosts={fetchPosts} /> */}
      </div>
      <div className="border border-gray-200 col-span-1 py-3 px-2 rounded-lg shadow-md">
        <PostCreateForm slug={slug}/>
      </div>
    </div>
  );
}
