<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }" @click="getAllPosts()">
      <div class="d-flex flex-column align-items-center">
        <i class="mdi mdi-webhook icon-size">Webhook</i>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { postsServices } from '../services/PostsServices';
import Login from './Login.vue'
import SearchForm from './SearchForm.vue';
export default {
  setup() {
    return {
      getAllPosts(){
        postsServices.getAllPosts()
      }
    }
  },
  components: { Login, SearchForm }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.icon-size{
  font-size: 48px;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

</style>
