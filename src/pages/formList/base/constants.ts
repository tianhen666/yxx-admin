/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:50:02
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 18:44:01
 */

import dayjs from 'dayjs';

export const COLUMNS = [
  {
    title: 'ID',
    colKey: 'id',
    fixed: 'left',
    width: 80,
    align: 'center',
  },
  {
    title: '商品封面图',
    colKey: 'mainPic',
    width: 120,
    align: 'center',
  },
  {
    title: '商品标题',
    ellipsis: true,
    colKey: 'title',
    align: 'center',
    width: 240,
  },
  {
    title: '开始时间',
    colKey: 'startDt',
    ellipsis: true,
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) => dayjs(row.startDt).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '结束时间',
    ellipsis: true,
    colKey: 'endDt',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) => dayjs(row.endDt).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '金额',
    ellipsis: true,
    colKey: 'price',
    align: 'center',
    width: 120,
    cell: (h: any, { row }: any) => `${row.price} 元`,
  },
  {
    title: '库存',
    ellipsis: true,
    colKey: 'quantity',
    align: 'center',
    width: 120,
    cell: (h: any, { row }: any) => `${row.quantity}`,
  },
  {
    title: '销量',
    ellipsis: true,
    colKey: 'sold',
    align: 'center',
    width: 120,
    cell: (h: any, { row }: any) => `${row.sold} 单`,
  },
  {
    title: '所属门诊',
    ellipsis: true,
    colKey: 'store',
    align: 'center',
    width: 180,
    cell: (h: any, { row }: any) => `${row.store.name}`,
  },
  {
    align: 'left',
    fixed: 'right',
    width: 120,
    colKey: 'op',
    title: '操作',
  },
];
