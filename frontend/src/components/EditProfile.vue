<template>
  <div>
    <NavigationHeader />
  <div class="container mt-5">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Uredi Profil</h2>
      <form @submit.prevent="updateProfile">
        <div class="mb-3">
          <label for="username" class="form-label">Korisničko ime</label>
          <input type="text" class="form-control" v-model="editedProfile.username" id="username" readonly>
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label">Ime</label>
          <input type="text" class="form-control" v-model="editedProfile.firstName" id="firstName" required>
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Prezime</label>
          <input type="text" class="form-control" v-model="editedProfile.lastName" id="lastName" required>
        </div>
        <div class="mb-3">
          <label for="dateOfBirth" class="form-label">Datum rođenja</label>
          <input type="date" class="form-control" v-model="editedProfile.dateOfBirth" id="dateOfBirth" required>
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Pol</label>
          <select class="form-select" v-model="editedProfile.gender" id="gender" required>
            <option value="male">Muški</option>
            <option value="female">Ženski</option>
          </select>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Sačuvaj izmene</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import baseMixin from "../common/baseMixin";
import NavigationHeader from "./NavigationHeader";
import headerModule from '../auth/header.js';

export default {
  mixins: [baseMixin],
  props: ['userId'],
  components: {
    NavigationHeader
  },
  data() {
    return {
      editedProfile: {
        username: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
      },
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get(this.basePath + 'profile/'+localStorage.getItem("username"), {
          headers: headerModule.header
        });
        const userData = response.data.user[0];
        this.editedProfile = {
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dateOfBirth: userData.dateOfBirth,
          gender: userData.gender,
        };
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async updateProfile() {
      try {
        console.log(this.userId)
        const response = await axios.put(this.basePath + `profile/${this.userId}`, this.editedProfile,{
          headers: headerModule.header
        });

        console.log('Profile updated successfully:', response);
        this.$router.push('/profile');

      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    },
  },
};
</script>
