/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 12:47:00
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-03 10:46:55
 */
import { request } from '@/utils/request';
import type { loginInfo, resLoginInfo } from '@/api/model/loginModel';

const Api = {
  Login: '/user/getLogin',
};

// 登录
export function mLogin(loginInfo: loginInfo) {
  return request.post<resLoginInfo>({
    url: Api.Login,
    data: loginInfo,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
