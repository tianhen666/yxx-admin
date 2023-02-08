import { request } from '@/utils/request';
import type * as tModel from '@/api/model/storeListModel';

const Api = {
  storeList: '/store/getStoreList',
  storeInfo: '/store/getInfo',
  storeSetAsIsBrand: '/store/setAsIsBrand',
  storeSetAsPower: '/store/setAsPower',
  storeDeleteUser: '/store/deleteUser',
  storeWxAccount: '/storeWxAccount/changeWxAccount',
  storeChangeStore: '/store/changeStore',
  wxGenerateUrlLink: '/wx/generateUrlLink',
  storeDelete:'/store/deleteStore',
  storeListExcel:'/store/storeListExcel'
};

// 获取店铺列表
export function getStoreList(data: tModel.requestModel) {
  return request.post<tModel.ListResult>({
    url: Api.storeList,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 获取店铺详细信息
export function getStoreInfo(data: tModel.requestModel2) {
  return request.post<tModel.ListModel2>({
    url: Api.storeInfo,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 设置品牌分账
export function storeSetAsIsBrand(data: any) {
  return request.post({
    url: Api.storeSetAsIsBrand,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 添加修改员工权限
export function storeSetAsPower(data: any) {
  return request.post({
    url: Api.storeSetAsPower,
    data,
  });
}

// 删除员工
export function storeDeleteUser(data: any) {
  return request.post({
    url: Api.storeDeleteUser,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 修改支付和appID
export function storeWxAccount(data: any) {
  return request.post({
    url: Api.storeWxAccount,
    data,
  });
}

// 设置门店到期时间
export function storeChangeStore(data: any) {
  return request.post({
    url: Api.storeChangeStore,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 获取小程序短链接
export function wxGenerateUrlLink(data: any) {
  return request.post({
    url: Api.wxGenerateUrlLink,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 删除门店
export function storeDelete(data: any) {
  return request.post({
    url: Api.storeDelete,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

// 删除门店
export function storeListExcel(data: any) {
  return request.post({
    url: Api.storeListExcel,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
