/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:05
 * @LastEditors: TianHen
 * @LastEditTime: 2022-10-31 16:10:41
 */
import { createPinia } from 'pinia';
// pinia 持久化插件
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();
// pinia 安装持久化插件
store.use(createPersistedState());

export { store };

export * from './modules/notification';
export * from './modules/permission';
export * from './modules/user';
export * from './modules/setting';
export * from './modules/tabs-router';

export default store;
