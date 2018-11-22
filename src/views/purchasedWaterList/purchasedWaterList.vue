<style lang="less" scoped>
    @import "./purchasedWaterList.less";
</style>

<template>
    <div class="purchasedWaterList">
        <div class="content" v-if="listData.length">
            <div class="list" v-for="(item,index) in listData" :key="index">
                <div class="list_content">
                    <img :src="rootUrl + item.url" class="imglist">
                    <div class="infolist">
                        <p class="proName">{{item.commodityName}}</p>
                        <p>规格：{{item.parameters}}</p>
                        <p>已购：X{{item.singleCommodityTotalQuantity}}</p>
                        <div class="shipDetails">
                            <p>已配送：X{{item.singleCommodityUsedQuantity}}</p>
                            <p>待配送：X{{item.singleCommodityRemainQuantity}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noData" v-else>
            <img src="../../../static/images/no_data.png" alt="暂无数据图片">
        </div>
        <!-- loading样式 -->
        <!-- <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
        </p> -->
    </div>
</template>

<script src="./purchasedWaterList.js"></script>
