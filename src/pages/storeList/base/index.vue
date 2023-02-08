<template>
  <t-card class="list-card-container">
    <!-- 列表头部 -->
    <t-row align="center" class="table-list-header" :gutter="16">
      <!-- 搜索 -->
      <t-col class="search-input" :span="2">
        <t-input v-model="searchStoreName" placeholder="输入店铺名搜索" clearable @enter="
  paginationStore.defaultCurrent = 1;
fetchDataStoreList();
        ">
          <template #suffix-icon>
            <search-icon size="20px" />
          </template>
        </t-input>
      </t-col>

      <!-- 数据导出 -->
      <t-col class="export-btn" :span="2">
        <t-button variant="base" theme="primary" @click.stop="hStoreListExcel"> 导出店铺列表 </t-button>
      </t-col>
    </t-row>

    <!-- 列表内容 -->
    <t-table class="table-box" :data="storeListData" :columns="COLUMNS" row-key="storeId" :hover="true"
      max-height="calc(100% - 64px)" :scroll="{ type: 'lazy', bufferSize: 100 }" :pagination="paginationStore"
      :loading="storeListLoading" :header-affixed-top="true" @page-change="rehandlePageChange">
      <template #icon="{ row }">
        <t-avatar :image="row.icon" alt="无" size="large" />
      </template>

      <!-- 操作 -->
      <template #op="{ row, rowIndex }">
        <t-space>
          <t-link theme="primary"
            @click.prevent="router.push({ name: 'StoreListInput', query: { storeId: row.storeId } })"
            hover="color">详情</t-link>
          <t-popconfirm content="确认删除吗" theme="danger" @confirm="hDeleteStore(row, rowIndex)">
            <t-link theme="danger" hover="color">删除</t-link>
          </t-popconfirm>
        </t-space>
      </template>
    </t-table>
  </t-card>

</template>

<script lang="ts">
export default {
  name: 'StoreListBase',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { getStoreList, storeDelete, storeListExcel } from '@/api/storeList';
import { COLUMNS } from './constants';

const router = useRouter();

// 店铺列表加载
const storeListLoading = ref(false);
// 店铺列表数据
const storeListData = ref([]);
// 店铺搜索
const searchStoreName = ref('');

/**
 * 获取店铺列表函数
 */
const fetchDataStoreList = async () => {
  storeListLoading.value = true;
  try {
    const { records, total } = await getStoreList({
      searchStoreName: searchStoreName.value,
      pageNum: paginationStore.value.defaultCurrent,
      pageSize: paginationStore.value.defaultPageSize,
    });

    // 数据赋值
    storeListData.value = records;

    // 分页赋值
    paginationStore.value = {
      ...paginationStore.value,
      total,
    };
  } catch (e) {
    console.log(e);
  } finally {
    storeListLoading.value = false;
  }
};

onMounted(() => {
  fetchDataStoreList();
});


/* 删除门诊 */
const storeDeleteLoading = ref(false)
const hDeleteStore = async (data, rowIndex) => {
  storeDeleteLoading.value = true
  try {
    const resData = await storeDelete({
      storeId: data.storeId,
    });
    MessagePlugin.success(resData)
    storeListData.value.splice(rowIndex, 1)
  } catch (e) {
    console.log(e);
  } finally {
    storeDeleteLoading.value = false;
  }
}

/* 店铺列表数据导出 */
const storeExcelLoading = ref(false)
const hStoreListExcel = async () => {
  storeExcelLoading.value = true
  try {
    const resData = await storeListExcel({
      storeName: "全部店铺数据",
    });
    window.location.href = resData
  } catch (e) {
    console.log(e);
  } finally {
    storeExcelLoading.value = false;
  }
}


// 分页配置
const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 50 条', value: 50 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 500 条', value: 500 },
  { label: '每页 1000 条', value: 1000 },
];
// 店铺列表分页
const paginationStore = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1,
  pageSizeOptions,
});
/**
 * 分页变化函数
 * @param curr 分页参数
 * @param pageInfo 分页数据
 */
const rehandlePageChange = (curr: { current: number; pageSize: number }, pageInfo: any) => {
  // console.log(curr, pageInfo);

  // 分页重新赋值
  const { current, pageSize } = curr;
  paginationStore.value.defaultCurrent = current;
  paginationStore.value.defaultPageSize = pageSize;

  // 重新获取数据
  fetchDataStoreList();
};
</script>

<style lang="less" scoped>

</style>
