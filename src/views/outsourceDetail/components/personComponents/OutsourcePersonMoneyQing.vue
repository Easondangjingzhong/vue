<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
      >
    </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const columns:TableColumnsType = [
    {
      title: '序号',
      dataIndex: 'qingKuanDanHao',
      key: 'qingKuanDanHao',
      fixed: 'left',
    },
    {
      title: '服务类型',
      dataIndex: 'qingKuanJe',
      key: 'qingKuanJe',
      fixed: 'left',
    },
    {
      title: '城市',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
      fixed: 'left',
    },
    {
      title: '店铺',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
      fixed: 'left',
    },
    {
      title: '职位',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
      fixed: 'left',
    },
    {
      title: '计薪日期',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '应发工资',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '公司承担社保公积金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '残保金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '经济补偿金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '人员成本',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '费率',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '服务费',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '商业保险',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '税前汇总',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '增值税率',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '增值税金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '费用合计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '备注',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
  ];
</script>

<style lang="less" scoped>
</style>
