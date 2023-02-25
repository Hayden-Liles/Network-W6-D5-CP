<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col-10 m-auto mt-3" v-if="profile">

                <div class="profile-info-body p-2">
                    <div class="move-bottom-up">
                        <img :src="profile.coverImg" alt="" class="img-fluid cover-img">
                        <img :src="profile.picture" alt="" class="profile-img rounded-circle">
                        <a :href="profile.github" v-if="profile.github"><i class="mdi mdi-github fs-1"></i></a>
                        <a :href="profile.linkedin" v-if="profile.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
                        <a :href="profile.resume" v-if="profile.resume"><i class="mdi mdi-file-account fs-1"></i></a>
                    </div>

                    <div class="mb-3">
                        <p class="fs-2 fw-bold">{{ profile.name }}</p>
                        <p>{{ profile.class }} <i :class="profile.graduated ? 'mdi mdi-check-box' : ''"></i></p>
                    </div>
                    <div class="ms-3">
                        <p>{{ profile.bio }}</p>
                    </div>

                </div>

            </div>

            <div class="col-9 m-auto" v-if="posts">
                <div v-for="post in posts" class="mt-3 border rounded border-1 border-primary ">
                    <PostCard :posts="post" />
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import { profilesService } from '../services/ProfilesService'
import { postsServices } from '../services/PostsServices';
import PostCard from '../components/PostCard.vue';
import { AppState } from '../AppState';

export default {
    setup() {
        const route = useRoute();
        async function getProfileById() {
            const profileId = route.params.profileId;
            await profilesService.getProfileById(profileId);
        }
        async function getProfilesPosts() {
            const profileId = route.params.profileId;
            await postsServices.getProfilePosts(profileId);
        }
        onMounted(() => {
            getProfileById();
            getProfilesPosts();
        });
        return {
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.curProfile),
        };
    },
    components: { PostCard }
}
</script>


<style lang="scss" scoped>
p {
    margin: 0;
}

.cover-img {
    height: 300px;
    width: 100%;
}

.profile-img {
    height: 150px;
    width: 150px;
    background-color: rgb(62, 62, 62);
    transform: translate(20px, -75px);
}

.profile-info-body {
    background-color: rgb(193, 192, 192);
}

.move-bottom-up{
    margin-bottom: -50px;
}
</style>