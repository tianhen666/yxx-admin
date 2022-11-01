<template>
  <div>
    <t-card class="list-card-container">
      <!-- 列表头部 -->
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button variant="base" theme="default" :disabled="!selectedRowKeys.length"> 导出用户 </t-button>
          <p v-if="!!selectedRowKeys.length" class="selected-count">已选{{ selectedRowKeys.length }}项</p>
        </div>
        <div class="search-input">
          <t-input v-model="searchValue" placeholder="请输入你需要搜索的内容" clearable>
            <template #suffix-icon>
              <search-icon size="20px" />
            </template>
          </t-input>
        </div>
      </t-row>

      <div class="table_box">
        <!-- 列表内容 -->
        <t-table
          :data="data"
          :columns="COLUMNS"
          :row-key="rowKey"
          :hover="true"
          table-layout="auto"
          max-height="30%"
          :scroll="{ type: 'lazy', bufferSize: 10 }"
          :pagination="pagination"
          :selected-row-keys="selectedRowKeys"
          :loading="dataLoading"
          :header-affixed-top="{ offsetTop, container: getContainer }"
          @page-change="rehandlePageChange"
          @change="rehandleChange"
          @select-change="rehandleSelectChange"
        >
        </t-table>
      </div>
    </t-card>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前所选合同？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserListBase',
};
</script>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { getUserList } from '@/api/userList';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';

import { COLUMNS } from './constants';

// 主题配置
const store = useSettingStore();

// 数据列表
const data = ref([]);

// 分页
const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});

// 搜索参数
const searchValue = ref('');
// 根据店铺查询
const storeId = ref(0);

// 加载中
const dataLoading = ref(false);

// 获取数据列表
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

    data.value = userlist;

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

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    const { name } = data.value[deleteIdx.value];
    return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
  }
  return '';
});

onMounted(() => {
  fetchData();
});

const confirmVisible = ref(false);

const selectedRowKeys = ref([1, 2]);

const router = useRouter();

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  // 真实业务请发起请求
  data.value.splice(deleteIdx.value, 1);
  pagination.value.total = data.value.length;
  const selectedIdx = selectedRowKeys.value.indexOf(deleteIdx.value);
  if (selectedIdx > -1) {
    selectedRowKeys.value.splice(selectedIdx, 1);
  }
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
};

const onCancel = () => {
  resetIdx();
};

const rowKey = 'index';

const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val;
};
const rehandlePageChange = (curr, pageInfo) => {
  console.log('分页变化', curr, pageInfo);
};
const rehandleChange = (changeParams, triggerAndData) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const offsetTop = computed(() => {
  return store.isUseTabsRouter ? 48 : 0;
});

const getContainer = () => {
  return document.querySelector(`.${prefix}-layout`);
};
</script>

<style lang="less" scoped>
.left-operation-container {
  padding: 6px 0;
  margin-bottom: 16px;

  .selected-count {
    display: inline-block;
    margin-left: 8px;
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 360px;
}
</style>
