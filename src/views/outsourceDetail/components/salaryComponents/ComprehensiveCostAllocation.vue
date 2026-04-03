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
    <template #bodyCell="{ column, record }">
      <span v-if="column.key === 'orderType' && record.orderType === '1'">推顾</span>
      <span v-if="column.key === 'orderType' && record.orderType === '2'">企顾</span>
      <span v-if="column.key === 'orderType' && record.orderType === '3'">服顾</span>
      <span v-if="column.key === 'orderType' && record.orderType === '4' && record.isMain === '1'">开顾1</span>
      <span v-if="column.key === 'orderType' && record.orderType === '4' && record.isMain === '3'">开顾2</span>
      <span
        v-if="(column.key === 'zhuanChargeTax' || column.key === 'zhuanChargeAfter' || column.key === 'zhuanChargeRate') && isZhuanZero(record)"
        >-</span
      >
      <span v-else-if="column.key === 'zhuanChargeTax'">{{ record.zhuanChargeTax }}</span>
      <span v-else-if="column.key === 'zhuanChargeAfter'">{{ record.zhuanChargeAfter }}</span>
      <span v-else-if="column.key === 'zhuanChargeRate'">{{ record.zhuanChargeRate }}</span>
    </template>
    <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0"></a-table-summary-cell>
          <a-table-summary-cell :index="1"></a-table-summary-cell>
          <a-table-summary-cell :index="2">合计</a-table-summary-cell>
          <a-table-summary-cell :index="3">{{ summaryData.manageChargeTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="4">{{ summaryData.manageChargeAfter }}</a-table-summary-cell>
          <a-table-summary-cell :index="5">{{ summaryData.manageChargeRate }}</a-table-summary-cell>
          <a-table-summary-cell :index="6">{{ summaryData.zhuanZero ? '-' : summaryData.zhuanChargeTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="7">{{ summaryData.zhuanZero ? '-' : summaryData.zhuanChargeAfter }}</a-table-summary-cell>
          <a-table-summary-cell :index="8">{{ summaryData.zhuanZero ? '-' : summaryData.zhuanChargeRate }}</a-table-summary-cell>
          <a-table-summary-cell :index="9">{{ summaryData.taxIncluded }}</a-table-summary-cell>
          <a-table-summary-cell :index="10">{{ summaryData.money }}</a-table-summary-cell>
          <a-table-summary-cell :index="11">{{ summaryData.offerNum }}</a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
  </a-table>
  </a-col>
</a-row>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { costOfferDetailsForm } = storeToRefs(outsourceDetailStore);
const isZhuanZero = (record: any) =>
  Number.parseFloat(record?.zhuanChargeTax || '0') === 0 &&
  Number.parseFloat(record?.zhuanChargeAfter || '0') === 0;

const summaryData = computed(() => {
  const list = costOfferDetailsForm.value || [];
  const sum = (key: string) =>
    list.reduce((acc, cur: any) => acc + Number.parseFloat(cur?.[key] || '0'), 0);
  const sumInt = (key: string) => list.reduce((acc, cur: any) => acc + Number(cur?.[key] || 0), 0);
  const sumRate = (key: string) =>
    list.reduce((acc, cur: any) => {
      const raw = String(cur?.[key] ?? '');
      const n = Number.parseFloat(raw.replace('%', ''));
      return acc + (Number.isFinite(n) ? n : 0);
    }, 0);
  const formatRate = (n: number) => (n % 1 === 0 ? `${n.toFixed(0)}%` : `${n.toFixed(2)}%`);
  const zhuanTaxSum = sum('zhuanChargeTax');
  const zhuanAfterSum = sum('zhuanChargeAfter');
  return {
    manageChargeTax: sum('manageChargeTax').toFixed(2),
    manageChargeAfter: sum('manageChargeAfter').toFixed(2),
    manageChargeRate: formatRate(sumRate('manageChargeRate')),
    zhuanChargeTax: zhuanTaxSum.toFixed(2),
    zhuanChargeAfter: zhuanAfterSum.toFixed(2),
    zhuanChargeRate: formatRate(sumRate('zhuanChargeRate')),
    zhuanZero: zhuanTaxSum === 0 && zhuanAfterSum === 0,
    taxIncluded: sum('taxIncluded').toFixed(2),
    money: sum('money').toFixed(2),
    offerNum: sum('offerNum').toFixed(2),
  };
});

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
