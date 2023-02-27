<template>
    <form @submit.prevent="handleForm">

        <div class="d-flex bg-light p-3 shadow rounded">
            <div>
                <img :src="account.picture" alt="" class="img-fluid rounded-circle">
            </div>
            <div class="mx-5 mt-3 flex-grow-1">
                <textarea v-model="editable.body" class="p-1 text-dark fs-5" placeholder="Share your thoughts" required></textarea>
                <div class="d-flex justify-content-between pt-2">
                    <i class="mdi mdi-attachment btn btn-info fs-4 d-flex align-items-center" @click="showImgUrlDiv">
                        <p class="fs-5 ms-2">Add Image</p>
                    </i>
                    <button class="mdi mdi-send btn btn-info fs-4" type="submit"></button>
                </div>
                <input v-model="editable.imgUrl" type="url" placeholder="https://" class="w-100 mt-2" id="imgUrl" hidden>
            </div>
        </div>

    </form>
</template>


<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState';
import { postsServices } from '../services/PostsServices';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})

        return {
            editable,
            account: computed(() => AppState.account),

            showImgUrlDiv() {
                imgUrl.hidden = !imgUrl.hidden
            },
            
            async handleForm() {
                try {
                    const postData = editable.value
                    await postsServices.createPost(postData)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }

                editable.value = {}
            }
        }
    }
}
</script>


<style lang="scss" scoped>
#post-header {
    background-color: rgba(202, 202, 202, 0.986);
}

#post-body {
    background-color: aliceblue;
}

#post-body-img {
    max-width: 90%;
}

textarea {
    width: 100%;
    height: 150px;
    overflow-y: auto;
    resize: none;
    border: 3px dashed rgba(13, 215, 255, 0.256) !important;
    background-color: rgba(0, 255, 255, 0.056);
    color: #ffffff;
    outline: none;
}

p {
    margin: 0;
}
</style>