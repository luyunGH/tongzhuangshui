<style lang="less" scoped>
    @import '../waterDeliveryOrder/waterDeliveryOrder.less';
</style>
<template>
  <div class="sendOrderDetail">
      <!--<top class="header"></top>  -->
      <div class="content" v-for="(item,index) in sendOrderDetail"  :key="index">
          <div class="list">
              <div class="delivery_time">
                <p><i class="fa fa-clock-o font_red"></i>时间 {{item.planSendDate}}</p>
                <p class="font_red">{{item.distributionStatus==2?'待派送':(item.distributionStatus==3?'派送中':'已送达')}}</p>
                <div class="spm-button" v-if="userType==1">
                    <spm-button type="danger" @click="statusload(current,item.id)" size="small" v-if="current==2||current==3">{{current==2?'接单':'已送达'}}</spm-button>
                    <spm-button type="danger" @click="statuscancel(current,item.id)" size="small" v-if="current==2||current==3">取消</spm-button>
                </div>
                
              </div>
              <div class="list_content" v-for="item2 in item.orderCommodityVOList" >
                <img :src="rootUrl+item2.url" class="imglist">
                <div class="infolist">
                  <h3>{{item2.commodityName}}</h3>
                  <p class="font_999">规格：{{item2.parameters}}</p>
                  <!--<p class="font_999">价格：<span class="font_red">{{item2.price}}</span>-->
                      <!--&nbsp; <del>{{item.oldprice}}</del>-->
                  </p>
                  <!--<p>时间：{{item.date}}</p>-->
                </div>
                <div class="num"><p>x{{item2.commodityQuantity}}</p></div>
              </div>
          </div>
          <div class="address">
              <!--<div class="waterdetail">
                <p><i class="fa fa-tag font_blue"></i>品牌 请选择品牌</p>
                <p><i class="fa fa-file-text-o font_blue"></i>请选择数量</p>
              </div>-->
              <div class="address_content">
                 <div class="mapicon"><i class="fa fa-map-marker font_999"></i></div>
                 <div class="mapinfo">
                    <p>收货人：{{item.receiver}}&nbsp;{{item.phone}}</p>
                    <p>{{item.province}}&nbsp;{{item.county}}&nbsp;{{item.town}}&nbsp;{{item.detailedAddress}}</p>
                 </div>
                 <!--<div class="address_manage"><p>管理 ></p></div>-->
              </div>
              <div class="orderinfo">
                 <p style="font-weight:600">订单信息</p>
                 <p>订单编号：{{item.sendOrderCode}}</p>
                 <p>创建时间：{{item.createDate}}</p>
              </div>
              <div class="remarks">
                 <p>备注：</p>
                 <p>{{item.remark}}</p>
              </div>
          </div>
      </div>     
      <div class="bottom_button">
          <div v-for="(todo, index) in statuslist" v-on:click="addClass(index)" v-bind:class="{ classred:index+2==current}">{{todo}}</div>
      </div> 
  </div>
</template>
<script src="./sendOrderDetail.js"></script>
<style scoped>
.sendOrderDetail{
  background:#fff
}
.sendOrderDetail .mint-button--small{
    height: 24px;
    padding:0 8px;
    font-size: 12px;
    background:#fff;
    color:#ff5252;
    border: 1px solid #ff5252
}
.classred{
  background:#ff5252;
  color:#fff
}
.orderinfo{
    border-bottom: 1px solid #f5f5f5;
    padding:10px 0;
}
</style>

