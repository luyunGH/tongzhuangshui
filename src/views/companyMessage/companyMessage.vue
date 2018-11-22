<template>
  <div class="companyMessage">
    <div>
      <mt-field label="公司名称" placeholder="请输入公司名称"
                @change="verify('companyName')" :state="companyName.name"
                v-model="companyName.name">
      </mt-field>
      <mt-field label="公司法人" placeholder="请输入公司法人"
                @change="verify('companyBoss')" :state="companyBoss.name"
                v-model="companyBoss.name">
      </mt-field>
      <!--<mt-field label="地址" placeholder="请输入公司地址"-->
                <!--@change="verify('companyAddress')" :state="companyAddress.name"-->
                <!--v-model="companyAddress.name">-->
      <!--</mt-field>-->
    </div>
    <!--<div class="btn-true">-->
      <!--<button class="btn-true" @click="submitInfo">确认</button>-->
    <!--</div>-->
  </div>
</template>
<script src="./companyMessage.js"></script>
<style scoped>
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
