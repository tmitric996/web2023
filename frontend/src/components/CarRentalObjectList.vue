<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Rent-a-Car</h2>

    <!-- Filters and Search -->
    <div class="d-flex justify-content-between mb-4">
      <div class="flex-grow-1 me-2">
        <label>Search objects</label>
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Search by name">
      </div>
      <div class="me-2" style="width: 200px;">
        <label for="vehicleType">Vehicle Type</label>
        <select class="form-select" v-model="selectedVehicleType">
          <option value="">All</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <!-- Add more options as needed -->
        </select>
      </div>
    </div>

    <!-- List of Car Rental Objects -->
    <div class="card mb-3" v-for="object in filteredObjects" :key="object.id" style="background-color: #f8f9fa;">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="object.logo" class="img-fluid" alt="Car Rental Logo">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ object.name }}</h5>
            <p class="card-text">Location: {{ object.location }}</p>
            <p class="card-text">Average Rating: {{ object.averageRating }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import baseMixin from "../common/baseMixin";

export default {
  mixins: [baseMixin],

  data() {
    return {
      carRentalObjects: [], // Fetch this from the API
      searchQuery: '',
      selectedVehicleType: '',
    };
  },
  computed: {
    filteredObjects() {
      return this.carRentalObjects.filter(object => {
        const nameMatch = object.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const vehicleTypeMatch = !this.selectedVehicleType || object.vehicleType === this.selectedVehicleType;
        // Add more filters as needed

        return nameMatch && vehicleTypeMatch;
      });
    },
  },
  async created() {
    await this.fetchCarRentalObjects();
  },
  methods: {
    async fetchCarRentalObjects() {
      try {
        const response = await axios.get(this.basePath + 'facility'); // Fetch car rental objects from the API
        this.carRentalObjects = response.data.facilities;
      } catch (error) {
        console.error('Error fetching car rental objects:', error);
      }
    },
  },
};
</script>

