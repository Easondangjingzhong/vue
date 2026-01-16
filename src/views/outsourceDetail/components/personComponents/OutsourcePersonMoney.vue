<template>
   <a-drawer
    v-model:open="outsourcePersonMoneyFlag"
    title="请款单"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
   <template #extra>
        <CloseOutlined @click="handleClose" />
      </template>
  <div class="resume_container">
    <a-layout>
        <a-layout-content class="resume_content">
           <a-tabs v-model:activeKey="outsourceDetailMoneySider" type="card">
              <a-tab-pane key="1" tab="请款单">
                 <OutsourcePersonMoneyQing/>
              </a-tab-pane>
              <a-tab-pane key="2" tab="工资单">
                <OutsourcePersonMoneySalary/>
              </a-tab-pane>
              <a-tab-pane key="3" tab="社保">
                <OutsourcePersonMoneySheBao/>
              </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
  </div>
   </a-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import OutsourcePersonMoneyQing from './OutsourcePersonMoneyQing.vue';
import OutsourcePersonMoneySheBao from './OutsourcePersonMoneySheBao.vue';
import OutsourcePersonMoneySalary from './OutsourcePersonMoneySalary.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonMoneyFlag,} = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.9));
const outsourceDetailMoneySider = ref('1');
const handleClose = () => {
    outsourcePersonMoneyFlag.value = false;
  };
</script>

<style lang="less" scoped>
  :deep(.ant-descriptions .ant-descriptions-header) {
    margin-bottom: 10px;
  } 
  :deep(.ant-descriptions .ant-descriptions-item-label) {
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    font-weight: bold;
  }
  
  :deep(.ant-descriptions .ant-descriptions-item-content) {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
