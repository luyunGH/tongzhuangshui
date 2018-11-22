import { baseUrl } from "@/config/env"

const API_CUSTOMER = `${baseUrl}api/officail-sales/v1/`;

//授权回调域名
let authUrl = "m.water.ui-tech.cn";

//图片回显
let API_FILE_PATH = "http://file.ui-tech.cn/"
//商品列表
let API_COMMODITYS_PHONE_LIST = `${API_CUSTOMER}commoditys/phone/list`
//商品详情
let API_COMMODITYS_PHONE_IDQUERY = `${API_CUSTOMER}commoditys/phone/idquery/`
//创建购买订单
let API_ORDERS_GENERATE = `${API_CUSTOMER}orders/generate`
//我的购买记录
let API_ORDERS_USER_PAGE = `${API_CUSTOMER}orders/user/page`
//地址码表
let API_ADDRESS_CODE = `${API_CUSTOMER}codes/categorycode/parentcodekey`;
//收货地址新增保存
let API_ADDRESS_SAVE = `${API_CUSTOMER}membershipaddress/insert`;
//获取收货地址列表
let API_ADDRESS_LIST = `${API_CUSTOMER}membershipaddress/query`;
//收货地址删除
let API_ADDRESS_DELE = `${API_CUSTOMER}membershipaddress/deletefront/`;
//收货地址编辑获取源数据
let API_ADDRESS_GET_EDIT = `${API_CUSTOMER}membershipaddress/idquery/`;
//收货地址编辑保存
let API_ADDRESS_EDIT_SAVE = `${API_CUSTOMER}membershipaddress/updatefront`;
//公司列表模糊查询
let API_COMPANY_SEARCH = `${API_CUSTOMER}/memsinformations/query`;
//保存个人信息
let API_PERSON_SAVE = `${API_CUSTOMER}/memberships/register`;
//已购水列表
let API_ORDER_RECORDS_PHONE_BUY_LIST = `${API_CUSTOMER}order-records/phone/buy/list`
//创建配送订单
let API_ORDER_RECORDS_PHONE_CHECK_ORDERRECORD = `${API_CUSTOMER}order-records/phone/check/orderrecord`
//校验订单
let API_ORDER_RECORDS_PHONE_INSERT_ORDERRECORD = `${API_CUSTOMER}order-records/phone/insert/orderrecord`
//换取access_token
let API_WECHAT_OAUTH_ACCESSTOKEN = `${API_CUSTOMER}wechat/oauth2/accesstoken/`
//获取用户默认地址
let API_MEMBERSHIP_ADDRESS_QUERY_DEFAULT = `${API_CUSTOMER}membershipaddress/querydefault`

export {
  API_CUSTOMER,
  API_COMMODITYS_PHONE_LIST,
  API_COMMODITYS_PHONE_IDQUERY,
  API_FILE_PATH,
  API_ORDERS_GENERATE,
  API_ORDERS_USER_PAGE,
  API_ADDRESS_CODE,
  API_ADDRESS_SAVE,
  API_ADDRESS_LIST,
  API_ADDRESS_DELE,
  API_ADDRESS_GET_EDIT,
  API_ADDRESS_EDIT_SAVE,
  API_PERSON_SAVE,
  API_COMPANY_SEARCH,
  API_ORDER_RECORDS_PHONE_BUY_LIST,
  API_ORDER_RECORDS_PHONE_INSERT_ORDERRECORD,
  API_ORDER_RECORDS_PHONE_CHECK_ORDERRECORD,
  API_WECHAT_OAUTH_ACCESSTOKEN,
  API_MEMBERSHIP_ADDRESS_QUERY_DEFAULT,
  authUrl
}
