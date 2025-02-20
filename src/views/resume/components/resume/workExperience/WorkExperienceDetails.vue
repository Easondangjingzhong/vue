<template>
  <a-divider
    v-if="indexNum !== 0"
    style="height: 1px; background-color: #ccc; margin: 0 0 16px"
    dashed
  />
  <!-- <a-form :label-col="{span: 5}"
      :wrapper-col="{span: 14}" :model="workExperienceData"> -->
  <a-row>
    <a-col :span="8">
      <a-form-item
        :name="['workExperienceList', indexNum, 'companyName']"
        :label="themeLanguage?.companyName?.label"
        :label-col="{ span: resumeTypeEnglish == '1' ? 6 : 4 }"
        :wrapper-col="{ span: 20 }"
        :rules="[{ required: true, message: themeLanguage?.companyName?.message }]"
      >
        <a-input
          v-model:value="workExperienceData.companyName"
          :placeholder="themeLanguage?.companyName?.message"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="5">
      <a-form-item
        name="category"
        :wrapper-col="{ span: resumeTypeEnglish == '1' ? 9 : 8 }"
        :label="themeLanguage?.category?.label"
        :rules="[{ required: false, message: themeLanguage?.category?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.category"
          :placeholder="themeLanguage?.category?.message"
          @change="onChangeCategory"
          :options="optionsCategory"
        >
          <a-select-option value=""></a-select-option>
          <a-select-option value="店铺">店铺</a-select-option>
          <a-select-option value="OFFICE">OFFICE</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col v-if="indexNum !== 0" :span="spanTitle" class="resume_del">
      <a-button type="primary" danger size="small" @click="delNewWorkExperienceDetails(indexNum)"
        >删除</a-button
      >
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="spanTitle">
      <a-form-item
        :name="['workExperienceList', indexNum, 'startYear']"
        :label="themeLanguage?.startYear?.label"
        :rules="[{ required: true, message: themeLanguage?.startYear?.message }]"
      >
        <a-date-picker
          v-model:value="workExperienceData.startYear"
          value-format="YYYY-MM"
          picker="month"
          :placeholder="themeLanguage?.startYear?.message"
        />
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle" v-if="!endYearFlag" style="position: relative">
      <a-form-item
        :name="['workExperienceList', indexNum, 'endYear']"
        :label="themeLanguage?.endYear?.label"
        :rules="[{ required: true, message: themeLanguage?.endYear?.message }]"
      >
        <a-date-picker
          v-model:value="workExperienceData.endYear"
          :placeholder="themeLanguage?.endYear?.message"
          value-format="YYYY-MM"
          picker="month"
          @change="handleEndYearTime"
        />
      </a-form-item>
      <a-checkbox
        :class="resumeTypeEnglish == '1' ? 'resume_box_en' : 'resume_box'"
        v-if="indexNum === 0"
        v-model:checked="endYearFlag"
        @change="onChangeEndYearFlag"
        >目前在职</a-checkbox
      >
    </a-col>
    <a-col :span="spanTitle" v-if="endYearFlag"
      ><a-form-item :label="themeLanguage?.endYear?.label"
        ><span class="resume_col_padding">至今</span>
        <a-checkbox
          v-model:checked="endYearFlag"
          v-if="indexNum === 0"
          @change="onChangeEndYearFlag"
          >目前在职</a-checkbox
        >
      </a-form-item></a-col
    >
  </a-row>
  <a-row>
    <a-col :span="spanTitle">
      <a-form-item
        :label="themeLanguage?.positionName?.label"
        name="positionName"
        :rules="[{ required: false, message: themeLanguage?.positionName?.message }]"
      >
        <a-select
          class="form-select"
          v-model:value="workExperienceData.positionName"
          :placeholder="themeLanguage?.positionName?.message"
          labelInValue
          :options="optionsPosition"
          @change="handlePositionName"
          showSearch
        ></a-select>
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle">
      <a-form-item
        name="department"
        :label="themeLanguage?.department?.label"
        :rules="[{ required: false, message: themeLanguage?.department?.message }]"
      >
        <a-input
          v-model:value="workExperienceData.department"
          :placeholder="themeLanguage?.department?.message"
        ></a-input>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row style="margin-top: -15px">
    <a-col :span="24">
      <a-form-item
        name="workDuty"
        :label="themeLanguage?.workDuty?.label"
        style="padding-left: 10px"
        :label-col="{ span: 24 }"
        :rules="[{ required: false, message: themeLanguage?.workDuty?.message }]"
      >
        <a-textarea
          :rows="7"
          v-model:value="workExperienceData.workDuty"
          :placeholder="themeLanguage?.workDuty?.message"
        ></a-textarea>
      </a-form-item>
    </a-col>
  </a-row>
  <!-- </a-form> -->
