<template>
  <div>
    <a-table
      size="small"
      :dataSource="mappingList"
      :pagination="false"
      rowKey="key"
      :loading="tableLoading"
      :columns="columnsMappingRseult"
    >
   <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'jubStatus'">
        <a-tag v-if="record.jubStatus == '1'" color="green">在职</a-tag>
        <a-tag v-if="record.jubStatus == '2'" color="red">离职</a-tag>
    </template>
   </template>
  </a-table>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingList, tableLoading} = storeToRefs(mappingListStore);
const columnsMappingRseult = [
  {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 20,
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 50,
      ellipsis: true,
    },
     {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 20,
      ellipsis: true,
    },
     {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 20,
      ellipsis: true,
    },
     {
      title: '城市',
      dataIndex: 'place',
      key: 'place',
      width: 30,
      ellipsis: true,
    },
     {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
      width: 60,
      ellipsis: true,
    },
     {
      title: '品牌',
      dataIndex: 'allBrand',
      key: 'allBrand',
      width: 70,
      ellipsis: true,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 70,
      ellipsis: true,
    },
    {
      title: '职状',
      dataIndex: 'jubStatus',
      key: 'jubStatus',
      width: 20,
      ellipsis: true,
    },
    {
      title: '顾问',
      dataIndex: 'counselor',
      key: 'counselor',
      width: 40,
      ellipsis: true,
    },
     {
      title: '更新日期',
      dataIndex: 'yearMouthDays',
      key: 'yearMouthDays',
      width: 40,
      ellipsis: true,
    },
    {
      title: '记录',
      dataIndex: 'communicate',
      key: 'communicate',
      width: 30,
      ellipsis: true,
    },
     {
      title: '推次',
      dataIndex: 'recommendNum',
      key: 'recommendNum',
      width: 20,
      ellipsis: true,
    },
    {
      title: '标签',
      dataIndex: 'sign',
      key: 'sign',
      width: 60,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 20,
      ellipsis: true,
    },
 ];
  
</script>
<style lang="less" scoped></style>