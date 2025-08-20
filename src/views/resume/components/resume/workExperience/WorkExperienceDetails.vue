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
        :rules="[{ required: false, message: themeLanguage?.companyName?.message }]"
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
    <!-- <a-col v-if="resumeTypeEnglish == '1' && categoryFlag" :span="spanTitle">
      <a-form-item
        :label="themeLanguage?.isRetreat?.label"
        :name="['workExperienceList', indexNum, 'isRetreat']"
        style="margin-right: -38px;margin-left: 4px;"
        :rules="[{ required: false, message: themeLanguage?.isRetreat?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.isRetreat"
          :placeholder="themeLanguage?.isRetreat?.message"
          optionFilterProp="label"
          style="width: 55%;"
          showSearch
          :options="optionRetreat"
        ></a-select>
      </a-form-item>
    </a-col> -->
    <!-- <a-col :span="spanTitle" v-if="resumeTypeEnglish == '1' && !categoryFlag && indexNum > 0">
      <a-form-item
        :label="themeLanguage?.workRetail?.label"
        name="retail"
        :rules="[{ required: true, message: themeLanguage?.workRetail?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.retail"
          :placeholder="themeLanguage?.workRetail?.message"
          optionFilterProp="label"
          showSearch
          :options="optionWorkRetail"
        ></a-select>
      </a-form-item>
    </a-col> -->
    <a-col v-if="indexNum !== 0" :span="resumeTypeEnglish == '1' ? 2 : spanTitle" class="resume_del">
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
        :rules="[{ required: false, message: themeLanguage?.startYear?.message }]"
      >
        <a-date-picker
          v-model:value="workExperienceData.startYear"
          :value-format="datePickerValue"
          :picker="datePickerContent"
          :placeholder="themeLanguage?.startYear?.message"
          @focus="handleFocusDateYear"
        />
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle" v-if="!endYearFlag" style="position: relative">
      <a-form-item
        :name="['workExperienceList', indexNum, 'endYear']"
        :label="themeLanguage?.endYear?.label"
        :rules="[{ required: false, message: themeLanguage?.endYear?.message }]"
      >
        <a-date-picker
          v-model:value="workExperienceData.endYear"
          :placeholder="themeLanguage?.endYear?.message"
          :value-format="datePickerValue"
          :picker="datePickerContent"
          @change="handleEndYearTime"
          @focus="handleFocusDateYear"
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
    <!-- <a-col v-if="resumeTypeEnglish == '1'" :span="6">
      <a-form-item
        :label="themeLanguage?.isNewtest?.label"
        :name="['workExperienceList', indexNum, 'isNewtest']"
        style="margin-left: 52px;"
        :rules="[{ required: false, message: themeLanguage?.isNewtest?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.isNewtest"
          :placeholder="themeLanguage?.isNewtest?.message"
          optionFilterProp="label"
          showSearch
          style="width: 97%;"
          :options="optionNewtest"
        ></a-select>
      </a-form-item>
    </a-col> -->
  </a-row>
  <a-row v-if="resumeTypeEnglish != '1'">
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
          optionFilterProp="code"
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
  <!-- <a-row v-if="resumeTypeEnglish == '1'" class="resume_row_update">
    <a-col :span="spanTitle">
      <a-form-item
        :label="themeLanguage?.cityName?.label"
        :name="['workExperienceList', indexNum, 'workCity']"
        :rules="[{ required: false, message: themeLanguage?.cityName?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.workCity"
          :placeholder="themeLanguage?.cityName?.message"
          :options="optionsCity"
          optionFilterProp="label"
          :labelInValue="true"
          @change="handleCityName"
          showSearch
        ></a-select>
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle" v-if="categoryFlag">
      <a-form-item
        :label="themeLanguage?.marketName?.label"
        :name="['workExperienceList', indexNum, 'workMark']"
        :rules="[{ required: false, message: themeLanguage?.marketName?.message }]"
      >
        <a-select
          optionFilterProp="label"
          v-model:value="workExperienceData.workMark"
          :placeholder="themeLanguage?.marketName?.message"
          :options="optionsMarkId"
          :labelInValue="true"
          showSearch
          @search="handleCityAndMarktName"
        >
        </a-select>
      </a-form-item>
    </a-col>
    <a-col v-if="!brandCheckBox" :span="spanTitle">
      <a-form-item
        :label="themeLanguage?.brandName?.label"
        :name="['workExperienceList', indexNum, 'workBrand']"
        :rules="[{ required: true, message: themeLanguage?.brandName?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.workBrand"
          :placeholder="themeLanguage?.brandName?.message"
          optionFilterProp="label"
          :labelInValue="true"
          :options="optionsBrand"
          showSearch
          v-if="!brandFlag"
        ></a-select>
       <a-input
              v-if="brandFlag"
              style="width: 50%"
              v-model:value="brandNameCn"
              @blur="handleBrandNameCn"
              placeholder="品牌中文"
            ></a-input>
            <a-input
              v-if="brandFlag"
              style="width: 50%"
              v-model:value="brnadNameEn"
              @blur="handleBrandNameEn"
              placeholder="品牌英文"
            ></a-input>
      </a-form-item>
    </a-col> -->
    <!-- <a-col :span="11" v-if="!categoryFlag">
          <a-button
            style="margin-top: 1%; margin-left: 2%"
            @click="handleChangeBrandFlag"
            size="small"
            type="primary"
            title="切换为填写"
            danger
            v-if="!brandFlag && !brandCheckBox"
            >切换</a-button
          >
          <a-button
            style="margin-top: 1%; margin-left: 2%"
            @click="handleChangeBrandFlag"
            size="small"
            type="primary"
            title="切换为选择"
            danger
            v-if="brandFlag && !brandCheckBox"
            >切换</a-button
          >
          <a-checkbox
            class="brandCheckBox"
            v-if="brandCheckBoxShow"
            v-model:checked="brandCheckBox"
            @change="onChangeBrandCheckBox"
            >品牌不填</a-checkbox
          >
          <span style="margin-left: 5px" v-if="!brandCheckBox"
            >不清楚本公司品牌吗?点我来告诉你吧!<a
              class="branda"
              href="https://chat.deepseek.com"
              target="_blank"
              >点击</a
            ></span
          >
        </a-col> -->
    <!-- <a-col :span="spanTitle" v-if="categoryFlag">
      <a-form-item
        :label="themeLanguage?.workFloor?.label"
        :name="['workExperienceList', indexNum, 'workFloor']"
        :rules="[{ required: false, message: themeLanguage?.workFloor?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.workFloor"
          :placeholder="themeLanguage?.workFloor?.message"
          :options="optionsWorkFloor"
          showSearch
        ></a-select>
      </a-form-item>
    </a-col>
  </a-row> -->
  <a-row v-if="resumeTypeEnglish == '1'" class="resume_row_update">
    <a-col :span="spanTitle">
      <a-form-item
        :label="themeLanguage?.positionName?.label"
        :name="['workExperienceList', indexNum, 'positionsId']"
        :rules="[{ required: false, message: themeLanguage?.positionName?.message }]"
      >
        <a-select
          v-model:value="workExperienceData.positionsId"
          :placeholder="themeLanguage?.positionName?.message"
          :options="optionsPositions"
          optionFilterProp="code"
          :labelInValue="true"
          showSearch
        ></a-select>
      </a-form-item>
    </a-col>
    <!-- <a-col :span="spanTitle">
      <a-form-item
        name="reporter"
        :label="themeLanguage?.reporter?.label"
        :rules="[{ required: false, message: themeLanguage?.reporter?.message }]"
      >
        <a-input
          v-model:value="workExperienceData.reporter"
          :placeholder="themeLanguage?.reporter?.message"
        ></a-input>
      </a-form-item>
    </a-col> -->
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
    <!-- <a-col :span="spanTitle">
      <a-form-item
        name="monthSalary"
        :label="themeLanguage?.monthSalary?.label"
        :label-col="{ span: 11 }"
        :rules="[{ required: false, message: themeLanguage?.monthSalary?.message }]"
      >
        <a-input-number
          style="width: 84%"
          v-model:value="workExperienceData.monthSalary"
          :placeholder="themeLanguage?.monthSalary?.message"
        ></a-input-number>
      </a-form-item>
    </a-col> -->
  </a-row>
  <!-- <a-row v-if="resumeTypeEnglish == '1'" class="resume_row_update">
    <a-col :span="24">
      <a-form-item
        name="salaryStructure"
        :label="themeLanguage?.salaryStructure?.label"
        :label-col="{ span: 2 }"
        :rules="[{ required: false, message: themeLanguage?.salaryStructure?.message }]"
      >
        <a-input
          v-model:value="workExperienceData.salaryStructure"
          :placeholder="themeLanguage?.salaryStructure?.message"
        ></a-input>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row v-if="resumeTypeEnglish == '1'" class="resume_row_update">
    <a-col :span="24">
      <a-form-item
        name="personnelStructure"
        :label-col="{ span: 3 }"
        style="margin-left: -25px;margin-right: 55px;"
        :label="themeLanguage?.personnelStructure?.label"
        :rules="[{ required: false, message: themeLanguage?.personnelStructure?.message }]"
      >
        <a-input
          v-model:value="workExperienceData.personnelStructure"
          :placeholder="themeLanguage?.personnelStructure?.message"
        ></a-input>
      </a-form-item>
    </a-col>
  </a-row> -->
  <a-row style="margin-top: -15px">
    <a-col :span="24">
      <a-form-item
        name="workDuty"
        :label="themeLanguage?.workDuty?.label"
        style="padding-left: 5px"
        :label-col="{ span: 24 }"
        :rules="[{ required: false, message: themeLanguage?.workDuty?.message }]"
      >
        <a-textarea
          :rows="7"
          v-model:value="workExperienceData.workDuty"
          @input="e => workExperienceData.workDuty = normalizeText(e.target.value)"
          :placeholder="themeLanguage?.workDuty?.message"
        ></a-textarea>
      </a-form-item>
    </a-col>
  </a-row>
  <!-- </a-form> -->
