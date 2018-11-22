<template>
  <div class="addressAdd">
    <div>
      <mt-field label="收货人" placeholder="请输入收货人"
                :state="consignee.status" v-model="consignee.name">
      </mt-field>
      <mt-field label="手机号" placeholder="请输入手机号"
                @change="verify('phone')" :state="phone.status"
                type="tel" v-model="phone.name">
      </mt-field>
      <div @click="openModal('sys_province')">
        <mt-field label="省" placeholder="请选择所在省" :disableClear="isBoolean"
                  :readonly="isBoolean" v-model="provinceVal.codeValue">
        </mt-field>
      </div>
      <div @click="openModal('sys_city')">
        <mt-field label="市" placeholder="请选择所在市" :disableClear="isBoolean"
                  :readonly="isBoolean" v-model="cityVal.codeValue">
        </mt-field>
      </div>
      <div @click="openModal('sys_county')">
        <mt-field label="区/县" placeholder="请选择所在区/县" :disableClear="isBoolean"
                  :readonly="isBoolean" v-model="countyVal.codeValue">
        </mt-field>
      </div>
      <div @click="openModal('building_number')">
        <mt-field label="楼（仅北京）" placeholder="请选择所在楼" :disableClear="isBoolean"
                  :readonly="isBoolean" v-model="towerVal.codeValue">
        </mt-field>
      </div>
      <mt-field label="详细地址" placeholder="请输入楼层和门牌号"
                :state="addressText" type="textarea" rows="3" v-model="addressText">
      </mt-field>
      <div class="set-default">
        <mt-switch v-model="isDefault">设置默认地址</mt-switch>
      </div>
    </div>
    <mt-popup
      v-model="isProvince"
      position="bottom">
      <mt-picker ref="sys_province"
                 :slots="codeList['sys_province']" valueKey="codeValue"
                 @change="addressChange"></mt-picker>
    </mt-popup>
    <mt-popup
      v-model="isCity"
      position="bottom">
      <mt-picker ref="sys_city"
                 :slots="codeList['sys_city']" valueKey="codeValue"
                 @change="addressChange"></mt-picker>
    </mt-popup>
    <mt-popup
      v-model="isCounty"
      position="bottom">
      <mt-picker ref="sys_county"
                 :slots="codeList['sys_county']" valueKey="codeValue"
                 @change="addressChange"></mt-picker>
    </mt-popup>
    <mt-popup
      v-model="isTower"
      position="bottom">
      <mt-picker ref="building_number" :slots="codeList['building_number']" valueKey="codeValue" @change="addressChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script src="./addressAdd.js"></script>
<style>
  .set-default {
    background-color: #fff;
    border-top: 1px solid #eee;
    padding: 10px 10px;
  }
</style>
