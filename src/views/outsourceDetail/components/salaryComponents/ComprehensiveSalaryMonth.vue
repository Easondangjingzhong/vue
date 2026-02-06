<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">月度薪资</div>
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
    title: '基本工资',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
  },
  {
    title: '全勤工时',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '上月预估',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '上月实际',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '本月预估',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '本月实际',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '当月差额',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '累计差额',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '出勤工资',
    dataIndex: 'joinTime',
    key: 'joinTime',
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
    title: '正常加班',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '国定加班',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '休息加班',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '加班总计',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '迟到',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '病假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '带薪假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '个人奖金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '团队奖金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '激励奖金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '特殊奖金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '达成奖金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '十三薪',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '年终奖金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '奖金总计',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
]
const columns1:TableColumnsType = [
  {
    title: '保底奖金',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
  },
  {
    title: '工资调差',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '全勤调差',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '餐补调差',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '津贴调差',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '调差合计',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '月度工资',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '年度工资',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '养老保险',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '失业保险',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '医疗保险',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '公积金',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '月度社保',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '年度社保',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '子女教育',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '继续教育',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '房贷利息',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '房租',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '赡养父母',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '月度专扣',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '年度专扣',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '年度免征',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '月度个税',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '年度个税',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
    {
    title: '实发工资',
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