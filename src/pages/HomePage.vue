<template>
    <div class="container">
        <div class="row mb-5">

            <div class="col-9 m-auto my-5" v-if="account.id">

                <div class="d-flex bg-secondary p-3">
                    <div>
                        <img :src="account.picture" alt="" class="img-fluid rounded-circle">
                    </div>
                    <div class="mx-5 mt-3 flex-grow-1">
                        <textarea class="bg-secondary p-1" placeholder="Share your thoughts"></textarea>
                        <div class="d-flex justify-content-between pt-2">
                            <button class="mdi mdi-attachment btn btn-info fs-4 d-flex align-items-center"><p class="fs-5 ms-2">Add Image</p></button>
                            <button class="mdi mdi-send btn btn-info fs-4" type="submit"></button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-9 m-auto" v-if="posts">

                <div v-for="post in posts" class="mt-3 border rounded border-1 border-primary">
                    <PostCard :posts="post" />
                </div>

                <div class="d-flex justify-content-center mt-3" v-if="postInfo && postInfo.totalPages > 1">
                    <button class="mx-2 btn btn-primary" :disabled="postInfo.newer == null"
                        @click="changeMainPage('previous')">Previous</button>
                    <button class="mx-2 btn btn-primary" :disabled="postInfo.older == null"
                        @click="changeMainPage('next')">NEXT</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import { api } from '../services/AxiosService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsServices } from '../services/PostsServices'
import PostCard from '../components/PostCard.vue';

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

        return {
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),

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
    components: { PostCard }
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

textarea{
    width: 100%;
    height: 150px;
    overflow-y: scroll;
    resize: none;
    border: 3px dashed black !important; 
}

.fs-small {
    font-size: 14px;
}

#post-header {
    background-color: rgba(202, 202, 202, 0.986);
}

#post-body {
    background-color: aliceblue;
}

#post-body-img {
    max-width: 90%;
}
</style>
