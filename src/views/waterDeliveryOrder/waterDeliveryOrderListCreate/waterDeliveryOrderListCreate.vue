<style lang="less" scoped>
  @import './waterDeliveryOrderListCreate.less';
</style>


<template>
  <div class="waterDeliveryOrderListCreate">
      <top class="header"></top>  
      
      <div class="content">
          <div class="list" v-for="(item,index) in waterDeliveryOrderListCreate" :key="index">
              <div class="delivery_time">
                <p><i class="fa fa-clock-o font_red"></i>时间 {{item.date}}</p>
                <p><i class="fa fa-calendar font_red"></i>送水周期</p>
              </div>
              <div class="list_content">
                <img :src="item.images" class="imglist">
                <div class="infolist">
                  <h3>{{item.title}}</h3>
                  <p class="font_999">规格：{{item.Specifications}}</p>
                  <p class="font_999">价格：<span class="font_red">{{item.price}}{{item.commodityCompany}}</span>
                      <!--&nbsp; <del>{{item.oldprice}}</del>-->
                  </p>
                  <!--<p>时间：{{item.date}}</p>-->
                </div>
                <div class="num"><p>x{{item.num}}</p></div>
              </div>
          </div>
          <div class="address" v-for="(item,index) in adderssdata" :key="index">
              <div class="waterdetail">
                <p><i class="fa fa-tag font_blue"></i>品牌 {{item.waterName}}</p>
                <p><i class="fa fa-file-text-o font_blue"></i>{{item.num}}桶</p>
              </div>
              <div class="address_content">
                 <div class="mapicon"><i class="fa fa-map-marker font_999"></i></div>
                 <div class="mapinfo">
                    <p>收货人：{{item.consignee}}&nbsp;{{item.phone}}</p>
                    <p>{{item.address}}</p>
                 </div>
              </div>
              <div class="remarks">
                 <p>备注：</p>
                 <p>{{item.remarks}}</p>
              </div>
          </div>
      </div>
      <div class="bottom_button">
        <button @click="tiaoadd">创建送水订单</button>
      </div>
  </div>
</template>
<script src="./waterDeliveryOrderListCreate.js"></script>