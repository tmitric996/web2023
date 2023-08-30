<template>
  <div class="container mt-5">
    <NavigationHeader />
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">{{ selectedObject.name }}</h2>
      <div class="d-flex mb-3">
        <div class="col-md-4">
          <img :src="selectedObject.logo ? '/assets/images/' + selectedObject.logo : null" class="img-fluid" alt="Car Rental Logo">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p><strong>Vozila u ponudi:</strong> {{ selectedObject.vehicles }}</p>
            <p><strong>Radno vreme:</strong> {{ selectedObject.workingHours }}</p>
            <p><strong>Status:</strong> {{ selectedObject.status ? 'Radi' : 'Ne radi' }}</p>
            <p><strong>Lokacija:</strong> {{ selectedObject.location }}</p>
            <p><strong>Ocena:</strong> {{ selectedObject.rating }}</p>
          </div>
          <div v-if="userRole === 'MANAGER'" class="col-md-12 text-end mt-3">
            <button @click="redirectToVehicles" class="btn btn-primary">Dodaj vozilo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import baseMixin from "../common/baseMixin";
import NavigationHeader from "./NavigationHeader";

export default {
  mixins: [baseMixin],
  props: ['id'],
  components: {
    NavigationHeader
  },
  data() {
    return {
      carRentalObjects: [],
      selectedObject: {},
      userRole: localStorage.getItem('role')? localStorage.getItem('role') : null,

  };
  },
  async created() {
    await this.fetchCarRentalObjects();
  },
  methods: {
    async fetchCarRentalObjects() {
      console.log(this.userRole)
      try {
        const response = await axios.get(this.basePath + 'facility/'+this.id);
        this.selectedObject = response.data.facility;
        console.log(response.data.facility)
      } catch (error) {
        console.error('Error fetching car rental objects:', error);
      }
    },
    redirectToVehicles() {
      this.$router.push('/vehicle/'+this.id);
    },
  },
};
</script>

