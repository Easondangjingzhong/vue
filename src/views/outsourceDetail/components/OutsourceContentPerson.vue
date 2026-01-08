<template>
  <div class="resume-content-search">
    <a-form :model="formStatePerson" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="3">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStatePerson.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.city"
              :options="getProvince"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.companyName"
              :options="getOutsourceCompanyAll"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="bId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.bId"
              :options="getOutsourceBrand"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="positionId" label="职位">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.positionId"
              :options="getOutsourcePosition"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="jobType" label="性质">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.jobType"
              :showArrow="false"
              showSearch
              allowClear
            >
              <a-select-option value="兼职">兼职</a-select-option>
              <a-select-option value="全职">全职</a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
         <a-col :span="4">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume-content">
    <a-row style="justify-content: space-between;margin-bottom: 5px;">
        <span>
          <a-button @click="handleSearchOutsourcePerson('2')" :class="{'active': formStatePerson.currentStatus === '2'}" style="margin-right: 5px;" size="small">在职</a-button>
          <a-button @click="handleSearchOutsourcePerson('3')" :class="{'active': formStatePerson.currentStatus === '3'}" style="margin-right: 5px;" size="small">离职</a-button>
          <a-button @click="handleSearchOutsourcePerson('1')" :class="{'active': formStatePerson.currentStatus === ''}" style="margin-right: 5px;" size="small">全部</a-button>
          <a-button @click="handleSearchOutsourcePerson('4')" :class="{'active': formStatePerson.companyArrange === '1'}" style="margin-right: 5px;" size="small" title="按公司排序">排序</a-button>
          <a-button @click="handleSearchOutsourcePerson('5')" :class="{'active': formStatePerson.currentStatus === '4'}" style="margin-right: 5px;" size="small">未入</a-button>
          <a-button @click="handleSearchOutsourcePersonProcess()" style="margin-right: 5px;" size="small">入离流程</a-button>
        </span>
        <span>
           <a-button @click="handleToAddOutsourcePerson" style="background-color: #eee" size="small">新增</a-button>
        </span>
    </a-row>
    <a-row>
    <a-table
      size="small"
      rowKey="key"
      :pagination="false"
      :loading="personIsLoading"
      :columns="columnsOutsourceDetail"
      :data-source="getOutsourcePersonList"
      :scroll="{ x: 2300 }"
    >
  <template #bodyCell="{ column, record }">
    <a v-if="column.key === 'userNameCn'">
      <a-popover placement="topLeft">
      <template #content>
        <a-button size="small" @click="handleOutsourcePersonToResume(record)">简历跳转</a-button>
        <a-button size="small" style="margin-left: 5px;" @click="handleOutsourcePersonDetail(record)">个人信息</a-button>
      </template>
      {{ record.userNameCn }}
      </a-popover>  
    </a>
    <a-tag v-if="column.key === 'salaryStructure' && record.salaryStructure === '0.00/月'" color="orange">
      待录
    </a-tag>
    <a-tag v-if="column.key === 'jobType' && record.jobType === '兼职'" color="orange">
      兼职
    </a-tag>
     <a-tag v-if="column.key === 'jobType' && record.jobType === '全职'" color="green">
      全职
    </a-tag>
    <a-tag v-if="column.key === 'jobType' && !record.jobType">
      待录
    </a-tag>
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
    <a-tag v-if="column.key === 'infoTableFlag' && record.infoTableFlag == '信息待填'" style="cursor: pointer;" color="red">信息待填</a-tag>
    <a-tag v-if="column.key === 'infoTableFlag' && record.infoTableFlag == '等待发起'" style="cursor: pointer;" color="red" @click="handleNewJoinerPersonalInformationForm(record)">信息已填</a-tag>
    <a-tag v-if="column.key === 'infoTableFlag' && record.infoTableFlag == '等待签署'" color="orange">等待签署</a-tag>
    <a-tag v-if="column.key === 'infoTableFlag' && record.infoTableFlag == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.infoTablePath)">签署完成</a-tag>
    <a-tag v-if="column.key === 'offerFlag' && record.offerFlag == '等待发起'" color="red">等待发起</a-tag>
    <a-tag v-if="column.key === 'offerFlag' && record.offerFlag == '等待签署'" color="orange">等待签署</a-tag>
    <a-tag v-if="column.key === 'offerFlag' && record.offerFlag == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.offerPic)">签署完成</a-tag>
    <a-tag v-if="column.key === 'contractCompany' && record.contractCompany == '等待发起'" style="cursor: pointer;" color="red" @click="handleContractInfomationForm(record)">{{ record.currentStatus === '1' ? "未到发起" : "等待发起"}}</a-tag>
    <a-tag v-if="column.key === 'contractCompany' && record.contractCompany == '等待签署'" color="orange">等待签署</a-tag>
    <a-tag v-if="column.key === 'contractCompany' && record.contractCompany == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.contractPath)">签署完成</a-tag>

    <a-tag v-if="column.key === 'proofFlag' && record.proofFlag == '等待发起'" color="red" style="cursor: pointer;" @click="handleLeaveInfomationForm(record)">等待发起</a-tag>
    <a-tag v-if="column.key === 'proofFlag' && record.proofFlag == '已经发起'" color="orange">已经发起</a-tag>
    <a-tag v-if="column.key === 'proofFlag' && record.proofFlag == '签署完成'" style="cursor: pointer;" color="green" @click="handleFileYulanInfo(record.leavePath)">签署完成</a-tag>

    <a-tag v-if="column.key === 'enterprise'" :title="record.enterprise">
      查看
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '1'" color="red">
      不缴
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '2'" color="orange">
      待缴
    </a-tag>
     <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '3'" color="green">
      已缴
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '4'" color="orange">
      待停
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '5'" color="red">
      已停
    </a-tag>

    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '1'" color="red">
      不缴
    </a-tag>
    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '2'" color="orange">
      待缴
    </a-tag>
     <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '3'" color="green">
      已缴
    </a-tag>
    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '4'" color="orange">
      待停
    </a-tag>
    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '5'" color="red">
      已停
    </a-tag>

    <a-tag v-if="column.key === 'shangbaoFlag' && record.shangbaoFlag === '2'" color="green">
      缴纳
    </a-tag>
    <a-tag v-if="column.key === 'shangbaoFlag' && record.shangbaoFlag === '1'" color="red">
      不缴
    </a-tag>

    <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
    <span v-if="(typeof column.dataIndex === 'string' && column.key !== 'jobType' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
  </template>
  </a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 5px">
      <a-pagination
        v-model:current="pageOutsourcePersonList.pageNumber"
        :pageSize="pageOutsourcePersonList.pageSize"
        @change="handleOutsourcePersonListData"
        :total="pageOutsourcePersonList.total"
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
  <FileYuLanInfo/>
  <AddOutsourcePerson/>
  <LeaveInfomationForm/>
  <ContractInfomationForm/>
  <NewJoinerPersonalInformationForm/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { handleToResumeDetails } from '/@/router/index';
