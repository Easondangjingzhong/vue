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
      <template v-if="column.key === 'action'">
        <span v-if="loginVueUser.loginType !='P'" :class="record.mappingTaskId ? 'resume_action':''" :title="record.mappingTaskId ? '已提交M任务审核':''">
          <a-dropdown v-if="loginVueUser.loginType !='P'">
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="handleRecommendReleaseTaskDetails(record)">M提交</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          </span>
        </template>
   </template>
  </a-table>
  </div>
  <MappingReleaseTaskDetails :releaseTaskRecord="releaseTaskRecord" ref="mappingReleaseTaskDetails" v-if="mappingReleaseTaskDetailsFlag"/>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import MappingReleaseTaskDetails from './MappingReleaseTaskDetails.vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingList, tableLoading, mappingReleaseTaskDetailsFlag} = storeToRefs(mappingListStore);
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser'),
);
const releaseTaskRecord = ref({});
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
 const handleRecommendReleaseTaskDetails = (record) => {
  releaseTaskRecord.value = record;
  mappingListStore.handleRecommendReleaseTaskDetailsFlag();
 }
</script>
<style lang="less" scoped>
  .resume_action {
    background: linear-gradient(225deg, #5eb95e 15%, transparent 0); 
    padding-right: 5px;
    display: inline-block;
  }
</style>