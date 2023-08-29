<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Unos Podataka o Vozilu</h2>
      <form @submit.prevent="createVehicle">
        <div class="mb-3">
          <label for="brand" class="form-label">Marka</label>
          <input type="text" class="form-control" v-model="brand" id="brand" required>
        </div>
        <div class="mb-3">
          <label for="model" class="form-label">Model</label>
          <input type="text" class="form-control" v-model="model" id="model" required>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Cena</label>
          <input type="number" class="form-control" v-model="price" id="price" required>
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">Tip</label>
          <input type="text" class="form-control" v-model="type" id="type" required>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Vrsta</label>
          <input type="text" class="form-control" v-model="category" id="category" required>
        </div>
        <div class="mb-3">
          <label for="fuelType" class="form-label">Tip Goriva</label>
          <input type="text" class="form-control" v-model="fuelType" id="fuelType" required>
        </div>
        <div class="mb-3">
          <label for="consumption" class="form-label">Potrošnja</label>
          <input type="number" class="form-control" v-model="consumption" id="consumption" required>
        </div>
        <div class="mb-3">
          <label for="doors" class="form-label">Broj Vrata</label>
          <input type="number" class="form-control" v-model="doors" id="doors" required>
        </div>
        <div class="mb-3">
          <label for="passengers" class="form-label">Broj Putnika</label>
          <input type="number" class="form-control" v-model="passengers" id="passengers" required>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Slika</label>
          <input type="file" accept=".jpg, .png, .jpeg" @change="onImageChange" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Opis</label>
          <textarea class="form-control" v-model="description" id="description"></textarea>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Sacuvaj vozilo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import headerModule from '../auth/header.js';
import baseMixin from "../common/baseMixin";

export default {
  mixins: [baseMixin],
  props: ['objectid'],

  data() {
    return {
      brand: '',
      model: '',
      price: null,
      type: '',
      category: '',
      fuelType: '',
      consumption: null,
      doors: null,
      passengers: null,
      image: null,
      description: '',
      transmission: '',
    };
  },

  methods: {
    onImageChange(event) {
      if (event.target.files && event.target.files[0]) {
        console.log(event.target.files[0])
        this.image = event.target.files[0].name;
      }
    },

    async createVehicle() {
      try {
        const response = await axios.post(this.basePath + 'vehicle', {
              brand: this.brand,
              model: this.model,
              price: this.price,
              type: this.type,
              category: this.category,
              fuelType: this.fuelType,
              consumption: this.consumption,
              numberOfDoors: this.doors,
              numberOfPersons: this.passengers,
              description: this.description,
              transmission: 'this.transmission',
              image: this.image,
              rentalObject: this.objectid
            }, {
              headers: headerModule.header
            }
        );
        if (response.status === 200) {
          console.log('Car rental object created successfully.', response, this.emptyManagers);
          if (this.emptyManagers) {
          } else {
          }
        } else {
          console.log('Error creating car rental object.', response);
        }
      } catch (error) {
        console.error('Error creating car rental object:', error);
      }
    },
  }
};
</script>
