import type { Post } from '@prisma/client';
import {db} from '@/db';

export type PostWithData =(Post & {  // this mean Post with extra data (combined with Post)
    topic:{slug:string};
    user:{name:string |null };
    _count:{comments:number};
} )
    
export async function fetchPostBySearch(term:string):Promise<PostWithData[]>{

    return db.post.findMany({
        include:{
            topic:{
                select:{
                    slug:true,
                },
            },
            user:{
                select:{
                    name:true,
                },
            },
            _count:{
                select:{
                    comments:true,
                },
            },
        },
        where:{
            OR:[
                {title:{contains:term}},
                {content:{contains:term}}
            ]
        }
    })
}

/**
 * export type PostWithData = Awaited<ReturnType<typeof getPostsByTopicSlug>>[number]; // this mean Post with extra data (combined with Post)
 */
export async function getPostsByTopicSlug(slug:string):Promise<PostWithData[]>{
    return db.post.findMany({
        where:{
            topic:{
                slug,
            },
        },
        include:{
            topic:{
                select:{
                    slug:true,
                },
            },
            user:{
                select:{
                    name:true,
                },
            },
            _count:{
                select:{
                    comments:true,
                },
            },
        },
    });
}
// get Y=top POst based on count in comments
export async function getTopPostsByTopicSlug():Promise<PostWithData[]>{
    return db.post.findMany({
        orderBy:[
            {
            comments:{
                _count:'desc',
            },
        }
    ],
    include:{
        topic:{ 
            select:{
                slug:true,
            },
        },
        user:{
            select:{
                name:true,
            },
        },
        _count:{
            select:{
                comments:true,
            },
        },  
    },
    take:5,
})
}