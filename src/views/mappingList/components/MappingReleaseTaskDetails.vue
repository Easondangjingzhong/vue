<template>
  <a-modal :maskClosable="false" @cancel="handleCloseReleaseTask" v-model:open="mappingReleaseTaskDetailsFlagShow" style="width: 1200px;" :title="releaseTaskTitle" :footer="null">
      <a-row :gutter="24">
        <a-table
        size="small"
      :dataSource="releaseTaskList"
      :pagination="false"
      rowKey="key"
      :loading="tableReleaseTaskLoading"
      :columns="columnsReleaseTask"
        >
       <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'jobStatus'">
        <a-tag v-if="record.jobStatus === '开放(急)'" color="red">开放1级</a-tag>
        <a-tag v-else-if="record.jobStatus === '开放(普)'" color="orange">开放2级</a-tag>
        <a-tag v-else-if="record.jobStatus === '开放(缓)'" color="default">暂缓</a-tag>
        <a-tag v-else color="default">{{ record.jobStatus }}</a-tag>
        </template>
    <template v-if="column.key === 'createTimePostion'">
        <a-tag color="default" :title="record.createTimePostion">查看</a-tag>
    </template>
    <template v-if="column.key === 'mappingTarget'">
        <span v-if="record.updateMappingRemark" style="background: linear-gradient(225deg, #f80202 13%, transparent 0);padding-right: 5px;" :title="record.updateMappingRemark">{{ record.mappingTarget }}</span>
    </template>
     <template v-if="column.key === 'updateTimePosition'">
        <a-tag color="default" :title="record.updateTimePosition">查看</a-tag>
    </template>
    <template v-if="column.key === 'createTime'">
        <a-tag color="default" :title="record.createTime">查看</a-tag>
    </template>
    <template v-if="column.key === 'action'">
        <span v-if="props.releaseTaskRecord.id && ((record.mappingTarget && record.mappingTarget > 0) || (record.updateMappingTarget && record.updateMappingTarget > 0))">
          <span v-if="props.releaseTaskRecord.mappingTaskId == record.id">
            <a-tag color="green">已关</a-tag>
            <svg style="vertical-align: bottom;cursor: pointer;" v-if="props.releaseTaskRecord.mappingCheckFlag == 3" title="撤销M任务" @click="handleCancleCandidateApplyCheck(props.releaseTaskRecord.id,record.id)" t="1748932405758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4611" width="16" height="16"><path d="M863.146667 93.866667h-682.666667c-28.16 0-51.2 23.04-51.2 51.2v733.866666c0 28.16 23.04 51.2 51.2 51.2h256c18.773333 0 34.133333-15.36 34.133333-34.133333s-15.36-34.133333-34.133333-34.133333h-238.933333V162.133333h648.533333v290.133334c0 18.773333 15.36 34.133333 34.133333 34.133333s34.133333-15.36 34.133334-34.133333V145.066667c0-28.16-22.613333-51.2-51.2-51.2z" fill="#bfbfbf" p-id="4612"></path><path d="M344.32 663.893333c-13.226667-13.226667-13.226667-34.986667 0-48.213333l132.693333-132.693333c13.226667-13.226667 34.986667-13.226667 48.213334 0 13.226667 13.226667 13.226667 34.986667 0 48.213333L392.533333 663.893333a33.493333 33.493333 0 0 1-48.213333 0z" fill="#bfbfbf" p-id="4613"></path><path d="M344.32 615.68c13.226667-13.226667 34.986667-13.226667 48.213333 0l132.693334 132.693333c13.226667 13.226667 13.226667 34.986667 0 48.213334-13.226667 13.226667-34.986667 13.226667-48.213334 0l-132.693333-132.693334c-13.226667-13.226667-13.226667-34.56 0-48.213333z" fill="#bfbfbf" p-id="4614"></path><path d="M863.146667 605.866667l-494.933334-0.426667c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334l477.866667 0.426666v187.733334h-230.826667c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h247.893334c28.16 0 51.2-23.04 51.2-51.2v-221.866666c0-28.16-22.613333-51.2-51.2-51.2z" fill="#bfbfbf" p-id="4615"></path></svg>
          </span>
          <span v-else>
             <a-tag @click="handleOpenApplyCheckFlag(props.releaseTaskRecord.id,record.id)" style="color: #fff;background: #f0ad4e;border-color: #eea236;cursor: pointer;" v-if="!props.releaseTaskRecord.mappingTaskId || (props.releaseTaskRecord.mappingUptime && calcMappingUptime(props.releaseTaskRecord.mappingUptime))" color="default">关联</a-tag>
          </span>
        </span>
    </template>
   </template>
      </a-table>
      </a-row>   
  </a-modal>
  <a-modal v-model:open="openApplyCheckFlag" title="任务关联" @ok="handleSaveApplyCheck">
      <p>请确认以下信息：</p>
      <p>1、人才基础信息（中文或英文姓名、职位、电话、品牌、在职与否、Office或店铺类别）必须完整准确真实；</p>
      <p>2、人才当前职位、品牌必须填写最近一份工作；</p>
      <p>3、公司将定期抽查，违反要求提交的Mapping将被强制关闭。</p>
  </a-modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { currentDate } from '/@/utils/dateUtil';
