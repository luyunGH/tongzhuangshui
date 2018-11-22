<style lang="less" scoped>
    @import './productDetail.less';
</style>


<template>
    <div class="productDetail">
        <div class="contentWrap">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(i,index) in proDetailData.commodityImageList" :key="index">
                    <img :src="rootUrl + i.imageUrl" alt="商品展示图片">
                </mt-swipe-item>
            </mt-swipe>
            <div class="detailWrap">
                <div class="proNamePrice">
                    <p class="proName">
                        {{proDetailData.commodityName}}
                    </p>
                    <p class="proPrice">
                        现价：
                        <span class="newPrice">￥{{proDetailData.commodityPrice}}</span>
                        <span class="oldPrice">￥{{proDetailData.promotionOriginalPrice}}</span>
                    </p>
                </div>
                <div class="orderQuantity">
                    数量(X{{proDetailData.commodityQuantity}})：<div class="selQuantity">
                        <button class="reduceQuantity" @click="reduceQuantityFn">-</button>
                        <input type="number" v-model="quantity" onkeyup="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')">
                        <button class="addQuantity" @click="addQuantityFn">+</button>
                    </div>
                </div>
                <div class="productParamterImgs">
                    <p class="detailTitle">
                        <span class="centerLine"></span>
                        商品参数
                        <span class="centerLine"></span>
                    </p>
                    <div v-if="proDetailData.commodityImageParameterList.length">
                        <img v-for="item in proDetailData.commodityImageParameterList" :src="rootUrl + item.imageUrl" alt="商品参数">
                    </div>
                    <div v-else class="noContent">
                        <p>暂无数据</p>
                    </div>
                </div>
                <div class="productDetailImgs">
                    <p class="detailTitle">
                        <span class="centerLine"></span>
                        商品详情
                        <span class="centerLine"></span>
                    </p>
                    <div v-if="proDetailData.commodityImageDetailList.length">
                        <img v-for="x in proDetailData.commodityImageDetailList" :src="rootUrl + x.imageUrl" alt="商品详情">
                    </div>
                    <div v-else class="noContent">
                        <p>暂无数据</p>
                    </div>
                </div>
            </div>
            <div class="productDetailBottom">
                <button @click="toCreateBuyOrderPage">确定订单</button>
            </div>
        </div>
    </div>
</template>

<script src="./productDetail.js"></script>


