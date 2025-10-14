<template>
<a-row :gutter="24">
  <a-col :span="24">
     <a-descriptions bordered size="small" :column="4">
        <template #title>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span>基本信息</span>
            <FormOutlined @click="handleComprehensiveBasicUpdate" style="cursor: pointer;"/>
          </div>
        </template>
      <a-descriptions-item label="中文">{{ outsourcePersonDetail.userNameCn }}</a-descriptions-item>
      <a-descriptions-item label="工号">{{ outsourcePersonDetail.jobNumber }}</a-descriptions-item>
      <a-descriptions-item label="手机">{{ outsourcePersonDetail.phoneNumber }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ outsourcePersonDetail.email }}</a-descriptions-item>
      
      <a-descriptions-item label="英文">{{ outsourcePersonDetail.userNameEn }}</a-descriptions-item>
      <a-descriptions-item label="公司">{{ outsourcePersonDetail.companyName }}</a-descriptions-item>
      <a-descriptions-item label="OFFER日期">{{ outsourcePersonDetail.offerTime }}</a-descriptions-item>
      <a-descriptions-item label="身份证">{{ outsourcePersonDetail.idCard }}</a-descriptions-item>

      <a-descriptions-item label="年龄">{{ outsourcePersonDetail.age }}</a-descriptions-item>
      <a-descriptions-item label="品牌">{{ outsourcePersonDetail.brand }}</a-descriptions-item>
      <a-descriptions-item label="预计入职">{{ outsourcePersonDetail.planEntryTime }}</a-descriptions-item>
      <a-descriptions-item label="无犯罪">{{ outsourcePersonDetail.noCriminal }}</a-descriptions-item>

      <a-descriptions-item label="性别">{{ outsourcePersonDetail.sex }}</a-descriptions-item>
      <a-descriptions-item label="店铺">{{ outsourcePersonDetail.market }}</a-descriptions-item>
      <a-descriptions-item label="实际入职">{{ outsourcePersonDetail.realEntryTime }}</a-descriptions-item>
      <a-descriptions-item label="信息表">{{ outsourcePersonDetail.infoTableFlag }}</a-descriptions-item>

      <a-descriptions-item label="城市">{{ outsourcePersonDetail.city }}</a-descriptions-item>
      <a-descriptions-item label="职位">{{ outsourcePersonDetail.positions }}</a-descriptions-item>
      <a-descriptions-item label="预计离职">{{ outsourcePersonDetail.planLeaveTime }}</a-descriptions-item>
      <a-descriptions-item label="OFFER">{{ outsourcePersonDetail.offerFlag }}</a-descriptions-item>
      
      <a-descriptions-item label="招聘">{{ outsourcePersonDetail.recruitParty }}</a-descriptions-item>
      <a-descriptions-item label="性质">{{ outsourcePersonDetail.jobType }}</a-descriptions-item>
      <a-descriptions-item label="实际离职">{{ outsourcePersonDetail.realLeaveTime }}</a-descriptions-item>
      <a-descriptions-item label="离职证明">{{ outsourcePersonDetail.proofFlag }}</a-descriptions-item>
    </a-descriptions>
  </a-col>
</a-row>
<a-row :gutter="24" style="margin-top: 10px;">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourcePersonByPhoneList"
      :pagination="false"
      :scroll="{ x: 1600 }"
    >
   <template #bodyCell="{ column, record }">
    <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '1'" color="orange">
      待入
    </a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '2'" color="green">
      在职
    </a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '3'" color="red">
      离职
    </a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '4'" color="red">
      未入
    </a-tag>
  </template>
  </a-table>
  </a-col>
</a-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FormOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonDetail, getOutsourcePersonByPhoneList} = storeToRefs(outsourceDetailStore);

const handleComprehensiveBasicUpdate = () => {
  outsourceDetailStore.handleComprehensiveBasicUpdate();
}

const columns = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 20,
  },
  {
    title: '中文姓名',
    dataIndex: 'userNameCn',
    key: 'userNameCn',
    fixed: 'left',
    width: 30,
    ellipsis: true,
  },
  {
    title: '英文姓名',
    dataIndex: 'userNameEn',
    key: 'userNameEn',
    fixed: 'left',
    width: 30,
    ellipsis: true,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    fixed: 'left',
    width: 20,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'currentStatus',
    key: 'currentStatus',
    fixed: 'left',
    width: 20,
    ellipsis: true,
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 40,
    ellipsis: true,
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
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
    title: '店铺',
    dataIndex: 'market',
    key: 'market',
    width: 50,
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'positions',
    key: 'positions',
    width: 70,
    ellipsis: true,
  },
  {
    title: '性质',
    dataIndex: 'jobType',
    key: 'jobType',
    width: 30,
    ellipsis: true,
  },
  {
    title: '招聘',
    dataIndex: 'recruitParty',
    key: 'recruitParty',
    width: 30,
    ellipsis: true,
  },
  {
    title: '推顾',
    dataIndex: 'enterprise',
    key: 'enterprise',
    width: 60,
    ellipsis: true,
  },
  {
    title: 'OFFER日期',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 40,
    ellipsis: true,
  },
  {
    title: '入职日期',
    dataIndex: 'realEntryTime',
    key: 'realEntryTime',
    width: 40,
    ellipsis: true,
  },
  {
    title: '预计离职',
    dataIndex: 'planLeaveTime',
    key: 'planLeaveTime',
    width: 40,
    ellipsis: true,
  },
  {
    title: '实际离职',
    dataIndex: 'realLeaveTime',
    key: 'realLeaveTime',
    width: 40,
    ellipsis: true,
  },
]
watch(() => outsourcePersonDetail.value.id, (newVal, oldVal) => {
  outsourceDetailStore.queryOutsourcePersonByPhone(outsourcePersonDetail.value.phoneNumber);
});
outsourceDetailStore.queryOutsourcePersonByPhone(outsourcePersonDetail.value.phoneNumber);

</script>

<style lang="less" scoped>
  :deep(.ant-descriptions .ant-descriptions-header) {
    margin-bottom: 10px;
  } 
  :deep(.ant-descriptions .ant-descriptions-item-label) {
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    font-weight: bold;
  }
  
  :deep(.ant-descriptions .ant-descriptions-item-content) {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>