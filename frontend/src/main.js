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
import CarRentalObject from "./components/CarRentalObject";
import VehicleForm from "./components/VehicleForm";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import MyCart from "./components/MyCart";
import Orders from "./components/Orders";

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
        path: '/rent-a-car/:id',
        component: CarRentalObject,
        props: true
    },
    {
        path: '/mycart/',
        component: MyCart,
        beforeEnter: (to, from, next) => {
            const userRole = localStorage.getItem('role');
            if (userRole === 'USER') {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/vehicle/:objectid',
        component: VehicleForm,
        props: true,
        beforeEnter: (to, from, next) => {
            const userRole = localStorage.getItem('role');
            if (userRole === 'MANAGER') {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/profile',
        component: Profile,
        beforeEnter: (to, from, next) => {
            const userRole = localStorage.getItem('role');
            if (userRole) {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/myorders',
        component: Orders,
        beforeEnter: (to, from, next) => {
            const userRole = localStorage.getItem('role');
            if (userRole === 'USER' || userRole === 'MANAGER') {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/edit-profile/:userId',
        component: EditProfile,
        props: true,
        beforeEnter: (to, from, next) => {
            const userRole = localStorage.getItem('role');
            if (userRole) {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/facility',
        component: CarRentalObjectForm,
        beforeEnter: (to, from, next) => {
            const userRole = localStorage.getItem('role');
            if (userRole === 'ADMIN') {
                next();
            } else {
                next('/');
            }
        }
    },
    { path: '*', redirect: '/rent-a-car' },
];

const router = new VueRouter({
    mode: 'history', // Enable history mode
    routes,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
