/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from 'vue';
import { API_ADDRESS_CODE, API_ADDRESS_SAVE, API_ADDRESS_GET_EDIT, API_ADDRESS_EDIT_SAVE } from '@/libs/api'
import { Field, Switch, Popup, Picker, Toast } from 'mint-ui';

Vue.component("mt-switch", Switch);
Vue.component("mt-field", Field);
Vue.component("mt-popup", Popup);
Vue.component("mt-picker", Picker);
export default {
  name: 'addressAdd',
  components: {},
  data(){
    return {
      isBoolean: true,
      //省市区联动选择
      isProvince: false,
      isCity: false,
      isCounty: false,
      isTower: false,
      //是否为默认地址
      isDefault: false,
      //收货人
      consignee: {
        name: '',
        status: ''
      },
      phone: {
        name: '',
        status: ''
      },
      //选中省市区传给后端的codeKey
      provinceVal: {
        codeValue: '',
        codeKey: ''
      },
      cityVal: {
        codeValue: '',
        codeKey: ''
      },
      countyVal: {
        codeValue: '',
        codeKey: ''
      },
      //所在楼
      towerVal: {
        codeValue: '',
        codeKey: ''
      },
      //详细地址
      addressText: '',
      //地址联动选择，码表
      codeList: {
        sys_province: [
          {
            flex: 1,
            values: [
              {
                codeKey: '',
                codeValue: ''
              }
            ],
            className: 'sys_province',
            textAlign: 'center'
          }
        ],
        sys_city: [
          {
            flex: 1,
            values: [
              {
                codeKey: '',
                codeValue: ''
              }
            ],
            className: 'sys_city',
            textAlign: 'center'
          }
        ],
        sys_county: [
          {
            flex: 1,
            values: [
              {
                codeKey: '',
                codeValue: ''
              }
            ],
            className: 'sys_county',
            textAlign: 'center'
          }
        ],
        building_number: [
          {
            flex: 1,
            values: [
              {
                codeKey: '',
                codeValue: ''
              }
            ],
            className: 'building_number',
            textAlign: 'center'
          }
        ]
      },
      /****************@新增END*********************/
      //编辑id
      editId: '',
      editData: null,
      saveUrl: API_ADDRESS_SAVE
    }
  },
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
    //输入框字段验证
    verify(){
      if (!(/^1[34578]\d{9}$/.test(this.phone.name))) {
        Toast("请输入正确格式的手机号");
        this.phone.status = "error";
      } else {
        this.phone.status = "success";
      }
    },
    //打开选择模态框
    openModal( type, num = 0, values ){
      switch (type) {
        case "sys_province":
          if (num == 0) {
            this.getAddressCode(type, 0);
            this.isProvince = true;
            return;
          }
          if (num == 1) {
            this.provinceVal = values;
            return;
          }
          break;
        case "sys_city":
          if (num == 0) {
            this.getAddressCode(type, this.provinceVal.codeKey);
            this.isCity = true;
            return;
          }
          if (num == 1) {
            this.cityVal = values;
            return;
          }
          break;
        case "sys_county":
          if (num == 0) {
            this.getAddressCode(type, this.cityVal.codeKey);
            this.isCounty = true;
            return;
          }
          if (num == 1) {
            this.countyVal = values;
            return;
          }
          break;
        case "building_number":
          if (num == 0) {
            this.getAddressCode(type, this.countyVal.codeKey);
            this.isTower = true;
            return;
          }
          if (num == 1) {
            this.towerVal = values;
            return;
          }
          break;
      }
    },
    //点击收货地址获取省
    getAddressCode( type, code ){
      if (code !== "") {
        let url = API_ADDRESS_CODE;
        let params = {
          categoryCode: type,
          parentCodeKey: code
        };
        this.$get(url, params).then(res => {
          if (res.data.retCode == "200") {
            this.codeList[ type ][ 0 ].values = res.data.data;
            this.editId && this.setSelect(this.codeList[ type ][ 0 ].values, type);
            this.isSelect = true;
          } else {
            Toast(res.data.message);
          }
        })
      } else {
        Toast("请先选择上级");
      }
    },
    //下拉框变化取值
    addressChange( picker, values ){
      let type = picker.$vnode.data.ref;
      if (values[ 0 ] && values[ 0 ].codeKey) {
        this.openModal(type, 1, values[ 0 ]);
      }
    },
    //必填字段验证
    mustParams(){
      let code = "success";
      if (!this.consignee.name) {
        Toast("请填写收货人姓名");
        this.consignee.status = 'error';
        code = "err";
        return code;
      } else {
        this.consignee.status = 'success';
      }
      if (!this.provinceVal.codeKey) {
        Toast("请选择所在省");
        code = "err";
        return code;
      }
      if (!this.cityVal.codeKey) {
        Toast("请选择所在市");
        code = "err";
        return code;
      }
      if (!this.countyVal.codeKey) {
        Toast("请选择所在区县");
        code = "err";
        return code;
      }
      if (!this.phone.name) {
        Toast("请填写收货人手机号");
        this.phone.status = "error";
        code = "err";
        return code;
      } else {
        this.phone.status = "success";
      }
      return code;
    },
    saveAddress(){
      let url = this.saveUrl;
      let code = this.mustParams();
      if (code == "success") {
        let params = {
          provinceId: this.provinceVal.codeKey,
          cityId: this.cityVal.codeKey,
          countyId: this.countyVal.codeKey,
          defaultAddress: +this.isDefault,
          detailAddress: this.addressText,
          phone: this.phone.name,
          //收货人姓名
          receiver: this.consignee.name,
          //楼
          townId: this.towerVal.codeKey || '',
          defaultInvoiceAddress: 1
        };
        this.editId? params.id = this.editId: '';
        this.$post(url, params).then(res => {
          if (res.data.retCode == "200") {
            this.$router.push({ name: 'addressList' });
            Toast("保存成功");
          } else {
            Toast(res.data.message);
          }
        })
      }
    },
    /***************@新增End******************/
    //编辑页面初始化方法
    editInit(){
      this.$route.meta.title = "编辑收货地址";
      this.saveUrl = API_ADDRESS_EDIT_SAVE;
      this.getEditData();
    },
    //获取编辑数据
    getEditData(){
      let url = API_ADDRESS_GET_EDIT + this.editId;
      this.$get(url).then(res => {
        if (res.data.retCode == "200") {
          this.editData = res.data.data;
          this.setEditInput(res.data.data);
        } else {
          Toast(res.data.message);
        }
      })
    },
    //用编辑数据给输入框赋值
    setEditInput( data ){
      this.provinceVal.codeValue = data.provinceName;
      this.provinceVal.codeKey = data.provinceId;
      this.cityVal.codeValue = data.cityName;
      this.cityVal.codeKey = data.cityId;
      this.countyVal.codeValue = data.countyName;
      this.countyVal.codeKey = data.countyId;
      this.towerVal.codeValue = data.townName;
      this.towerVal.codeKey = data.townId;
      this.isDefault = data.defaultAddress == "0"? false: true;
      this.addressText = data.detailAddress;
      this.phone.name = data.phone;
      //收货人姓名
      this.consignee.name = data.receiver;
      //楼
      this.towerVal.codeKey = data.townName;
    },
    //用编辑数据设置下拉框选中值
    setSelect( data, type ){
      let typeCode, index = '';
      typeCode = type.replace("sys_", '') + 'Id';
      if (type == "building_number") {
        typeCode = "townId";
      }
      data.forEach(( ele, k ) => {
        if (this.editData[ typeCode ] == ele.codeKey) {
          this.codeList[ type ][ 0 ].defaultIndex = k;
        }
      });
      switch (type) {
        case 'sys_province':
          this.provinceDefault = index;
          break;
        case 'sys_city':
          this.cityDefault = index;
          break;
        case 'sys_county':
          this.countyDefault = index;
          break;
      }
    },
  },
  created(){
    this.setConfig();
    this.bus.$on("save", () => this.saveAddress());
    this.$route.meta.title = "新增收货地址";
    //编辑初始化
    this.editId = this.$route.query.id;
    this.editId && this.editInit();
  },
  beforeDestroy(){
    this.bus.$off('save');
  }
}
