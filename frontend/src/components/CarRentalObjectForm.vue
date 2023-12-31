<template>
  <div>
    <NavigationHeader />
  <div class="container mt-5" style="max-width: 700px;">
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
          <table class="table">
            <thead>
            <tr>
              <th></th>
              <th v-for="(day, index) in daysOfWeek" :key="index">{{ day }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Od</td>
              <td v-for="day in daysOfWeek" :key="day">
                <select class="form-select small-font" v-model="workingHours[day].from" required>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Do</td>
              <td v-for="day in daysOfWeek" :key="day">
                <select class="form-select small-font" v-model="workingHours[day].to" required>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-3">
          <label for="logo" class="form-label">Logo</label>
          <input type="file" accept=".jpg, .png, .jpeg" @change="onLogoChange" required>
        </div>
        <div class="mb-3">
          <label for="manager" class="form-label">Manager</label>
          <select class="form-select" v-model="manager" id="manager" >
            <option v-for="manager in managers" :key="manager.id" :value="manager.id">{{ manager.username }}</option>
          </select>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Create Object</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import '../../public/assets/styles.css';
import axios from 'axios';
import headerModule from '../auth/header.js';
import baseMixin from "../common/baseMixin";
import NavigationHeader from "./NavigationHeader";

export default {
  mixins: [baseMixin],
  components: {
    NavigationHeader
  },
  data() {
    return {
      daysOfWeek: ['Pon-Pet', 'Sub', 'Ned'],
      workingHours: {
        'Pon-Pet': { from: '', to: '' },
        'Sub': { from: '', to: '' },
        'Ned': { from: '', to: '' },
      },
      timeOptions: [],
      emptyManagers: false,
      name: '',
      location: '',
      logo: null,
      manager: null,
      logoFile: null,
      managers: [],
      userRole: localStorage.getItem('role')? localStorage.getItem('role') : null,
    };
  },
  async created() {
    await this.fetchManagers();
    this.timeOptions = this.generateTimeOptions();
  },
  methods: {
    generateTimeOptions() {
      const options = [];
      for (let hour = 0; hour <= 23; hour++) {
        for (let minute = 0; minute <= 30; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          options.push(time);
        }
      }
      return options;
    },
    onLogoChange(event) {
      if (event.target.files && event.target.files[0]) {
        console.log(event.target.files, event.target.files[0]);
        this.logoFile = event.target.files[0].name;
      }
    },
    async fetchManagers() {
      try {
        const response = await axios.get(this.basePath + 'managers/free', {
          headers: headerModule.header});
        this.managers = response.data.managers;
        console.log("this.managers.isEmpty", this.managers.length, this.managers )
        if (this.managers.length===0) {
          this.emptyManagers = true;
        }
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    },

    async createCarRentalObject() {
      try {
        const response = await axios.post(this.basePath + 'facility', {
          name: this.name,
          location: this.location,
          workingHour: this.workingHours,
          logo: this.logoFile,
          manager: this.manager || null
        }, {
          headers: headerModule.header}
        );

        if (response.status === 200) {
          console.log('Car rental object created successfully.',response, this.emptyManagers);
          if (this.emptyManagers) {
            await this.$router.push('/register/'+response.data.facility.id);
          } else {
            await this.$router.push('/rent-a-car');
          }
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
