import Vue from 'vue';
// import top from '@/components/top/Top.vue'
import { API_CUSTOMER, API_FILE_PATH,API_ORDERS_USER_PAGE } from '@/libs/api.js'
import { Loadmore} from 'mint-ui';
Vue.component('mt-loadmore', Loadmore);
export default {
  name: 'purchaseRecord',
  components: { },
  data(){
    return {
      rootUrl: API_FILE_PATH,
      purchaseRecordList:[
        // {
        //   username:'叶落森',
        //   images:"../../../static/images/water.png",
        //   title:"清华桶装水",
        //   Specifications:"100ML",
        //   price:"￥12.00",
        //   oldprice:"￥100.00",
        //   date:'2018-11-08',
        //   num:'1',
        //   totalPrice:'￥12.00'
        // },
        // {
        //   username:'叶落森',
        //   images:"../../../static/images/water.png",
        //   title:"清华桶装水",
        //   Specifications:"100ML",
        //   price:"￥12.00",
        //   oldprice:"￥100.00",
        //   date:'2018-10-08',
        //   num:'2',
        //   totalPrice:'￥24.00'
        // }
      ],
      pageNumber: 1,
      pageSize: 10,
      loading: false,
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
      this.$store.commit("setMenu", [ true, true ]);
      this.$store.commit("setHeaderBar", headerBar);
    },
    loadTop() {// 刷新页面
      this.loadListData();
      this.$refs.loadmore.onTopLoaded();
    },
    loadListData(num = 1) {//搜索按钮
      this.pageNumber = num
      let params = {
        pageNumber: num,
        pageSize: 10,
      }
      let url = API_ORDERS_USER_PAGE
      this.$get(url, params).then(res => {
        if (res.data.retCode == 200) {
          this.loading = false
          this.pageNumber == "1" ? this.purchaseRecordList = res.data.data.records
            : this.purchaseRecordList = this.purchaseRecordList.concat(res.data.data.records);
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
  },
  created(){
    this.setConfig()
  },
  mounted(){
    this.loadListData();
  }
}
