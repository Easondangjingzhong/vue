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
        <a-tag style="cursor: pointer;" color="#d8d8d8" class="resume_tag_checked" v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '待核'"
          >待核</a-tag
        >
        <a-tag
          color="green"
          class="resume_tag_checked"
          :title="newTime"
          v-if="resumeData.recruitId && resumeData.checkFlag && resumeData.checkFlag != '待核'"
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
        <a-tag
          color="orange"
          class="resume_tag_checked_top"
          v-if="resumeData.limitFlag == '激活'"
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
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row_center">
      <a-tag color="#4bb632" title="完整度" class="resume_tag"
        >{{ resumeData.resumeProgress }}%</a-tag
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
      <a-col :span="18">
        标签:
        <a-tag class="tagspan" color="#a2c9fd" v-if="industryLabel">
          {{industryLabel}}
          {{ brandLabel }}
          {{ gradeLabel }}
        </a-tag>
        <a-tag class="tagspan" color="#a2c9fd" v-if="positionsLabel">
          {{positionsLabel}}
          {{ rankLabel }}
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
      <a-col :span="6" style="text-align: right">
        <a-button
          v-if="showResumeAdd && resumeData.recruitId && resumeData.checkFlag == '待核'"
          style="margin-left: 4px;background-color: orange;color: #fff;"
           size="middle"
          @click="handleAddChecked"
          >核对</a-button>
        <!-- <a-button
          v-if="showResumeAdd && resumeData.heDuiFlag == '已核'"
          style="margin-left: 4px;background-color: #FF9800;color: #fff;"
           size="middle"
          @click="handleOpenResumeUpload"
          >下载</a-button> -->
       <a-button
          v-if="showResumeCopy"
          style="margin-left: 4px;"
           size="middle"
          @click="handleOpenResumeCopy"
          >复制</a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && resumeData.recommendLimit == '推荐' && resumeData.checkFlag == '最新'"
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
          v-if="showResumeAdd && resumeData.recommendLimit == '限制推荐'"
          size="middle"
          :disabled="true"
          title="OFFER推荐禁止"
        >
        推荐
        </a-button>
        <a-button
        style="margin-left: 4px;"
          v-if="showResumeAdd && resumeData.recommendLimit == '限制禁推'"
          size="middle"
          :disabled="true"
          title="在保推荐禁止"
        >
        推荐
        </a-button>
      </a-col>
    </a-row>
    <RecommendCandidatePosition />
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
  const { resumeDetail } =storeToRefs(resumeDetailStore);
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
  const personBaohuFlag = ref(
    props.resumeData.newtestEndTime && props.resumeData.newtestEndTime > new Date().getTime(),
  );
  const personBaohuTime = ref(
    props.resumeData.newtestEndTime
      ? `保护: ${formatToDateMinute(props.resumeData.personBaohuStartTime)} - ${formatToDateMinute(
          props.resumeData.personBaohuEndTime,
        )}`
      : '',
  );
  const industryLabel = ref(''); //行业
  const industryLabelTitle = ref(''); //行业
  const positionsLabel = ref(''); //职类
  const positionsLabelTitle = ref(''); //职类
  const rankLabel = ref(''); //职级
  const rankLabelTitle = ref(''); //职级
  const brandLabel = ref(''); //品类-类别
  const brandLabelTitle = ref(''); //品类-类别
  const gradeLabel = ref(''); //品级
  const gradeLabelTitle = ref(''); //品级
  const language = ref(''); //语言
  const languageTitle = ref(''); //语言
  const pastLabel = ref(props.resumeData.pastLabel);
  const currentLabel = ref(props.resumeData.currentLabel);
  const resumeLabel = ref(props.resumeData.resumeLabel);
  const pastArr = pastLabel.value?.split(',')[0]?.split('_') || ['','',''];
  const currentArr = currentLabel.value?.split('_') || ['','',''];
  const resumeArr = resumeLabel.value?.split('_') || ['','',''];

  industryLabel.value = [...new Set([pastArr[0], currentArr[0], resumeArr[0]])].join('-');
  industryLabelTitle.value = [[pastArr[0], currentArr[0], resumeArr[0]]].join('-');
  brandLabel.value = [...new Set([pastArr[1], currentArr[1], resumeArr[1]])].join('-');
  brandLabelTitle.value = [[pastArr[1], currentArr[1], resumeArr[1]]].join('-');
  gradeLabel.value = [...new Set([pastArr[2], currentArr[2], resumeArr[2]])].join('-');
  gradeLabelTitle.value = [[pastArr[2], currentArr[2], resumeArr[2]]].join('-');
  positionsLabel.value = [...new Set([pastArr[3], currentArr[3], resumeArr[3]])].join('-');
  positionsLabelTitle.value = [[pastArr[3], currentArr[3], resumeArr[3]]].join('-');
  rankLabel.value = [...new Set([pastArr[4], currentArr[4], resumeArr[4]])].join('-');
  rankLabelTitle.value = [[pastArr[4], currentArr[4], resumeArr[4]]].join('-');
  language.value = [...new Set([resumeArr[5]])].join('-');
  languageTitle.value = [[resumeArr[5]]].join('-');

  const handleRecommendCandidatePosition = () => {
    resumeDetailStore.queryMappingIdByResumeId();
  };
  const openResumeCopy = ref(false);
  const showResumeCopy = ref(false);
  const loginVueUser: {loginName: "", loginId: "", loginTocken: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
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
    // 复制简历
    resumeDetailStore.resumeCopyToSelf().then(res => {
      if (res.code === 1) {
        message.success('已复制到我的简历');
        openResumeCopy.value = false;
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
      value: '零售业',
      label: '零售业',
    },
    {
      value: '服装服饰',
      label: '服装服饰',
    },
    {
      value: '全品类',
      label: '全品类',
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
    if (props.resumeData.resumeProgress < 90) {
      message.error('简历完整度需要大于90');
      return;
    }
    openResumeChecked.value = true;
  }
  const handleResumeChecked = () => {
    resumeDetailStore.addResumeChecked().then((res) => {
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
  
  const handlePhoneNumToSystem = (phone) => {
   // 跳转到��号器��打电话
    window.open("http://work.wotui.com:8889/WTSM/employee-group/query-phone-resume-call.html?phoneNum=" + phone+"&userName="+props.resumeData.userName+"&workPlace="+resumeDetail.value.resume.currentCity+"&positionName="+resumeDetail.value.resume.positionName,"_blank ");
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
