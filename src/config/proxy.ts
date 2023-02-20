/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:05
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-06 20:29:52
 */
export default {
  isRequestProxy: true,
  development: {
    // 开发环境接口请求
    host: 'https://yxxadminapi.lechi.com' || 'http://localhost:3002',
    // 开发环境 cdn 路径
    cdn: '',
  },
  test: {
    // 测试环境接口地址
    host: 'https://yxxadminapi.lechi.com',
    // 测试环境 cdn 路径
    cdn: '',
  },
  release: {
    // 正式环境接口地址
    host: 'https://yxxadminapi.lechi.com',
    // 正式环境 cdn 路径
    cdn: '',
  },
};
