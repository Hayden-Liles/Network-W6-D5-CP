<template>

    <div class="bg-primary px-2 py-1 my-5" v-for="profile in profiles">
        <div class="mt-4 rounded-circle text-center">
            <!-- STUB Profile Picture -->
            <router-link :to="{ name: 'Profile', params: { profileId: profile._id } }">
                <img :src="profile.picture" alt="" class="img-fluid rounded-circle" id="profilePicture">
                <!-- STUB Profile Name -->
            </router-link>
            <p class="fs-3 fw-bold"><u>{{ profile.name }}</u></p>

            <p v-if="profile.class">{{ profile.class }} <i :class="profile.graduated ? 'mdi mdi-checkbox-marked' : ''"></i>
            </p>

        </div>
        <div class="d-flex justify-content-center">
            <div class="d-flex align-items-center justify-content-center" v-if="profile.github">
                <a :href="profile.github"><i class="mdi mdi-github fs-1"></i></a>
            </div>
            <div class="d-flex align-items-center justify-content-center" v-if="profile.linkedin">
                <a :href="profile.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
            </div>
        </div>
    </div>

</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
    setup() {
        return {
            profiles: computed(() => AppState.profiles)
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