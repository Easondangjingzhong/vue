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
    title: '全勤工时',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
  },
  {
    title: '预估',
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
    title: '累计差额',
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
    title: '带薪病假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '扣薪病假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '事假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '年假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '婚假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '丧假',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: '其它带薪',
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
    title: '全勤',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 40,
  },
   {
    title: 'UT',
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