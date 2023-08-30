<template>
  <nav class="navigation-header">
    <div class="nav-content">
      <div class="logo">
        <button @click="goToHome">
          <img src="/assets/images/car.png" class="img-fluid" alt="Car Rental Logo">
        </button>
      </div>
      <div class="user-menu">
        <router-link v-if="isLoggedIn" :to="'/profile'">
          <i class="bi bi-person-square"></i>
        </router-link>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
        <button v-else @click="login">Login</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem('username') !== null;
    }
  },
  methods: {
    goToHome() {
      if (location.pathname!=='/rent-a-car') {
        this.$router.push('/rent-a-car');
      } else {
        location.reload();
      }
    },
    login() {
      this.$router.push('/login');
    },
    logout() {
      localStorage.clear();
      location.reload();
    }
  }
};
</script>
