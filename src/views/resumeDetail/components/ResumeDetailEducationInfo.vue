<template>
  <div class="resume_header" v-if="!expend">
    <a-row :gutter="24" v-if="indexNum === 0">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            t="1735638214967"
            style="vertical-align: middle"
            class="icon"
            viewBox="0 0 1417 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9338"
            width="16"
            height="16"
          >
            <path
              d="M1386.969 233.393c39.187 14.376 39.463 38.046 0.236 52.973L764.337 506.368c-38.912 14.375-30.602 14.375-69.829-0.236l-326.34-113.9-90.625-31.666a7.01 7.01 0 0 0-4.135 3.19c-56.871 45.293-73.255 115.24-75.58 193.458 19.22 12.209 32.218 34.304 32.218 59.588 0 23.67-11.186 44.426-28.318 57.226 9.61 146.078 24.93 292.667-100.234 348.003C66.994 1010.334 44.111 998.36 0 963.23c89.56-109.608 119.926-202.201 130.6-283.373a70.814 70.814 0 0 1-37.652-63.015c0-30.09 18.156-55.65 43.874-65.772 0.788-79.794 5.199-148.717 71.68-214.962l-150.055-52.42c-39.227-14.376-39.227-38.046-0.552-52.422L689.31 11.225c38.99-14.376 30.64-14.376 69.868 0.275l627.79 221.893zM1167.084 509.44v384.473c-5.435 93.065-324.253 128.118-324.253 128.118H648.35s-319.252-42.85-324.215-128.118V509.44l389.042 128.158h64.827l389.04-128.158z"
              fill=""
              p-id="9339"
            ></path>
          </svg>
          教育经历
        </h4>
        <span style="margin-top: 15px">
          <a-tag color="green" v-if="!educationWholeFlag">完整</a-tag>
          <a-tag color="red" v-if="educationWholeFlag">缺失</a-tag>
        <PlusOutlined v-if="showResumeAdd" @click="handleAddEducationInfo"/>
        </span>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="10">
        {{ resumeData.schoolName }}
      </a-col>
      <a-col :span="4">
        {{ resumeData.startYear }}.{{ formatDateToMonth(resumeData.startMonth) }} - {{ resumeData.endYear }}.{{
          formatDateToMonth(resumeData.endMonth)
        }}
      </a-col>
      <a-col :span="4">
        <span v-if="resumeData.atSchool == '1'">
          {{ themeLanguage?.atSchool?.label }}
        </span>
      </a-col>
      <a-col :span="4">
        <span v-if="resumeData.schoolType?.length">
          {{ resumeData.schoolType }}
        </span>
      </a-col>
      <a-col v-if="showResumeAdd" :span="1" style="padding-left: 10px;padding-right: 0px;text-align: right;">
        <form-outlined @click="handleEduInfo"></form-outlined>
      </a-col>
      <a-col v-if="showResumeAdd" :span="1" style="padding-left: 10px !important;text-align: right;" :class="educationWholeFlagTemp ? 'educationWholeFlagRed' : 'educationWholeFlagGreen'" :title="educationWholeFlagTemp ? '缺失' : '完整'">
        <delete-outlined @click="handleDeleteEducationExp"></delete-outlined>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="10" v-if="degreeFlagTemp"> {{ themeLanguage?.majorName?.label }}: <span class="resume_span">{{ resumeData.majorName }}</span> </a-col>
      <a-col :span="4"> {{ themeLanguage?.degree?.label }}: <span class="resume_span">{{ resumeData.degree }}</span> </a-col>
      <a-col :span="7"> {{ themeLanguage?.isRegular?.label }}: 
        <span v-if="resumeTypeEnglish == '1'" class="resume_span">{{ resumeData.isRegular == 'Y' ? 'Yes' : 'No' }}</span>
        <span v-else class="resume_span">{{ resumeData.isRegular == 'Y' ? '是' : '否' }}</span>
       </a-col>
    </a-row>
  </div>
  <div class="resume_header_update" v-if="expend">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            t="1735638214967"
            style="vertical-align: middle"
            class="icon"
            viewBox="0 0 1417 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9338"
            width="16"
            height="16"
          >
            <path
              d="M1386.969 233.393c39.187 14.376 39.463 38.046 0.236 52.973L764.337 506.368c-38.912 14.375-30.602 14.375-69.829-0.236l-326.34-113.9-90.625-31.666a7.01 7.01 0 0 0-4.135 3.19c-56.871 45.293-73.255 115.24-75.58 193.458 19.22 12.209 32.218 34.304 32.218 59.588 0 23.67-11.186 44.426-28.318 57.226 9.61 146.078 24.93 292.667-100.234 348.003C66.994 1010.334 44.111 998.36 0 963.23c89.56-109.608 119.926-202.201 130.6-283.373a70.814 70.814 0 0 1-37.652-63.015c0-30.09 18.156-55.65 43.874-65.772 0.788-79.794 5.199-148.717 71.68-214.962l-150.055-52.42c-39.227-14.376-39.227-38.046-0.552-52.422L689.31 11.225c38.99-14.376 30.64-14.376 69.868 0.275l627.79 221.893zM1167.084 509.44v384.473c-5.435 93.065-324.253 128.118-324.253 128.118H648.35s-319.252-42.85-324.215-128.118V509.44l389.042 128.158h64.827l389.04-128.158z"
              fill=""
              p-id="9339"
            ></path>
          </svg>
          教育经历
        </h4>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-form ref="formRef" :model="formState" :label-col="{ span: 8 }" @finish="onFinish">
      <a-row class="resume_row_update">
        <a-col :span="16">
          <a-form-item
            :label-col="{ span: 4 }"
            name="schoolName"
            :label="themeLanguage?.schoolName?.label"
            :rules="[{ required: true, message: themeLanguage?.schoolName?.message}]"
          >
            <a-input
              v-model:value="formState.schoolName"
              @change="handleSchoolName"
              :placeholder="themeLanguage?.schoolName?.message"
            ></a-input>
          </a-form-item>
        </a-col>
        
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="spanTitle">
          <a-form-item
            name="startYear"
            :label="themeLanguage?.startYear?.label"
            :rules="[{ required: true, message: themeLanguage?.startYear?.message}]"
          >
            <a-date-picker
              v-model:value="formState.startYear"
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
            :rules="[{ required: true, message: themeLanguage?.endYear?.message}]"
          >
            <a-date-picker
              v-model:value="formState.endYear"
              value-format="YYYY-MM"
              picker="month"
              :placeholder="themeLanguage?.endYear?.message"
              @change="handleChangeEndYear"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="schoolFlagShow" :span="spanTitle">
      <a-form-item
        name="atSchool"
        style="margin-left: 56px;"
        :rules="[{ required: false, message: themeLanguage?.atSchool?.message }]"
      >
      <a-checkbox class="resume_box" v-model:checked="schoolFlag" @change="onChangeAtSchool"
            >{{themeLanguage?.atSchool?.label}}</a-checkbox
          >
      </a-form-item>
    </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="spanTitle">
          <a-form-item
            name="degree"
            :label="themeLanguage?.degree?.label"
            :rules="[{ required: true, message: themeLanguage?.degree?.message}]"
          >
            <a-select
              class="form-select"
              v-model:value="formState.degree"
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
            :rules="[{ required: true, message: themeLanguage?.majorName?.message}]"
          >
            <a-input v-model:value="formState.majorName" :placeholder="themeLanguage?.majorName?.message"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="degreeFlag">
          <a-form-item
            name="isRegular"
             :label="themeLanguage?.isRegular?.label"
            :rules="[{ required: true, message: themeLanguage?.isRegular?.message}]"
          >
            <a-radio-group v-model:value="formState.isRegular" :options="optionsRegular"></a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_btn">
          <a-button
            style="margin: 0 8px"
            type="primary"
            :loading="iconLoading"
            html-type="submit"
            >保存</a-button
          >
          <a-button @click="handleEduInfo">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { createVNode } from 'vue';
  import { storeToRefs } from 'pinia';
  import { Modal } from 'ant-design-vue';
  import { FormOutlined,PlusOutlined,DeleteOutlined } from '@ant-design/icons-vue';
  import { degreeArr,degreeEnArr } from '/@/store/data/resume';
  import { message } from 'ant-design-vue';
  import { dateUtil,formatDateToMonth } from '/@/utils/dateUtil';
  import { shcoolType985, shcoolType211 } from '/@/utils/schoolType';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  const resumeDetailStore = useResumeDetailStore();
  const { educationWholeFlag, resumeTypeEnglish } = storeToRefs(resumeDetailStore);
  const props = defineProps({
    resumeData: {
      type: Object,
      required: false,
    },
    indexNum: {
      type: Number,
      required: false,
    },
    showResumeAdd: {
      type: Boolean,
      required: true,
    }
  });
  const schoolFlagShow = ref(false);
  const schoolFlag = ref(false);
  const themeLanguage = ref(validateLanguage('educationInfo', resumeTypeEnglish.value));
  const educationWholeFlagTemp = ref(false);
  if (!props.resumeData?.startYear || !props.resumeData?.startMonth || !props.resumeData?.endYear || !props.resumeData?.endMonth || !(degreeArr.includes(props.resumeData.degree) || degreeEnArr.includes(props.resumeData.degree))
  || !props.resumeData.degree || (!(props.resumeData.degree == "初中" || props.resumeData.degree == "高中" || props.resumeData.degree == 'Junior middle school' || props.resumeData.degree == 'Senior high school') && !props.resumeData.majorName) || !props.resumeData.isRegular ) {
    educationWholeFlagTemp.value = true;
  }
  watch(() => props.resumeData,(newProps) => {
    if (!newProps.startYear || !newProps.startMonth || !newProps.endYear || !newProps.endMonth || !(degreeArr.includes(newProps.degree) || degreeEnArr.includes(newProps.degree))
  || !newProps.degree || (!(newProps.degree == "初中" || newProps.degree == "高中" || newProps.degree == 'Junior middle school' || newProps.degree == 'Senior high school') && !newProps.majorName) || !newProps.isRegular ) {
    educationWholeFlagTemp.value = true;
  } else {
    educationWholeFlagTemp.value = false;
  }
  })
  const expend = ref(false);
  if (!props.resumeData?.id) {
    expend.value = !expend.value;
  }
  const degreeFlagTemp = ref(true);
  if (props.resumeData.degree == '初中' || props.resumeData.degree == '高中' || props.resumeData.degree == 'Junior middle school' || props.resumeData.degree == 'Senior high school') {
    degreeFlagTemp.value = false;
  }
  watch(() => props.resumeData.degree, () => {
    if (props.resumeData.degree == '初中' || props.resumeData.degree == '高中' || props.resumeData.degree == 'Junior middle school' || props.resumeData.degree == 'Senior high school') {
    degreeFlagTemp.value = false;
  }
  })
  const spanTitle = 8;
  let iconLoading = ref(false);
  const loginVueUser: {loginName: "", loginId: "", loginTocken: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  const formState = ref({
    schoolName: '',
    schoolType: [],
    startMonth: '',
    startYear: '',
    endYear: '',
    endMonth: '',
    atSchool: '',
    degree: '',
    majorName: '',
    isRegular: '',
    resumeId: props.resumeData?.resumeId,
    id: '',
    recruitId: loginVueUser.loginId,
  });
  const degreeOptions = ref(degreeArr.map((item) => ({ value: item, label: item })));
  const degreeFlag = ref(true);
  const schoolTypeFlag = ref(true);
  const handleChangeEndYear = () => {
    if (formState.value.endYear) {
      const yearNow = dateUtil().year();
      const [endYear] = formState.value.endYear.split('-');
      // @ts-ignore
      if (endYear - yearNow >= 0) {
        schoolFlagShow.value = true;
        formState.value.atSchool = '1';
      } else {
        formState.value.atSchool = '2';
        schoolFlagShow.value = true;
      }
  }
}
const onChangeAtSchool = () => {
  if (schoolFlag.value) {
    formState.value.atSchool = '1';
  } else {
    formState.value.atSchool = '2';
  }
}
  const handleEduInfo = () => {
    expend.value = !expend.value;
    if (!props.resumeData?.id) {
      resumeDetailStore.$patch({eduFlag: false})
    }
    formState.value.schoolName = props.resumeData?.schoolName;
    //formState.value.schoolType = props.resumeData.schoolType;
    formState.value.startYear = props.resumeData?.startYear
      ? props.resumeData?.startYear + (props.resumeData.startMonth < 10 ? '-0' + (+props.resumeData.startMonth) : '-'+props.resumeData.startMonth)
      : '';
    formState.value.startMonth = props.resumeData?.startMonth;
    formState.value.endYear = props.resumeData?.endYear != '-1'
      ? props.resumeData.endYear + (props.resumeData.endMonth < 10 ? '-0' + (+props.resumeData.endMonth) : '-'+props.resumeData.endMonth)
      : '';
    formState.value.endMonth = props.resumeData?.endMonth;
    formState.value.atSchool = props.resumeData?.atSchool;
    formState.value.degree = props.resumeData?.degree;
    formState.value.majorName = props.resumeData?.majorName;
    formState.value.isRegular = props.resumeData?.isRegular;
    formState.value.resumeId = props.resumeData?.resumeId;
    formState.value.id = props.resumeData?.id;
    if (formState.value.endYear) {
      const yearNow = dateUtil().year();
      const [endYear] = formState.value.endYear.split('-');
      schoolFlagShow.value = true;
      // @ts-ignore
      if (endYear - yearNow >= 0 ) {
        schoolFlagShow.value = true;
        formState.value.atSchool = '1';
      }
    if (props.resumeData?.atSchool == '1') {
      schoolFlagShow.value = true;
      schoolFlag.value = true;
      }
      
    }
    handleSchoolName();
    if (props.resumeData?.degree == '初中' || props.resumeData?.degree == '高中' || props.resumeData.degree == 'Junior middle school' || props.resumeData.degree == 'Senior high school') {
      formState.value.isRegular = 'Y';
      formState.value.majorName = '';
      degreeFlag.value = false;
    }
    if (
      props.resumeData?.degree == '本科' ||
      props.resumeData?.degree == '硕士' ||
      props.resumeData?.degree == '博士' ||
      props.resumeData?.degree == '博士后' ||
      props.resumeData?.degree == 'MBA' ||
      props.resumeData?.degree == '本科+MBA' ||
      props.resumeData?.degree == '硕士+MBA' ||
      props.resumeData?.degree == '博士+MBA' ||
      props.resumeData?.degree == '大学肄业' ||
      props.resumeData?.degree == 'Doctorate' ||
      props.resumeData?.degree == 'MBA/EMBA' ||
      props.resumeData?.degree == 'Master' ||
      props.resumeData?.degree == 'Bachelor' ||
      props.resumeData?.degree == 'Junior College' ||
      props.resumeData?.degree == 'Special School'
    ) {
      formState.value.schoolType =  (formState.value?.schoolType ? formState.value?.schoolType : []);
      schoolTypeFlag.value = formState.value?.schoolType?.length > 0 ? true : false;
    } else {
      formState.value.schoolType = [];
      schoolTypeFlag.value = false;
    }
  };

  const changeDegree = (value: string) => {
    if (value == '初中' || value == '高中' || value == 'Junior middle school' || value == 'Senior high school') {
      formState.value.isRegular = 'Y';
      formState.value.majorName = '';
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
      formState.value.schoolType = [];
      schoolTypeFlag.value = false;
    }
    //resumeStore.changeDegree(value);
  };
  const handleSchoolName = () => {
    let schoolTypeTemp: String[] = [];
    if (formState.value.schoolName) {
      console.log(formState.value.schoolName);
      // @ts-ignore
      let t985 = shcoolType985.filter(
        (items) => items === formState.value.schoolName.replace(/[\u200B-\u200F]+/g, ''),
      );
      if (t985.length > 0) {
        schoolTypeTemp.push('985');
      }
      // @ts-ignore
      let t211 = shcoolType211.filter(
        (items) => items === formState.value.schoolName.replace(/[\u200B-\u200F]+/g, ''),
      );
      if (t211.length > 0) {
        schoolTypeTemp.push('211');
      }
    }
    formState.value.schoolType = schoolTypeTemp;
    schoolTypeFlag.value = formState.value.schoolType.length > 0 ? true : false;
  };
  const onFinish = () => {
    iconLoading.value = true;
    resumeDetailStore
      .updateResumeEdu({...formState.value,
        startYear: formState.value.startYear.split("-")[0],
        startMonth: formState.value.startYear.split("-")[1],
        endYear: formState.value.endYear.split("-")[0],
        endMonth: formState.value.endYear.split("-")[1],
        schoolType: (formState.value.schoolType?.length > 0 ? formState.value.schoolType?.join(",") : ""),
      })
      .then((res) => {
        if (res == "Y") {
          resumeDetailStore.queryResumeDetail().then(() => {
          expend.value = !expend.value;
          resumeDetailStore.$patch({eduFlag: false});
          message.success('保存成功');
        });
        } else {
          message.error('保存失败');
        }
        iconLoading.value = false;
      })
      .catch(() => {
        message.error('保存失败');
      });
  };
  const handleAddEducationInfo = () => {
    resumeDetailStore.$patch({eduFlag: true})
  }
   //删除教育经历开始
   const handleDeleteEducationExp = () => {
    Modal.confirm({
    title: '是否删除教育经历?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, props.resumeData.schoolName),
    onOk() {
      resumeDetailStore.deleteEducationExp(props.resumeData.id).then((res) => {
        if (res == "Y") {
          resumeDetailStore.queryResumeDetail().then(() => {
            message.success('删除成功');
          });
        } else {
          message.error('删除失败');
        }
      });
    },
  });
  };
  //删除教育经历结束
  const optionsRegular = ref([{value: '',label: ''}])
  const loadresumeTypeEnglish = () => {
    if (resumeTypeEnglish.value == '1') {
      degreeOptions.value = degreeEnArr.map((item) => ({ value: item, label: item }));
      optionsRegular.value = [
      {value: 'Y',label: 'Yes'},
      {value: 'N',label: 'No'},
      ]
    } else {
      degreeOptions.value = degreeArr.map((item) => ({ value: item, label: item }));
      optionsRegular.value = [
      {value: 'Y',label: '是'},
      {value: 'N',label: '否'},
      ]
    }
  };
  loadresumeTypeEnglish();
  watch(
    () => resumeTypeEnglish.value,
    () => {
      themeLanguage.value = validateLanguage('educationInfo', resumeTypeEnglish.value);
      loadresumeTypeEnglish();
    },
  );
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 10px 20px;
  }
  .resume_header_update {
    margin-top: 10px;
    padding: 0 20px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
  }
  .resume_h4 {
    margin: 15px 0 5px 0;
    font-size: 18px;
  }
  .resume_detail_title {
    font-size: 14px;
    text-align: left;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .resume_row_update{
    margin-left: -18px;
  }
  .resume_row {
    margin-bottom: 20px;
    padding-left: 25px;
  }
  .resume_detail_btn {
    display: flex;
    justify-content: center;
  }
  .resume_span {
    padding-left: 15px;
  }
  .educationWholeFlagRed {
    padding-left: 10px;
    background: linear-gradient(225deg, red 16%, transparent 0);
  }
  .educationWholeFlagGreen {
    padding-left: 10px;
    background: linear-gradient(225deg, green 16%, transparent 0);
  }
</style>
