<template>
  <a-divider v-if="indexNum !== 0" style="height: 1px; background-color: #ccc;margin: 0 0 16px;" dashed />
  <!-- <a-form :label-col="{span: 5}"
      :wrapper-col="{span: 14}" :model="workExperienceData"> -->
  <a-row>
    <a-col :span="8">
      <a-form-item
        :name="['workExperienceList',indexNum,'companyName']"
        label="公司名称"
        :label-col="{span: 4}"
        class="resume_company"
        :wrapper-col="{span: 20}"
        :rules="[{ required: true, message: '请输入公司名称' }]"
      >
        <a-input
          v-model:value="workExperienceData.companyName"
          placeholder="请输入公司名称"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item
        name="category"
        class="resume_category"
        label="类别"
        :rules="[{ required: false, message: '请选择类别' }]"
      >
        <a-select
          v-model:value="workExperienceData.category"
          placeholder="请选择类别"
          @change="onChangeCategory"
        >
          <a-select-option value=""></a-select-option>
          <a-select-option value="店铺">店铺</a-select-option>
          <a-select-option value="OFFICE">OFFICE</a-select-option>
      </a-select>
      </a-form-item>
    </a-col>
    <a-col v-if="indexNum !== 0" :span="spanTitle" class="resume_del">
          <a-button type="primary" danger size="small" @click="delNewWorkExperienceDetails(indexNum)">删除</a-button>
        </a-col>
  </a-row>
  <a-row>
    <a-col :span="spanTitle">
      <a-form-item
        :name="['workExperienceList',indexNum,'startYear']"
        label="开始年月"
        :rules="[{ required: true, message: '请选择开始年月' }]"
      >
        <a-date-picker
          v-model:value="workExperienceData.startYear"
          value-format="YYYY-MM"
          picker="month"
          placeholder="请选择开始年月"
        />
      </a-form-item>
    </a-col>
    <a-col :span="spanTitle" v-if="!endYearFlag" style="position: relative;">
      <a-form-item
        :name="['workExperienceList',indexNum,'endYear']"
        label="结束年月"
        :rules="[{ required: true, message: '请选择结束年月'}]"
      >
        <a-date-picker
          v-model:value="workExperienceData.endYear"
          value-format="YYYY-MM"
          picker="month"
          @change="handleEndYearTime"
          placeholder="请选择结束年月"
        />
        </a-form-item>
        <a-checkbox class="resume_box" v-if="indexNum === 0" v-model:checked="endYearFlag" @change="onChangeEndYearFlag">目前在职</a-checkbox>
    </a-col>
    <a-col :span="spanTitle" v-if="endYearFlag"><a-form-item
        label="结束年月" ><span class="resume_col_padding">至今</span>
      <a-checkbox v-model:checked="endYearFlag" v-if="indexNum === 0" @change="onChangeEndYearFlag">目前在职</a-checkbox>
    </a-form-item></a-col>
   
  </a-row>
  <a-row>
    <a-col :span="spanTitle">
      <a-form-item
        label="职位名称"
        name="positionName"
        :rules="[{ required: false, message: '请选择职位名称' }]"
      >
        <a-select
          class="form-select"
          v-model:value="workExperienceData.positionName"
          placeholder="请选择职位名称"
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
        label="所在部门"
        :rules="[{ required: false, message: '请输入所在部门' }]"
      >
        <a-input
          v-model:value="workExperienceData.department"
          placeholder="请输入所在部门"
        ></a-input>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row style="margin-top: -15px;">
    <a-col :span="24">
      <a-form-item
        name="workDuty"
        label="工作职责"
        style="padding-left: 10px;"
        :label-col="{ span:24 }"
        :rules="[{ required: false, message: '请输入工作职责' }]"
      >
        <a-textarea
          :rows="7"
          v-model:value="workExperienceData.workDuty"
          placeholder="请输入工作职责"
        ></a-textarea>
      </a-form-item>
    </a-col>
  </a-row>
