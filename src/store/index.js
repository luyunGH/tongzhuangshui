import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  //因为浏览器刷新vuex的值就初始化了，所以需要存到浏览器中。store地方太多，暂时这么改改
  state: {
    //用户信息
    userInfo: {
      userName: sessionStorage.getItem('wechatuser_userName'),
      userId: sessionStorage.getItem('wechatuser_id'),
      //用户类型  0普通用户  1派送员
      userType: sessionStorage.getItem('wechatuser_type'),
      //用户微信头像
      userImg: sessionStorage.getItem('wechatuserImg'),
      //用户微信昵称
      userNickName: sessionStorage.getItem('wechatuserNick'),
      phone: sessionStorage.getItem('wechatphone')
    },
    //头部是否显示
    isHeader: true,
    //底部部是否显示
    isFooter: true,
    //头部左边操作按钮
    headerBar: {
      isBack: true,
      isWaterAdd: false,
      isAddressSave: false
    }
  },
  mutations: {
    //设置头部底部的显示隐藏
    setMenu( state, statusArr ){
      state.isHeader = statusArr[ 0 ];
      state.isFooter = statusArr[ 1 ];
    },
    //设置头部菜单按钮
    setHeaderBar( state, obj ){
      state.headerBar = obj;
    },
    //保存用户信息
    setUse( state, obj ) {
      state.userInfo = obj;
    }
  }
});

export default store;
