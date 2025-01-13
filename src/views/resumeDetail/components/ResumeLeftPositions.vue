<template>
  <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4"> 职位意向 </h4>
        <PlusOutlined v-if="!expend" @click="handlePositons" />
        <CloseOutlined v-if="expend" @click="handlePositons" />
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0; margin-bottom: 5px" />
    </a-row>
    <div v-if="expend">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-select
                class="row_table_select"
                v-model:value="searchPositons.city"
                :options="optionsCity"
                optionFilterProp="label"
                :allowClear="true"
                @change="handleSearchCityAndBrandName"
                showSearch
              ></a-select>
        </a-col>
        <a-col :span="12">
          <a-select
          class="row_table_select"
                v-model:value="searchPositons.brand"
                :options="optionsBrand"
                optionFilterProp="label"
                :allowClear="true"
                @change="handleSearchCityAndBrandName"
                showSearch
              ></a-select>
        </a-col>
      </a-row>
      <a-table
        class="row_table"
        :pagination="false"
        size="small"
        :loading="loading"
        :dataSource="dataPositonsAdd"
        rowKey="key"
        :row-selection="rowSelection"
        :columns="columnsPositonsAdd"
        :locale="{ emptyText: '暂无' }"
      >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-select
          class="row_table_select"
          :disabled="record.checked == '1'"
          v-model:value="record.intention"
          :options="record.selectOptions"
          :allowClear="true"
          optionFilterProp="label"
          label-in-value
          ></a-select>
        </template>
      </template>
    </a-table>
    <a-row :gutter="24" class="resume_row_pagination">
        <a-pagination
          size="small"
          :current="dataPagination.current"
          :pageSize="dataPagination.pageSize"
          :total="dataPagination.total"
          :showSizeChanger="false"
          :hideOnSinglePage="dataPagination.hideOnSinglePage"
          @change="handlePagination"
          :show-total="(total) => `共 ${total} 条`"
        />
        <a-button type="primary" :loading="loadingBtn" @click="handleSaveIntention" size="small">保存</a-button>
      </a-row>
    </div>
    <a-table
      class="row_table"
      :pagination="pagination"
      size="small"
      :dataSource="resumeList"
      rowKey="key"
      :columns="columns"
      @change="handleResumeList"
      :locale="{ emptyText: '暂无职位意向' }"
    ></a-table>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
  import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import type { TableProps } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeIntention } = storeToRefs(resumeDetailStore);
  const resumeListStore = useResumeListStoreWithOut();
  const cityStore = useCityStoreWithOut();
  const { province } = storeToRefs(cityStore);
  const { brandList } = storeToRefs(resumeListStore);
  const dataPagination = ref({
    pageSize: 10,
    current: 1,
    total: 0,
    hideOnSinglePage: true,
    size: 'small',
  });
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      with: 20,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      with: 20,
    },
    {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
      ellipsis: true,
      with: 30,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      with: 30,
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      ellipsis: true,
      with: 40,
    },
    {
      title: '意向',
      dataIndex: 'intention',
      key: 'intention',
      ellipsis: true,
      with: 40,
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      ellipsis: true,
      with: 60, 
    },
  ];
  const resumeList = ref([
  {
    index: '',
  city: '',
  market: '',
  brand: '',
  positions: '',
  intention: '',
  date: '',
  }
  ]);
  const pagination = ref({
    pageSize: 10,
    current: 1,
    total: 0,
    hideOnSinglePage: true,
    size: 'small',
  });
  watch(resumeIntention, () => {
    resumeList.value = resumeIntention.value.list.map((item,index) => ({
      index: ((resumeIntention.value.pageNumber - 1) * resumeIntention.value.pageSize + (index + 1)),
      city: item.city,
      market: item.marketName,
      brand: item.brand,
      positions: item.positionName || "",
      intention: item.intention,
      date: item.contactDateStr,
    }))
    pagination.value = {
      pageSize: resumeIntention.value.pageSize,
      current: resumeIntention.value.pageNumber,
      total: resumeIntention.value.totalCount,
      hideOnSinglePage: true,
      size: 'small',
    };
  })
 
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
  const handleResumeList = (current) => {
    resumeDetailStore.queryCandidatePositionIntention(current.current);
  }
  //添加职位意向开始
  const expend = ref(false);
  const handlePositons = () => {
    expend.value = !expend.value;
    if (expend.value) {
      handlePagination();
    }
  }
  const columnsPositonsAdd = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 20,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 20,
    },
    {
      title: '商场',
      dataIndex: 'workPlace',
      key: 'workPlace',
      ellipsis: true,
      width: 40,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 40,
    },
    {
      title: '职位',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      ellipsis: true,
      width: 40,
    },
    {
      title: '意向',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 50,
    },
  ];
  const dataPositonsAdd = ref([]);
  const loading = ref(false);
  const loadingBtn = ref(false);
  const searchPositons = reactive({
    brand: '',
    positionsId: '',
    market: '',
    city: '',
  });
  interface SelectOptions {
    label:string,
    value: string
  }
  interface RecommendPerson {
    key: string;
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
    intention: SelectOptions;
    checked: string; //默认1 不可用 2 可用
    selectOptions: SelectOptions[];
  }
  const handleSearchCityAndBrandName = () => {
    handlePagination();
  }
  const optionsIntention = [ '明确考虑','需要打听','拒绝考虑'];
  const handlePagination = (page = 1, pageSize = 8) => {
    const values = {
      page: page,
      brand: searchPositons.brand,
      positionsId: searchPositons.positionsId,
      market: searchPositons.market,
      city: searchPositons.city,
    };
    loading.value = true;
    selectedRowsTemp.value = [];
    resumeDetailStore.queryRecommendCandidatePosition(values).then((res) => {
      loading.value = false;
      if (res.code == 1) {
        const candidatePosition = res.info.list;
        dataPositonsAdd.value = candidatePosition?.reduce((prev, curr, index) => {
          let temp = {} as RecommendPerson;
          temp.index = (res.info.currentPage - 1) * pageSize + (index + 1);
          temp.city = curr.city || '-';
          temp.brand = curr.brand || '-';
          temp.jobTitle = curr.jobTitle || '-';
          temp.workPlace = curr.workPlace || '-';
          temp.counselor = curr.counselor || '-';
          temp.companyName = curr.companyName;
          temp.bId = curr.bId;
          temp.id = curr.id;
          temp.key = curr.id;
          temp.mId = curr.mId;
          temp.recruitId = curr.recruitId;
          temp.positionsId = curr.positionsId;
          temp.intention = {value:'',label: ''};
          temp.checked = "1";
          temp.selectOptions = optionsIntention.map(item => ({value: `${curr.id}-${item}`,label: item}));
          prev.push(temp);
          return prev;
        }, []);
        dataPagination.value = {
          pageSize: pageSize,
          current: res.info.currentPage,
          total: res.info.count,
          hideOnSinglePage: true,
          size: 'small',
        };
      } else {
        dataPositonsAdd.value = [];
      }
    });
  }