<!-- </a-form> -->
</template>
<script lang="ts" setup>
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import type { SelectProps } from 'ant-design-vue';
  import { storeToRefs } from 'pinia'
  import { message } from 'ant-design-vue';
  const resumeStore = useResumeStoreWithOut();
  const {positionStore,positionOffice} = storeToRefs(resumeStore);
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
  let optionsPosition = ref<SelectProps['options']>(positionStore.value.map((item) => ({ label: item.cnPosition +(item.usPosition ? "/" + item.usPosition : ""), value: item.id.toString() })));
  const onChangeCategory = (values: any) => {
    //handlePositionName({label: "",value: ""});
    if (values == "店铺") {
      optionsPosition.value = positionStore.value.map((item) => ({ label: item.cnPosition +(item.usPosition ? "/" + item.usPosition : ""), value: item.id.toString() }));
    }
    if (values == "OFFICE") {
      optionsPosition.value = positionOffice.value.map((item) => ({ label: item.cnPosition +(item.usPosition ? "/" + item.usPosition : ""), value: item.id.toString() }));
    }
   };
   const handleEndYearTime = (value) => {
      const startYear = peops.workExperienceData.startYear;
      if (startYear && value) {
        console.log(startYear,value);
        let endYear = value.split("-");
        //let startYearArr = startYear.toString().indexof(".") != -1 ? startYear.split("-") : startYear.split("-");
        let startYearArr = startYear.split(".").length < 2 ? startYear.split("-") : startYear.split(".");
        if (endYear[0] - startYearArr[0] < 0 || (endYear[0] - startYearArr[0] == 0 && endYear[1] - startYearArr[1] < 0)) {
          peops.workExperienceData.endYear = "";
          message.error("结束年月不得晚于开始年月");
        }
      }
   }
   
  //   const jobCategoryArr = [
//     {title: "门店销售", content: ["基础级别","资深级别","主管级别","经理级别","总监级别"]},
//     {title: "门店支持", content: ["收银基础","收银管理","库管基础","库房管理","陈列基础","陈列管理","售后基础","售后管理","CRM基础","CRM管理","辅销基础","辅销管理","安保基础","安保管理"]},
//     {title: "OFFICE销售", content: ["基础级别","主管级别","经理级别","总监级别"]},
//     {title: "OFFICE支持", content: ["基础级别","主管级别","经理级别","总监级别"]},
//     {title: "人事行政", content: ["基础级别","管理级别"]},
//     {title: "财务岗", content: ["基础级别","管理级别"]},
//     {title: "法务岗", content: ["基础级别","管理级别"]},
//     {title: "市场运营", content: ["基础级别","管理级别"]},
//     {title: "采购买手", content: ["基础级别","管理级别"]},
//     {title: "咨询翻译", content: ["基础级别","管理级别"]},
//     {title: "高级管理", content: ["管理级别"]},
//     {title: "酒店营运", content: ["基础级别","主管级别","经理级别","总监级别"]},
//     {title: "酒店后厨", content: ["基础级别","管理级别"]},
//     {title: "航空邮轮", content: ["基础级别","管理级别"]},
//     {title: "展厅售后", content: ["基础级别","管理级别"]},
//     {title: "银行保险", content: ["基础级别","管理级别"]},
// ]
// optionsJobCategory: SelectProps['options'] = jobCategoryArr.map((item) => ({ label: item.title, value: item.title }));
</script>
<style scoped>
  .resume_company{
    margin-right: 30px;
  }
  .resume_category {
    margin-left: 1px;
    width: 230px;
  }
  .resume_del {
    margin-left: 90px;
  }
  .resume_box{
    position: absolute;
    top: 8%;
    left: 82%;
    width: 100px;
  }
  .resume_col_padding {
    padding-left: 12px;
    padding-right: 10px;
  }
</style>
