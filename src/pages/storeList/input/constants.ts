/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:50:02
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-04 14:01:52
 */

export const INITIAL_DATA = {
  merchantId: '',
  merchantNum: '',
  payKey: '',
  appid: '',
  secret: '',
};

export const RULES = {
  merchantId: [{ required: true, message: '必填', type: 'warning' }],
  merchantNum: [{ required: true, message: '必填', type: 'warning' }],
  payKey: [{ required: true, message: '必填', type: 'warning' }],
  appid: [{ required: true, message: '必填', type: 'warning' }],
  secret: [{ required: true, message: '必填', type: 'warning' }],
};
