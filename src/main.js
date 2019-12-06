// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VCalendar from 'v-calendar';
import * as VueGoogleMaps from 'vue2-google-maps';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';

//我加的
import axios from 'axios';
import swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import store from './store';
import router from './Routes';
import App from './App';

Vue.use(BootstrapVue);

//我加的
Vue.use(VueLoading, {
  canCancel: false,
  color: '#000000',
  loader: 'dots', //spinner/dots/bars
  width: 50,
  height: 50,
  backgroundColor: '#ffffff',
  isFullPage: true,
  opacity: 0.8
});

//我加的
window.axios = axios;
Vue.use(swal);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
});





Vue.use(Toasted, {duration: 10000});
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
