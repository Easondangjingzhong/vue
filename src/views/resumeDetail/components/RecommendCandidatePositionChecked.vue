<template>
  <a-drawer
    v-model:open="recommendFlag"
    title="推荐提示"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '10px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColsePosition" />
    </template>
    <a-spin :spinning="spinning">
    <div>
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24">
          <h4 class="resume_h4"> 提醒信息 </h4>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24"> 1、请确认简历内容是否与候选人仔细核对？ </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24"> 2、请确认是否填写候选人简历报告？ </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24">
          3、推荐顾问在企业顾问简历审核通过后，应在1个工作日内邮件形式把完整准确简历发送至企业顾问邮箱并在系统中操作简历已发；若超出1个工作日未进行操作，则针对推荐顾问进行1000元业绩金额的处罚，推荐顾问依然可以进行跟进，若超出3个工作日未进行操作，则此推荐则被系统强制关闭，且此候选人针对此职位的推荐权归属企业顾问，由该职位的企业顾问跟进。
        </a-col>
      </a-row>
      <a-divider :dashed="true" style="background-color: #0505050f; margin-top: 5px" />
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24">
          <h4 class="resume_h4"> 推荐信息 </h4>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            size="small"
          ></a-table>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="template">
        <a-col :span="24" class="resume_col">
          <h4 class="resume_h4"> 简历模板: </h4>
          <span style="padding-left: 5px">{{ template }}</span>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="isVideoTemp">
        <a-col :span="24" class="resume_col" v-if="isVideoTemp == '1'">
          <h4 class="resume_h4"> 视频截图: </h4>
          <span style="padding-left: 5px; display: flex">
            您推荐的职位要求顾问进行视频面试，且上传视频面试截图，请上传对应图片
            <a-upload v-model:file-list="videoFile" :before-upload="handleChangeFileUpload">
              <a-button
                size="small"
                style="
                  background-color: #f0ad4e;
                  border-color: #eea236;
                  color: #fff;
                  margin-left: 12px;
                "
                >上传</a-button
              >
            </a-upload>
          </span>
        </a-col>
        <a-col :span="24" class="resume_col" v-if="(isVideoTemp = '1')">
          <h4 class="resume_h4"> 视频截图: </h4>
          <span style="padding-left: 5px; display: flex">否</span>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="description">
        <a-col :span="24" class="resume_col">
          <h4 class="resume_h4"> 推荐要求: </h4>
          <span style="padding-left: 5px;display: block;"> {{ description }} </span>
        </a-col>
      </a-row>
      <a-divider :dashed="true" style="background-color: #0505050f; margin-top: 5px" />
      <a-row :gutter="24" class="resume_row" v-if="repeatFlag == 1" style="margin-top: 10px">
        <a-col :span="24" class="resume_col">
          <h4 class="resume_h4">
            推荐查重:
            <a-tag color="green" class="resume_tag">通过</a-tag>
            恭喜您查重通过，您可以继续推荐此候选人至当前品牌。
          </h4>
        </a-col>
        <a-col :span="24" class="resume_col_btn">
          <a-button
            type="primary"
            :loading="isloading"
            class="resume_btn"
            size="middle"
            @click="handleAddRecommend"
          >
            推荐
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row" v-if="repeatFlag == 2" style="margin-top: 10px">
        <a-col :span="24" class="resume_col">
          <h4 class="resume_h4">
            推荐查重:
            <a-tag color="red" class="resume_tag">重复</a-tag>
            您不能继续推荐此候选人，因为已经被其他小伙伴推荐过当前品牌哦，请查看下列推荐详情。
          </h4>
        </a-col>
        <a-col :span="24">
          <a-table
            class="row_table"
            :columns="columnsRecommend"
            :data-source="dataSourceRecommend"
            :locale="{ emptyText: '暂无推荐查重' }"
            :pagination="false"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'recommendStatus'">
                <span v-if="record.recommendStatus == 'HR拒绝'">HR简拒</span>
                <span v-else-if="record.recommendStatus == 'HR通过'">HR简过</span>
                <span v-else-if="record.recommendStatus == '被动离职'" title="保期未过-人才放弃">{{
                  record.recommendStatus
                }}</span>
                <span v-else-if="record.recommendStatus == '企业放弃'" title="保期未过-人才放弃">{{
                  record.recommendStatus
                }}</span>
                <span v-else-if="record.recommendStatus == '个人放弃'" title="未下OFFER-个人放弃"
                  >未下OFFER</span
                >
                <span v-else-if="record.recommendStatus == '人才放弃'" title="放弃入职-人才放弃"
                  >放弃入职</span
                >
                <span v-else-if="record.recommendStatus == '企业放弃'" title="放弃入职-企业放弃"
                  >企业放弃</span
                >
                <span v-else-if="record.recommendStatus == '面过企弃'">企业放弃</span>
                <span
                  v-else-if="record.recommendStatus == '已OFFER背调问题'"
                  title="背调拒绝-已OFFER"
                  >背调拒绝</span
                >
                <span v-else-if="record.recommendStatus == '背调问题'" title="背调拒绝-未OFFER"
                  >背调拒绝</span
                >
                <span v-else-if="record.recommendStatus == '顾问通过'">企顾通过</span>
                <span v-else-if="record.recommendStatus == '推荐顾问'">推荐人才</span>
                <span v-else>{{ record.recommendStatus }}</span>
              </template>
              <template v-if="column.key === 'action'">
                <a-button
                  type="primary"
                  :loading="isloading"
                  class="resume_btn"
                  size="small"
                  @click="handleRecommendConfirmAppeal"
                  v-if="record.action == 1"
                >
                  发起申诉
                </a-button>
              </template>
            </template>
          </a-table>
        </a-col>
        <a-col :span="24" style="margin-top: 10px">
          <h4 class="resume_h4"> 申诉理由 </h4>
        </a-col>
        <a-radio-group
          v-model:value="recommendConfirmReason"
          @change="handleRecommendConfirmReason"
        >
          <a-col :span="24">
            <a-radio :value="1">{{ recommendConfirmReasonObjDetails[1] }}</a-radio>
          </a-col>
          <a-col :span="24">
            <a-radio :value="2">{{ recommendConfirmReasonObjDetails[2] }}</a-radio>
          </a-col>
          <a-col :span="24">
            <a-radio :value="3">{{ recommendConfirmReasonObjDetails[3] }}</a-radio>
          </a-col>
          <a-col :span="24">
            <a-radio :value="6">{{ recommendConfirmReasonObjDetails[6] }}</a-radio>
          </a-col>
          <a-col :span="24">
            <a-radio :value="5">{{ recommendConfirmReasonObjDetails[5] }}</a-radio>
          </a-col>
        </a-radio-group>
        <a-col v-if="recommendConfirmReasonFlag" :span="24">
          <a-textarea
            :rows="7"
            v-model:value="recommendConfirmReasonOther"
            placeholder="请仔细填写申诉理由"
          ></a-textarea>
        </a-col>
        <a-col :span="24">
          注意:
          请仔细填写申诉理由，仅根据选择的申诉理由审核，若申诉理由不符或不匹配导致审核未通过，则此申诉将同步提醒原推荐顾问。
        </a-col>
        <a-col :span="24" style="padding-left: 39px">
          若候选人表示没有同意其他顾问推荐，请在系统首页发起工单“人才推荐”申请查询确认，不可直接发起申诉。
        </a-col>
      </a-row>
    </div>
  </a-spin>
  </a-drawer>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import type { UploadProps } from 'ant-design-vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const emit = defineEmits([ "doHandlePagination" ]);
  const doHandlePagination = () => {
    emit('doHandlePagination');
  }
  
  const resumeDetailStore = useResumeDetailStore();
  const { recommendFlag, mappingId } = storeToRefs(resumeDetailStore);
  const props = defineProps({
    recommendPerson: {
      type: Object,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    }
  });
  const drawerWidth = ref(800);
  const isloading = ref(false);
  const isVideo = ref(false);
  const spinning = ref(true);
  const videoFile = ref<UploadProps['fileList']>([]);
  const handleChangeFileUpload = file => {
    videoFile.value = [...(videoFile.value || []), file];
    return false;
  };
  const repeatFlag = ref(0); //查重结果 0 查重中 1查重通过 2查重重复
  const columns = ref([
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: 50,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 30,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 80,
    },
    {
      title: '职位',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      ellipsis: true,
      width: 80,
    },
    {
      title: '商场',
      dataIndex: 'workPlace',
      key: 'workPlace',
      ellipsis: true,
      width: 60,
    },
    {
      title: '企顾',
      dataIndex: 'counselor',
      key: 'counselor',
      ellipsis: true,
      width: 55,
    },
    {
      title: '更新时间',
      dataIndex: 'turnoverTime',
      key: 'turnoverTime',
      ellipsis: true,
      width: 80,
    },
    {
      title: '余职',
      dataIndex: 'offerNum',
      key: 'offerNum',
      ellipsis: true,
      width: 30,
    },
  ]);
  const dataSource = ref([
    {
      userName: '',
      city: '',
      brand: '',
      jobTitle: '',
      workPlace: '',
      counselor: '',
      turnoverTime: '',
      offerNum: '',
    },
  ]);
  const template = ref('');
  const description = ref('');
  const isVideoTemp = ref('');
  const columnsRecommend = ref([
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 30,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 50,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      ellipsis: true,
      width: 50,
    },
    {
      title: '推顾',
      dataIndex: 'recommendCounselor',
      key: 'recommendCounselor',
      ellipsis: true,
      width: 50,
    },
    {
      title: '推荐日期',
      dataIndex: 'recommendTime',
      key: 'recommendTime',
      ellipsis: true,
      width: 60,
    },
    {
      title: '企顾',
      dataIndex: 'counselor',
      key: 'counselor',
      ellipsis: true,
      width: 50,
    },
    {
      title: '当前状态',
      dataIndex: 'recommendStatus',
      key: 'recommendStatus',
      ellipsis: true,
      width: 50,
    },
    {
      title: '终止日期',
      dataIndex: 'endTime',
      key: 'endTime',
      ellipsis: true,
      width: 50,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 50,
    },
  ]);
  const dataSourceRecommend = ref([
    {
      city: '',
      brand: '',
      position: '',
      recommendCounselor: '',
      recommendTime: '',
      counselor: '',
      recommendStatus: '',
      endTime: '',
      action: '1',
    },
  ]);
  const conflictId = ref('');
  watch(
    () => props.recommendPerson,
    () => {
      dataSource.value = [
        {
          userName: props.userName,
          city: props.recommendPerson.city,
          brand: props.recommendPerson.brand,
          jobTitle: props.recommendPerson.jobTitle,
          workPlace: props.recommendPerson.workPlace,
          counselor: props.recommendPerson.counselor,
          turnoverTime: props.recommendPerson.turnoverTime,
          offerNum: props.recommendPerson.offerNum,
        },
      ];
      resumeDetailStore.queryCandidatePositionRequest(props.recommendPerson.id).then((res) => {
        if (res.code == 1) {
          if (res.info) {
            template.value = res.info.template == '0' ? '优态' : '我推';
            isVideoTemp.value = res.info.isVideo;
            isVideo.value = res.info.isVideo == "1" ?  true : false;

            description.value = res.info.description;
          }
          resumeDetailStore.checkCandidateRecommendRepeat({...props.recommendPerson,recommendId: mappingId.value}).then((data) => {
            spinning.value =false;
            if (data.code == 1) {
              repeatFlag.value = 1;
            } else if (data.code == 2) {
              repeatFlag.value = 2;
              conflictId.value = data.info.conflictId;
              dataSourceRecommend.value = [{
                city: data.info.city,
                brand: data.info.brand,
                position: data.info.position,
                recommendCounselor: data.info.recommendCounselor,
                recommendTime: formatToDateMinute(data.info.recommendTime),
                counselor: data.info.counselor,
                recommendStatus: data.info.recommendStatus,
                endTime: (data.info.endTime ? formatToDateMinute(data.info.endTime) : ""),
                action: '1',
              }];
              console.log(dataSourceRecommend.value);
              
            } else if (data.code == 3) {
              message.error('您30天内有该候选人推荐过该候选人给同一HR，并且超时关闭，本次不能推荐');
              handleColsePosition();
            } else if (data.code == 15) {
              message.error('新发布的职位,15分钟内不能推荐');
              handleColsePosition();
            } else if (data.code == 4) {
              message.error('重启流程保护中，无法推荐');
              handleColsePosition();
            } else {
              message.error(data.info);
              handleColsePosition();
            } 
          });
        }
      });
    },
  );
  const handleColsePosition = () => {
    resumeDetailStore.$patch({
      recommendFlag: false,
    });
    isloading.value = false;
    spinning.value = true;
    repeatFlag.value = 0;
    template.value = '';
    description.value = '';
    isVideoTemp.value = '';
    conflictId.value = '';
    isVideo.value = false;
    videoFile.value = [];
    recommendConfirmReason.value = '';
    recommendConfirmReasonOther.value = '';
    recommendConfirmReasonFlag.value = false;
  };
 
  const recommendConfirmReasonObjDetails = ref({
    '1': '1.若同一个HR负责单个品牌或多个品牌，或同一品牌多个HR负责，职位在不同的城市，a顾问推荐候选人至a城市a品牌a职位，则其他顾问可以推荐此候选人至其它城市任意品牌的任意职位；',
    '2': '2.若A公司若存在多个品牌，并且由不同的HR负责，则其他顾问可推荐此候选人至A公司其他HR负责的品牌任何职位；（若同品牌分为奥莱线和精品线，由不同的HR负责，也适用此条规则）；',
    '3': '3.若a顾问推荐某候选人至A公司a职位，出现流程终止且流程终止时间大于10个自然日，则其他顾问可以推荐此候选人至A公司除a职位外的任何职位；',
    '6': '4.若A公司a职位有2位或以上的企业顾问共同对接（企顾1和企顾2），企顾1推荐流程终止后（企顾1推荐流程未终止前，a顾问无法推荐此候选人至企顾2），a顾问可以将此候选人推荐至企顾2，若a顾问超过1个工作日未将此候选人推荐至企顾2，则其他顾问可以推荐此候选人至企顾2；',
    '5': '5.其他；(填写理由时，请注意确认是否可以申诉，申诉失败将提醒原推荐顾问跟进)；',
  });
  const recommendConfirmReasonObjDetailsTemp = ref({
    '1': '若同一个HR负责单个品牌或多个品牌，或同一品牌多个HR负责，职位在不同的城市，a顾问推荐候选人至a城市a品牌a职位，则其他顾问可以推荐此候选人至其它城市任意品牌的任意职位；',
    '2': '若A公司若存在多个品牌，并且由不同的HR负责，则其他顾问可推荐此候选人至A公司其他HR负责的品牌任何职位；（若同品牌分为奥莱线和精品线，由不同的HR负责，也适用此条规则）；',
    '3': '若a顾问推荐某候选人至A公司a职位，出现流程终止且流程终止时间大于10个自然日，则其他顾问可以推荐此候选人至A公司除a职位外的任何职位；',
    '6': '若A公司a职位有2位或以上的企业顾问共同对接（企顾1和企顾2），企顾1推荐流程终止后（企顾1推荐流程未终止前，a顾问无法推荐此候选人至企顾2），a顾问可以将此候选人推荐至企顾2，若a顾问超过1个工作日未将此候选人推荐至企顾2，则其他顾问可以推荐此候选人至企顾2；',
    '5': '其他；(填写理由时，请注意确认是否可以申诉，申诉失败将提醒原推荐顾问跟进)；',
  });
  const recommendConfirmReason = ref('');
  const recommendConfirmReasonOther = ref('');
  const recommendConfirmReasonFlag = ref(false);
  const handleRecommendConfirmReason = (e) => {
    if (e.target.value == '5') {
      recommendConfirmReasonFlag.value = true;
    } else {
      recommendConfirmReasonFlag.value = false;
    }
    recommendConfirmReason.value = e.target.value;
  };
  const handleRecommendConfirmAppeal = () => {
    // 申诉功能
    if (
      !recommendConfirmReason.value ||
      (recommendConfirmReason.value == '5' && !recommendConfirmReasonOther.value)
    ) {
      // 提示请填写申诉理由
      message.warning('请填写申诉理由');
      return;
    }
    const appealRemark =
      recommendConfirmReason.value == '5'
        ? recommendConfirmReasonOther.value
        : recommendConfirmReasonObjDetailsTemp.value[recommendConfirmReason.value];
    let formData = {
      id: props.recommendPerson.id,
      brand: props.recommendPerson.brand,
      bId: props.recommendPerson.bId,
      mId: props.recommendPerson.mId,
      city: props.recommendPerson.city,
      workPlace: props.recommendPerson.workPlace,
      jobTitle: props.recommendPerson.jobTitle,
      positionsId: props.recommendPerson.positionsId,
      counselor: props.recommendPerson.counselor,
      recommendId: '',
      companyName: props.recommendPerson.companyName,
      conflictId: conflictId.value,
      recruitId: props.recommendPerson.recruitId,
      appealRemark: appealRemark,
    };
    isloading.value = true;
    resumeDetailStore.addCandidateRecommendAppeal(formData).then((res) => {
      if (res.code == 1) {
        recommendConfirmReason.value = '';
        recommendConfirmReasonOther.value = '';
        recommendConfirmReasonFlag.value = false;
        handleColsePosition();
        message.error('申诉成功等待审核');
      } else {
        message.error('申诉失败');
      }
      isloading.value = false;
    });
  };

  const handleAddRecommend = () => {
    console.log(videoFile.value[0])
    if (isVideo.value && videoFile?.value.length == 0) {
      message.warning('请上传视频面试截图');
      return;
    }
    if (isVideo.value && !/\.(jpg|png|jpeg)$/.test(videoFile?.value[0]?.name.toLowerCase())) {
      message.warning('请上传图片格式的视频面试截图');
      videoFile.value = [];
      return;
    }
    // let fileName = "";
    // if (isVideo.value ) {
    //   videoFile.value?.forEach((file: UploadProps['fileList'][number]) => {
    //     fileName = new File(file as any,"面试截图'");
    //   });
    // }
    let formData = {
      id: props.recommendPerson.id,
      brand: props.recommendPerson.brand,
      bId: props.recommendPerson.bId,
      mId: props.recommendPerson.mId,
      city: props.recommendPerson.city,
      workPlace: props.recommendPerson.workPlace,
      jobTitle: props.recommendPerson.jobTitle,
      positionsId: props.recommendPerson.positionsId,
      counselor: props.recommendPerson.counselor,
      recommendId: mappingId.value,
      companyName: props.recommendPerson.companyName,
      recruitId: props.recommendPerson.recruitId,
      file: (isVideo.value ? videoFile.value[0]: ""),
    };
    isloading.value = true;
    resumeDetailStore.addCandidateRecommend(formData).then((res) => {
      if (res.code == 1) {
        message.success('推荐成功');
        doHandlePagination();
        handleColsePosition();
        isloading.value = false;
      } else if (res.code == 2) {
        message.error(
          '该人选在60天内，被推荐过公司制度规定范围内的同一类型的HR或品牌，本次不能推荐',
        );
        handleColsePosition();
        isloading.value = false;
      } else if (res.code == 3) {
        message.error('您30天内有该候选人推荐过该候选人给同一HR，并且超时关闭，本次不能推荐');
        handleColsePosition();
        isloading.value = false;
      } else if (res.code == 15) {
        message.error('新发布的职位,15分钟内不能推荐');
        handleColsePosition();
        isloading.value = false;
      } else if (res.code == 4) {
        message.error('重启流程保护中，无法推荐');
        handleColsePosition();
        isloading.value = false;
      } else {
        message.error(res.info);
        handleColsePosition();
        isloading.value = false;
      }
     
    });
  };
</script>
<style lang="less" scoped>
  .resume_btn {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .resume_btn:hover {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .resume_h4 {
    margin: 0;
    font-size: 14px;
    white-space: nowrap;
  }
  .resume_row {
    line-height: 1.5;
  }
  .resume_col_btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .resume_col {
    display: flex;
  }
  .resume_tag {
    margin: 0px;
  }
  :deep(.row_table) th,
  :deep(.row_table) td {
    padding: 3px !important;
  }
  :deep(.ant-radio-wrapper .ant-radio) {
    align-self: flex-start;
    margin-top: 4px;
  }
  :deep(.ant-radio-group) {
    line-height: 2;
  }
  :deep(.ant-upload-wrapper) {
    display: flex;
  }
  :deep(.ant-upload-wrapper .ant-upload-list .ant-upload-list-item) {
    height: 5px;
  }
</style>
