<template>
  <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_info">
        <h2 class="resume_h3">{{ resumeData.userName }}</h2>
        <a-tag class="resume_tag_checked" v-if="!resumeData.recruitId && resumeData.projectFlag == '待保'" color="red">过保</a-tag>
        <a-tag class="resume_tag_checked" v-if="!resumeData.recruitId && resumeData.projectFlag == '在保'" color="green">{{ resumeData.projectFlag }}</a-tag>
        <a-tag class="resume_tag_checked" v-if="!resumeData.recruitId && resumeData.projectFlag == '不保'" color="red">过保</a-tag>
        <a-tag class="resume_tag_checked" v-if="!resumeData.recruitId && resumeData.projectFlag == '过保'" color="red">{{ resumeData.projectFlag }}</a-tag>
        <a-tag class="resume_tag_checked_top" v-if="!resumeData.recruitId" color="orange">公共</a-tag>
        <a-tag class="resume_tag_checked_top" v-if="!resumeData.recruitId && resumeData.twoYearFlag == '两年'" color="green">两年</a-tag>
        <a-tag style="cursor: pointer;" color="#d8d8d8" class="resume_tag_checked" v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '待核'"
          >待核</a-tag
        >
        <a-tag style="cursor: pointer;" color="#d8d8d8" class="resume_tag_checked" v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '待激活'"
          >激活</a-tag
        >
        <a-tag style="cursor: pointer;" color="green" class="resume_tag_checked" v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '已激活'"
          >最新</a-tag
        >
        <a-tag
          color="green"
          class="resume_tag_checked"
          :title="newTime"
          v-if="resumeData.recruitId && resumeData.checkFlag && resumeData.checkFlag != '待核' && resumeData.checkFlag != '待激活' && resumeData.checkFlag != '已激活'"
          >最新</a-tag
        >
        <a-tag
          color="#d8d8d8"
          class="resume_tag_checked_top"
          :title="repeatTime"
          v-if="resumeData.recruitId && resumeData.checkFlag == '待核' && resumeData.fristFlag"
          >首增</a-tag
        >
        <a-tag
          color="green"
          class="resume_tag_checked_top"
          :title="repeatTime"
          v-if="resumeData.recruitId && resumeData.checkFlag != '待核' && resumeData.fristFlag"
          >首增</a-tag
        >
        <a-tag class="resume_tag_checked_top" v-if="resumeData.recruitId && resumeData.onlyFlag" color="green">{{ resumeData.onlyFlag }}</a-tag>
        <a-tag class="resume_tag_checked_top" v-if="resumeData.recruitId && resumeData.commonFlag" color="green">{{ resumeData.commonFlag }}</a-tag>
        <a-tag class="resume_tag_checked_top" v-if="resumeData.recruitId && resumeData.gognGongFlag" color="orange">{{ resumeData.gognGongFlag }}</a-tag>
        <!-- <a-tag
          color="#4bb632"
          class="resume_tag_checked_top"
          :title="personBaohuTime"
          v-if="personBaohuFlag"
          >保护</a-tag
        > -->
         <a-tag
          color="orange"
          class="resume_tag_checked_top"
          v-if="resumeData.limitFlag == '限制'"
          title="OFFER推荐禁止"
          >限制</a-tag
        >
        <a-tag
          color="orange"
          class="resume_tag_checked_top"
          v-if="resumeData.limitFlag == '限制禁推'"
          title="在保推荐禁止"
          >限制</a-tag
        >
        <a-tag
          color="orange"
          class="resume_tag_checked_top"
          v-if="resumeData.limitFlag == '限制分单'"
          title="在保推荐分单"
          >限制</a-tag
        >
        <a-tag
          color="orange"
          class="resume_tag_checked_top"
          v-if="resumeData.limitFlag == 'OFFER'"
          >OFFER</a-tag
        > 
        <a-tag style="cursor: pointer;" color="orange" class="resume_tag_checked" v-if="showResumeAdd && resumeData.recruitId && resumeData.limitFlag == '激活'"
          >激活</a-tag
        >
        <a-modal v-model:open="openResumeCopy" title="复制简历" @ok="handleResumeCopy">
      <p>是否将简历复制到自己名下</p>
    </a-modal>
    <a-modal v-model:open="openResumeChecked" title="简历核对" @ok="handleResumeChecked">
      <p>请确认此简历匹配以下4条要求，方可继续点击已核按钮：</p>
      <p>1. 候选人简历属于零售行业或属于目前公司在做的职位的寻找方向；</p>
      <p>2. 新增的候选人简历的内容（个人信息、工作经历、教育经历、语言能力等）完整准确真实，完整度需达到90%以上；</p>
      <p>3. 与新增的候选人进行过有效电话沟通且填写匹配的有效沟通记录；</p>
      <p>4. 已按照公司“简历核对制度”要求仔细且正确的核对此候选人简历。</p>
    </a-modal>
    <a-modal v-model:open="openResumeCheckedTwoYear" title="简历激活" @ok="handleResumeCheckedTwoYear">
      <p>此简历新增之日起已满2年，根据公司制度，可以申请重新激活保护，请确认此简历匹配以下3条制度要求，方可申请重新激活保护：</p>
      <p>1. 候选人简历属于零售行业或属于目前公司在做的职位的寻找方向；</p>
      <p>2. 候选人简历更新至最新状态，且内容(个人信息、工作经历、教育经历等)完整准确真实，完整度需达到90%以上；</p>
      <p>3. 与此候选人使用公司有效电话沟通及简历核对且填写匹配的有效沟通记录；</p>
      <p>4. 如不符合以上3条，继续申请重新激活“在保”，视为恶意违反公司KPI制度规定，面临警告和罚款的处理，请务必认真对待。</p>
    </a-modal>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row_center">
      <a-tag color="#4bb632" :title="resumeProgressDetailTitle" class="resume_tag"
        >{{ resumeProgressDetailScore }}%</a-tag
      >
      <a-tag class="resume_tag_source" v-if="resumeData.talentSource" color="#00bcd4" title="来源">{{ resumeData.talentSource }}</a-tag>
      <a-tag color="#ccc" class="resume_tag_phone" style="cursor: pointer;" @click="handlePhoneNumToSystem(resumeData.phoneNum)"
        ><PhoneFilled :style="{ fontSize: '8px' }" :rotate="90" />
        <a-popover placement="topLeft">
          <template #content>
            <span>{{ resumeData.phoneNum }}</span>
          </template>
          查看
        </a-popover>
      </a-tag>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="16">
        标签:
        <a-tag class="tagspan" color="#a2c9fd" v-if="industryLabelDetail">
          {{industryLabelDetail}}
        </a-tag>
        <a-tag class="tagspan" color="#a2c9fd" v-if="positionsLabelDetail">
          {{positionsLabelDetail}}
        </a-tag>
        <a-tag class="tagspan" color="#a2c9fd" v-if="language">{{ language }}</a-tag>
        <a-tag class="tagspan" color="#a2c9fd" v-if="personLabel">{{ personLabel }}</a-tag>
        <PlusSquareFilled v-if="!tagFlag && showResumeAdd" @click="handleShowAddTag"/>
        <span v-if="tagFlag">
        <a-input v-if="!tagType" size="small" style="width: 80px;margin-right: 5px;" v-model:value="tagValue"/>
          <a-select v-if="tagType" size="small" style="width: 80px;margin-right: 5px;" v-model:value="tagValue" :options="optionsTag"></a-select>
          <a-tag color="blue" style="cursor: pointer;" @click="handleAddTag">添加</a-tag>
          <a-tag style="cursor: pointer;" @click="handleShowAddTag">取消</a-tag>
          <a-tag v-if="!tagType" style="cursor: pointer;" @click="handleChangeAddTag">选择</a-tag>
          <a-tag v-if="tagType" style="cursor: pointer;" @click="handleChangeAddTag">填写</a-tag>
      </span>
      </a-col>
      <a-col :span="8" style="text-align: right">
        <a-button
          v-if="uploadManageFlag"
          style="margin-left: 4px;background-color: orange;color: #fff;"
           size="middle"
          @click="handleOpenResumeUploadManage"
          >下载</a-button>
        <a-button
          v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '待核'"
          style="margin-left: 4px;background-color: orange;color: #fff;"
           size="middle"
          @click="handleAddChecked"
          >核对</a-button>
          <a-button
          v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '待激活'"
          style="margin-left: 4px;background-color: orange;color: #fff;"
           size="middle"
          @click="handleAddCheckedTwoYear"
          >激活</a-button>
       <a-button
          v-if="showResumeCopy"
          style="margin-left: 4px;"
           size="middle"
          @click="handleOpenResumeCopy"
          >复制</a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && (resumeData.recommendLimit == '推荐' || resumeData.zhuCeFlag == '注册顾问') && (resumeData.checkFlag == '最新'|| resumeData.checkFlag == '已激活')"
          type="primary"
          danger
          size="middle"
          @click="handleRecommendCandidatePosition"
        >
          {{ resumeData.recommendLimit }}
        </a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && resumeData.recommendLimit == '限制分单' && resumeData.checkFlag == '最新'"
          type="primary"
          danger
          title="在保推荐分单"
          size="middle"
          @click="handleRecommendCandidatePosition"
        >推荐</a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && resumeData.checkFlag == '待核'"
          size="middle"
          :disabled="true"
          title="需要核对后才能推荐"
        >
        推荐
        </a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && resumeData.recommendLimit == '限制推荐' && resumeData.checkFlag != '待核'"
          size="middle"
          :disabled="true"
          title="OFFER推荐禁止"
        >
        推荐
        </a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && resumeData.recommendLimit == '限制禁推' && resumeData.checkFlag != '待核'"
          size="middle"
          :disabled="true"
          title="在保推荐禁止"
        >
        推荐
        </a-button>
      </a-col>
    </a-row>
    <RecommendCandidatePosition />
    <a-modal :maskClosable="false" @cancel="handleCloseResumeUploadeManage" v-model:open="openResumeUploadeManage" style="width: 600px;" title="下载简历" :footer="null">
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="24">
              <a-radio-group v-model:value="templatTypeeManage">
              <a-radio value="youtai">优态模板</a-radio>
              <a-radio value="wotui">我推模板</a-radio>
              </a-radio-group>
              <a-switch style="margin-bottom: 3px;" v-model:checked="systemUsereManage" checked-children="联系方式已展示" un-checked-children="联系方式已隐藏" />
              <a-button size="small" style="margin-left: 5px;" @click="handleTemplateTypeeManage" type="primary">下载</a-button>
            </a-col>
          </a-row>
        </a-modal>
    <!-- <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        当前:
        <a-tag color="pink">行业</a-tag>
        <a-tag color="red">职类</a-tag>
        <a-tag color="green">职级</a-tag>
        <a-tag color="yellow">品类-类别</a-tag>
        <a-tag color="orange">品级</a-tag>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        过往:
        <a-tag color="pink">行业</a-tag>
        <a-tag color="red">职类</a-tag>
        <a-tag color="green">职级</a-tag>
        <a-tag color="yellow">品类-类别</a-tag>
        <a-tag color="orange">品级</a-tag>
      </a-col>
    </a-row> -->
  </div>
