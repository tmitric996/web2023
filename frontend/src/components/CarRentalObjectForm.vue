<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Create Car Rental Object</h2>
      <form @submit.prevent="createCarRentalObject">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="name" id="name" required>
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" v-model="location" id="location" required>
        </div>
        <div class="mb-3">
          <label for="workingHours" class="form-label">Working Hours</label>
          <input type="text" class="form-control" v-model="workingHours" id="workingHours" required>
        </div>
        <div class="mb-3">
          <label for="logo" class="form-label">Logo</label>
          <input type="text" class="form-control" v-model="logo" id="logo" accept="image/*" required>
        </div>
        <div class="mb-3">
          <label for="manager" class="form-label">Manager</label>
          <select class="form-select" v-model="manager" id="manager" required>
            <option v-for="manager in managers" :key="manager.id" :value="manager.id">{{ manager.username }}</option>
          </select>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Create Object</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import '../../public/assets/styles.css';
import axios from 'axios';
import headerModule from '../auth/header.js';
import baseMixin from "../common/baseMixin";

export default {
  mixins: [baseMixin],
  data() {
    return {
      name: '',
      location: '',
      workingHours: '',
      logo: null,
      manager: null,
      managers: [], // Fetch this from the API
      userRole: localStorage.getItem('role')? localStorage.getItem('role') : null,
    };
  },
  async created() {
    await this.fetchManagers();
  },
  methods: {
    async fetchManagers() {
      try {
        const response = await axios.get(this.basePath + 'managers', {
          headers: headerModule.header}); // Fetch managers from the API
        this.managers = response.data.managers;
        console.log('managers:', response);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    },
    async createCarRentalObject() {
      try {
        console.log("this.manager",this.manager);
        const response = await axios.post(this.basePath + 'facility', {
          name: this.name,
          location: this.location,
          workingHour: this.workingHours,
          logo: this.logo,
          manager: this.manager
        }, {
          headers: headerModule.header}
        );

        if (response.status === 200) {
          console.log('Car rental object created successfully.',response);
        } else {
          console.log('Error creating car rental object.', response);
        }
      } catch (error) {
        console.error('Error creating car rental object:', error);
      }
    },
  },
};
</script>