import { Modal } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingReleaseTaskDetailsFlag,currentYearMonthWeek,releaseTaskList,tableReleaseTaskLoading,searchMappingCandidate,mappingTaskId} = storeToRefs(mappingListStore);
const props = defineProps({
  releaseTaskRecord: {
    type: Object,
    default: () => ({}),
    required: false,
  }
})
//发布任务
const releaseTaskTitle = ref('');
const handleCloseReleaseTask = () => {
  mappingListStore.handleRecommendReleaseTaskDetailsFlag();
}
const queryRecommendReleaseTaskDetails = () => {
  if (mappingTaskId.value) {
      releaseTaskTitle.value = "本周任务";
      mappingListStore.queryRecommendReleaseTaskDetailsById(mappingTaskId.value);
  } else {
      releaseTaskTitle.value = `本周任务 - ${props.releaseTaskRecord?.userName}`;
      mappingListStore.queryCurrentDate(currentDate());
  }
 
}
queryRecommendReleaseTaskDetails();
watch(currentYearMonthWeek,()=>{
 const params = {
    pageNumber: 1,
    year: currentYearMonthWeek.value?.year,
    month: currentYearMonthWeek.value?.month,
    weekNum: currentYearMonthWeek.value?.weekNum,
    recruitId: props.releaseTaskRecord?.recruitId,
  }
  mappingListStore.queryRecommendReleaseTaskDetails(params);
});
const mappingReleaseTaskDetailsFlagShow = computed(()=>{
  return mappingReleaseTaskDetailsFlag.value;
})

