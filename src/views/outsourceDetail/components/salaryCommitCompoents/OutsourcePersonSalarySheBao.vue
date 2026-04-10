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
    <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0" :colSpan="7">总计</a-table-summary-cell>
          <a-table-summary-cell :index="7" align="right">
            <span style="font-weight: bold;">{{ totals.companyTotal }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="8" align="right">
            <span style="font-weight: bold;">{{ totals.personTotal }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="9" align="right">
            <span style="font-weight: bold;">{{ totals.buchaMoney }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="10" align="right">
            <span style="font-weight: bold;">{{ totals.shebaoTotal }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="11" align="right">
            <span style="font-weight: bold;">{{ totals.canbaoMoney }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="12" align="right">
            <span style="font-weight: bold;">{{ totals.serviceMoney }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="13" align="right">
            <span style="font-weight: bold;">{{ totals.shangbaoTotal }}</span>
          </a-table-summary-cell>
          <a-table-summary-cell :index="14" :colSpan="2"></a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
   <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '正常'" color="green">正常</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '补缴'" color="orange">补缴</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '补差'" color="orange">补差</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '退费'" color="red">退费</a-tag>

      <a-tag v-if="column.key === 'jiaoType' && record.jiaoType === '缴费'" color="green">缴费</a-tag>
      <a-tag v-if="column.key === 'jiaoType' && record.jiaoType === '退费'" color="red">退费</a-tag>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonSalaryCommitCollectSheBao, } = storeToRefs(outsourceDetailStore);

const totals = computed(() => {
  let companyTotal = 0;
  let personTotal = 0;
  let buchaMoney = 0;
  let shebaoTotal = 0;
  let canbaoMoney = 0;
  let serviceMoney = 0;
  let shangbaoTotal = 0;

  getOutsourcePersonSalaryCommitCollectSheBao.value.forEach((record) => {
    const factor = record.jiaoType === '退费' ? -1 : 1;
    companyTotal += Number(record.companyTotal || 0) * factor;
    personTotal += Number(record.personTotal || 0) * factor;
    buchaMoney += Number(record.buchaMoney || 0) * factor;
    shebaoTotal += Number(record.shebaoTotal || 0) * factor;
    canbaoMoney += Number(record.canbaoMoney || 0) * factor;
    serviceMoney += Number(record.serviceMoney || 0) * factor;
    shangbaoTotal += Number(record.shangbaoTotal || 0) * factor;
  });

  return {
    companyTotal: companyTotal.toFixed(2),
    personTotal: personTotal.toFixed(2),
    buchaMoney: buchaMoney.toFixed(2),
    shebaoTotal: shebaoTotal.toFixed(2),
    canbaoMoney: canbaoMoney.toFixed(2),
    serviceMoney: serviceMoney.toFixed(2),
    shangbaoTotal: shangbaoTotal.toFixed(2),
  };
});

const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 20,
  },
  {
    title: '类别',
    dataIndex: 'jiaoSign',
    key: 'jiaoSign',
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
    dataIndex: 'canbaoMoney',
    key: 'canbaoMoney',
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
    dataIndex: 'jiaoType',
    key: 'jiaoType',
    width: 30,
  },
  {
    title: '账单月',
    dataIndex: 'yearAndMonthJiao',
    key: 'yearAndMonthJiao',
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
