<template>
  <div class="home">
    <h1>Welcome to the App!</h1>
    <div v-if="!loggedIn">
      <router-link class="button" to="/login">Login</router-link>
      <router-link class="button" to="/register">Registration</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loggedIn']),
  },
};
</script>
