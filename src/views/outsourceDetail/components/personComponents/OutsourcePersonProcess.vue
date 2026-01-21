<template>
   <a-drawer
    v-model:open="outsourcePersonProcessFlag"
    title="入离流程"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
<a-row>
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourcePersonProcessList"
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
    <template v-if="column.key === 'xinXi'">
      <a-tag
        v-if="record.infoTableFlag === '信息待填'"
        :color="Number(record.infoTableEndTime) >= Date.now() ? 'orange' : 'red'"
      >
        信息表
      </a-tag>
      <a-tag v-else style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.infoTablePath,1)">信息表</a-tag>
    </template>
    
    <template v-if="column.key === 'xinZi'">
      <a-tag v-if="record.infoTableFlag !== '信息待填' && record.salaryStructure === null" color="orange" style="cursor: pointer;" @click="handleComprehensiveSalaryInfoUpdate(record)">薪资信息</a-tag>
      <a-tag v-else-if="record.salaryStructure !== null" color="green" style="cursor: pointer;" @click="handleOutsourcePersonDetail(record)">薪资信息</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">薪资信息</a-tag>
    </template>
    
    <template v-if="column.key === 'faQi'">
      <a-tag
        v-if="record.salaryStructure !== null && record.offerFlag === '等待发起'"
        :color="Number(record.offerEndTime) >= Date.now() ? 'orange' : 'red'"
        style="cursor: pointer;"
        @click="handleNewJoinerPersonalInformationForm(record)"
      >
        OFFER发起
      </a-tag>
      <a-tag v-else-if="record.offerFlag !== '等待发起'" color="green">OFFER发起</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">OFFER发起</a-tag>
    </template>
    
    <template v-if="column.key === 'qianShu'">
      <a-tag v-if="record.offerFlag === '等待签署'" color="orange">OFFER签署</a-tag>
      <a-tag v-else-if="record.offerFlag === '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.infoTablePath,1)">OFFER签署</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">OFFER签署</a-tag>
    </template>
    
    <template v-if="column.key === 'ruZhi'">
      <a-tag v-if="record.offerFlag === '签署完成' && record.currentStatus === '1'" color="orange" style="cursor: pointer;" @click="handleComprehensiveBasicUpdate(record)">入职信息</a-tag>
      <a-tag v-else-if="record.currentStatus !== '1'" color="green" style="cursor: pointer;" @click="handleOutsourcePersonDetail(record)">入职信息</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">入职信息</a-tag>
    </template>
    
    <template v-if="column.key === 'sheBao'">
      <a-tag v-if="record.currentStatus !== '1' && record.socialFlag === null" color="orange" style="cursor: pointer;" @click="handleComprehensiveSocialSecurityUpdate(record)">社保信息</a-tag>
      <a-tag v-else-if="record.socialFlag !== null" color="green" style="cursor: pointer;" @click="handleOutsourcePersonDetail(record)">社保信息</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">社保信息</a-tag>
    </template>
    
    <template v-if="column.key === 'heTong'">
      <a-tag
        v-if="!record.contractPeriod && record.currentStatus !== '1' && record.socialFlag !== null && record.contractCompany === '等待发起'"
        color="orange"
        style="cursor: pointer;"
        @click="handleAddPersonContractDetail(record)"
      >
        合同签署
      </a-tag>
      <a-tag
        v-if="record.contractPeriod && record.currentStatus !== '1' && record.socialFlag !== null && record.contractCompany === '等待发起'"
        :color="Number(record.contractEndTime) >= Date.now() ? 'orange' : 'red'"
        style="cursor: pointer;"
        @click="handleContractInfomationForm(record)"
      >
        合同签署
      </a-tag>
      <a-tag v-else-if="record.contractCompany === '等待签署'" color="red">合同签署</a-tag>
      <a-tag v-else-if="record.contractCompany === '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.contractPath,2)">合同签署</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">合同签署</a-tag>
    </template>
    
    <template v-if="column.key === 'liShen'">
      <a-tag v-if="record.contractCompany === '签署完成' && record.proofFlag === '等待发起'" color="orange" style="cursor: pointer;" @click="handleLeaveInfomationForm(record)">离申签署</a-tag>
      <a-tag v-else-if="record.proofFlag === '等待签署'" color="red">离申签署</a-tag>
      <a-tag v-else-if="record.proofFlag === '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.leavePath,3)">离申签署</a-tag>
      <a-tag v-else color="default" style="cursor: not-allowed;">离申签署</a-tag>
    </template>
    
    <a-tag v-if="column.key === 'xuQian' && record.isXuqian !== 1">续签信息</a-tag>
    <a-tag v-if="column.key === 'xuQian' && record.isXuqian === 1" color="orange">续签信息</a-tag>
    <a-tag v-if="column.key === 'liZhi' && record.isLizhi !== 1">离职信息</a-tag>
    <a-tag v-if="column.key === 'liZhi' && record.isLizhi === 1" color="orange">离职信息</a-tag>
    <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
    <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
  </template>
  </a-table>
