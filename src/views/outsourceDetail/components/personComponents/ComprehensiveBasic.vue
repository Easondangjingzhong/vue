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
      <a-descriptions-item label="中文">{{ outsourcePersonDetail.userNameCn ? outsourcePersonDetail.userNameCn : "-" }}</a-descriptions-item>
      <a-descriptions-item label="工号">{{ outsourcePersonDetail.jobNumber ? outsourcePersonDetail.jobNumber : "-" }}</a-descriptions-item>
      <a-descriptions-item label="手机">{{ outsourcePersonDetail.phoneNumber ? outsourcePersonDetail.phoneNumber : "-" }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ outsourcePersonDetail.email ? outsourcePersonDetail.email : "-" }}</a-descriptions-item>
      
      <a-descriptions-item label="英文">{{ outsourcePersonDetail.userNameEn ? outsourcePersonDetail.userNameEn : "-" }}</a-descriptions-item>
      <a-descriptions-item label="公司">{{ outsourcePersonDetail.companyName ? outsourcePersonDetail.companyName : "-" }}</a-descriptions-item>
      <a-descriptions-item label="OFFER日期">{{ outsourcePersonDetail.offerTime ? outsourcePersonDetail.offerTime : "-" }}</a-descriptions-item>
      <a-descriptions-item label="身份证">{{ outsourcePersonDetail.idCard ? outsourcePersonDetail.idCard : "-" }}</a-descriptions-item>

      <a-descriptions-item label="年龄">{{ outsourcePersonDetail.age ? outsourcePersonDetail.age : "-" }}</a-descriptions-item>
      <a-descriptions-item label="品牌">{{ outsourcePersonDetail.brand ? outsourcePersonDetail.brand : "-" }}</a-descriptions-item>
      <a-descriptions-item label="预计入职">{{ outsourcePersonDetail.planEntryTime ? outsourcePersonDetail.planEntryTime : "-" }}</a-descriptions-item>
      <a-descriptions-item label="无犯罪">{{ outsourcePersonDetail.criminalRecord ? (outsourcePersonDetail.criminalRecord == '否' ? '无' : '有') : "-" }}</a-descriptions-item>

      <a-descriptions-item label="性别">{{ outsourcePersonDetail.sex ? outsourcePersonDetail.sex : "-"  }}</a-descriptions-item>
      <a-descriptions-item label="店铺">{{ outsourcePersonDetail.market ? outsourcePersonDetail.market : "-"  }}</a-descriptions-item>
      <a-descriptions-item label="实际入职">{{ outsourcePersonDetail.realEntryTime ? outsourcePersonDetail.realEntryTime : "-"  }}</a-descriptions-item>
      <a-descriptions-item label="信息表">
        <a-tag v-if="outsourcePersonDetail.infoTableFlag == '信息待填'" style="cursor: pointer;" color="red">信息待填</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.infoTableFlag == '等待发起'" style="cursor: pointer;" color="red">信息已填</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.infoTableFlag == '等待签署'" color="orange">等待签署</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.infoTableFlag == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(outsourcePersonDetail.infoTablePath)">签署完成</a-tag>
        <span v-else>-</span>
      </a-descriptions-item>

      <a-descriptions-item label="城市">{{ outsourcePersonDetail.city ? outsourcePersonDetail.city : "-"  }}</a-descriptions-item>
      <a-descriptions-item label="职位">{{ outsourcePersonDetail.positions ? outsourcePersonDetail.positions : "-"  }}</a-descriptions-item>
      <a-descriptions-item label="预计离职">{{ outsourcePersonDetail.planLeaveTime ? outsourcePersonDetail.planLeaveTime : "-"  }}</a-descriptions-item>
      <a-descriptions-item label="OFFER">
        <a-tag v-if="outsourcePersonDetail.offerFlag == '等待发起'" color="red">等待发起</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.offerFlag == '等待签署'" color="orange">等待签署</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.offerFlag == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(outsourcePersonDetail.offerPic)">签署完成</a-tag>
        <span v-else>-</span>
      </a-descriptions-item>
      
      <a-descriptions-item label="招聘">{{ outsourcePersonDetail.recruitParty  ? outsourcePersonDetail.recruitParty : "-" }}</a-descriptions-item>
      <a-descriptions-item label="性质">
        <a-tag v-if="outsourcePersonDetail.jobType == '兼职'" color="orange">兼职</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.jobType == '全职'" color="green">全职</a-tag>
        <a-tag v-else>-</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="实际离职">{{ outsourcePersonDetail.realLeaveTime  ? outsourcePersonDetail.realLeaveTime : "-" }}</a-descriptions-item>
      <a-descriptions-item label="离职证明">
        <a-tag v-if="outsourcePersonDetail.proofFlag == '等待发起'" color="red">等待发起</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.proofFlag == '已经发起'" color="orange">已经发起</a-tag>
        <a-tag v-else-if="outsourcePersonDetail.proofFlag == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(outsourcePersonDetail.leavePath)">签署完成</a-tag>
        <span v-else>-</span>
      </a-descriptions-item>
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
    <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
    <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
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
    width: 15,
  },
  // {
  //   title: '中文姓名',
  //   dataIndex: 'userNameCn',
  //   key: 'userNameCn',
  //   fixed: 'left',
  //   width: 20,
  //   ellipsis: true,
  // },
  // {
  //   title: '英文姓名',
  //   dataIndex: 'userNameEn',
  //   key: 'userNameEn',
  //   fixed: 'left',
  //   width: 20,
  //   ellipsis: true,
  // },
  // {
  //   title: '性别',
  //   dataIndex: 'sex',
  //   key: 'sex',
  //   fixed: 'left',
  //   width: 10,
  //   ellipsis: true,
  // },
  {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 25,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'currentStatus',
    key: 'currentStatus',
    width: 20,
    ellipsis: true,
  },
  // {
  //   title: '品牌',
  //   dataIndex: 'brand',
  //   key: 'brand',
  //   width: 30,
  //   ellipsis: true,
  // },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    width: 15,
    ellipsis: true,
  },
  {
    title: '店铺',
    dataIndex: 'market',
    key: 'market',
    width: 30,
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'positions',
    key: 'positions',
    width: 50,
    ellipsis: true,
  },
  {
    title: '性质',
    dataIndex: 'jobType',
    key: 'jobType',
    width: 20,
    ellipsis: true,
  },
  {
    title: '招聘',
    dataIndex: 'recruitParty',
    key: 'recruitParty',
    width: 20,
    ellipsis: true,
  },
  {
    title: '推顾/企顾',
    dataIndex: 'enterprise',
    key: 'enterprise',
    width: 50,
    ellipsis: true,
  },
  {
    title: 'OFFER日期',
    dataIndex: 'offerTime',
    key: 'offerTime',
    width: 30,
    ellipsis: true,
  },
  {
    title: '入职日期',
    dataIndex: 'realEntryTime',
    key: 'realEntryTime',
    width: 30,
    ellipsis: true,
  },
  {
    title: '预计离职',
    dataIndex: 'planLeaveTime',
    key: 'planLeaveTime',
    width: 30,
    ellipsis: true,
  },
  {
    title: '实际离职',
    dataIndex: 'realLeaveTime',
    key: 'realLeaveTime',
    width: 30,
    ellipsis: true,
  },
]
watch(() => outsourcePersonDetail.value.id, () => {
  outsourceDetailStore.queryOutsourcePersonByPhone(outsourcePersonDetail.value.phoneNumber);
});
outsourceDetailStore.queryOutsourcePersonByPhone(outsourcePersonDetail.value.phoneNumber);
const handleFileYulanInfo = (originalPathBlobPath) => {
  outsourceDetailStore.handleFileYulanInfo(originalPathBlobPath);
}
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