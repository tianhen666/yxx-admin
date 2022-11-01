<!--
 * @Descripttion: 
 * @version: 
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:05
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 19:40:47
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
<style lang="less" scoped>
:global(#nprogress .bar) {
  background: var(--td-brand-color) !important;
}
:global(.table_box) {
  height: calc(100vh - 63px);
}
</style>
