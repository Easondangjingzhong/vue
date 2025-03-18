<template>
  <a-divider
    v-if="indexNum !== 0"
    style="height: 1px; background-color: #ccc; margin: 0 0 16px"
    dashed
  />
  <!-- <a-form :label-col="{span: 5}"
      :wrapper-col="{span: 14}" :model="educationInfoData"> -->
  <a-row>
    <a-col :span="8">
      <a-form-item
        :name="['educationInfoList', indexNum, 'schoolName']"
        :label="themeLanguage?.schoolName?.label"
        :label-col="{ span: resumeTypeEnglish == '1' ? 4.3 : 3.3}"
        :wrapper-col="{ span: resumeTypeEnglish == '1' ? 20 : 20,offset: 0.5}"
        :rules="[{ required: true, message: themeLanguage?.schoolName?.message }]"
      >
        <a-input
          v-model:value="educationInfoData.schoolName"
          :placeholder="themeLanguage?.schoolName?.message"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item v-if="schoolTypeFlag">
        <a-checkbox-group v-model:value="educationInfoData.schoolType">
          <a-checkbox class="resume_box_right" value="985">985</a-checkbox>
          <a-checkbox class="resume_box_left" value="211">211</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-col>
    <a-col v-if="indexNum !== 0" :span="spanTitle" class="resume_del">
      <a-button type="primary" danger size="small" @click="delNewEducationInfoData(indexNum)"
        >删除</a-button
      >
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="spanTitle">
      <a-form-item
        name="startYear"
        :label="themeLanguage?.startYear?.label"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
        :rules="[{ required: false, message: themeLanguage?.startYear?.message }]"
      >
        <a-date-picker
          v-model:value="educationInfoData.startYear"
          value-format="YYYY-MM"
          picker="month"
          :placeholder="themeLanguage?.startYear?.message"
        />
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle">
      <a-form-item
        name="endYear"
        :label="themeLanguage?.endYear?.label"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :rules="[{ required: false, message: themeLanguage?.endYear?.message }]"
      >
        <a-date-picker
          v-model:value="educationInfoData.endYear"
          value-format="YYYY-MM"
          picker="month"
          :placeholder="themeLanguage?.endYear?.message"
        />
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle">
      <a-form-item
        name="atSchool"
        :label="themeLanguage?.atSchool?.label"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
        :rules="[{ required: false, message: themeLanguage?.atSchool?.message }]"
      >
        <a-radio-group
          v-model:value="educationInfoData.atSchool"
          :options="optionsAtSchool"
        ></a-radio-group>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="spanTitle">
      <a-form-item
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
        :name="['educationInfoList', indexNum, 'degree']"
        :label="themeLanguage?.degree?.label"
        :rules="[{ required: true, message: themeLanguage?.degree?.message }]"
      >
        <a-select
          class="form-select"
          v-model:value="educationInfoData.degree"
          :options="degreeOptions"
          :placeholder="themeLanguage?.degree?.message"
          @change="changeDegree"
        ></a-select>
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle" v-if="degreeFlag">
      <a-form-item
        name="majorName"
        :label="themeLanguage?.majorName?.label"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :rules="[{ required: false, message: themeLanguage?.majorName?.message }]"
      >
        <a-input
          v-model:value="educationInfoData.majorName"
          :placeholder="themeLanguage?.majorName?.message"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle" v-if="degreeFlag">
      <a-form-item
        name="isRegular"
        :label="themeLanguage?.isRegular?.label"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
        :rules="[{ required: false, message: themeLanguage?.isRegular?.message }]"
      >
        <a-radio-group v-model:value="educationInfoData.isRegular" :options="optionsRegular">
          <a-radio value="Y">是</a-radio>
          <a-radio value="N">否</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-col>
  </a-row>
  <!-- </a-form>    -->
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import type { SelectProps } from 'ant-design-vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  import { degreeArr, degreeEnArr } from '/@/store/data/resume';
  const cityStore = useCityStoreWithOut();
  const { cheieseCity } = storeToRefs(cityStore);
  const resumeStore = useResumeStoreWithOut();
  const { resumeFormState, resumeTypeEnglish } = storeToRefs(resumeStore);
  const delNewEducationInfoData = (param: number) => {
    resumeStore.delNewEducationInfoData(param);
  };
  const themeLanguage = ref(validateLanguage('educationInfo', resumeTypeEnglish.value));
  const props = defineProps({
    educationInfoList: {
      type: Array,
      required: true,
    },
    educationInfoData: {
      type: Object,
      required: true,
    },
    indexNum: {
      type: Number,
      required: true,
    },
  });
  const spanTitle = 4;
  const degreeOptions = ref<SelectProps['options']>(
    degreeArr.map((item) => ({
      label: item,
      value: item,
    })),
  );
  let degreeFlag = ref(true);
  let schoolTypeFlag = ref(true);
  onBeforeMount(() => {
    if (props.educationInfoData.degree == '初中' || props.educationInfoData.degree == '高中' || props.educationInfoData.degree == 'Junior middle school' || props.educationInfoData.degree == 'Senior high school') {
      props.educationInfoData.isRegular = 'Y';
      props.educationInfoData.majorName = '';
      degreeFlag.value = false;
    }
    if (
      props.educationInfoData.degree == '本科' ||
      props.educationInfoData.degree == '硕士' ||
      props.educationInfoData.degree == '博士' ||
      props.educationInfoData.degree == '博士后' ||
      props.educationInfoData.degree == 'MBA' ||
      props.educationInfoData.degree == '本科+MBA' ||
      props.educationInfoData.degree == '硕士+MBA' ||
      props.educationInfoData.degree == '博士+MBA' ||
      props.educationInfoData.degree == '大学肄业' ||
      props.educationInfoData.degree == 'Doctorate' ||
      props.educationInfoData.degree == 'MBA/EMBA' ||
      props.educationInfoData.degree == 'Master' ||
      props.educationInfoData.degree == 'Bachelor' ||
      props.educationInfoData.degree == 'Junior College' ||
      props.educationInfoData.degree == 'Special School'
    ) {
      schoolTypeFlag.value = true;
    } else {
      props.educationInfoData.schoolType = [];
      schoolTypeFlag.value = false;
    }
    if (
      !resumeFormState.value.personInfoData.nationality &&
      props.indexNum == 0 &&
      props.educationInfoData.schoolName
    ) {
      cheieseCity.value.filter((item) => {
        //@ts-ignore
        if (props.educationInfoData.schoolName.includes(item.cityName)) {
          if (resumeTypeEnglish.value == '1') {
            resumeStore.updateNationality('China');
          } else {
            resumeStore.updateNationality('中国');
          }
        }
        //@ts-ignore
        if (props.educationInfoData.schoolName.includes(item.provinceName)) {
          if (resumeTypeEnglish.value == '1') {
            resumeStore.updateNationality('China');
          } else {
            resumeStore.updateNationality('中国');
          }
        }
      });
    }
  });
  const changeDegree = (value: string) => {
    if (value == '初中' || value == '高中' || value == 'Junior middle school' || value == 'Senior high school') {
      props.educationInfoData.isRegular = 'Y';
      props.educationInfoData.majorName = '';
      degreeFlag.value = false;
    } else {
      degreeFlag.value = true;
    }
    if (
      value == '本科' ||
      value == '硕士' ||
      value == '博士' ||
      value == '博士后' ||
      value == 'MBA' ||
      value == '本科+MBA' ||
      value == '硕士+MBA' ||
      value == '博士+MBA' ||
      value == '大学肄业' ||
      value == 'Doctorate' ||
      value == 'MBA/EMBA' ||
      value == 'Master' ||
      value == 'Bachelor' ||
      value == 'Junior College' ||
      value == 'Special School'
    ) {
      schoolTypeFlag.value = true;
    } else {
      props.educationInfoData.schoolType = [];
      schoolTypeFlag.value = false;
    }
    //resumeStore.changeDegree(value);
  };
  const optionsAtSchool = ref<SelectProps['options']>([
    { label: '是', value: '1' },
    { label: '否', value: '2' },
  ]);
  const optionsRegular = ref<SelectProps['options']>([
    { label: '是', value: 'Y' },
    { label: '否', value: 'N' },
  ]);
  if (resumeTypeEnglish.value == '1') {
    optionsAtSchool.value = [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '2' },
    ];
    optionsRegular.value = [
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' },
    ];
    degreeOptions.value = degreeEnArr.map((item) => ({
      label: item,
      value: item,
    }));
  }
  watch(
    () => resumeTypeEnglish.value,
    () => {
      themeLanguage.value = validateLanguage('educationInfo', resumeTypeEnglish.value);
      if (resumeTypeEnglish.value == '1') {
        optionsAtSchool.value = [
          { label: 'Yes', value: '1' },
          { label: 'No', value: '2' },
        ];
        optionsRegular.value = [
          { label: 'Yes', value: 'Y' },
          { label: 'No', value: 'N' },
        ];
        degreeOptions.value = degreeEnArr.map((item) => ({
          label: item,
          value: item,
        }));
      } else {
        degreeOptions.value = degreeArr.map((item) => ({
          label: item,
          value: item,
        }));
        optionsAtSchool.value = [
          { label: '是', value: '1' },
          { label: '否', value: '2' },
        ];
        optionsRegular.value = [
          { label: '是', value: 'Y' },
          { label: '否', value: 'N' },
        ];
      }
    },
  );
</script>
<style scoped>
  .resume_del {
    margin-left: 24px;
  }
  .resume_box_right {
    margin-left: 8px;
  }
  .resume_box_left {
    margin-left: -7px;
  }
</style>
