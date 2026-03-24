<template>
   <a-drawer
    v-model:open="outsourcePersonSalaryCommitDetailsFlag"
    title="工资详情"
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
    <a-table
      size="small"
      :pagination="false"
      :loading="false"
      :columns="columns"
      :dataSource="getOutsourcePersonSalaryCommitDetail"
    >
   <template #bodyCell="{ column, record }">
    <a-popover
      v-if="column.key === 'bankCard'"
      :content="record.bankCard"
      placement="top"
      trigger="click"
    >
    <a-tag style="cursor: pointer;" :title="record.bankCard">查看</a-tag>
    </a-popover>
    </template>
  </a-table>
  </div>
   </a-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonSalaryCommitDetailsFlag, getOutsourcePersonSalaryCommitDetail} = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.8));
const handleClose = () => {
  outsourcePersonSalaryCommitDetailsFlag.value = false;
};
const columns = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
   {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
   {
    title: '职位',
    dataIndex: 'positions',
    key: 'positions',
    width: 100,
    ellipsis: true,
  },
   {
    title: '发薪银行',
    dataIndex: 'bankGroup',
    key: 'bankGroup',
    width: 70,
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
    key: 'bankName',
    width: 70,
  },
  {
    title: '账户',
    dataIndex: 'bankCard',
    key: 'bankCard',
  },
    {
    title: '应发工资',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 70,
  },
    {
    title: '社保',
    dataIndex: 'monthShebao',
    key: 'monthShebao',
  },
    {
    title: '个税',
    dataIndex: 'monthGeshui',
    key: 'monthGeshui',
  },
    {
    title: '手续费',
    dataIndex: 'shouxuMoney',
    key: 'shouxuMoney',
    width: 70,
  },
    {
    title: '实发工资',
    dataIndex: 'salaryAfterTax',
    key: 'salaryAfterTax',
    width: 70,
  },
  {
    title: '服务费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 70,
  },
  {
    title: '总计',
    dataIndex: 'totalMoney',
    key: 'totalMoney',
  },
  {
    title: '状态',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
  },
];
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
