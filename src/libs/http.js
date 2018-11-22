import axios from 'axios';
import { Indicator, Toast } from 'mint-ui';

axios.defaults.timeout = 300000;
axios.defaults.baseURL = '';

axios.interceptors.request.use(config => {
  let token = sessionStorage.getItem("token");
  config.headers = {
    //'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  config.url = config.url + '?random=' + new Date().getTime();
  return config;
}, error => {
  Toast(`拦截器报错：${error}`);
  return Promise.reject(error);
});

//错误处理函数
function err( res ){
  Indicator.close();
  Toast(`接口${res.request.status}错误：${res.config.url}`);
}

//post请求
let postFn = async ( url, params = null ) => {
  let result = null;
  Indicator.open('加载中...');
  await axios.post(url, params).then(res => {
    Indicator.close();
    result = res;
  }).catch(res => {
    err(res);
  });
  return result;
};

//get请求
let getFn = async ( url, params = null ) => {
  let result = null;
  Indicator.open('加载中...');
  await axios.get(url, { params }).then(res => {
    Indicator.close();
    result = res;
  }).catch(res => {
    err(res);
  });
  return result;
};

export {
  postFn,
  getFn
}
