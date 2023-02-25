<template>
    <div class="container">
        <div class="row">
            <div class="col-9 m-auto" v-if="posts">
                // FIXME make it so that alt changes error
                <div v-for="post in posts" class="mt-3 border rounded border-1 border-primary ">

                    <div class="">
                        <div class="d-flex align-items-center p-2 rounded-top" id="post-header">
                            <img :src="post.creator.picture" class="rounded-circle creator-img">
                            <div class="ps-3">
                                <p class="fw-semibold fs-4">{{ post.creator.name }}</p>
                                <p class="fw-light fs-small">{{ post.createdAt.split("T")[0] }}</p>
                            </div>
                        </div>
                        <div class="ps-3 py-3 rounded-bottom" id="post-body">
                            <p class="ps-5 py-2">{{ post.body }}</p>
                            <div class="text-center" v-if="post.imgUrl">
                                <img id="post-body-img" :src="post.imgUrl" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';
import { api } from '../services/AxiosService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsServices } from '../services/PostsServices'

export default {
    setup() {

        async function getAllPosts() {
            try {
                await postsServices.getAllPosts()
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }

        onMounted(() => {
            getAllPosts()
        })

        return {
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),

        }
    }
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
