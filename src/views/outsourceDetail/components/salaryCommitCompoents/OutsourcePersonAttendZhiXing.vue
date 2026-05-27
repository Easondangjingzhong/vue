<template>
  <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="false"
      :columns="columns"
      :dataSource="getOutsourceAttendZhixingMonth"
    >
   <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'flag' && record.flag !== '待录'" color="green">已录</a-tag>
      <a-tag v-if="column.key === 'flag' && record.flag === '待录'" color="orange">待录</a-tag>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceAttendZhixingMonth} = storeToRefs(outsourceDetailStore);
const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 20,
  },
  {
    title: '执行月',
    dataIndex: 'zhiXingMonth',
    key: 'zhiXingMonth',
    width: 20,
  },
  {
    title: '计薪月',
    dataIndex: 'yearAndmonth',
    key: 'yearAndmonth',
    width: 30,
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 40,
  },
   {
    title: '考勤日',
    dataIndex: 'kaoqinBiao',
    key: 'kaoqinBiao',
    width: 30,
  },
  {
    title: '人数',
    dataIndex: 'peopleNum',
    key: 'peopleNum',
    width: 30,
  },
  {
    title: '核对',
    dataIndex: 'flag',
    key: 'flag',
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
