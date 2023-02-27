<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col-9 m-auto my-5" v-if="account.id">
                <CreatePostForm/>
            </div>

            <div class="col-9 d-flex m-auto justify-content-center">
                <SearchForm/>
            </div>

            <div class="col-9 m-auto" v-if="posts">

                <div v-for="post in posts" class="mt-3 rounded shadow">
                    <PostCard :posts="post" />
                </div>

                <div v-if="posts.length == 0">
                    <h1 class="text-center">NO RESULTS FOUND</h1>
                </div>

                <div class="d-flex justify-content-center mt-3" v-if="postInfo && postInfo.totalPages > 1">
                    <button class="mx-2 btn btn-primary" :disabled="postInfo.newer == null"
                        @click="changeMainPage('previous')">Previous</button>
                    <button class="mx-2 btn btn-primary" :disabled="postInfo.older == null"
                        @click="changeMainPage('next')">NEXT</button>
                </div>

            </div>

            <div class="col-9 m-auto" v-if="profiles">
                <ProfileCard/>
            </div>

        </div>
    </div>
</template>

<script>
import { onMounted, computed, onUnmounted, onUpdated } from 'vue';
import { AppState } from '../AppState';
import { api } from '../services/AxiosService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsServices } from '../services/PostsServices'
import PostCard from '../components/PostCard.vue';
import CreatePostForm from '../components/CreatePostForm.vue';
import ProfileCard from '../components/ProfileCard.vue';
import SearchForm from '../components/SearchForm.vue';


export default {
    setup() {
        async function getAllPosts() {
            try {
                await postsServices.getAllPosts()
            }
            catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
        function clearPosts() {
            postsServices.clearPosts()
        }
        onMounted(() => {
            getAllPosts();
        });

        onUnmounted(() => {
            clearPosts()
        })
        onUpdated(() => {
            window.scroll(0, 0)
        })

        return {
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),
            profiles: computed(() => AppState.profiles),

            async changeMainPage(median) {
                try {
                    await postsServices.changeMainPage(median)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            },
            postInfo: computed(() => AppState.postInfo),
        };
    },
    components: { PostCard, CreatePostForm, ProfileCard, SearchForm }
}
</script>

<style scoped lang="scss">
.creator-img {
    height: 50px;
    width: 50px;
}

p {
    margin: 0;
}

.fs-small {
    font-size: 14px;
}
</style>
