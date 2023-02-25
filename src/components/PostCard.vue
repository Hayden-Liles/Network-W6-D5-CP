<template>

    <div class="">
            <div class="d-flex align-items-center p-2 rounded-top" id="post-header">
                <router-link :to="{name: 'Profile', params : {profileId: posts.creatorId}}">
                    <img :src="posts.creator.picture" class="rounded-circle creator-img">
                </router-link>
                    <div class="ps-3">
                    <p class="fw-semibold fs-4">{{ posts.creator.name }}</p>
                    <p class="fw-light fs-small">{{ posts.createdAt.split("T")[0] }}</p>
                </div>
            </div>
            <div class="ps-3 py-3 rounded-bottom" id="post-body">
                <p class="ps-5 py-2">{{ posts.body }}</p>
                <div class="text-center" v-if="posts.imgUrl">
                    <img id="post-body-img" :src="posts.imgUrl" />
                </div>
            </div>
        </div>

</template>


<script>
import { Post } from '../models/Post';

export default {
    props:{
        posts:
        {
            type: Post,
            required: true
        }
    },
    setup() {
        return {

        }
    }
}
</script>


<style lang="scss" scoped>
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