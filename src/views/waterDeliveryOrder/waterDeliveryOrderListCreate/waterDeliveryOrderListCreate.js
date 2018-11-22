import top from '@/components/top/Top.vue'
export default {
  name: 'waterDeliveryOrderListCreate',
  components: { top },
  data(){
    return {     
      waterDeliveryOrderListCreate:[
        {
          date:'11月07 周三 今天',
          images:"../../../static/images/water.png",
          title:"清华桶装水",
          Specifications:"100ML",
          price:"￥12.00",
          num:'1',
        }
      ],
      adderssdata:[
        {
          waterName:'清华桶装水',
          num:'1',
          consignee:'叶落森',
          phone:'13661064232',
          address:'北京市海淀区上地十街联想研究院',
          remarks:'送水速度要快'
        }       
      ]
    }
  },
  computed: {},
  methods: {
    tiaoadd(){
      this.$router.push({
        name:'waterDeliveryOrderListCreate'
      })
    }
  },
  created(){

  }
}
