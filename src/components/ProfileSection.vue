<template>
    <div class="container">
        <div class="row">
            <div class="col-12" v-if="account.id">
                <div class="bg-primary px-2 py-1">
                    <div class="mt-4 rounded-circle text-center">
                        <!-- STUB Profile Picture -->
                            <router-link :to="{name: 'Account'}">
                                <img src="
                                https://images.unsplash.com/photo-1552337557-45792b252a2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80
                                " alt="" class="img-fluid rounded-circle" id="profilePicture">
                                <!-- STUB Profile Name -->
                            </router-link>
                        <p class="fs-3 fw-bold"><u>{{account.name}}</u></p>
                        
                        <p v-if="account.class">{{ account.class }} <i :class="account.graduated ? 'mdi mdi-checkbox-marked' : '' "></i></p>
                        
                    </div>
                    <div>
                        <div class="d-flex align-items-center justify-content-center" v-if="account.github">
                            <a :href="account.github"><i class="mdi mdi-github fs-1"></i></a>
                        </div>
                        <div class="d-flex align-items-center justify-content-center" v-if="account.linkedin" >
                            <a :href="account.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import AccountPage from '../pages/AccountPage.vue';

export default {
    setup() {

        return {
            account: computed(() => AppState.account),
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