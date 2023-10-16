<template>
  <div>
    <div id="alice">
      <!-- 顶部 card  -->
      <top-panel :info="dataStatistics" class="row-container" />
      <!-- 中部图表  -->
      <!-- <middle-chart class="row-container" /> -->
      <!-- 列表排名 -->
      <!-- <rank-list class="row-container" /> -->
      <!-- 出入库概览 -->
      <!-- <output-overview class="row-container" /> -->
    </div>
    <t-loading attach="#alice" size="medium" :loading="loading"></t-loading>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DashboardBase',
};
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import TopPanel from './components/TopPanel.vue';
// import MiddleChart from './components/MiddleChart.vue';
// import RankList from './components/RankList.vue';
// import OutputOverview from './components/OutputOverview.vue';

import { dashboardBase, dashboardBaseModel } from '@/api/dashboard';

onMounted(() => {
  fetchData();
});

const dataStatistics = ref<dashboardBaseModel>({
  totalOrders: 0,
  totalSales: 0,
  totalUsers: 0,
  totalStore: 0,
});
const loading = ref(true);
const fetchData = async () => {
  const res = await dashboardBase();
  dataStatistics.value = res;
  loading.value = false;
};
</script>

<style scoped>
.row-container:not(:last-child) {
  margin-bottom: 16px;
}
</style>