const selectedRowsTemp = ref<RecommendPerson[]>([]);
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: RecommendPerson[]) => {
    selectedRowsTemp.value = selectedRows;
    dataPositonsAdd.value = dataPositonsAdd.value.reduce((prev,curr) => {
      curr.checked = selectedRowKeys.includes(curr.id)? '2' : '1';
      prev.push(curr);
      return prev;
    },[]);
  },
}
const handleSaveIntention = () => {
  if(selectedRowsTemp.value.length === 0){
    message.warning('请先选择需要添加的职位意向');
    return;
  }
  let temp = 0;
  selectedRowsTemp.value.forEach(item => {
    if(!item.intention.label){
      temp++;
    }
  });
  if (temp > 0) {
    message.warning('请先选择意向');
    return;
  }
  loadingBtn.value = true;
  const Intention = selectedRowsTemp.value.reduce((prev,curr) => {
    prev.push({...curr,intention: curr.intention.label})
    return prev;
  }, []);
  resumeDetailStore.addCandidatePositionIntention(Intention).then((res) => {
    if(res.code === 1){
      message.success('添加成功');
      handlePositons();
    }else{
      message.error('添加失败');
    }
    loadingBtn.value = false;
  });
}
  //添加职位意向结束
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 10px 20px;
  }
  .resume_detail_title {
    display: flex;
    justify-content: space-between;
  }
  .resume_h4 {
    margin: 5px 0;
    font-size: 16px;
  }
  .resume_span {
    margin-right: 40px;
    font-size: 14px;
    font-weight: 400;
  }
  :deep(.row_table) th,
  :deep(.row_table) td {
    padding: 3px !important;
  }
  :deep(.row_table_select) {
    width: 100%;
  }
  .resume_row_pagination {
    justify-content: space-between;
    line-height: 1.5;
    height: 50px;
    align-items: center;
    margin: 0 !important;
  }
</style>
