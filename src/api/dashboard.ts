import { request } from '@/utils/request';

const Api = {
  dashboardBase: '/dashboard/data',
};

export interface dashboardBaseModel {
  totalSales: number;
  totalUsers: number;
  totalOrders: number;
  totalStore: number;
}
export function dashboardBase() {
  return request.get<dashboardBaseModel>({
    url: Api.dashboardBase,
  });
}
