<template>
  <!-- 数据统计总和 -->
  <t-row :gutter="[16, 16]">
    <t-col v-for="(item, index) in paneList" :key="item.title" :xs="6" :xl="3">
      <t-card
        :title="item.title"
        :style="{ height: '168px' }"
        :class="{
          'dashboard-item': true,
          'dashboard-item--main-color': index == tabIndex,
        }"
        @click="tabClick(index)"
      >
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">{{
            item.number
          }}</span>
        </div>
      </t-card>
    </t-col>
  </t-row>

  <!--  -->
  <t-card class="list-card-container lp-mt-5">
    <!-- 列表头部 -->
    <t-row align="center" class="table-list-header lp-mb-[20px]" :gutter="16">
      <t-col :span="1"> 时间选择: </t-col>
      <!-- 搜索 -->
      <t-col class="search-input" :span="8">
        <t-date-range-picker
          v-model="rangeTime"
          :presets="presets"
          enable-time-picker
          @change="timeChange"
        />
      </t-col>
    </t-row>
    <!-- 列表内容 -->
    <t-table
      class="table-box"
      :data="tableData"
      bordered
      :columns="COLUMNS"
      row-key="id"
      :hover="true"
      max-height="calc(100% - 64px)"
      :scroll="{ type: 'lazy', bufferSize: 100 }"
      :pagination="pagination"
      :loading="tableLoading"
      @page-change="rehandlePageChange"
    >
    </t-table>
  </t-card>
</template>

<script lang="ts">
export default {
  name: 'DashboardBase',
};
</script>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, PropType, watch, onMounted } from 'vue';
import {
  dashboardBaseModel,
  storeTotalAmount,
  storeList,
  storeTotalUser,
  storeTotalOrder,
} from '@/api/dashboard';

import { PANE_LIST } from '../constants';

// 控制样式大小
const resizeTime = ref<number>(1);
// 按钮索引
const tabIndex = ref<number>(0);
// 按钮数据
const paneList = ref<any>(PANE_LIST);
const prop = defineProps({
  info: {
    type: Object as PropType<dashboardBaseModel>,
    required: true,
  },
});

// 监听数据传入变化
watch(
  () => prop.info,
  (data, prevData) => {
    paneList.value.forEach((item) => {
      item.number = convertToTenThousand(data[item.type]);
    });
  },
);

// 监听tab索引变化
watch(tabIndex, (data, prevData) => {
  switch (data) {
    case 0:
      COLUMNS.value = [
        {
          title: '店铺名称',
          colKey: 'storeName',
          width: 200,
          align: 'center',
        },
        {
          title: '销售金额(元)',
          ellipsis: true,
          colKey: 'storeTotalAmount',
          align: 'center',
          width: 200,
        },
      ];
      rangeTime.value = [
        dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ];
      break;
    case 1:
      COLUMNS.value = [
        {
          title: '店铺名称',
          colKey: 'storeName',
          width: 200,
          align: 'center',
        },
        {
          title: '入住时间',
          ellipsis: true,
          colKey: 'createTime',
          align: 'center',
          width: 200,
        },
      ];
      rangeTime.value = [
        dayjs().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ];
      break;
    case 2:
      COLUMNS.value = [
        {
          title: '店铺名称',
          colKey: 'storeName',
          width: 200,
          align: 'center',
        },
        {
          title: '用户数量(个)',
          ellipsis: true,
          colKey: 'userTotal',
          align: 'center',
          width: 200,
        },
      ];
      rangeTime.value = [
        dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ];
      break;
    case 3:
      COLUMNS.value = [
        {
          title: '店铺名称',
          colKey: 'storeName',
          width: 200,
          align: 'center',
        },
        {
          title: '订单数量(个)',
          ellipsis: true,
          colKey: 'orderTotal',
          align: 'center',
          width: 200,
        },
      ];
      rangeTime.value = [
        dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ];
      break;
    default:
      COLUMNS.value = [
        {
          title: '店铺名称',
          colKey: 'storeName',
          width: 200,
          align: 'center',
        },
        {
          title: '销售金额(元)',
          ellipsis: true,
          colKey: 'storeTotalAmount',
          align: 'center',
          width: 200,
        },
      ];
      rangeTime.value = [
        dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ];
  }
  tableData.value = [];
  initGetTableList();
});

