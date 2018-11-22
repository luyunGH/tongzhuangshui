/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from "vue";
import { API_COMPANY_SEARCH, API_PERSON_SAVE } from '@/libs/api';
import { Field, Picker, Toast } from 'mint-ui';

Vue.component("mt-field", Field);
Vue.component("mt-picker", Picker);
// sessionStorage.setItem('wechatuser_userName', res.data.data.userName);
// sessionStorage.setItem('wechatuser_id', res.data.data.user_id);
// sessionStorage.setItem('wechatuser_type', res.data.data.userType);//0普通用户  1派送员
// sessionStorage.setItem('wechatuserImg', res.data.data.platformAvatarAddress);
// sessionStorage.setItem('wechatuserNick', res.data.data.userNick);
// sessionStorage.setItem('wechatphone', res.data.data.phone);
// sessionStorage.setItem('wechatcompanyName', res.data.data.companyName);
// sessionStorage.setItem('wechatcompanyId', res.data.data.companyId);
export default {
  name: 'personMessage',
  components: {},
  data(){
    return {
      user: {
        wechatuser_userName: sessionStorage.getItem('wechatuser_userName') || '',
        wechatuser_id: sessionStorage.getItem('wechatuser_id') || '',
        wechatuser_type: sessionStorage.getItem('wechatuser_type') || '',
        wechatuserImg: sessionStorage.getItem('wechatuserImg') || '',
        wechatuserNick: sessionStorage.getItem('wechatuserNick') || '',
        wechatphone: sessionStorage.getItem('wechatphone') || '',
        wechatcompanyName: sessionStorage.getItem('wechatcompanyName') || '',
        wechatcompanyId: sessionStorage.getItem('wechatcompanyId') || '',
      },
      personName: {
        name: '',
        status: ''
      },
      phone: {
        name: '',
        status: ''
      },
      companyName: {
        name: '',
        status: '',
        key: ''
      },
      companyAddress: {
        name: '',
        status: ''
      },
      //公司码表
      companyList: [ {
        values: []
      } ],
      isPick: false
    }
  },
  filters: {
    typeFilter( e ){
      let name = '';
      if (e == '0') {
        name = "普通用户";
      } else if (e == "1") {
        name = "派送员"
      }
      return name;
    }
  },
  watch: {
    companyName: {
      handler(){
        if (this.companyName.name == '') {
          this.isPick = false;
          this.companyName.status = 'error';
        }
      },
      deep: true
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
    //验证填写信息
    verify( name ){
      if (name == 'phone') {
        if (!(/^1[34578]\d{9}$/.test(this.phone.name))) {
          Toast("请输入正确格式的手机号");
          this.phone.status = "error";
        } else {
          this.phone.status = "success";
        }
      }

    },
    submitInfo(){
      if (!this.phone.name) {
        Toast("请填写手机号");
        this.phone.status = "error";
        return;
      } else {
        this.phone.status = "success";
      }
      let url = API_PERSON_SAVE;
      let params = {
        userName: this.personName.name,
        id: this.$store.state.userInfo.userId,
        phone: this.phone.name,
        companyName: this.companyName.name,
        companyId: this.companyName.key
      };
      this.$post(url, params).then(res => {
        if (res.data.retCode == "200") {
          this.Toast("保存成功");
          this.$router.push({ name: 'personal' });
        } else {
          this.Toast(res.data.message);
        }
      })
    },
    companyChange( picker, values ){
      if (values[ 0 ]) {
        this.companyName.name = values[ 0 ].epName;
        this.companyName.key = values[ 0 ].id;
      }
    },
    //根据输入值模糊查询公司
    getCompany(){
      let url = API_COMPANY_SEARCH;
      let params = {
        epName: this.companyName.name
      };
      this.$get(url, params).then(res => {
        if (res.data.retCode == "200") {
          this.companyList[ 0 ].values = res.data.data;
          this.isPick = true;
        } else {
          this.Toast(res.data.message);
        }
      })
    },
    //初始化赋值
    setDataInit() {
      this.personName.name = this.user.wechatuser_userName || '';
      this.personName.name == 'null'? this.personName.name = '' : '';
      this.phone.name = this.user.wechatphone || '';
      this.phone.name == 'null'? this.user.wechatphone = '' : '';
      this.companyName.name = this.user.wechatcompanyName || '';
      this.companyName.name == 'null'? this.user.wechatcompanyName = '' : '';
    }
  },
  created(){
    this.setConfig();
    this.bus.$on("save", () => this.submitInfo());

    console.log(this.user);
    console.log(this.personName);
    console.log(this.phone);
    console.log(this.companyName);
    console.log(this.companyName);

  },
  beforeDestroy(){
    this.bus.$off('save');
  }
}
