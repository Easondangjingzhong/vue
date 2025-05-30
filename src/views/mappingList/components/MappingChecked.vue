<template>
    <a-drawer
    v-model:open="mappingCheckedFlag"
    title="M审核"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '10px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseMappingChecked" />
    </template>
  <div class="resume-content-search">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
     <a-row :gutter="24">
      <a-col :span="5" class="row_col_space">
        <a-form-item
            name="year"
            label="日期"
            class="row_col_space_left"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.year"
              :options="optionsYear"
              :showArrow="false"
              @change="handleChangeYearMonth"
            ></a-select>
          </a-form-item>
           <a-form-item
            name="month"
            class="row_col_space_center"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.month"
              :options="optionsMonth"
               @change="handleChangeYearMonth"
              :showArrow="false"
            ></a-select>
          </a-form-item>
           <a-form-item
            name="weekNum"
            class="row_col_space_right"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.weekNum"
              :options="optionsWeekNum"
              :showArrow="false"
            ></a-select>
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="teamId"
            label="团队"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.teamId"
              :options="optionsTeam"
              :showArrow="false"
              @change="handleRecruitId"
            ></a-select>
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="recruitId"
            label="顾问"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.recruitId"
              :options="optionsRecruitId"
              :showArrow="false"
            ></a-select>
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="mappingCheckFlag"
            label="审态"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.mappingCheckFlag"
              :options="optionsCheckFlag"
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
      :dataSource="mappingCheckedList"
      :pagination="false"
      rowKey="key"
      :loading="tableCheckedLoading"
      :columns="columnsMappingChecked"
    >
  <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'jubStatus'">
        <a-tag v-if="record.jubStatus == '1'" color="green">在职</a-tag>
        <a-tag v-if="record.jubStatus == '2'" color="red">离职</a-tag>
    </template>
    <template v-if="column.key === 'mappingCheckFlag'">
        <a-tag v-if="record.mappingCheckFlag == '1'" color="green">通过</a-tag>
        <a-tag v-if="record.mappingCheckFlag == '3'" color="orange">待审</a-tag>
        <a-tag v-if="record.mappingCheckFlag == '4'" color="red" :title="record.mapinngCheckRemark">拒绝</a-tag>
        <a-tag v-if="record.mappingCheckFlag == '5'" color="red">超时</a-tag>
        <a-tag v-if="record.mappingCheckFlag == '6'" color="red" :title="record.mapinngCheckRemark">强制关闭</a-tag>
        <a-tag v-if="record.tongHua == '1'" color="red" :title="record.mapinngCheckRemark">超时</a-tag>
        <a-tag v-else color="red" :title="record.mapinngCheckRemark">超时</a-tag>
    </template>
    <template v-if="column.key === 'mappingTaskId'">
        <a-tag v-if="record.mappingTaskId" color="default">查看</a-tag>
    </template>
    <template v-if="column.key === 'action'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item  v-if="loginVueUser.loginId == record.recruitId && (loginVueUser.loginType =='A' || loginVueUser.loginType =='T' || loginVueUser.loginType =='V')">
                  <a href="javascript:;" @click="checkViolation(record)">M审核</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
   </template>
  </a-table>
    <a-row style="justify-content: end; margin-top: 10px">
          <a-pagination
            v-model:current="mappingCheckedPagination.current"
            :pageSize="mappingCheckedPagination.pageSize"
            @change="handleMappingCheckedData"
            :total="mappingCheckedPagination.total"
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
  <a-modal :maskClosable="false" @cancel="handleCloseCheckedResult" v-model:open="openCheckedResult" style="width: 600px;" title="Mapping审核" :footer="null">
          <a-row :gutter="24">
            <a-col :span="3">
              审核: 
            </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-select
              class="resumeName"
              style="width: 90%;"
              v-model:value="checkedResult"
              :options="optionsCheckedResult"
            ></a-select>
            </a-col>
          </a-row>
          <a-row :gutter="24" v-if="checkRemarkFlag">
            <a-col :span="3">
              原因: 
            </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-textarea
              :rows="7"
              style="white-space: pre-wrap"
              v-model:value="checkRemark"
            ></a-textarea>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="24" style="text-align: center;">
              <a-button size="small" @click="saveCheckViolation" type="primary">下载</a-button>
            </a-col>
          </a-row>
  </a-modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { currentDate } from '/@/utils/dateUtil';