// tab点击事件
const tabClick = (index) => {
  tabIndex.value = index;
};

// 金额转换
const convertToTenThousand = (
  totalNumber: number | string,
): string | number => {
  if (Number(totalNumber) > 10000) {
    return `${(Number(totalNumber) / 10000).toFixed(2)}万`;
  }
  return totalNumber;
};

/**
 * 表单
 */
const tableLoading = ref(false);
const tableData = ref<any>([
  { storeName: '牙小新店铺', storeTotalAmount: 100 },
]);
const COLUMNS = ref<any>([
  {
    title: '店铺名称',
    colKey: 'storeName',
    width: 200,
    align: 'center',
  },
  {
    title: '销售金额',
    ellipsis: true,
    colKey: 'storeTotalAmount',
    align: 'center',
    width: 200,
  },
]);

// 分页配置
const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 50 条', value: 50 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 500 条', value: 500 },
  { label: '每页 1000 条', value: 1000 },
];
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1,
  pageSizeOptions,
});

// 时间筛选
const presets = ref({
  最近7天: [
    dayjs().subtract(6, 'day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
  ],
  最近3天: [
    dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
  ],
  今天: [
    dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
  ],
});

const rangeTime = ref([
  dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
  dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
]);
const timeChange = () => {
  initGetTableList();
};

// 控制分页
const rehandlePageChange = (curr) => {
  const { current, pageSize } = curr;
  pagination.value.defaultCurrent = current;
  pagination.value.defaultPageSize = pageSize;

  getTableList();
};

// 获取表单数据
const getTableList = async () => {
  let res: any = null;
  tableLoading.value = true;
  const paramsM = {
    pageNum: pagination.value.defaultCurrent,
    pageSize: pagination.value.defaultPageSize,
    startTime: rangeTime.value[0],
    endTime: rangeTime.value[1],
  };
  if (tabIndex.value === 0) {
    res = await storeTotalAmount(paramsM);
  }

  if (tabIndex.value === 1) {
    res = await storeList(paramsM);
  }
  if (tabIndex.value === 2) {
    res = await storeTotalUser(paramsM);
  }
  if (tabIndex.value === 3) {
    res = await storeTotalOrder(paramsM);
  }

  pagination.value.total = res.total;
  tableData.value = res.list;
  tableLoading.value = false;
};

const initGetTableList = () => {
  pagination.value.defaultCurrent = 1;
  getTableList();
};

// 初始加载
onMounted(() => {
  initGetTableList();
});
</script>

<style lang="less" scoped>
.dashboard-item {
  padding: 8px;

  :deep(.t-card__footer) {
    padding-top: 0;
  }

  :deep(.t-card__title) {
    font-size: 14px;
    font-weight: 500;
  }

  :deep(.t-card__body) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    position: relative;
  }

  &:hover {
    cursor: pointer;
  }

  &-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    > span {
      display: inline-block;
      color: var(--td-text-color-primary);
      font-size: 36px;
      line-height: 44px;
    }
  }

  &-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > .t-icon {
      cursor: pointer;
    }
  }

  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 22px;
    color: var(--td-text-color-placeholder);
  }

  &-trend {
    margin-left: 8px;
  }

  &-left {
    position: absolute;
    top: 0;
    right: 32px;

    > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: var(--td-brand-color-1);
      border-radius: 50%;

      .t-icon {
        font-size: 24px;
        color: var(--td-brand-color);
      }
    }
  }

  // 针对第一个卡片需要反色处理
  &--main-color {
    background: var(--td-brand-color);
    color: var(--td-text-color-primary);

    :deep(.t-card__title),
    .dashboard-item-top span,
    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }

    .dashboard-item-block {
      color: var(--td-text-color-anti);
      opacity: 0.6;
    }

    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }
  }
}
</style>
