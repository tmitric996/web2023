<template>
  <div class="container mt-5" style="max-width: 400px;">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Login Form</h2>
      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username" id="username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input type="password" class="form-control" v-model="password" id="password" required>
            <button
                type="button"
                class="btn btn-outline-secondary"
                @click="togglePasswordVisibility('password')"
                data-bs-toggle="tooltip" :title="showPassword ? 'Show password' : 'Hide password'"
            >
              <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
            </button>
          </div>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
    <div :class="isModalShown? 'modal fade show' : 'modal fade'" id="loginModal" ref="loginModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login Error</h5>
          </div>
          <div class="modal-body">
            <p>{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../public/assets/styles.css';
import axios from "axios";
import baseMixin from '../common/baseMixin.js';

export default {
  mixins: [baseMixin],
  data() {
    return {
      showPassword : true,
      username: '',
      password: '',
      isModalShown: false,
      errorMessage: "Oops! Something went wrong during login."
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(this.basePath+'login', {
          username: this.username,
          password: this.password,
        });
        if (response.status === 200) {
          console.log('Korisnik je uspešno ulogovan.', response);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', this.username);
          localStorage.setItem('role', response.data.role);

          await this.$router.push('/rent-a-car');

        } else {
          console.log('Došlo je do greške prilikom prijave korisnika.');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "Oops! Something went wrong during login.";
        }
        this.showModal();

        console.log('Došlo je do greške prilikom registracije korisnika.', error);

      }
    },
    closeModal() {
      const modal = new bootstrap.Modal(this.$refs.loginModal);
      modal.dispose();
      this.isModalShown=false;
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      location.reload();
    },
    togglePasswordVisibility(field) {
      this.showPassword = !this.showPassword;
      const input = document.getElementById(field);
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    },
    showModal() {
      const modal = new bootstrap.Modal(this.$refs.loginModal, {backdrop: 'static',});
      modal.show();
      this.isModalShown=true;
    },
  },
};
</script>
