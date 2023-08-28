<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Objekti za iznajmljivanje vozila</h2>

    <div class="d-flex justify-content-between mb-4">
      <div class="flex-grow-1 me-2">
        <label>Pretraga po nazivu, lokaciji, oceni ili tipu vozila</label>
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Pretraga">
      </div>
      <div class="me-2" style="width: 200px;">
        <label for="vehicleType">Filtriranje po tipu vozila</label>
        <select class="form-select" v-model="selectedVehicleType">
          <option value="">All</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
        </select>
      </div>
      <div class="d-flex justify-content-between mb-4">
        <div class="me-2" style="width: 200px;">
          <label for="sortOption">Sortiranje po</label>
          <button class="btn btn-link btn-sm" @click="toggleSortOrder">
            <i :class="sortAscending ? 'bi bi-arrow-down' : 'bi bi-arrow-up'"></i>
          </button>
          <select class="form-select" v-model="selectedSortOption">
            <option value="name">Naziv</option>
            <option value="location">Lokacija</option>
            <option value="rating">Prosečna ocena</option>
          </select>
        </div>
      </div>
    </div>

    <!-- List of Car Rental Objects -->
    <div class="card mb-3" v-for="object in sortedObjects" :key="object.id" style="background-color: #f8f9fa;">
      <div class="row g-0" @click="redirectToFacility(object.id)">
        <div class="col-md-4">
          <img :src="'/assets/images/' + object.logo" class="img-fluid" alt="Car Rental Logo">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ object.name }}</h5>
            <p class="card-text">Lokacija: {{ object.location }}</p>
            <p class="card-text">Prosečna ocena: {{ object.rating }}</p>
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
      selectedSortOption: 'name',
      sortAscending: true,
      selectedRating: '',
    };
  },
  computed: {
    sortedObjects() {
      const copyOfObjects = [...this.filteredObjects];
      return copyOfObjects.sort((a, b) => {
        const sortDirection = this.sortAscending ? 1 : -1;

        if (this.selectedSortOption === 'name') {
          return sortDirection * a.name.localeCompare(b.name);
        } else if (this.selectedSortOption === 'location') {
          return sortDirection * a.location.localeCompare(b.location);
        } else if (this.selectedSortOption === 'rating') {
          const comparison = sortDirection * (b.rating - a.rating);
          return comparison;
        }
        return 0;
      });
    },
    filteredObjects() {
      return this.carRentalObjects.filter(object => {
        const nameMatch = object.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const locationMatch = object.location.toLowerCase().includes(this.searchQuery.toLowerCase());
        // const vehicleTypeMatch = this.selectedVehicleType === '' || object.vehicleType === this.selectedVehicleType;
        const ratingMatch = object.rating.toString().includes(this.searchQuery.toLowerCase());
        return nameMatch || locationMatch || ratingMatch;
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
    toggleSortOrder() {
      this.sortAscending = !this.sortAscending;
    },
    redirectToFacility(id) {
      this.$router.push(`/rent-a-car/${id}`);
    },
  },
};
</script>

