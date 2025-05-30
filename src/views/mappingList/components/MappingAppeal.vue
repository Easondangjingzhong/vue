<template>
    <a-drawer
    v-model:open="mappingAppealFlag"
    title="推荐申诉"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '10px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseMappingAppeal" />
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
      </a-col>
      </a-row>
      </a-form>
  </div>
  <div>
    <a-table
      size="small"
      :dataSource="mappingAppealList"
      :pagination="false"
      rowKey="key"
      :loading="tableAppealLoading"
      :columns="columnsMappingAppeal"
    >
   <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'appealType'">
        <a-tag v-if="record.appealType == '客户限制'" color="green">{{ record.appealType }}</a-tag>
        <a-tag v-if="record.appealType == '重复推荐'" color="red">{{ record.appealType }}</a-tag>
    </template>
   </template>
  </a-table>
    <a-row style="justify-content: end; margin-top: 10px">
          <a-pagination
            v-model:current="mappingAppealPagination.current"
            :pageSize="mappingAppealPagination.pageSize"
            @change="handleMappingAppealData"
            :total="mappingAppealPagination.total"
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
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingAppealList, tableAppealLoading, mappingAppealFlag, mappingAppealPagination} = storeToRefs(mappingListStore);
const drawerWidth = ref(1250);
let spanCol = 4;
const optionsRecommendRecruitId = ref([
    { label: '北京', value: '北京' },]);
const optionsRecruitId = ref([
    { label: '北京', value: '北京' },]);
interface SearchMappingAppeal {
  userName?: string;
  phone?: string;
  recommendRecruitId?: string;
  recruitId?: string;
}
const formState = ref<SearchMappingAppeal>({} as SearchMappingAppeal);
const columnsMappingAppeal = [
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
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      width: 40,
      ellipsis: true,
    },
     {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      width: 20,
      ellipsis: true,
    },
     {
      title: '品牌',
      dataIndex: 'rBrand',
      key: 'rBrand',
      width: 70,
      ellipsis: true,
    },
    {
      title: '商场',
      dataIndex: 'rMarket',
      key: 'rMarket',
      width: 60,
      ellipsis: true,
    },
    {
      title: '职位',
      dataIndex: 'rPositions',
      key: 'rPositions',
      width: 70,
      ellipsis: true,
    },
    {
      title: '企顾',
      dataIndex: 'rCounselor',
      key: 'rCounselor',
      width: 40,
      ellipsis: true,
    },
    {
      title: '	推顾',
      dataIndex: 'recommendCounselor',
      key: 'recommendCounselor',
      width: 40,
      ellipsis: true,
    },
     {
      title: '推时',
      dataIndex: 'newRecommendTime',
      key: 'newRecommendTime',
      width: 60,
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'appealType',
      key: 'appealType',
      width: 30,
      ellipsis: true,
    },
     {
      title: '审核状态',
      dataIndex: 'examineStatus',
      key: 'examineStatus',
      width: 30,
      ellipsis: true,
    },
    {
      title: '申诉原因',
      dataIndex: 'appealRemark',
      key: 'appealRemark',
      width: 30,
      ellipsis: true,
    },
    {
      title: '拒绝原因',
      dataIndex: 'refuseRemark',
      key: 'refuseRemark',
      width: 30,
      ellipsis: true,
    },
 ];
const handleColseMappingAppeal = () => {
  mappingListStore.handleMappingAppealFlag(); 
}
const onFinish = () => {
  mappingListStore.queryMappingAppealList(formState.value);
}
onFinish();
const handleMappingAppealData = (current) => {
    mappingAppealPagination.value = { ...mappingAppealPagination.value, current };
    onFinish();
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