import { API_ORDERS_GENERATE } from '@/libs/api.js'

export default {
    name: "createBuyOrder",
    data() {
        return {
            commodityId: '',//商品commodityId
            commodityName:'',//商品名称
            commodityPrice:'',//商品单价
            parameters:'',//商品规格
            showNum:'',//购买数量显示用
            quantity:'',//购买数量
            guestBook:'',//备注
            imgUrl:'',//商品展示图片
            commodityCompany:'',//商品单位
            promotion:'',//促销语
            orderId:'',//点击立即支付按钮获取的orderId
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
        toPayPage() {//立即支付
            var url = API_ORDERS_GENERATE;
            var params = {
                buyNum: this.quantity * 1,
                commodityId: this.commodityId,
                guestBook: this.guestBook,
                commodityPrice:this.commodityPrice,
                totalPrice : (this.commodityPrice * 1) * (this.quantity * 1),
                userId: sessionStorage.getItem('wechatuser_id')
            }
            this.$post(url,params).then(res=>{
                if(res.data.retCode == 200){
                    this.orderId = res.data.data.data;
                }else{
                    //业务错误输出
                    this.Toast({
                        message: res.data.message,
                        position: 'center',
                        duration: 2000
                    })
                }
                this.$router.push('purchasedWaterList');
            }).catch(res=>{
                console.log(res);
            })
        },
        authorityCheckToPay() {//授权验证并唤起支付
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: '', // 必填，公众号的唯一标识
                timestamp: '', // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '',// 必填，签名
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.chooseWXPay({
                    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: '', // 支付签名随机串，不长于 32 位
                    package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: '', // 支付签名
                    success: function (res) {
                    // 支付成功后的回调函数
                    }
                });
            });
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }
    },
    created() {
        this.commodityId = this.$route.params.id;
        this.commodityName = this.$route.params.commodityName;
        this.commodityPrice = this.$route.params.commodityPrice;
        this.parameters = this.$route.params.parameters;
        this.quantity = this.$route.params.quantity;
        this.showNum = this.$route.params.showNum;
        this.promotion = this.$route.params.promotion;
        this.commodityCompany = this.$route.params.commodityCompany;
        this.imgUrl = this.$route.params.imgUrl;
        this.setConfig();
    }
}