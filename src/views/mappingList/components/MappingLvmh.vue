<template>
    <a-drawer
    v-model:open="mappingLvmhFlag"
    title="LVMH"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '10px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseMappingLvmh" />
    </template>
  <div class="resume-content-search">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
     <a-row :gutter="24">
       <a-col :span="spanCol">
        <a-form-item
            name="userName"
            label="姓名"
          >
            <a-input
              v-model:value="formState.userName"
            />
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="phone"
            label="手机"
          >
            <a-input
              v-model:value="formState.phone"
            />
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="recommendRecruitId"
            label="推顾"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.recommendRecruitId"
              :options="optionsRecommendRecruitId"
              :showArrow="false"
            ></a-select>
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="communicate"
            label="企顾"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.recruitId"
              :options="optionsRecruitId"
              :showArrow="false"
            ></a-select>
          </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
        <a-button style="margin: 0 8px">清空</a-button>
        <a-button style="margin: 0 8px 0 0" @click="handleOpenMappingLvmhAdd">新增</a-button>
      </a-col>
      </a-row>
      </a-form>
  </div>
  <div>
    <a-table
      size="small"
      :dataSource="mappingLvmhList"
      :pagination="false"
      rowKey="key"
      :loading="tableLvmhLoading"
      :columns="columnsMappingLvmh"
    >
  </a-table>
    <a-row style="justify-content: end; margin-top: 10px">
          <a-pagination
            v-model:current="mappingLvmhPagination.current"
            :pageSize="mappingLvmhPagination.pageSize"
            @change="handleMappingLvmhData"
            :total="mappingLvmhPagination.total"
            :showSizeChanger="false"
            :showQuickJumper="true"
            :hideOnSinglePage="true"
            size="small"
            :show-total="(total) => `共 ${total} 条`"
          >
            <template #itemRender="{ type, originalElement }">
              <a v-if="type === 'prev'">上一页</a>
              <a v-else-if="type === 'next'">下一页</a>
              <component :is="originalElement" v-else></component>
            </template>
          </a-pagination>
        </a-row>
  </div>
  </a-drawer>
  <MappingLvmhAdd v-if="mappingLvmhAddFlag"/>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import MappingLvmhAdd from './MappingLvmhAdd.vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingLvmhList, tableLvmhLoading, mappingLvmhFlag, mappingLvmhPagination, mappingLvmhAddFlag} = storeToRefs(mappingListStore);
const drawerWidth = ref(1250);
let spanCol = 4;
const optionsRecommendRecruitId = ref([
    { label: '北京', value: '北京' },]);
const optionsRecruitId = ref([
    { label: '北京', value: '北京' },]);
interface SearchMappingLvmh {
  userName?: string;
  phone?: string;
  recommendRecruitId?: string;
  recruitId?: string;
}
const formState = ref<SearchMappingLvmh>({} as SearchMappingLvmh);
const columnsMappingLvmh = [
  {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 20,
      ellipsis: true,
    },
    {
      title: '品牌',
      dataIndex: 'brands',
      key: 'brands',
      width: 30,
      ellipsis: true,
    },
     {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 30,
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
      title: '学历',
      dataIndex: 'edu',
      key: 'edu',
      width: 25,
      ellipsis: true,
    },
     {
      title: '专业',
      dataIndex: 'major',
      key: 'major',
      width: 50,
      ellipsis: true,
    },
    {
      title: '行验',
      dataIndex: 'hangJingYan',
      key: 'hangJingYan',
      width: 20,
      ellipsis: true,
    },
    {
      title: '当验',
      dataIndex: 'brandJingYan',
      key: 'brandJingYan',
      width: 20,
      ellipsis: true,
    },
    {
      title: '工作地点',
      dataIndex: 'workPlace',
      key: 'workPlace',
      width: 30,
      ellipsis: true,
    },
    {
      title: '目前职位',
      dataIndex: 'positionName',
      key: 'positionName',
      width: 40,
      ellipsis: true,
    },
     {
      title: '电话/微信',
      dataIndex: 'phone',
      key: 'phone',
      width: 50,
      ellipsis: true,
    },
    {
      title: '工作1',
      dataIndex: 'workCity1',
      key: 'workCity1',
      width: 30,
      ellipsis: true,
    },
     {
      title: '工作2',
      dataIndex: 'workCity2',
      key: 'workCity2',
      width: 30,
      ellipsis: true,
    },
    {
      title: '工作3',
      dataIndex: 'workCity3',
      key: 'workCity3',
      width: 30,
      ellipsis: true,
    },
    {
      title: '曾工作',
      dataIndex: 'isLv',
      key: 'isLv',
      width: 25,
      ellipsis: true,
    },
     {
      title: '迁城市',
      dataIndex: 'isCity',
      key: 'isCity',
      width: 25,
      ellipsis: true,
    },
    {
      title: '顾问',
      dataIndex: 'createUser',
      key: 'createUser',
      width: 35,
      ellipsis: true,
    },
     {
      title: '日期',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 35,
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
const handleColseMappingLvmh = () => {
  mappingListStore.handleMappingLvmhFlag(); 
}
const onFinish = () => {
  mappingListStore.queryMappingLvmhList(formState.value);
}
onFinish();
const handleMappingLvmhData = (current) => {
    mappingLvmhPagination.value = { ...mappingLvmhPagination.value, current };
    onFinish();
}
const handleOpenMappingLvmhAdd = () => {
  mappingListStore.handleMappingLvmhAddFlag(); 
}
</script>
<style lang="less" scoped>
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
  }
  .resume-content-search .ant-form-item {
    margin-bottom: 10px !important;
  }
</style>