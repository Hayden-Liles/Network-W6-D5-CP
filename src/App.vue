<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 px-0">
          <!-- SECTION ACCOUNT VIEW -->
          <ProfileSection/>
        </div>
        <div class="col-10 px-0">
          
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ProfileSection from './components/ProfileSection.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ProfileSection }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
