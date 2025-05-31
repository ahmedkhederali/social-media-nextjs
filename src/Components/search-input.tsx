'use client'
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as action from "@/actions"
export default function SearchInput() {
    const searchParams=useSearchParams()
  return (
    <form action={action.SearchInput}>
        <Input name="term" defaultValue={searchParams.get('term')|| ""}/>
    </form>
  )
}
