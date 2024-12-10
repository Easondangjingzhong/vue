<template>
   <a-divider v-if="indexNum !== 0" style="height: 1px; background-color: #ccc;margin: 0 0 16px;" dashed />
   <a-form :label-col="{span: 5}"
      :wrapper-col="{span: 14}" :model="educationInfoData">
   <a-row>
        <a-col :span="9">
          <a-form-item
            name="schoolName"
            label="学校名称"
            :label-col="{ span: 3}"
            :wrapper-col="{ span: 18 }"
            :rules="[{ required: true, message: '请输入学校名称' }]"
          >
            <a-input
              v-model:value="educationInfoData.schoolName"
              placeholder="请输入学校名称"
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
          <a-button type="primary" danger size="small" @click="delNewEducationInfoData(indexNum)">删除</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            name="startYear"
            label="开始年月"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 16 }"
            :rules="[{ required: false, message: '请输入开始年月' }]"
          >
            <a-date-picker
              v-model:value="educationInfoData.startYear"
              value-format="YYYY-MM"
              picker="month"
              placeholder="请选择结束年月"
            />
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="endYear"
            label="结束年月"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 16 }"
            :rules="[{ required: false, message: '请输入结束年月' }]"
          >
            <a-date-picker
              v-model:value="educationInfoData.endYear"
              value-format="YYYY-MM"
              picker="month"
              placeholder="请选择结束年月"
            />
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="atSchool"
            label="在校"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 16 }"
            :rules="[{ required: false, message: '请选择在校' }]"
          >
            <a-radio-group v-model:value="educationInfoData.atSchool">
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 16 }"
            name="degree"
            label="学历"
            :rules="[{ required: true, message: '请输入学历' }]"
          >
            <a-select
              class="form-select"
              v-model:value="educationInfoData.degree"
              :options= "degreeOptions"
              placeholder="请输入学历"
              @change="changeDegree"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="degreeFlag">
          <a-form-item
            name="majorName"
            label="专业名称"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 16 }"
            :rules="[{ required: false, message: '请输入专业名称' }]"
          >
            <a-input
              v-model:value="educationInfoData.majorName"
              placeholder="请输入专业名称"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="degreeFlag">
          <a-form-item
            name="isRegular"
            label="统招"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 16 }"
            :rules="[{ required: false, message: '请选择统招' }]"
          >
            <a-radio-group v-model:value="educationInfoData.isRegular">
              <a-radio value="Y">是</a-radio>
              <a-radio value="N">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>   
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  const resumeStore = useResumeStoreWithOut();
  const delNewEducationInfoData = (param: number) => {
    resumeStore.delNewEducationInfoData(param);
  };
  const props = defineProps({
    educationInfoData: {
      type: Object,
      required: true,
    },
    indexNum: {
      type: Number,
      required: true,
    }
  });
  const spanTitle = 4;
  const degreeArr = ["","初中","中专","高中","职高","大专","本科","硕士","博士","博士后","MBA","大专+MBA","本科+MBA","硕士+MBA","博士+MBA","大学肄业"];
  const degreeOptions: SelectProps['options'] = degreeArr.map((item) => ({ label: item, value: item }));
  let degreeFlag = ref(true);
  let schoolTypeFlag = ref(true);
  onBeforeMount(() => {
    if (props.educationInfoData.degree == "初中" || props.educationInfoData.degree == "高中") {
      props.educationInfoData.isRegular = "Y";
      props.educationInfoData.majorName = "";
      degreeFlag.value = false;
    } 
    if (props.educationInfoData.degree == "本科" || props.educationInfoData.degree == "硕士" || props.educationInfoData.degree == "博士" || props.educationInfoData.degree == "博士后" || props.educationInfoData.degree == "MBA" || props.educationInfoData.degree == "本科+MBA" || props.educationInfoData.degree == "硕士+MBA" || props.educationInfoData.degree == "博士+MBA" || props.educationInfoData.degree == "大学肄业") {
      schoolTypeFlag.value = true;
    } else {
      props.educationInfoData.schoolType = [];
      schoolTypeFlag.value = false;
    }
  })
  const changeDegree = (value: string) => {
    if (value == "初中" || value == "高中") {
      props.educationInfoData.isRegular = "Y";
      props.educationInfoData.majorName = "";
      degreeFlag.value = false;
    } else {
      degreeFlag.value = true;
    }
    if (value == "本科" || value == "硕士" || value == "博士" || value == "博士后" || value == "MBA" || value == "本科+MBA" || value == "硕士+MBA" || value == "博士+MBA" || value == "大学肄业") {
      schoolTypeFlag.value = true;
    } else {
      props.educationInfoData.schoolType = [];
      schoolTypeFlag.value = false;
    }
    //resumeStore.changeDegree(value);
  };
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