<template>
  <div class="detail-base">
    <t-card title="门诊基本信息">
      <div class="info-block">
        <div class="info-item">
          <h1>门诊名称:</h1>
          <span>
            {{ dataObj.name }}
          </span>
        </div>

        <div class="info-item">
          <h1>门诊logo:</h1>
          <span>
            <t-avatar :image="dataObj.icon" alt="无" size="large" />
          </span>
        </div>

        <div class="info-item">
          <h1>创建时间:</h1>
          <span>
            {{ dayjs(dataObj.createDt).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </div>

        <div class="info-item">
          <h1>到期时间:</h1>
          <div>
            <t-space align="center">
              <span v-if="!expirationTime">{{ dayjs(dataObj.expireDt).format('YYYY-MM-DD HH:mm:ss') }}</span>
              <t-date-picker
                v-if="expirationTime"
                v-model="dataObj.expireDt"
                style="width: 180px"
                size="small"
                placeholder="选择时间"
                allow-input
                enable-time-picker
              />
              <t-button
                shape="round"
                size="small"
                :variant="expirationTime ? 'base' : 'dashed'"
                theme="primary"
                @click="!expirationTime ? (expirationTime = !expirationTime) : setExpirationTime()"
                >设置到期时间</t-button
              >
            </t-space>
          </div>
        </div>

        <div class="info-item">
          <h1>负责人:</h1>
          <span>
            {{ dataObj.contactName }}
          </span>
        </div>

        <div class="info-item">
          <h1>联系电话:</h1>
          <span>
            {{ dataObj.mobile }}
          </span>
        </div>

        <div class="info-item">
          <h1>门诊地址:</h1>
          <span>
            <t-tooltip :content="`${dataObj.address}${dataObj.addressDetail}`">
              {{ `${dataObj.address}${dataObj.addressDetail}` }}
            </t-tooltip>
          </span>
        </div>

        <div class="info-item">
          <h1>品牌分账:</h1>
          <span>
            <t-switch
              :value="dataObj.isbrand || 0"
              size="large"
              :custom-value="[1, 0]"
              :label="['开', '关']"
              @change="switchIsbrand"
            ></t-switch>
          </span>
        </div>

        <div class="info-item">
          <h1>小程序短链接:</h1>
          <div>
            <t-space align="center">
              <t-button shape="round" size="small" variant="base" theme="primary" @click="getWxGenerateUrlLink"
                >获取</t-button
              >
              <span>{{ generateUrlLink.url_link || '' }}</span>
            </t-space>
          </div>
        </div>
      </div>
    </t-card>

    <div style="height: 26px"></div>
    <t-row :gutter="16">
      <t-col :sm="6" :xs="12">
        <t-card title="小程序和支付配置" style="max-height: 510px; overflow-y: auto">
          <t-form
            :label-width="120"
            label-align="left"
            colon
            :rules="RULES"
            :data="formData"
            status-icon
            @submit="onSubmit"
          >
            <t-form-item label="微信商户编号" name="merchantId">
              <t-input v-model="formData.merchantId" placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="移领商户编号" name="merchantNum">
              <t-input v-model="formData.merchantNum" placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="支付秘钥" name="payKey">
              <t-input v-model="formData.payKey" placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="小程序appid" name="appid">
              <t-input v-model="formData.appid" placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="小程序秘钥" name="secret">
              <t-input v-model="formData.secret" placeholder="请输入内容" />
            </t-form-item>
            <t-form-item>
              <t-button theme="primary" type="submit">提交</t-button>
            </t-form-item>
          </t-form>
        </t-card>
      </t-col>
      <t-col :sm="6" :xs="12">
        <t-card title="员工列表" class="myCard" style="max-height: 510px; overflow-y: auto">
          <template #actions>
            <t-row :gutter="16">
              <t-col :span="4" :offset="3">
                <t-select
                  v-if="powerAdd == 'add'"
                  v-model="userId"
                  size="small"
                  filterable
                  :options="userListoptions"
                  placeholder="选择用户"
                  :loading="userLoading"
                  :on-search="fetchDataUserList"
                >
                </t-select>
              </t-col>
              <t-col :span="3">
                <t-select
                  v-if="powerAdd == 'add'"
                  v-model="powerId"
                  :options="powerName"
                  size="small"
                  placeholder="选择权限"
                />
              </t-col>
              <t-col :span="2" style="text-align: right">
                <a v-if="powerAdd == 'add'" href="javascript:void(0)" @click="powerSaveFun(userId, powerId)">保存</a>
                <a v-if="powerAdd != 'add'" href="javascript:void(0)" @click="powerAddtFun">添加</a>
              </t-col>
            </t-row>
          </template>
          <t-list :split="true" size="small">
            <template v-for="(item, index) in dataObj.userList" :key="index">
              <t-list-item v-if="item">
                <t-list-item-meta :image="item.avatar" :title="item.nickname">
                  <template #description>
                    <t-tag v-if="powerEdit != index" theme="primary">{{ powerName[item.userPower.power].label }}</t-tag>
                    <t-select
                      v-if="powerEdit == index"
                      v-model="item.userPower.power"
                      :options="powerName"
                      size="small"
                      placeholder="选择权限"
                    />
                  </template>
                </t-list-item-meta>
                <template #action>
                  <t-button v-if="powerEdit != index" variant="text" shape="square" @click="powerEdit = index">
                    <edit1-icon style="color: var(--td-brand-color)" />
                  </t-button>
                  <t-button
                    v-if="powerEdit != index"
                    variant="text"
                    shape="square"
                    @click="powerDeFun(item.userPower.id)"
                  >
                    <delete-icon style="color: var(--td-error-color)" />
                  </t-button>
                  <t-button
                    v-if="powerEdit == index"
                    variant="text"
                    shape="square"
                    @click="powerSaveFun(item.id, item.userPower.power)"
                  >
                    <check-circle-icon style="color: var(--td-success-color)" />
                  </t-button>
                </template>
              </t-list-item>
            </template>
          </t-list>
        </t-card>
      </t-col>
    </t-row>

    <div style="height: 26px"></div>
    <t-row :gutter="16">
      <t-col :sm="6" :xs="12">
        <t-card title="活动列表" style="max-height: 510px; overflow-y: auto">
          <t-list :split="true" size="small">
            <template v-for="(item, index) in dataObj.enrollFormList" :key="index">
              <t-list-item v-if="item">
                <t-list-item-meta :image="item.mainPic" :title="item.title">
                  <template #description>
                    <div class="des_content">
                      {{ item.content }}
                    </div>
                  </template>
                </t-list-item-meta>
              </t-list-item>
            </template>
          </t-list>
        </t-card>
      </t-col>
      <t-col :sm="6" :xs="12" style="max-height: 510px; overflow-y: auto">
        <t-card title="商品列表">
          <t-list :split="true" size="small">
            <template v-for="(item, index) in dataObj.storeProductList" :key="index">
              <t-list-item v-if="item">
                <t-list-item-meta :image="item.pics || item.pics.split(',')[0]" :title="item.title">
                  <template #description>
                    <div class="des_content">
                      {{ item.descData }}
                    </div>
                  </template>
                </t-list-item-meta>
              </t-list-item>
            </template>
          </t-list>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StoreListInput',
};
</script>
<script setup lang="ts">
import { MessagePlugin, NotifyPlugin } from 'tdesign-vue-next';
import { DeleteIcon, Edit1Icon, CheckCircleIcon } from 'tdesign-icons-vue-next';
import { ref, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import {
  getStoreInfo,
  storeSetAsIsBrand,
  storeSetAsPower,
  storeDeleteUser,
  storeWxAccount,
  storeChangeStore,
  wxGenerateUrlLink,
} from '@/api/storeList';
import { getUserList } from '@/api/userList';
import { INITIAL_DATA, RULES } from './constants';

const route = useRoute();

// keep-alive 每次进入缓存组件加载
onActivated(() => {
  fetchData();
  generateUrlLink.value = {};
});
/**
 * 获取店铺详情
 */
const loading = ref(false);
const dataObj = ref<any>({});
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getStoreInfo({
      storeId: route.query.storeId as string,
    });

    // 数据赋值
    dataObj.value = res;
    formData.value = res.storeWxAccount as any;
  } catch (e) {
    console.log(e);
    MessagePlugin.error(e.message);
  } finally {
    loading.value = false;
  }
};

