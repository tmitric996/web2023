<template>
  <div>
    <NavigationHeader />
    <h2 class="mb-4 text-center">Lista Porudžbina</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Cena</th>
        <th>Datum i Vreme</th>
        <th>Car Rental Object ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.status }}</td>
        <td>{{ order.price }} RSD</td>
        <td>{{ order.dateAndTime }}</td>
        <td>{{ order.carRentalObject }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import baseMixin from "../common/baseMixin";
import NavigationHeader from "./NavigationHeader";

export default {
  mixins: [baseMixin],
  components: {
    NavigationHeader,
  },
  data() {
    return {
      orders: [] // Niz za čuvanje porudžbina
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get(this.basePath + 'order/customer/'+localStorage.getItem('username'), {
          headers: {
            authorization: localStorage.getItem('token')
          }
        });

        this.orders =response.data.orders;

      } catch (error) {
        console.error('Error loading vehicles:', error);
      }
    }
  },
  created() {
    // Pozovite fetchOrders() kad se komponenta kreira kako biste dobili porudžbine
    this.fetchOrders();
  }
};
</script>

<style scoped>
/* Ovde možete dodati CSS stilove po potrebi */
</style>
