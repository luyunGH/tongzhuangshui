<style lang="less" scoped>
    @import "./waterDeliveryOrderAdd.less";
</style>
<template>
  <div class="waterDeliveryOrderAdd">
      <comSearch ref="search" @carriageEleFn='carriageEleFn' @lastAfternoonEleFn='lastAfternoonEleFn' @weekEleFn="weekEleFn" @showDeliveryMethods='showDeliveryMethods'></comSearch>
      <div class="content">
          <div class="delivery_time" @click="openSelect">
            <div class="selMethods">
              <p><i class="fa fa-calendar font_red"></i>送水周期：{{carriage}}</p>
              <p><i class="fa fa-clock-o font_red"></i>
                时间：
                <span v-if="carriage == '单次'">{{startDate}}  {{lastAfternoon}}  {{week}}</span>
                <span v-else>{{startDate}}至{{endDate}}  {{lastAfternoon}}  {{week}}</span>
              </p>
            </div>
            <div class="toSelect">
              <i class="fa fa-chevron-right font_red"></i>
            </div>
          </div>
          <div class="list" v-for="(item,index) in listData" :key="index"  >
            <div class="list_content">
              <div class="checkbox_list" @click="checkFn(index)">
                <i class="fa fa-check-circle font_red fa-2x" v-if="item.checked"></i>
                <i class="fa fa-circle-thin fa-2x noSel" v-else></i>
              </div>
              <img :src="rootUrl + item.url" class="imglist">
              <div class="infolist">
                <p>{{item.commodityName}}</p>
                <p class="font_999">规格：{{item.parameters}}</p>
                <p class="font_999">剩余数量：{{item.singleCommodityRemainQuantity}}</p>
                <div class="selQuantity">
                  数量：
                  <button class="reduceQuantity" @click="reduceQuantityFn(index)">-</button>
                  <input type="number" v-model="item.deliveryNum" onkeyup="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')">
                  <button class="addQuantity" @click="addQuantityFn(index)">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="address">
              <div class="address_content">
                <div class="mapicon"><i class="fa fa-map-marker font_999"></i></div>
                <div class="mapinfo">
                    <p>收货人：{{addressData.receiver}}&nbsp;{{addressData.phone}}</p>
                    <p>{{addressData.detailedAddress}}</p>
                </div>
                <div class="address_manage" @click="addressManage"><p>管理 ></p></div>
              </div>
              <div class="buyRemark">
                  备注：
                  <textarea v-model='guestBook' placeholder="您可以在这里给我们留言"></textarea>
              </div>
          </div>
      </div>
      <div class="bottom_zhifu">
        <div class="check_button" @click="checkOrder" v-if="fixedFrequencyType != 0">
          <p>校验订单</p>
        </div>
        <div class="zhifu_button" @click="createDeliveryOrderFn">立即创建</div>
      </div>
  </div>
</template>
<script src="./waterDeliveryOrderAdd.js"></script>

