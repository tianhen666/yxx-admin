/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 12:47:00
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-05 19:35:53
 */
import { request } from '@/utils/request';
import type { loginInfo } from '@/api/model/loginModel';

const Api = {
  Login: '/user/getLogin',
};

// 登录
export function mLogin(loginInfo: loginInfo) {
  return request.post<string>({
    url: Api.Login,
    data: loginInfo,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