/**
 * 设置门店到期时间
 */
const expirationTime = ref(false);
const setExpirationTime = async () => {
  try {
    await storeChangeStore({
      storeId: route.query.storeId as string,
      expire_dt: dataObj.value.expireDt,
    });
    expirationTime.value = false;
    NotifyPlugin.success({ title: '成功', content: '修改到期时间' });
  } catch (error) {
    console.log(error);
    NotifyPlugin.error({ title: '失败', content: '修改到期时间' });
  }
};
/**
 * 修改分账方式
 * @param value
 */
const switchIsbrand = async (value: any) => {
  try {
    await storeSetAsIsBrand({
      storeId: route.query.storeId,
      isbrand: value,
    });
    dataObj.value.isbrand = value;
    NotifyPlugin.success({ title: '成功', content: '分账方式，修改成功' });
  } catch (e) {
    console.log(e);
    NotifyPlugin.error({ title: '失败', content: '分账方式，修改失败' });
  } finally {
    loading.value = false;
  }
};
/**
 * 获取小程序链接
 *
 */
const generateUrlLink = ref<any>({});
const getWxGenerateUrlLink = () => {
  wxGenerateUrlLink({
    path: '/pages/main/index/index',
    query: `storeId=${route.query.storeId}`,
    storeId: route.query.storeId,
  }).then((res) => {
    generateUrlLink.value = JSON.parse(decodeURIComponent(res));
  });
};
/**
 * 员工列表
 */
