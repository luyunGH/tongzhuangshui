<style lang="less" scoped>
@import '../waterDeliveryOrder/waterDeliveryOrder.less';
</style>

<template>
  <div class="sendOrderList">
    <!--<top class="header"></top>-->
      <!--<div class="searchWrap">
        <span class="input-group-addon">
          <i class="fa fa-search fa-fw"></i>
        </span>
        <input class="form-control" v-model="commodityName" type="text" placeholder="请输入关键字进行搜索">
        <button v-show="commodityName.length" @click="loadListData(1,commodityName)">搜索</button>
      </div>-->
      <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadMoreWrap">
      <div class="content" v-if="sendOrderList.length" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="true" infinite-scroll-distance="10">
        <div class="list" v-for="(item,index) in sendOrderList" :key="index">
          <div class="delivery_time">
            <p>收件人：{{item.receiver}}<br>{{item.phone}}</p>
            <p class="font_red">{{item.distributionStatus==2?'待派送':(item.distributionStatus==3?'派送中':'已送达')}}</p>
            <div class="spm-button" v-if="userType==1">
            <spm-button type="danger" @click="statusload(current,item.id)" size="small" v-if="current==2||current==3">{{current==2?'接单':'已送达'}}</spm-button>
            <!--'取消订单':'取消配送'-->
            <spm-button type="danger" @click="statuscancel(current,item.id)" size="small" v-if="current==2||current==3">取消</spm-button>
            </div>
          </div>
          <div class="list_content"  @click="godetail(current,item.id)">
            <img :src="rootUrl+item.orderCommodityVOList[0].url" class="imglist">
            <div class="infolist">   
              <p>配送单号：{{item.sendOrderCode}}</p>         
              <p v-for="item2 in item.orderCommodityVOList">
                <span>{{item2.commodityName}}</span>&nbsp;
                <span class="font_999">{{item2.parameters}}</span>
                <span class="font_999">({{item2.commodityQuantity}})</span>
              </p>
              <p class="font_999" v-if="current == 2">下单时间：<span>{{item.createDate}}</span></p>
              <p class="font_999" v-if="current == 3">接单时间：<span>{{item.deliverymanStartDate}}</span></p>
              <p class="font_999">预定派送：<span>{{item.planSendDateStr}}&nbsp;{{item.lastAfternoon}}</span></p>
              <p class="font_999" v-if="current == 4">确认送达：<span>{{item.deliverymanEndDate}}</span></p>
            </div>       
          </div>
          <p class="font_999">收货地址：<span>{{item.province}}&nbsp;{{item.county}}&nbsp;{{item.town}}&nbsp;{{item.detailedAddress}}</span></p>
        </div>
      </div>
      <div class="noData" v-else>
            <img src="../../../static/images/no_data.png" alt="暂无数据图片">
        </div>
      </mt-loadmore>
    <div class="bottom_button">
      <div v-for="(todo, index) in statuslist" v-on:click="addClass(index)" v-bind:class="{ classred:index+2==current}">{{todo}}</div>
    </div>
  </div>
</template>
<script src="./sendOrderList.js"></script>
<style scoped>
.sendOrderList .content,
.sendOrderList .bottom_button {
  background: #fff
}

.sendOrderList .mint-button--small {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  background: #fff;
  color: #ff5252;
  border: 1px solid #ff5252
}

.classred {
  background: #ff5252;
  color: #fff
}

.classblank {
  background: #fff
}

.sendOrderList .searchWrap {
  margin: 5px 8px;
  background: #fff;
}

.sendOrderList .searchWrap>input {
  width: 75%;
  height: 28px;
  border: none;
  outline: none;
}

.sendOrderList .searchWrap button {
  width: 13%;
  height: 30px;
  float: right;
  border-radius: 6px;
  color: #fff;
  background: #F23030;
}

.sendOrderList .list:last-of-type {
  margin-bottom: 35px
}
</style>

