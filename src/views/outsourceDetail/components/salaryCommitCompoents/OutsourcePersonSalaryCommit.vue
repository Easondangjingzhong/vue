<template>
   <a-drawer
    v-model:open="outsourcePersonSalaryCommitFlag"
    title="工资发放"
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
              <a-tab-pane key="1" tab="考勤">
                 
              </a-tab-pane>
              <a-tab-pane key="2" tab="账单">
                
              </a-tab-pane>
              <a-tab-pane key="3" tab="社保">
                <OutsourcePersonSalarySheBao />
              </a-tab-pane>
              <a-tab-pane key="4" tab="发薪">
                 <OutsourcePersonSalaryCollect />
              </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
  </div>
   </a-drawer>
   <OutsourcePersonSalaryCollectDetails />
   <FileYuLanInfo />
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import FileYuLanInfo from '/@/views/outsourceDetail/components/personComponents/FileYuLanInfo.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import OutsourcePersonSalaryCollect from './OutsourcePersonSalaryCollect.vue';
import OutsourcePersonSalarySheBao from './OutsourcePersonSalarySheBao.vue';
import OutsourcePersonSalaryCollectDetails from './OutsourcePersonSalaryCollectDetails.vue';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonSalaryCommitFlag, formStateMonthSalary} = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.9));
const outsourceDetailMoneySider = ref('4');
const handleClose = () => {
  outsourcePersonSalaryCommitFlag.value = false;
};
watch(outsourcePersonSalaryCommitFlag, () => {
  if (outsourcePersonSalaryCommitFlag.value) {
    outsourceDetailStore.queryOutsourceSalaryCommit(formStateMonthSalary.value.yearAndMonth);
  }
});
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
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
</style>
