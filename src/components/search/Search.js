/**
 * @authors 郭超 (guochao@ui-tech.com.cn)
 * @date    2018-05-21 11:36:46
 * @version 1.0
 */
import Vue from 'vue';
import { Popup,Picker,DatetimePicker } from 'mint-ui';

Vue.component('DatetimePicker', DatetimePicker);
Vue.component("spm-picker", Picker);
Vue.component("spm-popup", Popup);

export default {
  name: 'Search',
  props: [ "searchType" ],
  data(){
    return {
      isTrue:true,
      searchModal: false,//侧边栏框

      carriageModal:false,//送水频率modal
      carriage:'',//送水频率v-model(显示用)
      fixedFrequencyType: '',//送水频率参数（调接口用）
      WaterCarriageList: [{//送水频率选项
          values: ['单次','每周一次']
        }
      ],
      
      startDateShow:'',//开始送水展示用v-model
      endDateShow:'',//结束送水展示用v-model
      startDate:'',//开始送水时间
      endDate:'',//结束送水时间
      
      lastAfternoonModal:false,//送水时段modal
      lastAfternoon:'',//送水时段 v-model
      lastAfternoonList: [{//送水时段列表
        values: [ '上午', '下午']
      }],

      weekModal: false,//星期几modal
      week:'',//星期几v-model
      weekList:[{
        values:['星期一','星期二','星期三','星期四','星期五','星期六','星期天']
      }],
    }
  },
  methods: {
    search(){
      this.searchModal = false;
    },
    //确认选择开始日期
    startConfirm(e) {
      let newDate = new Date(e);
      let arrFormatValue = newDate.getFullYear() + '-' + (newDate.getMonth() + 1 < 10 ? '0'+(newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + '-' + (newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate());
      this.startDateShow = arrFormatValue;
      var obj = {
        carriage:this.carriage,//送水频率
        fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
        startDate:this.startDateShow ? this.startDateShow : '',
        endDate:this.endDateShow ? this.endDateShow : '',
        lastAfternoon:this.lastAfternoon,//送水时段
        week:this.week,
      }
      this.dateShow = true;
      this.$emit('showDeliveryMethods',obj)
    },
    //取消选择开始日期
    startCancel() {
      var obj = {};
      if(this.startDate == ''){
        this.startDateShow = '';
      }else{
        let newDate = new Date(this.startDate);
        let arrFormatValue = newDate.getFullYear() + '-' + (newDate.getMonth() + 1 < 10 ? '0'+(newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + '-' + (newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate());
        this.startDateShow = arrFormatValue;
        obj = {
          carriage:this.carriage,//送水频率
          fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
          startDate:this.startDateShow ? this.startDateShow : '',
          endDate:this.endDateShow ? this.endDateShow : '',
          lastAfternoon:this.lastAfternoon,//送水时段
          week:this.week,
        }
      }
      this.$emit('showDeliveryMethods',obj)
    },
    //确认选择结束日期
    endConfirm(e) {
      let newDate = new Date(e);
      let arrFormatValue = newDate.getFullYear() + '-' + (newDate.getMonth() + 1 < 10 ? '0'+(newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + '-' + (newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate());
      this.endDateShow = arrFormatValue;
      var obj = {
        carriage:this.carriage,//送水频率
        fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
        startDate:this.startDateShow ? this.startDateShow : '',
        endDate:this.endDateShow ? this.endDateShow : '',
        lastAfternoon:this.lastAfternoon,//送水时段
        week:this.week,
      }
      this.dateShow = true;
      this.$emit('showDeliveryMethods',obj)
    },
    //取消选择结束日期
    endCancel() {
      var obj = {};
      if(this.endDate == ''){
        this.endDateShow = '';
      }else{
        let newDate = new Date(this.endDate);
        let arrFormatValue = newDate.getFullYear() + '-' + (newDate.getMonth() + 1 < 10 ? '0'+(newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + '-' + (newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate());
        this.endDateShow = arrFormatValue;
        obj = {
          carriage:this.carriage,//送水频率
          fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
          startDate:this.startDateShow ? this.startDateShow : '',
          endDate:this.endDateShow ? this.endDateShow : '',
          lastAfternoon:this.lastAfternoon,//送水时段
          week:this.week,
        }
      }
      this.$emit('showDeliveryMethods',obj)
    },
    //选择送水频率
    onWaterCarriage(picker,values) {
      this.carriage = values[0];
      if(this.carriage == '单次') {
        this.fixedFrequencyType = 0;
      }else {
        this.fixedFrequencyType  = 1;
      }
      var obj = {
        carriage:this.carriage,//送水频率
        fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
        startDate:this.startDateShow ? this.startDateShow : '',
        endDate:this.endDateShow ? this.endDateShow : '',
        lastAfternoon:this.lastAfternoon,//送水时段
        week:this.week,
      }
      this.$emit('carriageEleFn',picker);
      this.$emit('showDeliveryMethods',obj)
    },
    //选择送水时段
    onLastAfternoon(picker,values) {
      this.lastAfternoon = values[0];
      var obj = {
        carriage:this.carriage,//送水频率
        fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
        startDate:this.startDateShow ? this.startDateShow : '',
        endDate:this.endDateShow ? this.endDateShow : '',
        lastAfternoon:this.lastAfternoon,//送水时段
        week:this.week,
      }
      this.$emit('lastAfternoonEleFn',picker);
      this.$emit('showDeliveryMethods',obj)
    },
    //选择星期几
    onWeek(picker,values){
      this.week = values[0];
      if(this.carriage == '单次') {
        this.fixedFrequencyType = 0;
      }else{
        switch (values[0].name) {
          case '星期一':
            this.fixedFrequencyType = 1;
            break;
          case '星期二':
            this.fixedFrequencyType = 2;
            break;
          case '星期三':
            this.fixedFrequencyType = 3;
            break;
          case '星期四':
            this.fixedFrequencyType = 4;  
            break;
          case '星期五':
            this.fixedFrequencyType = 5;
            break;
          case '星期六':
            this.fixedFrequencyType = 6;
            break;
          case '星期天':
            this.fixedFrequencyType = 7;
            break;  
        }
      }
      var obj = {
        carriage:this.carriage,//送水频率
        fixedFrequencyType:this.fixedFrequencyType,//送水频率传参用
        startDate:this.startDateShow ? this.startDateShow : '',
        endDate:this.endDateShow ? this.endDateShow : '',
        lastAfternoon:this.lastAfternoon,//送水时段
        week:this.week
      }
      this.$emit('weekEleFn',picker);
      this.$emit('showDeliveryMethods',obj)
    },
    //打开选择框
    openSelect( type ){
      switch (type) {
        case 'search':
          this.searchModal = true;
          break;
        case 1:
          this.carriageModal = true;
          break;
        case 2:
          this.$refs.startPicker.open();
          break;
        case 3:
          this.$refs.endPicker.open();
          break;
        case 4:
          this.lastAfternoonModal = true;
          break;
        case 5:
          this.weekModal = true;
          break;
      }
    },
    //关闭选择框
    cancel( type ){
      switch (type) {
        case 1:
          this.carriageModal = false;
          break;
        case 2:
          this.$refs.startPicker.open();
          break;
        case 3:
          this.$refs.endPicker.open();
          break;
        case 4:
          this.lastAfternoonModal = false;
          break;
        case 5:
          this.weekModal = false;
          break;
      }
    }
  }
}

