/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:06
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-06 19:45:51
 */
import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';
import type { loginInfo } from '@/api/model/loginModel';
import { mLogin } from '@/api/login';

const InitUserInfo = {
  name: '',
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
    // 请求登录
    async login(userInfo: loginInfo) {
      const res = await mLogin(userInfo);
      // 设置token缓存
      localStorage.setItem(TOKEN_NAME, res);
      // 设置token
      this.token = res;
    },
    // 获取用户信息
    async getUserInfo() {
      const mockRemoteUserInfo = async () => {
        return {
          name: 'admin',
          roles: ['all'],
        };
      };

      const res = await mockRemoteUserInfo();

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
