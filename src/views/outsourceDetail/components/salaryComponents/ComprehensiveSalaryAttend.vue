<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">月度考勤</div>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourcePersonPerformanceDetailAttendInfo"
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
const { getOutsourcePersonPerformanceDetailAttendInfo } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
    title: '全勤工时',
    dataIndex: 'quanqinHours',
    key: 'quanqinHours',
    width: 40,
  },
  {
    title: '预估',
    dataIndex: 'isYugu',
    key: 'isYugu',
    width: 40,
  },
   {
    title: '上月预估',
    dataIndex: 'lastMonthYuHoursTotal',
    key: 'lastMonthYuHoursTotal',
    width: 40,
  },
   {
    title: '上月实际',
    dataIndex: 'lastMonthShiHoursTotal',
    key: 'lastMonthShiHoursTotal',
    width: 40,
  },
   {
    title: '本月预估',
    dataIndex: 'currentMonthYuHoursTotal',
    key: 'currentMonthYuHoursTotal',
    width: 40,
  },
   {
    title: '本月实际',
    dataIndex: 'currentMonthShiHoursTotal',
    key: 'currentMonthShiHoursTotal',
    width: 40,
  },
   {
    title: '累计差额',
    dataIndex: 'totalChaHoursTotal',
    key: 'totalChaHoursTotal',
    width: 40,
  },
   {
    title: '正常加班',
    dataIndex: 'overHoursTotal',
    key: 'overHoursTotal',
    width: 40,
  },
   {
    title: '国定加班',
    dataIndex: 'holidayOverHoursTotal',
    key: 'holidayOverHoursTotal',
    width: 40,
  },
   {
    title: '休息加班',
    dataIndex: 'restOverHoursTotal',
    key: 'restOverHoursTotal',
    width: 40,
  },
   {
    title: '带薪病假',
    dataIndex: 'daixinBingjiaHoursTotal',
    key: 'daixinBingjiaHoursTotal',
    width: 40,
  },
   {
    title: '扣薪病假',
    dataIndex: 'kouxinBingjiaHoursTotal',
    key: 'kouxinBingjiaHoursTotal',
    width: 40,
  },
   {
    title: '事假',
    dataIndex: 'shijiaHoursTotal',
    key: 'shijiaHoursTotal',
    width: 40,
  },
   {
    title: '年假',
    dataIndex: 'nianjianHoursTotal',
    key: 'nianjianHoursTotal',
    width: 40,
  },
   {
    title: '婚假',
    dataIndex: 'hunjiaHoursTotal',
    key: 'hunjiaHoursTotal',
    width: 40,
  },
   {
    title: '丧假',
    dataIndex: 'sanjiaHoursTotal',
    key: 'sanjiaHoursTotal',
    width: 40,
  },
   {
    title: '其它带薪',
    dataIndex: 'otherDaixinHoursTotal',
    key: 'otherDaixinHoursTotal',
    width: 40,
  },
   {
    title: '迟到',
    dataIndex: 'lateHours',
    key: 'lateHours',
    width: 40,
  },
   {
    title: '全勤',
    dataIndex: 'isQuanqin',
    key: 'isQuanqin',
    width: 40,
  },
   {
    title: 'UT',
    dataIndex: 'utHoursTotal',
    key: 'utHoursTotal',
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