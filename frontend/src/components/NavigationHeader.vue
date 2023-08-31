<template>
  <nav class="navigation-header">
    <div class="nav-content">
      <div class="logo">
        <button @click="goToHome">
          <img src="/assets/images/car.png" class="img-fluid" alt="Car Rental Logo">
        </button>
      </div>
      <div class="user-menu">
        <div class="icons">
          <router-link v-if="isUser" :to="'/mycart'" class="icon">
            <i class="bi bi-cart4 icon"></i>
          </router-link>
          <router-link v-if="isLoggedIn" :to="'/profile'" class="icon">
            <i class="bi bi-person-square icon"></i>
          </router-link>
        </div>
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
    },
    isUser() {
      console.log(localStorage.getItem('role'))
      if (localStorage.getItem('role')){
        return (localStorage.getItem('role')==='USER');
      } else
      return false;
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
