import Link from "next/link";

import paths from "@/path";
import PostShow from "@/Components/posts/post-show";
import CommentCreateForm from "@/Components/comments/comment-create-form";
import CommentList from "@/Components/comments/comment-list";
import { getCommentsListByPostID } from "@/db/queries/comment";
import { Suspense } from "react";
import PostShowLoading from "@/Components/posts/post-show-loading";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  
  const { slug, postId } = await params;
  
  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading/>}>
        <PostShow postId={postId}/>
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchComments={()=>getCommentsListByPostID(postId)} />
    </div>
  );
}
