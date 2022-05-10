

require('./bootstrap');

import Form from 'vform';
import Swal from 'sweetalert2'
import VueProgressBar from 'vue-progressbar'
import {
    AlertError,
} from 'vform/src/components/bootstrap5'
// 'vform/src/components/bootstrap4'
// 'vform/src/components/tailwind'


window.Form = Form;
window.Vue = require('vue').default;
window.Swal = Swal;
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

Vue.component(AlertError.name, AlertError)
Vue.component('product-component', require('./components/ProductComponent.vue').default);

Vue.component('pagination', require('laravel-vue-pagination'));


Vue.use(VueProgressBar, {
  color: '#0d6efd',
  failedColor: 'red',
  height: '2px'
})

const app = new Vue({
    el: '#app'
});