/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 16:12:22
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-02 16:41:41
 */
export interface ListResult {
  records: Array<ListModel>;
  total: number;
}

export interface ListModel {
  storeId: number;
  name: string;
}

export interface requestModel {
  searchStoreName: string;
  pageNum: number;
  pageSize: number;
}
