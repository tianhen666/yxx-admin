<!--
 * @Descripttion: 
 * @version: 
 * @Author: TianHen
 * @Date: 2022-10-31 14:32:06
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-07 10:26:05
-->
<template>
  <div class="login-wrapper">
    <!-- <login-header /> -->

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">牙小新后台管理</h1>
        <!-- <div class="sub-title">
          <p class="tip">{{ type == 'register' ? '已有账号?' : '没有账号吗?' }}</p>
          <p class="tip" @click="switchType(type == 'register' ? 'login' : 'register')">
            {{ type == 'register' ? '登录' : '注册新账号' }}
          </p>
        </div> -->
      </div>

      <login v-if="type === 'login'" />
      <register v-else @register-success="switchType('login')" />

      <!-- 主题设置 -->
      <tdesign-setting />
    </div>

    <footer class="copyright">
      Copyright @ 2022-{{ new Date().getFullYear() }} 杭州乐齿网络科技有限公司. All Rights Reserved
    </footer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
// import LoginHeader from './components/Header.vue';
import TdesignSetting from '@/layouts/setting.vue';

const type = ref('login');
const switchType = (val: string) => {
  type.value = val;
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