</template>
<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import { workFloorEnArr } from '/@/store/data/resume';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { normalizeText } from '/@/utils/normalizeText';
  const resumeListStore = useResumeListStoreWithOut();
  const resumeStore = useResumeStoreWithOut();
  const cityStore = useCityStoreWithOut();
  const { positionsList, brandList } = storeToRefs(resumeListStore);
  const { positionStore, positionOffice, resumeTypeEnglish } = storeToRefs(resumeStore);
  const { province } = storeToRefs(cityStore);
  const themeLanguage = ref(validateLanguage('workInfo', resumeTypeEnglish.value));
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
  const delNewWorkExperienceDetails = (param: number) => {
    resumeStore.delNewWorkExperienceDetails(param);
  };
  const datePickerContent = ref("month");
  const datePickerValue = ref("YYYY-MM");
  const handleFocusDateYear = () => {
    datePickerContent.value = "month";
    datePickerValue.value = "YYYY-MM";
    if (/^\d{4}$/.test(peops.workExperienceData.startYear)) {
      peops.workExperienceData.startYear = peops.workExperienceData.startYear + "-00";
    }
    if (/^\d{4}$/.test(peops.workExperienceData.endYear)) {
      peops.workExperienceData.endYear = peops.workExperienceData.endYear + "-00";
    }
  }

  const categoryFlag = ref(true);
  //const brandFlag = ref(false);
  const brandCheckBox = ref(false);
  //const brandCheckBoxShow = ref(false);
  const optionRetreat = ref([
    { value: '', label: '' },
    { value: '1', label: 'Yes' },
    { value: '0', label: 'No' },
  ]);
  const optionNewtest = ref([
    { value: '', label: '' },
    { value: '1', label: 'Yes' },
    { value: '0', label: 'No' },
  ]);
  const optionWorkRetail = ref([
    { value: '', label: '' },
    { value: '1', label: 'Retail' },
    { value: '2', label: 'Non Retail' },
  ]);

  //工作经历结束年月是否为"至今" false 展示日期组件 true 展示至今
  let endYearFlag = ref(false);
  onBeforeMount(() => {
    if (peops.workExperienceData.endYear == '至今' || peops.workExperienceData.endYear == '-1') {
      endYearFlag.value = true;
    }
    if (peops.workExperienceData.startYear == '至今' || peops.workExperienceData.startYear == '-1') {
      datePickerContent.value = "year";
      datePickerValue.value = "YYYY";
    }
    if (/^\d{4}$/.test(peops.workExperienceData.startYear)) {
      datePickerContent.value = "year";
      datePickerValue.value = "YYYY";
    }
  });
  const endYearTemp = peops.workExperienceData.endYear;
  const onChangeEndYearFlag = () => {
    if (resumeStore.endYearFlag && endYearFlag.value) {
      endYearFlag.value = false;
      message.error('已有最近工作,不能再选');
      return;
    }
    if (endYearFlag.value) {
      resumeStore.updateEndYearFlag(true);
      peops.workExperienceData.endYear = '-1';
      handlePositionName({
        label: peops.workExperienceData.positionName,
        value: peops.workExperienceData.positionsId,
      });
    } else {
      resumeStore.updateEndYearFlag(false);
      //peops.workExperienceData.endYear = "";
      peops.workExperienceData.endYear = endYearTemp;
    }
  };
  //组件col占比
  const spanTitle = 6;
  const handlePositionName = (values: any) => {
    resumeStore.updateWorkExperienceDetailsByIndexNum(
      peops.indexNum,
      values.label,
      values.value,
      endYearFlag.value,
    );
  };
  const optionsCategory = ref<SelectProps['options']>([
    { label: '', value: '' },
    { label: '店铺', value: '店铺' },
    { label: 'OFFICE', value: 'OFFICE' },
  ]);
  if (resumeTypeEnglish.value == '1') {
    optionsCategory.value = [
      { label: '', value: '' },
      { label: 'Store', value: 'Store' },
      { label: 'OFFICE', value: 'OFFICE' },
    ];
  }
  const optionsPosition = ref<SelectProps['options']>(
    positionStore.value
      .map((item) => {
        if (resumeTypeEnglish.value == '1' && item.usPosition) {
          return { label: item.usPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
        } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
          return { label: item.cnPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
        } else {
          return { label: '', value: '', code: '' };
        }
      })
      .filter((item) => item.value != ''),
  );
  const optionsPositionMethod = () => {
    optionsPosition.value = positionStore.value
      .map((item) => {
        if (resumeTypeEnglish.value == '1' && item.usPosition) {
          return { label: item.usPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
        } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
          return { label: item.cnPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
        } else {
          return { label: '', value: '', code: '' };
        }
      })
      .filter((item) => item.value != '');
  };
  const optionsPositions = ref<SelectProps['options']>([]);
  const onChangeCategory = (values: any) => {
    if (values == 'OFFICE') {
      optionsPosition.value = positionOffice.value
        .map((item) => {
          if (resumeTypeEnglish.value == '1' && item.usPosition) {
            return { label: item.usPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
          } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
            return { label: item.cnPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
          } else {
            return { label: '', value: '', code: '' };
          }
        })
        .filter((item) => item.value != '');
        optionsPositions.value = positionOffice.value
        .map((item) => {
          if (resumeTypeEnglish.value == '1' && item.usPosition) {
            return { label: item.usPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
          } else if (resumeTypeEnglish.value != '1' && item.cnPosition) {
            return { label: item.cnPosition, value: item.id.toString(), code: `${item.cnPosition}-${item.usPosition}` };
          } else {
            return { label: '', value: '', code: '' };
          }
        })
        .filter((item) => item.value != '');
    } else {
      optionsPositionMethod();
      loadOptionsPositions();
    }
    if (resumeTypeEnglish.value == '1') {
      if (values == 'OFFICE') {
        categoryFlag.value = false;
        if (peops.indexNum > 0) {
      brandCheckBox.value = true;
    }
      } else {
        categoryFlag.value = true;
        if (peops.indexNum > 0) {
      brandCheckBox.value = false;
    }
      }
    }
  };
  const handleEndYearTime = (value) => {
    const startYear = peops.workExperienceData.startYear;
    if (startYear && value) {
      let endYear = value.split('-');
      //let startYearArr = startYear.toString().indexof(".") != -1 ? startYear.split("-") : startYear.split("-");
      let startYearArr =
        startYear.split('.').length < 2 ? startYear.split('-') : startYear.split('.');
      if (
        endYear[0] - startYearArr[0] < 0 ||
        (endYear[0] - startYearArr[0] == 0 && endYear[1] - startYearArr[1] < 0)
      ) {
        peops.workExperienceData.endYear = '';
        message.error('结束年月不得晚于开始年月');
      }
    }
  };
  
 
  //职位数据
 
  const loadOptionsPositions = () => {
    let tempOptionPositions = [];
    if (resumeTypeEnglish.value == '1') {
      positionsList.value.forEach((item) => {
        if (item.usPosition) {
          //@ts-ignore
          let tempObj = {
            //@ts-ignore
            label: item.usPosition,
            //@ts-ignore
            value: item.positionId,
            code: `${item.cnPosition}-${item.usPosition}`,
          };
          //@ts-ignore
          tempOptionPositions.push(tempObj);
        }
      });
      optionsPositions.value = tempOptionPositions;
    } 
    // else {
    //   positionsList.value.forEach((item) => {
    //     //@ts-ignore
    //     let tempObj = {
    //       //@ts-ignore
    //       label: positionsListShow(item.cnPosition, item.usPosition),
    //       //@ts-ignore
    //       value: item.positionId,
    //     };
    //     //@ts-ignore
    //     tempOptionPositions.push(tempObj);
    //   });
    //   optionsPositions.value = tempOptionPositions;
    // }
  };
  watch(
    () => resumeTypeEnglish.value,
    () => {
      themeLanguage.value = validateLanguage('workInfo', resumeTypeEnglish.value);
      if (resumeTypeEnglish.value == '1') {
        optionsPositionMethod();
        loadOptionsPositions();
        loadOptionBrand();
        loadOptionsCity();
        optionsCategory.value = [
          { label: '', value: '' },
          { label: 'Store', value: 'Store' },
          { label: 'OFFICE', value: 'OFFICE' },
        ];
        optionRetreat.value = [
        { value: '', label: '' },
          { value: '1', label: 'Yes' },
          { value: '0', label: 'No' },
        ];
        optionNewtest.value = [
        { value: '', label: '' },
          { value: '1', label: 'Yes' },
          { value: '0', label: 'No' },
        ];
        optionWorkRetail.value = [
          { value: '', label: '' },
          { value: '1', label: 'Retail' },
          { value: '2', label: 'Non Retail' },
        ];
      } else {
        optionsPositionMethod();
        optionsCategory.value = [
          { label: '', value: '' },
          { label: '店铺', value: '店铺' },
          { label: 'OFFICE', value: 'OFFICE' },
        ];
        optionRetreat.value = [
        { label: '', value: '' },
          { value: '1', label: '是' },
          { value: '0', label: '否' },
        ];
        optionNewtest.value = [
        { label: '', value: '' },
          { value: '1', label: '是' },
          { value: '0', label: '否' },
        ];
        optionWorkRetail.value = [
          { value: '', label: '' },
          { value: '1', label: '零售业' },
          { value: '2', label: '非零售' },
        ];
      }
    },
  );
 
  //城市数据展示
  const optionsCity = ref<SelectProps['options']>([]);
  const loadOptionsCity = () => {
    if (resumeTypeEnglish.value == '1') {
      optionsCity.value = province.value.reduce((prev, curr) => {
        //@ts-ignore
        if (
          (curr.provinceName == curr.cityName || !curr.cityName) &&
          !(curr.cityName == '吉林' || curr.cityName == '海南')
        ) {
          //@ts-ignore
          prev.push({
            //@ts-ignore
            label: curr.provinceNameEn,
            //@ts-ignore
            value: curr.id?.toString(),
          });
        } else {
          //@ts-ignore
          prev.push({
            //@ts-ignore
            label: curr.cityNameEn,
            //@ts-ignore
            value: curr.id?.toString(),
          });
        }
        return prev;
      }, []);
    } 
    // else {
    //   optionsCity.value = province.value.reduce((prev, curr) => {
    //     //@ts-ignore
    //     if (
    //       (curr.provinceName == curr.cityName || !curr.cityName) &&
    //       !(curr.cityName == '吉林' || curr.cityName == '海南')
    //     ) {
    //       //@ts-ignore
    //       prev.push({
    //         //@ts-ignore
    //         label: curr.provinceName,
    //         //@ts-ignore
    //         value: curr.id,
    //       });
    //     } else {
    //       //@ts-ignore
    //       prev.push({
    //         //@ts-ignore
    //         label: curr.cityName,
    //         //@ts-ignore
    //         value: curr.id,
    //       });
    //     }
    //     return prev;
    //   }, []);
    // }
  };
  watch(province, () => {
    loadOptionsCity();
  });
  //商场数据展示
  const optionsMarkId = ref<SelectProps['options']>([]);
  const handleCityName = (values = '') => {
    try {
    let temp = '';
    // if (!(Object.prototype.toString.call(marketName) === '[object Object]')) {
    //   temp = marketName;
    // }
    let tempOptionMarkIdUpdate = [];
    let cityTemp = '';
    if (!values) {
      cityTemp = peops.workExperienceData.cityName;
    } else if (resumeTypeEnglish.value == '1') {
      cityTemp = province.value?.filter((item) => item.id == values.value)[0].cityName;
    } else {
      cityTemp = values.label;
    }
    //商场数据
    resumeListStore.queryMarkListSearch(cityTemp, temp).then((res) => {
      res.info.forEach((item) => {
        //@ts-ignore
        let tempObj = {
          //@ts-ignore
          label: item.text,
          //@ts-ignore
          value: item.id,
        };
        //@ts-ignore
        tempOptionMarkIdUpdate.push(tempObj);
      });
      optionsMarkId.value = tempOptionMarkIdUpdate;
    });
  } catch(error) {
      console.log(error)
    }
  };
  const handleCityAndMarktName = (values) => {
    let tempOptionMarkIdUpdate = [];
    let marktFlag = false;
    //商场数据
    resumeListStore.queryMarkListSearch(peops.workExperienceData.cityName.value, values).then((res) => {
      res.info.forEach((item) => {
        //@ts-ignore
        let tempObj = {
          //@ts-ignore
          label: item.text,
          //@ts-ignore
          value: item.id,
        };
        if (item.id == peops.workExperienceData.marketName.value) {
          marktFlag = true;
        }
        //@ts-ignore
        tempOptionMarkIdUpdate.push(tempObj);
      });
      optionsMarkId.value = tempOptionMarkIdUpdate;
      if (!marktFlag) {
        peops.workExperienceData.marketName = { value: '', label: '' };
      }
    });
  };
  //楼层数据展示
  const optionsWorkFloor = ref<SelectProps['options']>(
    workFloorEnArr.map((item) => ({ value: item, label: item })),
  );
  //品牌数据展示
  const optionsBrand = ref<SelectProps['options']>([]);

  watch(brandList, () => {
    loadOptionBrand();
  });
  watch(positionsList, () => {
    loadOptionsPositions();
  });
  const loadOptionBrand = () => {
    let tempOptionBrand = [];
    if (resumeTypeEnglish.value == '1') {
      brandList.value.forEach((item) => {
        if (item.usName) {
          //@ts-ignore
          let tempObj = {
            //@ts-ignore
            label: item.usName,
            //@ts-ignore
            value: item.brandId?.toString(),
          };
          //@ts-ignore
          tempOptionBrand.push(tempObj);
        }
      });
      optionsBrand.value = tempOptionBrand;
    } 
    // else {
    //   brandList.value.forEach((item) => {
    //     //@ts-ignore
    //     let tempObj = {
    //       //@ts-ignore
    //       label: positionsListShow(item.cnName, item.usName),
    //       //@ts-ignore
    //       value: item.brandId?.toString(),
    //     };
    //     //@ts-ignore
    //     tempOptionBrand.push(tempObj);
    //   });
    //   optionsBrand.value = tempOptionBrand;
    // }
  };
  if (resumeTypeEnglish.value == '1') {
  resumeListStore.queryPositionsList();
  resumeListStore.queryBranList();
  resumeListStore.queryMarkList();
  loadOptionsCity();
  loadOptionsPositions();
  loadOptionBrand();
  handleCityName();
  if (peops.workExperienceData.category == "OFFICE") {
    categoryFlag.value = false;
    if (peops.indexNum > 0) {
      brandCheckBox.value = true;
    }
  }
  }
  
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
