import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import RegisterUser from '@/views/RegisterUser.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
