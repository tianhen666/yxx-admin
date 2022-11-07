<!--
 * @Descripttion: 
 * @version: 
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:06
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 10:24:21
-->
<template>
  <div :class="prefix + '-footer'">
    Copyright @ 2022-{{ new Date().getFullYear() }} 杭州乐齿网络科技有限公司. All Rights Reserved
  </div>
</template>

<script setup lang="ts">
import { prefix } from '@/config/global';
</script>

<style lang="less" scoped>
.@{starter-prefix}-footer {
  color: var(--td-text-color-placeholder);
  line-height: 20px;
  text-align: center;
}
</style>