const columnsReleaseTask = [
  {
    title: '职位信息',
    className: 'green-header',
    children: [
      {
        title: '编号',
        dataIndex: 'index',
        key: 'index',
        width: 20,
        ellipsis: true,
      }, 
      {
        title: '顾问',
        dataIndex: 'realNameEn',
        key: 'realNameEn',
        width: 40,
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
        title: '职位',
        dataIndex: 'jobTitle',
        key: 'jobTitle', 
        width: 50,
        ellipsis: true,
      },
       {
        title: '城市',
        dataIndex: 'city',
        key: 'city', 
        width: 30,
        ellipsis: true,
      },
      {
        title: '商场',
        dataIndex: 'workPlace',
        key: 'workPlace', 
        width: 50,
        ellipsis: true,
      },
      {
        title: '企顾',
        dataIndex: 'counselor',
        key: 'counselor', 
        width: 50,
        ellipsis: true,
      },
      {
        title: '发时',
        dataIndex: 'createTimePostion',
        key: 'createTimePostion', 
        width: 20,
        ellipsis: true,
      },
      {
        title: '更时',
        dataIndex: 'updateTimePosition',
        key: 'updateTimePosition', 
        width: 20,
        ellipsis: true,
      },
       {
        title: '招数',
        dataIndex: 'recruitingNum',
        key: 'recruitingNum', 
        width: 20,
        ellipsis: true,
      },
      {
        title: '开放',
        dataIndex: 'openResumesNum',
        key: 'openResumesNum', 
        width: 20,
        ellipsis: true,
      },
      {
        title: '差额',
        dataIndex: 'surplus',
        key: 'surplus', 
        width: 20,
        ellipsis: true,
      },
      {
        title: '职状',
        dataIndex: 'jobStatus',
        key: 'jobStatus', 
        width: 35,
        ellipsis: true,
      },
    ]
  }, 
  {
    title: '任务发布',
    className: 'orange-header',
    children: [
      {
        title: '任数',
        dataIndex: 'taskNum',
        key: 'taskNum',
        width: 20,
        ellipsis: true,
      },
      {
        title: '发时',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 20,
        ellipsis: true,
      },
       {
        title: 'M',
        dataIndex: 'mappingTarget',
        key: 'mappingTarget',
        width: 20,
        ellipsis: true,
      },
    ]
  },
  {
    title: '完成情况',
    className: 'green-header',
    children: [
      {
        title: '推数',
        dataIndex: 'punishNum',
        key: 'punishNum',
        width: 20,
        ellipsis: true,
      },
      {
        title: '有效',
        dataIndex: 'finishNum',
        key: 'finishNum',
        width: 20,
        ellipsis: true,
      },
       {
        title: '任务',
        dataIndex: 'finishScore',
        key: 'finishScore',
        width: 20,
        ellipsis: true,
      },
      {
        title: '非任',
        dataIndex: 'noTaskScore',
        key: 'noTaskScore',
        width: 20,
        ellipsis: true,
      },
      {
        title: 'M',
        dataIndex: 'endMappingNum',
        key: 'endMappingNum',
        width: 20,
        ellipsis: true,
      },
       {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 35,
        ellipsis: true,
      },
    ]
  },
]
const handleCancleCandidateApplyCheck = (id,taskId) => {
  Modal.confirm({
        content: '确定要撤销本次M关联',
        onOk() {
         mappingListStore.cancleCandidateApplyCheck(id,taskId).then((res)=>{
            message.success('撤销成功');
            if(res.code == 1){
                 mappingListStore.queryMappingCandidate(searchMappingCandidate.value);
                 handleCloseReleaseTask();
            }
         });
        },
        cancelText: '取消',
        onCancel() {
          Modal.destroyAll();
        },
      });
}
const calcMappingUptime = (mappingUptime) => {
  let temp = false;
  let nowTime = new Date().getTime();
  let threeTime = 24 * 60 * 60 * 1000 * 30;
  if (nowTime - mappingUptime > threeTime) {
    temp = true;
  }
  return temp;
}
const openApplyCheckFlag = ref(false); 
const releaseTaskRecord = ref({});
const handleOpenApplyCheckFlag = (id,taskId) => {
  openApplyCheckFlag.value = true;
  releaseTaskRecord.value = {id,taskId};
}
const handleSaveApplyCheck = () => {
  mappingListStore.saveCandidateApplyCheck(releaseTaskRecord.value).then((res)=>{
    message.success('关联成功');
    openApplyCheckFlag.value = false; 
    if(res.code == 1){
      mappingListStore.queryMappingCandidate(searchMappingCandidate.value);
      handleCloseReleaseTask();
    }
  }) 
}
</script>
<style scoped>
  :deep(.green-header) {
    background-color: #92d050 !important;
  }
  :deep(.orange-header) {
    background-color: #ff9933 !important;
  }
</style>