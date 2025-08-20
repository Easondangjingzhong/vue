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
      <div class="content-container-detail">
        <div class="content-container">
          <!-- <a-divider :dashed="true" style="background-color: #0505050f; margin-top: 5px" /> -->
          <div class="resume_row_div">
            <a-row :gutter="24" class="resume_row">
              <a-col :span="24">
                <h4 class="resume_h4"> 推荐信息 </h4>
              </a-col>
            </a-row>
            <a-row :gutter="24" v-if="repeatRecommendFlag" class="resume_row">
              <a-col :span="24">
                <a-table
                  :columns="columns"
                  :data-source="dataSource"
                  :pagination="false"
                  size="small"
                >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'turnoverTime'">
                    <a-tag :title="record.turnoverTime">查看</a-tag>
                </template>
              </template>
              </a-table>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="template">
              <a-col :span="24" class="resume_col">
                <h4 class="resume_h4"> 简历模板: </h4>
                <span style="padding-left: 5px">{{ template }}</span>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="isVideoTemp">
              <a-col :span="24" class="resume_col" v-if="isVideoTemp == '1' || isVideoTemp == '3'">
                <h4 class="resume_h4" v-if="isVideoTemp == '1'"> 视频截图: </h4>
                <h4 class="resume_h4" v-if="isVideoTemp == '3'"> 生活照片: </h4>
                <span style="padding-left: 5px;" v-if="isVideoTemp == '1'">您推荐的职位要求顾问进行视频面试，且上传视频面试截图，请上传对应图片</span>
                <span style="padding-left: 5px;" v-if="isVideoTemp == '3'">您推荐的职位要求供候选人日常生活照片（必须为全身或半身）</span>
                <span style="padding-left: 5px;display: flex">
                  <a-upload 
                  v-model:file-list="videoFile" 
                  :max-count="1"
                  :before-upload="handleChangeFileUpload">
                  <a-tag class="excelPatha">照片上传</a-tag>
                    <!-- <a-button
                      size="small"
                      style="
                        background-color: #f0ad4e;
                        border-color: #eea236;
                        color: #fff;
                        margin-left: 12px;
                      "
                      ></a-button
                    > -->
                  </a-upload>
                </span>
              </a-col>
              <!-- <a-col :span="24" class="resume_col" v-if="isVideoTemp != '1'">
                <h4 class="resume_h4"> 视频截图: </h4>
                <span style="padding-left: 5px; display: flex">否</span>
              </a-col> -->
            </a-row>
             <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="isExcelTemp == '1'">
              <a-col :span="24" class="resume_col">
                <h4 class="resume_h4"> 表格上传: </h4>
                <span style="padding-left: 5px;">推荐候选人时需同时提交客户要求的Excel表格</span>
                <span style="padding-left: 5px;" v-if="excelPathTemp"><a-tag><a class="excelPatha" :href="excelPathTemp">Excel表格</a></a-tag></span>
                <span style="display: flex">
                  <a-upload 
                  v-model:file-list="excelFile" 
                  :max-count="1"
                  :before-upload="handleChangeExcelFileUpload">
                  <a-tag class="excelPatha">表格上传</a-tag>
                  </a-upload>
                </span>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="resume_row" style="margin-top: 10px" v-if="description">
              <a-col :span="24" class="resume_col">
                <h4 class="resume_h4"> 推荐要求: </h4>
                <span style="padding-left: 5px; display: block"> {{ description }} </span>
              </a-col>
            </a-row>
          </div>
          <!-- <a-divider :dashed="true" style="background-color: #0505050f; margin-top: 5px" /> -->
          <div class="resume_row_div" v-if="repeatFlag == 1">
            <a-row :gutter="24" class="resume_row" v-if="repeatFlag == 1" style="margin-top: 10px">
              <a-col :span="24" class="resume_col">
                <h4 class="resume_h4">
                  推荐查重:
                  <a-tag color="green" class="resume_tag">通过</a-tag>
                  恭喜您查重通过，您可以继续推荐此候选人至当前品牌。
                </h4>
              </a-col>
            </a-row>
          </div>
          <!-- <a-row :gutter="24" class="resume_row" v-if="repeatFlag == 1">
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
        </a-row> -->
          <div class="resume_row_div" v-if="repeatFlag == 22">
            <a-row :gutter="24" class="resume_row" style="margin-top: 10px">
              <a-col :span="24" class="resume_col">
                <h4 class="resume_h4">
                  推荐查重:
                  <a-tag color="red" class="resume_tag">限制</a-tag>
                </h4>
              </a-col>
              <a-col :span="24" class="resume_col">
                <span style="margin-left: 6%; margin-top: 5px" v-html="conflictRemark"></span>
              </a-col>
              <a-col style="margin-top: 5px" :span="24" class="resume_col">
                <h4 class="resume_h4">
                  Leader评估:
                  <a-select
                    v-model:value="leaderEvaluate"
                    :options="optionsLeaderEvaluate"
                    @change="handleLeaderEvaluate"
                    style="width: 440px"
                  ></a-select>
                </h4>
              </a-col>
            </a-row>
          </div>
          <!-- <a-row :gutter="24" class="resume_row" v-if="repeatFlag == 22">
          <a-col :span="24" class="resume_col_btn">
            <a-button
              v-if="!leaderEvaluateFlag"
              type="primary"
              class="resume_btn_evaluate"
              size="middle"
              @click="handleLeaderEvaluateFlag"
            >
              发起申诉
            </a-button>
            <a-button
              v-if="leaderEvaluateFlag"
              type="primary"
              :loading="isloading"
              class="resume_btn"
              size="middle"
              @click="handleRecommendConfirmAppeal"
            >
              发起申诉
            </a-button>
          </a-col>
        </a-row> -->
          <div class="resume_row_div" v-if="repeatFlag == 16">
            <a-row :gutter="24" class="resume_row" v-if="repeatFlag == 16" style="margin-top: 10px">
              <a-col :span="24" class="resume_col">
                <h4 class="resume_h4">
                  推荐查重:
                  <a-tag color="red" class="resume_tag">重复</a-tag>
                  您不能继续推荐此候选人，因为已经被其他小伙伴推荐过当前品牌哦，请查看下列推荐详情。
                </h4>
              </a-col>
              <a-col :span="12">
                <a-table
                  class="row_table"
                  :columns="columnsRecommendOut"
                  :data-source="dataSourceRecommendOut"
                  :locale="{ emptyText: '暂无推荐查重' }"
                  :pagination="false"
                  size="small"
                ></a-table>
              </a-col>
            </a-row>
          </div>
          <div class="resume_row_div" v-if="repeatFlag == 2">
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
                      <span
                        v-else-if="record.recommendStatus == '被动离职'"
                        title="保期未过-人才放弃"
                        >{{ record.recommendStatus }}</span
                      >
                      <span
                        v-else-if="record.recommendStatus == '企业放弃'"
                        title="保期未过-人才放弃"
                        >{{ record.recommendStatus }}</span
                      >
                      <span
                        v-else-if="record.recommendStatus == '个人放弃'"
                        title="未下OFFER-个人放弃"
                        >未下OFFER</span
                      >
                      <span
                        v-else-if="record.recommendStatus == '人才放弃'"
                        title="放弃入职-人才放弃"
                        >放弃入职</span
                      >
                      <span
                        v-else-if="record.recommendStatus == '企业放弃'"
                        title="放弃入职-企业放弃"
                        >企业放弃</span
                      >
                      <span v-else-if="record.recommendStatus == '面过企弃'">企业放弃</span>
                      <span
                        v-else-if="record.recommendStatus == '已OFFER背调问题'"
                        title="背调拒绝-已OFFER"
                        >背调拒绝</span
                      >
                      <span
                        v-else-if="record.recommendStatus == '背调问题'"
                        title="背调拒绝-未OFFER"
                        >背调拒绝</span
                      >
                      <span v-else-if="record.recommendStatus == '顾问通过'">企顾通过</span>
                      <span v-else-if="record.recommendStatus == '推荐顾问'">推荐人才</span>
                      <span v-else>{{ record.recommendStatus }}</span>
                    </template>
                    <!-- <template v-if="column.key === 'action'">
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
                  </template> -->
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
        </div>
        <div class="content-container-pdf">
          <div class="resume_row_div fixed-warning">
            <div>
              <a-row :gutter="24" class="resume_row">
                <a-col :span="24"
                  >警告:
                  您推荐此候选人的同时，系统将自动生成Word及PDF简历发送至企业顾问，请仔细查下以下内容：</a-col
                >
              </a-row>
              <a-row :gutter="24" class="resume_row">
                <a-col :span="24" style="padding-left: 38px"
                  >1、请仔细检查简历内容，确保简历中人才信息、工作经历、业绩数据正确无误，无错别字等；</a-col
                >
              </a-row>
              <a-row :gutter="24" class="resume_row">
                <a-col :span="24" style="padding-left: 38px"
                  >2、若简历中有部分内容无需发送给客户，可在当前页面点击“开放”或“隐藏”按钮调整。</a-col
                >
              </a-row>
            </div>
          </div>
          <div class="resume_row_div" v-if="resumeRecommendUploadFlag">
            <ResumeRecommendUpload
              :repeatFlag="repeatFlag"
              @close="handleColsePosition"
              @handleAddRecommend="handleAddRecommend"
              @handleResumeRecommendRepeat="handleResumeRecommendRepeat"
              @handleRecommendConfirmAppeal="handleRecommendConfirmAppeal"
            />
          </div>
        </div>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { message, Upload } from 'ant-design-vue';
  import { CloseOutlined,CheckCircleFilled } from '@ant-design/icons-vue';
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import type { UploadProps } from 'ant-design-vue';
  import ResumeRecommendUpload from './ResumeRecommendUpload.vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const drawerWidth = ref(window.innerWidth * 1);

  // Optional: Add window resize listener if you need dynamic updates
  const handleResize = () => {
    drawerWidth.value = window.innerWidth * 1;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  const emit = defineEmits(['doHandlePagination']);
  const doHandlePagination = () => {
    emit('doHandlePagination');
  };
  const resumeDetailStore = useResumeDetailStore();
  const {
    recommendFlag,
    mappingId,
    resumeRecommendUploadFlag,
    resumeRecommendShowFlag,
    recommendPerson,
    repeatRecommendFlag,
    resumeTypeEnglish,
  } = storeToRefs(resumeDetailStore);
  // watch(repeatRecommendFlag, () => {
  //   if (!repeatRecommendFlag.value) {
  //     drawerWidth.value = window.innerWidth * 0.5;
  //   } else {
  //     handleResize();
  //   }
  // });
  const props = defineProps({
    userName: {
      type: String,
      required: true,
    },
  });
  const isloading = ref(false);
  const isVideo = ref(false);
  const spinning = ref(true);
  const videoFile = ref<UploadProps['fileList']>([]);
  const excelFile = ref<UploadProps['fileList']>([]);
  const handleChangeFileUpload = (file) => {
    let isSize = file.size / 1024 / 1024 - 10 < 0;
    if (!isSize) {
      message.error('上传截图不能超过10MB');
      return Upload.LIST_IGNORE;
    } else {
      videoFile.value = [...(videoFile.value || []), file];
    }
    return false;
  };
  const handleChangeExcelFileUpload = (file) => {
    let isSize = file.size / 1024 / 1024 - 10 < 0;
    if (!isSize) {
      message.error('上传截图不能超过10MB');
      return Upload.LIST_IGNORE;
    } else {
      excelFile.value = [...(excelFile.value || []), file];
    }
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
      width: 50,
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
  const isExcelTemp = ref('');
  const excelPathTemp = ref('');
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
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   key: 'action',
    //   ellipsis: true,
    //   width: 50,
    // },
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
    },
  ]);
  const columnsRecommendOut = ref([
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
      title: '推荐日期',
      dataIndex: 'endTime',
      key: 'endTime',
      ellipsis: true,
      width: 50,
    },
  ]);
  const dataSourceRecommendOut = ref([
    {
      city: '',
      brand: '',
      endTime: '',
    },
  ]);
  const conflictId = ref('');
  const conflictRemark = ref('');
  const conflictRemarkShow = ref('');
  const templateType = ref('');
  const screenWidth = Math.round(window.screen.width * window.devicePixelRatio);
  watch(
    () => recommendPerson.value,
    () => {
      dataSource.value = [
        {
          userName: props.userName,
          city: recommendPerson.value?.city,
          brand: recommendPerson.value?.brand,
          jobTitle: recommendPerson.value?.jobTitle,
          workPlace: recommendPerson.value?.workPlace,
          counselor: recommendPerson.value?.counselor,
          turnoverTime: recommendPerson.value?.turnoverTime,
          offerNum: recommendPerson.value?.offerNum,
        },
      ];
      resumeDetailStore.queryCandidatePositionRequest(recommendPerson.value?.id).then((res) => {
        if (res.code == 1) {
          if (res.info) {
            template.value = res.info.template == '0' ? '优态' : '我推';
            isExcelTemp.value = res.info.isExcel;
            excelPathTemp.value = res.info.excelPath;
            isVideoTemp.value = res.info.isVideo;
            isVideo.value = (res.info.isVideo == '1' || res.info.isVideo == '3') ? true : false;
            description.value = res.info.description;
            templateType.value = res.info.template;
            let resumeLanguage = res.info.resumeLanguage;
            if (resumeLanguage == 'C' && resumeTypeEnglish.value == '1') {
              message.success({
    icon: () => null, // 隐藏默认图标
    content: () => h('div', [
        h('div', { 
            style: { 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '265px',
                padding: '8px'
            } 
        }, [
            h('div', { 
                style: { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    marginBottom: '15px'
                } 
            }, [
                h('div', { 
                    style: { 
                        fontWeight: 'bold',
                        color: '#52c41a',
                        fontSize: '13px',
                    } 
                }, '当前简历是英文,职位推荐要求是中文'),
                h(CheckCircleFilled, { 
                    style: { 
                        color: '#52c41a',
                        fontSize: '16px' 
                    } 
                }),
            ]),
            h('a-button', {
                type: 'primary',
                danger: true,
                size: 'small',
                style: { 
                    cursor: 'pointer',
                    width: '50%',
                    borderRadius: '24px',
                    padding: '4px 8px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    backgroundColor: '#ff4d4f'
                },
                onClick: () => {
                   spinning.value = false;
                    handleColsePosition();
                    message.destroy();
                }
            }, '关闭')
        ])
    ]),
    duration: 0
              });
              return;
            }
            if (resumeLanguage == 'E' && resumeTypeEnglish.value != '1') {
              message.success({
    icon: () => null, // 隐藏默认图标
    content: () => h('div', [
        h('div', { 
            style: { 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '265px',
                padding: '8px'
            } 
        }, [
            h('div', { 
                style: { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    marginBottom: '15px'
                } 
            }, [
                h('div', { 
                    style: { 
                        fontWeight: 'bold',
                        color: '#52c41a',
                        fontSize: '13px',
                    } 
                }, '当前简历是中文,职位推荐要求是英文'),
                h(CheckCircleFilled, { 
                    style: { 
                        color: '#52c41a',
                        fontSize: '16px' 
                    } 
                }),
            ]),
            h('a-button', {
                type: 'primary',
                danger: true,
                size: 'small',
                style: { 
                    cursor: 'pointer',
                    width: '50%',
                    borderRadius: '24px',
                    padding: '4px 8px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    backgroundColor: '#ff4d4f'
                },
                onClick: () => {
                   spinning.value = false;
                    handleColsePosition();
                    message.destroy();
                }
            }, '关闭')
        ])
    ]),
    duration: 0
              });
                return;
            }
            //handleCheckCandidateRecommendRepeat();
            resumeDetailStore
              .queryResumeByResumeId(
                templateType.value,
                screenWidth,
                recommendPerson.value?.id,
                recommendPerson.value?.bId,
              )
              .then((res) => {
                if (res.code == 1) {
                  if (repeatRecommendFlag.value) {
                    handleCheckCandidateRecommendRepeat();
                  } else {
                    spinning.value = false;
                  }
                }
              });
          }
        }
      });
    },
  );
  const handleCheckCandidateRecommendRepeat = () => {
    spinning.value = true;
    resumeDetailStore
      .checkCandidateRecommendRepeat({
        ...recommendPerson.value,
        recommendId: mappingId.value,
      })
      .then((data) => {
        spinning.value = false;
        if (data.code == 1) {
          repeatFlag.value = 1;
        } else if (data.code == 2) {
          repeatFlag.value = 2;
          conflictId.value = data.info.conflictId;
          dataSourceRecommend.value = [
            {
              city: data.info.city,
              brand: data.info.brand,
              position: data.info.position,
              recommendCounselor: data.info.recommendCounselor,
              recommendTime: formatToDateMinute(data.info.recommendTime),
              counselor: data.info.counselor,
              recommendStatus: data.info.recommendStatus,
              endTime: data.info.endTime ? formatToDateMinute(data.info.endTime) : '',
            },
          ];
        } else if (data.code == 17) {
          repeatFlag.value = 2;
          if (data.info && data.info.length > 0) {
            conflictId.value = data.info[0].ID;
            dataSourceRecommend.value = [
              {
                city: data.info[0].CITY,
                brand: data.info[0].BRAND,
                position: data.info[0].POSITIONS,
                recommendCounselor: data.info[0].COUNSELOR,
                recommendTime: formatToDateMinute(data.info[0].RECOMMEND_TIME),
                counselor: data.info[0].COUNSELOR,
                recommendStatus: data.info[0].RECOMMEND_STATUS,
                endTime: data.info[0].RECOMMEND_TIME
                  ? formatToDateMinute(data.info[0].RECOMMEND_TIME)
                  : '',
              },
            ];
          }
        } else if (data.code == 16) {
          repeatFlag.value = 16;
          if (data.info && data.info.length > 0) {
            dataSourceRecommendOut.value = [
              {
                city: data.info[0].city,
                brand: data.info[0].brand,
                endTime: data.info[0].recommendTime
                  ? formatToDateMinute(data.info[0].recommendTime)
                  : '',
              },
            ];
            console.log(dataSourceRecommendOut.value);
          }
        } else if (data.code == 3) {
          message.error('您30天内有该候选人推荐过该候选人给同一HR，并且超时关闭，本次不能推荐');
          handleColsePosition();
        } else if (data.code == 15) {
          message.error('新发布的职位,15分钟内不能推荐');
          handleColsePosition();
        } else if (data.code == 4) {
          message.error('重启流程保护中，无法推荐');
          handleColsePosition();
        } else if (data.code == 22) {
          repeatFlag.value = 22;
          conflictRemarkShow.value = `此公司在职人员推荐受到限制，需上报直属Leader沟通评估，直属Leader同意后方可提交申诉，并注明：此次推荐本人可掌控投诉风险，且直属 Leader(${data.info})已做评估审核，同意此次推荐;`;
          conflictRemark.value = `此公司在职人员推荐受到限制，需上报直属Leader沟通评估，直属Leader同意后方可提交申诉，<br/>
            并注明：此次推荐本人可掌控投诉风险，且直属 Leader(${data.info})已做评估审核，同意此次推荐;`;
          conflictId.value = '';
        } else {
          message.error(data.info);
          handleColsePosition();
        }
      })
      .finally(() => {
        spinning.value = false;
      });
  };
  const handleColsePosition = () => {
    resumeDetailStore.$patch({
      recommendFlag: false,
      resumeRecommendUploadFlag: false,
      resumeRecommendShowFlag: false,
    });
    isloading.value = false;
    //spinning.value = true;
    repeatFlag.value = 0;
    template.value = '';
    description.value = '';
    isVideoTemp.value = '';
    isExcelTemp.value = '';
    excelPathTemp.value = '';
    conflictId.value = '';
    isVideo.value = false;
    videoFile.value = [];
    excelFile.value = [];
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
  const leaderEvaluateFlag = ref(false);
  const leaderEvaluate = ref('');
  const optionsLeaderEvaluate = ref([
    { label: '', value: '' },
    {
      label: '我已经与直属Leader沟通，且直属Leader评估后同意此次推荐',
      value: '我已经与直属Leader沟通，且直属Leader评估后同意此次推荐',
    },
  ]);
  const handleLeaderEvaluate = () => {
    leaderEvaluateFlag.value = true;
  };
  const handleLeaderEvaluateFlag = () => {
    message.warning('请先选择Leader评估');
  };
  const handleRecommendConfirmAppeal = () => {
    // 申诉功能
    if (
      repeatFlag.value != 22 &&
      (!recommendConfirmReason.value ||
        (recommendConfirmReason.value == '5' && !recommendConfirmReasonOther.value))
    ) {
      // 提示请填写申诉理由
      message.warning('请填写申诉理由');
      return;
    }
    if (isVideo.value && videoFile?.value.length == 0) {
      if (isVideoTemp == '1') {
        message.warning('请上传视频面试截图');
      } else {
        message.warning('请上传生活照片');
      }
      return;
    }
    if (isVideo.value && !/\.(jpg|png|jpeg)$/.test(videoFile?.value[0]?.name.toLowerCase())) {
      if (isVideoTemp == '1') {
        message.warning('请上传图片格式的视频面试截图');
      } else {
        message.warning('请上传图片格式的生活照片');
      }
      videoFile.value = [];
      return;
    }
   if (isExcelTemp.value == '1' && excelFile?.value.length == 0) {
      message.warning('请上传表格');
      return;
    }
    if ((isExcelTemp.value == '1') && !/\.(xls|xlsx)$/.test(excelFile?.value[0]?.name.toLowerCase())) {
      message.warning('请上传表格格式的表格');
      excelFile.value = [];
      return;
    }
    let appealRemark = '';
    let appealType = '重复推荐';
    if (repeatFlag.value != 22) {
      appealRemark =
        recommendConfirmReason.value == '5'
          ? recommendConfirmReasonOther.value
          : recommendConfirmReasonObjDetailsTemp.value[recommendConfirmReason.value];
    } else {
      appealRemark = conflictRemarkShow.value;
      appealType = '客户限制';
    }
    let tt = 'youtai';
    if (templateType.value != '0') {
        tt = 'wotui';
    }
    let formData = {
      template: tt,
      id: recommendPerson.value?.id,
      brand: recommendPerson.value?.brand,
      bId: recommendPerson.value?.bId,
      mId: recommendPerson.value?.mId,
      city: recommendPerson.value?.city,
      workPlace: recommendPerson.value?.workPlace,
      jobTitle: recommendPerson.value?.jobTitle,
      positionsId: recommendPerson.value?.positionsId,
      counselor: recommendPerson.value?.counselor,
      recommendId: '',
      companyName: recommendPerson.value?.companyName,
      conflictId: conflictId.value,
      appealType: appealType,
      recruitId: recommendPerson.value?.recruitId,
      appealRemark: appealRemark,
      file: isVideo.value ? videoFile.value[0] : '',
      file2: (isExcelTemp.value == '1') ? excelFile.value[0] : '',
    };
    isloading.value = true;
    spinning.value = true;
    resumeDetailStore.addCandidateRecommendAppeal(formData).then((res) => {
      if (res.code == 1) {
        recommendConfirmReason.value = '';
        recommendConfirmReasonOther.value = '';
        recommendConfirmReasonFlag.value = false;
 message.success({
    icon: () => null, // 隐藏默认图标
    content: () => h('div', [
        h('div', { 
            style: { 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '200px',
                padding: '8px'
            } 
        }, [
            h('div', { 
                style: { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    marginBottom: '15px'
                } 
            }, [
                h('div', { 
                    style: { 
                        fontWeight: 'bold',
                        color: '#52c41a',
                        fontSize: '13px',
                    } 
                }, '申诉成功等待审核'),
                h(CheckCircleFilled, { 
                    style: { 
                        color: '#52c41a',
                        fontSize: '16px' 
                    } 
                }),
            ]),
            h('a-button', {
                type: 'primary',
                danger: true,
                size: 'small',
                style: { 
                    cursor: 'pointer',
                    width: '50%',
                    borderRadius: '24px',
                    padding: '4px 8px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    backgroundColor: '#ff4d4f'
                },
                onClick: () => {
                   spinning.value = false;
                    handleColsePosition();
                    message.destroy();
                }
            }, '关闭')
        ])
    ]),
    duration: 0
});
       
        //resumeDetailStore.addCandidateRecommendPdfAppeal(tt, res.info) .then(res => {});
        doHandlePagination();
        //message.success('申诉成功等待审核');
        leaderEvaluateFlag.value = false;
      } else if (res.code == 2) {
        message.error('此候选人已在申诉中未审核');
      } else {
        message.error(data.info);
      }
      isloading.value = false;
      spinning.value = false;
    });
  };
  const handleAddRecommend = () => {
    //console.log(videoFile.value[0]);
    if (isVideo.value && videoFile?.value.length == 0) {
      if (isVideoTemp == '1') {
        message.warning('请上传视频面试截图');
      } else {
        message.warning('请上传生活照片');
      }
      return;
    }
    if (isVideo.value && !/\.(jpg|png|jpeg)$/.test(videoFile?.value[0]?.name.toLowerCase())) {
      if (isVideoTemp == '1') {
        message.warning('请上传图片格式的视频面试截图');
      } else {
        message.warning('请上传图片格式的生活照片');
      }
      videoFile.value = [];
      return;
    }
   if (isExcelTemp.value == '1' && excelFile?.value.length == 0) {
      message.warning('请上传表格');
      return;
    }
    if ((isExcelTemp.value == '1') && !/\.(xls|xlsx)$/.test(excelFile?.value[0]?.name.toLowerCase())) {
      message.warning('请上传表格格式的表格');
      excelFile.value = [];
      return;
    }
    let tt = 'youtai';
    if (templateType.value != '0') {
        tt = 'wotui';
    }
    let formData = {
      template: tt,
      id: recommendPerson.value?.id,
      brand: recommendPerson.value?.brand,
      bId: recommendPerson.value?.bId,
      mId: recommendPerson.value?.mId,
      city: recommendPerson.value?.city,
      workPlace: recommendPerson.value?.workPlace,
      jobTitle: recommendPerson.value?.jobTitle,
      positionsId: recommendPerson.value?.positionsId,
      counselor: recommendPerson.value?.counselor,
      recommendId: mappingId.value,
      companyName: recommendPerson.value?.companyName,
      recruitId: recommendPerson.value?.recruitId,
      file: isVideo.value ? videoFile.value[0] : '',
      file2: (isExcelTemp.value == '1') ? excelFile.value[0] : '',
    };
    isloading.value = true;
    spinning.value = true;
    resumeDetailStore.addCandidateRecommend(formData).then((res) => {
      if (res.code == 1) {
        // message.success('推荐成功');
        doHandlePagination();
         message.success({
    icon: () => null, // 隐藏默认图标
    content: () => h('div', [
        h('div', { 
            style: { 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '200px',
                padding: '8px'
            } 
        }, [
            h('div', { 
                style: { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    marginBottom: '15px'
                } 
            }, [
                h('div', { 
                    style: { 
                        fontWeight: 'bold',
                        color: '#52c41a',
                        fontSize: '13px',
                    } 
                }, '推荐成功'),
                h(CheckCircleFilled, { 
                    style: { 
                        color: '#52c41a',
                        fontSize: '16px' 
                    } 
                }),
            ]),
            h('a-button', {
                type: 'primary',
                danger: true,
                size: 'small',
                style: { 
                    cursor: 'pointer',
                    width: '50%',
                    borderRadius: '24px',
                    padding: '4px 8px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    backgroundColor: '#ff4d4f'
                },
                onClick: () => {
                  spinning.value = false;
                    resumeDetailStore.queryResumeRecord(1);
                    handleColsePosition();
                    message.destroy();
                }
            }, '关闭')
        ])
    ]),
    duration: 0
        });
        //resumeDetailStore.addCandidateRecommendPdf(tt, res.info).then(res => {});
        isloading.value = false;
      } else if (res.code == 2) {
        message.error(
          '该人选在60天内，被推荐过公司制度规定范围内的同一类型的HR或品牌，本次不能推荐',
        );
        handleColsePosition();
        isloading.value = false;
        spinning.value = false;
      } else if (res.code == 3) {
        message.error('您30天内有该候选人推荐过该候选人给同一HR，并且超时关闭，本次不能推荐');
        handleColsePosition();
        isloading.value = false;
        spinning.value = false;
      } else if (res.code == 15) {
        message.error('新发布的职位,15分钟内不能推荐');
        handleColsePosition();
        isloading.value = false;
        spinning.value = false;
      } else if (res.code == 4) {
        message.error('重启流程保护中，无法推荐');
        handleColsePosition();
        isloading.value = false;
        spinning.value = false;
      } else {
        message.error(res.info);
        handleColsePosition();
        isloading.value = false;
        spinning.value = false;
      }
    });
  };
  
  const handleResumeRecommendRepeat = () => {
    if (videoFile?.value?.length && !/\.(jpg|png|jpeg)$/.test(videoFile?.value[0]?.name.toLowerCase())) {
      if (isVideoTemp == '1') {
        message.warning('请上传图片格式的视频面试截图');
      } else {
        message.warning('请上传图片格式的生活照片');
      }
      videoFile.value = [];
      return;
    }
     if (excelFile?.value?.length && !/\.(xls|xlsx)$/.test(excelFile?.value[0]?.name.toLowerCase())) {
      message.warning('请上传表格格式的表格');
      excelFile.value = [];
      return;
    }
    let tt = 'youtai';
    if (templateType.value != '0') {
      tt = 'wotui';
    }
    let formData = {
      cId: recommendPerson.value?.cId,
      rid: recommendPerson.value?.rid,
      pid: recommendPerson.value?.id,
      isHide: '1',
      template: tt,
      file: isVideo.value ? videoFile.value[0] : '',
      file2: (isExcelTemp.value == '1') ? excelFile.value[0] : '',
    };
    isloading.value = true;
    spinning.value = true;
    resumeDetailStore.addCandidateRecommendRepeat(formData).then((res) => {
      if (res.code == 1) {
        message.success({
    icon: () => null, // 隐藏默认图标
    content: () => h('div', [
        h('div', { 
            style: { 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '200px',
                padding: '8px'
            } 
        }, [
            h('div', { 
                style: { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    marginBottom: '15px'
                } 
            }, [
                h('div', { 
                    style: { 
                        fontWeight: 'bold',
                        color: '#52c41a',
                        fontSize: '13px',
                    } 
                }, '推荐成功'),
                h(CheckCircleFilled, { 
                    style: { 
                        color: '#52c41a',
                        fontSize: '16px' 
                    } 
                }),
            ]),
            h('a-button', {
                type: 'primary',
                danger: true,
                size: 'small',
                style: { 
                    cursor: 'pointer',
                    width: '50%',
                    borderRadius: '24px',
                    padding: '4px 8px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    backgroundColor: '#ff4d4f'
                },
                onClick: () => {
                   spinning.value = false;
                    //repeatRecommendFlag.value = true;
                    handleColsePosition();
                    message.destroy();
                }
            }, '关闭')
        ])
    ]),
    duration: 0
        });
        isloading.value = false;
      }else if (res.code == 2){
        message.error("已经被其他顾问推荐");
        isloading.value = false;
        spinning.value = false;
      } else {
        message.error(res.info);
        isloading.value = false;
        spinning.value = false;
      }
    });
  };
  message.config({
    top: '40%'
  })
</script>
<style lang="less" scoped>
  :deep(.ant-drawer .ant-drawer-content-wrapper) {
    width: 1250px !important;
  }
  .resume_row_div {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 5px;
  }
  .fixed-warning {
    color: #d46b08;
    margin-bottom: 5px;
  }
  .content-container {
    width: 44%;
    margin-right: 1%;
  }
  .content-container-pdf {
    width: 55%;
  }
  .resume_btn_evaluate {
    color: #fff;
    background-color: #ccc;
    border-color: #ccc;
  }
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
  .content-container-detail {
    display: flex;
    justify-content: space-between;
  }
  .full-width {
    width: 100% !important;
  }
 .excelPatha {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 0.0625rem;
    line-height: 0.10417rem;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: inline-block;
    height: auto;
    margin-inline-end: 0.04167rem;
    padding-inline: 0.03646rem;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.02);
    border: 0.00521rem solid #d9d9d9;
    border-radius: 0.02083rem;
    opacity: 1;
    transition: all 0.2s;
    text-align: start;
    border-color: #b7eb8f;
    cursor: pointer;
 }
</style>
