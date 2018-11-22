<style lang="less" scoped>
  @import './homeList.less';
</style>

<template>
  <div class="homeList">
    <div class="page-search">
      <!--<span class="input-group-addon"><i class="fa fa-search fa-fw"></i></span>
      <input class="form-control" v-model="commodityName" type="text" placeholder="请输入关键字进行搜索">
      <button v-show="commodityName.length" @click="loadListData">搜索</button>-->
      <form action="" target="frameFile" onsubmit="return false;"><mt-search v-model="commodityName" cancel-text="取消"  placeholder="搜索" @keyup.enter.native="loadListData"></mt-search></form>
      <!--阻止from表单事件的两种方式1.onsubmit="return false;" 2.iframe,iframe会存在bug,还是会向后端发送请求，虽然不跳转页面了-->
      <!--<iframe name='frameFile' style="display: none;"></iframe>-->
    </div>
    <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadMoreWrap">
      <ul v-if="listData.length">
        <li class="list" v-for="(item,index) in listData" @click="toDetail(item)">
          <img :src="rootUrl + item.commodityImageList[0].imageUrl"></img>
          <div class="infoWrap">
            <p class="proName">{{item.commodityName}}</p>
            <p class="subTit">{{item.promotion}}</p>
            <p class="proPrice">
              <span class="newPrice">
                ¥ {{item.commodityPrice}}
                <span class="priceUnit">{{item.commodityCompany}}</span>
              </span>
              <del class="oldPrice">¥ {{item.promotionOriginalPrice}}</del>
            </p>
            <p class="salesVolume">
              <span>销量：{{item.salesVolume}}</span>
              <button>购买</button>
            </p>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script src="./homeList.js"></script>
<style>
  .mint-searchbar{
    padding:5px 5px 0 5px;
    box-sizing: border-box
  }
  .mint-search{
    height: 38px!important;
  }
</style>



