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
      :data-source="getOutsourcePersonPerformanceDetailCostInfo"
      :pagination="false"
      :scroll="{ x: 1600 }"
    >
    <template #bodyCell="{ column, record }">
      <a-popover v-if="column.key === 'manageGongShi' && record.manageGongShi !== '-'">
        <template #content>
          <span>{{ record.manageGongShi }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <span v-if="column.key == 'manageChargeRate' && record.manageChargeRate !== '-'">
        {{ record.manageChargeRate*100 }}%
      </span>
       <span v-if="column.key == 'zhuanChargeRate' && record.zhuanChargeRate !== '-'">
        {{ record.zhuanChargeRate*100 }}%
      </span>
      <span v-if="column.key == 'operation' && record.costType == '客户账单'">
        <FormOutlined @click="handleEditClick()"/>
      </span>
    </template>
  </a-table>
  </a-col>
</a-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import type { TableColumnsType } from 'ant-design-vue';
import { FormOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonPerformanceDetailCostInfo, costDetailFlag } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
    title: '成本类型',
    dataIndex: 'costType',
    key: 'costType',
    width: 40,
  },
  {
    title: '人才支出',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 40,
  },
   {
    title: '企业社保',
    dataIndex: 'companyShebao',
    key: 'companyShebao',
    width: 40,
  },
   {
    title: '企业一金',
    dataIndex: 'companyYijin',
    key: 'companyYijin',
    width: 40,
  },
   {
    title: '企业商保',
    dataIndex: 'shangbao',
    key: 'shangbao',
    width: 40,
  },
   {
    title: '企业残保',
    dataIndex: 'canBao',
    key: 'canBao',
    width: 40,
  },
  {
    title: '其他支出',
    dataIndex: 'otherPay',
    key: 'otherPay',
    width: 40,
  },
  {
    title: '调差调整',
    dataIndex: 'chenbenTiaocha',
    key: 'chenbenTiaocha',
    width: 40,
  },
    {
    title: '员工福利',
    dataIndex: 'welfare',
    key: 'welfare',
    width: 40,
  },
    {
    title: '三方服务',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 40,
  },
    {
    title: '成本总计',
    dataIndex: 'costTotal',
    key: 'costTotal',
    width: 40,
  },
    {
    title: '管理公式',
    dataIndex: 'manageGongShi',
    key: 'manageGongShi',
    width: 40,
  },
    {
    title: '税前管理',
    dataIndex: 'manageChargeTax',
    key: 'manageChargeTax',
    width: 40,
  },
    {
    title: '税率',
    dataIndex: 'manageChargeRate',
    key: 'manageChargeRate',
    width: 40,
  },
    {
    title: '税金',
    dataIndex: 'manageChargeTaxMoney',
    key: 'manageChargeTaxMoney',
    width: 40,
  },
    {
    title: '总营收费',
    dataIndex: 'moneyCahrgeTax',
    key: 'moneyCahrgeTax',
    width: 40,
  },
    {
    title: '税前转换',
    dataIndex: 'zhuanChargeTax',
    key: 'zhuanChargeTax',
    width: 40,
  },
   {
    title: '税率',
    dataIndex: 'zhuanChargeRate',
    key: 'zhuanChargeRate',
    width: 40,
  },
    {
    title: '税金',
    dataIndex: 'zhuanChargeTaxMoney',
    key: 'zhuanChargeTaxMoney',
    width: 40,
  },
    {
    title: '税后转换',
    dataIndex: 'zhuanChargeAfter',
    key: 'zhuanChargeAfter',
    width: 40,
  },
    {
    title: '总收费',
    dataIndex: 'totalCharge',
    key: 'totalCharge',
    width: 40,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    width: 20,
  },
]
const handleEditClick = () => {
  costDetailFlag.value = true;
}
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