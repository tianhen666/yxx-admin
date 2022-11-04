/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:50:02
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-03 15:38:27
 */

import dayjs from 'dayjs';

export const COLUMNS = [
  {
    title: 'ID',
    colKey: 'storeId',
    fixed: 'left',
    width: 100,
    align: 'center',
  },
  {
    title: '店铺logo',
    ellipsis: true,
    colKey: 'icon',
    width: 120,
    align: 'center',
  },
  {
    title: '店铺名',
    ellipsis: true,
    colKey: 'name',
    align: 'center',
  },
  {
    title: '联系人',
    colKey: 'contactName',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '手机号',
    colKey: 'mobile',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '创建时间',
    ellipsis: true,
    colKey: 'createDt',
    align: 'center',
    cell: (h: any, { row }: any) => dayjs(row.createDt).format('YYYY-MM-DD'),
  },
  {
    title: '到期时间',
    ellipsis: true,
    colKey: 'expireDt',
    align: 'center',
    cell: (h: any, { row }: any) => dayjs(row.expireDt).format('YYYY-MM-DD'),
  },
  {
    title: '店铺地址',
    ellipsis: true,
    colKey: 'address',
    align: 'center',
    cell: (h: any, { row }: any) => `${row.address}${row.addressDetail}`,
  },
  {
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
    title: '操作',
  },
];
