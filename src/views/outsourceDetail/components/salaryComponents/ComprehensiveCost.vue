<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">用工成本</div>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourceContractList"
      :pagination="false"
      :scroll="{ x: 1600 }"
    >
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
const { getOutsourceContractList } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
    title: '成本类型',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
  },
  {
    title: '人才支出',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '企业社保',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '企业一金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '企业商保',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '企业残保',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '员工福利',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '其他支出',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '调差调整',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '成本总计',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '管理公式',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '税前管理',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '税率',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '税金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '总营收费',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '税前转换',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '税率',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '税金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '税后转换',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '总收费',
    dataIndex: 'joinTime',
    key: 'joinTime',
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