

require('./bootstrap');

import Form from 'vform';
import {
    AlertError,
  } from 'vform/src/components/bootstrap5'
  // 'vform/src/components/bootstrap4'
  // 'vform/src/components/tailwind'
  
 
window.Form = Form;
window.Vue = require('vue').default;

Vue.component(AlertError.name, AlertError)
Vue.component('product-component', require('./components/ProductComponent.vue').default);

Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app'
});