<template>
  <t-row :gutter="[16, 16]">
    <t-col v-for="(item, index) in PANE_LIST" :key="item.title" :xs="6" :xl="3">
      <t-card
        :title="item.title"
        :style="{ height: '168px' }"
        :class="{
          'dashboard-item': true,
          'dashboard-item--main-color': index == 0,
        }"
      >
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">{{
            convertToTenThousand(item.number)
          }}</span>
        </div>
      </t-card>
    </t-col>
  </t-row>
</template>

<script lang="ts">
export default {
  name: 'DashboardBase',
};
</script>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue';

import { dashboardBaseModel } from '@/api/dashboard';

import { PANE_LIST } from '../constants';

// 控制样式大小
const resizeTime = ref(1);

const prop = defineProps({
  info: {
    type: Object as PropType<dashboardBaseModel>,
    required: true,
  },
});

watch(
  () => prop.info,
  (count, prevCount) => {
    PANE_LIST.forEach((item) => {
      item.number = count[item.type];
    });
  },
);

const convertToTenThousand = (
  totalNumber: number | string,
): string | number => {
  if (Number(totalNumber) > 10000) {
    return (Number(totalNumber) / 10000).toFixed(2) + ' 万';
  }
  return totalNumber;
};
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
