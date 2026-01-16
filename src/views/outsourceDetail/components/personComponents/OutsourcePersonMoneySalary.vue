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
      title: '店铺',
      dataIndex: 'qingKuanJe',
      key: 'qingKuanJe',
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
      title: '身份证号',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
      fixed: 'left',
    },
    {
      title: '联系方式',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
      fixed: 'left',
    },
    {
      title: '派入公司全称',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '入职时间',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '离职时间',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '计薪日期',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '11月预估考勤情况/H',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '11月标准工资',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '11月餐补',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '11月全勤',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '10月正常加班（小时）',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '10月法定假期加班（小时）',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '10月加班工资',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '10月预估出勤',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '10月实际出勤',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '迟到',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '事假',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '年假',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '带薪病假',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '病假',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '个人销售奖金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '团队销售奖金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '特别奖金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '达成奖金激励',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '基础工资调差',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '餐补调差',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '全勤调差',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '差异调整合计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '应计合计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '本年累计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '养老保险',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '失业保险',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '基本医疗保险',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '大病救助',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '住房公积金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '本月社保合计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '本年社保累计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '子女教育',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '继续教育',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '房贷利息',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '房租',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '赡养父母',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '本月专扣合计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '本月专扣累计',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '免征额',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '累计应缴税金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '本月应缴个税',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '截止上月累计预扣预缴',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '截止上月金三累计已预扣个税',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '经济补偿金',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '汇款手续费',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '实发金额',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '工作地',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '五险一金缴纳地',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '个税缴纳地区',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
  ];
</script>

<style lang="less" scoped>
</style>
