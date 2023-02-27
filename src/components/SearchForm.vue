<template>
    <div class="d-flex">

        <form @submit.prevent="querySearchPosts()" class="ms-4">
            <div class="d-flex">
                <input v-model="postEditable.query" type="text" name="search" id="search" placeholder="Search Posts"
                    class="form-control me-2">
                <button class="mdi mdi-send btn btn-info" type="submit"></button>
            </div>
        </form>

        <form @submit.prevent="querySearchProfiles()" class="ms-5">
            <div class="d-flex">
                <input v-model="profileEditable.query" type="text" name="search" id="search" placeholder="Search Profiles"
                    class="form-control me-2">
                <button class="mdi mdi-send btn btn-info" type="submit"></button>
            </div>
        </form>

    </div>
</template>


<script>
import { ref } from 'vue';
import { api } from '../services/AxiosService';
import { searchService } from '../services/SearchService'

export default {
    setup() {
        const postEditable = ref({})
        const profileEditable = ref({})
        return {
            postEditable,
            profileEditable,
            async querySearchPosts() {
                await searchService.querySearchPosts(postEditable.value)
                postEditable.value = {}
            },
            async querySearchProfiles(){
                await searchService.querySearchProfiles(profileEditable.value)
                profileEditable.value = {}
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>