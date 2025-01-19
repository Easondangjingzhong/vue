<template>
  <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_info">
        <h2 class="resume_h3">{{ resumeData.userName }}</h2>
        <a-tag color="#ffd522" class="resume_tag_checked" v-if="resumeData.heDuiFlag == '待核'"
          >待核</a-tag
        >
        <a-tag
          color="#4bb632"
          class="resume_tag_checked"
          :title="newTime"
          v-if="resumeData.heDuiFlag == '已核'"
          >最新</a-tag
        >
        <a-tag
          color="#ccc"
          class="resume_tag_checked_top"
          :title="repeatTime"
          v-if="!resumeData.isRepeat && resumeData.heDuiFlag == '待核'"
          >首增</a-tag
        >
        <a-tag
          color="#4bb632"
          class="resume_tag_checked_top"
          :title="repeatTime"
          v-if="!resumeData.isRepeat && resumeData.heDuiFlag == '已核'"
          >首增</a-tag
        >
        <a-tag
          color="#4bb632"
          class="resume_tag_checked_top"
          :title="personBaohuTime"
          v-if="personBaohuFlag"
          >保护</a-tag
        >
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row_center">
      <a-tag color="#4bb632" title="完整度" class="resume_tag"
        >{{ resumeData.resumeProgress }}%</a-tag
      >
      <a-tag color="#00bcd4" title="来源">{{ resumeData.talentSource }}</a-tag>
      <a-tag color="#ccc" class="resume_tag_phone"
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
      <a-col :span="21">
        标签:
        <a-tag color="#a2c9fd" v-if="industryLabel" :title="industryLabelTitle">{{
          industryLabel
        }}</a-tag>
        <a-tag color="#a2c9fd" v-if="positionsLabel" :title="positionsLabelTitle">{{
          positionsLabel
        }}</a-tag>
        <a-tag color="#a2c9fd" v-if="rankLabel" :title="rankLabelTitle">{{ rankLabel }}</a-tag>
        <a-tag color="#a2c9fd" v-if="brandLabel" :title="brandLabelTitle">{{ brandLabel }}</a-tag>
        <a-tag color="#a2c9fd" v-if="gradeLabel" :title="gradeLabelTitle">{{ gradeLabel }}</a-tag>
        <a-tag color="#a2c9fd" v-if="language" :title="languageTitle">{{ language }}</a-tag>
        <PlusSquareFilled />
      </a-col>
      <a-col :span="3" style="text-align: right">
        <a-button
          v-if="resumeData.recommendLimit == '推荐'"
          type="primary"
          danger
          size="small"
          @click="handleRecommendCandidatePosition"
        >
          {{ resumeData.recommendLimit }}
        </a-button>
        <a-button
          v-if="resumeData.recommendLimit == '限制推荐'"
          disabled
          type="primary"
          danger
          size="small"
        >
          {{ resumeData.recommendLimit }}
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
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import { PlusSquareFilled, PhoneFilled } from '@ant-design/icons-vue';
  import RecommendCandidatePosition from './RecommendCandidatePosition.vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  const props = defineProps({
    resumeData: {
      type: Object,
      required: true,
    },
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
    props.resumeData.newtestEndTime && props.resumeData.newtestEndTime < new Date().getTime(),
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
    font-size: 24px;
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
    margin-top: 3px;
  }
  .resume_tag_checked_top {
    margin-top: 3px;
  }
  .resume_tag {
    margin-left: 15px;
  }
  .resume_tag_phone {
    color: #000;
  }
  :deep(.resume_tag_phone > .anticon + span, .resume_tag_phone > span + .anticon) {
    margin-inline-start: 0px !important;
  }
</style>
