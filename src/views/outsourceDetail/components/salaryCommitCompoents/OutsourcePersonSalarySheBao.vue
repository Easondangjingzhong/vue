<template>
  <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="false"
      :columns="columns"
      :dataSource="[]"
    >
   <!-- <template #bodyCell="{ column, record }">
    </template> -->
  </a-table>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonSalaryCommitDetailsFlag, } = storeToRefs(outsourceDetailStore);
const columns = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '社保周期',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
  },
   {
    title: '姓名',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
  },
   {
    title: '公司',
    dataIndex: 'yijinCompany',
    key: 'yijinCompany',
  },
   {
    title: '城市',
    dataIndex: 'shebaoPerson',
    key: 'shebaoPerson',
  },
  {
    title: '社保公司',
    dataIndex: 'yijinPerson',
    key: 'yijinPerson',
  },
  {
    title: '单位总计',
    dataIndex: 'companyTotal',
    key: 'companyTotal',
  },
    {
    title: '个人总计',
    dataIndex: 'personTotal',
    key: 'personTotal',
  },
    {
    title: '补差',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
  },
    {
    title: '社保总计',
    dataIndex: 'shebaoTotal',
    key: 'shebaoTotal',
  },
    {
    title: '残保金',
    dataIndex: 'personNum',
    key: 'personNum',
  },
    {
    title: '手续费',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
  {
    title: '总计',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
  {
    title: '标识',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
  {
    title: '账单月',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
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