</template>
<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { storeToRefs } from 'pinia';
  import type { SelectProps } from 'ant-design-vue';
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import { PlusSquareFilled, PhoneFilled } from '@ant-design/icons-vue';
  import RecommendCandidatePosition from './RecommendCandidatePosition.vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeDetail,resumeId,personWholeFlag,workWholeFlag,educationWholeFlag,languageWholeFlag,selfWholeFlag } =storeToRefs(resumeDetailStore);
  const props = defineProps({
    resumeData: {
      type: Object,
      required: true,
    },
    showResumeAdd: {
      type: Boolean,
      default: false,
    }
  });
  const newTime = ref(
    props.resumeData.shouZengStartTime
      ? `最新: ${formatToDateMinute(props.resumeData.newtestStartTime)} - ${formatToDateMinute(
          props.resumeData.newtestEndTime,
        )}`
      : '',
  );
  const repeatTime = ref(
    props.resumeData.shouZengStartTime
      ? `首增: ${formatToDateMinute(props.resumeData.shouZengStartTime)} - ${formatToDateMinute(
          props.resumeData.shouZengEndTime,
        )}`
      : '',
  );
  // const personBaohuFlag = ref(
  //   props.resumeData.newtestEndTime && props.resumeData.newtestEndTime > new Date().getTime(),
  // );
  // const personBaohuTime = ref(
  //   props.resumeData.newtestEndTime
  //     ? `保护: ${formatToDateMinute(props.resumeData.personBaohuStartTime)} - ${formatToDateMinute(
  //         props.resumeData.personBaohuEndTime,
  //       )}`
  //     : '',
  // );
  // const resumeProgressDetail = reactive({
  //   person: personWholeFlag.value,
  //   work: workWholeFlag.value,
  //   education: educationWholeFlag.value,
  //   language: languageWholeFlag.value,
  //   self: selfWholeFlag.value,
  // });
  const resumeProgressDetailTitle = ref("");
  const resumeProgressDetailScore = ref(0);
  const resumeProgressDetail = () => {
    resumeProgressDetailTitle.value = "";
    resumeProgressDetailScore.value = 100;
    if (personWholeFlag.value) {
      resumeProgressDetailTitle.value += "个人信息缺失30分\n"
      resumeProgressDetailScore.value -= 30;
    } else {
      resumeProgressDetailTitle.value += "个人信息完整30分\n"
    }
    if (workWholeFlag.value) {
      resumeProgressDetailTitle.value += "工作经历缺失30分\n"
      resumeProgressDetailScore.value -= 30;
    } else {
      resumeProgressDetailTitle.value += "工作经历完整30分\n"
    }
    if (educationWholeFlag.value) {
      resumeProgressDetailTitle.value += "教育经历缺失20分\n"
      resumeProgressDetailScore.value -= 20;
    } else {
      resumeProgressDetailTitle.value += "教育经历完整20分\n"
    }
    if (languageWholeFlag.value) {
      resumeProgressDetailTitle.value += "语言能力缺失10分\n"
      resumeProgressDetailScore.value -= 10;
    } else {
      resumeProgressDetailTitle.value += "语言能力完整10分\n"
    }
    if (selfWholeFlag.value) {
      resumeProgressDetailTitle.value += "自我评价缺失10分"
      resumeProgressDetailScore.value -= 10;
    } else {
      resumeProgressDetailTitle.value += "自我评价完整10分"
    }
  }
  resumeProgressDetail();
  watch(() => personWholeFlag.value, () => {
    resumeProgressDetail();
  })
  watch(() => workWholeFlag.value, () => {
    resumeProgressDetail();
  })
  watch(() => educationWholeFlag.value, () => {
    resumeProgressDetail();
  })
  watch(() => languageWholeFlag.value, () => {
    resumeProgressDetail();
  })
  watch(() => selfWholeFlag.value, () => {
    resumeProgressDetail();
  })
  const industryLabel = ref(''); //行业
  //const industryLabelTitle = ref(''); //行业
  const positionsLabel = ref(''); //职类
  //const positionsLabelTitle = ref(''); //职类
  const rankLabel = ref(''); //职级
  //const rankLabelTitle = ref(''); //职级
  const brandLabel = ref(''); //品类-类别
  //const brandLabelTitle = ref(''); //品类-类别
  const gradeLabel = ref(''); //品级
  //const gradeLabelTitle = ref(''); //品级
  const language = ref(''); //语言
  //const languageTitle = ref(''); //语言
  //const pastLabel = ref(props.resumeData.pastLabel);
  const currentLabel = ref(props.resumeData.currentLabel);
  const resumeLabel = ref(props.resumeData.resumeLabel);
  //const pastArr = pastLabel.value?.split(',')[0]?.split('_') || ['','',''];
  const currentArr = currentLabel.value?.split('_') || ['','',''];
  const resumeArr = resumeLabel.value?.split('_') || ['','',''];

  //industryLabel.value = [...new Set([pastArr[0], currentArr[0], resumeArr[0]])].join('-');
  //industryLabelTitle.value = [[pastArr[0], currentArr[0], resumeArr[0]]].join('-');
  //brandLabel.value = [...new Set([pastArr[1], currentArr[1], resumeArr[1]])].join('-');
  //brandLabelTitle.value = [[pastArr[1], currentArr[1], resumeArr[1]]].join('-');
  //gradeLabel.value = [...new Set([pastArr[2], currentArr[2], resumeArr[2]])].join('-');
  //gradeLabelTitle.value = [[pastArr[2], currentArr[2], resumeArr[2]]].join('-');
  //positionsLabel.value = [...new Set([pastArr[3], currentArr[3], resumeArr[3]])].join('-');
  //positionsLabelTitle.value = [[pastArr[3], currentArr[3], resumeArr[3]]].join('-');
  //rankLabel.value = [...new Set([pastArr[4], currentArr[4], resumeArr[4]])].join('-');
  //rankLabelTitle.value = [[pastArr[4], currentArr[4], resumeArr[4]]].join('-');
  //language.value = [...new Set([resumeArr[5]])].join('-');
  //languageTitle.value = [[resumeArr[5]]].join('-');

  industryLabel.value = currentArr[0];
  brandLabel.value = currentArr[1];
  gradeLabel.value = currentArr[2];
  positionsLabel.value = currentArr[3];
  rankLabel.value = currentArr[4];
  language.value = resumeArr[5];
  const industryLabelDetail = ref("");
  if (industryLabel.value) {
    industryLabelDetail.value = industryLabel.value;
  }
  if (brandLabel.value) {
    industryLabelDetail.value += `-${brandLabel.value}`;
  }
  if (gradeLabel.value) {
    industryLabelDetail.value += `-${gradeLabel.value}`;
  }
  const handleRecommendCandidatePosition = () => {
    if (!props.resumeData.resumeLanguageList || props.resumeData.resumeLanguageList.length == 0) {
      message.error("请先添加语言能力");
      return;
    }
    let temp = true;
    props.resumeData.resumeLanguageList.forEach(item => {
      if (item.languageName == "英语") {
        temp = false;
      }
    });
    if (temp) {
      message.error("语言能力英语为必填");
      return;
    }
    resumeDetailStore.queryMappingIdByResumeId();
  };
  const positionsLabelDetail = ref("");
  if (positionsLabel.value) {
    positionsLabelDetail.value = positionsLabel.value;
  }
  if (rankLabel.value) {
    positionsLabelDetail.value += `-${rankLabel.value}`;
  }
  const openResumeCopy = ref(false);
  const showResumeCopy = ref(false);
  const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  const uploadManageFlag = ref(false);
  if (loginVueUser.loginId == '434' || loginVueUser.loginId == '444'  || loginVueUser.loginId == '142') {
    uploadManageFlag.value = true;
  }
  // 如果简历的创建人不是当前登录人，则显示复制简历按钮
    // 注意：此处需要和后端协商好，获取简历创建人id的api
    // 假设resumeDetail.recruitId 就是简历创建人id
    // 假设 resumeDetail.recruitId 和 loginVueUser.loginId 相等时，表示是创建人，可以显示复制简历按钮
    // 假设 resumeDetail.recruitId 和 loginVueUser.loginId 不等时，表示不是创建人，不可以显示复制简历按钮
    // 以下代码是假设简历创建人id是 resumeDetail.recruitId，loginVueUser.loginId是假设的登录人id
    if (props.resumeData.recruitId?.toString() != loginVueUser.loginId) {
      showResumeCopy.value = true;
    }
  const handleOpenResumeCopy = () => {
    openResumeCopy.value = true;
  };
  const resumeCopyFlag = ref(true);
  const handleResumeCopy = () => {
    if(!resumeCopyFlag.value) {
      return;
    }
    resumeCopyFlag.value = false;
    const isTwoYear = (!props.resumeData.recruitId && props.resumeData.twoYearFlag == '两年' ? "1" : "2")
    // 复制简历
    resumeDetailStore.resumeCopyToSelf(isTwoYear).then(res => {
      if (res.code === 1) {
        message.success('已复制到我的简历');
        openResumeCopy.value = false;
        resumeDetailStore.queryMappingIdByResumeId(res.info);
        resumeDetailStore.queryResumeDetail();
      }else if (res.code === 2) {
        message.warning('已复制无需再次复制');
        openResumeCopy.value = false;
      } else {
        message.error('复制简历失败');
      }
    });
  }
  const optionsTag = ref<SelectProps['options']>([
    {
      value: '求职',
      label: '求职',
    },
    {
      value: '不看',
      label: '不看',
    },
    {
      value: '暂缓',
      label: '暂缓',
    },
  ]);
  const tagType = ref(false);
  const handleChangeAddTag = () => {
    tagType.value = !tagType.value;
  }
  const personLabel = ref('');
  personLabel.value = props.resumeData.personLabel;
  const tagFlag = ref(false);

  const tagValue = ref('');
  const handleShowAddTag = () => {
    tagFlag.value = !tagFlag.value;
    tagType.value = false;
    tagValue.value = '';
  }
  const handleAddTag = () => {
    if (!tagValue.value) {
      message.error('请填写标签名称');
      return;
    }
    let tempTag = "";
    if (personLabel.value) {
      tempTag = `${personLabel.value}-${tagValue.value}`;
    }
    resumeDetailStore.addTag(tempTag).then((res) => {
      if (res.code === 1) {
        tagFlag.value = false;
        tagType.value = false;
        message.success('添加标签成功');
        if (personLabel.value) {
          personLabel.value = `${personLabel.value}-${tagValue.value}`;
        } else {
          personLabel.value = tagValue.value;
        }
        tagValue.value = '';
      } else {
        message.error('添加标签失败');
      }
    })
  }
  const openResumeChecked = ref(false);
  const handleAddChecked = () => {
    if (resumeProgressDetailScore.value < 90) {
      message.error('简历完整度需要大于90');
      return;
    }
    openResumeChecked.value = true;
  }
  const handleResumeChecked = () => {
    resumeDetailStore.addResumeChecked(resumeProgressDetailScore.value).then((res) => {
      if (res.code === 1) {
        resumeDetailStore.queryResumeDetail().then(() =>{
          openResumeChecked.value = false;
          message.success('添加已核成功');
        })
        
      } else {
        message.error(res.info);
      }
    })
  }
  const openResumeCheckedTwoYear = ref(false);
  const handleAddCheckedTwoYear = () => {
    if (resumeProgressDetailScore.value < 90) {
      message.error('简历完整度需要大于90');
      return;
    }
    openResumeCheckedTwoYear.value = true;
  }
  const handleResumeCheckedTwoYear = () => {
    resumeDetailStore.addResumeCheckedTwoYear(resumeProgressDetailScore.value).then((res) => {
      openResumeCheckedTwoYear.value = false;
      if (res.code === 1) {
        resumeDetailStore.queryResumeDetail().then(() =>{
          message.success('添加激活成功');
        })
      } else {
        message.error(res.info);
      }
    })
  }
  
  const handlePhoneNumToSystem = (phone) => {
   // 跳转到��号器��打电话
    window.open("http://work.wotui.com:8889/WTSM/employee-group/query-phone-resume-call.html?phoneNum=" + phone+"&userName="+props.resumeData.userName+"&workPlace="+resumeDetail.value.resume.currentCity+"&positionName="+resumeDetail.value.resume.positionName,"_blank ");
  }
  const openResumeUploadeManage = ref(false);
  const systemUsereManage = ref(false);
  const templatTypeeManage = ref('');
  const handleOpenResumeUploadManage = () => {
    openResumeUploadeManage.value = true;
  }
  const handleCloseResumeUploadeManage = () => {
    openResumeUploadeManage.value = false;
    systemUsereManage.value = false;
    templatTypeeManage.value = '';
  }
  const screenWidth = Math.round(window.screen.width * window.devicePixelRatio);
  const handleTemplateTypeeManage = () => {
    const systemUserTemp = systemUsereManage.value ? "1" : "2";
    location.href = `http://work.wotui.com:8889/WTSM/DownloadResumeServlet?resumeId=${resumeId.value}&resumeType=C&systemUser=${systemUserTemp}&template=${templatTypeeManage.value}&realEnName=&screenWidth=${screenWidth}`
    handleCloseResumeUploadeManage();
  }
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 0 0px;
    padding: 5px 20px 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
    position: sticky;
    background-color: #fff;
    z-index: 1;
    top: -10px;
  }
  .resume_h3 {
    margin: 10px 0 5px;
    font-size: 26px;
  }
  .resume_row {
    margin: 5px 0;
  }
  .resume_row_center {
    margin: 5px 0 10px;
  }
  .resume_info {
    display: flex;
    align-items: center;
  }
  .resume_tag_checked {
    margin-left: 5px;
    margin-top: 10px;
    margin-inline-end: 0;
    border-radius: 8px;
  }
  .resume_tag_checked_top {
    margin-top: 10px;
    margin-left: 5px;
    margin-inline-end: 0;
    border-radius: 8px;
  }
  .resume_tag {
    margin-left: 15px;
    margin-inline-end: 0;
    border-radius: 8px;
  }
  .resume_tag_source {
    margin-left: 5px;
    margin-inline-end: 0;
    border-radius: 8px;
  }
  .resume_tag_phone {
    color: #000;
    margin-left: 5px;
    margin-inline-end: 0;
    border-radius: 8px;
  }
  .tagspan {
    margin-inline-end: 4px;
    border-radius: 8px;
  }
  :deep(.resume_tag_phone > .anticon + span, .resume_tag_phone > span + .anticon) {
    margin-inline-start: 0px !important;
  }
</style>
