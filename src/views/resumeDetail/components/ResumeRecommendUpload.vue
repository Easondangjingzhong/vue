<template>
  <div class="word-style word-content">
    <div class="word-left"></div>
    <div class="word-right">
      <div class="header-img">
        <img v-if="templateType == '0'" src="http://www.wotui.com/images/youtai2.png" />
        <img v-else src="http://www.wotui.com/images/wotuititle.png" />
      </div>
      <div class="header" v-if="(resumeShowFlag || resumeReportFlag) && resume.resumeReport">
        <h4 class="word-p">
          <span v-if="resumeTypeEnglish == '1'">Candidate Comments</span>
          <span v-else>简历报告</span>
          <a-button
            size="small"
            v-if="!resumeShowBtnUpdateFlag && resumeReportFlag"
            ghost
            class="btn-open"
            type="primary"
            @click="handleResumeReportFlag"
            >报告已开放</a-button
          ><a-button
            class="btn-close"
            ghost
            danger
            size="small"
            type="primary"
            v-if="!resumeShowBtnUpdateFlag && !resumeReportFlag"
            @click="handleResumeReportFlag"
            >报告已隐藏</a-button
          ></h4
        >
        <ul>
          <li
            v-for="(item, index) in convertDuties(resume.resumeReport.reportContent)"
            :key="index"
            >{{ item }}</li
          >
        </ul>
        <h2>{{ resume.userName }}</h2>
      </div>

      <div class="section-title">
        <span v-if="resumeTypeEnglish == '1'">Personal Information</span>
        <span v-else>基本信息</span>
      </div>
      <div class="basic-info" v-if="resumeTypeEnglish != '1'">
        <div
          class="info-left"
          :class="{ 'basic-info-en': resumeTypeEnglish == '1' ? true : false }"
        >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Age: </strong>
            <strong v-else>年龄：</strong>
            {{ borth }}
            <a-button
              size="small"
              v-if="handleResumebIdFlag && !resumeShowBtnUpdateFlag && borthFlag"
              ghost
              class="btn-open"
              type="primary"
              @click="handleBorthFlag"
              >年龄已开放</a-button
            ><a-button
              class="btn-close"
              ghost
              danger
              size="small"
              type="primary"
              v-if="handleResumebIdFlag && !resumeShowBtnUpdateFlag && !borthFlag"
              @click="handleBorthFlag"
              >年龄已隐藏</a-button
            ></p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Nationality：</strong>
            <strong v-else>国籍：</strong>
            {{ resume.nationality ? resume.nationality : '' }}</p
          >
          <p v-if="resume.currentCity != '香港' && resume.currentCity != '澳门'">
            <strong v-if="resumeTypeEnglish == '1'">Place of Origin：</strong>
            <strong v-else>户籍：</strong>
            {{ resume.province ? resume.province : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">CurrentCity：</strong>
            <strong v-else>居住地：</strong>
            {{ resume.currentCity ? resume.currentCity : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Mobile：</strong>
            <strong v-else>手机：</strong>
            {{ resume.phoneNum ? resume.phoneNum : '' }}</p
          >
          <p v-if="resume.currentCity == '香港' || resume.currentCity == '澳门'">&nbsp;</p>
        </div>
        <div
          class="info-right"
          :class="{ 'basic-info-en': resumeTypeEnglish == '1' ? true : false }"
        >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Gender：</strong>
            <strong v-else>性别：</strong>
            {{ resume.gender ? (resume.gender == 'M' ? '男' : '女') : '' }}</p
          >
          <p v-if="resume.currentCity == '香港' || resume.currentCity == '澳门'">
            <strong v-if="resumeTypeEnglish == '1'">Place of Origin：</strong>
            <strong v-else>户籍：</strong>
            {{ resume.province ? resume.province : '' }}</p
          >
          <p v-if="resume.currentCity != '香港' && resume.currentCity != '澳门'">
            <strong v-if="resumeTypeEnglish == '1'">Height：</strong>
            <strong v-else>身高：</strong>
            {{ resume.height ? resume.height + 'cm' : '' }}</p
          >
          <p v-if="resume.currentCity != '香港' && resume.currentCity != '澳门'">
            <strong v-if="resumeTypeEnglish == '1'">Weight：</strong>
            <strong v-else>体重：</strong>
            {{ resume.weight ? resume.weight + 'kg' : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">MaritalStatus：</strong>
            <strong v-else>婚姻状态：</strong>
            {{ resume.marraiageStatus ? resume.marraiageStatus : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Email：</strong>
            <strong v-else>邮箱：</strong>
            {{ resume.email ? resume.email : '' }}</p
          >
          <p v-if="resume.currentCity == '香港' || resume.currentCity == '澳门'">&nbsp;</p>
        </div>
        <div class="photo">
          <img :src="resume.photoPath" alt="照片" />
        </div>
      </div>
<div class="basic-info" v-if="resumeTypeEnglish == '1'">
        <div
          class="info-left"
          :class="{ 'basic-info-en': resumeTypeEnglish == '1' ? true : false }"
        >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Age: </strong>
            <strong v-else>年龄：</strong>
            {{ borth }}
            <a-button
              size="small"
              v-if="handleResumebIdFlag && !resumeShowBtnUpdateFlag && borthFlag"
              ghost
              class="btn-open"
              type="primary"
              @click="handleBorthFlag"
              >年龄已开放</a-button
            ><a-button
              class="btn-close"
              ghost
              danger
              size="small"
              type="primary"
              v-if="handleResumebIdFlag && !resumeShowBtnUpdateFlag && !borthFlag"
              @click="handleBorthFlag"
              >年龄已隐藏</a-button
            ></p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Gender：</strong>
            <strong v-else>性别：</strong>
            {{ resume.gender ? (resume.gender == 'M' ? 'Male' : 'Female') : '' }}</p>
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Nationality：</strong>
            <strong v-else>国籍：</strong>
            {{ resume.nationality ? resume.nationality : '' }}</p
          >
           <p v-if="resume.currentCity != 'Hong Kong' && resume.currentCity != 'Macao'">
            <strong v-if="resumeTypeEnglish == '1'">Height：</strong>
            <strong v-else>身高：</strong>
            {{ resume.height ? resume.height + 'cm' : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Place of Origin：</strong>
            <strong v-else>户籍：</strong>
            {{ resume.province ? resume.province : '' }}</p
          >
           <p v-if="resume.currentCity != 'Hong Kong' && resume.currentCity != 'Macao'">
            <strong v-if="resumeTypeEnglish == '1'">Weight：</strong>
            <strong v-else>体重：</strong>
            {{ resume.weight ? resume.weight + 'kg' : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">CurrentCity：</strong>
            <strong v-else>居住地：</strong>
            {{ resume.currentCity ? resume.currentCity : '' }}</p
          >
           <p>
            <strong v-if="resumeTypeEnglish == '1'">MaritalStatus：</strong>
            <strong v-else>婚姻状态：</strong>
            {{ resume.marraiageStatus ? resume.marraiageStatus : '' }}</p
          >
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Mobile：</strong>
            <strong v-else>手机：</strong>
            {{ resume.phoneNum ? resume.phoneNum : '' }}</p
          >
           <p>
            <strong v-if="resumeTypeEnglish == '1'">Email：</strong>
            <strong v-else>邮箱：</strong>
            {{ resume.email ? resume.email : '' }}</p
          >
        </div>
        <!-- <div
          class="info-right"
          :class="{ 'basic-info-en': resumeTypeEnglish == '1' ? true : false }"
        ></div> -->
        <div class="photoEn">
          <img :src="resume.photoPath" alt="照片" />
        </div>
      </div>
      <div class="section-title word-p" v-if="resumeTypeEnglish != '1' && (resumeShowFlag || resumeJobtitleFlag)">
        <span v-if="resumeTypeEnglish == '1'">Work Overview</span>
        <span v-else>职业概况</span>
        <a-button
          ghost
          size="small"
          v-if="!resumeShowBtnUpdateFlag && resumeJobtitleFlag"
          class="btn-open"
          type="primary"
          @click="handleJobtitleFlag()"
          >概况已开放</a-button
        ><a-button
          ghost
          class="btn-close"
          danger
          size="small"
          type="primary"
          v-if="!resumeShowBtnUpdateFlag && !resumeJobtitleFlag"
          @click="handleJobtitleFlag()"
          >概况已隐藏</a-button
        >
      </div>
      <table v-if="resumeTypeEnglish != '1' && (resumeShowFlag || resumeJobtitleFlag)">
       <tbody>
        <tr style="line-height: 0.3">
          <th style="width: 20%">
            <span v-if="resumeTypeEnglish == '1'">Timeline</span>
            <span v-else>时间线</span>
          </th>
          <th>
            <span v-if="resumeTypeEnglish == '1'">Company</span>
            <span v-else>公司</span>
          </th>
          <th>
            <span v-if="resumeTypeEnglish == '1'">Position</span>
            <span v-else>职位</span>
          </th>
        </tr>
        <tr v-for="item in workExpeListTable">
          <td>{{ item.time }}</td>
          <td>{{ item.companyAllName }}</td>
          <td>{{ item.positionName }}</td>
        </tr>
        </tbody>
      </table>

      <div class="section-title">
        <span v-if="resumeTypeEnglish == '1'">Work Experience</span>
        <span v-else>工作经历</span>
      </div>
      <div v-for="item in workExpeList">
        <p class="word-p"
          ><strong style="margin-right: 10px">{{ item.time }}</strong> {{ item.companyAllName }}
          <a-button
            size="small"
            v-if="item.officeShowHide && !resumeShowBtnUpdateFlag && item.officeHide != '1'"
            class="btn-open"
            ghost
            type="primary"
            @click="handleCompanyAllNameFlag(item)"
            >品牌已开放</a-button
          ><a-button
            class="btn-close"
            ghost
            danger
            size="small"
            type="primary"
            v-if="item.officeShowHide && !resumeShowBtnUpdateFlag && item.officeHide == '1'"
            @click="handleCompanyAllNameFlag(item)"
            >品牌已隐藏</a-button
          ></p
        >
        <p v-if="item.positionName">
          <strong v-if="resumeTypeEnglish == '1'">Position：</strong>
          <strong v-else>职位名称：</strong>
          {{ item.positionName }}</p
        >
        <p v-if="item.reporter">
          <strong v-if="resumeTypeEnglish == '1'">Reports To：</strong>
          <strong v-else>汇报对象：</strong>
          {{ item.reporter }}</p
        >
        <p
          class="word-p"
          v-if="
            (resumeShowFlag && item.salaryStructure) ||
            (item.salaryStructure && item.salaryHide != '1')
          "
        >
          <strong v-if="resumeTypeEnglish == '1'">Salary Structure：</strong>
          <strong v-else>薪资架构：</strong>
          {{ item.salaryStructure }}
          <a-button
            size="small"
            v-if="!resumeShowBtnUpdateFlag && item.salaryHide != '1' && item.isNewtest != '1'"
            ghost
            class="btn-open"
            type="primary"
            @click="handleSalaryStructureFlag(item)"
            >薪资已开放</a-button
          ><a-button
            class="btn-close"
            ghost
            danger
            size="small"
            type="primary"
            v-if="!resumeShowBtnUpdateFlag && item.salaryHide == '1' && item.isNewtest != '1'"
            @click="handleSalaryStructureFlag(item)"
            >薪资已隐藏</a-button
          ></p
        >
        <p
          class="word-p"
          v-if="
            (resumeShowFlag && item.personnelStructure) ||
            (item.personnelStructure && item.personHide != '1')
          "
        >
          <strong v-if="resumeTypeEnglish == '1'">Team Structure：</strong>
          <strong v-else>人员架构：</strong>
          {{ item.personnelStructure }}
          <a-button
            size="small"
            v-if="!resumeShowBtnUpdateFlag && item.personHide != '1' && item.isNewtest != '1'"
            ghost
            class="btn-open"
            type="primary"
            @click="handlePersonnelStructureFlag(item)"
            >人员已开放</a-button
          ><a-button
            class="btn-close"
            ghost
            danger
            size="small"
            type="primary"
            v-if="!resumeShowBtnUpdateFlag && item.personHide == '1' && item.isNewtest != '1'"
            @click="handlePersonnelStructureFlag(item)"
            >人员已隐藏</a-button
          ></p
        >
        <p
          class="word-p"
          v-if="
            (resumeShowFlag && item.shopVolume) || (item.shopVolume && item.shopVolumeHide != '1')
          "
        >
          <strong v-if="resumeTypeEnglish == '1'">Business Volume：</strong>
          <strong v-else>生意体量：</strong>
          {{ item.shopVolume }}
          <a-button
            size="small"
            v-if="!resumeShowBtnUpdateFlag && item.shopVolumeHide != '1' && item.isNewtest != '1'"
            ghost
            class="btn-open"
            type="primary"
            @click="handleShopVolumeFlag(item)"
            >体量已开放</a-button
          ><a-button
            class="btn-close"
            ghost
            danger
            size="small"
            type="primary"
            v-if="!resumeShowBtnUpdateFlag && item.shopVolumeHide == '1' && item.isNewtest != '1'"
            @click="handleShopVolumeFlag(item)"
            >体量已隐藏</a-button
          ></p
        >
        <p v-if="item.workDuty">
          <strong v-if="resumeTypeEnglish == '1'">Responsibilities：</strong>
          <strong v-else>工作职责：</strong>
        </p>
        <ul v-if="item.workDuty">
          <li v-for="(duty, index) in convertDuties(item.workDuty)" :key="index">{{ duty }}</li>
        </ul>
      </div>

      <div class="section-title">
        <span v-if="resumeTypeEnglish == '1'">Education Experience</span>
        <span v-else>教育背景</span>
      </div>
      <!-- <div v-for="(item) in eduExpeList">
      <p>{{ item.time }} </p>
      <p>{{ item.schoolName }}</p>
      <p v-if="item.majorName"><strong>专业名称：</strong>{{ item.majorName }}</p>
      <p v-if="item.degree"><strong>学历：</strong>{{ item.degree }}</p>
      <p v-if="item.isRegular"><strong>统招：</strong>{{ item.isRegular }}</p>
    </div> -->
      <div class="edu-info" v-for="item in eduExpeList">
        <div class="edu-time-school">
          <p>{{ item.time }}</p>
          <p>
            <strong v-if="resumeTypeEnglish == '1'">Major：</strong>
            <strong v-else>专业名称：</strong>
            {{ item.majorName }}</p
          >
        </div>
        <div class="edu-details">
          <p>{{ item.schoolName }}</p>
          <div class="edu-details-row">
            <p>
              <strong v-if="resumeTypeEnglish == '1'">Degree：</strong>
              <strong v-else>学历：</strong>
              {{ item.degree }}</p
            >
            <p
              v-if="
                item.degree != '中专' &&
                item.degree != '高中' &&
                item.degree != '职高' &&
                item.degree != '初中'
              "
            >
              <strong v-if="resumeTypeEnglish == '1'">Regular：</strong>
              <strong v-else>统招：</strong>
              {{ item.isRegular }}</p
            >
          </div>
        </div>
      </div>

      <div class="section-title" v-if="resumeLanguageListFlag">
        <span v-if="resumeTypeEnglish == '1'">Language Ability</span>
        <span v-else>语言能力</span>
      </div>
      <ul class="section-language" v-if="resumeLanguageListFlag">
        <li v-for="(item, index) in resumeLanguageList" :key="index">{{ item.languageAbility }}</li>
      </ul>
      <div v-if="resume.selfEvaluation" class="section-title">
        <span v-if="resumeTypeEnglish == '1'">Self-Assessment</span>
        <span v-else>自我评价</span>
      </div>
      <ul class="section-language" v-if="resume.selfEvaluation">
        <li v-for="(item, index) in convertDuties(resume.selfEvaluation)" :key="index">{{
          item
        }}</li>
      </ul>
    </div>
  </div>
  <div
    style="display: flex; justify-content: center; gap: 10px; margin-top: 10px; margin-bottom: 10px"
  >
    <a-button
      v-if="resumeShowBtnFlag && !resumeShowBtnUpdateFlag"
      ghost
      size="large"
      type="primary"
      danger
      @click="handleResumeError"
    >
      简历有误，返回修改
    </a-button>
    <a-button
      v-if="!resumeShowBtnFlag"
      ghost
      class="btn-open-bottom"
      size="large"
      type="primary"
      @click="handleResumeYuLan"
    >
      保存并预览简历
    </a-button>
    <a-button
      v-if="resumeShowBtnUpdateFlag"
      ghost
      type="primary"
      size="large"
      danger
      @click="handleResumeUpdate"
    >
      返回修改
    </a-button>
    <a-button
      v-if="(resumeShowBtnFlag || resumeShowBtnUpdateFlag) && props.repeatFlag == 1"
      ghost
      class="btn-open-bottom"
      size="large"
      type="primary"
      @click="handleResumeRecommend"
    >
      简历准确无误，直接推荐
    </a-button>
    <a-button
      v-if="(resumeShowBtnFlag || resumeShowBtnUpdateFlag) && props.repeatFlag == 2"
      ghost
      class="btn-open-bottom"
      size="large"
      type="primary"
      @click="handleRecommendConfirmAppeal"
    >
      简历准确无误，发起申诉
    </a-button>
    <a-button
      v-if="(resumeShowBtnFlag || resumeShowBtnUpdateFlag) && props.repeatFlag == 22"
      ghost
      class="btn-open-bottom"
      size="large"
      type="primary"
      @click="handleRecommendConfirmAppeal"
    >
      简历准确无误，发起申诉
    </a-button>
    <a-button
      v-if="(resumeShowBtnFlag || resumeShowBtnUpdateFlag) && !repeatRecommendFlag"
      ghost
      class="btn-open-bottom"
      size="large"
      type="primary"
      @click="handleResumeRecommendRepeat"
    >
      简历准确无误，重新推荐
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import dayjs from 'dayjs';
  import { currentDate } from '/@/utils/dateUtil';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeRecommendUploadData, handleResumebId, repeatRecommendFlag, resumeTypeEnglish } =
    storeToRefs(resumeDetailStore);
  const currentYear = dayjs(currentDate()).year();
  const currentMonth = dayjs(currentDate()).month() + 1;
  const resumeData = ref({});
  const resume = ref({});
  const templateType = ref('');
  const borth = ref('');
  const workExpeList = ref([]);
  const workExpeListTable = ref([]);
  const eduExpeList = ref([]);
  const resumeLanguageList = ref([]);
  const resumeLanguageListFlag = ref(false);
  const resumeShowBtnFlag = ref(true);
  const resumeShowFlag = ref(true);
  const resumeReportFlag = ref(true);
  const resumeJobtitleFlag = ref(true);
  const borthFlag = ref(true);
  const handleResumebIdFlag = ref(false);
  const recommendHideCollects = ref({});
  const props = defineProps({
    repeatFlag: {
      type: Number,
      required: true,
    },
  });
  watch(
    () => resumeRecommendUploadData.value,
    () => {
      handleResumeRecommendUploadData(1);
    },
  );
  const handleResumeRecommendUploadData = (type) => {
    resumeData.value = resumeRecommendUploadData.value;
    resume.value = resumeData.value.resume;
    if (resumeData.value.recommendHideCollects?.length > 0 && type == 1) {
      recommendHideCollects.value = resumeData.value.recommendHideCollects[0];
      if (recommendHideCollects.value.jobtitleHide == '1') {
        resumeJobtitleFlag.value = false;
      } else {
        resumeJobtitleFlag.value = true;
      }
      if (recommendHideCollects.value.ageHide == '1') {
        borthFlag.value = false;
      } else {
        borthFlag.value = true;
      }
      if (recommendHideCollects.value.reportHide == '1') {
        resumeReportFlag.value = false;
      } else {
        resumeReportFlag.value = true;
      }
    }
    templateType.value = resumeData.value.template;
    handleResumeRecommendUploadDataDetail();
  };
  const languageNameObj = {
    英语: 'English',
    法语: 'French',
    日语: 'Japanese',
    德语: 'German',
    韩语: 'Korean',
    粤语: 'Cantonese',
    中文: 'Chinese',
  };
  const extractEnglishName = (englishName) => {
    const hasChinese = /[\u4e00-\u9fa5]/.test(englishName);
    const hasEnglish = /[a-zA-Z]/.test(englishName);
    if (hasEnglish) {
      return englishName
        .replace(/[^\u0000-\u007F&]/g, '') // 保留基本ASCII字符和&
        .replace(/^.*\//, '') // 去除斜杠前的中文部分
        .trim();
    }
    if (hasChinese) {
      return englishName.replace(/[^\u4e00-\u9fa5&]/g, '').trim();
    }
    return englishName.replace(/[^\u4e00-\u9fa5&]/g, '').trim();
  };
  const handleResumeRecommendUploadDataDetail = () => {
    let birthYear = resume.value.birthYear;
    if (handleResumebId.value == '3779') {
      handleResumebIdFlag.value = true;
    }
    if (birthYear) {
      let age = '';
      if (resumeTypeEnglish.value == '1') {
        if (currentMonth - resume.value.bornMonth > 0) {
          age = currentYear - resume.value.birthYear;
        } else {
          age = currentYear - resume.value.birthYear - 1;
        }
      } else {
        if (currentMonth - resume.value.bornMonth > 0) {
          age = currentYear - resume.value.birthYear + '岁';
        } else {
          age = currentYear - resume.value.birthYear - 1 + '岁';
        }
      }

      let ageYearAndMonth = '';
      let borthMonth = resume.value.bornMonth;
      let borthDay = resume.value.bornDay;
      if (borthMonth - 0 < 10) {
        borthMonth = '0' + (borthMonth - 0);
      }
      if (borthDay && borthDay - 0 < 10) {
        borthDay = '0' + (borthDay - 0);
        ageYearAndMonth = ' (' + birthYear + '-' + borthMonth + '-' + borthDay + ')';
      } else if (borthDay) {
        ageYearAndMonth = ' (' + birthYear + '-' + borthMonth + '-' + borthDay + ')';
      } else {
        ageYearAndMonth = ' (' + birthYear + '-' + borthMonth + ')';
      }
      if (resumeShowFlag.value || borthFlag.value) {
        borth.value = age + ageYearAndMonth;
      } else {
        borth.value = age + ' (' + birthYear + ')';
      }
    }
    if (resume.value.workExpeList && resume.value.workExpeList.length > 0) {
      workExpeListTable.value = resume.value.workExpeList.map((item) => {
        let temp = {};
        let startMonth = item.startMonth;
        if (startMonth - 0 < 10) {
          startMonth = '0' + (startMonth - 0);
        }
        if (item.endYear == '-1') {
          if (resumeTypeEnglish.value == '1') {
            temp.time = item.startYear + '.' + startMonth + ' - Present';
          } else {
            temp.time = item.startYear + '.' + startMonth + ' - 至今';
          }
        } else {
          let endMonth = item.endMonth;
          if (endMonth - 0 < 10) {
            endMonth = '0' + (endMonth - 0);
          }
          temp.time = item.startYear + '.' + startMonth + ' - ' + item.endYear + '.' + endMonth;
        }
        let companyAllName = '';
        if (item.companyName) {
          companyAllName += item.companyName;
        }
        if (item.officeHide != '1' && item.brandName && item.brandName != '办公室/OFFICE') {
          if (resumeTypeEnglish.value == '1') {
            companyAllName += '-' + extractEnglishName(item.brandName);
          } else {
            companyAllName += '-' + item.brandName;
          }
        }
        temp.companyAllName = companyAllName;

        let positionName = '';
        if (item.positionName) {
          if (resumeTypeEnglish.value == '1') {
            positionName = extractEnglishName(item.positionName);
          } else {
            let chinese = item.positionName.replaceAll('[^\\u4e00-\\u9fa5 ]', '').trim();
            let english = item.positionName.replaceAll("[^a-zA-Z &']", '').trim();
            if (chinese) {
              positionName = chinese;
            } else {
              positionName = english;
            }
          }
        }
        if (resumeTypeEnglish.value == '1' && item.cityNameEn) {
          positionName += '/' + item.cityNameEn;
        } else if (item.cityName) {
          positionName += '/' + item.cityName;
        }
        if (item.marketName) {
          positionName += '/' + item.marketName;
        }
        temp.positionName = positionName;
        return temp;
      });
      workExpeList.value = resume.value.workExpeList.map((item) => {
        let temp = {};
        temp.id = item.id;
        temp.isNewtest = item.isNewtest;
        let startMonth = item.startMonth;
        if (startMonth - 0 < 10) {
          startMonth = '0' + (startMonth - 0);
        }
        if (item.endYear == '-1') {
          if (resumeTypeEnglish.value == '1') {
            temp.time = item.startYear + '.' + startMonth + ' - Present';
          } else {
            temp.time = item.startYear + '.' + startMonth + ' - 至今';
          }
        } else {
          let endMonth = item.endMonth;
          if (endMonth - 0 < 10) {
            endMonth = '0' + (endMonth - 0);
          }
          temp.time = item.startYear + '.' + startMonth + ' - ' + item.endYear + '.' + endMonth;
        }
        let companyAllName = '';
        if (item.companyName) {
          companyAllName += item.companyName;
        }
        if (resumeTypeEnglish.value == '1' && item.cityNameEn) {
          companyAllName += '-' + item.cityNameEn;
        } else if (item.cityName) {
          companyAllName += '-' + item.cityName;
        }
        if (item.marketName) {
          companyAllName += '-' + item.marketName;
        }
        if (item.officeHide != '1' && item.brandName && item.brandName != '办公室/OFFICE') {
          if (resumeTypeEnglish.value == '1') {
            companyAllName += '-' + extractEnglishName(item.brandName);
          } else {
            companyAllName += '-' + item.brandName;
          }
        }

        temp.companyAllName = companyAllName;
        temp.officeShowHide = item.category == '店铺' || !item.brandName ? false : true;
        temp.officeHide = item.officeHide ? item.officeHide : '2';
        temp.personHide = item.personHide ? item.personHide : '2';
        temp.salaryHide = item.salaryHide ? item.salaryHide : '2';
        temp.shopVolumeHide = item.shopVolumeHide ? item.shopVolumeHide : '2';

        if (resumeTypeEnglish.value == '1') {
          temp.positionName = item.positionName ? extractEnglishName(item.positionName) : '';
        } else {
          temp.positionName = item.positionName ? item.positionName : '';
        }
        temp.reporter = item.reporter ? item.reporter : '';
        temp.department = item.department ? item.department : '';
        temp.shopVolume = item.shopVolume ? item.shopVolume : '';
        if (item.salaryStructure && item.monthSalary) {
            if (resumeTypeEnglish.value == '1') { 
              temp.salaryStructure =
            item.salaryStructure.replace(' ', '') + '，Gross Monthly' + item.monthSalary;
            } else {
          temp.salaryStructure =
            item.salaryStructure.replace(' ', '') + '，综合薪资' + item.monthSalary;
            }
        } else {
          temp.salaryStructure = item.salaryStructure ? item.salaryStructure.replace(' ', '') : '';
        }
        temp.personnelStructure = item.personnelStructure ? item.personnelStructure : '';
        temp.workDuty = item.workDuty ? item.workDuty : '';
        return temp;
      });
    }
    if (resume.value.eduExpeList && resume.value.eduExpeList.length > 0) {
      eduExpeList.value = resume.value.eduExpeList.map((item) => {
        let temp = {};
        let startMonth = item.startMonth;
        if (startMonth - 0 < 10) {
          startMonth = '0' + (startMonth - 0);
        }
        if (item.endYear == '-1') {
          if (resumeTypeEnglish.value == '1') {
            temp.time = item.startYear + '.' + startMonth + ' - Present';
          } else {
            temp.time = item.startYear + '.' + startMonth + ' - 至今';
          }
        } else {
          let endMonth = item.endMonth;
          if (endMonth - 0 < 10) {
            endMonth = '0' + (endMonth - 0);
          }
          temp.time = item.startYear + '.' + startMonth + ' - ' + item.endYear + '.' + endMonth;
        }
        temp.schoolName = item.schoolName ? item.schoolName : '';
        temp.degree = item.degree ? item.degree : '';
        if (resumeTypeEnglish.value == '1') {
          temp.isRegular = item.isRegular == 'Y' ? 'Yes' : 'No';
          temp.majorName = item.majorName ? item.majorName : 'None';
        } else {
          temp.isRegular = item.isRegular == 'Y' ? '是' : '否';
          temp.majorName = item.majorName ? item.majorName : '无';
        }
        return temp;
      });
    }

    if (resume.value.resumeLanguageList && resume.value.resumeLanguageList.length > 0) {
      resumeLanguageList.value = resume.value.resumeLanguageList.map((item) => {
        let temp = {};
        let languageAbility = '';
        if (resumeTypeEnglish.value == '1') {
          languageAbility = languageNameObj[item.languageName] + '：';
          if (item.tinshuoLiuli == '1') {
            languageAbility += 'Listen and speak fluently;';
            resumeLanguageListFlag.value = true;
          }
          if (item.duxieLiuli == '2') {
            languageAbility += 'Read and write fluently;';
            resumeLanguageListFlag.value = true;
          }
          if (item.languageLevel) {
            languageAbility += item.languageLevel;
            resumeLanguageListFlag.value = true;
          }
        } else {
          languageAbility = item.languageName + '：';
          if (item.tinshuoLiuli == '1') {
            languageAbility += '听说流利;';
            resumeLanguageListFlag.value = true;
          }
          if (item.duxieLiuli == '2') {
            languageAbility += '读写流利;';
            resumeLanguageListFlag.value = true;
          }
          if (item.languageLevel) {
            languageAbility += item.languageLevel;
            resumeLanguageListFlag.value = true;
          }
        }
        temp.languageAbility = languageAbility;
        return temp;
      });
    }
  };
  handleResumeRecommendUploadData(1);
  const convertDuties = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return Array.from(doc.querySelectorAll('p'))
      .map((p) =>
        p?.textContent
         ?.replace(/^[\s．、.·•▪▫◦]+/, '')
          ?.replace(/^([1-9]\d{0,1}|[一二三四五六七八九十])(?:\s+|[\s．、.]+)*/, '')
          ?.replace(/\s+/g, ' ')
          .trim()
          .replace(/;$/, ''),
      )
      .filter((item) => item?.trim());
  };
  const handleJobtitleFlag = () => {
    resumeJobtitleFlag.value = !resumeJobtitleFlag.value;
    resumeShowBtnFlag.value = false;
    handleResumeJobtitleFlag();
  };
  const handleResumeJobtitleFlag = () => {
    let jobtitleHide = '2';
    if (!resumeJobtitleFlag.value) {
      jobtitleHide = '1';
    }
    resumeDetailStore.handleResumeJobtitleFlag(jobtitleHide);
  };
  const handleResumeReportFlag = () => {
    resumeReportFlag.value = !resumeReportFlag.value;
    resumeShowBtnFlag.value = false;
    handleResumeReportAndBorthFlag();
  };
  const handleBorthFlag = () => {
    borthFlag.value = !borthFlag.value;
    resumeShowBtnFlag.value = false;
    handleResumeReportAndBorthFlag();
  };
  const handleResumeReportAndBorthFlag = () => {
    let reportHide = '2';
    if (!resumeReportFlag.value) {
      reportHide = '1';
    }
    let ageHide = '2';
    if (!borthFlag.value) {
      ageHide = '1';
    }
    resumeDetailStore.handleResumeReportAndBorthFlag(reportHide, ageHide);
  };
  const handleCompanyAllNameFlag = (item) => {
    const originalItem = resume.value.workExpeList.find((origin) => origin.id === item.id);
    if (originalItem) {
      // 切换隐藏状态（1: 隐藏，2: 显示）
      originalItem.officeHide = originalItem.officeHide === '1' ? '2' : '1';
      // 更新推荐隐藏收集对象
      resumeDetailStore.handleResumeOfficeFlag(item.id, originalItem.officeHide);
    }
    resumeShowBtnFlag.value = false;
    handleResumeRecommendUploadDataDetail();
    //handleResumeRecommendUploadData(2);
  };
  const handleSalaryStructureFlag = (item) => {
    const originalItem = resume.value.workExpeList.find((origin) => origin.id === item.id);
    if (originalItem) {
      // 切换隐藏状态（1: 隐藏，2: 显示）
      originalItem.salaryHide = originalItem.salaryHide === '1' ? '2' : '1';
      // 更新推荐隐藏收集对象
      resumeDetailStore.handleResumeSalaryStructureFlag(item.id, originalItem.salaryHide);
    }
    resumeShowBtnFlag.value = false;
    handleResumeRecommendUploadDataDetail();
    //handleResumeRecommendUploadData(2);
  };
  const handlePersonnelStructureFlag = (item) => {
    const originalItem = resume.value.workExpeList.find((origin) => origin.id === item.id);
    if (originalItem) {
      // 切换隐藏状态（1: 隐藏，2: 显示）
      originalItem.personHide = originalItem.personHide === '1' ? '2' : '1';
      // 更新推荐隐藏收集对象
      resumeDetailStore.handleResumePersonFlag(item.id, originalItem.personHide);
    }
    resumeShowBtnFlag.value = false;
    handleResumeRecommendUploadDataDetail();
    //handleResumeRecommendUploadData(2);
  };
  const handleShopVolumeFlag = (item) => {
    const originalItem = resume.value.workExpeList.find((origin) => origin.id === item.id);
    if (originalItem) {
      // 切换隐藏状态（1: 隐藏，2: 显示）
      originalItem.shopVolumeHide = originalItem.shopVolumeHide === '1' ? '2' : '1';
      // 更新推荐隐藏收集对象
      resumeDetailStore.handleResumeShopVolume(item.id, originalItem.shopVolumeHide);
    }
    resumeShowBtnFlag.value = false;
    handleResumeRecommendUploadDataDetail();
    //handleResumeRecommendUploadData(2);
  };
  //子组件调用父组件方法
  const emit = defineEmits([
    'close',
    'handleAddRecommend',
    'handleResumeRecommendRepeat',
    'handleRecommendConfirmAppeal',
  ]);
  const handleResumeError = () => {
    resumeDetailStore.$patch({
      candidatePositionFlag: false,
    });
    emit('close');
  };
  const resumeShowBtnUpdateFlag = ref(false);
  const handleResumeYuLan = () => {
    resumeShowFlag.value = false;
    handleResumeRecommendUploadDataDetail();
    resumeShowBtnFlag.value = true;
    resumeShowBtnUpdateFlag.value = true;
  };
  const handleResumeUpdate = () => {
    resumeShowBtnUpdateFlag.value = !resumeShowBtnUpdateFlag.value;
    resumeShowBtnFlag.value = false;
    resumeShowFlag.value = true;
    handleResumeRecommendUploadData(2);
  };
  //推荐按钮
  const handleResumeRecommend = () => {
    emit('handleAddRecommend');
  };
  //重新推荐按钮
  const handleResumeRecommendRepeat = () => {
    emit('handleResumeRecommendRepeat');
  };
  //推荐申诉按钮
  const handleRecommendConfirmAppeal = () => {
    emit('handleRecommendConfirmAppeal');
  };
</script>

<style lang="less" scoped>
  .word-style {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 10px;
    color: #333;
    text-align: left;
    overflow-y: auto;
    height: calc(100vh - 240px);
    p {
      margin: 5px 0;
    }
    ul {
      margin: 5px 0 15px 20px;
      padding: 0;
      list-style-type: disc; /* 添加项目符号 */
    }
  }
  .basic-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    position: relative; // 新增定位上下文
    p {
      margin: 8px 0;
      strong {
        display: inline-block;
        width: 80px; /* 统一标签宽度 */
        vertical-align: top; /* 顶部对齐 */
      }
    }
  }

  .info-left,
  .info-right {
    width: 48%;
  }

  .header-img {
    text-align: center; /* 居中显示 */
    margin: 10px 0;
    img {
      width: 100%; /* 相对父容器宽度 */
      height: 34px; /* 保持原始比例 */
      display: block; /* 改为块级元素 */
      margin: 0 auto; /* 水平居中 */
    }
  }
  .header {
    margin-bottom: 5px;
    border-bottom: 2px solid #333;
  }
  .header h2 {
    margin-top: 10px;
    margin-bottom: 2px;
  }
  .header h4 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .header p {
    margin: 5px 0 0;
    color: #666;
  }
  .section-title {
    background-color: #8b4513;
    color: white;
    padding: 0 5px;
    font-size: 14px;
  }
  .basic-info {
    display: flex;
    justify-content: space-between;
    gap: 20px; /* 添加间距 */
    position: relative;

    // > div {
    //   flex: 1; /* 等分剩余空间 */
    //   &:last-child {
    //     flex: 0 0 200px; /* 固定照片容器宽度 */
    //     position: static; /* 移除绝对定位 */
    //   }
    // }

    .photo {
      position: absolute;
      right: 0;
      img {
        width: 120px;
        height: 160px;
        border: 1px solid #ddd;
        object-fit: cover; // 新增图片适应方式
      }
    }
  }
  .basic-info .photoEn {
      position: absolute;
      right: 5%;
      top: 2%;
      img {
        width: 120px;
        height: 160px;
        border: 1px solid #ddd;
        object-fit: cover; // 新增图片适应方式
      }
    }
  .basic-info .basic-info-en p strong {
    width: 115px;
  }
  .info-right {
    width: 70%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
    table-layout: fixed;
  }
  table,
  th,
  td {
    border: 1px solid #ddd;
  }
  th,
  td {
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  ul {
    margin: 5px 0 15px 20px;
    padding: 0;
  }
  .confidential {
    text-align: right;
    color: #666;
    margin-bottom: 20px;
  }
  .edu-info {
    display: flex;
    gap: 20px;
    margin: 15px 0;
    .edu-time-school {
      flex: 0 0 250px; // 与专业名称宽度对齐
      p {
        margin: 5px 0;
      }
    }

    .edu-details {
      flex: 1;
      // 继承.basic-info中的strong样式
      p {
        margin: 5px 0;
      }
    }
    .edu-details-row {
      display: flex;
      gap: 20px;
      p {
        margin: 0;
        strong {
          display: inline-block;
        }
      }
    }
  }
  .word-style .section-language {
    margin-top: 15px;
  }

  .btn-open-job {
    color: #fff !important;
    background-color: #52c41a;
    border-color: #52c41a !important;
  }
  .word-content {
    display: flex;
    justify-content: space-between;
  }
  .word-left {
    width: 13%;
  }
  .word-right {
    width: 87%;
  }
  .word-p {
    position: relative;
  }
  .btn-open {
    color: #52c41a !important;
    border-color: #52c41a !important;
    position: absolute;
    left: -14%;
  }
  .btn-close {
    position: absolute;
    left: -14%;
  }
  .btn-open-bottom {
    color: #52c41a !important;
    border-color: #52c41a !important;
    margin-left: 10px;
  }
  .full-width {
    width: 100% !important;
  }
  .end-width {
    width: 0% !important;
  }
</style>
