import { API_FILE_PATH, API_COMMODITYS_PHONE_IDQUERY } from '@/libs/api.js';
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue';
Vue.component('mt-swipe', Swipe);
Vue.component('mt-swipe-item', SwipeItem);
export default {
    name: 'productDetail',
    data() {
        return {
            rootUrl: API_FILE_PATH,//图片回填接口
            quantity: 1,//数量
            proDetailData: {
                commodityImageList: [],
                commodityImageParameterList: [],
                commodityImageDetailList: []
            },//详情页数据
            id:''
        }
    },
    methods: {
        setConfig() {
            let headerBar = {
                isBack: true,
                isWaterAdd: false,
                isAddressSave: false
            };
            this.$store.commit("setMenu", [true, false]);
            this.$store.commit("setHeaderBar", headerBar);
        },
        loadDetailDataFn(id) {//加载详情数据
            var url = API_COMMODITYS_PHONE_IDQUERY + id;
            this.$get(url).then(res => {
                if (res.data.retCode == 200) {
                    this.proDetailData = res.data.data;
                } else {
                    //业务错误提示
                }
            }).catch(res => {
                console.log(res);
            })
        },
        addQuantityFn() {//添加数量
            this.quantity++;
        },
        reduceQuantityFn() {//减少数量
            if (this.quantity) {
                this.quantity--;
            }
        },
        toCreateBuyOrderPage() {//点击确定按钮去‘创建购买订单页’（参数商品id，单价，数量）
            if (this.quantity) {
                this.$router.push({
                    name: 'createBuyOrder',
                    params: {
                        id: this.proDetailData.id,
                        commodityName: this.proDetailData.commodityName,
                        commodityPrice: this.proDetailData.commodityPrice,
                        parameters: this.proDetailData.parameters,
                        quantity: this.quantity * 1,
                        showNum:(this.quantity * 1) * (this.proDetailData.commodityQuantity * 1),
                        commodityCompany:this.proDetailData.commodityCompany,
                        promotion:this.proDetailData.promotion,
                        imgUrl: this.rootUrl + this.proDetailData.commodityImageList[0].imageUrl
                    }
                })
            } else {
                this.Toast({
                    message: '购买数量不能为0',
                    position: 'center',
                    duration: 2000
                })
            }
        }
    },
    mounted(){
        this.loadDetailDataFn(this.id);
    },
    created() {
        this.id=this.$route.query.id
        this.setConfig();
    }
}