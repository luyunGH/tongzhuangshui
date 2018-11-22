import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../src/store'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css';
import './main.css'
import { postFn, getFn } from './libs/http.js'
import { Button,Toast,InfiniteScroll,Spinner } from 'mint-ui';
import wx from 'weixin-js-sdk';

Vue.component('spm-button', Button);
Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);
Vue.config.productionTip = false;

Vue.prototype.$post = postFn;
Vue.prototype.$get = getFn;
Vue.prototype.Toast = Toast;
Vue.prototype.wx = wx;
Vue.prototype.bus = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
