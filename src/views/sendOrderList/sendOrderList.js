// import top from '@/components/top/Top.vue'
import Vue from 'vue';
import { API_CUSTOMER, API_FILE_PATH } from '@/libs/api.js'
import { Loadmore} from 'mint-ui';
Vue.component('mt-loadmore', Loadmore);
export default {
  name: 'sendOrderList',
  components: {  },
  data() {
    return {
      rootUrl: API_FILE_PATH,
      sendOrderList: [],
      status: 0,
      statuslist: ['待派送', '派送中', '已送达'],
      current: 2,
      commodityName: '',//查询参数
      pageNumber: 1,
      loading: false,
      userType:0,//判断普通用户，还是派送员
    }
  },
  computed: {},
  methods: {
    // distributionStatus 配送状态 2-待配送 3-配送中 4-已送达
    setConfig(){
      let headerBar = {
        isBack: true,
        isWaterAdd: false,
        isAddressSave: false
      };
      this.$store.commit("setMenu", [ true, false ]);
      this.$store.commit("setHeaderBar", headerBar);
    },
    loadTop() {// 刷新页面
      this.loadListData();
      this.$refs.loadmore.onTopLoaded();
    },
    //已加载全部数据
    loadListData(num = 1,commodityName) {//搜索按钮
      this.pageNumber = num
      let params = {
        pageNumber: num,
        pageSize: 10,
        distributionStatus: this.current,
        isEmpty: 0
      }
      // params.commodityName=commodityName?commodityName:""
      let url = API_CUSTOMER + 'order-records/phone/query/waitwater'
      this.$get(url, params).then(res => {
        if (res.data.retCode == 200) {
          this.loading = false
          this.pageNumber == "1" ? this.sendOrderList = res.data.data.records
            : this.sendOrderList = this.sendOrderList.concat(res.data.data.records);
          res.data.data.records.length == 0 ? this.Toast("已加载全部数据") : '';
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
    //上拉加载
    loadMore() {
      this.loading = true
      this.pageNumber++
      this.loadListData(this.pageNumber)
    },
    //派送，送达操作
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
          this.sendOrderList.forEach((item, index) => {
            if (item.id == id) {
              this.sendOrderList.splice(index, 1)
            }
          })
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
    //派送，送达 取消
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
          this.sendOrderList.forEach((item, index) => {
            if (item.id == id) {
              this.sendOrderList.splice(index, 1)
            }
          })
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
    //跳详情
    godetail(current, id) {
      this.$router.push({
        name: 'sendOrderDetail',
        query: {
          status: current,
          id: id
        }
      })
    },
    //tab添加class,改变状态
    addClass: function (index) {
      this.current = index + 2;
      this.$router.replace({
        name: 'sendOrderList',
        query: {
          status: this.current
        }
      })
      this.loadListData()
    } 
  },
  mounted() {
    this.status = 2
    this.current = this.$route.query.status ? this.$route.query.status : this.status
    this.loadListData()
  },
  created(){
    this.setConfig()
    this.userType=sessionStorage.getItem('wechatuser_type')=="0"?0:1
    console.log('用户身份jiangyx:'+this.userType)
  }
}
