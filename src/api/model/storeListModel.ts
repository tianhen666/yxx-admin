/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:12:22
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-04 13:50:23
 */
export interface ListResult {
  records: Array<ListModel>;
  total: number;
}

export interface ListModel {
  storeId: number;
  name: string;
}

export interface ListModel2 {
  userList: Array<unknown>;
  storeProductList: Array<unknown>;
  enrollFormList: Array<unknown>;
  storeWxAccount: object;
}

export interface requestModel {
  searchStoreName: string;
  pageNum: number;
  pageSize: number;
  moneySort?:number;
}

export interface requestModel2 {
  storeId: string;
}
