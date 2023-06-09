/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:50:02
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-14 10:12:38
 */

import dayjs from 'dayjs';

export const COLUMNS = [
  {
    title: '订单编号',
    colKey: 'order_no',
    width: 200,
    align: 'center',
  },
  {
    title: '购买用户名',
    ellipsis: true,
    colKey: 'nickname',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) =>
      row.nickname || h('span', { style: { color: '#aaa' } }, '未授权'),
  },
  {
    title: '分账类型',
    ellipsis: true,
    colKey: 'isbrand',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) =>
      row.isbrand === 0 ? '普通分账' : row.isbrand === 1 ? '品牌分账' : '',
  },
  {
    title: '购买人手机号',
    colKey: 'mobile',
    ellipsis: true,
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) =>
      row.mobile || h('span', { style: { color: '#aaa' } }, '未授权'),
  },
  {
    title: '所属门诊',
    ellipsis: true,
    colKey: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: '分佣状态',
    ellipsis: true,
    colKey: 'isdeal',
    align: 'center',
    width: 200,
  },
  {
    title: '订单来源',
    ellipsis: true,
    colKey: 'orderType',
    align: 'center',
    width: 100,
  },

  {
    title: '订单/商品名称',
    ellipsis: true,
    colKey: 'product_name',
    align: 'center',
    width: 200,
  },

  {
    title: '订单金额',
    ellipsis: true,
    colKey: 'price',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) => `${row.price} 元`,
  },
  {
    title: '订单状态',
    ellipsis: true,
    colKey: 'status',
    align: 'center',
    width: 120,
  },
  {
    title: '邀请人用户名',
    ellipsis: true,
    colKey: 'yName',
    align: 'center',
    width: 200,
  },
  {
    title: '邀请人手机号',
    ellipsis: true,
    colKey: 'yNobile',
    align: 'center',
    width: 200,
  },
  {
    title: '分账金额',
    ellipsis: true,
    colKey: 'share_price',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) => `${row.share_price}元`,
  },

  {
    title: '订单创建时间',
    ellipsis: true,
    colKey: 'create_dt',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) =>
      dayjs(row.create_dt).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '订单支付时间',
    ellipsis: true,
    colKey: 'pay_dt',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) =>
      row.pay_dt ? dayjs(row.pay_dt).format('YYYY-MM-DD HH:mm:ss') : '--',
  },
  {
    title: '订单完成时间',
    ellipsis: true,
    colKey: 'complete_dt',
    align: 'center',
    width: 200,
    cell: (h: any, { row }: any) =>
      row.complete_dt
        ? dayjs(row.complete_dt).format('YYYY-MM-DD HH:mm:ss')
        : '--',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 120,
    colKey: 'op',
    title: '操作',
  },
];
