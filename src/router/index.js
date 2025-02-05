import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import VehicleDetection from '../components/VehicleDetection.vue';
import SelectFunction from '../components/Choose.vue';
import TrafficFlowRecognition from '../components/TrafficDetection.vue';
import AdminLogin from '../components/AdminLogin.vue';
import AdminPage from '@/components/AdminPage.vue';
import DeleteUser from '@/components/DeleteUser.vue';
import UserHistory from '@/components/UserHistory.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import UserList from '@/components/UserList.vue';

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
  },
  {
    path: '/admin_login', component: AdminLogin
  },
  {
    path: '/admin', component: AdminPage
  },
  {
    path: '/delete',
    component: DeleteUser
  },
  {
    path: '/history',
    component: UserHistory
  },
  {
    path: '/reset-password',
    component: ResetPassword
  },
  {
    path: '/userlist',
    component: UserList
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
