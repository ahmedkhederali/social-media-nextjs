import { Skeleton } from "@nextui-org/react";
export default function PostShowLoading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="w-full h-8" />
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-full h-48" />
        <div className="space-y-2">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-1/3 h-6" />
        </div>
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />

</div>
  );
}   

