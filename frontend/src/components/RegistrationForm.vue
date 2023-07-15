<template>
  <div>
    <h2>Registration Form</h2>
    <form @submit="registerUser">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Register</button>
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
    registerUser() {
      // Logika za registrovanje korisnika
      // Ovde možete pozvati API endpoint za registrovanje korisnika na serveru
      // Koristite this.username i this.password za dobijanje unetih vrednosti
    },
  },
};
</script>
