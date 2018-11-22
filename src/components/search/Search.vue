<template>
  <div class="searchWrap">
    <!--侧边栏搜索-->
    <spm-popup
      v-model="searchModal"
      position="right">
      <div class="deliveryMethods">
        配送时间和频率
      </div>
      <div class="modal-search">
        <div class="modal-search-list">
          <p class="spm-label"><b>送水频率：</b></p>
          <input @click="openSelect(1)" readonly type="text" v-model="carriage">
        </div>
        <div class="modal-search-list">
          <p class="spm-label"><b>开始日期：</b></p>
          <input @click="openSelect(2)" readonly type="text" v-model="startDateShow">
        </div>
         <div class="modal-search-list" v-if="carriage != '单次'">
          <p class="spm-label"><b>结束日期：</b></p>
          <input @click="openSelect(3)" readonly type="text" v-model="endDateShow">
        </div>
        <div class="modal-search-list">
          <p class="spm-label"><b>送水时段：</b></p>
          <input @click="openSelect(4)" readonly type="text" v-model="lastAfternoon">
        </div>
        <div class="modal-search-list" v-if="carriage != '单次'">
          <p class="spm-label"><b>星期几：</b></p>
          <input @click="openSelect(5)" readonly type="text" v-model="week">
        </div>
        <spm-button @click.native="search()">确定</spm-button>
      </div>
    </spm-popup>
    <!-- 送水频率 -->
    <spm-popup
      v-model="carriageModal"
      position="bottom">
      <div class="modal-search1">
        <spm-picker :slots="WaterCarriageList" :showToolbar='isTrue' @change="onWaterCarriage">
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel" @click="cancel(1)">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm" @click="cancel(1)">确定</button>
          </div>
        </spm-picker>
      </div>
    </spm-popup>
    <!-- 开始时间 -->
    <DatetimePicker ref="startPicker" :startDate="new Date()" v-model="startDate" type="date" @confirm="startConfirm" @cancel="startCancel"></DatetimePicker>
    <!-- 结束时间 -->
    <DatetimePicker ref="endPicker" :startDate="new Date()" v-model="endDate" type="date" @confirm="endConfirm" @cancel="endCancel"></DatetimePicker>
    <!-- 送水时段 -->
    <spm-popup
      v-model="lastAfternoonModal"
      position="bottom">
      <div class="modal-search1">
        <spm-picker :slots="lastAfternoonList" :showToolbar='isTrue' @change="onLastAfternoon">
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel" @click="cancel(4)">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm" @click="cancel(4)">确定</button>
          </div>
        </spm-picker>
      </div>
    </spm-popup>
    <!-- 星期几 -->
    <spm-popup
      v-model="weekModal"
      position="bottom">
      <div class="modal-search1">
        <spm-picker :slots="weekList" :showToolbar='isTrue' @change="onWeek">
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel" @click="cancel(5)">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm" @click="cancel(5)">确定</button>
          </div>
        </spm-picker>
      </div>
    </spm-popup>
  </div>
</template>
<script src="./Search.js"></script>
<style>

  .searchWrap .deliveryMethods{
    width:100%;
    height:30px;
    font-size:16px;
    line-height:30px;
    background:#ff5252;
    color:#fff;
    text-align:center;
  }
  .modal-search {
    padding: 10px;
    display:flex;
    flex-direction: column;
  }
  .modal-search-list{
    margin-top:5px;
    margin-bottom:10px;
    display:flex;
  }
  .modal-search-list input {
    outline: none;
    border:1px solid #ccc;
    width:65%;
    padding:0 5px;
  }

  .spm-input {
    border: 1px solid #26a2ff;
    border-radius: 3px;
    padding: 4px;
    min-width: 170px;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .input-search {
    padding: 6px;
    border-radius: 3px;
    background-color: #26a2ff;
    color: #fff;
  }

  .spm-label {
    width:65px;
    font-size: 12px;
    padding: 5px 0;
  }

  .searchWrap .mint-msgbox-btn{
    line-height:40px;
    font-size:16px;
    color:#26a2ff;
    border:none;
    border-bottom:1px solid #d9d9d9;
  }

  .searchWrap .mint-button--normal{
    height:30px;
    background:#ff5252;
    color:#fff;
    font-size:16px;
  }
</style>
