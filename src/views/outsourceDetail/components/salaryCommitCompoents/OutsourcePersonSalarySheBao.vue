<template>
  <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="false"
      :columns="columns"
      :scroll="{ y: 500 }"
      :dataSource="getOutsourcePersonSalaryCommitCollectSheBao"
    >
   <!-- <template #bodyCell="{ column, record }">
    </template> -->
  </a-table>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonSalaryCommitCollectSheBao, } = storeToRefs(outsourceDetailStore);
const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 20,
  },
  {
    title: '社保周期',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
    width: 30,
  },
   {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    width: 50,
  },
   {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 40,
  },
   {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    width: 30,
  },
  {
    title: '社保公司',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
    width: 30,
  },
  {
    title: h('a-tooltip', { title: '单位社保+单位一金' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '单位总计')),
    dataIndex: 'companyTotal',
    key: 'companyTotal',
    width: 40,
    align: 'right',
  },
    {
    title: h('a-tooltip', { title: '个人社保+个人一金' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '个人总计')),
    dataIndex: 'personTotal',
    key: 'personTotal',
    width: 40,
    align: 'right',
  },
    {
    title: h('a-tooltip', { title: '补差需要体现具体数据，请参考以下“补差”' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '补差总计')),
    dataIndex: 'buchaMoney',
    key: 'buchaMoney',
    width: 30,
    align: 'right',
  },
   {
    title: '社保一金',
    dataIndex: 'shebaoTotal',
    key: 'shebaoTotal',
    width: 40,
    align: 'right',
  },
    {
    title: '残保金',
    dataIndex: 'canbao',
    key: 'canbao',
    width: 30,
    align: 'right',
  },
    {
    title: '服务费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 40,
    align: 'right',
  },
  {
    title: '总计',
    dataIndex: 'shangbaoTotal',
    key: 'shangbaoTotal',
    width: 40,
    align: 'right',
  },
  {
    title: '标识',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
    width: 30,
  },
  {
    title: '账单月',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
    width: 30,
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
