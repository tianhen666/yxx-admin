/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:50:02
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-02 21:48:31
 */

import dayjs from 'dayjs';

export const COLUMNS = [
  {
    title: '用户ID',
    colKey: 'id',
    fixed: 'left',
    width: 100,
    align: 'center',
  },
  {
    title: '头像',
    ellipsis: true,
    colKey: 'avatar',
    width: 100,
    align: 'center',
  },
  {
    title: '用户名',
    ellipsis: true,
    colKey: 'nickname',
    align: 'center',
    cell: (h: any, { row }: any) => row.nickname || h('span', { style: { color: '#aaa' } }, '未授权'),
  },
  {
    title: '手机号',
    colKey: 'mobile',
    ellipsis: true,
    align: 'center',
    cell: (h: any, { row }: any) => row.mobile || h('span', { style: { color: '#aaa' } }, '未授权'),
  },
  {
    title: '注册时间',
    ellipsis: true,
    colKey: 'create_dt',
    align: 'center',
    cell: (h: any, { row }: any) => dayjs(row.create_dt).format('YYYY-MM-DD'),
  },
  {
    title: '支付金额',
    ellipsis: true,
    colKey: 'price',
    align: 'center',
    cell: (h: any, { row }: any) => `${row.price} 元`,
  },
  {
    title: '购买数量',
    ellipsis: true,
    colKey: 'productCount',
    align: 'center',
    cell: (h: any, { row }: any) => `${row.productCount} 单`,
  },
  {
    title: '所属门诊',
    ellipsis: true,
    colKey: 'name',
    align: 'center',
  },
];
