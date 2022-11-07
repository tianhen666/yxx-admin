/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:24:30
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 11:54:25
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
      {
        path: 'input',
        name: 'StoreListInput',
        component: () => import('@/pages/storeList/input/index.vue'),
        meta: { title: '店铺设置', hidden: true },
      },
    ],
  },
];