import { message } from 'ant-design-vue';
import { CloseOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingCheckedList, tableCheckedLoading, mappingCheckedFlag, mappingCheckedPagination, weekNumArr, currentYearMonthWeek, teamArr, counselorArr} = storeToRefs(mappingListStore);
const drawerWidth = ref(1250);
let spanCol = 4;
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser'),
);
const formState = ref<SearchMappingChecked>({} as SearchMappingChecked);
const optionsTeam = ref([] as optionsLabelValue[]);
const handleTeamId = () => {
  mappingListStore.handleTeamId();
}
handleTeamId();
watch(teamArr, () => {
  optionsTeam.value = teamArr.value; 
})
const optionsRecruitId = ref([] as optionsLabelValue[]);
const handleRecruitId = () => {
  mappingListStore.handleCounselor(formState.value.teamId);
}
handleRecruitId();
watch(counselorArr, () => {
  optionsRecruitId.value = counselorArr.value;
})
const currentYear = Number(currentDate().split('-')[0]);
const currentMonth = currentDate().split('-')[1];
interface optionsLabelValue {
  label: string;
  value: string;
}
const optionsYear = ref([] as optionsLabelValue[]);
for (let i = 2023; i <= currentYear; i++) {
  optionsYear.value.push({ label: i+'年', value: i+'' });
}
const optionsMonth = ref([
    { label: '1月', value: '01' },
    { label: '2月', value: '02' },
    { label: '3月', value: '03' },
    { label: '4月', value: '04' },
    { label: '5月', value: '05' },
    { label: '6月', value: '06' },
    { label: '7月', value: '07' },
    { label: '8月', value: '08' },
    { label: '9月', value: '09' },
    { label: '10月', value: '10' },
    { label: '11月', value: '11' },
    { label: '12月', value: '12' },
  ]);
const optionsCheckFlag = ref([
    { label: '待审', value: '3' },
    { label: '通过', value: '1' },
    { label: '拒绝', value: '4' },
    { label: '超时', value: '5' },
  ]); 
const optionsWeekNum = ref([] as optionsLabelValue[]);
watch(weekNumArr, (newValue) => {
  optionsWeekNum.value = newValue;
})
const handleMappingCheckedWeekNum = (year,month) => {
  mappingListStore.queryCurrentWeekNum(year,month);
}
handleMappingCheckedWeekNum(currentYear,currentMonth);
const handleChangeYearMonth = () => {
  handleMappingCheckedWeekNum(formState.value.year,formState.value.month);
}
const handleMappingCheckedCurrentDate = (currentDateNew) => {
  mappingListStore.queryCurrentDate(currentDateNew);
}
handleMappingCheckedCurrentDate(currentDate());
watch(currentYearMonthWeek, (newValue) => {
  formState.value = {
    ...formState.value,
    year: newValue.year,
    month: newValue.month,
    weekNum: newValue.weekNum,
  };
  console.log(formState.value);
  onFinish();
})
interface SearchMappingChecked {
  teamId?: string;
  recruitId?: string;
  mappingCheckFlag?: string;
  year?: string;
  month?: string;
  weekNum?: string;
}

