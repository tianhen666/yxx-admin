/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:24:30
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 14:14:54
 */
import Layout from '@/layouts/index.vue';
import ListIcon from '@/assets/assets-slide-list.svg';

export default [
  {
    path: '/formList',
    name: 'formList',
    component: Layout,
    redirect: '/formList/base',
    meta: { title: '活动管理', icon: ListIcon, orderNo: 1 },
    children: [
      {
        path: 'base',
        name: 'FormListBase',
        component: () => import('@/pages/formList/base/index.vue'),
        meta: { title: '活动列表' },
      },
    ],
  },
];
