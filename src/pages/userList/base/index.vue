<template>
  <t-card class="list-card-container">
    <!-- 列表头部 -->
    <t-row align="center" class="table-list-header lp-mb-[20px]" :gutter="16">
      <!-- 搜索 -->
      <t-col class="search-input" :span="2">
        <t-input v-model="searchValue" placeholder="输入用户名或手机号搜索" clearable @enter="fetchData">
          <template #suffix-icon>
            <search-icon size="20px" />
          </template>
        </t-input>
      </t-col>
      <!-- 店铺下拉选择 -->
      <t-col class="select-box" :span="2">
        <t-select
          clearable
          placeholder="选择店铺"
          filterable
          :loading="storeListLoading"
          :options="storeListData"
          :on-search="fetchDataStoreList"
          :on-change="fetchDataStoreChange"
        >
        </t-select>
      </t-col>
      <!-- 数据导出 -->
      <t-col class="export-btn" :span="2">
        <t-button variant="base" theme="primary" :disabled="!storeId" :loading="exportLoading" @click="userEx">
          导出用户列表
        </t-button>
      </t-col>
    </t-row>

    <!-- 列表内容 -->
    <t-table
      class="table-box"
      :data="data"
      :columns="COLUMNS"
      row-key="id"
      :hover="true"
      max-height="calc(100% - 64px)"
      :scroll="{ type: 'lazy', bufferSize: 100 }"
      :pagination="pagination"
      :loading="dataLoading"
      :header-affixed-top="true"
      @page-change="rehandlePageChange"
    >
      <template #avatar="{ row }">
        <t-avatar :image="row.avatar" alt="无" size="large" />
      </template>
    </t-table>
  </t-card>
</template>

<script lang="ts">
export default {
  name: 'UserListBase',
};
</script>

<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import { ref, onMounted } from 'vue';
import { getUserList, UserEx } from '@/api/userList';
import { getStoreList } from '@/api/storeList';
import { COLUMNS } from './constants';

// 分页配置
const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 50 条', value: 50 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 500 条', value: 500 },
  { label: '每页 1000 条', value: 1000 },
];
// 分页
const pagination = ref({
  defaultPageSize: 30,
  total: 0,
  defaultCurrent: 1,
  pageSizeOptions,
});
// 数据列表
const data = ref([]);
// 搜索参数
const searchValue = ref('');
// 根据店铺查询
const storeId = ref(0);
// 加载中
const dataLoading = ref(false);

// 店铺列表加载
const storeListLoading = ref(false);
// 店铺列表数据
const storeListData = ref([]);
// 店铺列表分页
const paginationStore = ref({
  defaultPageSize: 2000,
  total: 0,
  defaultCurrent: 1,
});

/**
 * 获取店铺列表函数
 * @param searchStoreName 店铺名称
 */
const fetchDataStoreList = async (searchStoreName: string) => {
  storeListLoading.value = true;
  try {
    const { records, total } = await getStoreList({
      searchStoreName,
      pageNum: paginationStore.value.defaultCurrent,
      pageSize: paginationStore.value.defaultPageSize,
    });

    // 数据赋值
    storeListData.value = records.map((item) => ({ label: item.name, value: item.storeId }));

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
/**
 * 更换店铺筛选
 * @param value 选择的店铺ID
 */
const fetchDataStoreChange = (value: any) => {
  storeId.value = value || 0;
  pagination.value.defaultCurrent = 1;
  fetchData();
};

/**
 * 获取数据函数
 */
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { userlist, count } = await getUserList({
      searchValue: searchValue.value,
      pageNum: pagination.value.defaultCurrent,
      pageSize: pagination.value.defaultPageSize,
      storeId: storeId.value,
    });
    // console.log('userlist', userlist);

    // 数据赋值
    data.value = userlist;

    // 分页赋值
    pagination.value = {
      ...pagination.value,
      total: count,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
  fetchDataStoreList('');
});

/**
 *  用户数据导出
 */
const exportLoading = ref<boolean>(false);
const userEx = () => {
  exportLoading.value = true;
  UserEx({ storeId: storeId.value }).then((res) => {
    exportLoading.value = false;
    window.location.href = res.replace('http', 'https');
  });
};

/**
 * 分页变化函数
 * @param curr 分页参数
 * @param pageInfo 分页数据
 */
const rehandlePageChange = (curr: { current: number; pageSize: number }, pageInfo: any) => {
  // console.log(curr, pageInfo);

  // 分页重新赋值
  const { current, pageSize } = curr;
  pagination.value.defaultCurrent = current;
  pagination.value.defaultPageSize = pageSize;

  // 重新获取数据
  fetchData();
};
</script>

<style lang="less" scoped></style>
