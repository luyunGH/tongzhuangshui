import top from '@/components/top/Top.vue'
export default {
  name: 'waterDeliveryOrderDetail',
  components: { top },
  data(){
    return {     
      purchaseRecordList:[
        {
          username:'叶落森',
          status:'已支付',
          images:"../../../static/images/water.png",
          title:"清华桶装水",
          Specifications:"100ML",
          price:"￥12.00",
          oldprice:"￥100.00",        
          date:'2018-11-08',
          num:'1',
          totalPrice:'￥12.00'
        },
      ],
      adderssdata:[
        {
          waterName:'清华桶装水',
          num:'1',
          consignee:'叶落森',
          phone:'13661064232',
          address:'北京市海淀区上地十街联想研究院',
          remarks:'送水速度要快',
          no:'10101011111111111111',
          date:'2018-11-08'
        }       
      ]
    }
  },
  computed: {},
  methods: {

  },
  created(){

  }
}
