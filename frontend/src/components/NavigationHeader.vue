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
          <i class="bi bi-cart4 icon" id="cart-icon">
            <span class="badge" id="cart-badge">{{ notificationCount }}</span>
          </i>
        </router-link>
          <router-link v-if="isLoggedIn" :to="'/profile'" class="icon">
            <i class="bi bi-person-square icon"></i>
          </router-link>
        </div>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
        <button v-if="!isLoggedIn && showRegister" @click="register">Register</button>
        <button v-if="!isLoggedIn && !showRegister" @click="login">Login</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      notificationCount: localStorage.getItem('vehicles')? JSON.stringify(localStorage.getItem('vehicles')).split(',').length : 0,
    };
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('username') !== null;
    },
    showRegister() {
      console.log("ss",window.location.href.includes('login'))
      if (window.location.href.includes('login')){
        return true;
      }
      return false;
    },
    isUser() {
      if (localStorage.getItem('role')){
        return (localStorage.getItem('role')==='USER');
      } else
      return false;
    }
  },
  mounted() {
    window.addEventListener('storage', this.handleStorageChange);

    // Pretplatite se na događaj 'cart-updated' koji emituje komponenta koja dodaje vozila
    this.$root.$on('cart-updated', (count) => {
      this.notificationCount = count;
    });
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange);

    // Uklonite pretplatu na događaj pri uništavanju komponente
    this.$root.$off('cart-updated');
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
    register() {
      this.$router.push('/register');
    },
    logout() {
      localStorage.clear();
      location.reload();
    },
    handleStorageChange(event) {
      console.log("udje",  this.notificationCount, event)

      if (event.key === 'vehicles') {
        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        this.notificationCount = vehicles.length;
console.log("udje",  this.notificationCount)

      }
    },
  }
};
</script>
