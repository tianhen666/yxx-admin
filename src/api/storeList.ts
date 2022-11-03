/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:08:38
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-02 15:38:19
 */
import { request } from '@/utils/request';
import type { ListResult, requestModel } from '@/api/model/storeListModel';

const Api = {
  BaseList: '/store/getStoreList',
};

export function getStoreList(data: requestModel) {
  return request.post<ListResult>({
    url: Api.BaseList,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
