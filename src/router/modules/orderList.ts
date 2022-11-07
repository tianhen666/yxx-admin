/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:24:30
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 14:24:48
 */
import Layout from '@/layouts/index.vue';
import ListIcon from '@/assets/assets-slide-list.svg';

export default [
  {
    path: '/orderList',
    name: 'orderList',
    component: Layout,
    redirect: '/orderList/base',
    meta: { title: '订单管理', icon: ListIcon, orderNo: 1 },
    children: [
      {
        path: 'base',
        name: 'OrderListBase',
        component: () => import('@/pages/orderList/base/index.vue'),
        meta: { title: '订单列表' },
      },
    ],
  },
];
