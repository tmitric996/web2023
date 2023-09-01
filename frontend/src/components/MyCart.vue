<template>
  <div>
    <NavigationHeader />
    <div class="container mt-5">
      <h2 class="mb-4 text-center">Moj Korpa</h2>
      <div v-for="(item, index) in cart" :key="index" class="card p-4 shadow-lg mb-4">
        <div class="d-flex">
          <div class="col-md-4">
            <img :src="'/assets/images/' + item.image" class="img-fluid" alt="Car Image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text"><strong>Cena: {{ item.price }} RSD</strong></p>
              <div class="d-flex align-items-center">
                <button @click="decrementQuantity(index)" class="btn btn-sm btn-secondary">-</button>
                <p class="mx-2">{{ item.quantity }}</p>
                <button @click="incrementQuantity(index)" class="btn btn-sm btn-secondary">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-end">
        <p><strong>Ukupna Cena: {{ total }} RSD</strong></p>
        <button @click="rentVehicles" class="btn btn-primary" style="margin-bottom: 10px">Iznajmi</button>
      </div>
      <router-link to="/myorders" class="btn btn-secondary" style="float: right">Istorija porudžbina</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import baseMixin from "../common/baseMixin";
import NavigationHeader from "./NavigationHeader";
import headerModule from "../auth/header";

export default {
  mixins: [baseMixin],
  components: {
    NavigationHeader,
  },
  data() {
    return {
      cart: [], // Niz za čuvanje stavki u korpi
      total:1
    };
  },
  computed: {
    total() {

    },
  },
  methods: {
    incrementQuantity(index) {
      // Povećavanje količine za određeni automobil
      this.cart[index].quantity++;
    },
    decrementQuantity(index) {
      // Smanjivanje količine za određeni automobil
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      }
    },
    async rentVehicles() {

      // Implementirajte logiku za iznajmljivanje vozila
      // Ovde možete poslati podatke na server ili uraditi bilo šta što je potrebno za iznajmljivanje
      // Nakon iznajmljivanja, možete isprazniti korpu i preusmeriti korisnika na odgovarajuću stranicu
      const response = await axios.post(this.basePath + 'order', {
        vehicles: this.cart.map(item => item.id),
        customer: localStorage.getItem('username'),
        carRentalObject: this.cart[0].rentalObject,
        dateAndTime: 'date and time',
        duration: 9,
        price: this.total,
        status: 'pending',
          }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
          }
      ); console.log("resss", response)
      localStorage.removeItem('vehicle');

      this.cart = [];
      // this.$router.push('/success'); // Primer preusmeravanja na stranicu za uspešno iznajmljivanje
    },
    async fetchCarVehicles() {
      const cartItems = JSON.parse(localStorage.getItem('vehicles')) || [];

      try {
        const response = await axios.get(this.basePath + 'vehicles/cart/'+cartItems.replaceAll(',', '-'), {
          headers: {
            authorization: localStorage.getItem('token')
          }
        });

        this.vehicles = response.data.vehicles; // Use response.data to get the actual response data
        this.cart =  response.data.vehicles;

      } catch (error) {
        console.error('Error loading vehicles:', error);
      }

    }

  },
  async created() {
    await this.fetchCarVehicles();

    // Učitavanje stavki iz lokalnog skladišta (localStorage) kada se komponenta kreira

  },
  watch: {
    cart: {
      // Praćenje promena u korpi i ažuriranje lokalnog skladišta
      handler(newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      },
      deep: true,
    },
  },
};
</script>

