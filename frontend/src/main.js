import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap';
import VueRouter from 'vue-router';
import RegistrationForm from './components/RegistrationForm.vue';
import LoginForm from './components/LoginForm.vue';
import App from './components/App.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/register', component: RegistrationForm },
    { path: '/login', component: LoginForm },
];

const router = new VueRouter({
    mode: 'history', // Enable history mode
    routes,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
