<template>
  <div class="container mt-5">
    <NavigationHeader />
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">{{ selectedObject.name }}</h2>
      <div class="d-flex mb-3">
        <div class="col-md-4">
          <img :src="selectedObject.logo ? '/assets/images/' + selectedObject.logo : null" class="img-fluid" alt="Car Rental Logo" style="max-height: 300px">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p><strong>Radno vreme:</strong> {{ selectedObject.workingHours }}</p>
            <p><strong>Status:</strong> {{ selectedObject.status ? 'Radi' : 'Ne radi' }}</p>
            <p><strong>Lokacija:</strong> {{ selectedObject.location }}</p>
            <p><strong>Ocena:</strong> {{ selectedObject.rating }}</p>
            <div v-if="userRole === 'USER'" class="mt-4">
              <label class="form-label">Period iznajmljivanja:</label>
              <input type="date" v-model="searchStartDate" class="form-control" @change="handleDateChange" />
              <input type="date" v-model="searchEndDate" class="form-control" @change="handleDateChange" />
              <button @click="performSearch" class="btn btn-primary" :disabled="!searchStartDate || !searchEndDate">Pretraga</button>
              <div class="row mt-4" v-if="!carList.empty">
                <div class="col-md-4" v-for="car in carList" :key="car.id">
                  <div class="card mb-4 shadow">
                    <img :src="'/assets/images/' + car.image" class="card-img-top" alt="Car Image">
                    <div class="card-body">
                      <h5 class="card-title">{{ car.name }}</h5>
                      <p class="card-text"><strong>Marka:</strong> {{ car.brand }}</p>
                      <p class="card-text"><strong>Model:</strong> {{ car.model }}</p>
                      <p class="card-text"><strong>Cena:</strong> {{ car.price }} RSD</p>
                      <p class="card-text"><strong>Tip:</strong> {{ car.type }}</p>
                      <p class="card-text"><strong>Tip goriva:</strong> {{ car.fuelType }}</p>
                      <p class="card-text"><strong>Potrošnja:</strong> {{ car.consumption }}</p>
                      <p class="card-text"><strong>Broj vrata:</strong> {{ car.numberOfDoors }}</p>
                      <p class="card-text"><strong>Broj osoba:</strong> {{ car.numberOfPersons }}</p>
                      <p class="card-text"><strong>Opis:</strong> {{ car.description }}</p>
                      <button class="btn btn-primary" @click="addToCart(car.id)" >Dodaj u korpu</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
import headerModule from "../auth/header";

export default {
  mixins: [baseMixin],
  props: ['id'],
  components: {
    NavigationHeader,
  },
  data() {
    return {
      carRentalObjects: [],
      selectedObject: {},
      userRole: localStorage.getItem('role') ? localStorage.getItem('role') : null,
      searchStartDate: null,
      searchEndDate: null,
      carList: [],

    };
  },
  async created() {
    await this.fetchCarRentalObjects();
  },
  methods: {
    async fetchCarRentalObjects() {
      try {
        const response = await axios.get(this.basePath + 'facility/' + this.id);
        this.selectedObject = response.data.facility;
      } catch (error) {
        console.error('Error fetching car rental objects:', error);
      }
    },
    redirectToVehicles() {
      this.$router.push('/vehicle/' + this.id);
    },
    handleDateChange() {
      if (!this.searchStartDate || !this.searchEndDate) {
        return;
      }
      if (new Date(this.searchEndDate) < new Date(this.searchStartDate)) {
        const tempDate = this.searchStartDate;
        this.searchStartDate = this.searchEndDate;
        this.searchEndDate = tempDate;
      }

    },
    addToCart(id) {
      console.log("cartVehicles")

      let cartVehicles = JSON.parse(localStorage.getItem('vehicles')) || "";
      console.log("cartVehicles",cartVehicles, id)
      // if (cartVehicles === []) {
        cartVehicles =cartVehicles+ id+",";
      // }
      // cartVehicles.concat(id);
      console.log("cartVehicles",cartVehicles.length)
      localStorage.setItem('vehicles', JSON.stringify(cartVehicles));
      this.$emit('cart-updated', cartVehicles.length);
      alert("Vozilo dodato u korpu!")
      window.location.reload();


    },

    async performSearch() {
      try {
        // Implementirajte logiku za pretragu koristeći startDate i endDate
        // Pozovite API ili bazu podataka sa ovim datumima
        // Nakon što dobijete rezultate, ažurirajte prikaz na osnovu tih rezultata
        // Primer:

        const response = await axios.post(this.basePath + 'searchVehicles', {
            start_date: this.searchStartDate,
            end_date: this.searchEndDate,
            objectId: this.id
        },{
          headers: {
            authorization : localStorage.getItem('token')
          }
        });
        console.log(response.data)
        this.carList = response.data.vehicles;
      } catch (error) {
        console.error('Error performing search:', error);
      }
    },
  },
};
</script>
