/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:06
 * @LastEditors: TianHen
 * @LastEditTime: 2022-10-31 16:24:01
 */
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRouterList } from '@/router';
import { store } from '@/store';

// 过滤权限路由函数
function filterPermissionsRouters(routes: Array<RouteRecordRaw>, roles: Array<unknown>) {
  const res = [];
  const removeRoutes = [];
  routes.forEach((route) => {
    const children = [];
    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

// 设置权限路由全局属性
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: [],
  }),
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters = [];

      let removeRoutes = [];
      // special token
      if (roles.includes('all')) {
        accessedRouters = asyncRouterList;
      } else {
        const res = filterPermissionsRouters(asyncRouterList, roles);
        accessedRouters = res.accessedRouters;
        removeRoutes = res.removeRoutes;
      }

      this.routers = accessedRouters;
      this.removeRoutes = removeRoutes;

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name);
        }
      });
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    },
  },
});

// 运行store
export function getPermissionStore() {
  return usePermissionStore(store);
}
