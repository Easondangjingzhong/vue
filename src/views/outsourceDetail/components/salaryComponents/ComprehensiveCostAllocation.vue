<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">业绩分配</div>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="costOfferDetailsForm"
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
const { costOfferDetailsForm } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
    title: '类型',
    dataIndex: 'orderType',
    key: 'orderType',
    width: 40,
  },
  {
    title: '顾问',
    dataIndex: 'counselor',
    key: 'counselor',
    width: 40,
  },
   {
    title: '团队',
    dataIndex: 'teamName',
    key: 'teamName',
    width: 40,
  },
   {
    title: '税前管理',
    dataIndex: 'manageChargeTax',
    key: 'manageChargeTax',
    width: 40,
  },
   {
    title: '税后管理',
    dataIndex: 'manageChargeAfter',
    key: 'manageChargeAfter',
    width: 40,
  },
   {
    title: '比例',
    dataIndex: 'manageChargeRate',
    key: 'manageChargeRate',
    width: 40,
  },
    {
    title: '税前转换',
    dataIndex: 'zhuanChargeTax',
    key: 'zhuanChargeTax',
    width: 40,
  },
    {
    title: '税后转换',
    dataIndex: 'zhuanChargeAfter',
    key: 'zhuanChargeAfter',
    width: 40,
  },
    {
    title: '比例',
    dataIndex: 'zhuanChargeRate',
    key: 'zhuanChargeRate',
    width: 40,
  },
    {
    title: '税前总计',
    dataIndex: 'taxIncluded',
    key: 'taxIncluded',
    width: 40,
  },
    {
    title: '税后总计',
    dataIndex: 'money',
    key: 'money',
    width: 40,
  },
  {
    title: '单数',
    dataIndex: 'offerNum',
    key: 'offerNum',
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