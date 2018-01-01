// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router';
import store from './store';

sync(store, router);

// Vue configuration
Vue.config.productionTip = false;

// Material Design Lite directive
// every material element should have "v-mdl"
Vue.directive('mdl', {
  bind(el) {
    window.componentHandler.upgradeElement(el);
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: { App },
});
