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
          <a-form-item name="brandId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.brandId"
              show-search
              :allowClear="true"
              :options="optionsBrand"
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
        <a-col :span="spanCol">
          <a-form-item name="teamId" label="团队">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.teamId"
              show-search
              :allowClear="true"
              :options="optionsTeam"
              @change="handleRecommendRecruitId"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol" class="row_col_space_counselor">
          <a-form-item label="顾问" class="row_col_space_left_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.searchType"
              :allowClear="true"
              :showArrow="false"
              :options="optionsType"
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
          <a-form-item name="recruitId" class="row_col_space_right_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.recruitId"
              show-search
              :allowClear="true"
              :options="optionsRecommendCounselor"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol" class="row_col_space_counselor">
          <a-form-item name="lunZhuang" label="面状" class="row_col_space_left_counselor">
            <a-select
              optionFilterProp="label"
              :allowClear="true"
              :showArrow="false"
              v-model:value="formState.lunZhuang"
              :options="optionsLunZhuang"
            ></a-select>
          </a-form-item>
          <a-form-item name="mianZhuang" class="row_col_space_right_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.mianZhuang"
              show-search
              :allowClear="true"
              :options="optionsMianZhuang"
            ></a-select>
          </a-form-item>
        </a-col>
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
        <a-col :span="spanCol" style="margin-left: 24px">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-row style="margin-bottom: 5px;justify-content: end;">
      <a-tag v-for="item in listNumber"
       :class="item.classNum"
       @click="handleListNumber(item.btnNum)">{{ item.name }}{{ item.num }}</a-tag>
    </a-row>
    <a-table
      size="small"
      :dataSource="resumeList"
      :pagination="false"
      rowKey="key"
      :loading="tableLoading"
      :columns="columns"
      :scroll="{ x: 1200 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'userName'">
        <a @click="handleToResumeDetailsCurrent(record.phone,record.recommendRecruitId)">
          {{ record.userName }}
        </a>
      </template>
        <template v-if="column.key === 'interviewRound'">
          <a-tag v-if="record.interviewProcess == '标准面试'" title="标准面试" color="green">{{ record.interviewRound }}</a-tag>
          <a-tag v-else title="客户自排" color="red">{{ record.interviewRound }}</a-tag>
          <span v-else>-</span>
        </template>
        <template v-if="column.key === 'interviewTime'">
          <span v-if="record.interviewTime">{{ record.interviewTime }}</span>
          <a-tag v-else-if="record.sureEndFlag == '确认超时'" color="red">录入超时</a-tag>
          <a-tag
            v-else-if="
              !(record.interviewStatus.includes('协调') || record.interviewStatus.includes('取消'))
            "
            color="orange"
            >面时待录</a-tag
          >
          <span v-else>-</span>
        </template>
        <template v-if="column.key === 'firstFollowTime'">
          <span :title="record.secondFollowTime" v-if="record.firstFollowTime">{{
            record.firstFollowTime
          }}</span>
          <span v-else>-</span>
        </template>
        <template v-if="column.key === 'firstFollowFlag'">
          <a-tag
            :title="record.firstFollowRemark"
            v-if="record.firstFollowFlag == '意向正常'"
            color="green"
            >意向正常</a-tag
          >
          <a-tag
            :title="record.firstFollowRemark"
            v-else-if="record.firstFollowFlag && record.firstFollowFlag.includes('拒绝')"
            color="red"
            >{{ record.firstFollowFlag }}</a-tag
          >
          <a-tag
            :title="record.firstFollowRemark"
            v-else-if="record.firstFollowFlag == '跟进超时'"
            color="red"
            >跟进超时</a-tag
          >
          <a-tag
            :title="record.firstFollowRemark"
            v-else-if="record.firstFollowFlag == '默认跟进'"
            color="green"
            >默认跟进</a-tag
          >
          <a-tag
            :title="record.firstFollowRemark"
            v-else-if="
              record.firstFollowTimeFlag == '1' &&
              !(record.interviewStatus.includes('拒绝') || record.interviewStatus.includes('取消'))
            "
            color="orange"
            >意向待跟</a-tag
          >
          <span v-else>-</span>
        </template>
        <template v-if="column.key === 'isAttend'">
          <a-tag :title="record.attendRemark" v-if="record.isAttend == '出席'" color="green"
            >面试出席</a-tag
          >
          <a-tag :title="record.attendRemark" v-else-if="record.isAttend == '缺席'" color="red"
            >面试缺席</a-tag
          >
          <a-tag :title="record.attendRemark" v-else-if="record.isAttend == '取消'" color="red"
            >面试取消</a-tag
          >
          <a-tag
            :title="record.attendRemark"
            v-else-if="record.attendEndFlag == '出席超时'"
            color="red"
            >面试取消</a-tag
          >
          <a-tag
            :title="record.attendRemark"
            v-else-if="
              record.interviewTimeFlag == '1' &&
              !(record.interviewStatus.includes('拒绝') || record.interviewStatus.includes('取消'))
            "
            color="orange">出席待跟</a-tag>
          <span v-else>-</span>
        </template>
        <template v-if="column.key === 'recommendStatus'">
          <a-tag v-if="record.offerChoice && record.recommendStatus == '个人放弃'" title="未下OFFER-个人放弃" color="#bf1b0f">未下OFFER</a-tag>
          <a-tag v-else-if="record.offerChoice && record.recommendStatus == '人才放弃'" title="放弃入职-人才放弃" color="#bf1b0f">放弃入职</a-tag>
          <a-tag v-else-if="record.offerChoice && record.offerChoice != 'OFFER接受' && record.recommendStatus == '企业放弃'" title="未下OFFER-企业放弃" color="#bf1b0f">未下OFFER</a-tag>
          <a-tag v-else-if="record.offerChoice && record.offerChoice == 'OFFER接受' && record.recommendStatus == '企业放弃'" title="放弃入职-企业放弃" color="#bf1b0f">放弃入职</a-tag>
          <a-tag v-else-if="record.offerChoice && record.recommendStatus == '已OFFER背调问题'" title="背调拒绝-已OFFER" color="#bf1b0f">背调拒绝</a-tag>
          <a-tag v-else-if="record.offerChoice && record.recommendStatus == '背调问题'" title="背调拒绝-未OFFER" color="#bf1b0f">背调拒绝</a-tag>
          <a-tag v-else-if="record.offerChoice && record.recommendStatus == '被动离职'" title="保期未过-企业放弃" color="#bf1b0f">保期未过</a-tag>
          <a-tag v-else-if="record.offerChoice && record.recommendStatus == '主动离职'" title="保期未过-人才放弃" color="#bf1b0f">保期未过</a-tag>
          <a-tag v-else-if="record.offerChoice && (record.recommendStatus == '过保' || record.recommendStatus == '保证期中' || record.recommendStatus == 'OFFER接受')" color="#00b050">{{ record.recommendStatus }}</a-tag>
          <a-tag v-else-if="record.offerChoice && record.recommendStatus == '职位关闭'" color="#00b050">{{ record.recommendStatus }}</a-tag>
          <a-tag v-else-if="record.recommendStatus == '企顾企弃'" color="#bf1b0f">企业放弃</a-tag>
          <a-tag v-else-if="record.recommendStatus == '企顾人弃'" color="#bf1b0f">人才放弃</a-tag>
          <a-tag v-else-if="record.recommendStatus == '职位关闭'" color="#bf1b0f">职位关闭</a-tag>
          <a-tag v-else-if="record.recommendStatus == '强制关闭'" color="#bf1b0f">强制关闭</a-tag>
          <a-tag v-else-if="record.interviewStatus && (record.interviewStatus.includes('已排') || record.interviewStatus.includes('协调'))" color="#F79646">{{ record.interviewStatus }}</a-tag>
          <a-tag v-else-if="record.interviewStatus && (record.interviewStatus.includes('确认') || record.interviewStatus.includes('出席') || record.interviewStatus.includes('通过'))" color="#00b050">{{ record.interviewStatus }}</a-tag>
          <a-tag v-else-if="record.interviewStatus" color="#bf1b0f">{{ record.interviewStatus }}</a-tag>
          <a-tag v-else>-</a-tag>
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
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import type { SelectProps } from 'ant-design-vue';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import {handleToResumeDetails} from '/@/router/index'
  import type { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];
  const selectTime = ref<RangeValue>();
  const cityStore = useCityStoreWithOut();
  const resumeListStore = useResumeListStoreWithOut();
  const { province } = storeToRefs(cityStore);
  const {
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
  const optionsType = ref([
    {
      value: '1',
      label: '推顾',
    },
    {
      value: '2',
      label: '企顾',
    },
  ]);
  const optionsQuit = ref([
    {
      value: '离职',
      label: '离职',
    },
    {
      value: '在职',
      label: '在职',
    },
  ]);
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
  const optionsLunZhuang = ref([
    { value: '初试', label: '初试' },
    { value: '二试', label: '二试' },
    { value: '三试', label: '三试' },
    { value: '四试', label: '四试' },
    { value: '五试', label: '五试' },
    { value: '六试', label: '六试' },
    { value: '七试', label: '七试' },
    { value: '八试', label: '八试' },
  ]);
  const optionsMianZhuang = ref([
    { value: '已排', label: '面试已排' },
    { value: '确认', label: '面试确认' },
    { value: '意向正常', label: '意向正常' },
    { value: '拒绝', label: '拒绝面试' },
    { value: '协调', label: '面试协调' },
    { value: '出席', label: '面试出席' },
    { value: '缺席', label: '面试缺席' },
    { value: '取消', label: '面试取消' },
    { value: '通过', label: '面试通过' },
    { value: '未过', label: '面试未过' },
    { value: '待定', label: '面试待定' },
  ]);
  const spanCol = 6;
  interface SearchForm {
    pageNumber: string;
    pageSize: string;
    realRecruitId: string;
    systemType: string;
    userName: string;
    brandId: string;
    positionId: string;
    city: string;
    teamId: string;
    timeType: string;
    startTime: string;
    endTime: string;
    typeNumber: string;
    lunZhuang: string;
    mianZhuang: string;
    mianDay: string;
    companyRecruitId: string;
    recruitId: string;
    searchType: string;
    searchQuit: string;
  }
  const formState = ref<SearchForm>({
    pageNumber: '1',
    pageSize: '10',
    realRecruitId: '',
    systemType: '',
    userName: '',
    brandId: '',
    positionId: '',
    city: '',
    teamId: '',
    timeType: '',
    startTime: '',
    endTime: '',
    typeNumber: '',
    lunZhuang: '',
    mianZhuang: '',
    mianDay: '',
    companyRecruitId: '',
    recruitId: '',
    searchType: '',
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
      title: '候选人',
      dataIndex: 'userName',
      ellipsis: true,
      key: 'userName',
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
      title: '品牌',
      dataIndex: 'brandName',
      key: 'brandName',
      ellipsis: true,
      width: 80,
      fixed: 'left',
    },
    {
      title: '推荐职位',
      dataIndex: 'positionName',
      ellipsis: true,
      key: 'positionName',
      width: 80,
      fixed: 'left',
    },
    {
      title: '推荐顾问',
      dataIndex: 'recommendRealNameEn',
      ellipsis: true,
      key: 'recommendRealNameEn',
      width: 70,
      fixed: 'left',
    },
    {
      title: '推顾团队',
      dataIndex: 'recommendTeamName',
      key: 'recommendTeamName',
      ellipsis: true,
      width: 60,
    },
    {
      title: '企业顾问',
      dataIndex: 'companyRealNameEn',
      key: 'companyRealNameEn',
      ellipsis: true,
      width: 70,
    },
    {
      title: '面轮',
      dataIndex: 'interviewRound',
      key: 'interviewRound',
      width: 45,
    },
    {
      title: '面试官',
      dataIndex: 'interviewerName',
      key: 'interviewerName',
      width: 108,
      ellipsis: true,
    },
    {
      title: '面试日期',
      dataIndex: 'interviewTime',
      key: 'interviewTime',
      width: 108,
      ellipsis: true,
    },
    {
      title: '面试跟进',
      dataIndex: 'firstFollowTime',
      key: 'firstFollowTime',
      width: 108,
      ellipsis: true,
    },
    {
      title: '跟进状态',
      dataIndex: 'firstFollowFlag',
      key: 'firstFollowFlag',
      width: 60,
    },
    {
      title: '出席状态',
      dataIndex: 'isAttend',
      key: 'isAttend',
      width: 60,
    },
    {
      title: '面试状态',
      dataIndex: 'recommendStatus',
      key: 'recommendStatus',
      ellipsis: true,
      width: 65,
      fixed: 'right',
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
  const interviewRoundObj = {
    "一面": "初试",
    "二面": "二试",
    "三面": "三试",
    "四面": "四试",
    "五面": "五试",
    "六面": "六试",
    "七面": "七试",
    "八面": "八试"
}
  interface FormInterview{
    index: string;
    key: string;
    userName: string;
    city: string;
    brandName: string;
    positionName: string;
    recommendRealNameEn: string;
    recommendTeamName: string;
    companyRealNameEn: string;
    interviewProcess: string;
    interviewRound: string;
    interviewerName: string;
    sureEndFlag: string;
    interviewTime: string;
    firstFollowTime: string;
    secondFollowTime: string;
    firstFollowFlag: string;
    firstFollowRemark: string;
    firstFollowTimeFlag: string;
    isAttend: string;
    attendRemark: string;
    attendEndFlag: string;
    interviewStatus: string;
    recommendStatus: string;
    offerChoice: string;
    interviewTimeFlag: string;
    phone: string;
    recommendRecruitId: string;
  }
  interface ListNumber {
    index: number;
    name: string;
    num: number;
    btnNum: number;
    classNum: string;
  }
  const listNumber = ref([{} as ListNumber]);
  const currentListNum = ref(3);
  const generaListNumber = (listNum) => {
    listNumber.value = [];
    listNumber.value.push({
      index: 0,
      btnNum: 3,
      name: '待办',
      num: listNum.daiBanNum  || 0,
      classNum: currentListNum.value == 3 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 1,
      btnNum: 1,
      name: '进程',
      num: listNum.jinChengNum  || 0,
      classNum: currentListNum.value == 1 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 2,
      btnNum: 2,
      name: '结束',
      num: (listNum.jieShuNum - 999 > 0 ? "999+" : listNum.jieShuNum),
      classNum: currentListNum.value == 2 ? 'classNumActivce classNumEnd' : 'classNum classNumEnd'
    });
  }
  const handleListNumber = (value) => {
    currentListNum.value = value;
    formState.value = {...formState.value,typeNumber: value, pageNumber: '1'};
    listNumber.value = listNumber.value.reduce((prev,curr) => {
      if (curr.btnNum === value) {
        return [...prev, {...curr,classNum: 'classNumActivce'}];
      }
      return [...prev, curr];
    },[]);
    onFinish();
  }
  const onFinish = () => {
    // 点击搜索时执行的函数
    tableLoading.value = true;
    resumeListStore.queryRecommendInterview(formState.value).then((res) => {
      if (res.code == 1) {
        tableLoading.value = false;
        let info = res.info.pager;
        let list = res.info.pager.list;
        generaListNumber(res.info);
        let tempList = [];
        let nowTime = new Date().getTime();
        list.forEach((item: any, index) => {
          let tempItem = {} as FormInterview;
          let firstime = new Date(item.firstFollowTime).getTime();
          let secondTime = new Date(item.followEndTime).getTime();
          let interviewTime = new Date(item.interviewTime).getTime();
          tempItem.index = (info.pageNumber - 1) * info.pageSize + (index + 1);
          tempItem.key = item.id;
          tempItem.userName = item.userName;
          tempItem.city = item.city;
          tempItem.brandName = item.brandName;
          tempItem.positionName = item.positionName;
          tempItem.recommendRealNameEn = item.recommendRealNameEn;
          tempItem.recommendTeamName = item.recommendTeamName;
          tempItem.companyRealNameEn = item.companyRealNameEn;
          tempItem.interviewProcess = item.interviewProcess;
          tempItem.interviewRound = (item.interviewRound ? interviewRoundObj[item.interviewRound] : "");
          tempItem.interviewerName = item.interviewerName;
          tempItem.sureEndFlag = item.sureEndFlag;
          tempItem.interviewTime = item.interviewTime ? formatToDateMinute(item.interviewTime) : '';
          if (item.interviewStatus.includes('拒绝') && !item.resultTime && !item.followTime) {
            tempItem.firstFollowTime = '';
            tempItem.secondFollowTime = '';
            tempItem.firstFollowFlag = '';
            tempItem.firstFollowRemark = '';
            tempItem.firstFollowTimeFlag = '';
            tempItem.isAttend = '';
            tempItem.attendRemark = '';
            tempItem.attendEndFlag = '';
          } else {
            tempItem.firstFollowTime = item.firstFollowTime
              ? formatToDateMinute(item.firstFollowTime)
              : '';
            tempItem.secondFollowTime = item.secondFollowTime
              ? `${formatToDateMinute(item.firstFollowTime)} ~ ${formatToDateMinute(
                  item.secondFollowTime,
                )}`
              : '';
            tempItem.firstFollowFlag = item.firstFollowFlag;
            let firstFollowRemark = '';
            if (item.followTool) {
              firstFollowRemark += '跟进工具: ' + item.followTool;
            }
            if (item.firstFollowRemark) {
              firstFollowRemark += '&#13;跟进备注: ' + item.firstFollowRemark;
            }
            tempItem.firstFollowRemark = firstFollowRemark;
            tempItem.firstFollowTimeFlag =
              item.firstFollowTime &&
              item.secondFollowTime &&
              firstime < nowTime &&
              nowTime < secondTime
                ? '1'
                : '2';
            tempItem.isAttend = item.isAttend;
            tempItem.attendRemark = item.attendRemark || '';
            tempItem.attendEndFlag = item.attendEndFlag;
          }
          tempItem.interviewStatus = item.interviewStatus;
          tempItem.recommendStatus = item.recommendStatus;
          tempItem.offerChoice = item.offerChoice;
          tempItem.interviewTimeFlag = item.interviewTime && nowTime > interviewTime ? '1' : '2';
          tempItem.phone = item.phone;
          tempItem.recommendRecruitId = item.recommendRecruitId;
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
   /**
   * 根据手机号及推荐顾问id跳转简历详情页面
   * @param phoneNum 手机
   * @param recruitId 推荐顾问id
   */
   const handleToResumeDetailsCurrent = (phoneNum,recruitId) => {
    resumeListStore.queryQueryResumeNewDetails(phoneNum,recruitId).then(res => {
        handleToResumeDetails(res.info.id,res.info.addConsultantId);
    })
  }
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
  .classNum {
    background-color: #f3f3f3;
    color: #000;
    cursor: pointer;
    transition: all 0.2s, background 0s;
    margin-inline-start: 8px;
    margin-inline-end: 0;
  }
  .classNumRed {
    background-color: red;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s, background 0s;
    margin-inline-start: 8px;
    margin-inline-end: 0;
  }
  .classNum:hover,
  .classNumRed:hover,
  .classNumActivce {
    background-color: #23c6c8;
    color: #000;
    margin-inline-start: 8px;
    margin-inline-end: 0;
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
