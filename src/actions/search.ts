'use server'
import { redirect } from "next/navigation"

export  async function SearchInput(formData: FormData){
    console.log("formData",formData)
    const term=formData.get("term");
    if(typeof term !=='string'  && !term ){
        redirect("/")
    }

    redirect(`/search?term=${term}`)
}