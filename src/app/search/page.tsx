import { redirect } from "next/navigation";
import PostList from "@/Components/posts/post-list";
import { fetchPostBySearch } from "@/db/queries/post";
interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function SearchPage({searchParams}: SearchPageProps) {
  const { term } = await searchParams;
  if(!term){
    redirect('/')
  }
  return<div>
    <PostList fetchPosts={()=>fetchPostBySearch(term)}/>
  </div>
}
