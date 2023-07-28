<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Login Form</h2>
      <form @submit="loginUser">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username" id="username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password" id="password" required>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import '../../public/assets/styles.css';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    loginUser() {
      },
  },
};
</script>
