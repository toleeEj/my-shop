// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ProductDetails from '../components/ProductDetails.vue';
import MyCart from '../components/MyCart.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/products', component: ProductList, name: 'ProductList' },
  { path: '/product/:id', component: ProductDetails, name: 'ProductDetails', props: true },
  { path: '/MyCart', component: MyCart, name: 'MyCart' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
