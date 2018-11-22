/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */

export default {
  name: 'Bottom',
  components: {},
  data(){
    return {
      menu: [
        {
          icon: "fa fa-home fa-fw",
          name: "首页",
          routeName: "homeList",
          active: false,
          isShow: true
        },
        {
          icon: "fa fa-list-alt fa-fw",
          name: "购买记录",
          routeName: "purchaseRecord",
          active: false,
          isShow: this.$store.state.userInfo.userType == '0' ? true : false
        },
        {
          icon: "fa fa-list-alt fa-fw",
          name: "配送",
          routeName: this.$store.state.userInfo.userType=='0'?"purchasedWaterList":"sendOrderList",
          active: false,
          isShow: true
        },
        {
          icon: "fa fa-user-o fa-fw",
          name: "个人中心",
          routeName: "personal",
          active: false,
          isShow: true
        }
      ]
    }
  },
  computed: {},
  watch: {
    $route: {
      handler() {
        this.menu.forEach( ele=> {
          ele.active = false;
          if(this.$route.name == ele.routeName) {
            ele.active = true;
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    linkeTo( type, router ){
      this.$router.push({
        name: router,
        query: {
          num: parseInt(Math.random() * 100)
        }
      });
    }
  },
  created(){}
}
