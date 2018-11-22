import { API_ORDER_RECORDS_PHONE_BUY_LIST,API_FILE_PATH } from '@/libs/api.js'
export default {
    name: 'purchasedWaterList',
    data() {
        return {
            rootUrl:API_FILE_PATH,
            listData:[],
            loading: false
        }
    },
    methods: {
        setConfig() {
            let headerBar = {
                isBack: false,
                isWaterAdd: true,
                isAddressSave: false
            };
            this.$store.commit("setMenu", [true, true]);
            this.$store.commit("setHeaderBar", headerBar);
        },
        loadData() {//加载已购列表
            var url = API_ORDER_RECORDS_PHONE_BUY_LIST;
            this.$get(url).then(res => {
                if (res.data.retCode == 200) {
                    this.listData = res.data.data.buyOrderAndCommodityVOList;
                } else {
                    this.Toast({
                        message: res.data.message,
                        position: 'center',
                        duration: 2000
                    })
                }
            }).catch(res => {
                console.log(res);
            })
        },
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                for (var i = 1; i <= 10; i++) {
                    this.purchaseWaterList.push(obj);
                }
                this.loading = false;
                console.log('123')
            }, 2500);
        }
    },
    created() {
        this.setConfig();
        this.loadData();
    }
}
