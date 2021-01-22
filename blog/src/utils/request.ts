import { history as router } from 'umi';

import {
  extend,
} from 'umi-request';

export interface Response<T> {
  msg: string;
  code: number;
  data: T;
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  timeout: 5000,
  prefix: window.__POWERED_BY_QIANKUN__ ? 'https://lanhao.name/api' : '/api',
});

/**
 * 业务错误处理
 * TODO
 */

request.interceptors.response.use(async (response) => {
  // console.log(response);

  return response;
});

// request拦截器, 移除掉请求参数中值为 null 或者 undefined 的字段.
request.interceptors.request.use((url, options) => {
  let { params, data, headers } = options;

  return {
    url,
    options: { ...options, data, params, headers },
  };
});

export default request;
