/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:05
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 13:33:25
 */
export default {
  isRequestProxy: true,
  development: {
    // 开发环境接口请求
    host: 'http://localhost:3002',
    // 开发环境 cdn 路径
    cdn: '',
  },
  test: {
    // 测试环境接口地址
    host: 'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
    // 测试环境 cdn 路径
    cdn: '',
  },
  release: {
    // 正式环境接口地址
    host: 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com',
    // 正式环境 cdn 路径
    cdn: '',
  },
};