</a-row>
<a-row style="justify-content: end; margin-top: 5px">
      <a-pagination
        v-model:current="pageOutsourcePersonProcessList.pageNumber"
        :pageSize="pageOutsourcePersonProcessList.pageSize"
        @change="handleOutsourcePersonListData"
        :total="pageOutsourcePersonProcessList.total"
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
   </a-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { formatToDate } from '/@/utils/dateUtil';
import { OutsourcePersonItem, OutsourceSalaryItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonProcessList,
   pageOutsourcePersonProcessList,
   outsourcePersonProcessFlag,
   newJoinerPersonalInformationFlag,
   outsourceSalaryForm,
   outsourceSalaryFlag,
   outsourcePersonDetail,
   contractInfomatiomFlag,
   LeaveInfomatiomFlag,
   } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.8));
const columns: TableColumnsType<any> = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 15,
  },
  {
    title: '中文名',
    dataIndex: 'userNameCn',
    key: 'userNameCn',
    width: 20,
    ellipsis: true,
  },
  {
    title: '英文名',
    dataIndex: 'userNameEn',
    key: 'userNameEn',
    width: 20,
    ellipsis: true,
  },
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
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
    width: 30,
    ellipsis: true,
  },
  // {
  //   title: '城市',
  //   dataIndex: 'city',
  //   key: 'city',
  //   width: 15,
  //   ellipsis: true,
  // },
  // {
  //   title: '店铺',
  //   dataIndex: 'market',
  //   key: 'market',
  //   width: 30,
  //   ellipsis: true,
  // },
  // {
  //   title: '职位',
  //   dataIndex: 'positions',
  //   key: 'positions',
  //   width: 50,
  //   ellipsis: true,
  // },
  {
    title: '性质',
    dataIndex: 'jobType',
    key: 'jobType',
    width: 20,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'xinXi',
    key: 'xinXi',
    width: 25,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'xinZi',
    key: 'xinZi',
    width: 25,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'faQi',
    key: 'faQi',
    width: 28,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'qianShu',
    key: 'qianShu',
    width: 28,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'ruZhi',
    key: 'ruZhi',
    width: 25,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'sheBao',
    key: 'sheBao',
    width: 25,
    ellipsis: true,
  },
   {
    title: '',
    dataIndex: 'heTong',
    key: 'heTong',
    width: 25,
    ellipsis: true,
  },
   {
    title: '',
    dataIndex: 'liShen',
    key: 'liShen',
    width: 25,
    ellipsis: true,
  },
   {
    title: '',
    dataIndex: 'xuQian',
    key: 'xuQian',
    width: 25,
    ellipsis: true,
  },
   {
    title: '',
    dataIndex: 'liZhi',
    key: 'liZhi',
    width: 25,
    ellipsis: true,
  },
]
const handleOutsourcePersonListData = () => {
  outsourceDetailStore.handleSearchOutsourcePersonProcess();
}
const handleClose = () => {
  outsourcePersonProcessFlag.value = false;
}
//发起OFFER
 const handleNewJoinerPersonalInformationForm = (record) => {
    newJoinerPersonalInformationFlag.value = true;
    outsourceDetailStore.handleNewJoinerPersonalInformationForm(record as OutsourcePersonItem);
  }
//薪资信息
const handleComprehensiveSalaryInfoUpdate = (record) => {
  outsourcePersonDetail.value = _.cloneDeep(record);
  outsourceDetailStore.queryOutsourceBankName();
  outsourceSalaryForm.value = {changeReason:'入职薪资',changeTime: record.planEntryTime ? formatToDate(record.planEntryTime) : ''} as OutsourceSalaryItem;
  outsourceSalaryFlag.value = true;
}
//入职信息
const handleComprehensiveBasicUpdate = (record) => {
  outsourcePersonDetail.value = _.cloneDeep(record);
  outsourceDetailStore.handleComprehensiveBasicUpdate();
}
//社保信息
const handleComprehensiveSocialSecurityUpdate = (record) => {
  outsourcePersonDetail.value = _.cloneDeep(record);
  outsourceDetailStore.addSocialSecurityInfo();
}
//新增合同信息
const handleAddPersonContractDetail = (record) => {
  outsourcePersonDetail.value = _.cloneDeep(record);
  outsourceDetailStore.handleAddPersonContract();
}
//合同信息
const handleContractInfomationForm = (record) => {
    contractInfomatiomFlag.value = true;
    outsourceDetailStore.handleContractInfomationForm(record as OutsourcePersonItem);
  }
  //离职申请
  const handleLeaveInfomationForm = (record) => {
    LeaveInfomatiomFlag.value = true;
    outsourceDetailStore.handleContractInfomationForm(record as OutsourcePersonItem);
  }
  //文件预览
   const handleFileYulanInfo = (originalPathBlobPath,type) => {
    if (!originalPathBlobPath) {
      message.error('文件不存在');
      return;
    }
    outsourceDetailStore.handleFileYulanInfo(originalPathBlobPath,type);
  }
  //个人信息查询
   const handleOutsourcePersonDetail = (record) => {
    outsourceDetailStore.handleOutsourcePersonDetail(record as OutsourcePersonItem);
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
