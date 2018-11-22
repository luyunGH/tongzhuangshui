<template>
  <div class="address-box">
    <div class="address-list">
      <div class="list-item" v-for="(item,key) in addressData" :key="key">
        <div class="address-text">
          <div class="checkbox_list" @click="selAddress(key)" v-if="checkboxShow">
            <i class="fa fa-check-circle font_red fa-2x sel" v-if="item.selected"></i>
            <i class="fa fa-circle-thin fa-2x noSel" v-else></i>
          </div>
          <p>
            <span>{{item.receiver}}</span>
            <span>{{item.phone}}</span>
          </p>
          <p>{{item.provinceName}}{{ item.cityName }}{{ item.countyName }}{{ item.townName }}{{ item.detailAddress }}</p>
        </div>
        <div class="handle">
          <p class="default-address" v-if="item.defaultAddress">默认</p>
          <p class="handle-btn">
            <button @click="toAdd(2,item.id)">编辑</button>
            <button @click="openDele(item.id)">删除</button>
          </p>
        </div>
      </div>
    </div>
    <div class="add-btn">
      <button @click="toAdd(1)">添加新地址</button>
    </div>
  </div>
</template>
<script src="./addressList.js"></script>
<style scoped>
  .address-box {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .address-text {
    line-height: 30px;
  }
  .address-text > p:first-child {
    display: flex;
  }
  .address-text > p > span:first-child {
    flex: 1;
  }
  .address-text > p > span:last-child {
    flex: 4;
  }
  .address-list {
    flex: 1;
    overflow-y: auto;
  }

  .add-btn {
    text-align: center;
  }

  .add-btn > button {
    color: #fff;
    width: 100%;
    background-color: #FF5252;
    line-height: 44px;
  }

  .list-item {
    background-color: #fff;
    padding: 10px;
    overflow: hidden;
    margin-bottom: 2px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #999;
  }

  .handle {
    padding: 10px 0;
    overflow: hidden;
  }

  .default-address {
    float: left;
    color: #fff;
    background-color: #FF9800;
    padding: 2px;
    border-radius: 5px;
  }

  .handle > p:last-child {
    float: right;
  }

  .handle-btn > button {
    color: #FF5252;
    padding: 0 10px;
  }
  .address-box .checkbox_list{
    float:left;
    padding-right:10px;
    width:20px;
    height:100px;
    line-height:100px;
}

  .address-box .address-text .checkbox_list .noSel{
    color:#ccc;
  }

  .address-box .address-text .checkbox_list .sel{
    color:#FF5252;
  }
</style>
