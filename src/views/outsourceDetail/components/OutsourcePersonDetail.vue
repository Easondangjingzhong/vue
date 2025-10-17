<template>
 <a-drawer
    v-model:open="outsourcePersonDetailFlag"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #title>
      <a-row :gutter="24" style="font-weight: 700;">
        <a-col :span="4">
         中英姓名：{{ getDisplayName() }}
        </a-col>
        <a-col :span="2">
         城市: {{ outsourcePersonDetail.city }}
        </a-col>
        <a-col :span="3" class="brand-col">
         品牌: {{ outsourcePersonDetail.brand }}
        </a-col>
        <a-col :span="4">
         <a-tag color="orange" v-if="outsourcePersonDetail.currentStatus == '1'">待入</a-tag>
         <a-tag color="green" v-if="outsourcePersonDetail.currentStatus == '2'">在职</a-tag>
         <a-tag color="red" v-if="outsourcePersonDetail.currentStatus == '3'">离职</a-tag>
         <a-tag color="red" v-if="outsourcePersonDetail.currentStatus == '5'">未入</a-tag>
        </a-col>
      </a-row>
    </template>
    <template #extra>
      <CloseOutlined @click="outsourcePersonDetailFlag = false" />
    </template>
    <div>
      <a-steps v-model:current="current" size="small" :items="items" />
      <a-row :gutter="24">
        <a-col :span="24">
          <a-tabs v-model:activeKey="activeKey" size="small">
          <a-tab-pane tab="综合信息" key="1">
            <ComprehensiveInformation />
          </a-tab-pane>
          <a-tab-pane tab="月度薪资" key="2">
            月度薪资
          </a-tab-pane>
          <a-tab-pane tab="月度社保" key="3">
            月度社保
          </a-tab-pane>
           <a-tab-pane tab="月度考勤" key="4">
            月度考勤
          </a-tab-pane>
           <a-tab-pane tab="月度账单" key="5">
            月度账单
          </a-tab-pane>
        </a-tabs>
        </a-col>
      </a-row>
    </div>
  </a-drawer>
  <ComprehensiveContractInfoUpdate />
  <ComprehensiveBasicUpdate />
  <ComprehensiveSocialSecurityInfoUpdate />
  <ComprehensiveSalaryInfoUpdate />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import ComprehensiveBasicUpdate from './personComponents/ComprehensiveBasicUpdate.vue'
import ComprehensiveInformation from './personComponents/ComprehensiveInformation.vue'
import ComprehensiveContractInfoUpdate from './personComponents/ComprehensiveContractInfoUpdate.vue'
import ComprehensiveSalaryInfoUpdate from './personComponents/ComprehensiveSalaryInfoUpdate.vue'
import ComprehensiveSocialSecurityInfoUpdate from './personComponents/ComprehensiveSocialSecurityInfoUpdate.vue'
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonDetailFlag, outsourcePersonDetail } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.8));
const activeKey = ref('1');
const getDisplayName = () => {
  const { userNameCn, userNameEn } = outsourcePersonDetail.value;
  if (userNameCn && userNameEn) {
    return `${userNameCn} / ${userNameEn}`;
  } else if (userNameCn) {
    return userNameCn;
  } else if (userNameEn) {
    return userNameEn;
  } else {
    return '未填写';
  }
};
const current = ref<number>(0);
const items = ref([
  {
    title: '基本信息',
  },
  {
    title: 'OFFER信息',
  },
  {
    title: '合同信息',
  },
  {
    title: '薪资信息',
  },
  {
    title: '社保信息',
  },
]);
</script>

<style lang="less" scoped>
.brand-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>