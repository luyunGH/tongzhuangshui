/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from 'vue';
import { Header } from 'mint-ui';

Vue.component('spm-header', Header);

export default {
  name: 'Top',
  components: {},
  data(){
    return {}
  },
  methods:{
    back() {
      this.$router.go(-1);
    },
    save() {
      this.bus.$emit("save")
    },
    add() {
      this.$router.push({name: "waterDeliveryOrderAdd"})
    }
  },
  created(){

  }
}
