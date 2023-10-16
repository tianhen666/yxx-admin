import { request } from '@/utils/request';

const Api = {
  dashboardBase: '/dashboard/data',
  storeTotalAmount: '/dashboard/storeTotalAmount',
  storeList: '/dashboard/storeList',
  storeTotalUser: '/dashboard/storeTotalUser',
  storeTotalOrder: '/dashboard/storeTotalOrder',
};

export interface dashboardBaseModel {
  totalSales: number;
  totalUsers: number;
  totalOrders: number;
  totalStore: number;
}

// 所有统计总和数据
export function dashboardBase() {
  return request.get<dashboardBaseModel>({
    url: Api.dashboardBase,
  });
}

// 每个店铺数据总金额
export function storeTotalAmount(params: any) {
  return request.get<any>({
    params,
    url: Api.storeTotalAmount,
  });
}

// 店铺列表
export function storeList(params: any) {
  return request.get<any>({
    params,
    url: Api.storeList,
  });
}

// 每个店铺用户数量
export function storeTotalUser(params: any) {
  return request.get<any>({
    params,
    url: Api.storeTotalUser,
  });
}

// 每个店铺订单数量
export function storeTotalOrder(params: any) {
  return request.get<any>({
    params,
    url: Api.storeTotalOrder,
  });
}
