<template>
   <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          推荐记录
        </h4>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;margin-bottom: 5px;" />
    </a-row>
    <a-table
      size="small"
      :dataSource="resumeList"
      rowKey="key"
      :pagination="pagination"
      :columns="columns"
      class="row_table"
      :locale="{ emptyText: '暂无推荐记录' }"
      @change="handleQueryResumeRecord"
    ></a-table>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { formatToDate } from '/@/utils/dateUtil';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
const resumeDetailStore = useResumeDetailStore();
const { resumeRecord } =storeToRefs(resumeDetailStore);
const resumeList = ref([])
const pagination = ref({
  pageSize: 10,
  current: 1,
  total: 0,
  hideOnSinglePage: true,
  size:'small',
})
watch(resumeRecord,() => {
  resumeList.value = resumeRecord.value.list.map((item,index) => ({
    key: item.id.toString(),
    index: ((resumeRecord.value.pageNumber - 1) * resumeRecord.value.pageSize + (index + 1)),
    city: (item.city || ""),
    market: (item.marketName || ""),
    brand: item.brand,
    positions: item.positions,
    date: (item.time ? formatToDate(item.time) : ''),
    currentStatus: item.status,
  }));
  pagination.value = { pageSize: resumeRecord.value.pageSize, current: resumeRecord.value.pageNumber, total: resumeRecord.value.totalCount,hideOnSinglePage: true,size: 'small' };
})
  
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 40,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 40,
    },
    {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
      ellipsis: true,
      width: 50,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 65,
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      ellipsis: true,
      width: 65,
    },
    {
      title: '推时',
      dataIndex: 'date',
      key: 'date',
      width: 70,
    },
    {
      title: '当前状态',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
      width: 65,
    },
  ];
  const handleQueryResumeRecord = (pagination) => {
    resumeDetailStore.queryResumeRecord(pagination.current);
  }
</script>
<style lang="less" scoped>
 .resume_header {
  margin: 10px 20px;
 }
 .resume_h4 {
    margin: 5px 0;
    font-size: 16px;
  }
  .resume_span {
    margin-right: 40px;
    font-size: 14px;
    font-weight: 400;
  }
   :deep(.row_table) th,
   :deep(.row_table) td{
    padding: 3px !important;
  }
</style>