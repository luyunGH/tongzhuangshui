/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from 'vue';
import { MessageBox, Toast } from 'mint-ui';
import { API_ADDRESS_LIST, API_ADDRESS_DELE } from '@/libs/api'

export default {
  name: 'addressList',
  components: {},
  data() {
    return {
      isDefault: true,
      addressData: [],
      checkboxShow:'',//是否显示checkbox选择按钮
    }
  },
  computed: {},
  methods: {
    setConfig() {
      let headerBar = {
        isBack: true,
        isWaterAdd: false,
        isAddressSave: false
      };
      this.$store.commit("setMenu", [true, false]);
      this.$store.commit("setHeaderBar", headerBar);
    },
    toAdd(num, id = '') {
      //新增为1  编辑为2
      this.$router.push({
        name: 'addressAdd',
        query: { type: num, id: id }
      })
    },
    //获取收货地址列表
    getAddressList() {
      let url = API_ADDRESS_LIST;
      this.$get(url).then(res => {
        if (res.data.retCode == "200") {
          res.data.data.forEach(ele => {
            ele.selected = false;
          })
          this.addressData = res.data.data;
        } else {
          Toast(res.data.message);
        }
      })
    },
    //删除模态框弹框
    openDele(id) {
      MessageBox.confirm('确定删除?').then(action => this.deletePost(id));
    },
    //删除请求
    deletePost(id) {
      let url = API_ADDRESS_DELE + id;
      this.$post(url).then(res => {
        if (res.data.retCode == "200") {
          Toast("删除成功");
          this.getAddressList();
        } else {
          Toast(res.data.message);
        }
      })
    },
    //选择本次订单需要的收货地址
    selAddress(index) {
      this.addressData[index].selected = !this.addressData[index].selected;
      var timer = setTimeout(()=>{
        var obj = {
          receiver: this.addressData[index].receiver,
          phone: this.addressData[index].phone,
          province: this.addressData[index].provinceName,
          city: this.addressData[index].cityName,
          county: this.addressData[index].countyName,
          town: this.addressData[index].townName,
          detailedAddress: this.addressData[index].detailAddress
        }
        var addressStr = JSON.stringify(obj);
        this.$router.push({
          name:'waterDeliveryOrderAdd',
          query:{
            address: addressStr
          }
        })
        clearTimeout(timer);
      },200);
    }
  },
  created() {
    this.setConfig();
    this.getAddressList();
    this.checkboxShow = sessionStorage.getItem('selAddress');
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'waterDeliveryOrderAdd'){//只有返回创建配送订单页，删除checkbox标识
      sessionStorage.removeItem('selAddress');
    }
    next();
  }
}
