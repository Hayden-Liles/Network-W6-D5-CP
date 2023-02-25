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
        AppState.posts = res.data.posts.map(e => new Post(e))
        
    }

    async getProfilePosts(profileId){
        const res = await api.get(`/api/profiles/${profileId}/posts`)
        AppState.posts = res.data.posts.map(e => new Post(e))
    }

    clearPosts(){
        AppState.posts = null
    }

}

export const postsServices = new PostsServices()