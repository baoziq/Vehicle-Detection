import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import VehicleDetection from '../components/VehicleDetection.vue'
import SelectFunction from '../components/Choose.vue'
import TrafficFlowRecognition from '../components/TrafficDetection.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  {
    path: '/detect', component: VehicleDetection
  },
  {
    path: '/choose', 
    component: SelectFunction,
    meta: { requiresAuth: true }
  },
  {
    path: '/traffic', component: TrafficFlowRecognition
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/login' })
  } else {
    next()
  }
})


export default router;
