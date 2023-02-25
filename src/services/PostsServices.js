import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Post } from "../models/Post"


class PostsServices{

    async getAllPosts(median){
        if(!median){
            median = 1
        }
        const res = await api.get(`/api/posts?page=${median}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(e => new Post(e))
        
    }

}

export const postsServices = new PostsServices()