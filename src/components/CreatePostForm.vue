<template>
    <form @submit.prevent="handleForm">

        <div class="d-flex bg-secondary p-3">
            <div>
                <img :src="account.picture" alt="" class="img-fluid rounded-circle">
            </div>
            <div class="mx-5 mt-3 flex-grow-1">
                <textarea v-model="editable.body" class="bg-secondary p-1" placeholder="Share your thoughts"></textarea>
                <div class="d-flex justify-content-between pt-2">
                    <button class="mdi mdi-attachment btn btn-info fs-4 d-flex align-items-center" @click="showImgUrlDiv">
                        <p class="fs-5 ms-2">Add Image</p>
                    </button>
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

export default {
    setup() {
        const editable = ref({})
        
        return {
            editable,
            account: computed(()=> AppState.account),
            showImgUrlDiv() {
                imgUrl.hidden = !imgUrl.hidden
            },
            async handleForm(){
                const postData = editable.value
                await postsServices.createPost(postData)

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

textarea{
    width: 100%;
    height: 150px;
    overflow-y: scroll;
    resize: none;
    border: 3px dashed black !important; 
}
p{
    margin: 0;
}
</style>