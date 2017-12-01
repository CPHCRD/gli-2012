import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/About';
import Calculator from '@/components/Calculator';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/',
      name: 'Calculator',
      component: Calculator,
    },
  ],
});
