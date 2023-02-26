<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col-9 m-auto" v-if="posts">

                <div v-for="post in posts" class="mt-3 border rounded border-1 border-primary">
                    <PostCard :posts="post" />
                </div>

                <div class="d-flex justify-content-center mt-3" v-if="postInfo">
                    <button class="mx-2 btn btn-primary" :disabled="postInfo.newer == null" @click="changePage('previous')">Previous</button>
                    <button class="mx-2 btn btn-primary" :disabled="postInfo.older == null" @click="changePage('next')">NEXT</button>
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
        function clearPosts(){
            postsServices.clearPosts()
        }
        onMounted(() => {
            getAllPosts();
        });
        
        onUnmounted(()=>{
            clearPosts()
        })

        return {
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),
            
            async changePage(median){
                try {
                    await postsServices.changePage(median)
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
