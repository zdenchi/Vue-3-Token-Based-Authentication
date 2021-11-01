<template>
  <div>
    <form @submit.prevent="loginUser">
      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">Password:</label>
      <input v-model="password" type="password" name="password" value />

      <button type="submit" name="button">Login</button>
    </form>

    <p v-if="error">{{ error }}</p>

    <p>
      Don't have an account? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['login']),
    loginUser() {
      this.login({
        email: this.email,
        password: this.password,
      })
        .then(() => this.$router.push({ name: 'Dashboard' }))
        .catch((error) => (this.error = error.response.data.error));
    },
  },
};
</script>
