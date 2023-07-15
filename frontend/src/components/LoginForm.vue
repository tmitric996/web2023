<template>
  <div>
    <h2>Login Form</h2>
    <form @submit="loginUser">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    loginUser() {
      // Logika za prijavljivanje korisnika
      // Ovde možete pozvati API endpoint za prijavljivanje korisnika na serveru
      // Koristite this.username i this.password za dobijanje unetih vrednosti
    },
  },
};
</script>
