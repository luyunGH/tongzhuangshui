/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from 'vue';
import { Cell } from 'mint-ui';

Vue.component("mt-cell", Cell);
export default {
  name: 'person',
  components: {},
  data(){
    return {
      user: this.$store.state.userInfo
    }
  },
  filters: {
    typeFilter( e ){
      let name = '';
      if (e == '0') {
        name = "普通用户";
      } else if (e == "1") {
        name = "派送员"
      }
      return name;
    }
  },
  methods: {
    toPerson(){
      this.$router.push({ name: 'personMessage' })
    },
    goSendOrderList: function (index) {  
      this.$router.push({
        name: 'sendOrderList',
        query: {
          status: index
        }
      })
    }
  },
  created(){
    this.$store.commit("setMenu", [ false, true ]);
  }
}
