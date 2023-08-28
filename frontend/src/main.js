import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap';
import VueRouter from 'vue-router';
import RegistrationForm from './components/RegistrationForm.vue';
import LoginForm from './components/LoginForm.vue';
import App from './components/App.vue';
import CarRentalObjectForm from "./components/CarRentalObjectForm";
import CarRentalObjectList from "./components/CarRentalObjectList";

Vue.use(VueRouter);

const routes = [
    {
        path: '/register/:objectmanager?',
        component: RegistrationForm,
        props: true
    },
    {
        path: '/login',
        component: LoginForm
    },
    {
        path: '/rent-a-car',
        component: CarRentalObjectList
    },
    {
        path: '/facility',
        component: CarRentalObjectForm,
        // beforeEnter: (to, from, next) => {
        //     const userRole = localStorage.getItem('role');
        //     if (userRole === 'ADMIN') {
        //         next();
        //     } else {
        //         // Korisnik nema odgovarajuću ulogu, preusmeri ga na neku drugu rutu
        //         next('/');
        //     }
        // }
    },
];

const router = new VueRouter({
    mode: 'history', // Enable history mode
    routes,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
