<template>
  <form @submit.prevent="changeAccountInfo()">
    <div class="container">
      <div class="row">

        <div class="col-9 m-auto text-center" v-if="account.id">

          <div class="my-2">
            <p>Name</p>
            <input v-model="editable.name" name="name" type="text" class="form-control" required>
          </div>

          <div class="my-2">
            <p>Picture URL</p>
            <input v-model="editable.picture" name="picture" type="url" class="form-control" required>
          </div>

          <div class="my-2">
            <p>Cover Image URL</p>
            <input v-model="editable.coverImg" name="coverImg" type="url" class="form-control" required>
          </div>

          <div class="my-2">
            <p>Bio</p>
            <textarea v-model="editable.bio" name="bio" type="text" class="w-100 p-1 rounded">{{ account.bio }}</textarea>
          </div>

          <div class="my-2">
            <p>Github URL</p>
            <input v-model="editable.github" name="github" type="url" class="form-control">
          </div>

          <div class="my-2">
            <p>LinkedIn URL</p>
            <input v-model="editable.linkedin" name="linkedin" type="url" class="form-control">
          </div>

          <div class="my-2">
            <p>Resume URL</p>
            <input v-model="editable.resume" name="resume" type="url" class="form-control">
          </div>

          <div class="my-2">
            <p>Class of</p>
            <input v-model="editable.class" name="class" type="text" class="form-control">
          </div>

          <div class="my-2">
            <p>Graduated?</p>
            <input v-model="editable.graduated" name="graduated" type="checkbox" class="checkbox flex-grow-1">
          </div>

          <button class="btn btn-info border border-dark">SAVE</button>

        </div>

      </div>
    </div>
  </form>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if(AppState.account.id){
        editable.value = {...AppState.account}
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),

      async changeAccountInfo(){
        await accountService.changeAccountInfo(editable.value)
      }

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
p{
  margin: 0;
}
textarea{
  resize: none;
  height: 200px;
  overflow-y: auto;
}
.checkbox{
  height: 20px;
  width: 100%;
}
</style>
