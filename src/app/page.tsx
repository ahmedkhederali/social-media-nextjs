import TopicCreateForm from "@/Components/topics/topic-create-form";
import { Divider } from "@nextui-org/react";
import { getTopPostsByTopicSlug } from "@/db/queries/post";
import PostList from "@/Components/posts/post-list";
import TopicList from "@/Components/topics/topic-list";
export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <div className="text-xl m-2">Top Posts</div>
        <PostList fetchPosts={getTopPostsByTopicSlug}/>
      </div>
      <div className="border border-gray-200 col-span-1 py-3 px-2 rounded-lg shadow-md">
        <TopicCreateForm />
        <Divider className="my-4" />
        <div className="text-xl m-2">Topics</div>
        <TopicList />
      </div>
    </div>
  );
}
