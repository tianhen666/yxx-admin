/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:24:30
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-02 18:06:29
 */
import Layout from '@/layouts/index.vue';
import ListIcon from '@/assets/assets-slide-list.svg';

export default [
  {
    path: '/storeList',
    name: 'storeList',
    component: Layout,
    redirect: '/storeList/base',
    meta: { title: '店铺管理', icon: ListIcon, orderNo: 2 },
    children: [
      {
        path: 'base',
        name: 'StoreListBase',
        component: () => import('@/pages/storeList/base/index.vue'),
        meta: { title: '店铺列表' },
      },
    ],
  },
];