import type { TableColumnsType } from 'ant-design-vue';
import FileYuLanInfo from '/@/views/outsourceDetail/components/personComponents/FileYuLanInfo.vue';
import AddOutsourcePerson from '/@/views/outsourceDetail/components/AddOutsourcePerson.vue';
import LeaveInfomationForm from '/@/views/outsourceDetail/components/personComponents/LeaveInfomationForm.vue'
import ContractInfomationForm from '/@/views/outsourceDetail/components/personComponents/ContractInfomationForm.vue'
import NewJoinerPersonalInformationForm from '/@/views/outsourceDetail/components/personComponents/NewJoinerPersonalInformationForm.vue'
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { SearchPersonItem,OutsourcePersonItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { 
  personIsLoading, 
  formStatePerson, 
  getOutsourcePersonList, 
  pageOutsourcePersonList, 
  getProvince, 
  getOutsourceBrand, 
  getOutsourceCompanyAll, 
  getOutsourcePosition, 
  addOutsourcePersonFlag, 
  newJoinerPersonalInformationFlag,
  contractInfomatiomFlag,
  LeaveInfomatiomFlag
} = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail: TableColumnsType = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left', width: 30, ellipsis: true,},
  { title: '中文', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left', width: 40, ellipsis: true,},
  { title: '英文', dataIndex: 'userNameEn', key: 'userNameEn', fixed: 'left', width: 40, ellipsis: true,},
  { title: '性别', dataIndex: 'sex', key: 'sex', fixed: 'left', width: 30, ellipsis: true,},
  { title: '状态', dataIndex: 'currentStatus', key: 'currentStatus', fixed: 'left', width: 30, ellipsis: true,},
  { title: '工号', dataIndex: 'jobNumber', key: 'jobNumber', fixed: 'left', width: 35, ellipsis: true,},
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 50, ellipsis: true,},
  { title: '品牌', dataIndex: 'brand', key: 'brand', fixed: 'left', width: 60, ellipsis: true,},
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left', width: 30, ellipsis: true,},
  { title: '店铺', dataIndex: 'market', key: 'market', fixed: 'left', width: 80, ellipsis: true },
  { title: '职位', dataIndex: 'positions', key: 'positions', fixed: 'left', width: 100, ellipsis: true },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left', width: 40 },
  { title: '招聘', dataIndex: 'recruitParty', key: 'recruitParty', width: 50, ellipsis: true },
  { title: '推企', dataIndex: 'enterprise', key: 'enterprise', width: 40,},
  { title: '信息表', dataIndex: 'infoTableFlag', key: 'infoTableFlag', width: 55,},
  { title: 'OFFER', dataIndex: 'offerFlag', key: 'offerFlag', width: 55,},
  { title: '薪资', dataIndex: 'salaryStructure', key: 'salaryStructure', width: 55, ellipsis: true,},
  { title: '合同签署', dataIndex: 'contractCompany', key: 'contractCompany', width: 55,},
  { title: '离申', dataIndex: 'proofFlag', key: 'proofFlag', width: 55,},
  { title: '生效日期', dataIndex: 'startTime', key: 'startTime', width: 60, ellipsis: true,},
  { title: '终止日期', dataIndex: 'endTime', key: 'endTime', width: 60, ellipsis: true,},
  { title: '周期', dataIndex: 'contractPeriod', key: 'contractPeriod', width: 40, ellipsis: true,},
  { title: '预计入职', dataIndex: 'planEntryTime', key: 'planEntryTime', width: 60, ellipsis: true,},
  { title: '实际入职', dataIndex: 'realEntryTime', key: 'realEntryTime', width: 60, ellipsis: true,},
  { title: '预计离职', dataIndex: 'planLeaveTime', key: 'planLeaveTime', width: 60, ellipsis: true,},
  { title: '实际离职', dataIndex: 'realLeaveTime', key: 'realLeaveTime', width: 60, ellipsis: true,},
  { title: '社保', dataIndex: 'socialFlag', key: 'socialFlag', width: 30, ellipsis: true,},
  { title: '一金', dataIndex: 'yijinFlag', key: 'yijinFlag', width: 30, ellipsis: true,},
  { title: '商保', dataIndex: 'shangbaoFlag', key: 'shangbaoFlag', width: 30, ellipsis: true,},
  { title: '缴纳单位', dataIndex: 'socialCompany', key: 'socialCompany', width: 50, ellipsis: true,},
  { title: '预缴年月', dataIndex: 'paymentYearMonth', key: 'paymentYearMonth', width: 50, ellipsis: true,},
  { title: '预停年月', dataIndex: 'preStopYearMonth', key: 'preStopYearMonth', width: 50, ellipsis: true,},
  { title: '工作地', dataIndex: 'workCity', key: 'workCity', width: 40, ellipsis: true,},
  { title: '社保地', dataIndex: 'socialCity', key: 'socialCity', width: 40, ellipsis: true,},
  { title: '个税地', dataIndex: 'taxCity', key: 'taxCity', width: 40, ellipsis: true,},
  { title: '年假', dataIndex: 'annualLeave', key: 'annualLeave', width: 30, ellipsis: true,},
  { title: '已休', dataIndex: 'annualLeaveUsed', key: 'annualLeaveUsed', width: 30, ellipsis: true,},
  { title: '剩余', dataIndex: 'annualLeaveBalance', key: 'annualLeaveBalance', width: 30, ellipsis: true,},
];
  const handleSearchOutsourcePerson = (status) => {
    if (status != '4') {
      if (status == '5') {
        formStatePerson.value.currentStatus = '4';
      } else {
        formStatePerson.value.currentStatus = status;
      }
    } else {
      formStatePerson.value.companyArrange = '1';
    }
    onSearch();
  }
 const clearFromState = () => {
    formStatePerson.value = {currentStatus: '2',} as SearchPersonItem;
 }
  const onSearch = () => {
    pageOutsourcePersonList.value = {
      ...pageOutsourcePersonList.value,
      pageNumber: 1,
    }
    outsourceDetailStore.queryOutsourcePerson();
  }
  const handleOutsourcePersonListData = () => {
    outsourceDetailStore.queryOutsourcePerson();
  }
  onSearch();
  const handleToAddOutsourcePerson = () => {
    addOutsourcePersonFlag.value = true;
  }
  const handleOutsourcePersonDetail = (record) => {
    outsourceDetailStore.handleOutsourcePersonDetail(record as OutsourcePersonItem);
  }
  const handleOutsourcePersonToResume = (record) => {
    handleToResumeDetails(record.resumeId, '');
  }
  const handleNewJoinerPersonalInformationForm = (record) => {
    newJoinerPersonalInformationFlag.value = true;
    outsourceDetailStore.handleNewJoinerPersonalInformationForm(record as OutsourcePersonItem);
  }
  const handleContractInfomationForm = (record) => {
    contractInfomatiomFlag.value = true;
    outsourceDetailStore.handleContractInfomationForm(record as OutsourcePersonItem);
  }
  const handleLeaveInfomationForm = (record) => {
    LeaveInfomatiomFlag.value = true;
    outsourceDetailStore.handleContractInfomationForm(record as OutsourcePersonItem);
  }
  const handleFileYulanInfo = (originalPathBlobPath) => {
    outsourceDetailStore.handleFileYulanInfo(originalPathBlobPath);
  }
  const handleSearchOutsourcePersonProcess = () => {
    outsourceDetailStore.handleSearchOutsourcePersonProcess();
  }
</script>

<style lang="less" scoped>
  .active {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  .tag {
    cursor: pointer;
  }
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
  :deep(.ant-pagination-prev){
    padding-right: 5px;
  }
  :deep(.ant-pagination-next){
    padding-left: 5px;
  }
</style>