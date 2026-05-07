<template>
   <a-drawer
    v-model:open="outsourcePersonSalaryCommitDetailsFlag"
    title="工资详情"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
   <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
  <div class="resume_container">
    <a-table
      size="small"
      :pagination="false"
      :loading="false"
      :columns="columns"
      :dataSource="getOutsourcePersonSalaryCommitDetail"
    >
   <template #bodyCell="{ column, record }">
    <a-popover
      v-if="column.key === 'bankCard'"
      :content="record.bankCard"
      placement="top"
      trigger="click"
    >
    <a-tag style="cursor: pointer;" :title="record.bankCard">查看</a-tag>
    </a-popover>
    <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '未核'" color="red">未核</a-tag>
    <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '已核'" color="green">已核</a-tag>
    </template>
    <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0" :colSpan="7" style="text-align: right;">合计</a-table-summary-cell>
          <a-table-summary-cell :index="1" style="text-align: right;">{{ summaryData.monthTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="2" style="text-align: right;">{{ summaryData.monthShebao }}</a-table-summary-cell>
          <a-table-summary-cell :index="4" style="text-align: right;">{{ summaryData.monthGeshui }}</a-table-summary-cell>
          <a-table-summary-cell :index="4" style="text-align: right;">{{ summaryData.canBao }}</a-table-summary-cell>
          <a-table-summary-cell :index="5" style="text-align: right;">{{ summaryData.shouxuMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="5" style="text-align: right;">{{ summaryData.salaryAfterTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="6" style="text-align: right;">{{ summaryData.buchangMonth }}</a-table-summary-cell>
          <a-table-summary-cell :index="7" style="text-align: right;">{{ summaryData.serviceMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="8" style="text-align: right;">{{ summaryData.totalMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="9"></a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
  </a-table>
  </div>
   </a-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonSalaryCommitDetailsFlag, getOutsourcePersonSalaryCommitDetail} = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.85));
const handleClose = () => {
  outsourcePersonSalaryCommitDetailsFlag.value = false;
};
const summaryData = computed(() => {
  const data = getOutsourcePersonSalaryCommitDetail.value;
  if (!data || data.length === 0) {
    return {
      monthTax: '0.00',
      monthShebao: '0.00',
      canBao: '0.00',
      monthGeshui: '0.00',
      shouxuMoney: '0.00',
      salaryAfterTax: '0.00',
      serviceMoney: '0.00',
      buchangMonth: '0.00',
      totalMoney: '0.00',
    };
  }
  const sums = {
    monthTax: 0,
    monthShebao: 0,
    canBao: 0,
    monthGeshui: 0,
    shouxuMoney: 0,
    salaryAfterTax: 0,
    serviceMoney: 0,
    buchangMonth: 0,
    totalMoney: 0,
  };
  data.forEach((item) => {
    sums.monthTax += Number(item.monthTax || 0);
    sums.canBao += Number(item.canBao || 0);
    sums.monthShebao += Number(item.monthShebao || 0);
    sums.monthGeshui += Number(item.monthGeshui || 0);
    sums.shouxuMoney += Number(item.shouxuMoney || 0);
    sums.salaryAfterTax += Number(item.salaryAfterTax || 0);
    sums.serviceMoney += Number(item.serviceMoney || 0);
    sums.buchangMonth += Number(item.buchangMonth || 0);
    sums.totalMoney += Number(item.totalMoney || 0);
  });
  return {
    monthTax: sums.monthTax.toFixed(2),
    monthShebao: sums.monthShebao.toFixed(2),
    canBao: sums.canBao.toFixed(2),
    monthGeshui: sums.monthGeshui.toFixed(2),
    shouxuMoney: sums.shouxuMoney.toFixed(2),
    salaryAfterTax: sums.salaryAfterTax.toFixed(2),
    serviceMoney: sums.serviceMoney.toFixed(2),
    buchangMonth: sums.buchangMonth.toFixed(2),
    totalMoney: sums.totalMoney.toFixed(2),
  };
});
const columns: TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 40,
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    width: 80,
    ellipsis: true,
  },
   {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    width: 40,
  },
   {
    title: '职位',
    dataIndex: 'positions',
    key: 'positions',
    width: 100,
    ellipsis: true,
  },
   {
    title: h('a-tooltip', { title: '公司发薪银行' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '发薪银行')),
    dataIndex: 'bankGroup',
    key: 'bankGroup',
    width: 70,
    align: 'right',
  },
  {
    title: h('a-tooltip', { title: '人才工资卡银行名称' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '银行名称')),
    dataIndex: 'bankName',
    key: 'bankName',
    width: 70,
    align: 'right',
  },
  {
    title: h('a-tooltip', { title: '人才工资卡账号' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '账户')),
    dataIndex: 'bankCard',
    key: 'bankCard',
    width: 40,
  },
    {
    title: '应发工资',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 70,
    align: 'right',
  },
    {
    title: '社保',
    dataIndex: 'monthShebao',
    key: 'monthShebao',
    width: 55,
    align: 'right',
  },
    {
    title: '个税',
    dataIndex: 'monthGeshui',
    key: 'monthGeshui',
    width: 55,
    align: 'right',
  },
   {
    title: '残保金',
    dataIndex: 'canBao',
    key: 'canBao',
    width: 50,
    align: 'right',
  },
    {
    title: '手续费',
    dataIndex: 'shouxuMoney',
    key: 'shouxuMoney',
    width: 50,
    align: 'right',
  },
    {
    title: '实发工资',
    dataIndex: 'salaryAfterTax',
    key: 'salaryAfterTax',
    width: 70,
    align: 'right',
  },
   {
    title: '经济补偿金',
    dataIndex: 'buchangMonth',
    key: 'buchangMonth',
    width: 70,
    align: 'right',
  },
  {
    title: '服务费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 50,
    align: 'right',
  },
  {
    title: '总计',
    dataIndex: 'totalMoney',
    key: 'totalMoney',
    width: 70,
    align: 'right',
  },
  {
    title: '状态',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    width: 40,
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
