/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:08:38
 * @LastEditors: TianHen
 * @LastEditTime: 2022-12-17 15:57:32
 */
import { request } from '@/utils/request';

const Api = {
  BaseList: '/storeProductOrder/productOrderList',
  ExportData: '/exportData/storeOrderEx',
  DivideAccountsFQ: '/DivideAccounts/profitsharing/queryorders',
  DivideAccountsOrders: '/DivideAccounts/orders',
};

// 获取用户列表
export function BaseList(data: any) {
  return request.post({
    url: Api.BaseList,
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
}

// 订单数据导出
export function ExportData(params: any) {
  return request.get({
    url: Api.ExportData,
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
}

export interface DivideAccountsFQRequestModel {
  storeId: string;
  outOrderNo: string;
}

// 查询分账结果
export function DivideAccountsFQ(params: DivideAccountsFQRequestModel) {
  return request.get({
    url: Api.DivideAccountsFQ,
    params,
  });
}

export interface DivideAccountsOrdersRequestModel {
  storeId: string;
  traceNum: string;
}
// 开始分账
export function DivideAccountsOrders(params: DivideAccountsOrdersRequestModel) {
  return request.post(
    {
      url: Api.DivideAccountsOrders,
      params: params,
    },
    {
      joinParamsToUrl: true,
    },
  );
}
