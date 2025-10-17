<template>
  <div class="resume-content-search">
    <a-form :model="formStatePerson" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStatePerson.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
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
        <a-col :span="4">
          <a-form-item name="bId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.bId"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="positionId" label="职位">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePerson.positionId"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
         <a-col :span="6">
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
        </span>
        <span>
           <a-button @click="handleToAddOutsourcePerson" style="background-color: #eee" size="small">新增</a-button>
        </span>
    </a-row>
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="personIsLoading"
      :columns="columnsOutsourceDetail"
      :data-source="getOutsourcePersonList"
      :scroll="{ x: 2200 }"
    >
  <template #bodyCell="{ column, record }">
    <a v-if="column.key === 'userNameCn'" @click="handleOutsourcePersonDetail(record)">
      {{ record.userNameCn }}
    </a>
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

    <a-tag v-if="column.key === 'offerFlag' && record.offerFlag == '等待发起'" color="red">等待发起</a-tag>
    <a-tag v-if="column.key === 'offerFlag' && record.offerFlag == '已经发起'" color="orange">已经发起</a-tag>
    <a-tag v-if="column.key === 'offerFlag' && record.offerFlag == '签署完成'" color="green">签署完成</a-tag>
    <a-tag v-if="column.key === 'contractCompany' && record.contractCompany == '等待发起'" color="red">等待发起</a-tag>
    <a-tag v-if="column.key === 'contractCompany' && record.contractCompany == '已经发起'" color="orange">已经发起</a-tag>
    <a-tag v-if="column.key === 'contractCompany' && record.contractCompany == '签署完成'" color="green">签署完成</a-tag>

    <a-tag v-if="column.key === 'enterprise'" :title="record.enterprise">
      查看
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '1'" color="green">
      不缴
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '2'" color="green">
      待缴
    </a-tag>
     <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '3'" color="green">
      已缴
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '4'" color="red">
      待停
    </a-tag>
    <a-tag v-if="column.key === 'socialFlag' && record.socialFlag === '5'" color="red">
      已停
    </a-tag>

    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '1'" color="green">
      不缴
    </a-tag>
    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '2'" color="green">
      待缴
    </a-tag>
     <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '3'" color="green">
      已缴
    </a-tag>
    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '4'" color="red">
      待停
    </a-tag>
    <a-tag v-if="column.key === 'yijinFlag' && record.yijinFlag === '5'" color="red">
      已停
    </a-tag>

    <a-tag v-if="column.key === 'shangbaoFlag' && record.shangbaoFlag === '1'" color="green">
      缴纳
    </a-tag>
    <a-tag v-if="column.key === 'shangbaoFlag' && record.shangbaoFlag === '2'" color="red">
      不缴
    </a-tag>
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
  <NewJoinerPersonalInformationForm/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import NewJoinerPersonalInformationForm from '/@/views/outsourceDetail/components/personComponents/NewJoinerPersonalInformationForm.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { SearchPersonItem,OutsourcePersonItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { personIsLoading, formStatePerson, getOutsourcePersonList, pageOutsourcePersonList, getProvince, newJoinerPersonalInformationFlag} = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left' as const, width: 30, ellipsis: true,},
  { title: '中文姓名', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left' as const, width: 50, ellipsis: true,},
  { title: '英文姓名', dataIndex: 'userNameEn', key: 'userNameEn', fixed: 'left' as const, width: 50, ellipsis: true,},
  { title: '性别', dataIndex: 'sex', key: 'sex', fixed: 'left' as const, width: 30, ellipsis: true,},
  { title: '状态', dataIndex: 'currentStatus', key: 'currentStatus', fixed: 'left' as const, width: 30, ellipsis: true,},
  { title: '工号', dataIndex: 'jobNumber', key: 'jobNumber', fixed: 'left' as const, width: 35, ellipsis: true,},
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left' as const, width: 50, ellipsis: true,},
  { title: '品牌', dataIndex: 'brand', key: 'brand', fixed: 'left' as const, width: 60, ellipsis: true,},
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left' as const, width: 30, ellipsis: true,},
  { title: '店铺', dataIndex: 'market', key: 'market', fixed: 'left' as const, width: 80, ellipsis: true },
  { title: '职位', dataIndex: 'positions', key: 'positions', fixed: 'left' as const, width: 100, ellipsis: true },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left' as const, width: 40, ellipsis: true },
  { title: '招聘', dataIndex: 'recruitParty', key: 'recruitParty', width: 50, ellipsis: true },
  { title: '推企', dataIndex: 'enterprise', key: 'enterprise', width: 40, ellipsis: true,},
  { title: '信息表', dataIndex: 'infoTableFlag', key: 'infoTableFlag', width: 40, ellipsis: true,},
  { title: 'OFFER', dataIndex: 'offerFlag', key: 'offerFlag', width: 55, ellipsis: true,},
  { title: '薪资', dataIndex: 'salaryStructure', key: 'salaryStructure', width: 50, ellipsis: true,},
  { title: '合同签署', dataIndex: 'contractCompany', key: 'contractCompany', width: 55, ellipsis: true,},
  { title: '生效日期', dataIndex: 'startTime', key: 'startTime', width: 60, ellipsis: true,},
  { title: '终止日期', dataIndex: 'endTime', key: 'endTime', width: 60, ellipsis: true,},
  { title: '周期', dataIndex: 'contractPeriod', key: 'contractPeriod', width: 40, ellipsis: true,},
  { title: '预计入职', dataIndex: 'planEntryTime', key: 'planEntryTime', width: 60, ellipsis: true,},
  { title: '实际日期', dataIndex: 'realEntryTime', key: 'realEntryTime', width: 60, ellipsis: true,},
  { title: '预计离职', dataIndex: 'planLeaveTime', key: 'planLeaveTime', width: 60, ellipsis: true,},
  { title: '实际离职', dataIndex: 'realLeaveTime', key: 'realLeaveTime', width: 60, ellipsis: true,},
  { title: '证明', dataIndex: 'proofFlag', key: 'proofFlag', width: 30, ellipsis: true,},
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
      formStatePerson.value.currentStatus = status;
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
    newJoinerPersonalInformationFlag.value = true;
  }
  const handleOutsourcePersonDetail = (record) => {
    outsourceDetailStore.handleOutsourcePersonDetail(record as OutsourcePersonItem);
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