const columnsMappingChecked = [
  {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 20,
      ellipsis: true,
    },
    {
      title: '城市',
      dataIndex: 'place',
      key: 'place',
      width: 20,
      ellipsis: true,
    },
     {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
      width: 50,
      ellipsis: true,
    },
     {
      title: '楼层',
      dataIndex: 'floor',
      key: 'floor',
      width: 25,
      ellipsis: true,
    },
     {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 50,
      ellipsis: true,
    },
     {
      title: '姓名',
      dataIndex: 'allUserName',
      key: 'allUserName',
      width: 40,
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
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      width: 50,
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
      title: '添顾',
      dataIndex: 'counselor',
      key: 'counselor',
      width: 40,
      ellipsis: true,
    },
    {
      title: '团队',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 30,
      ellipsis: true,
    },
     {
      title: '添时',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 60,
      ellipsis: true,
    },
    {
      title: '提时',
      dataIndex: 'mappingUptime',
      key: 'mappingUptime',
      width: 60,
      ellipsis: true,
    },
     {
      title: '任务',
      dataIndex: 'mappingTaskId',
      key: 'mappingTaskId',
      width: 20,
      ellipsis: true,
    },
    {
      title: '审状',
      dataIndex: 'mappingCheckFlag',
      key: 'mappingCheckFlag',
      width: 50,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 30,
      ellipsis: true,
    },
 ];
const handleColseMappingChecked = () => {
  mappingListStore.handleMappingCheckedFlag(); 
}
const onFinish = () => {
  mappingListStore.queryMappingCheckedList(formState.value);
}
const handleMappingCheckedData = (current) => {
    mappingCheckedPagination.value = { ...mappingCheckedPagination.value, current };
    onFinish();
}
//审核mapping
const openCheckedResult = ref(false);
const checkedResult = ref('');
const checkRemark = ref('');
const cheeckedRecord = ref({});
const checkRemarkFlag = ref(false);
const optionsCheckedResult = ref([
  { label: '通过', value: '1' },
  { label: '拒绝', value: '4' },
])
const checkViolation = (record) => {
  cheeckedRecord.value = record;
  openCheckedResult.value = true;
  checkedResult.value = '';
  checkRemark.value = ''; 
}
const handleCloseCheckedResult = () => {
  openCheckedResult.value = false;
  checkedResult.value = '';
  checkRemark.value = '';
  cheeckedRecord.value = {};
}
const saveCheckViolation = () => {
  if(cheeckedRecord.value.teacherId) {
    const params = {
    id: cheeckedRecord.value.id,
    studentId: cheeckedRecord.value.recruitId,
    studentName: cheeckedRecord.value.counselor,
    mappingCheckFlag: checkedResult.value,
    mapinngCheckRemark: checkRemark.value,
    } 
    mappingListStore.saveCheckViolationStudent(params).then((res) => {
      if (res.code == 1) {
        handleCloseCheckedResult();
        onFinish(); 
        message.success('操作成功');
      } else {
        message.success('操作失败');
      }
    })
  } else {
    const params = {
    id: cheeckedRecord.value.id,
    mappingCheckFlag: checkedResult.value,
    mapinngCheckRemark: checkRemark.value,
    } 
    mappingListStore.saveCheckViolation(params).then((res) => {
      if (res.code == 1) {
        handleCloseCheckedResult();
        onFinish(); 
        message.success('操作成功');
      } else {
        message.success('操作失败');
      }
    })
  }
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
  :deep(.row_col_space) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  :deep(.row_col_space_right) {
    width: 50%;
  }
  :deep(.row_col_space_right .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    height: auto;
  }
  :deep(.row_col_space_right .ant-select-selection-overflow-item-rest) {
    display: none;
  }
  :deep(.row_col_space_left) {
    width: 80%;
    margin-inline-end: -1px;
  }
  
  :deep(.row_col_space_left .ant-form-item-row .ant-form-item-label) {
    display: contents;
  }
  :deep(.row_col_space_left .ant-select-selector) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    height: auto;
  }
  :deep(.row_col_space_center) {
    width: 50%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_center .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    height: auto;
  }
</style>