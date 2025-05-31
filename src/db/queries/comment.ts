import type { Comment } from "@prisma/client";
import {db} from '@/db'


export type commentWithData=(
    Comment & {
        user:{name : string | null , image:string | null}
    }
)

export async function getCommentsListByPostID(postId:string):Promise<commentWithData[]> {
    return db.comment.findMany({
        where:{
            postId
        },
        include:{
            user:{
                select:{
                    name:true,
                    image:true
                },
            },
        }
    })
}
