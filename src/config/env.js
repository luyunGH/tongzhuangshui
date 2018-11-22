let baseUrl = '';
let routerMode = 'hash';
let env = 'dev';
if (process.env.NODE_ENV == 'development') {
  // baseUrl = 'http://10.100.50.27:9084/';
  baseUrl = 'http://api.water.ui-tech.cn/';
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = 'http://api.water.ui-tech.cn/';
  env = 'pro';
} else if (process.env.NODE_ENV == 'beta') {
  baseUrl = 'http://10.100.50.27:9084/';
  env = 'beta';
}

export {
  baseUrl,
  env
}
