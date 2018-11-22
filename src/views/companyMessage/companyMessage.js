/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from "vue";
import { Field } from 'mint-ui';

Vue.component("mt-field", Field);

export default {
  name: 'companyMessage',
  components: {},
  data(){
    return {
      companyName: {
        name: '',
        status: ''
      },
      companyBoss: {
        name: '',
        status: ''
      },
      companyAddress: {
        name: '',
        status: ''
      }
    }
  },
  computed: {},
  methods: {
    setConfig(){
      let headerBar = {
        isBack: true,
        isWaterAdd: false,
        isAddressSave: true
      };
      this.$store.commit("setMenu", [ true, false ]);
      this.$store.commit("setHeaderBar", headerBar);
    },
    //验证填写信息
    verify( name ){
      console.log(name);
    },
    submitInfo() {

    }
  },
  created(){
    this.setConfig();
    this.bus.$on("save", () => this.submitInfo());
  }
}
