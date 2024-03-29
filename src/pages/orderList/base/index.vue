<template>
  <t-card class="list-card-container">
    <!-- 列表头部 -->
    <t-row align="center" class="table-list-header lp-mb-[20px]" :gutter="16">
      <!-- 搜索 -->
      <t-col class="search-input" :span="2">
        <t-input
          v-model="searchValue"
          placeholder="输入用户名或手机号搜索"
          clearable
          @enter="
            pagination.defaultCurrent = 1;
            fetchData();
          "
        >
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
      <!-- 订单来源 -->
      <t-col class="select-box" :span="2">
        <t-select
          v-model="enrollId"
          placeholder="全部订单"
          :options="[
            { label: '全部订单', value: null },
            { label: '商品订单', value: 0 },
            { label: '活动订单', value: 1 },
          ]"
          :on-change="fetchDataEnrollIdChange"
        >
        </t-select>
      </t-col>

      <!-- 分账状态 -->
      <t-col class="select-box" :span="2">
        <t-select
          v-model="isDeal"
          placeholder="分账状态"
          :options="[
            { label: '全部分账状态', value: null },
            { label: '分账失败', value: -1 },
            { label: '无需分账', value: 0 },
            { label: '分账成功', value: 1 },
            { label: '手动分账成功', value: 2 },
            { label: '后台点击分账成功', value: 3 },
          ]"
          :on-change="fetchDataisDealChange"
        >
        </t-select>
      </t-col>

      <!-- 订单状态 -->
      <t-col class="select-box" :span="2">
        <t-select
          v-model="status"
          placeholder="订单状态"
          :options="[
            { label: '全部订单状态', value: null },
            { label: '待付款', value: 1 },
            { label: '待使用', value: 2 },
            { label: '已完成', value: 3 },
          ]"
          :on-change="fetchDataStatusChange"
        >
        </t-select>
      </t-col>

      <!-- 数据导出 -->
      <t-col class="export-btn" :span="2">
        <t-button
          variant="base"
          theme="primary"
          :disabled="!storeId"
          :loading="exportLoading"
          @click="exportData"
        >
          导出订单列表
        </t-button>
      </t-col>
    </t-row>
    <t-loading :loading="loading">
      <!-- 列表内容 -->
      <t-table
        class="table-box"
        :data="data"
        bordered
        :columns="COLUMNS"
        row-key="id"
        :hover="true"
        max-height="calc(100% - 64px)"
        :scroll="{ type: 'lazy', bufferSize: 100 }"
        :pagination="pagination"
        :loading="dataLoading"
        @page-change="rehandlePageChange"
      >
        <template #op="{ row }">
          <t-link
            theme="primary"
            v-if="row.out_order_no"
            @click.prevent="DivideAccountsFQM(row)"
            >查询分账结果</t-link
          >
          <t-link
            v-if="
              !row.out_order_no &&
              row.isdeal != 0 &&
              row.pay_dt &&
              row.status != 1
            "
            theme="danger"
            @click.prevent="DivideAccountsOrdersM(row)"
            >开始分账</t-link
          >
        </template>

        <template #status="{ row }">
          <t-tag
            :theme="
              row.status === '待使用'
                ? 'primary'
                : row.status === '已完成'
                ? 'success'
                : row.status === '待付款'
                ? 'danger'
                : ''
            "
            variant="light-outline"
            >{{ row.status }}
            <template #icon>
              <t-icon
                :name="
                  row.status === '待使用'
                    ? 'help-circle-filled'
                    : row.status === '已完成'
                    ? 'check-circle-filled'
                    : row.status === '待付款'
                    ? 'error-circle-filled'
                    : ''
                "
              />
            </template>
          </t-tag>
        </template>

        <template #isdeal="{ row }">
          <t-tag
            :theme="
              row.isdeal == '-1'
                ? 'danger'
                : row.isdeal == '0'
                ? 'default'
                : row.isdeal == '1'
                ? 'success'
                : row.isdeal == '2'
                ? 'primary'
                : row.isdeal == '3'
                ? 'primary'
                : ''
            "
            variant="light-outline"
          >
            {{
              row.isdeal == '-1'
                ? '分账失败'
                : row.isdeal == '0'
                ? '不需要分账'
                : row.isdeal == '1'
                ? '分账成功'
                : row.isdeal == '2'
                ? '手动分账成功'
                : row.isdeal == '3'
                ? '点击后台分账成功'
                : ''
            }}
          </t-tag>
        </template>
      </t-table>
    </t-loading>
  </t-card>
