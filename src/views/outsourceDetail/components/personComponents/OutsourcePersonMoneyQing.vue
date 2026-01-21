<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :dataSource="getOfferOutsourceMonthSalary"
      >
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
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
      fixed: 'left',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      fixed: 'left',
    },
    {
      title: '店铺',
      dataIndex: 'mkName',
      key: 'mkName',
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      fixed: 'left',
    },
    {
      title: '计薪日期',
      dataIndex: 'jinxinMonth',
      key: 'jinxinMonth',
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
</script>

<style lang="less" scoped>
</style>
