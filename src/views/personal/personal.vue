<template>
  <div class="person">
    <div class="header">
      <span class="voucher">充值</span>
      <p><i class="fa fa-cog setting" @click="toPerson"></i></p>
      <div class="info">
        <div class="person-img">
          <img :src="user.userImg" height="100%" alt="用户头像">
        </div>
        <div class="person-info">
          <p>{{ user.userNickName }} <span style="color: #ff0">({{ user.userType | typeFilter }})</span></p>
        </div>
      </div>
    </div>
    <div class="top-center">
      <mt-cell title="我的送水订单" to="/waterDeliveryOrderList" is-link value="查看全部订单"></mt-cell>
      <nav>
        <div @click="goSendOrderList(2)">
          <p><i class="fa fa-credit-card"></i></p>
          <p>待派送</p>
        </div>
        <div @click="goSendOrderList(3)">
          <p><i class="fa fa-truck"></i></p>
          <p>派送中</p>
        </div>
        <div @click="goSendOrderList(4)">
          <p><i class="fa fa-clipboard"></i></p>
          <p>已送达</p>
        </div>
      </nav>
    </div>
    <div class="content">
      <mt-cell title="公司信息" to="/companyMessage" is-link></mt-cell>
      <mt-cell title="收货地址" to="/addressList" is-link></mt-cell>
      <mt-cell title="购买记录" to="/purchaseRecord" is-link></mt-cell>
      <div class="center-border"></div>
      <mt-cell title="已购商品" to="/purchasedWaterList" is-link></mt-cell>
      <mt-cell title="配送订单" to="/waterDeliveryOrderList" is-link></mt-cell>
      <div class="bottom-write"></div>
    </div>
  </div>
</template>
<script src="./personal.js"></script>
<style scoped>
  .person {
    height: 100%;
    width: 100%;
    font-size: 12px;
    display: flex;
    flex-direction: column;
  }

  .header {
    height: 130px;
    padding: 20px;
    background-color: #FF5252;
    position: relative;
  }

  .header > p {
    overflow: hidden;
  }

  .setting {
    font-size: 24px;
    color: #fff;
    float: right;
  }

  .info {
    display: flex;
  }

  .person-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ff0;
  }

  .person-info {
    flex: 1;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    line-height: 2.5em;

  }

  .person-info > p {
    flex: 1
  }

  .voucher {
    background-color: #999;
    padding: 2px 15px;
    border-radius: 5px;
    color: #fff;
    position: absolute;
    top: 50px;
    right: 30px;
  }

  nav {
    display: flex;
    background-color: #fff;
    margin-bottom: 4px;
    color: #5E5E5E;
  }

  nav > div {
    flex: 1;
    padding: 10px 0;
    text-align: center;
  }

  nav > div i {
    font-size: 26px;
  }

  .center-border {
    height: 4px;
  }

  .bottom-write {
    flex: 1;
    background-color: #fff
  }

  .content {
    flex: 1;
  }
</style>