const powerName = [
  { label: '无权限', value: 0 },
  { label: '创建者', value: 1 },
  { label: '管理员', value: 2 },
  { label: '商品管理', value: 3 },
  { label: '活动管理', value: 4 },
];
const powerEdit = ref(-1);
const powerAdd = ref('');
// 切换添加员工状态
const powerAddtFun = () => {
  powerAdd.value = 'add';
  // 获取用户列表
  fetchDataUserList('');
};
// 获取用户列表
const userListoptions = ref([]);
const userLoading = ref(false);
const fetchDataUserList = async (searchValue: string) => {
  if (typeof searchValue !== 'string') {
    searchValue = '';
  }
  userLoading.value = true;
  try {
    const { userlist } = await getUserList({
      searchValue,
      pageNum: 1,
      pageSize: 100,
      storeId: route.query.storeId as string,
    });

    // 数据赋值
    userListoptions.value = userlist.map((item: any) => ({ label: item.nickname, value: item.id }));
  } catch (e) {
    console.log(e);
  } finally {
    userLoading.value = false;
  }
};

// 添加/修改添加用户权限
const userId = ref(0);
const powerId = ref(0);

const powerSaveFun = async (pUserId: any, pPowerId: any) => {
  if (!pUserId) {
    MessagePlugin.error('请选择用户');
    return;
  }

  try {
    await storeSetAsPower({
      power: pPowerId,
      storeId: route.query.storeId,
      userId: pUserId,
    });
    // 重新加载门诊数据
    fetchData();
    NotifyPlugin.success({ title: '成功', content: '权限添加/修改成功' });
  } catch (e) {
    console.log(e);
    NotifyPlugin.error({ title: '失败', content: '权限添加/修改失败' });
  } finally {
    powerAdd.value = '';
    powerEdit.value = -1;
  }
};
// 删除员工
const powerDeFun = async (id: number) => {
  try {
    await storeDeleteUser({
      userPowerId: id,
    });
    NotifyPlugin.success({ title: '删除成功', content: '员工移除成功' });
    fetchData();
  } catch (e) {
    console.log(e);
    NotifyPlugin.error({ title: '失败', content: '删除失败' });
  }
};

/**
 * 支付，小程序配置
 */

const formData = ref({ ...INITIAL_DATA });
const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    try {
      await storeWxAccount({
        ...formData.value,
      });
    } catch (error) {
      console.log(error);
    }
    NotifyPlugin.success({ title: '成功', content: '修改成功' });
  } else {
    NotifyPlugin.warning({ title: '失败', content: '表单校验失败' });
  }
};
</script>

<style lang="less" scoped>
@import url('./index.less');
:deep(.myCard) {
  .t-card__header-wrapper {
    flex: none;
  }
  .t-card__actions {
    flex: auto;
  }
}
.des_content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: var(--td-gray-color-6);
}
:deep(.t-space-item) {
  line-height: 1;
}
</style>
