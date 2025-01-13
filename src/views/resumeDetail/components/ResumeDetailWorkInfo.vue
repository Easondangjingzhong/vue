<template>
  <div class="resume_header" v-if="!expend">
    <a-row :gutter="24" v-if="indexNum === 0">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            t="1735637486491"
            style="vertical-align: middle"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8293"
            width="16"
            height="16"
          >
            <path
              d="M810.666667 170.666667 632.32 170.666667C614.4 121.173333 567.466667 85.333333 512 85.333333 456.533333 85.333333 409.6 121.173333 391.68 170.666667L213.333333 170.666667C166.4 170.666667 128 209.066667 128 256L128 853.333333C128 900.266667 166.4 938.666667 213.333333 938.666667L810.666667 938.666667C857.6 938.666667 896 900.266667 896 853.333333L896 256C896 209.066667 857.6 170.666667 810.666667 170.666667L810.666667 170.666667ZM512 170.666667C535.466667 170.666667 554.666667 189.866667 554.666667 213.333333 554.666667 236.8 535.466667 256 512 256 488.533333 256 469.333333 236.8 469.333333 213.333333 469.333333 189.866667 488.533333 170.666667 512 170.666667L512 170.666667ZM597.333333 768 298.666667 768 298.666667 682.666667 597.333333 682.666667 597.333333 768 597.333333 768ZM725.333333 597.333333 298.666667 597.333333 298.666667 512 725.333333 512 725.333333 597.333333 725.333333 597.333333ZM725.333333 426.666667 298.666667 426.666667 298.666667 341.333333 725.333333 341.333333 725.333333 426.666667 725.333333 426.666667Z"
              fill="#000000"
              p-id="8294"
            ></path>
          </svg>
          工作经历
        </h4>
        <PlusOutlined @click="handleAddWorkInfo" style="margin-top: 9px" />
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-row :gutter="24" class="resume_row resume_company_row">
      <a-col :span="4" v-if="resumeData.endYear == -1">
        {{ resumeData.startYear }}.{{ resumeData.startMonth }} - 至今
      </a-col>
      <a-col :span="4" v-else-if="resumeData.endYear != -1">
        {{ resumeData.startYear }}.{{ resumeData.startMonth }} - {{ resumeData.endYear }}.{{
          resumeData.endMonth
        }}
      </a-col>
      <a-col :span="19" class="resume_col">
        {{ resumeData.companyName }}-{{ resumeData.cityName }}-{{ resumeData.marketName }}-{{
          resumeData.brandName
        }}-{{ resumeData.workFloor }}
      </a-col>
      <a-col :span="1" style="padding-left: 10px">
        <form-outlined @click="handleUpdateWorkInfo"></form-outlined>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="8" class="resume_col">
        职位名称: <span class="resume_span">{{ resumeData.positionName }}</span></a-col
      >
      <a-col :span="5" class="resume_col">
        汇报对象: <span class="resume_span">{{ resumeData.reporter }}</span></a-col
      >
      <a-col :span="5" class="resume_col">
        所在部门: <span class="resume_span">{{ resumeData.department }}</span></a-col
      >
      <a-col :span="4" class="resume_col">
        综合月薪: <span class="resume_span">{{ resumeData.monthSalary }}</span></a-col
      >
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="8" class="resume_col"> 行业: <span class="resume_span"></span></a-col>
      <a-col :span="5" class="resume_col"> 品类: <span class="resume_span"></span></a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="12" class="resume_col">
        薪资构架: <span class="resume_span">{{ resumeData.salaryStructure }}</span></a-col
      >
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="12" class="resume_col">
        团队构架: <span class="resume_span">{{ resumeData.personnelStructure }}</span></a-col
      >
    </a-row>
    <a-row :gutter="24" class="resume_row" style="margin-bottom: 0">
      <a-col :span="12"> 工作职责: </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24" v-html="resumeData.workDuty"></a-col>
    </a-row>
  </div>
  <div class="resume_header_update" v-if="expend">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
      <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_title">
          <h4 class="resume_h4">
            <svg
              t="1735637486491"
              style="vertical-align: middle"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8293"
              width="16"
              height="16"
            >
              <path
                d="M810.666667 170.666667 632.32 170.666667C614.4 121.173333 567.466667 85.333333 512 85.333333 456.533333 85.333333 409.6 121.173333 391.68 170.666667L213.333333 170.666667C166.4 170.666667 128 209.066667 128 256L128 853.333333C128 900.266667 166.4 938.666667 213.333333 938.666667L810.666667 938.666667C857.6 938.666667 896 900.266667 896 853.333333L896 256C896 209.066667 857.6 170.666667 810.666667 170.666667L810.666667 170.666667ZM512 170.666667C535.466667 170.666667 554.666667 189.866667 554.666667 213.333333 554.666667 236.8 535.466667 256 512 256 488.533333 256 469.333333 236.8 469.333333 213.333333 469.333333 189.866667 488.533333 170.666667 512 170.666667L512 170.666667ZM597.333333 768 298.666667 768 298.666667 682.666667 597.333333 682.666667 597.333333 768 597.333333 768ZM725.333333 597.333333 298.666667 597.333333 298.666667 512 725.333333 512 725.333333 597.333333 725.333333 597.333333ZM725.333333 426.666667 298.666667 426.666667 298.666667 341.333333 725.333333 341.333333 725.333333 426.666667 725.333333 426.666667Z"
                fill="#000000"
                p-id="8294"
              ></path>
            </svg>
            工作经历
          </h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="6">
          <a-form-item
            name="startYear"
            label="开始年月"
            :rules="[{ required: true, message: '请选择开始年月' }]"
          >
            <a-date-picker
              v-model:value="formState.startYear"
              value-format="YYYY-MM"
              picker="month"
              placeholder="请选择开始年月"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" style="position: relative" v-if="!endYearFlag">
          <a-form-item
            name="endYear"
            label="结束年月"
            :rules="[{ required: true, message: '请选择结束年月' }]"
          >
            <a-date-picker
              v-model:value="formState.endYear"
              value-format="YYYY-MM"
              picker="month"
              placeholder="请选择结束年月"
            />
          </a-form-item>
          <a-checkbox
            class="resume_box"
            v-if="indexNum === 0"
            v-model:checked="endYearFlag"
            @change="onChangeEndYearFlag"
            >目前在职</a-checkbox
          >
        </a-col>
        <a-col :span="spanTitle" v-if="endYearFlag"
          ><a-form-item label="结束年月" style="padding-left: 9px"
            ><span class="resume_col_padding">至今</span>
            <a-checkbox
              v-model:checked="endYearFlag"
              v-if="indexNum === 0"
              @change="onChangeEndYearFlag"
              >目前在职</a-checkbox
            >
          </a-form-item></a-col
        >
        <a-col :span="6"></a-col>
        <a-col :span="6">
          <a-form-item
            label="最近工作"
            name="isNewtest"
            :rules="[{ required: true, message: '请选择最近工作' }]"
          >
            <a-select
              v-model:value="formState.isNewtest"
              placeholder="请选择最近工作"
              optionFilterProp="label"
              showSearch
              :options="optionNewtest"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="12">
          <a-form-item
            name="companyName"
            label="公司名称"
            :rules="[{ required: true, message: '请输入公司名称' }]"
          >
            <a-select
              v-model:value="formState.companyName"
              placeholder="请输入公司名称"
              :options="optionsCompanyId"
              optionFilterProp="label"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            label="类别"
            name="category"
            style="padding-left: 21px"
            :rules="[{ required: true, message: '请选择类别' }]"
          >
            <a-select
              v-model:value="formState.category"
              placeholder="请选择类别"
              optionFilterProp="label"
              showSearch
              @change="handleCategory"
              :options="optionCategory"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="categoryFlag">
          <a-form-item
            label="撤店"
            name="isRetreat"
            style="padding-left: 20px"
            :rules="[{ required: true, message: '请选择撤店' }]"
          >
            <a-select
              v-model:value="formState.isRetreat"
              placeholder="请选择撤店"
              optionFilterProp="label"
              showSearch
              :options="optionRetreat"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="spanTitle">
          <a-form-item
            label="城市"
            name="cityName"
            style="padding-left: 21px"
            :rules="[{ required: true, message: '请选择城市' }]"
          >
            <a-select
              v-model:value="formState.cityName"
              placeholder="请选择城市"
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
            label="商场"
            name="marketName"
            style="padding-left: 21px"
            :rules="[{ required: true, message: '请选择商场' }]"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.marketName"
              placeholder="请选择商场"
              :options="optionsMarkId"
              :labelInValue="true"
              showSearch
              @change="handleMarketBrandFloor"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            label="品牌"
            name="brandName"
            style="padding-left: 21px"
            :rules="[{ required: true, message: '请选择品牌' }]"
          >
            <a-select
              v-model:value="formState.brandName"
              placeholder="请选择品牌"
              optionFilterProp="label"
              :labelInValue="true"
              :options="optionsBrand"
              @change="handleMarketBrandFloor"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="categoryFlag">
          <a-form-item
            label="楼层"
            name="workFloor"
            style="padding-left: 21px"
            :rules="[{ required: true, message: '请选择楼层' }]"
          >
            <a-select
              v-model:value="formState.workFloor"
              placeholder="请选择楼层"
              :options="optionsWorkFloor"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="spanTitle">
          <a-form-item
            label="职位名称"
            name="positionsId"
            :rules="[{ required: true, message: '请选择职位名称' }]"
          >
            <a-select
              v-model:value="formState.positionsId"
              placeholder="请选择职位名称"
              :options="optionsPositions"
              optionFilterProp="label"
              :labelInValue="true"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="reporter"
            label="汇报对象"
            style="padding-left: 8px"
            :rules="[{ required: false, message: '请输入汇报对象' }]"
          >
            <a-input v-model:value="formState.reporter" placeholder="请输入汇报对象"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="department"
            label="所在部门"
            style="padding-left: 8px"
            :rules="[{ required: false, message: '请输入所在部门' }]"
          >
            <a-input v-model:value="formState.department" placeholder="请输入所在部门"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="monthSalary"
            label="综合月薪"
            style="padding-left: 8px"
            :rules="[{ required: false, message: '请输入综合月薪' }]"
          >
            <a-input-number
              style="width: 100%"
              v-model:value="formState.monthSalary"
              placeholder="请输入综合月薪"
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="24">
          <a-form-item
            name="salaryStructure"
            label="薪资构架"
            style="padding-left: 8px"
            :rules="[{ required: false, message: '请输入薪资构架' }]"
          >
            <a-input
              v-model:value="formState.salaryStructure"
              placeholder="请输入薪资构架"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="24">
          <a-form-item
            name="personnelStructure"
            label="人员架构"
            style="padding-left: 8px"
            :rules="[{ required: false, message: '请输入人员架构' }]"
          >
            <a-input
              v-model:value="formState.personnelStructure"
              placeholder="请输入人员架构"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="24">
          <a-form-item
            name="workDuty"
            label="工作职责"
            :rules="[{ required: true, message: '请输入工作职责' }]"
          >
            <a-textarea
              :rows="7"
              v-model:value="formState.workDuty"
              placeholder="请输入工作职责"
            ></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="24" class="resume_detail_btn">
          <a-button style="margin: 0 8px" type="primary" :loading="iconLoading" html-type="submit"
            >保存</a-button
          >
          <a-button @click="handleUpdateWorkInfo">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import { workFloorArr } from '/@/store/data/resume';
  const cityStore = useCityStoreWithOut();
  const resumeListStore = useResumeListStoreWithOut();
  const { positionsList, brandList, markIdList, companyList } = storeToRefs(resumeListStore);
  const { province } = storeToRefs(cityStore);
  const spanTitle = 6;
  const resumeDetailStore = useResumeDetailStore();
  const expend = ref(false);
  const iconLoading = ref(false);
  const categoryFlag = ref(true);
  const formRef = ref(null);
  const optionCategory = ref([
    { value: '店铺', label: '店铺' },
    { value: 'OFFICE', label: 'OFFICE' },
  ]);
  const optionRetreat = ref([
    { value: 1, label: '是' },
    { value: 0, label: '否' },
  ]);
  const optionNewtest = ref([
    { value: 1, label: '是' },
    { value: 0, label: '否' },
  ]);
  const props = defineProps({
    resumeData: {
      type: Object,
      required: false,
    },
    indexNum: {
      type: Number,
      required: false,
    },
  });
  const formState = reactive({
    companyName: '',
    category: '',
    isRetreat: '',
    isNewtest: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
    positionName: '',
    department: '',
    workDuty: '',
    cityName: { value: '', label: '' },
    marketName: { value: '', label: '' },
    reporter: '',
    brandName: { value: '', label: '' },
    workFloor: '',
    monthSalary: '',
    salaryStructure: '',
    personnelStructure: '',
    positionsId: { value: '', label: '' },
    resumeId: props.resumeData?.resumeId,
    id: '',
    workMark: '',
    workBrand: '',
    workCity: '',
    recruitId: '444',
  });
  if (!props.resumeData?.id) {
    expend.value = !expend.value;
  }
  //工作经历结束年月是否为"至今" false 展示日期组件 true 展示至今
  let endYearFlag = ref(false);
  onBeforeMount(() => {
    if (props.resumeData?.endYear == '至今' || props.resumeData?.endYear == '-1') {
      endYearFlag.value = true;
    }
  });
  const endYearTemp =
    props.resumeData?.endYear +
    (props.resumeData?.endMonth < 10
      ? '-0' + props.resumeData?.endMonth
      : '-' + props.resumeData?.endMonth);
  const onChangeEndYearFlag = () => {
    if (endYearFlag.value) {
      endYearFlag.value = true;
      formState.endYear = '-1';
      //@ts-ignore
      formState.isNewtest = 1;
    } else {
      endYearFlag.value = false;
      //peops.workExperienceData.endYear = "";
      formState.endYear = endYearTemp;
      formState.isNewtest = '';
    }
  };

  const handleUpdateWorkInfo = () => {
    expend.value = !expend.value;
    if (!props.resumeData?.id) {
      resumeDetailStore.$patch({ workFlag: false });
    }
    formState.companyName = props.resumeData?.companyName;
    formState.brandName = {
      value: props.resumeData?.workBrand,
      label: props.resumeData?.brandName,
    };
    formState.category = props.resumeData?.category;
    formState.marketName = {
      value: props.resumeData?.workMark,
      label: props.resumeData?.marketName,
    };
    formState.cityName = { value: props.resumeData?.workCity, label: props.resumeData?.cityName };
    formState.department = props.resumeData?.department;
    formState.startYear =
      props.resumeData?.startYear +
      (props.resumeData?.startMonth < 10
        ? '-0' + +props.resumeData?.startMonth
        : '-' + props.resumeData?.startMonth);
    formState.startMonth = props.resumeData?.startMonth;
    formState.endYear =
      props.resumeData?.endYear +
      (props.resumeData?.endMonth < 10
        ? '-0' + +props.resumeData?.endMonth
        : '-' + props.resumeData?.endMonth);
    formState.endMonth = props.resumeData?.endMonth;
    formState.positionName = props.resumeData?.positionName;
    formState.positionsId = {
      value: props.resumeData?.positionsId,
      label: props.resumeData?.positionName,
    };
    formState.resumeId = props.resumeData?.resumeId;
    formState.id = props.resumeData?.id;
    formState.salaryStructure = props.resumeData?.salaryStructure;
    formState.personnelStructure = props.resumeData?.personnelStructure;
    formState.workDuty = props.resumeData?.workDuty?.replaceAll(/<[^>]+>/g, '');
    formState.workFloor = props.resumeData?.workFloor;
    formState.workMark = props.resumeData?.workMark;
    formState.workBrand = props.resumeData?.workBrand;
    formState.workCity = props.resumeData?.workCity;
    formState.monthSalary = props.resumeData?.monthSalary;
    formState.department = props.resumeData?.department;
    formState.reporter = props.resumeData?.reporter;
    formState.isRetreat = props.resumeData?.isRetreat;
    formState.isNewtest = props.resumeData?.isNewtest;
    handleCategory();
  };
  //职位数据
  const optionsPositions = ref<SelectProps['options']>([]);
  let tempOptionPositions = [];
  positionsList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnPosition, item.usPosition),
      //@ts-ignore
      value: item.positionId,
    };
    //@ts-ignore
    tempOptionPositions.push(tempObj);
  });

  optionsPositions.value = tempOptionPositions;
  function positionsListShow(cnName, usName) {
    if (cnName && usName) {
      return `${cnName}/${usName}`;
    } else if (cnName && !usName) {
      return cnName;
    } else if (!cnName && usName) {
      return usName;
    } else {
      return '';
    }
  }
  //楼层数据展示
  const optionsWorkFloor = ref<SelectProps['options']>(
    workFloorArr.map((item) => ({ value: item, label: item })),
  );
  //品牌数据展示
  const optionsBrand = ref<SelectProps['options']>([]);
  let tempOptionBrand = [];
  brandList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnName, item.usName),
      //@ts-ignore
      value: item.brandId,
    };
    //@ts-ignore
    tempOptionBrand.push(tempObj);
  });
  optionsBrand.value = tempOptionBrand;
  //城市数据展示
  const optionsCity = ref<SelectProps['options']>([]);
  optionsCity.value = province.value.reduce((prev, curr) => {
    //@ts-ignore
    if (
      (curr.provinceName == curr.cityName || !curr.cityName) &&
      !(curr.cityName == '吉林' || curr.cityName == '海南')
    ) {
      //@ts-ignore
      prev.push({
        //@ts-ignore
        label: curr.provinceName,
        //@ts-ignore
        value: curr.id,
      });
    } else {
      //@ts-ignore
      prev.push({
        //@ts-ignore
        label: curr.cityName,
        //@ts-ignore
        value: curr.id,
      });
    }
    return prev;
  }, []);
  //商场数据展示
  const optionsMarkId = ref<SelectProps['options']>([]);
  let tempOptionMarkId = [];
  markIdList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: item.text,
      //@ts-ignore
      value: item.id,
    };
    //@ts-ignore
    tempOptionMarkId.push(tempObj);
  });
  optionsMarkId.value = tempOptionMarkId;
  const handleCityName = (values) => {
    let tempOptionMarkIdUpdate = [];
    //商场数据
    resumeDetailStore.queryMarkList(values.label).then((res) => {
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
  };
  const handleMarketBrandFloor = () => {
    resumeDetailStore
      .queryMarkBrandFloor(formState.marketName.value, formState.brandName.value, '444')
      .then((res) => {
        if (res.code == 1) {
          formState.workFloor = res.info[0].floor;
        }
      });
  };

  //公司数据展示
  const optionsCompanyId = ref<SelectProps['options']>([]);
  let tempOptionCompanyId = [];
  companyList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      label: item.companyName,
      value: item.companyName,
    };
    //@ts-ignore
    tempOptionCompanyId.push(tempObj);
  });
  optionsCompanyId.value = tempOptionCompanyId;

  const onFinish = () => {
    iconLoading.value = true;
    resumeDetailStore
      .updateResumeWorkExp(formState)
      .then((res) => {
        if (res.code == 1) {
          resumeDetailStore.queryResumeDetail().then(() => {
            iconLoading.value = false;
            expend.value = !expend.value;
            if (!props.resumeData?.id) {
              resumeDetailStore.$patch({ workFlag: false });
            }
            message.success('保存成功');
          });
        } else {
          iconLoading.value = false;
          message.error('保存失败');
        }
      })
      .catch(() => {
        iconLoading.value = false;
        message.error('保存失败');
      });
  };
  const handleAddWorkInfo = () => {
    resumeDetailStore.$patch({ workFlag: true });
    // const domindex = document.getElementsByClassName("resume_container_index")[0];
    // console.log(domindex.scrollTop);
    // const domWork = document.getElementsByClassName("resume_work_show")[0];
    // console.log(domWork.scrollTop);
  };
  const handleCategory = () => {
    if (formState.category == '店铺') {
      categoryFlag.value = true;
      let tempOptionPositions = [];
      positionsList.value.forEach((item) => {
        //@ts-ignore
        let tempObj = {
          //@ts-ignore
          label: positionsListShow(item.cnPosition, item.usPosition),
          //@ts-ignore
          value: item.positionId,
        };
        //@ts-ignore
        tempOptionPositions.push(tempObj);
      });
      optionsPositions.value = tempOptionPositions;
    } else {
      categoryFlag.value = false;
      formState.workFloor = '';
      formState.workBrand = '';
      formState.workMark = '';
      formState.isRetreat = '';
      formState.marketName ={ value: '', label: '' };
      formState.brandName ={ value: '', label: '' };
      resumeDetailStore.queryResumePositions().then((res) => {
        let tempOption = [];
        res.info.postList.forEach((item) => {
          //@ts-ignore
          let tempObj = {
            //@ts-ignore
            label: positionsListShow(item.cnPosition, item.usPosition),
            //@ts-ignore
            value: item.positionId,
          };
          //@ts-ignore
          tempOption.push(tempObj);
        });
        optionsPositions.value = tempOption;
      });
    }
  };
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 0 20px;
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
  .resume_company_row {
    background-color: #f0f0f0;
    font-size: 14px;
    padding: 10px 0;
    font-weight: 700;
  }
  .resume_row_update {
    margin-left: 15px;
  }
  .resume_row {
    margin-bottom: 20px;
    padding-left: 25px;
  }
  .resume_detail_btn {
    display: flex;
    justify-content: center;
  }
  .resume_box {
    position: absolute;
    top: 8%;
    left: 102%;
    width: 100px;
  }
  .resume_col_padding {
    padding-left: 12px;
    padding-right: 10px;
  }
  .resume_span {
    padding-left: 15px;
  }
  .resume_col {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
