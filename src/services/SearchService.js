import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SearchService {

    async querySearchPosts(postQuery){
        AppState.profiles = null
        const res = await api.get(`/api/posts?query=${postQuery.query}`)
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
        AppState.posts = null
        AppState.profiles = res.data
        this.checkLinks()
        AppState.postInfo = {
            type: "profile"
        }
    }

    async checkLinks(){
        AppState.profiles.forEach(e => {
            if(!e.github.includes("https://") && e.github != ''){
                e.github = ''
                logger.error(`${e.name}'s Github link is Invalid`)
            }
            if(!e.linkedin.includes("https://") && e.linkedin != ''){
                e.linkedin = ''
                logger.error(`${e.name}'s LinkedIn link is Invalid`)

            }
            if(!e.resume.includes("https://") && e.resume != ''){
                e.resume = ''
                logger.error(`${e.name}'s Resume link is Invalid`)
            }
        });
    }

}

export const searchService = new SearchService()