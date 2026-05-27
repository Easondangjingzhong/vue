<template>
  <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="false"
      :columns="columns"
      :dataSource="getOutsourceYeJiZhixingMonth"
    >
   <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'sign' && record.sign === '2'" color="green">锁定</a-tag>
      <a-tag v-if="column.key === 'sign' && record.sign !== '2'" color="orange">待录</a-tag>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceYeJiZhixingMonth} = storeToRefs(outsourceDetailStore);
const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 20,
  },
  {
    title: '执行月',
    dataIndex: 'offerDetailMonth',
    key: 'offerDetailMonth',
    width: 20,
  },
  {
    title: '账单月',
    dataIndex: 'zhanDanMonth',
    key: 'zhanDanMonth',
    width: 30,
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 40,
  },
  {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
    width: 30,
  },
  {
    title: '总营收费',
    dataIndex: 'moneyCahrgeTax',
    key: 'moneyCahrgeTax',
    width: 50,
  },
  {
    title: '转换费',
    dataIndex: 'zhuanChargeTax',
    key: 'zhuanChargeTax',
    width: 50,
  },
  {
    title: '公司支出',
    dataIndex: 'costTotal',
    key: 'costTotal',
    width: 50,
  },
  {
    title: '管理费',
    dataIndex: 'manageChargeTax',
    key: 'manageChargeTax',
    width: 50,
  },
  {
    title: '税费',
    dataIndex: 'manageChargeTaxMoney',
    key: 'manageChargeTaxMoney',
    width: 50,
  },
  {
    title: '含税总计',
    dataIndex: 'totalCharge',
    key: 'totalCharge',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'sign',
    key: 'sign',
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
