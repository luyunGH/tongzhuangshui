// import top from '@/components/top/Top.vue'
import { API_CUSTOMER, API_FILE_PATH } from '@/libs/api.js'
export default {
  name: 'sendOrderDetail',
  components: { },
  data() {
    return {
      rootUrl: API_FILE_PATH,
      sendOrderDetail: [],
      adderssdata: [],
      status: 0,
      statuslist: ['待派送', '派送中', '已送达'],
      current: 2,
      id: ''
    }
  },
  computed: {},
  methods: {
    setConfig(){
      let headerBar = {
        isBack: true,
        isWaterAdd: false,
        isAddressSave: false
      };
      this.$store.commit("setMenu", [ true, false ]);
      this.$store.commit("setHeaderBar", headerBar);
    },
    //详情页面加载
    detailload(id) {
      var url = API_CUSTOMER + 'order-records/phone/recorddetail/' + id
      this.$get(url).then(res => {
        if (res.data.retCode == 200) {
          this.sendOrderDetail = [res.data.data]
        } else {
          this.Toast({
            message: res.data.message,
            position: 'center',
            duration: 2000
          })
        }
      })
    },
    //派送送达操作
    statusload(current, id) {
      if (current == 2) {
        var url = API_CUSTOMER + 'order-records/phone/accept/batch'
      }
      if (current == 3) {
        var url = API_CUSTOMER + 'order-records/phone/confirmsend/batch'
      }
      var params = id.split()
      this.$post(url, params).then(res => {
        if (res.data.retCode == 200) {
          this.Toast({
            message: "成功！",
            position: 'center',
            duration: 2000
          })
          this.$router.go(-1)
        } else {
          this.Toast({
            message: res.data.message,
            position: 'center',
            duration: 2000
          })
        }
      }).catch(res => {
                console.log(res);
      })
    },
    //派送送达取消
    statuscancel(current, id) {
      if (current == 2) {
        var url=API_CUSTOMER+'order-records/phone/cancel/orderrecord/'+id   
        var params={}  
      }
      if (current == 3) {
        var url = API_CUSTOMER + 'order-records/phone/cancelsend/batch'
        var params = id.split()
      }   
      this.$post(url, params).then(res => {
        if (res.data.retCode == 200) {
          this.Toast({
            message: "成功！",
            position: 'center',
            duration: 2000
          })
          this.$router.go(-1)
        } else {
          this.Toast({
            message: res.data.message,
            position: 'center',
            duration: 2000
          })
        }
      }).catch(res => {
                console.log(res);
      })
    },
    //tab 改变状态 跳页面
    addClass: function (index) {
      this.current = index + 2;
      this.$router.push({
        name: 'sendOrderList',
        query: {
          status: this.current
        }
      })
    }
  },
  mounted() {
    this.current = this.$route.query.status
    this.id = this.$route.query.id
    this.detailload(this.id)
  },
  created(){
    this.setConfig()
    this.userType=sessionStorage.getItem('wechatuser_type')
  }
}
