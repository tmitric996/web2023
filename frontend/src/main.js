import Vue from 'vue';
import VueRouter from 'vue-router';
import RegistrationForm from './components/RegistrationForm.vue';
import LoginForm from './components/LoginForm.vue';
import App from "./components/App";

const routes = [
    { path: '/register', component: RegistrationForm },
    { path: '/login', component: LoginForm },
    // Dodajte druge rute po potrebi
];

const router = new VueRouter({
    routes,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
