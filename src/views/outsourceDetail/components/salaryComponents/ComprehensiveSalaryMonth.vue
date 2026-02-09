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
      :data-source="getOutsourcePersonPerformanceDetail"
      :pagination="false"
      :scroll="{ x: 1600 }"
    >
  </a-table>
  </a-col>
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns1"
      :data-source="getOutsourcePersonPerformanceDetail"
      :pagination="false"
      :scroll="{ x: 1600 }"
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
const { getOutsourcePersonPerformanceDetail } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
    title: '基本工资',
    dataIndex: 'biaozhunSalary',
    key: 'biaozhunSalary',
    width: 40,
  },
  {
    title: '全勤工时',
    dataIndex: 'biaozhunGongshi',
    key: 'biaozhunGongshi',
    width: 40,
  },
   {
    title: '上月预估',
    dataIndex: 'shangyueYugu',
    key: 'shangyueYugu',
    width: 40,
  },
   {
    title: '上月实际',
    dataIndex: 'shangyueShiji',
    key: 'shangyueShiji',
    width: 40,
  },
   {
    title: '本月预估',
    dataIndex: 'yuguGongshi',
    key: 'yuguGongshi',
    width: 40,
  },
   {
    title: '本月实际',
    dataIndex: 'bebyueShiji',
    key: 'bebyueShiji',
    width: 40,
  },
   {
    title: '当月差额',
    dataIndex: 'benyueChae',
    key: 'benyueChae',
    width: 40,
  },
   {
    title: '累计差额',
    dataIndex: 'leijiChae',
    key: 'leijiChae',
    width: 40,
  },
   {
    title: '出勤工资',
    dataIndex: 'chuqinSalary',
    key: 'chuqinSalary',
    width: 40,
  },
   {
    title: '餐补',
    dataIndex: 'canbu',
    key: 'canbu',
    width: 40,
  },
   {
    title: '津贴',
    dataIndex: 'jintie',
    key: 'jintie',
    width: 40,
  },
   {
    title: '全勤',
    dataIndex: 'quanqin',
    key: 'quanqin',
    width: 40,
  },
   {
    title: '正常加班',
    dataIndex: 'zhengchangJiaban',
    key: 'zhengchangJiaban',
    width: 40,
  },
   {
    title: '国定加班',
    dataIndex: 'fadingJiaban',
    key: 'fadingJiaban',
    width: 40,
  },
   {
    title: '休息加班',
    dataIndex: 'xiuxiJiaban',
    key: 'xiuxiJiaban',
    width: 40,
  },
   {
    title: '加班总计',
    dataIndex: 'jiabanSalary',
    key: 'jiabanSalary',
    width: 40,
  },
   {
    title: '迟到',
    dataIndex: 'chidao',
    key: 'chidao',
    width: 40,
  },
   {
    title: '病假',
    dataIndex: 'bingjia',
    key: 'bingjia',
    width: 40,
  },
   {
    title: '带薪假',
    dataIndex: 'daixin',
    key: 'daixin',
    width: 40,
  },
   {
    title: '个人奖金',
    dataIndex: 'geti',
    key: 'geti',
    width: 40,
  },
   {
    title: '团队奖金',
    dataIndex: 'tuanti',
    key: 'tuanti',
    width: 40,
  },
   {
    title: '激励奖金',
    dataIndex: 'jili',
    key: 'jili',
    width: 40,
  },
   {
    title: '特殊奖金',
    dataIndex: 'teshu',
    key: 'teshu',
    width: 40,
  },
    {
    title: '达成奖金',
    dataIndex: 'dacheng',
    key: 'dacheng',
    width: 40,
  },
    {
    title: '十三薪',
    dataIndex: 'thirteenthSalary',
    key: 'thirteenthSalary',
    width: 40,
  },
    {
    title: '年终奖金',
    dataIndex: 'yearEndBouns',
    key: 'yearEndBouns',
    width: 40,
  },
    {
    title: '奖金总计',
    dataIndex: 'jiangjinTotal',
    key: 'jiangjinTotal',
    width: 40,
  },
]
const columns1:TableColumnsType = [
  {
    title: '保底奖金',
    dataIndex: 'baodiJiangjin',
    key: 'baodiJiangjin',
    width: 40,
  },
  {
    title: '工资调差',
    dataIndex: 'salaryTiaocha',
    key: 'salaryTiaocha',
    width: 40,
  },
   {
    title: '全勤调差',
    dataIndex: 'quanqinTiaocha',
    key: 'quanqinTiaocha',
    width: 40,
  },
   {
    title: '餐补调差',
    dataIndex: 'canbuTiaocha',
    key: 'canbuTiaocha',
    width: 40,
  },
   {
    title: '津贴调差',
    dataIndex: 'jintieTiaocha',
    key: 'jintieTiaocha',
    width: 40,
  },
   {
    title: '调差合计',
    dataIndex: 'tiaochaTotal',
    key: 'tiaochaTotal',
    width: 40,
  },
   {
    title: '月度工资',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 40,
  },
   {
    title: '年度工资',
    dataIndex: 'yearTax',
    key: 'yearTax',
    width: 40,
  },
   {
    title: '养老保险',
    dataIndex: 'yanglao',
    key: 'yanglao',
    width: 40,
  },
   {
    title: '失业保险',
    dataIndex: 'shiye',
    key: 'shiye',
    width: 40,
  },
   {
    title: '医疗保险',
    dataIndex: 'yiliao',
    key: 'yiliao',
    width: 40,
  },
   {
    title: '公积金',
    dataIndex: 'yijin',
    key: 'yijin',
    width: 40,
  },
   {
    title: '月度社保',
    dataIndex: 'monthShebao',
    key: 'monthShebao',
    width: 40,
  },
   {
    title: '年度社保',
    dataIndex: 'yearShebao',
    key: 'yearShebao',
    width: 40,
  },
   {
    title: '子女教育',
    dataIndex: 'zinvJiaoyu',
    key: 'zinvJiaoyu',
    width: 40,
  },
   {
    title: '继续教育',
    dataIndex: 'jixuJiaoyu',
    key: 'jixuJiaoyu',
    width: 40,
  },
   {
    title: '房贷利息',
    dataIndex: 'fangdaiLixi',
    key: 'fangdaiLixi',
    width: 40,
  },
   {
    title: '房租',
    dataIndex: 'fangzu',
    key: 'fangzu',
    width: 40,
  },
   {
    title: '赡养父母',
    dataIndex: 'shangyangFumu',
    key: 'shangyangFumu',
    width: 40,
  },
   {
    title: '月度专扣',
    dataIndex: 'monthZhuankou',
    key: 'monthZhuankou',
    width: 40,
  },
   {
    title: '年度专扣',
    dataIndex: 'yearZhuankou',
    key: 'yearZhuankou',
    width: 40,
  },
   {
    title: '年度免征',
    dataIndex: 'yearMianzheng',
    key: 'yearMianzheng',
    width: 40,
  },
   {
    title: '月度个税',
    dataIndex: 'monthGeshui',
    key: 'monthGeshui',
    width: 40,
  },
    {
    title: '年度个税',
    dataIndex: 'yearGeshui',
    key: 'yearGeshui',
    width: 40,
  },
   {
    title: '手续费',
    dataIndex: 'shouxuMoney',
    key: 'shouxuMoney',
    width: 40,
  },
    {
    title: '实发工资',
    dataIndex: 'salaryAfterTax',
    key: 'salaryAfterTax',
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