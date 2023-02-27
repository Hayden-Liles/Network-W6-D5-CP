<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="bg-primary px-2 py-1" v-if="account.id">
                    <div class="mt-4 rounded-circle text-center">
                        <!-- STUB Profile Picture -->
                        <router-link :to="{ name: 'Profile', params: { profileId: account.id } }">
                            <img :src="account.picture" alt="" class="img-fluid rounded-circle" id="profilePicture"
                                @click="changeProfile(account.id)">
                            <!-- STUB Profile Name -->
                        </router-link>
                        <p class="fs-3 fw-bold"><u>{{ account.name }}</u></p>

                        <p v-if="account.class">{{ account.class }} <i
                                :class="account.graduated ? 'mdi mdi-checkbox-marked' : ''"></i></p>

                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="d-flex align-items-center justify-content-center" v-if="account.github">
                            <a :href="account.github"><i class="mdi mdi-github fs-1"></i></a>
                        </div>
                        <div class="d-flex align-items-center justify-content-center" v-if="account.linkedin">
                            <a :href="account.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
                        </div>
                        <div class="d-flex align-items-center justify-content-center" v-if="account.resume">
                            <a :href="account.resume"><i class="mdi mdi-file-account fs-1"></i></a>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="ad in ads">
                        <a :href="'https://'+ ad.linkURL"><img :src="ad.tall" class="img-fluid mt-2"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import AccountPage from '../pages/AccountPage.vue';
import { postsServices } from '../services/PostsServices';
import { profilesService } from '../services/ProfilesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { adsService } from '../services/AdsService'

export default {
    setup() {

        async function getAds() {
            try {
                await adsService.getAds()
            }
            catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }

        onMounted(() => {
            getAds()
        })

        return {
            account: computed(() => AppState.account),
            ads: computed(()=> AppState.ads),

            async changeProfile(profileId) {
                try {
                    await profilesService.getProfileById(profileId)
                    await postsServices.getProfilePosts(profileId);
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped>
#profilePicture {
    height: 250px;
    width: 250px;
    object-fit: cover;
    object-position: center;
}

p {
    margin: 0;
}
</style>