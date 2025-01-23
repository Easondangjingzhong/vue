<template>
  <div class="resume-content-search">
    <a-form ref="formRef" :model="formState" @finish="onFinish" labelAlign="right">
      <a-row :gutter="24">
        <a-col :span="spanCol">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formState.userName" />
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="phoneNum" label="手机">
            <a-input v-model:value="formState.phoneNum" />
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.city"
              show-search
              :allowClear="true"
              :options="optionsCity"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="mId" label="商场">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.mId"
              show-search
              :allowClear="true"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="spanCol">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.companyName"
              show-search
              :allowClear="true"
              :options="optionsCompany"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="bId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.bId"
              show-search
              :allowClear="true"
              :options="optionsBrand"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="flag" label="状态">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.flag"
              show-search
              :allowClear="true"
              :options="optionsFlag"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="positionId" label="职位">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.positionId"
              show-search
              :allowClear="true"
              :options="optionsPositions"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12" class="row_col_space_counselor">
          <a-form-item name="teamType" label="顾问" class="row_col_space_left_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.teamType"
              :allowClear="true"
              :showArrow="false"
              :options="optionsTeamType"
              @change="handleRecommendRecruitId"
            ></a-select>
          </a-form-item>
          <a-form-item name="teamId" class="row_col_space_center_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.teamId"
              :allowClear="true"
              :showArrow="false"
              :options="optionsTeam"
              @change="handleRecommendRecruitId"
            ></a-select>
          </a-form-item>
          <a-form-item name="searchQuit" class="row_col_space_center_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.searchQuit"
              :allowClear="true"
              :showArrow="false"
              :options="optionsQuit"
              @change="handleRecommendRecruitId"
            ></a-select>
          </a-form-item>
          <a-form-item name="tgRecruitId" class="row_col_space_right_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.tgRecruitId"
              show-search
              :allowClear="true"
              :options="optionsRecommendCounselor"
            ></a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="spanCol">
          <a-form-item name="invoiceDay" label="票开">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.invoiceDay"
              show-search
              :allowClear="true"
              :options="optionsInvoiceDay"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="collectionStatus" label="回款">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.collectionStatus"
              show-search
              :allowClear="true"
              :options="optionsCollectionStatus"
            ></a-select>
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-row :gutter="24">
        <a-col :span="spanCol">
          <a-form-item name="timeType" label="类型">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.timeType"
              show-search
              :allowClear="true"
              :options="optionsTimeType"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-range-picker v-model:value="selectTime" />
        </a-col>
        <!-- <a-col :span="spanCol">
          <a-form-item name="brandType" label="类别">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.brandType"
              show-search
              :allowClear="true"
              :options="optionsBrandType"
            ></a-select>
          </a-form-item>
        </a-col> -->
        <a-col :span="spanCol" style="margin-left: 24px">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-table
      size="small"
      :dataSource="resumeList"
      :pagination="false"
      rowKey="key"
      :loading="tableLoading"
      :columns="columns"
      :scroll="{ x: 1400 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'offerPic'">
          <a :href="record.offerPic" target="_blank">查看</a>
        </template>
        <template v-if="column.key === 'flag'">
          <a-tag v-if="record.flag == '0'">专员待审</a-tag>
          <a-tag v-else-if="record.flag == '1'">专员已过</a-tag>
          <a-tag v-else-if="record.flag == '2'">企顾待审</a-tag>
          <a-tag v-else-if="record.flag == '3'">企顾已过</a-tag>
          <a-tag v-else-if="record.flag == '4'">喜报已发</a-tag>
          <a-tag v-else-if="record.flag == '5'" color="#bf1b0f">未入毁单</a-tag>
          <a-tag v-else-if="record.flag == '6'" color="#00b050">保证期中</a-tag>
          <a-tag v-else-if="record.flag == '7'" color="#bf1b0f">已入毁单</a-tag>
          <a-tag v-else-if="record.flag == '8'">过保(待审)</a-tag>
          <a-tag v-else-if="record.flag == '9'" color="#00b050">过保(已审)</a-tag>
          <a-tag v-else-if="record.flag == '10'" color="#bf1b0f">过保超时"</a-tag>
          <span v-else></span>
        </template>
      </template>
    </a-table>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pagination.current"
        :pageSize="pagination.pageSize"
        @change="handleResumeListData"
        :total="pagination.total"
        :showSizeChanger="false"
        :showQuickJumper="true"
        :hideOnSinglePage="true"
        size="small"
        :show-total="(total) => `共 ${total} 条`"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { formatToDate } from '/@/utils/dateUtil';
  import type { SelectProps } from 'ant-design-vue';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import type { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];
  const selectTime = ref<RangeValue>();
  const cityStore = useCityStoreWithOut();
  const resumeListStore = useResumeListStoreWithOut();
  const { province } = storeToRefs(cityStore);
  const {
    companyCnList,
    teamPersonChangeArr,
    positionsList,
    brandList,
    recommendCounselorArr,
    enterpriseConsultantArr,
  } = storeToRefs(resumeListStore);
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
        value: curr.provinceName,
      });
    } else {
      //@ts-ignore
      prev.push({
        //@ts-ignore
        label: curr.cityName,
        //@ts-ignore
        value: curr.cityName,
      });
    }
    return prev;
  }, []);
  const optionsCompany = ref<SelectProps['options']>([]);
  resumeListStore.queryCompanyCnList();
  watch(companyCnList, () => {
    let tempOptionCompanyId = [];
    companyCnList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        label: item.companyName,
        value: item.companyName,
      };
      //@ts-ignore
      tempOptionCompanyId.push(tempObj);
    });
    optionsCompany.value = tempOptionCompanyId;
  });
  const optionsBrand = ref<SelectProps['options']>([]);
  let tempOptionBrand = [];
  brandList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: brandListShow(item.cnName, item.usName),
      //@ts-ignore
      value: item.brandId,
    };
    //@ts-ignore
    tempOptionBrand.push(tempObj);
  });
  optionsBrand.value = tempOptionBrand;
  function brandListShow(cnName, usName) {
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
  resumeListStore.queryRecommendCounselor();
  resumeListStore.queryEnterpriseConsultant();
  const optionsRecommendCounselor = ref<SelectProps['options']>([]);
  watch(recommendCounselorArr, () => {
    optionsRecommendCounselor.value = recommendCounselorArr.value.map((item) => {
      return {
        value: item.id,
        label: item.realNameEn,
      };
    });
  });
  const optionsCounselor = ref<SelectProps['options']>([]);
  const handleRecommendRecruitId = () => {
    if (formState.value.searchType == '1') {
      resumeListStore.queryRecommendCounselor(formState.value.searchQuit, formState.value.teamId);
    }
    if (formState.value.searchType == '2') {
      optionsCounselor.value = enterpriseConsultantArr.value.map((item) => {
        return {
          value: item.id,
          label: item.realNameEn,
        };
      });
    }
  };
  const optionsPositions = ref<SelectProps['options']>([]);
  let tempOptionPositions = [];
  positionsList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnPosition, item.usPosition),
      //@ts-ignore
      value: item.positionId.toString(),
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
  const optionsTeam = ref<SelectProps['options']>([]);
  //@ts-ignore
  optionsTeam.value = teamPersonChangeArr.value.map((item) => ({
    value: item.teamId,
    label: item.teamName,
  }));
  const optionsTimeType = ref([
    {
      value: '1',
      label: '面试时间',
    },
    {
      value: '2',
      label: '跟进时间',
    },
  ]);
  const optionsFlag = ref([
    {value: '0',label: '专员待审'},
    {value: '1',label: '专员已过'},
    {value: '5',label: '未入毁单'},
    {value: '6',label: '保证期中'},
    {value: '7',label: '已入毁单'},
    {value: '8',label: '过保(待审)'},
    {value: '9',label: '过保(已审)'},
    {value: '10',label: '过保超时'},
  ]);
  const optionsTeamType = ref([
    {value: '1',label: '推顾'},
    {value: '2',label: '企顾'},
    {value: '3',label: '开顾'},
    {value: '4',label: '支顾'},
  ]);
  const optionsQuit = ref([
    {value: '在职',label: '在职'},
    {value: '离职',label: '离职'},
  ]);
  const optionsInvoiceDay = ref([
    {value: '1',label: '30天以内'},
    {value: '2',label: '30-60天'},
    {value: '3',label: '60-90天'},
    {value: '4',label: '90天以上'},
  ]);
  const optionsCollectionStatus = ref([
    {value: '1',label: '待回'},
    {value: '2',label: '已回'},
    {value: '3',label: '拒回'},
    {value: '4',label: '抵扣'},
  ]);
  const spanCol = 6;
  interface SearchForm {
    pageNumber: string;
    userName: string;
    phoneNum: string;
    city: string;
    companyName: string;
    bId: string;
    mId: string;
    positionId: string;
    jobCategory: string;
    management: string;
    teamId: string;
    teamType: string;
    tg: string;
    tgRecruitId: string;
    qg: string;
    kg: string;
    zg: string;
    destroyStatus: string;
    starTime: string;
    endTime: string;
    timeType: string;
    flag: string;
    collectionStatus: string;
    invoiceStatus: string;
    screen: string;
    invoiceDay: string;
    daihanDay: string;
    isPenalty: string;
    isNotes: string;
    isSend: string;
    brandType: string;
    jobType: string;
    searchQuit: string;
  }
  const formState = ref<SearchForm>({
    pageNumber: '1',
    userName: '',
    phoneNum: '',
    city: '',
    companyName: '',
    bId: '',
    mId: '',
    positionId: '',
    jobCategory: '',
    management: '',
    teamId: '',
    teamType: '',
    tg: '',
    tgRecruitId: '',
    qg: '',
    kg: '',
    zg: '',
    destroyStatus: '',
    starTime: '',
    endTime: '',
    timeType: '',
    flag: '',
    collectionStatus: '',
    invoiceStatus: '',
    screen: '',
    invoiceDay: '',
    daihanDay: '',
    isPenalty: '',
    isNotes: '',
    isSend: '',
    brandType: '',
    jobType: '',
    searchQuit: '',
  });

  const clearFromState = () => {
    // ��空搜索条件
    formState.value = {} as SearchForm;
  };
  const resumeList = ref([]);
  const tableLoading = ref(false);
  const columns = ref([
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 45,
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      ellipsis: true,
      key: 'userName',
      width: 80,
      fixed: 'left',
    },
    {
      title: '公司',
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      width: 80,
      fixed: 'left',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 80,
      fixed: 'left',
    },
    {
      title: '城市',
      dataIndex: 'city',
      ellipsis: true,
      key: 'city',
      width: 40,
      fixed: 'left',
    },
    {
      title: '推荐职位',
      dataIndex: 'recommendPosition',
      ellipsis: true,
      key: 'recommendPosition',
      width: 80,
      fixed: 'left',
    },
    {
      title: 'OFFER职位',
      dataIndex: 'positions',
      ellipsis: true,
      key: 'positions',
      width: 70,
      fixed: 'left',
    },
    {
      title: 'OFFER商场',
      dataIndex: 'market',
      key: 'market',
      ellipsis: true,
      width: 70,
      fixed: 'left',
    },
    {
      title: '当前状态',
      dataIndex: 'flag',
      key: 'flag',
      ellipsis: true,
      width: 60,
      fixed: 'left',
    },
    {
      title: '推顾',
      dataIndex: 'recommendCounselor',
      key: 'recommendCounselor',
      ellipsis: true,
      width: 70,
      fixed: 'left',
    },
    {
      title: '开顾',
      dataIndex: 'discoverCounselorAll',
      key: 'discoverCounselorAll',
      width: 70,
      ellipsis: true,
    },
    {
      title: '支顾',
      dataIndex: 'supportCounselor',
      key: 'supportCounselor',
      width: 70,
      ellipsis: true,
    },
    {
      title: '企顾',
      dataIndex: 'counselor',
      key: 'counselor',
      ellipsis: true,
      width: 70,
    },
    {
      title: 'OFFER',
      dataIndex: 'offerPic',
      key: 'offerPic',
      ellipsis: true,
      width: 50,
    },
    {
      title: 'OFFER时间',
      dataIndex: 'goodNewsTime',
      key: 'goodNewsTime',
      ellipsis: true,
      width: 90,
    },
    {
      title: '单比',
      dataIndex: 'ratio',
      key: 'ratio',
      ellipsis: true,
      width: 50,
    },
    {
      title: '含税',
      dataIndex: 'taxIncluded',
      key: 'taxIncluded',
      ellipsis: true,
      width: 70,
    },
    {
      title: '税率',
      dataIndex: 'taxRate',
      key: 'taxRate',
      ellipsis: true,
      width: 60,
    },
    {
      title: '税后',
      dataIndex: 'taxAfter',
      key: 'taxAfter',
      ellipsis: true,
      width: 70,
    },
    {
      title: '推额',
      dataIndex: 'tMoney',
      key: 'tMoney',
      ellipsis: true,
      width: 60,
    },
    {
      title: '企额',
      dataIndex: 'cMoney',
      key: 'cMoney',
      ellipsis: true,
      width: 60,
    },
    {
      title: '开额',
      dataIndex: 'dMoney',
      key: 'dMoney',
      ellipsis: true,
      width: 60,
    },
    {
      title: '支额',
      dataIndex: 'sMoney',
      key: 'sMoney',
      ellipsis: true,
      width: 60,
    },
    {
      title: '预入',
      dataIndex: 'predictEntryTime',
      key: 'predictEntryTime',
      ellipsis: true,
      width: 90,
    },
    {
      title: '实入',
      dataIndex: 'practicalEntryTime',
      key: 'practicalEntryTime',
      ellipsis: true,
      width: 90,
    },
    {
      title: '过保',
      dataIndex: 'guaranteeTeriodTime',
      key: 'guaranteeTeriodTime',
      ellipsis: true,
      width: 90,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 40,
      fixed: 'right',
    },
  ]);
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  interface FormOffer {
    index: string;
    key: string;
    userName: string;
    companyName: string;
    brand: string;
    city: string;
    recommendPosition: string;
    positions: string;
    market: string;
    flag: string;
    recommendCounselor: string;
    discoverCounselorAll: string;
    supportCounselor: string;
    counselor: string;
    offerPic: string;
    goodNewsTime: string;
    ratio: string;
    taxIncluded: string;
    taxRate: string;
    taxAfter: string;
    tMoney: string;
    cMoney: string;
    dMoney: string;
    sMoney: string;
    predictEntryTime: string;
    practicalEntryTime: string;
    guaranteeTeriodTime: string;
    action: string;
  }
  const onFinish = () => {
    // 点击搜索时执行的函数
    tableLoading.value = true;
    resumeListStore.queryRecommendOffer(formState.value).then((res) => {
      if (res.code == 1) {
        tableLoading.value = false;
        let info = res.info.pager;
        let list = res.info.pager.list;
        let tempList = [];
        list.forEach((item: any, index) => {
          let tempItem = {} as FormOffer;
          tempItem.index = (info.pageNumber - 1) * info.pageSize + (index + 1);
          tempItem.key = item.id;
          tempItem.userName = item.userName;
          tempItem.companyName = item.companyName;
          tempItem.brand = item.brand;
          tempItem.city = item.city;
          tempItem.recommendPosition = item.recommendPosition;
          tempItem.positions = item.positions;
          tempItem.market = item.market;
          tempItem.flag = item.flag;
          tempItem.recommendCounselor = item.recommendCounselor;
          tempItem.discoverCounselorAll = item.discoverCounselorAll;
          tempItem.supportCounselor = (item.supportCounselor1 ? `${item.supportCounselor},${item.supportCounselor1}` : item.supportCounselor);
          tempItem.counselor = (item.counselor1 ? `${item.counselor},${item.counselor1}` : item.counselor);
          tempItem.offerPic = item.offerPic;
          tempItem.goodNewsTime = (item.goodNewsTime ? formatToDate(item.goodNewsTime) : "");
          let ratio = '0%';
          let tMoney = '0';
          if (item.offerPersonList && item.offerPersonList.length > 0) {
            const temp = item.offerPersonList.filter(subItem => subItem.orderType == 2)[0];
            if (temp) {
              ratio = `${(temp.ratio * 100).toFixed(2)}%`;
              tMoney = temp.money;
            }
          }
          tempItem.ratio = ratio;
          tempItem.taxIncluded = item.taxIncluded;
          tempItem.taxAfter = item.taxAfter;
          tempItem.taxRate = (item.taxRate ? `${((item.taxRate - 1) * 100).toFixed(2)}%` : "");
          tempItem.tMoney = tMoney;
          tempItem.cMoney = item.cMoney;
          tempItem.dMoney = item.dMoney;
          tempItem.sMoney = item.sMoney;
          tempItem.predictEntryTime = (item.predictEntryTime ? formatToDate(item.predictEntryTime) : "");
          tempItem.practicalEntryTime = (item.practicalEntryTime ? formatToDate(item.practicalEntryTime) : "");
          tempItem.guaranteeTeriodTime = (item.guaranteeTeriodTime ? formatToDate(item.guaranteeTeriodTime) : "");
          tempList.push(tempItem);
        });
        resumeList.value = tempList;
        pagination.value = {
          current: parseInt(info.pageNumber),
          pageSize: parseInt(info.pageSize),
          total: info.totalCount,
        };
      }
    });
  };
  onFinish();
  const handleResumeListData = (values) => {
    // 点击分页器时执行的函数
    formState.value = { ...formState.value, pageNumber: values };
    onFinish();
  };
</script>
<style lang="less" scoped>
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
  .ant-pagination.ant-pagination-mini .ant-pagination-prev,
  .ant-pagination.ant-pagination-mini .ant-pagination-next {
    margin-right: 5px;
  }
  :deep(.row_col_space_counselor) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 6px;
  }
  :deep(.row_col_space_right_counselor) {
    width: 80%;
  }
  :deep(.row_col_space_right_counselor .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  :deep(.row_col_space_center_counselor) {
    width: 40%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_center_counselor .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  :deep(.row_col_space_left_counselor) {
    width: 70%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_left_counselor .ant-form-item-row .ant-form-item-label) {
    display: contents;
  }
  :deep(.row_col_space_left_counselor .ant-select-selector) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
</style>
