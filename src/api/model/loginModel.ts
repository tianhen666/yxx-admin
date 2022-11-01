/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 11:19:09
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 15:05:19
 */

// 登录时数据接口定义
export interface loginInfo {
  phone: string;
  admin: string;
  password: string;
  verifyCode: string;
  checked: boolean;
}

export interface resLoginInfo {
  data: string;
}
