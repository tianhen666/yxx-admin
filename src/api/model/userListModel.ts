export interface ListResult {
  userlist: Array<ListModel>;
  count: number;
  pageindex: number;
}

export interface ListModel {
  adminName: string;
  amount: string;
  contractType: number;
  index: number;
  name: string;
  no: string;
  paymentType: number;
  status: number;
  updateTime: Date;
}

export interface requestModel {
  searchValue: string;
  pageNum: number;
  pageSize: number;
  storeId: number;
}
