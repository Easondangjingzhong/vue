<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">薪资标准</div>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourceContractList"
      :pagination="false"
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
    title: '基础薪资',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
  },
  {
    title: '餐补',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '津贴',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '全勤',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '总计',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '个人',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '团队',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '特殊',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '激励',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '达成',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '商保',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '残保',
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