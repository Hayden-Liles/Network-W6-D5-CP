import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Post } from "../models/Post"


class PostsServices {

    async getAllPosts() {
        const res = await api.get(`/api/posts`)
        AppState.postInfo = {
            newer: res.data.newer || null,
            older: res.data.older || null,
            page: Number(res.data.page[0]) || null
        }
        AppState.posts = res.data.posts.map(e => new Post(e))

    }

    async changePage(median) {

        if (median == "next" && AppState.postInfo.newer != '') {
            
            AppState.postInfo.page += 1
            const res = await api.get(`/api/posts?page=${AppState.postInfo.page}`)
            AppState.posts = res.data.posts.map(e => new Post(e))
            const newInfo = {
                newer: res.data.newer,
                older: res.data.older,
                page: Number(res.data.page[0]) || null
            }
            AppState.postInfo = newInfo

            
        }else if(median == 'previous'){
            AppState.postInfo.page -= 1
            const res = await api.get(`/api/posts?page=${AppState.postInfo.page}`)
            AppState.posts = res.data.posts.map(e => new Post(e))
            const newInfo = {
                newer: res.data.newer,
                older: res.data.older,
                page: Number(res.data.page[0]) || null
            }
            AppState.postInfo = newInfo
        }

    }

    async getProfilePosts(profileId) {
        const res = await api.get(`/api/profiles/${profileId}/posts`)
        AppState.posts = res.data.posts.map(e => new Post(e))
    }

    clearPosts() {
        AppState.posts = null
    }

}

export const postsServices = new PostsServices()