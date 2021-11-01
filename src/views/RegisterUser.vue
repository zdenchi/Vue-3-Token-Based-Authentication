<template>
  <div>
    <form @submit.prevent="registerUser">
      <label for="name">Name:</label>
      <input v-model="name" type="text" name="name" value />

      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">Password:</label>
      <input v-model="password" type="password" name="password" value />

      <button type="submit" name="button">Register</button>
    </form>

    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>

    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: null,
    };
  },
  methods: {
    ...mapActions(['register']),
    registerUser() {
      this.register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then(() => this.$router.push({ name: 'Dashboard' }))
        .catch((error) => (this.errors = error.response.data.error));
    },
  },
};
</script>
