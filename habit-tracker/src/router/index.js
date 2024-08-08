import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/day/:date',
    name: 'home',
    component: Home,
  },
  {
    path: '/',
    redirect: `/day/${getCurrentDate()}`, // Redirect to today by default
  },
];

function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
