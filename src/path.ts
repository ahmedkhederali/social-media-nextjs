const paths= {
  
    homePage(){
        return '/home'
    },

    topicShow(slug: string){
        return `/topic/${slug}`
    },
    postCreate(topicSlug: string){
        return `/topic/${topicSlug}/posts/new`
    },

    postShow(topicSlug: string, postId: string){
        return `/topic/${topicSlug}/posts/${postId}`
    },

}
export default paths;