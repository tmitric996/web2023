<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">{{ selectedObject.name }}</h2>
      <div class="d-flex mb-3">
        <div class="col-md-4">
          <img :src="'/assets/images/' + selectedObject.logo" class="img-fluid" alt="Car Rental Logo">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p><strong>Vozila u ponudi:</strong> {{ selectedObject.vehicles }}</p>
            <p><strong>Radno vreme:</strong> {{ selectedObject.workingHours }}</p>
            <p><strong>Status:</strong> {{ selectedObject.status ? 'Radi' : 'Ne radi' }}</p>
            <p><strong>Lokacija:</strong> {{ selectedObject.location }}</p>
            <p><strong>Ocena:</strong> {{ selectedObject.rating }}</p>
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
  props: ['id'],

  data() {
    return {
      carRentalObjects: [],
      selectedObject: {},
    };
  },
  async created() {
    await this.fetchCarRentalObjects();
  },
  methods: {
    async fetchCarRentalObjects() {
      try {
        const response = await axios.get(this.basePath + 'facility/'+this.id);
        this.selectedObject = response.data.facility;
        console.log(response.data.facility)
      } catch (error) {
        console.error('Error fetching car rental objects:', error);
      }
    },
  },
};
</script>

