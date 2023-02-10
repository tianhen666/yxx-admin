<!--
 * @Descripttion: 
 * @version: 
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:05
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 10:55:53
-->
<template>
  <router-view :class="[mode]" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useSettingStore } from '@/store';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});
</script>
<style lang="less">
// 表单样式自定义
:deep(.table-box) {
  height: calc(100vh - 63px - 24px - 16px - 60px - 50px);
}
:deep(.table-list-header) {
  margin-bottom: 20px;
}
// 筛选样式覆盖
:deep(.t-select__wrap) {
  font-size: 0;
  line-height: 1;
}
// 进度条样式覆盖
:deep(#nprogress .bar) {
  background: var(--td-brand-color) !important;
}
:golbal(*, *:before, *:after) {
  box-sizing: border-box;
}
</style>
