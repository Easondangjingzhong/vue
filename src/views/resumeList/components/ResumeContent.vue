<template>
  <div class="resume-content-search">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
      <SearchContent :expand="expand" :formState="formState"/>
      <a-row>
        <a-col :span="9">
          <a-form-item name="keyWords" label="关键字">
            <a-input v-model:value="formState.keyWords" placeholder="可搜索姓名,手机,公司,邮箱，用逗号隔开" />
          </a-form-item>
        </a-col>
        <a-col :span="9">
        <a-form-item :label-col="{span: 3}" name="brandId" label="品牌">
          <a-select :max-tag-text-length="3" :max-tag-count="5" mode="multiple" v-model:value="formState.brandId" show-search :options="optionsBrand"></a-select>
        </a-form-item>
        </a-col>
        <a-col :span="5" style="margin-left: 10px;">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">清空</a-button>
          <a-button style="margin: 0 8px 0 0" @click="handleAddSearchResume">设置</a-button>
          <a @click="handleExpand">
            <template v-if="expand > 0 && expand < 4">
              <DoubleRightOutlined :rotate="90" />
              更多
            </template>
            <template v-else="expand == 0 || expand == 4">
              <DoubleLeftOutlined :rotate="90" />
              最简
            </template>
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-table size="small" :pagination="pagination" :dataSource="resumeList" :columns="columnsResumeRseult"  @change="handleResumeListData"
    />
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
      <SearchContent :expand="expandSearchResume" :formState="openFormState"/>
      <a-row>
        <a-col :span="6">
          <a-form-item name="keyWords" label="关键字">
            <a-input v-model:value="openFormState.keyWords" placeholder="可搜索姓名,手机,公司,邮箱，用逗号隔开" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
        <a-form-item :label-col="{span: 3}" name="brandId" label="品牌">
          <a-select :max-tag-text-length="3" :max-tag-count="5" mode="multiple" v-model:value="openFormState.brandId" show-search :options="optionsBrand"></a-select>
        </a-form-item>
        </a-col>
        <a-col :span="6" style="text-align: right">
          <a-form-item label="搜索名称">
            <a-input v-model:value="searchName" />
          </a-form-item>
        </a-col>
        <a-col :span="6" style="text-align: right">
          <a-button type="primary" html-type="submit">保存</a-button>
          <a-button style="margin: 0 8px" @click="clearSearchResume">清空</a-button>
        </a-col>
      </a-row>
    </a-form>
    </a-modal>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { DoubleRightOutlined,DoubleLeftOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import { SearchResumeList } from '/@/api/resumeList/model';
  import SearchContent from './resumeContent/SearchContent.vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import type { SelectProps } from 'ant-design-vue';
  const resumeListStore = useResumeListStoreWithOut();
  const {resumeList,brandList,pagination} = storeToRefs(resumeListStore);
  // 展开/收起状态
  const expand = ref(0);
  const expandArr = [1,2,3,4,0];
  const handleExpand = () => {
    expand.value = expandArr[expand.value];
  }
  const formRef = ref<FormInstance>();
  const formState = reactive({} as SearchResumeList);
  resumeListStore.queryResumeList(formState);
  const onFinish = () => {
    //console.log('Received values of form: ', values);
    console.log('formState: ', formState);
    resumeListStore.queryResumeList(formState);
  };
  const columnsResumeRseult = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '当前职位',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: '录入日期',
      dataIndex: 'registTimeStr',
      key: 'registTimeStr',
    },
    {
      title: '联络日期',
      dataIndex: 'lastUpdateTimeStr',
      key: 'lastUpdateTimeStr',
    },
    {
      title: '状态',
      dataIndex: 'projectFlag',
      key: 'projectFlag',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
    },
  ];
  const handleResumeListData = (paginationNum) => {
    pagination.value = {...paginationNum};
    console.log(pagination.value);
    onFinish();
  }
    //@ts-ignore
    resumeListStore.queryBranList(formState);
  //品牌数据展示
  let optionsBrand = ref<SelectProps['options']>([]);
    watch(brandList, () => {
    let tempOptionBrand = [];
    //@ts-ignore
    tempOptionBrand.push({ label: '', value: '' });
    brandList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        //@ts-ignore
        label: brandListShow(item.cnName,item.usName),
        //@ts-ignore
        value: item.brandId,
      };
      //@ts-ignore
      tempOptionBrand.push(tempObj);
    });
      optionsBrand.value = tempOptionBrand;
  });
  function brandListShow(cnName,usName) {
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
    openFormState.value = formState;
    openSearchResume.value = true;
  }
  const clearSearchResume = () => {
    confirmLoading.value = false;
    searchName.value = '';
    openFormState.value = {} as SearchResumeList;
  }
  const handleSearchResume = () => {
    if (!searchName.value) {
      message.error('请填写搜索名称');
      return;
    }
    resumeListStore.fetchAddSearchResume(formState,searchName.value) .then(() => {
        message.success('操作成功');
        // resumeList.fetchSortData();
        openSearchResume.value = false;
        clearSearchResume();
      })
      .catch(() => {
        openSearchResume.value = false;
        clearSearchResume();
      });
  }
 
</script>
<style lang="less">
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
</style>
