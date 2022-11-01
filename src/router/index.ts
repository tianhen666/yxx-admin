/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:05
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 16:22:03
 */
import { useRoute, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import uniq from 'lodash/uniq';

// 自动导入modules文件夹下所有ts文件
const modules = import.meta.globEager('./modules/**/*.ts');

// 路由暂存
const routeModuleList: Array<RouteRecordRaw> = [];

// 遍历动态路由
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 关于单层路由，meta 中设置 { single: true } 即可为单层路由，{ hidden: true } 即可在侧边栏隐藏该路由

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList];
// console.log('动态路由', asyncRouterList);

// 存放固定的路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard/base',
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404',
  },
];

// 固定路由和动态路由合并
export const allRoutes = [...defaultRouterList, ...asyncRouterList];

// 扩展路由,三级路由展开
export const getRoutesExpanded = () => {
  const expandedRoutes = [];

  allRoutes.forEach((item) => {
    if (item.meta && item.meta.expanded) {
      expandedRoutes.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      item.children
        .filter((child) => child.meta && child.meta.expanded)
        .forEach((child: RouteRecordRaw) => {
          expandedRoutes.push(item.path);
          expandedRoutes.push(`${item.path}/${child.path}`);
        });
    }
  });
  return uniq(expandedRoutes);
};

// 获取当前激活按钮
export const getActive = (maxLevel = 3): string => {
  const route = useRoute();
  if (!route.path) {
    return '';
  }
  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('');
};

// 导出路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
