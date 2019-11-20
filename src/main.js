import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import {routes} from './router';

import VeeValidate from 'vee-validate';

import VueResource from 'vue-resource';
import VueRouter from "vue-router";

import VueSession from 'vue-session';

import VueEditor  from "vue2-editor";

import Vuetify from "vuetify";


Vue.use(Vuetify);


Vue.use(VueEditor);

Vue.use(VueSession);
Vue.use(VueRouter);

Vue.use(VeeValidate);


Vue.use(VueResource);
Vue.http.options.root =  'https://mediador-pedagogico.herokuapp.com';
//Vue.url.options.root = 'http://10.6.97.145:8080';
//this.$http.options.root =  'http://10.6.97.145:8080';
Vue.use(VueRouter);



const router = new VueRouter({
    routes : routes,
    mode: 'history'
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
