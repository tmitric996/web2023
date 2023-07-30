<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg">
      <h2 class="mb-4 text-center">Registration Form</h2>
      <form @submit.prevent="registerUser">
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
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <div class="input-group">
            <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': passwordMismatch }"
                v-model="confirmPassword"
                id="confirmPassword"
                required
            >
            <button
                type="button"
                class="btn btn-outline-secondary"
                @click="togglePasswordVisibility('confirmPassword')"
                data-bs-toggle="tooltip" :title="showConfirmPassword ? 'Show password' : 'Hide password'"
            >
              <i :class="showConfirmPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
            </button>
            <div v-if="passwordMismatch" class="invalid-feedback">
              Passwords do not match.
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input type="text" class="form-control" v-model="firstName" id="firstName" required>
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input type="text" class="form-control" v-model="lastName" id="lastName" required>
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select class="form-select" v-model="gender" id="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="dateOfBirth" class="form-label">Date of Birth</label>
          <input type="date" class="form-control" v-model="dateOfBirth" id="dateOfBirth" required>
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">Register</button>
        </div>
      </form>
    </div>
    <div :class="isModalShown? 'modal fade show' : 'modal fade'" id="registrationModal" ref="registrationModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="registrationStatus === 'success'">Registration Successful</h5>
            <h5 class="modal-title" v-else-if="registrationStatus === 'error'">Registration Error</h5>
          </div>
          <div class="modal-body">
            <p v-if="registrationStatus === 'success'">Congratulations! You have successfully registered.</p>
            <p v-else-if="registrationStatus === 'error'">{{ errorMessage }}</p>
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
import axios from 'axios';
import baseMixin from "../common/baseMixin";

export default {
  mixins: [baseMixin],
  data() {
    return {
      showPassword : true,
      showConfirmPassword : true,
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      dateOfBirth: '',
      registrationStatus: null,
      isModalShown: false,
      errorMessage: "Oops! Something went wrong during registration."
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.confirmPassword;
    },
  },
  methods: {
    async registerUser() {
      if (this.passwordMismatch) {
        return;
      }
      try {
        const response = await axios.post(this.basePath+'register', {
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          dateOfBirth: this.dateOfBirth
        });

        if (response.status === 200) {
          this.registrationStatus = 'success';
          console.log('Korisnik je uspešno registrovan.');
        } else {
          this.registrationStatus = 'error';
          console.log('Došlo je do greške prilikom registracije korisnika.');
        }
        this.showModal();
        return;

      } catch (error) {
        this.registrationStatus = 'error';
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "Oops! Something went wrong during registration.";
        }
        this.showModal();

        console.log('Došlo je do greške prilikom registracije korisnika.');
      }
    },
    togglePasswordVisibility(field) {
      if (field=='password') {
        this.showPassword = !this.showPassword;
      } else {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
      const input = document.getElementById(field);
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    },
    showModal() {
      const modal = new bootstrap.Modal(this.$refs.registrationModal, {backdrop: 'static',});
      modal.show();
      this.isModalShown=true;
    },

    closeModal() {
      const modal = new bootstrap.Modal(this.$refs.registrationModal);
      modal.dispose();
      this.isModalShown=false;
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
      if (this.registrationStatus === 'success'){
        this.$router.push('/');
      } else {
        location.reload();
      }

    },
  },
};
</script>
