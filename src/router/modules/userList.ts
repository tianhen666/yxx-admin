/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:24:30
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 15:42:21
 */
import Layout from '@/layouts/index.vue';
import ListIcon from '@/assets/assets-slide-list.svg';

export default [
  {
    path: '/userList',
    name: 'userList',
    component: Layout,
    redirect: '/userList/base',
    meta: { title: '用户管理', icon: ListIcon, orderNo: 0 },
    children: [
      {
        path: 'base',
        name: 'UserListBase',
        component: () => import('@/pages/userList/base/index.vue'),
        meta: { title: '用户列表' },
      },
    ],
  },
];
