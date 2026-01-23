<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :dataSource="getOfferOutsourceMonthSalary"
        :scroll="{ x: 1600 }"
      >
      <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0"></a-table-summary-cell>
          <a-table-summary-cell :index="1"></a-table-summary-cell>
          <a-table-summary-cell :index="2"></a-table-summary-cell>
          <a-table-summary-cell :index="3"></a-table-summary-cell>
          <a-table-summary-cell :index="4"></a-table-summary-cell>
          <a-table-summary-cell :index="5">合计</a-table-summary-cell>
          <a-table-summary-cell :index="6"></a-table-summary-cell>
          <a-table-summary-cell :index="7">{{ summaryData.monthTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="8">{{ summaryData.sheBaoMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="9">{{ summaryData.canBaoMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="10">{{ summaryData.economicCompensation }}</a-table-summary-cell>
          <a-table-summary-cell :index="11">{{ summaryData.personCost }}</a-table-summary-cell>
          <a-table-summary-cell :index="12">{{ summaryData.rate }}</a-table-summary-cell>
          <a-table-summary-cell :index="13">{{ summaryData.serviceFee }}</a-table-summary-cell>
          <a-table-summary-cell :index="14">{{ summaryData.shangbao }}</a-table-summary-cell>
          <a-table-summary-cell :index="15">{{ summaryData.salaryTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="16">{{ summaryData.salaryRate }}</a-table-summary-cell>
          <a-table-summary-cell :index="17">{{ summaryData.salaryRateMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="18">{{ summaryData.salaryTotal }}</a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
    </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOfferOutsourceMonthSalary } = storeToRefs(outsourceDetailStore);
const columns:TableColumnsType = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
      width: 40,
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
      fixed: 'left',
      width: 70,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      fixed: 'left',
      width: 50,
    },
    {
      title: '店铺',
      dataIndex: 'mkName',
      key: 'mkName',
      fixed: 'left',
      width: 50,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      title: '计薪日期',
      dataIndex: 'jinxinMonth',
      key: 'jinxinMonth',
      width: 150,
    },
    {
      title: '应发工资',
      dataIndex: 'monthTax',
      key: 'monthTax',
    },
    {
      title: '公司承担社保公积金',
      dataIndex: 'sheBaoMoney',
      key: 'sheBaoMoney',
      width: 130,
    },
    {
      title: '残保金',
      dataIndex: 'canBaoMoney',
      key: 'canBaoMoney',
    },
    {
      title: '经济补偿金',
      dataIndex: 'economicCompensation',
      key: 'economicCompensation',
    },
    {
      title: '人员成本',
      dataIndex: 'personCost',
      key: 'personCost',
    },
    {
      title: '费率',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
      key: 'serviceFee',
    },
    {
      title: '商业保险',
      dataIndex: 'shangbao',
      key: 'shangbao',
    },
    {
      title: '税前汇总',
      dataIndex: 'salaryTax',
      key: 'salaryTax',
    },
    {
      title: '增值税率',
      dataIndex: 'salaryRate',
      key: 'salaryRate',
    },
    {
      title: '增值税金',
      dataIndex: 'salaryRateMoney',
      key: 'salaryRateMoney',
    },
    {
      title: '费用合计',
      dataIndex: 'salaryTotal',
      key: 'salaryTotal',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];
const summaryData = computed(() => {
  let monthTax = 0;
  let sheBaoMoney = 0;
  let canBaoMoney = 0;
  let economicCompensation = 0;
  let personCost = 0;
  let rate = 0;
  let serviceFee = 0;
  let shangbao = 0;
  let salaryTax = 0;
  let salaryRate = 0;
  let salaryRateMoney = 0;
  let salaryTotal = 0;
  getOfferOutsourceMonthSalary.value.forEach((item) => {
    monthTax += Number(item?.monthTax || 0);
    sheBaoMoney += Number(item?.sheBaoMoney || 0);
    canBaoMoney += Number(item?.canBaoMoney || 0);
    economicCompensation += Number(item?.economicCompensation || 0);
    personCost += Number(item?.personCost || 0);
    serviceFee += Number(item?.serviceFee || 0);
    //shangbao += Number(item?.shangbao || 0);
    salaryTax += Number(item?.salaryTax || 0);
    salaryRateMoney += Number(item?.salaryRateMoney || 0);
    salaryTotal += Number(item?.salaryTotal || 0);
  });
  return {
    monthTax: monthTax.toFixed(2),
    sheBaoMoney: sheBaoMoney.toFixed(2),
    canBaoMoney: canBaoMoney.toFixed(2),
    economicCompensation: economicCompensation.toFixed(2),
    personCost: personCost.toFixed(2),
    rate: rate.toFixed(2),
    serviceFee: serviceFee.toFixed(2),
    shangbao: shangbao.toFixed(2),
    salaryTax: salaryTax.toFixed(2),
    salaryRate: salaryRate.toFixed(2),
    salaryRateMoney: salaryRateMoney.toFixed(2),
    salaryTotal: salaryTotal.toFixed(2),
  };
});
</script>

<style lang="less" scoped>
</style>
