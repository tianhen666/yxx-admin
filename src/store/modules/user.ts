/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:06
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 15:11:26
 */
import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';
import type { loginInfo } from '@/api/model/loginModel';
import { mLogin } from '@/api/login';

const InitUserInfo = {
  roles: [],
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME),
    userInfo: InitUserInfo,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: loginInfo) {
      // 请求登录
      const res = await mLogin(userInfo);
      // console.log('res', res);

      // 设置token
      this.token = res;
    },
    async getUserInfo() {
      const mockRemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            name: 'td_main',
            roles: ['all'],
          };
        }
        return {
          name: 'td_dev',
          roles: ['UserIndex', 'DashboardBase', 'login'],
        };
      };

      const res = await mockRemoteUserInfo(this.token);

      this.userInfo = res;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    },
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
