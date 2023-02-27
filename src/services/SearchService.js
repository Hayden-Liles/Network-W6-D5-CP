import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SearchService {

    async querySearchPosts(postQuery){
        AppState.profiles = null
        const res = await api.get(`/api/posts?query=${postQuery.query}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(e => new Post(e))
        AppState.postInfo = {
            newer: res.data.newer || null,
            older: res.data.older || null,
            page: Number(res.data.page[0]) || null,
            totalPages: res.data.totalPages || null
        }
    }

    async querySearchProfiles(postQuery){
        const res = await api.get(`/api/profiles?query=${postQuery.query}`)
        logger.log(res.data)
        AppState.posts = null
        AppState.profiles = res.data
        AppState.postInfo = {
            type: "profile"
        }
    }

}

export const searchService = new SearchService()