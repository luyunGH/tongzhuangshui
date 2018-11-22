<style lang="less" scoped>
  @import '../waterDeliveryOrder.less';
</style>
<template>
  <div class="waterDeliveryOrderDetail">
      <top class="header"></top>  
      <div class="content">
          <div class="list" v-for="(item,index) in purchaseRecordList" :key="index">
              <p class="font_black">购买人：{{item.username}}&nbsp;&nbsp;&nbsp;&nbsp;状态：{{item.status}}</p>
              <div class="list_content">
                <img :src="item.images" class="imglist">
                <div class="infolist">
                  <h3>{{item.title}}</h3>
                  <p class="font_999">规格：{{item.Specifications}}</p>
                  <p class="font_999">价格：<span class="font_red">{{item.price}}{{item.commodityCompany}}</span>
                      <!--&nbsp; <del>{{item.oldprice}}</del>-->
                  </p>
                  <p class="font_999">时间：{{item.date}}</p>
                </div>
                <div class="num"><p>x{{item.num}}</p></div>
              </div>           
          </div>
          <div class="address" v-for="item in adderssdata">           
              <div class="address_content">
                 <div class="mapicon"><i class="fa fa-map-marker font_999"></i></div>
                 <div class="mapinfo">
                    <p>收货人：{{item.consignee}}&nbsp;{{item.phone}}</p>
                    <p>{{item.address}}</p>
                 </div>           
              </div>
              <div class="remarks">
                 <p>订单信息</p>
                 <p>订单编号：{{item.no}}</p>
                 <p>创建时间：{{item.date}}</p>
              </div>
          </div>
      </div>
  </div>
</template>
<script src="./waterDeliveryOrderDetail.js"></script>
