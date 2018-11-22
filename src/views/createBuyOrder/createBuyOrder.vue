<style lang="less" scoped>
    @import './createBuyOrder.less';
</style>


<template>
    <div class="createBuyOrder">
        <div class="list">
            <img :src="imgUrl"></img>
            <div class="infoWrap">
                <p class="proName">{{commodityName}}</p>
                <p class="proPrice">
                    价格：
                    <span>¥ {{commodityPrice}}</span>
                    <span>{{commodityCompany}}</span>
                </p>
                <p class="proPromotion">
                    促销语：{{promotion}}
                </p>
                <p class="parameters">
                    <span>规格： {{parameters}}</span>
                    <button>X{{showNum}}</button>
                </p>
            </div>
        </div>
        <div class="buyRemark">
            备注：
            <textarea v-model='guestBook' placeholder="您可以在这里给我们留言"></textarea>
        </div>
        <div class="buyOrderBottom">
            <div class="buyOrderTotal">
                <div>实付金额 <span class="buyOrderTotalMoney">¥{{(commodityPrice * 1) * (quantity * 1)}}</span></div>
                <div class="freeTransport">(免运费)</div>
            </div>
            <button @click="toPayPage" class="toPayBtn">立即支付</button>
        </div>
    </div>
</template>

<script src="./createBuyOrder.js"></script>

