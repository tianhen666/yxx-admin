/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:08:38
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-03 09:36:13
 */
import { request } from '@/utils/request';
import type { ListResult, requestModel } from '@/api/model/userListModel';

const Api = {
  BaseList: '/user/getUserList',
};

// 获取用户列表
export function getUserList(data: requestModel) {
  return request.post<ListResult>({
    url: Api.BaseList,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
