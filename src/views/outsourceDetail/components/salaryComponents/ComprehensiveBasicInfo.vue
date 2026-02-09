<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">基本信息</div>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourcePersonPerformanceDetailPersonInfo"
      :pagination="false"
    >
    <template #bodyCell="{ column, record }">
    <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '1'" color="orange">待入</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '2'" color="green">在职</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '3'" color="red">离职</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '4'" color="red">未入</a-tag>
     </template>
  </a-table>
  </a-col>
</a-row>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonPerformanceDetailPersonInfo } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
      title: '中文姓名',
      dataIndex: 'userNameCn',
      key: 'userNameCn',
      fixed: 'left',
      width: 20,
      ellipsis: true,
    },
    {
      title: '英文姓名',
      dataIndex: 'userNameEn',
      key: 'userNameEn',
      fixed: 'left',
      width: 20,
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      fixed: 'left',
      width: 20,
      ellipsis: true,
    },
    {
        title: '公司',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 25,
        ellipsis: true,
      },
      {
        title: '状态',
        dataIndex: 'currentStatus',
        key: 'currentStatus',
        width: 20,
        ellipsis: true,
      },
  {
    title: 'OFFER日期',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
  },
  {
    title: '入职日期',
    dataIndex: 'realEntryTime',
    key: 'realEntryTime',
    width: 40,
  },
   {
    title: '预离日期',
    dataIndex: 'planLeaveTime',
    key: 'planLeaveTime',
    width: 40,
  },
   {
    title: '实际离职',
    dataIndex: 'realLeaveTime',
    key: 'realLeaveTime',
    width: 40,
  },
   {
    title: '合同期',
    dataIndex: 'contractPeriod',
    key: 'contractPeriod',
    width: 40,
  },
   {
    title: '性质',
    dataIndex: 'jobType',
    key: 'jobType',
    width: 40,
  },
]

</script>

<style lang="less" scoped>
.comprehensive-contract-info {
  display: flex;
  justify-content: space-between;
}
  .comprehensive-contract-info-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: auto;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .comprehensive-contract-info-btn {
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>