</template>
<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import { storeToRefs } from 'pinia'
  import { message } from 'ant-design-vue';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  const resumeStore = useResumeStoreWithOut();
  const {positionStore,positionOffice,resumeTypeEnglish} = storeToRefs(resumeStore);
  const themeLanguage = ref(validateLanguage('workInfo', resumeTypeEnglish.value));
  const delNewWorkExperienceDetails = (param: number) => {
    resumeStore.delNewWorkExperienceDetails(param);
  };
  const peops = defineProps({
    workExperienceList: {
      type: Array,
      required: true,
    },
    workExperienceData: {
      type: Object,
      required: true,
    },
    indexNum: {
      type: Number,
      required: true,
    },
  });
  //工作经历结束年月是否为"至今" false 展示日期组件 true 展示至今
  let endYearFlag = ref(false);
  onBeforeMount(() => {
    if (peops.workExperienceData.endYear == "至今" || peops.workExperienceData.endYear == "-1") {
      endYearFlag.value = true;
    }
  })
  const endYearTemp = peops.workExperienceData.endYear;
  const onChangeEndYearFlag = () => {
    if (resumeStore.endYearFlag && endYearFlag.value) {
      endYearFlag.value = false;
      message.error("已有最近工作,不能再选");
      return;
    }
    if (endYearFlag.value) {

      resumeStore.updateEndYearFlag(true);
      peops.workExperienceData.endYear = "-1";
      handlePositionName({label: peops.workExperienceData.positionName,value: peops.workExperienceData.positionsId});
    } else {
      resumeStore.updateEndYearFlag(false);
      //peops.workExperienceData.endYear = "";
      peops.workExperienceData.endYear = endYearTemp;
    }
  }
  //组件col占比
  const spanTitle = 6;
  const handlePositionName = (values: any) => {
    resumeStore.updateWorkExperienceDetailsByIndexNum(peops.indexNum,values.label,values.value,endYearFlag.value);
  };
  const optionsCategory = ref<SelectProps['options']>([
    { label: '', value: '' },
    { label: '店铺', value: '店铺' },
    { label: 'OFFICE', value: 'OFFICE' }
  ])
  if (resumeTypeEnglish.value == '1') {
    optionsCategory.value = [
    { label: '', value: '' },
    { label: 'Store', value: 'Store' },
    { label: 'OFFICE', value: 'OFFICE' }
    ]
  }
  const optionsPosition = ref<SelectProps['options']>(positionStore.value.map((item) =>
  {
    if (resumeTypeEnglish.value == '1' && item.usPosition) {
      return { label: item.usPosition, value: item.id.toString() }
    } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
      return { label: item.cnPosition, value: item.id.toString() };
    } else {
      return { label: '', value: "" };
    }
  }
  ).filter(item => item.value != ""));
  const optionsPositionMethod = () => {
    optionsPosition.value = positionStore.value.map((item) =>
  {
    if (resumeTypeEnglish.value == '1' && item.usPosition) {
      return { label: item.usPosition, value: item.id.toString() }
    } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
      return { label: item.cnPosition, value: item.id.toString() };
    } else {
      return { label: '', value: "" };
    }
  }
  ).filter(item => item.value != "");
   }
  const onChangeCategory = (values: any) => {
    if (values == "OFFICE") {
      optionsPosition.value = positionOffice.value.map((item) =>
  {
    if (resumeTypeEnglish.value == '1' && item.usPosition) {
      return { label: item.usPosition, value: item.id.toString() }
    } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
      return { label: item.cnPosition, value: item.id.toString() };
    } else {
      return { label: '', value: "" };
    }
  }
  ).filter(item => item.value != "");
    } else {
      optionsPositionMethod();
    }
   };
   const handleEndYearTime = (value) => {
      const startYear = peops.workExperienceData.startYear;
      if (startYear && value) {
        let endYear = value.split("-");
        //let startYearArr = startYear.toString().indexof(".") != -1 ? startYear.split("-") : startYear.split("-");
        let startYearArr = startYear.split(".").length < 2 ? startYear.split("-") : startYear.split(".");
        if (endYear[0] - startYearArr[0] < 0 || (endYear[0] - startYearArr[0] == 0 && endYear[1] - startYearArr[1] < 0)) {
          peops.workExperienceData.endYear = "";
          message.error("结束年月不得晚于开始年月");
        }
      }
   }
  
   watch(
    () => resumeTypeEnglish.value,
    () => {
      themeLanguage.value = validateLanguage('workInfo', resumeTypeEnglish.value);
      if (resumeTypeEnglish.value == '1') {
        optionsPositionMethod();
        optionsCategory.value = [
    { label: '', value: '' },
    { label: 'Store', value: 'Store' },
    { label: 'OFFICE', value: 'OFFICE' }
    ]
      } else {
        optionsPositionMethod();
        optionsCategory.value = [
    { label: '', value: '' },
    { label: '店铺', value: '店铺' },
    { label: 'OFFICE', value: 'OFFICE' }
    ]
      }
    },
  );
</script>
<style scoped>
  .resume_company {
    margin-right: 30px;
  }
  .resume_category {
    margin-left: 1px;
    width: 230px;
  }
  .resume_del {
    margin-left: 20px;
  }
  .resume_box {
    position: absolute;
    top: 8%;
    left: 82%;
    width: 100px;
  }
  .resume_box_en {
    position: absolute;
    top: 8%;
    left: 95%;
    width: 100px;
  }
  .resume_col_padding {
    padding-left: 12px;
    padding-right: 10px;
  }
</style>
