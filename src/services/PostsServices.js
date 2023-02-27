import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Post } from "../models/Post"


class PostsServices {

    async getAllPosts() {
        const res = await api.get(`/api/posts`)
        AppState.profiles = null
        AppState.postInfo = {
            newer: res.data.newer || null,
            older: res.data.older || null,
            page: Number(res.data.page[0]) || null,
            totalPages: res.data.totalPages || null
        }
        AppState.posts = res.data.posts.map(e => new Post(e))

    }

    async changeMainPage(median) {

        if (median == "next" && AppState.postInfo.older != null) {

            AppState.postInfo.page += 1
            const res = await api.get(`/api/posts?page=${AppState.postInfo.page}`)
            AppState.posts = res.data.posts.map(e => new Post(e))
            const newInfo = {
                newer: res.data.newer,
                older: res.data.older,
                page: Number(res.data.page[0]) || null,
                totalPages: res.data.totalPages || null
            }
            AppState.postInfo = newInfo


        } else if (median == 'previous' && AppState.postInfo.newer != '') {
            AppState.postInfo.page -= 1
            const res = await api.get(`/api/posts?page=${AppState.postInfo.page}`)
            AppState.posts = res.data.posts.map(e => new Post(e))
            const newInfo = {
                newer: res.data.newer,
                older: res.data.older,
                page: Number(res.data.page[0]) || null,
                totalPages: res.data.totalPages || null
            }
            AppState.postInfo = newInfo
        }

    }

    async changeProfilePage(median) {
        const profileId = AppState.curProfile.id
        if (median == "next" && AppState.postInfo.older != null) {

            AppState.postInfo.page += 1
            const res = await api.get(`https://bcw-sandbox.herokuapp.com/api/profiles/${profileId}/posts?page=${AppState.postInfo.page}`)
            AppState.posts = res.data.posts.map(e => new Post(e))
            const newInfo = {
                newer: res.data.newer,
                older: res.data.older,
                page: Number(res.data.page[0]) || null,
                totalPages: res.data.totalPages || null
            }
            AppState.postInfo = newInfo
        } else if (median == 'previous' && AppState.postInfo.newer != '') {

            AppState.postInfo.page -= 1
            const res = await api.get(`https://bcw-sandbox.herokuapp.com/api/profiles/${profileId}/posts?page=${AppState.postInfo.page}`)
            AppState.posts = res.data.posts.map(e => new Post(e))
            const newInfo = {
                newer: res.data.newer,
                older: res.data.older,
                page: Number(res.data.page[0]) || null,
                totalPages: res.data.totalPages || null
            }
            AppState.postInfo = newInfo
        }

    }

    async getProfilePosts(profileId) {
        const res = await api.get(`/api/profiles/${profileId}/posts`)
        AppState.posts = res.data.posts.map(e => new Post(e))
        AppState.postInfo = {
            newer: res.data.newer || null,
            older: res.data.older || null,
            page: Number(res.data.page[0]) || null,
            totalPages: res.data.totalPages || null
        }
    }

    clearPosts() {
        AppState.posts = null
        AppState.postInfo = null
    }

    async createPost(postData) {
        postData.creatorId = AppState.account.id
        let newPost = new Post(postData)
        const res = await api.post('/api/posts', newPost)
        AppState.posts.splice(19, 1)
        newPost = new Post(res.data)
        AppState.posts = [newPost, ...AppState.posts]
    }

    async submitLike(post, accountId){
        const res = await api.post(`/api/posts/${post.id}/like`, accountId)
        const postIndex = AppState.posts.findIndex(e => e.id == post.id)
        AppState.posts[postIndex] = new Post(res.data)
    }

    async deletePost(post){
        await api.delete(`/api/posts/${post.id}`)
        const postIndex = AppState.posts.findIndex(e => e.id == post.id)
        AppState.posts.splice(postIndex, 1)
    }

}


export const postsServices = new PostsServices()