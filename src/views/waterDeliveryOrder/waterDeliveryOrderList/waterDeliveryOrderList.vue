<style lang="less" scoped>
@import '../waterDeliveryOrder.less';
</style>

<template>
  <div class="waterDeliveryOrderList">
    <!--<top class="header"></top>  -->
    <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadMoreWrap">
      <div class="content" v-if="waterDeliveryOrderList.length" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="true" infinite-scroll-distance="10">
        <div class="list" v-for="(item,index) in waterDeliveryOrderList" :key="index" @click="godetail(item.distributionStatus,item.id)">
          <div class="delivery_time">
            <p>收件人：{{item.receiver}}&nbsp;&nbsp;{{item.phone}}</p>
            <p>{{item.distributionStatus==2?'待派送':(item.distributionStatus==3?'派送中':'已送达')}}</p>
          </div>
          <div class="list_content" v-if="item.orderCommodityVOList.length">
            <img :src="rootUrl+item.orderCommodityVOList[0].url" class="imglist">
            <div class="infolist">
              <p>订单编号：{{item.sendOrderCode}}</p>
              <p v-for="item2 in item.orderCommodityVOList">
                <span>{{item2.commodityName}}</span>&nbsp;
                <span class="font_999">{{item2.parameters}}</span>
                <span class="font_999">({{item2.commodityQuantity}})</span>
              </p>
              <p class="font_999">时间：
                <span>{{item.planSendDate}}&nbsp;{{item.lastAfternoon}}</span>
              </p>
              <p class="font_999" v-if="item.distributionStatus==3||item.distributionStatus==4">派送员：{{item.deliverymanName}}</p>
              <p class="font_999" v-if="item.distributionStatus==4">送达时间：{{item.deliverymanEndDate}}</p>
            </div>
          </div>
          <p class="font_999">收货地址：
            <span>{{item.province}}&nbsp;{{item.county}}&nbsp;{{item.town}}&nbsp;{{item.detailedAddress}}</span>
          </p>
        </div>
      </div>
      <div class="noData" v-else>
        <img src="../../../../static/images/no_data.png" alt="暂无数据图片">
      </div>
    </mt-loadmore>
  </div>
</template>
<script src="./waterDeliveryOrderList.js"></script>


