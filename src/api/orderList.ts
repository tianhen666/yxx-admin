/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:08:38
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 14:03:28
 */
import { request } from '@/utils/request';

const Api = {
  BaseList: '/storeProductOrder/productOrderList',
};

// 获取用户列表
export function BaseList(data: any) {
  return request.post({
    url: Api.BaseList,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
