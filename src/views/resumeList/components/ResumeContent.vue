<template>
  <div class="resume-content-search">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
      <SearchContent :expand="expand" :formState="formState" ref="searchContentChild" />
      <a-row>
        <a-col :span="9" class="row_col_space_brand">
          <a-form-item :label-col="{ span: 4 }" label="关键字" class="row_col_space_left_keyWords">
            <a-select
              optionFilterProp="label"
              v-model:value="keyWordsAndFullText"
              :options="optionsKeyWords"
              @change="handleOptionsKeyWords"
              :showArrow="false"
            ></a-select>
          </a-form-item>
          <a-form-item
            v-if="keyWordsAndFullText != '1'"
            name="keyWords"
            class="row_col_space_right_brand"
          >
            <a-input
              v-model:value="formState.keyWords"
              placeholder="可搜索姓名,手机,公司,邮箱,用逗号隔开"
            />
          </a-form-item>
          <a-form-item
            v-if="keyWordsAndFullText == '1'"
            name="fullText"
            class="row_col_space_right_brand"
          >
            <a-input v-model:value="formState.fullText" placeholder="可搜索简历全文关键词" />
          </a-form-item>
        </a-col>
        <a-col :span="9" class="row_col_space_brand">
          <a-form-item name="brandRuleOut" label="品牌" class="row_col_space_left_brand">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.brandRuleOut"
              :options="optionsNCp"
              :showArrow="false"
            ></a-select>
          </a-form-item>
          <a-form-item name="brandNp" class="row_col_space_centent_brand">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.brandNp"
              :options="optionsNp"
              :showArrow="false"
            ></a-select>
          </a-form-item>
          <a-form-item name="brandId" class="row_col_space_right_brand">
            <a-select
              :max-tag-text-length="3"
              :max-tag-count="5"
              mode="multiple"
              optionFilterProp="label"
              v-model:value="formState.brandId"
              show-search
              :options="optionsBrand"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="5.4" style="margin-left: 10px">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
          <a-button title="设置一键搜索" style="margin: 0 8px 0 0" @click="handleAddSearchResume"
            >设置</a-button
          >
          <a @click="handleExpand">
            <template v-if="expand < 4">
              <DoubleRightOutlined :rotate="90" />
              更多
            </template>
            <template v-else="expand == 4">
              <DoubleLeftOutlined :rotate="90" />
              最简
            </template>
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-row style="margin-bottom: 4px; justify-content: space-between">
      <div>
        <a-button @click="handleToAddResumeDetails" style="background-color: #eee" size="small"
          >新增人才</a-button
        >
        <a-switch
          v-if="formState.leftType != '4'"
          style="margin-bottom: 3px; margin-left: 4px"
          @click="handleChangeTwoYearFlag"
          v-model:checked="isTwoYearFlag"
          checked-children="全部"
          un-checked-children="两年"
        />
        <a-switch
          v-if="formState.leftType == '4'"
          style="margin-bottom: 3px; margin-left: 4px"
          @click="handleChangeCommonOtherFlag"
          :title="isCommonOtherFlag ? '全部：可查看所在大团队开放的全部简历' : '排除：排除顾问本人简历，查看所在大团队其他开放简历'"
          v-model:checked="isCommonOtherFlag"
          checked-children="全部"
          un-checked-children="排除"
        />
      </div>
      <div>
        <a-cascader
          v-model:value="selectedRecruitIdValue"
          :options="optionsRecruitId"
          @change="handleSelectedRecruitIdValue"
          size="small"
          style="width: 100px"
        />
        <a-range-picker
          style="width: 165px;margin-left: 10px;"
          :presets="rangePresetsResume"
          @change="onRangeChangeResume"
          v-model:value="dateRange"
          size="small"
        />
      </div>

      <!-- <PicCenterOutlined v-if="searchWorkExp == '1'" style="cursor: pointer;font-size: 14px;margin-left: 5px;color: #03A9F4;"/>
      <PicRightOutlined v-if="searchWorkExp == '1'" @click="handleChangeWorkExp" style="cursor: pointer;font-size: 14px;margin-left: 5px;"/>
      <PicCenterOutlined v-if="searchWorkExp == '2'" @click="handleChangeWorkExp" style="cursor: pointer;font-size: 14px;margin-left: 5px;"/>
      <PicRightOutlined v-if="searchWorkExp == '2'" style="cursor: pointer;font-size: 14px;margin-left: 5px;color: #03A9F4;"/> -->
    </a-row>
    <a-table
      size="small"
      :dataSource="resumeList"
      :pagination="false"
      rowKey="key"
      :loading="tableLoading"
      :columns="columnsResumeRseult"
      :expandedRowKeys="expandedRowKeysArr"
      @expand="onExpand"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'userName'">
          <a
            :class="resumeDetailsArr.includes(record.key) ? 'resumeDetails' : ''"
            @click="handleToResumeDetailsCurrent(record.key, record.addConsultantId)"
          >
            {{ record.userName }}
          </a>
        </template>
        <template v-else-if="column.key === 'registTimeStr'">
          <span :title="record.registTimeStr">{{ record.registTimeDetails }}</span>
        </template>
        <template v-else-if="column.key === 'lastUpdateTimeStr'">
          <span :title="record.lastUpdateTimeStr">{{ record.lastUpdateTime }}</span>
        </template>
        <template v-else-if="column.key === 'projectFlag'">
          <a-tag
            class="tagspan"
            v-if="!record.recruitId && record.projectFlag == '待保'"
            color="red"
            >过保</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.limitRemarkDetail"
            v-if="!record.recruitId && record.projectFlag == '在保'"
            color="green"
            >{{ record.projectFlag }}</a-tag
          >
          <a-tag
            class="tagspan"
            v-if="!record.recruitId && record.projectFlag == '不保'"
            color="red"
            >过保</a-tag
          >
          <a-tag
            class="tagspan"
            v-if="!record.recruitId && record.projectFlag == '过保'"
            color="red"
            >{{ record.projectFlag }}</a-tag
          >
          <a-tag class="tagspan" v-if="!record.recruitId" color="orange">公共</a-tag>
          <a-tag
            class="tagspan"
            v-if="!record.recruitId && record.twoYearFlag == '两年'"
            color="green"
            >两年</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.checkedTime"
            v-if="record.recruitId && record.checkFlag == '待核'"
            color="#d8d8d8"
            >{{ record.checkFlag }}</a-tag
          >
          <a-tag
            class="tagspan"
            v-if="record.recruitId && record.checkFlag == '待激活' && record.resumeStatus != '外包保护期中'"
            color="#d8d8d8"
            >激活</a-tag
          >
          <!-- <a-tag class="tagspan" v-if="record.recruitId && record.checkFlag == '已激活'" color="green">激活</a-tag> -->
          <a-tag
            class="tagspan"
            :title="record.newTime"
            v-if="
              record.recruitId &&
              record.checkFlag &&
              record.checkFlag != '待核' &&
              record.checkFlag != '待激活' &&
              record.checkFlag != '已激活'
            "
            color="green"
            >{{ record.checkFlag }}</a-tag
          >

          <a-tag
            class="tagspan"
            :title="record.repeatTime"
            v-if="record.recruitId && record.checkFlag == '待核' && record.fristFlag"
            color="#d8d8d8"
            >{{ record.fristFlag }}</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.repeatTime"
            v-if="record.recruitId && record.checkFlag != '待核' && record.fristFlag"
            color="green"
            >{{ record.fristFlag }}</a-tag
          >

          <a-tag class="tagspan" v-if="record.recruitId && record.onlyFlag" color="green">{{
            record.onlyFlag
          }}</a-tag>

          <a-tag
            class="tagspan"
            :title="record.commonFlagTime"
            v-if="record.recruitId && record.commonFlag"
            color="green"
            >{{ record.commonFlag }}</a-tag
          >
          <a-tag class="tagspan" v-if="record.recruitId && record.gognGongFlag" color="orange">{{
            record.gognGongFlag
          }}</a-tag>

          <!-- <a-tag class="tagspan" v-if="record.recruitId && record.limitFlag == '保护'" color="green">{{ record.limitFlag }}</a-tag> -->
          <a-tag
            class="tagspan"
            :title="record.limitRemarkDetail"
            v-if="(record.limitFlag == '限制禁推' || record.limitFlag == '限制分单') && record.resumeStatus != '外包保护期中'"
            color="orange"
            >限制</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.limitRemarkDetail"
            v-if="record.limitFlag == '限制' && record.resumeStatus != '外包保护期中'"
            color="orange"
            >限制</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.limitRemarkDetail"
            v-if="record.limitFlag == '激活' && record.resumeStatus != '外包保护期中'"
            color="orange"
            >激活</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.offerTime"
            v-if="record.limitFlag == 'OFFER' && record.resumeStatus != '保证期中'"
            color="orange"
            >OFFER</a-tag
          >
          <a-tag
            class="tagspan"
            :title="record.entryTime"
            v-if="record.limitFlag == 'OFFER' && record.resumeStatus == '保证期中'"
            color="orange"
            >保证期</a-tag
          >
          <a-tag
            class="tagspan"
            title="外包保护期中"
            v-if="record.resumeStatus == '外包保护期中'"
            color="orange"
            >保证期</a-tag
          >
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <p style="margin: 0; margin-bottom: 4px; margin-left: 15.3%" v-for="item in record.works">
          <span v-if="item.endYear == '-1'" style="margin-right: 5.1%">
            {{ item.startYear }}.<span v-if="item.startMonth < 10">0{{ +item.startMonth }}</span
            ><span v-if="item.startMonth > 9">{{ item.startMonth }}</span> - 至今
          </span>
          <span v-if="item.endYear != '-1'" style="margin-right: 3.2%">
            {{ item.startYear }}.<span v-if="item.startMonth < 10">0{{ +item.startMonth }}</span
            ><span v-if="item.startMonth > 9">{{ item.startMonth }}</span> -
            {{ item.endYear }}.<span v-if="item.endMonth < 10">0{{ +item.endMonth }}</span
            ><span v-if="item.endMonth > 9">{{ item.endMonth }}</span>
          </span>
          {{ item.companyName }}<span v-if="item.cityName">-{{ item.cityName }}</span>
          <span v-if="item.marketName">-{{ item.marketName }}</span>
          <span v-if="item.brandName">-{{ item.brandName }}</span>
          <span v-if="item.positionName">-{{ item.positionName }}</span>
        </p>
      </template>
      <template #expandColumnTitle>
        <PlusSquareOutlined
          style="font-size: 14px"
          v-if="!expandedRowKeysFlag"
          @click="handleExpandedRowKeys"
        />
        <MinusSquareOutlined
          style="font-size: 14px"
          v-if="expandedRowKeysFlag"
          @click="handleExpandedRowKeys"
        />
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
  <template>
    <a-modal
      v-model:open="openSearchResume"
      title="一键搜索"
      :confirm-loading="confirmLoading"
      @ok="handleSearchResume"
      @cancel="clearSearchResume"
      :footer="null"
      :width="1200"
    >
      <a-form ref="formOpenSearchResumeRef" :model="openFormState" @finish="handleSearchResume">
        <a-divider style="background-color: #ccc" />
        <SearchContent :expand="expandSearchResume" :formState="openFormState" />
        <a-divider style="background-color: #ccc; margin-top: 0" />
        <a-row>
          <a-col :span="12">
            <a-form-item
              style="width: 98%"
              :label-col="{ offset: 0.2 }"
              :wrapper-col="{ span: 22 }"
              label="搜索名称"
            >
              <a-input
                v-model:value="searchName"
                placeholder="请输入此快捷搜索名称，最多支持6个汉字"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-button style="margin: 0 0 0 12px" type="primary" html-type="submit">保存</a-button>
            <a-button style="margin: 0 8px" @click="clearSearchResume">清空</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </template>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    DoubleRightOutlined,
    DoubleLeftOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined,
  } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { storeToRefs } from 'pinia';
  import dayjs, { Dayjs } from 'dayjs';
  import { message } from 'ant-design-vue';
  import { SearchResumeList } from '/@/api/resumeList/model';
  import SearchContent from './resumeContent/SearchContent.vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import type { SelectProps } from 'ant-design-vue';
  import { handleToResumeDetails, handleToAddResumeDetails } from '/@/router/index';
  type RangeValue = [Dayjs, Dayjs];
  const resumeListStore = useResumeListStoreWithOut();
  const {
    expandedRowKeys,
    isCommonOtherStatus,
    isTwoYearFlagStatus,
    searchWorkExp,
    resumeList,
    brandList,
    pagination,
    formState,
    serchResumeListNum,
    serchResumeUpdate,
    serchResumeUpdateData,
    tableLoading,
    teamPersonChangeArr,
  } = storeToRefs(resumeListStore);
  const optionsNp = ref([
    { value: '1', label: '当前' },
    { value: '2', label: '所有' },
    { value: '3', label: '过往' },
  ]);
  const optionsNCp = ref([
    { value: '1', label: '包含' },
    { value: '2', label: '排除' },
  ]);
  const optionsKeyWords = ref([
    { value: '关键字', label: '关键字' },
    { value: '1', label: '全文' },
  ]);
  const keyWordsAndFullText = ref('关键字');
  const handleOptionsKeyWords = (values) => {
    if (values === '关键字') {
      if (formState.value.fullText) {
        formState.value.keyWords = formState.value.fullText;
        formState.value.fullText = '';
      }
    } else {
      if (formState.value.keyWords) {
        formState.value.fullText = formState.value.keyWords;
        formState.value.keyWords = '';
      }
    }
  }
  // 展开/收起状态
  const expand = ref(1);
  const expandArr = [4, 4, 4, 4, 0];
  const handleExpand = () => {
    expand.value = expandArr[expand.value];
  };
  const formRef = ref<FormInstance>();
  //@ts-ignore
  //resumeListStore.queryResumeList(formState.value);
  const searchContentChild = ref(null);
  const dateRange = ref([]);
  const selectedRecruitIdValue = ref([]);
  const clearFromState = () => {
    dateRange.value = [];
    selectedRecruitIdValue.value = [];
    //@ts-ignore
    searchContentChild?.value?.clearSelectOptions();
    formState.value = {
      ...({} as SearchResumeList),
      sortId: formState.value.sortId,
      leftType: formState.value.leftType,
      leftRecruitId: formState.value.leftRecruitId,
      viewType: formState.value.viewType,
      leftTeamId: formState.value.leftTeamId,
      companyNameRuleOut: '1',
      brandRuleOut: '1',
      companyNameNp: '1',
      brandNp: '1',
      marketNp: '1',
      positionNp: '1',
      isTwoYear: '',
      notSelf: '',
    };
  };
  const isTwoYearFlag = ref<boolean>(true);
  watch(
    () => isTwoYearFlagStatus.value,
    () => {
      if (!isTwoYearFlagStatus.value) {
        isTwoYearFlag.value = true;
      }
    },
  );

  const handleChangeTwoYearFlag = () => {
    if (isTwoYearFlag.value) {
      formState.value = { ...formState.value, isTwoYear: '' };
    } else {
      formState.value = { ...formState.value, isTwoYear: '1' };
    }
    onFinish(2);
  };
  const isCommonOtherFlag = ref<boolean>(true);
  watch(
    () => isCommonOtherStatus.value,
    () => {
      if (!isCommonOtherStatus.value) {
        isCommonOtherStatus.value = true;
      }
    },
  );

  const handleChangeCommonOtherFlag = () => {
    if (isCommonOtherFlag.value) {
      formState.value = { ...formState.value, notSelf: '' };
    } else {
      formState.value = { ...formState.value, notSelf: '1' };
    }
    onFinish(2);
  };
  const resumeDetailsArr = ref<String[]>([]);
  const handleToResumeDetailsCurrent = (resumeId, addConsultantId) => {
    resumeDetailsArr.value.push(resumeId);
    handleToResumeDetails(resumeId, addConsultantId);
  };
  const onFinish = (e) => {
    resumeDetailsArr.value = [];
    if (e !== 1) {
      pagination.value = { ...pagination.value, current: 1 };
    } else {
      formState.value.totalCount = pagination.value.total;
    }
    //@ts-ignore
    resumeListStore.queryResumeList(formState.value);
  };
  const columnsResumeRseult = [
    {
      title: '完整度',
      dataIndex: 'resumeProgress',
      key: 'resumeProgress',
      ellipsis: true,
      width: 45,
    },
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 50,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      ellipsis: true,
      key: 'userName',
      width: 75,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      ellipsis: true,
      width: 40,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true,
      width: 40,
    },
    {
      title: '城市',
      dataIndex: 'currentCity',
      key: 'currentCity',
      ellipsis: true,
      width: 70,
    },
    {
      title: '当前职位',
      dataIndex: 'positionName',
      key: 'positionName',
      ellipsis: true,
      width: 135,
    },
    {
      title: '顾问',
      dataIndex: 'customerServiceName',
      key: 'customerServiceName',
      ellipsis: true,
      width: 70,
    },
    {
      title: '录入日期',
      dataIndex: 'registTimeStr',
      key: 'registTimeStr',
      ellipsis: true,
      width: 75,
    },
    {
      title: '联络日期',
      dataIndex: 'lastUpdateTimeStr',
      key: 'lastUpdateTimeStr',
      ellipsis: true,
      width: 75,
    },
    {
      title: '标签',
      dataIndex: 'projectFlag',
      key: 'projectFlag',
      ellipsis: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      ellipsis: true,
      width: 35,
    },
  ];
  //const expandedRowKeys = ref(['']);
  const expandedRowKeysFlag = ref(false);
  const expandedRowKeysArr = ref<string[]>([]);

  watch(
    () => expandedRowKeys.value,
    () => {
      if (expandedRowKeysFlag.value) {
        expandedRowKeysArr.value = expandedRowKeys.value;
      }
    },
  );
  const handleExpandedRowKeys = () => {
    expandedRowKeysFlag.value = !expandedRowKeysFlag.value;
    if (expandedRowKeysFlag.value) {
      expandedRowKeysArr.value = expandedRowKeys.value;
    } else {
      expandedRowKeysArr.value = [];
    }
  };
  const onExpand = (expanded, record) => {
    if (expanded) {
      expandedRowKeysArr.value = [...expandedRowKeysArr.value, record.key]; // 确保这里的 key 是唯一的
    } else {
      expandedRowKeysArr.value = expandedRowKeysArr.value.filter((item) => item != record.key);
    }
  };
  const handleResumeListData = (current) => {
    pagination.value = { ...pagination.value, current };
    onFinish(1);
    
  };
  //@ts-ignore
  resumeListStore.queryBranList(formState.value);
  //品牌数据展示
  let optionsBrand = ref<SelectProps['options']>([]);
  watch(brandList, () => {
    let tempOptionBrand = [];
    brandList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        //@ts-ignore
        label: `${brandListShow(item.cnName, item.usName)}(${item.category})`,
        //@ts-ignore
        value: item.brandId,
      };
      //@ts-ignore
      tempOptionBrand.push(tempObj);
    });
    optionsBrand.value = tempOptionBrand;
  });
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
  const formOpenSearchResumeRef = ref<FormInstance>();
  const expandSearchResume = ref(4);
  const confirmLoading = ref<boolean>(false);
  const openSearchResume = ref<boolean>(false);
  const searchName = ref<string>('');
  let openFormState = ref({} as SearchResumeList);
  const handleAddSearchResume = () => {
    if (serchResumeListNum.value >= 5) {
      message.error('最多只能添加5个一键搜索');
      return;
    }
    //@ts-ignore
    openFormState.value = formState.value;
    openSearchResume.value = true;
  };
  const clearSearchResume = () => {
    confirmLoading.value = false;
    searchName.value = '';
    openFormState.value = { ...({} as SearchResumeList) };
    resumeListStore.$patch({
      serchResumeUpdate: false,
      serchResumeUpdateData: {},
    });
  };
  const handleSearchResume = () => {
    if (!searchName.value) {
      message.error('请填写搜索名称');
      return;
    }
    if (searchName.value.length > 6) {
      message.error('最多支持6个汉字或字符');
      return;
    }
    resumeListStore
      .fetchAddSearchResume(openFormState.value, searchName.value)
      .then(() => {
        message.success('操作成功');
        // resumeList.fetchSortData();
        openSearchResume.value = false;
        clearSearchResume();
      })
      .catch(() => {
        openSearchResume.value = false;
        clearSearchResume();
      });
  };
  //修改一键搜搜开始
  watch(serchResumeUpdateData, () => {
    if (serchResumeUpdate) {
      openSearchResume.value = serchResumeUpdate.value;
      setTimeout(() => {
        //@ts-ignore
        openFormState.value = serchResumeUpdateData.value;
        searchName.value = serchResumeUpdateData.value.serchName;
      }, 1000);
    }
  });
  const handleChangeWorkExp = () => {
    resumeListStore.$patch({
      searchWorkExp: searchWorkExp.value == '1' ? '2' : '1',
    });
    onFinish(2);
  };

  const onRangeChangeResume = (dates: RangeValue, dateStrings: string[]) => {
    if (dates) {
      formState.value.startTime = dateStrings[0];
      formState.value.endTime = dateStrings[1];
      onFinish(2);
    } else {
      formState.value.startTime = '';
      formState.value.endTime = '';
    }
  };
  const rangePresetsResume = ref([
    { label: '昨天', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: '今天', value: [dayjs(), dayjs()] },
    { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
    {
      label: '上周',
      value: [
        dayjs().subtract(1, 'week').startOf('week'),
        dayjs().subtract(1, 'week').endOf('week'),
      ],
    },
    { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    {
      label: '上月',
      value: [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month'),
      ],
    },
  ]);
  const optionsRecruitId = ref([]);
  watch(teamPersonChangeArr,() => {
    if (teamPersonChangeArr.value && teamPersonChangeArr.value.length > 0 ) {
//@ts-ignore
optionsRecruitId.value = teamPersonChangeArr.value.map(item => ({value: item.teamId,label: item.teamName,children: item.recruitList.map(subItem => ({value: subItem.recruitId,label: subItem.realNameEn}))}));
    }
});
  // const formatDisplayRecruitId = (labels) => {
  //   console.log(labels)
  //   return labels[labels.length - 1];
  // }
  const handleSelectedRecruitIdValue = (value) => {
    if (value && value.length > 0) {
      formState.value.serchRecruitId = value[value.length - 1]; // 仅保留末级值
      optionsRecruitId.value.forEach(item => {
        if (item.value === value[0]) {
          selectedRecruitIdValue.value = [item.children.find(subItem => subItem.value === value[value.length - 1])?.label];
        }
      })
      onFinish(2);
    } else {
      formState.value.serchRecruitId = '';
      selectedRecruitIdValue.value = [];
    }
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
  .tagspan {
    margin-inline-end: 4px;
    border-radius: 8px;
  }
  :deep(.row_col_space_brand) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 6px;
  }
  :deep(.row_col_space_right_brand) {
    width: 80%;
  }
  :deep(.row_col_space_right_brand .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  :deep(.row_col_space_right_brand .ant-input) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  :deep(.row_col_space_left_keyWords) {
    width: 30%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_left_keyWords label) {
    margin-left: 5px;
  }
  :deep(.row_col_space_left_keyWords .ant-form-item-row .ant-form-item-label) {
    display: contents;
  }
  :deep(.row_col_space_left_keyWords .ant-select-selector) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    height: auto;
  }
  :deep(.row_col_space_left_brand) {
    width: 24%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_left_brand .ant-form-item-row .ant-form-item-label) {
    display: contents;
  }
  :deep(.row_col_space_left_brand .ant-select-selector) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    height: auto;
  }
  :deep(.row_col_space_centent_brand) {
    width: 14%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_centent_brand .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    height: auto;
  }
  .resumeDetails {
    color: #333;
  }
</style>
