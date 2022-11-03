/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:12:22
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-02 14:15:29
 */
export interface ListResult {
  userlist: Array<ListModel>;
  count: number;
  pageindex: number;
}

export interface ListModel {
  id: number;
  mobile: string;
  nickname: string;
  avatar: string;
  createDt: Date;
  price: number;
  productCount: number;
  name: number;
}

export interface requestModel {
  searchValue: string;
  pageNum: number;
  pageSize: number;
  storeId: number;
}
