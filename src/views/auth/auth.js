import { API_WECHAT_OAUTH_ACCESSTOKEN } from '@/libs/api.js';

export default {
  name: 'auth',
  data(){
    return {}
  },
  created(){
    if (this.$route.query.code) {//如果连接中能拿到code说明此时access_token没有或者已过期，需要重新获取token
      let obj = {};
      var url = API_WECHAT_OAUTH_ACCESSTOKEN + this.$route.query.code;
      this.$get(url).then(res => {
        if (res.data.retCode == 200) {
          sessionStorage.setItem('wechataccess_token', res.data.data.access_token);
          //因为浏览器刷新vuex的值就初始化了，所以需要存到浏览器中。store地方太多，暂时这么改改
          sessionStorage.setItem('wechatuser_userName', res.data.data.userName);
          sessionStorage.setItem('wechatuser_id', res.data.data.user_id);
          sessionStorage.setItem('wechatuser_type', res.data.data.userType);//0普通用户  1派送员
          sessionStorage.setItem('wechatuserImg', res.data.data.platformAvatarAddress);
          sessionStorage.setItem('wechatuserNick', res.data.data.userNick);
          sessionStorage.setItem('wechatphone', res.data.data.phone);
          sessionStorage.setItem('wechatcompanyName', res.data.data.companyName);
          sessionStorage.setItem('wechatcompanyId', res.data.data.companyId);
          obj = {
            userName: res.data.data.userName,
            userId: res.data.data.user_id,
            userType: res.data.data.userType,
            userImg: res.data.data.platformAvatarAddress,
            userNickName: res.data.data.userNick,
            phone: res.data.data.phone,
            companyName: res.data.data.companyName,
            companyId: res.data.data.companyId
          };
          this.$store.commit("setUse", obj);       
          let url = sessionStorage.getItem("beforeUrl");
          //跳转
          this.$router.push(url);


          // var timer = setTimeout(()=>{
          //   sessionStorage.removeItem('wechataccess_token');
          //   alert('清空token');
          //   clearTimeout(timer);
          // },60000);
        } else {
          this.Toast(res.data.message);
        }
      })
    }
  },
  mounted(){
  }
}
