// import top from '@/components/top/Top.vue'
import comSearch from '@/components/search/Search.vue'
import { API_ORDER_RECORDS_PHONE_BUY_LIST, API_FILE_PATH, API_ORDER_RECORDS_PHONE_INSERT_ORDERRECORD, API_ORDER_RECORDS_PHONE_CHECK_ORDERRECORD, API_MEMBERSHIP_ADDRESS_QUERY_DEFAULT } from '@/libs/api.js';
export default {
  name: 'waterDeliveryOrderAdd',
  components: { comSearch },
  data() {
    return {
      rootUrl: API_FILE_PATH,
      carriage: '',//送水频率
      fixedFrequencyType: '',//送水频率传参用
      startDate: '',
      endDate: '',
      lastAfternoon: '',//送水时段
      week: '',
      listData: [],//购买订单数据
      guestBook: '',
      addressData: {
        receiver: '',
        phone: '',
        province: '',
        city: '',
        county: '',
        town: '',
        detailedAddress: ''
      },
      carriageEle:'',//送水频率picker
      lastAfternoonEle:'',//送水时段picker
      weekEle:''//星期几picker
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
    loadData() {//加载已购列表
      var url = API_ORDER_RECORDS_PHONE_BUY_LIST;
      this.$get(url).then(res => {
        if (res.data.retCode == 200) {
          res.data.data.buyOrderAndCommodityVOList.forEach(ele => {
            ele.deliveryNum = 1;
            ele.checked = false;//是否被创建（0 不被创建，1被创建）
          })
          this.listData = res.data.data.buyOrderAndCommodityVOList;
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
    openSelect() {//打开侧边栏
      this.$refs.search.openSelect("search");
    },
    showDeliveryMethods(obj) {//获取侧边栏参数
      this.carriage = obj.carriage;//送水频率
      this.fixedFrequencyType = obj.fixedFrequencyType;//送水频率传参用
      this.startDate = obj.startDate;
      this.endDate = obj.endDate;
      this.lastAfternoon = obj.lastAfternoon;//送水时段
      this.week = obj.week;
    },
    carriageEleFn (obj){
      this.carriageEle = obj;
    },
    lastAfternoonEleFn(obj) {
      this.lastAfternoonEle = obj;
    },
    weekEleFn(obj) {
      this.weekEle = obj;
    },
    addQuantityFn(index) {//添加数量
      if (this.listData[index].deliveryNum >= this.listData[index].singleCommodityRemainQuantity) {
        this.Toast({
          message: '不能超过剩余数量',
          position: 'center',
          duration: 2000
        })
      } else {
        this.listData[index].deliveryNum++;
      }
    },
    reduceQuantityFn(index) {//减少数量
      if (this.listData[index].deliveryNum > 1) {
        this.listData[index].deliveryNum--;
      }
    },
    checkFn(index) {//选择需要创建的订单
      if(this.listData[index].singleCommodityRemainQuantity == 0){
        this.Toast({
          message: '剩余数量为0',
          position: 'center',
          duration: 2000
        })
      }else{
        this.listData[index].checked = !this.listData[index].checked;
      }
    },
    checkOrder() {//校验订单
      /* 参数拼接 */
      var params = JSON.parse(JSON.stringify(this.addressData));
      if (this.fixedFrequencyType == 0) {
        params.fixedFrequencyType = this.fixedFrequencyType;
        params.sendStartDateStr = this.startDate;
      } else {
        params.fixedFrequencyType = this.fixedFrequencyType;
        params.sendStartDateStr = this.startDate;
        params.sendEndDateStr = this.endDate;
      }
      params.lastAfternoon = this.lastAfternoon;
      params.guestBook = this.guestBook;
      params.orderAndCommodityVOList = [];
      this.listData.forEach(ele => {
        if (ele.checked) {
          var obj = {
            orderIdList: ele.orderIdList,
            commodityId: ele.commodityId,
            commodityQuantity: ele.deliveryNum,
            commodityName: ele.commodityName
          }
          params.orderAndCommodityVOList.push(obj);
        }
      })
      /* 参数验证 */
      if (!params.sendStartDateStr) {
        this.Toast({
          message: '请选择开始配送的时间',
          position: 'center',
          duration: 2000
        })
      } else {
        if (!params.sendEndDateStr) {
          this.Toast({
            message: '请选择结束配送的时间',
            position: 'center',
            duration: 2000
          })
        } else {
          if(new Date(params.sendEndDateStr) < new Date(params.sendStartDateStr)){
            this.Toast({
              message: '开始时间不能大于结束时间',
              position: 'center',
              duration: 2000
            })
          }else{
            var url = API_ORDER_RECORDS_PHONE_CHECK_ORDERRECORD;
            this.$post(url, params).then(res => {
              if (res.data.retCode == 200) {
                this.Toast({
                  message: res.data.data,
                  position: 'center',
                  duration: 5000
                })
                sessionStorage.removeItem('dOrderCache');
              } else {
                this.Toast({
                  message: res.data.message,
                  position: 'center',
                  duration: 5000
                })
              }
            }).catch(res => {
              console.log(res);
            })
          }
        }
      }
    },
    createDeliveryOrderFn() {//创建配送订单
      /* 参数拼接 */
      var params = JSON.parse(JSON.stringify(this.addressData));
      if (this.fixedFrequencyType == 0) {
        params.fixedFrequencyType = this.fixedFrequencyType;
        params.sendStartDateStr = this.startDate;
      } else {
        params.fixedFrequencyType = this.fixedFrequencyType;
        params.sendStartDateStr = this.startDate;
        params.sendEndDateStr = this.endDate;
      }
      params.lastAfternoon = this.lastAfternoon;
      params.guestBook = this.guestBook;
      params.orderAndCommodityVOList = [];
      this.listData.forEach(ele => {
        if (ele.checked) {
          var obj = {
            orderIdList: ele.orderIdList,
            commodityId: ele.commodityId,
            commodityQuantity: ele.deliveryNum,
            commodityName: ele.commodityName
          }
          params.orderAndCommodityVOList.push(obj);
        }
      })
      /* 参数验证 */
      var addFlag = false;
      if (params.fixedFrequencyType == 0) {
        if (!params.sendStartDateStr) {
          this.Toast({
            message: '请选择开始配送的时间',
            position: 'center',
            duration: 2000
          })
          addFlag = false;
        }else{
          addFlag = true;
        }
      } else {
        if (!params.sendStartDateStr) {
          this.Toast({
            message: '请选择开始配送的时间',
            position: 'center',
            duration: 2000
          })
          addFlag = false;
        } else {
          if (!params.sendEndDateStr) {
            this.Toast({
              message: '请选择结束配送的时间',
              position: 'center',
              duration: 2000
            })
            addFlag = false;
          } else {
            if(new Date(params.sendEndDateStr) < new Date(params.sendStartDateStr)){
              this.Toast({
                message: '开始时间不能大于结束时间',
                position: 'center',
                duration: 2000
              })
              addFlag = false;
            }else{
              addFlag = true;
            }
          }
        }
      }
      if(addFlag){
        var url = API_ORDER_RECORDS_PHONE_INSERT_ORDERRECORD;
        this.$post(url, params).then(res => {
          if (res.data.retCode == 200) {
            this.Toast({
              message: res.data.data,
              position: 'center',
              duration: 5000
            })
            sessionStorage.removeItem('dOrderCache');
            this.$router.push('homeList');
          } else {
            this.Toast({
              message: res.data.message,
              position: 'center',
              duration: 5000
            })
          }
        }).catch(res => {
          console.log(res);
        })
      }
    },
    getDefaulrAddress() {//获取默认地址
      var url = API_MEMBERSHIP_ADDRESS_QUERY_DEFAULT;
      this.$get(url).then(res => {
        if (res.data.retCode == 200) {
          this.addressData = {
            receiver: res.data.data.receiver,
            phone: res.data.data.phone,
            province: res.data.data.provinceName,
            city: res.data.data.cityName,
            county: res.data.data.countyName,
            town: res.data.data.townName,
            detailedAddress: res.data.data.detailAddress
          }
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
    addressManage() {//管理收货地址
      this.$router.push('addressList');
    },
    cacheDataShow(pageData) {//缓存的数据渲染到页面
      this.listData = pageData.listData;
      this.guestBook = pageData.guestBook;
      this.addressData = pageData.addressData;
      this.carriageEle.setValues([pageData.carriage]);//设置picker改变后的值
      this.$refs.search.onWaterCarriage(this.carriageEle,[pageData.carriage]);
      if(pageData.startDate){
        this.$refs.search.startConfirm(new Date(pageData.startDate));
      }
      if(pageData.endDate){
        this.$refs.search.endConfirm(new Date(pageData.endDate));
      }
      this.lastAfternoonEle.setValues([pageData.lastAfternoon]);//设置picker改变后的值
      this.$refs.search.onLastAfternoon({},[pageData.lastAfternoon]);
      this.weekEle.setValues([pageData.week]);//设置picker改变后的值
      this.$refs.search.onWeek({},[pageData.week]);
    }
  },
  created(){
    this.setConfig()
  },
  mounted() {
    var pageData = JSON.parse(sessionStorage.getItem('dOrderCache'));
    if(pageData) {//有数据说明是从地址维护页面跳转来的
      this.cacheDataShow(pageData);
      if(this.$route.query.address){
        this.addressData = JSON.parse(this.$route.query.address);
      }
    }else {//否则请求页面数据的接口
      this.loadData();
      this.getDefaulrAddress();
    }
  },
  beforeRouteLeave (to, from, next) {//拦截路由
    if(to.name == 'addressList'){//只有区地址维护页面时才去缓存页面的数据
      var obj = {
        carriage: this.carriage,//送水频率
        fixedFrequencyType: this.fixedFrequencyType,//送水频率传参用
        startDate: this.startDate,
        endDate: this.endDate,
        lastAfternoon: this.lastAfternoon,//送水时段
        week: this.week,
        listData: this.listData,//购买订单数据
        guestBook: this.guestBook,
        addressData: this.addressData
      }
      sessionStorage.setItem('dOrderCache',JSON.stringify(obj));
      sessionStorage.setItem('selAddress',true);
    }else{
      sessionStorage.removeItem('dOrderCache');
    }
    next();
  }
}