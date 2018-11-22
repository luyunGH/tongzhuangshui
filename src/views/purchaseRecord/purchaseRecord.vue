<template>
  <div class="purchaseRecord">
      <!--<top class="header"></top>  -->
      <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadMoreWrap">
      <div class="content"  v-if="purchaseRecordList.length" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="true" infinite-scroll-distance="10">
          <div class="list" v-for="(item,index) in purchaseRecordList" :key="index">
            <div class="list_top">
                <p class="font_black">购买人：{{item.userName}}</p>
                
                <spm-button type="danger" size="small" v-if="item.orderStatus=='1'">待支付</spm-button>
                <p class="font_red" v-else>{{item.oStatus}}</p>
            </div>
              
              <div class="list_content">
                <img :src="rootUrl+item.url" class="imglist">
                <div class="infolist">
                  <h3>{{item.commodityName}}</h3>
                  <p>订单编号：{{item.orderCode}}</p>
                  <p>规格：{{item.parameters}}</p>
                  <p>价格：<span class="font_red">{{item.commodityPrice}}{{item.commodityCompany}}</span>&nbsp; <del>{{item.promotionOriginalPrice}}{{item.commodityCompany}}</del></p>
                  <p>总量：{{item.totalQuantity}}</p>
                  <p>已配送数量：{{item.usedQuantity}}</p>
                  <p>剩余数量：{{item.remainQuantity}}</p>
                  <p>下单时间：{{item.createDate}}</p>
                </div>
                <!--<div class="num"><p>x{{item.num}}</p></div>-->
              </div>
              <p class="font_black">合计：￥{{item.orderAmount}}{{item.commodityCompany}}</p>
          </div>
      </div>
      <div class="noData" v-else>
            <img src="../../../static/images/no_data.png" alt="暂无数据图片">
        </div>
      </mt-loadmore>
  </div>
</template>
<script src="./purchaseRecord.js"></script>
<style scoped>
.purchaseRecord {
  font-size: 12px;
  width:100%; 
}
.purchaseRecord .content{
  display: flex;
  flex-direction:column;
  padding: 2px
}
.purchaseRecord .content .list{
  border-radius: 5px;
  background-color:#fff;
  padding: 10px;
  margin-bottom: 2px
}
.purchaseRecord .list_content{
  border-top:1px solid #ccc;
  border-bottom:1px solid #ccc;
  padding:10px 0;
  width:100%;
  box-sizing:border-box;
  overflow: hidden;
  display:flex
}
.purchaseRecord .list_top{
  display:flex;
}
.purchaseRecord .list_top p:nth-of-type(1){
  flex:2
}
.purchaseRecord .list_top p:nth-of-type(2){
  flex:1;
  display: flex;
  justify-content: flex-end;
}
.purchaseRecord .mint-button--small {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  background: #fff;
  color: #ff5252;
  border: 1px solid #ff5252
}
.purchaseRecord .font_black{
  color:#000
}
.purchaseRecord .imglist{
  width:80px;
  height: 80px;
  float: left;
  flex:3
}
.purchaseRecord .infolist{
  float: left;
  margin-left: 20px;
  flex:7;   
  /*height: 80px;*/
}
/*.purchaseRecord .num{
  height: 80px;
  float: right;
  display: flex;
  flex-direction:column-reverse;
}*/
.purchaseRecord .num p{
  color:#000;
}
.purchaseRecord h3{
  margin: 0 0 5px 0;
  font-size:14px
 }
 .purchaseRecord p{
   font-size:12px;
   color:#999
 }
 .purchaseRecord .font_red{
   color:#ff5252
 }
</style>