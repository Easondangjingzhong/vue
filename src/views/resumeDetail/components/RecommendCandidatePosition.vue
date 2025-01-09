<template>
  <a-drawer
    v-model:open="candidatePositionFlag"
    title="人才推荐"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseCandidatePosition" />
    </template>
    <div>
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="4">
            <a-form-item name="city" label="城市">
              <a-select
                v-model:value="formState.city"
                :options="optionsCity"
                optionFilterProp="label"
                :allowClear="true"
                @change="handleCityName"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="brand" label="品牌">
              <a-select
                v-model:value="formState.brand"
                :options="optionsBrand"
                optionFilterProp="label"
                :allowClear="true"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="market" label="商场">
              <a-select
                v-model:value="formState.market"
                :options="optionsMarkId"
                optionFilterProp="label"
                label-in-value
                :allowClear="true"
                @search="handleMarketName"
                :not-found-content="fetching ? undefined : null"
                showSearch
              >
                <template v-if="fetching" #notFoundContent>
                  <a-spin size="small" />
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="positionsId" label="职位">
              <a-select
                v-model:value="formState.positionsId"
                :options="optionsPositions"
                optionFilterProp="label"
                :allowClear="true"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="4">
            <a-form-item name="jobType" label="类型">
              <a-select
                v-model:value="formState.jobType"
                :allowClear="true"
                :options="optionsJobType"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-space class="resume_spance" style="display: flex">
              <a-form-item name="year" label="任务">
                <a-select
                  v-model:value="formState.year"
                  :allowClear="true"
                  :options="optionsYear"
                ></a-select>
              </a-form-item>
              <a-form-item name="month">
                <a-select
                  v-model:value="formState.month"
                  :allowClear="true"
                  :options="optionsMonth"
                ></a-select>
              </a-form-item>
              <a-form-item name="weekNum">
                <a-select
                  v-model:value="formState.weekNum"
                  :allowClear="true"
                  :options="optionsWeekNum"
                ></a-select>
              </a-form-item>
              <a-form-item name="isTask">
                <a-select
                  v-model:value="formState.isTask"
                  :allowClear="true"
                  :options="optionsTask"
                ></a-select>
              </a-form-item>
            </a-space>
          </a-col>
          <a-col :span="6">
            <a-form-item name="year" label="顾问">
              <a-select
                v-model:value="formState.companyRecruitId"
                :allowClear="true"
                showSearch
                :options="optionsCompanyRecruitId"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-button type="primary" style="margin-right: 8px" htmlType="submit">搜索</a-button>
              <a-button @click="handleClearSearch">清空</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        size="small"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button
              title="成功推荐"
              type="primary"
              disabled
              class="resume_btn_tui"
              size="small"
              v-if="record.action == 1"
            >
              已推
            </a-button>
            <a-button
              title="余职为0,请联系企顾开放职位"
              type="primary"
              disabled
              class="resume_btn_yu"
              size="small"
              v-if="record.action == 2"
            >
              推荐
            </a-button>
            <a-button
              type="primary"
              @click="handleRecommendChecked(record)"
              class="resume_btn"
              size="small"
              v-if="record.action == 3"
            >
              推荐
            </a-button>
          </template>
        </template>
      </a-table>
      <a-row :gutter="24" class="resume_row_pagination">
        <a-pagination
          size="small"
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :total="pagination.total"
          :showSizeChanger="false"
          :hideOnSinglePage="pagination.hideOnSinglePage"
          @change="handlePagination"
          :show-total="(total) => `共 ${total} 条`"
        />
      </a-row>
    </div>
    <div>
      <a-row :gutter="24">
        <a-col :span="24">
          <h4 class="resume_h4">推荐信息</h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #0505050f; margin-top: 0" />
      </a-row>
      <a-table
        :columns="columnsRecommend"
        :data-source="dataSourceRecommend"
        :pagination="false"
        size="small"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'recommendStatus'">
            <span v-if="record.recommendStatus == 'HR拒绝'">HR简拒</span>
            <span v-else-if="record.recommendStatus == 'HR通过'">HR简过</span>
            <span v-else-if="record.recommendStatus == '被动离职'" title="保期未过-人才放弃">{{
              record.recommendStatus
            }}</span>
            <span v-else-if="record.recommendStatus == '企业放弃'" title="保期未过-人才放弃">{{
              record.recommendStatus
            }}</span>
            <span v-else-if="record.recommendStatus == '个人放弃'" title="未下OFFER-个人放弃"
              >未下OFFER</span
            >
            <span v-else-if="record.recommendStatus == '人才放弃'" title="放弃入职-人才放弃"
              >放弃入职</span
            >
            <span v-else-if="record.recommendStatus == '企业放弃'" title="放弃入职-企业放弃"
              >企业放弃</span
            >
            <span v-else-if="record.recommendStatus == '面过企弃'">企业放弃</span>
            <span v-else-if="record.recommendStatus == '已OFFER背调问题'" title="背调拒绝-已OFFER"
              >背调拒绝</span
            >
            <span v-else-if="record.recommendStatus == '背调问题'" title="背调拒绝-未OFFER"
              >背调拒绝</span
            >
            <span v-else-if="record.recommendStatus == '顾问通过'">企顾通过</span>
            <span v-else-if="record.recommendStatus == '推荐顾问'">推荐人才</span>
            <span v-else-if="record.recommendStatus == '已拒绝'">
              <a-popover title="申诉拒绝">
                <template #content>
                  <p>申诉原因: {{ record.appealRemark }}</p>
                  <p>拒绝理由: {{ record.refuseReamrk }}</p>
                </template>
                申诉拒绝
              </a-popover>
            </span>
            <span v-else-if="record.recommendStatus == '未审核'">
              <a-popover title="申诉待审">
                <template #content>
                  <p>申诉原因: {{ record.appealRemark }}</p>
                </template>
                申诉待审
              </a-popover>
            </span>
            <span v-else>{{ record.recommendStatus }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <a-button
              title="撤回推荐"
              type="primary"
              class="resume_btn"
              size="small"
              v-if="record.action == 1"
            >
              撤回
            </a-button>
          </template>
        </template>
      </a-table>
    </div>
  </a-drawer>
  <RecommendCandidatePositionChecked
    :recommendPerson="recommendPerson"
    :userName="resumeDetail.resume.userName"
  />
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import RecommendCandidatePositionChecked from './RecommendCandidatePositionChecked.vue';
  import type { SelectProps } from 'ant-design-vue';
  import { formatToDateTime, dateUtil, currentDate, formatToDateMinute } from '/@/utils/dateUtil';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { debounce } from 'lodash-es';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  const resumeListStore = useResumeListStoreWithOut();
  const cityStore = useCityStoreWithOut();
  const { province } = storeToRefs(cityStore);
  const { positionsList, brandList, markIdList } = storeToRefs(resumeListStore);
  const resumeDetailStore = useResumeDetailStore();
  const {
    resumeDetail,
    candidatePositionFlag,
    currentWeekNum,
    currentWeek,
    enterpriseConsultant,
    recommendMapping,
  } = storeToRefs(resumeDetailStore);
  interface RecommendPerson {
    index: string;
    city: string;
    brand: string;
    jobTitle: string;
    workPlace: string;
    turnoverTime: string;
    counselor: string;
    jobStatus: string;
    recruitingNum: string;
    offerNum: string;
    openResumesNum: string;
    surplus: string;
    isTask: string;
    action: string;
    companyName: string;
    bId: string;
    id: string;
    mId: string;
    recruitId: string;
    positionsId: string;
  }
  const recommendPerson = ref({} as RecommendPerson);
  const handleRecommendChecked = (item) => {
    console.log(item);

    recommendPerson.value = { ...item };
    resumeDetailStore.$patch({
      recommendFlag: true,
    });
  };
  const optionsCompanyRecruitId = ref<SelectProps['options']>(
    enterpriseConsultant.value?.map((item) => ({ value: item.id, label: item.realNameEn })),
  );
  const selectWeekNum = (weekNum) => {
    let week = '';
    switch (weekNum) {
      case '1':
        week = '第一周';
        break;
      case '2':
        week = '第二周';
        break;
      case '3':
        week = '第三周';
        break;
      case '4':
        week = '第四周';
        break;
      case '5':
        week = '第五周';
        break;
      case '6':
        week = '第六周';
        break;
      default:
        week = '';
        break;
    }
    return week;
  };
  const optionsWeekNum = ref<SelectProps['options']>(
    currentWeek.value.map((item) => ({ value: item.weekNum, label: selectWeekNum(item.weekNum) })),
  );
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
  const handleCityName = debounce(() => {
    let tempOptionMarkIdUpdate = [];
    //商场数据
    resumeDetailStore
      .queryMarkList(formState.value.city, formState.value.market.label)
      .then((res) => {
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
  }, 500);
  const fetching = ref(false);
  const handleMarketName = debounce((value) => {
    let tempOptionMarkIdUpdate = [];
    fetching.value = true;
    //商场数据
    resumeDetailStore.queryMarkList(formState.value.city, value).then((res) => {
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
      fetching.value = false;
    });
  }, 500);
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
  const optionsJobType = ref<SelectProps['options']>([
    { label: '猎头', value: '猎头' },
    { label: '外包', value: '外包' },
  ]);
  const optionsTask = ref<SelectProps['options']>([
    { label: '是', value: '1' },
    { label: '否', value: '2' },
  ]);
  const nowyear = currentDate().split('-');
  const optionsYear = ref<SelectProps['options']>([]);
  const nowYear = dateUtil().year();
  for (let i = 2022; i <= nowYear; i++) {
    optionsYear.value?.push({ label: i + '年', value: i });
  }
  const optionsMonth = ref<SelectProps['options']>([]);
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      let ii = '0' + i;
      optionsMonth.value?.push({ label: i + '月', value: ii });
    } else {
      optionsMonth.value?.push({ label: i + '月', value: i });
    }
  }
  const formState = ref({
    city: '',
    brand: '',
    market: { value: '', label: '' },
    positionsId: '',
    jobType: '',
    year: nowyear[0],
    month: nowyear[1],
    weekNum: currentWeekNum,
    isTask: '',
    companyRecruitId: '',
  });
  const handleClearSearch = () => {
    formState.value = {
      ...formState.value,
      city: '',
      brand: '',
      market: { value: '', label: '' },
      positionsId: '',
      jobType: '',
      isTask: '',
      companyRecruitId: '',
    };
  };
  const loading = ref(false);
  const columns = ref([
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 30,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 30,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 80,
    },
    {
      title: '职位',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      ellipsis: true,
      width: 80,
    },
    {
      title: '商场',
      dataIndex: 'workPlace',
      key: 'workPlace',
      ellipsis: true,
      width: 60,
    },
    {
      title: '更新时间',
      dataIndex: 'turnoverTime',
      key: 'turnoverTime',
      ellipsis: true,
      width: 80,
    },
    {
      title: '企顾',
      dataIndex: 'counselor',
      key: 'counselor',
      ellipsis: true,
      width: 55,
    },
    {
      title: '职位状态',
      dataIndex: 'jobStatus',
      key: 'jobStatus',
      ellipsis: true,
      width: 40,
    },
    {
      title: '招数',
      dataIndex: 'recruitingNum',
      key: 'recruitingNum',
      ellipsis: true,
      width: 30,
    },
    {
      title: '余职',
      dataIndex: 'offerNum',
      key: 'offerNum',
      ellipsis: true,
      width: 30,
    },
    {
      title: '开放',
      dataIndex: 'openResumesNum',
      key: 'openResumesNum',
      ellipsis: true,
      width: 30,
    },
    {
      title: '差额',
      dataIndex: 'surplus',
      key: 'surplus',
      ellipsis: true,
      width: 30,
    },
    {
      title: '任务',
      dataIndex: 'isTask',
      key: 'isTask',
      ellipsis: true,
      width: 30,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 35,
    },
  ]);
  const dataSource = ref([]);
  const pagination = ref({
    pageSize: 10,
    current: 1,
    total: 0,
    hideOnSinglePage: true,
    size: 'small',
  });
  watch(candidatePositionFlag, () => {
    if (candidatePositionFlag.value) {
      handlePagination();
    }
  });
  const onFinish = () => {
    handlePagination();
  };
  const handlePagination = (page = 1, pageSize = 8) => {
    const values = { ...formState.value, page: page, market: formState.value.market.value };
    loading.value = true;
    resumeDetailStore.queryRecommendCandidatePosition(values).then((res) => {
      loading.value = false;
      if (res.code == 1) {
        const candidatePosition = res.info.list;
        const positionList = res.info.positionList;
        const positionArr = positionList?.reduce((prev, curr) => {
          curr?.forEach((item) => {
            prev.push(item.pId);
          });
          return prev;
        }, []);
        dataSource.value = candidatePosition?.reduce((prev, curr, index) => {
          let temp = {} as RecommendPerson;
          temp.index = (res.info.currentPage - 1) * pageSize + (index + 1);
          temp.city = curr.city || '-';
          temp.brand = curr.brand || '-';
          temp.jobTitle = curr.jobTitle || '-';
          temp.workPlace = curr.workPlace || '-';
          temp.turnoverTime = curr.turnoverTime ? formatToDateTime(curr.turnoverTime) : '-';
          temp.counselor = curr.counselor || '-';
          if (curr.jobStatus == '开放(急)') {
            temp.jobStatus = '开放1级';
          } else if (curr.jobStatus == '开放(急)') {
            temp.jobStatus = '开放2级';
          } else {
            temp.jobStatus = curr.jobStatus;
          }
          temp.recruitingNum = curr.recruitingNum || '0';
          temp.offerNum = (curr.recruitingNum - curr.offerNum)?.toString() || '0';
          temp.openResumesNum = curr.openResumesNum || '0';
          temp.surplus = curr.surplus || '0';
          temp.isTask = curr.isTask == 1 ? '是' : '-';
          if (positionArr.includes(curr.pId)) {
            temp.action = '1'; //已推
          } else {
            if (curr.recruitingNum - curr.offerNum <= 0) {
              temp.action = '2'; //余职为0
            } else {
              temp.action = '3'; //推荐
            }
          }
          temp.companyName = curr.companyName;
      temp.bId = curr.bId;
      temp.id = curr.id;
      temp.mId = curr.mId;
      temp.recruitId = curr.recruitId;
      temp.positionsId = curr.positionsId;
          prev.push(temp);
          return prev;
        }, []);
        pagination.value = {
          pageSize: pageSize,
          current: res.info.currentPage,
          total: res.info.count,
          hideOnSinglePage: true,
          size: 'small',
        };
      } else {
        dataSource.value = [];
      }
    });
  };
  const handleColseCandidatePosition = () => {
    resumeDetailStore.$patch({
      candidatePositionFlag: false,
    });
  };
  const drawerWidth = ref(1000);

  const columnsRecommend = ref([
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 30,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 30,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 80,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      ellipsis: true,
      width: 80,
    },
    {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
      ellipsis: true,
      width: 80,
    },
    {
      title: '更新时间',
      dataIndex: 'turnoverTime',
      key: 'turnoverTime',
      ellipsis: true,
      width: 60,
    },
    {
      title: '企顾',
      dataIndex: 'counselor',
      key: 'counselor',
      ellipsis: true,
      width: 55,
    },
    {
      title: '推荐时间',
      dataIndex: 'recommendTime',
      key: 'recommendTime',
      ellipsis: true,
      width: 60,
    },
    {
      title: '当前状态',
      dataIndex: 'recommendStatus',
      key: 'recommendStatus',
      ellipsis: true,
      width: 40,
    },
    {
      title: '任务',
      dataIndex: 'inTask',
      key: 'inTask',
      ellipsis: true,
      width: 30,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 30,
    },
  ]);
  const dataSourceRecommend = ref([
    {
      index: '',
      city: '',
      brand: '',
      position: '',
      market: '',
      turnoverTime: '',
      counselor: '',
      recommendTime: '',
      recommendStatus: '',
      inTask: '',
      action: '',
      appealRemark: '',
      refuseReamrk: '',
    },
  ]);
  watch(recommendMapping, () => {
    dataSourceRecommend.value = recommendMapping.value?.reduce((prev, curr, index) => {
      let temp = {
        index: '',
        city: '',
        brand: '',
        position: '',
        market: '',
        turnoverTime: '',
        counselor: '',
        recommendTime: '',
        recommendStatus: '',
        inTask: '',
        action: '',
        appealRemark: '',
        refuseReamrk: ''
      };
      temp.index = (index + 1).toString();
      temp.city = curr.city;
      temp.brand = curr.brand;
      temp.position = curr.position;
      temp.market = curr.market;
      temp.turnoverTime = formatToDateMinute(curr.turnoverTime);
      temp.counselor = curr.counselor;
      temp.recommendTime = formatToDateMinute(curr.recommendTime);
      temp.recommendStatus = curr.recommendStatus;
      temp.inTask = curr.inTask;
      temp.action = curr.recommendStatus == '推荐顾问' ? '1' : '2';
      temp.appealRemark = curr.appealRemark;
      temp.refuseReamrk = curr.refuseReamrk;
      prev.push(temp);
      return prev;
    }, []);
  });
</script>
<style lang="less" scoped>
  .resume_h4 {
    font-size: 16px;
    color: #333;
    margin: 5px 5px;
  }
  .resume_btn {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .resume_btn:hover {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .resume_btn_tui {
    color: #fff;
    background-color: #4caf50;
    border-color: #45a049;
  }
  .resume_btn_tui:hover {
    color: #fff;
    background-color: #4caf50;
    border-color: #45a049;
  }
  .resume_btn_yu {
    color: #fff;
    background-color: #ccc;
    border-color: #ccc;
  }
  .resume_btn_yu:hover {
    color: #fff;
    background-color: #ccc;
    border-color: #ccc;
  }
  .resume_row_pagination {
    justify-content: end;
  }
  :deep(.resume_spance) .ant-space-item {
    width: 60%;
  }
  :deep(.resume_spance .ant-space-item:first-child) {
    width: 100%;
  }
</style>