</template>

<script lang="ts">
export default {
  name: 'OrderListBase',
};
</script>

<script setup lang="ts">
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
// import { useRouter } from 'vue-router';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { ref, onMounted } from 'vue';
import { getStoreList } from '@/api/storeList';
import {
  BaseList,
  ExportData,
  DivideAccountsFQ,
  DivideAccountsOrders,
} from '@/api/orderList';
import { COLUMNS } from './constants';

// const router = useRouter();
const loading = ref(false);
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
const storeId = ref(null);
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
 * 获取店铺列表数据
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
    storeListData.value = records.map((item) => ({
      label: item.name,
      value: item.storeId,
    }));

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
 * 通过店铺筛选
 * @param value 选择的店铺ID
 */
const fetchDataStoreChange = (value: any) => {
  storeId.value = value;
  pagination.value.defaultCurrent = 1;
  fetchData();
};

/**
 * 切换商品订单或者活动订单筛选
 */
const enrollId = ref(null);
const fetchDataEnrollIdChange = (value: number) => {
  enrollId.value = value;
  pagination.value.defaultCurrent = 1;
  fetchData();
};

/**
 * 切换订单状态
 */
const status = ref(null);
const fetchDataStatusChange = (value: number) => {
  status.value = value;
  pagination.value.defaultCurrent = 1;
  fetchData();
};

/**
 * 切换分账状态
 */
const isDeal = ref(null);
const fetchDataisDealChange = (value: number) => {
  pagination.value.defaultCurrent = 1;
  fetchData();
};

/**
 * 获取订单列表数据
 */
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { userlist, count } = await BaseList({
      isDeal: isDeal.value,
      status: status.value,
      enrollId: enrollId.value,
      searchValue: searchValue.value,
      startTime: '',
      endTime: '',
      pageNum: pagination.value.defaultCurrent,
      pageSize: pagination.value.defaultPageSize,
      storeId: storeId.value,
    });

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
 *  订单数据导出
 */
const exportLoading = ref<boolean>(false);
const exportData = () => {
  exportLoading.value = true;
  ExportData({ storeId: storeId.value }).then((res) => {
    exportLoading.value = false;
    window.location.href = res.replace('http://', 'https://');
  });
};

/**
 * 分页变化函数
 * @param curr 分页参数
 * @param pageInfo 分页数据
 */
const rehandlePageChange = (
  curr: { current: number; pageSize: number },
  pageInfo: any,
) => {
  // console.log(curr, pageInfo);

  // 分页重新赋值
  const { current, pageSize } = curr;
  pagination.value.defaultCurrent = current;
  pagination.value.defaultPageSize = pageSize;

  // 重新获取数据
  fetchData();
};

/**
 * 查询分账结果
 */
const DivideAccountsFQM = async (item: any) => {
  if (!item.store_id || !item.out_order_no) {
    MessagePlugin.error({
      content: '这个订单不支持查询',
    });
    return;
  }

  loading.value = true;
  const res = await DivideAccountsFQ({
    storeId: item.store_id,
    outOrderNo: item.out_order_no,
  });

  if (res.receivers) {
    res.receivers = JSON.parse(res.receivers);
  }
  DialogPlugin.alert({
    header: '查询分账详情',
    body: JSON.stringify(res),
  });

  loading.value = false;
};

/**
 * 开始分账
 */

const DivideAccountsOrdersM = async (item: any) => {
  loading.value = true;
  const res = await DivideAccountsOrders({
    storeId: item.store_id,
    traceNum: item.order_num,
  });

  if (res.receivers) {
    res.receivers = JSON.parse(res.receivers);
  }
  DialogPlugin.alert({
    header: '查询分账详情',
    body: JSON.stringify(res),
  });

  loading.value = false;
};
</script>

<style lang="less" scoped></style>
