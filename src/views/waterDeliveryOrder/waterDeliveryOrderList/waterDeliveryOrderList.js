import Vue from 'vue';
import top from '@/components/top/Top.vue'
import { API_CUSTOMER, API_FILE_PATH } from '@/libs/api.js'
import { Loadmore} from 'mint-ui';
Vue.component('mt-loadmore', Loadmore);
export default {
  name: 'waterDeliveryOrderList',
  components: { top },
  data(){
    return {  
      rootUrl: API_FILE_PATH,
      pageNumber: 1,
      loading: false,   
      waterDeliveryOrderList:[]
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
    loadTop() {// 刷新页面
      this.loadListData();
      this.$refs.loadmore.onTopLoaded();
    },
    //已加载全部数据
    loadListData(num = 1) {//搜索按钮
      this.pageNumber = num
      let params = {
        pageNumber: num,
        pageSize: 10,
        isEmpty: 0
      }
      let url = API_CUSTOMER + 'order-records/phone/query/userlist'
      this.$get(url, params).then(res => {
        if (res.data.retCode == 200) {
          this.loading = false
          this.pageNumber == "1" ? this.waterDeliveryOrderList = res.data.data.records
            : this.waterDeliveryOrderList = this.waterDeliveryOrderList.concat(res.data.data.records);
          res.data.data.records.length == 0 ? this.Toast("已加载全部数据") : '';        
        } else {
          this.Toast({
            message: res.data.message,
            position: 'center',
            duration: 2000
          })
        }
      })
    },
    //上拉加载
    loadMore() {
      this.loading = true
      this.pageNumber++
      this.loadListData(this.pageNumber)
    },
    godetail(current,id){
        this.$router.push({
        name: 'sendOrderDetail',
        query: {
          status: current,
          id: id
        }
      })
    }  
  },
  mounted(){
    this.loadListData()
  },
  created(){
    this.setConfig()
  }
}
