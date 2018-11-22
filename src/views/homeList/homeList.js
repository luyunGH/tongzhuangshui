import Vue from 'vue';
import { API_COMMODITYS_PHONE_LIST,API_FILE_PATH,API_WECHAT_OAUTH_ACCESSTOKEN } from "@/libs/api"
import { Loadmore,Search} from 'mint-ui';
Vue.component('mt-loadmore', Loadmore);
Vue.component('mt-search', Search);
export default {
  name: 'homeList',
  components: {},
  data() {
    return {
      rootUrl:API_FILE_PATH,//图片回显路径
      commodityName:'',//搜索查询参数
      listData: []
    }
  },
  computed: {},
  methods: {
    setConfig(){
      let headerBar = {
        isBack: false,
        isWaterAdd: false,
        isAddressSave: false
      };
      this.$store.commit("setMenu", [ true, true ]);
      this.$store.commit("setHeaderBar", headerBar);
    },
    loadListData() {//加载列表数据
      var url = API_COMMODITYS_PHONE_LIST;
      var params = {
        commodityName:this.commodityName
      }
      this.$get(url,params).then(res=>{
        if(res.data.retCode == 200){
          this.listData = res.data.data;
        }else{
          //业务错误
          this.Toast({
            message: res.data.message,
            position: 'center',
            duration: 2000
          })
        }
      }).catch(res=>{
        console.log(res);
      })
    },
    loadTop() {// 刷新页面
      this.loadListData();
      this.$refs.loadmore.onTopLoaded();
    },
    toDetail(obj) {//进入详情
      this.$router.push({
        name: 'productDetail',
        query: {
          id: obj.id
        }
      });
    },
    
  },
  created() {
    this.loadListData();
    this.setConfig();
  }
}
