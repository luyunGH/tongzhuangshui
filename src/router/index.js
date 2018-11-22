import Vue from 'vue'
import Router from 'vue-router'
import { authUrl } from '@/libs/api.js'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/personal',
      name: 'home',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/personal',
          name: 'personal',
          meta: {
            title: '个人中心'
          },
          component: () => import('@views/personal/personal.vue')
        },
        {
          path: '/companyMessage',
          name: 'companyMessage',
          meta: {
            title: '公司信息维护'
          },
          component: () => import('@views/companyMessage/companyMessage.vue')
        },
        {
          path: '/personMessage',
          name: 'personMessage',
          meta: {
            title: '个人信息维护'
          },
          component: () => import('@views/personMessage/personMessage.vue')
        },
        {
          path: '/addressList',
          name: 'addressList',
          meta: {
            title: '收货地址'
          },
          component: () => import('@views/address/addressList.vue')
        },
        {
          path: '/addressAdd',
          name: 'addressAdd',
          meta: {
            title: '新增地址'
          },
          component: () => import('@views/address/addressAdd.vue')
        },
        {
          path: '/homeList',
          name: 'homeList',
          meta: {
            title: '首页'
          },
          component: () => import('@views/homeList/homeList.vue')
        },
        {//个人中心  跳转进来的——jiangyx
          path: '/purchaseRecord',
          name: 'purchaseRecord',
          meta: {
            title: '我的购买记录'
          },
          component: () =>
            import ('@/views/purchaseRecord/purchaseRecord.vue')
        },
        {//jiangyx
          path: '/waterDeliveryOrderList',
          name: 'waterDeliveryOrderList',
          meta: {
            title: '配送订单'
          },
          component: () =>
            import ('@/views/waterDeliveryOrder/waterDeliveryOrderList/waterDeliveryOrderList.vue')
        },
        {//派送员看的——jiangyx
          path: '/waterDeliveryOrderAdd',
          name: 'waterDeliveryOrderAdd',
          meta: {
            title: '创建配送订单'
          },
          component: () =>
            import ('@/views/waterDeliveryOrder/waterDeliveryOrderAdd/waterDeliveryOrderAdd.vue')
        },
        {//派送员看的——jiangyx
          path: '/sendOrderList',
          name: 'sendOrderList',
          meta: {
            title: '派送订单列表'
          },
          component: () =>
            import ('@/views/sendOrderList/sendOrderList.vue')
        },
        {
          path: '/sendOrderDetail',
          name: 'sendOrderDetail',
          meta: {
            title: '待派送订单'
          },
          component: () =>
            import ('@/views/sendOrderList/sendOrderDetail.vue')
        },
        {
          path: '/purchasedWaterList',
          name: 'purchasedWaterList',
          meta: {
            title: '已购商品列表'
          },
          component: () => import('@/views/purchasedWaterList/purchasedWaterList.vue'),
        },
        {
          path: '/productDetail',
          name: 'productDetail',
          meta: {
            title: '商品详情'
          },
          component: () => import('@/views/productDetail/productDetail.vue'),
        },
        {
          path: '/createBuyOrder',
          name: 'createBuyOrder',
          meta: {
            title: '创建购买订单'
          },
          component: () => import('@/views/createBuyOrder/createBuyOrder.vue'),
        },
      ]
    },

    {//派送员看的——jiangyx
      path: '/waterDeliveryOrderDetail',
      name: 'waterDeliveryOrderDetail',
      meta: {
        title: '创建订单详情'
      },
      component: () =>
        import ('@/views/waterDeliveryOrder/waterDeliveryOrderDetail/waterDeliveryOrderDetail.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      meta: {
        title: '授权页面'
      },
      component: () => import('@/views/auth/auth.vue'),
    }
  ]
});

router.beforeEach(( to, from, next ) => {
  // if (to.name != 'auth') {
  //   let _token = sessionStorage.getItem('wechataccess_token');
  //   if (!_token) {
  //     sessionStorage.setItem('beforeUrl', to.fullPath);
  //     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx877afd1dffed5e38&redirect_uri=http%3A%2F%2F${authUrl}%2Fauth&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  next();
});

export default router;

