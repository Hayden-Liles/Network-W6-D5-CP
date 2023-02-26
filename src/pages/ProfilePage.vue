<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col-10 m-auto mt-3" v-if="profile">

                <div class="profile-info-body p-2">
                    <div class="move-bottom-up">
                        <img :src="profile.coverImg" alt="" class="img-fluid cover-img"
                            @error="fixImage(profile, 'coverImg')">
                        <img :src="profile.picture" alt="" class="profile-img rounded-circle"
                            @error="fixImage(profile, 'profileImg')">
                        <a :href="profile.github" v-if="profile.github"><i class="mdi mdi-github fs-1"></i></a>
                        <a :href="profile.linkedin" v-if="profile.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
                        <a :href="profile.resume" v-if="profile.resume"><i class="mdi mdi-file-account fs-1"></i></a>
                    </div>

                    <div class="mb-3">
                        <p class="fs-2 fw-bold">{{ profile.name }}</p>
                        <p v-if="profile.class">{{ profile.class }} <i
                                :class="profile.graduated ? 'mdi mdi-checkbox-marked' : ''"></i></p>
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

            <div class="d-flex justify-content-center mt-3" v-if="postInfo && postInfo.totalPages > 1">
                <button class="mx-2 btn btn-primary" :disabled="postInfo.newer == null"
                    @click="changeProfilePage('previous')">Previous</button>
                <button class="mx-2 btn btn-primary" :disabled="postInfo.older == null"
                    @click="changeProfilePage('next')">NEXT</button>
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
            postInfo: computed(() => AppState.postInfo),
            
            fixImage(profile, what) {
                if (what == "profileImg") {
                    profile.picture = 'data:image/png;base64,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'
                    logger.error(`${profile.name}'s profile Image has been replaced`)
                } else if (what == "coverImg") {
                    profile.coverImg = 'data:image/png;base64,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'
                    logger.error(`${profile.name}'s post Image has been replaced`)
                }
            },

            async changeProfilePage(median){
                try {
                    await postsServices.changeProfilePage(median)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            },

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

.move-bottom-up {
    margin-bottom: -50px;
}
</style>