<template>
  <div class="container mt-5">
    <NavigationHeader />
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Profil korisnika</h2>
      <div class="row">
        <div class="col-md-6">
          <p><strong>Korisničko ime:</strong> {{ user.username }}</p>
          <p><strong>Ime:</strong> {{ user.firstName }}</p>
          <p><strong>Prezime:</strong> {{ user.lastName }}</p>
          <p><strong>Pol:</strong> {{ user.gender }}</p>
          <p><strong>Datum rođenja:</strong> {{ user.dateOfBirth }}</p>
          <p><strong>Uloga:</strong> {{ user.role }}</p>
          <p v-if="user.role === 'USER'"><strong>Tip korisnika:</strong> {{ user.customerType }}</p>
          <p v-if="user.role === 'USER'"><strong>Sva iznajmljivanja:</strong> {{ user.rentals }}</p>
          <p v-if="user.role === 'USER'"><strong>Korpa:</strong> {{ user.cart }}</p>
          <p v-if="user.role === 'MANAGER'"><strong>Rent a car objekat:</strong> {{ user.carRentalObject }}</p>
        </div>
        <div class="col-md-6 text-end">
          <button @click="editProfile" class="btn btn-primary">Uredi profil</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import baseMixin from "../common/baseMixin";
import NavigationHeader from "./NavigationHeader";
import headerModule from "../auth/header";

export default {
  mixins: [baseMixin],
  components: {
    NavigationHeader
  },
  data() {
    return {
      user: {},
    };
  },

  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(this.basePath + 'profile/'+localStorage.getItem("username"), {
          headers: headerModule.header
        });
        console.log(response, response.data.user[0])
        this.user = response.data.user[0];
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    editProfile() {
      this.$router.push('/edit-profile/'+this.user.id);
    },
  },
  created() {
    this.fetchUserData();
  },
};
</script>
