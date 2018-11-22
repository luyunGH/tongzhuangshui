<template>
  <div class="personMessage">
    <div>
      <header>
        <div class="person-img">
          <img :src="user.wechatuserImg" height="100%">
        </div>
        <p class="person-name">{{ user.wechatuserNick }} <span>({{ user.wechatuser_type | typeFilter }})</span></p>
      </header>
      <div class="container">
        <mt-field label="姓名" placeholder="请输入姓名"
                  @change="verify('personName')"
                  v-model="personName.name">
        </mt-field>
        <mt-field label="手机号" placeholder="请输入手机号"
                  @change="verify('phone')" :state="phone.status"
                  type="tel" v-model="phone.name"></mt-field>
        <mt-field label="公司名称" placeholder="请输入公司名称"
                  @change="verify('companyName')"
                  v-model="companyName.name">
          <button class="search-btn" @click="getCompany">查询</button>
        </mt-field>
        <!--<mt-field label="地址" placeholder="请输入公司地址"-->
        <!--@change="verify('companyAddress')" :state="companyAddress.name"-->
        <!--v-model="companyAddress.name">-->
        <!--</mt-field>-->
      </div>
      <!--<div class="btn-true">-->
      <!--<button class="btn-true" @click="submitInfo">确认</button>-->
      <!--</div>-->
      <div class="com-pick" v-if="isPick">
        <mt-picker ref="company"
                   :slots="companyList" valueKey="epName"
                   @change="companyChange">
        </mt-picker>
      </div>
    </div>
  </div>
</template>
<script src="./personMessage.js"></script>
<style scoped>
  .personMessage {
    flex: 1;
  }

  header {
    padding: 20px;
    margin-bottom: 10px;
    background-color: #fff;
    display: flex;
  }

  .image {
    line-height: 50px;
    width: 50px;
    background-color: #f00;
    border-radius: 5px;
  }

  .com-pick {
    background-color: rgba(255, 255, 255, 1);
  }

  .search-btn {
    background-color: #FF5252;
    padding: 4px 10px;
    color: #fff;
    border-radius: 5px;
  }

  .person-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ff0;
  }

  .person-name {
    flex: 1;
    line-height: 80px;
    padding: 0 20px;
  }

  /*.btn-true {*/
  /*margin-top: 10px;*/
  /*text-align: center;*/
  /*}*/

  /*.btn-true > button {*/
  /*color: #fff;*/
  /*background-color: #FF5252;*/
  /*border-radius: 10px;*/
  /*line-height: 50px;*/
  /*width: 95%;*/
  /*}*/
</style>
