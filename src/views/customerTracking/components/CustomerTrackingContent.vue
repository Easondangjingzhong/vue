<template>
  <div class="resume-content-search">
     <a-form :model="formState" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.companyName"
              :showArrow="false"
              :options="companyListOptions"
              allowClear
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="type" label="类型">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.type"
              :options="typeOptions"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="flag" label="状态">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.flag"
              :options="flagOptions"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="4">
          <a-form-item name="cooperateStatus" label="合作">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.cooperateStatus"
              :options="cooperateStatusOptions"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col> -->
         <a-col :span="6">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume-content">
    <a-row>
  <a-table
      size="small"
      :dataSource="getCustomerTrackList"
      :pagination="false"
      rowKey="key"
      :loading="customerTrackIsLoading"
      :columns="columnsRseult"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'companyNameAll'">
           <span style="cursor: pointer;" @click="handleCompanyNameAll(record as CustomerTrackItem)">
            {{ record.companyNameAll }}
           </span>
        </template>
        <template v-if="column.key === 'brand'">
           <a-tooltip :title="record.brandName" color="cyan">
                <a-tag class="tag" color="cyan">查看</a-tag>
            </a-tooltip>
        </template>
         <template v-if="column.key === 'category'">
           <a-tooltip color="pink" :overlay-style="{ maxWidth: '250px', width: '100%' }"><!-- 修改宽度样式 -->
    <template #title>
      <div v-for="item in record.category" :key="item" style="display: flex; justify-content: space-between; width: 100%;">
        <!-- 拆分品牌名称和类型 -->
        <span>{{ item.split('=')[0] }}</span>
        <span>{{ item.split('=')[1] }}</span>
      </div>
    </template>
    <a-tag class="tag" color="pink">查看</a-tag>
            </a-tooltip>
        </template>
        <template v-if="column.key === 'hrInfo'">
          <a-tag class="tag" @click="handleHrInfo(record as CustomerTrackItem)">查看</a-tag>
        </template>
         <template v-if="column.key === 'contact'">
          <a-tag class="tag" @click="handleCustomerTrackContact(record as CustomerTrackItem)">查看</a-tag>
        </template>
        <template v-if="column.key === 'type'">
          <a-tag class="tag" v-if="record.type" color="green">{{record.type}}</a-tag>
        </template>
        <template v-if="column.key === 'flag'">
          <a-tag class="tag" v-if="record.flag == '已合作'" color="green">{{record.flag}}</a-tag>
          <a-tag class="tag" v-if="record.flag == '深入中'" color="orange">{{record.flag}}</a-tag>
          <a-tag class="tag" v-if="record.flag == '接洽中'" color="orange">{{record.flag}}</a-tag>
          <a-tag class="tag" v-if="record.flag == '未开展'" color="red">{{record.flag}}</a-tag>
        </template>

        <template v-if="column.key === 'customerService'">
          <template v-if="record.lieList && record.waiList">
             <a-tooltip :title="`${record.lieList || ''}\n${record.waiList || ''}`" color="cyan" :overlay-style="{ whiteSpace: 'pre-line', maxWidth: '300px' }">
                <a-tag color="cyan" class="tag">查看</a-tag>
            </a-tooltip>
          </template>
          <template v-else-if="record.lieList">
             <a-tooltip :title="record.lieList" color="cyan">
                <a-tag color="cyan" class="tag">查看</a-tag>
            </a-tooltip>
          </template>
          <template v-else-if="record.waiList">
             <a-tooltip :title="record.waiList" color="cyan">
                <a-tag color="cyan" class="tag">查看</a-tag>
            </a-tooltip>
          </template>
        </template>
        <template v-if="column.key === 'cooperation'">
          <template v-if="record.cooperationLie">
            <a-tag class="tag" v-if="record.cooperationLie == '猎头合作'" color="green">{{record.cooperationLie}}</a-tag>
            <a-tag class="tag" v-if="record.cooperationLie == '猎头未合'" color="orange">{{record.cooperationLie}}</a-tag>
            <a-tag class="tag" v-if="record.cooperationLie == '猎头过期'" color="red">{{record.cooperationLie}}</a-tag>
          </template>
          <template v-if="record.cooperationWai">
            <a-tag class="tag" v-if="record.cooperationWai == '外包合作'" color="green">{{record.cooperationWai}}</a-tag>
            <a-tag class="tag" v-if="record.cooperationWai == '外包未合'" color="orange">{{record.cooperationWai}}</a-tag>
            <a-tag class="tag" v-if="record.cooperationWai == '外包过期'" color="red">{{record.cooperationWai}}</a-tag>
          </template>
        </template>
        <template v-if="column.key === 'action'"">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                 <a href="javascript:;" @click="handleUpdateCustomerTrackType(record as CustomerTrackItem)">类型</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;" @click="handleUpdateCustomerTrackFlag(record as CustomerTrackItem)">状态</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;" @click="handleUpdateCustomerTrackBdAdvisor(record as CustomerTrackItem)">BD顾问</a> 
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>
    </a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pageCustomerTrackList.pageNumber"
        :pageSize="pageCustomerTrackList.pageSize"
        @change="handleCustomerTrackListData"
        :total="pageCustomerTrackList.total"
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
    <a-modal
      title="更新类型"
      :open="visibleUpdateCustomerTrackType"
      @cancel="handleCancelUpdateCustomerTrackType"
      @ok="handleOkUpdateCustomerTrackType"
    >
      <a-form :label-col="{span: 4}" :model="updateCustomerTrackTypeForm" @finish="handleOkUpdateCustomerTrackType">
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="公司">
              {{ updateCustomerTrackTypeForm.companyNameAll}}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="类型">
              <a-select
                :showSearch="true"
                v-model:value="updateCustomerTrackTypeForm.type"
                :options="typeOptionsArr"
                optionFilterProp="label"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal
      title="更新状态"
      :open="visibleUpdateCustomerTrackFlag"
      @cancel="handleCancelUpdateCustomerTrackFlag"
      @ok="handleOkUpdateCustomerTrackFlag"
    >
      <a-form :label-col="{span: 4}" :model="updateCustomerTrackFlagForm" @finish="handleOkUpdateCustomerTrackFlag">
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="公司">
              {{ updateCustomerTrackFlagForm.companyNameAll}}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="状态">
              <a-select
                :showSearch="true"
                v-model:value="updateCustomerTrackFlagForm.flag"
                :options="flagOptionsArr"
                optionFilterProp="label"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal
      title="更新BD顾问"
      :open="visibleUpdateCustomerTrackBdAdvisor"
      @cancel="handleCancelUpdateCustomerTrackBdAdvisor"
      @ok="handleOkUpdateCustomerTrackBdAdvisor"
    >
      <a-form :label-col="{span: 4}" :model="updateCustomerTrackBdAdvisorForm" @finish="handleOkUpdateCustomerTrackBdAdvisor">
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="公司">
              {{ updateCustomerTrackBdAdvisorForm.companyNameAll}}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="BD顾问">
              <a-cascader
                :showSearch="true"
                v-model:value="updateCustomerTrackBdAdvisorForm.bdAdvisor"
                :options="getCustomerTrackBdAdvisorArr"
                optionFilterProp="label"
              ></a-cascader>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
     <a-drawer
    v-model:open="customerTrackingHRFlag"
    title="联络记录"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
  <template #extra>
      <CloseOutlined @click="customerTrackingHRFlag = false" />
    </template>
  <AddCustomerTrackingHRContract />
  </a-drawer>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { MenuUnfoldOutlined,CloseOutlined } from '@ant-design/icons-vue';
  import { CustomerTrackItem } from '/@/api/customerTracking/model';
  import { flagOptionsArr,typeOptionsArr } from '/@/api/customerTracking/constants';
  import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
  import AddCustomerTrackingHRContract from './AddCustomerTrackingHRContract.vue';
  import { message } from 'ant-design-vue';
  const drawerWidth = ref(Math.max(1000, window.innerWidth * 0.8));
  const customerTrackingStore = useCustomerTrackingStoreWithOut();
  const { customerTrackInfoFlag,customerTrackContractPage,formState,getCustomerTrackList, customerTrackIsLoading, pageCustomerTrackList,getCompanyList,getCustomerTrackBdAdvisorArr } = storeToRefs(customerTrackingStore);
  const columnsRseult = ref([
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 25,
    },
    {
      title: '公司名称',
      dataIndex: 'companyNameAll',
      key: 'companyNameAll',
      ellipsis: true,
      width: 120,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 25,
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      width: 25,
    },
    {
      title: 'HR信息',
      dataIndex: 'hrInfo',
      key: 'hrInfo',
      ellipsis: true,
      width: 35,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 25,
    },
    {
      title: '状态',
      dataIndex: 'flag',
      key: 'flag',
      width: 30,
    },
    {
      title: '合作',
      dataIndex: 'cooperation',
      key: 'cooperation',
      width: 80,
    },
    {
      title: '企顾',
      dataIndex: 'customerService',
      key: 'customerService',
      width: 25,
    },
    {
      title: 'BD顾问',
      dataIndex: 'bdAdvisor',
      key: 'bdAdvisor',
      ellipsis: true,
      width: 40,
    },
    {
      title: '约见',
      dataIndex: 'meeting',
      key: 'meeting',
      ellipsis: true,
      width: 35,
    },
    {
      title: '联系',
      dataIndex: 'contact',
      key: 'contact',
      width: 25,
    },
    {
      title: '联络日期',
      dataIndex: 'contactDate',
      key: 'contactDate',
      ellipsis: true,
      width: 50,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 25,
    },
  ]);
  const typeOptions = ref(typeOptionsArr);
  const companyListOptions = ref<{
    label: string;
    value: string;
  }[]>(getCompanyList.value);
  watch(getCompanyList, () => {
    companyListOptions.value = getCompanyList.value;
  })
  const flagOptions = ref(flagOptionsArr);
  //const cooperateStatusOptions = ref(cooperateStatusOptionsArr);
  const clearFromState = () => {
    formState.value.companyName = '';
    formState.value.type = '';
    formState.value.flag = '';
  }
  const onSearch = () => {
    pageCustomerTrackList.value = {
      ...pageCustomerTrackList.value,
      pageNumber: 1,
    }
    customerTrackingStore.queryCustomerTrack(formState.value);
  }
  const handleCustomerTrackListData = () => {
    customerTrackingStore.queryCustomerTrack(formState.value);
  }
  onSearch();
  const handleHrInfo = (record: CustomerTrackItem) => {
    customerTrackingStore.queryHrDetail(record);
  }
  const handleCompanyNameAll = (record: CustomerTrackItem) => {
    customerTrackInfoFlag.value = true;
    customerTrackingStore.queryCompanyNameAll(record);
  }
  customerTrackingStore.queryPositionsList();
  customerTrackingStore.queryCompanyList();
  const visibleUpdateCustomerTrackType = ref(false);
  const updateCustomerTrackTypeForm = ref({
    id: '',
    type: '',
    companyNameAll: '',
  })
  const handleCancelUpdateCustomerTrackType = () => {
    visibleUpdateCustomerTrackType.value = false;
    updateCustomerTrackTypeForm.value.id = '';
    updateCustomerTrackTypeForm.value.type = '';
    updateCustomerTrackTypeForm.value.companyNameAll = '';
  }
  const handleOkUpdateCustomerTrackType = () => {
    customerTrackingStore.updateCustomerTrackTypeById(updateCustomerTrackTypeForm.value).then(res => {
      if (res.code == 1) {
        handleCancelUpdateCustomerTrackType();
        message.success('更新成功');
      }

    });
  }
  const handleUpdateCustomerTrackType = (record: CustomerTrackItem) => {
    updateCustomerTrackTypeForm.value.id = record.id.toString();
    updateCustomerTrackTypeForm.value.type = record.type;
    updateCustomerTrackTypeForm.value.companyNameAll = record.companyNameAll;
    visibleUpdateCustomerTrackType.value = true;
  }

  
  const visibleUpdateCustomerTrackFlag = ref(false);
  const updateCustomerTrackFlagForm = ref({
    id: '',
    flag: '',
    companyNameAll: '',
  })
  const handleUpdateCustomerTrackFlag = (record: CustomerTrackItem) => {
    updateCustomerTrackFlagForm.value.id = record.id.toString();
    updateCustomerTrackFlagForm.value.flag = record.flag;
    updateCustomerTrackFlagForm.value.companyNameAll = record.companyNameAll;
    visibleUpdateCustomerTrackFlag.value = true;
  }
  const handleCancelUpdateCustomerTrackFlag = () => {
    visibleUpdateCustomerTrackFlag.value = false;
    updateCustomerTrackFlagForm.value.id = '';
    updateCustomerTrackFlagForm.value.flag = '';
    updateCustomerTrackFlagForm.value.companyNameAll = '';
  }
  const handleOkUpdateCustomerTrackFlag = () => {
    customerTrackingStore.updateCustomerTrackFlagById(updateCustomerTrackFlagForm.value).then(res => {
      if (res.code == 1) {
        handleCancelUpdateCustomerTrackFlag();
        message.success('更新成功');
      }
    });
  }

  const visibleUpdateCustomerTrackBdAdvisor = ref(false);
  const updateCustomerTrackBdAdvisorForm = ref<{ 
  id: string; 
  bdAdvisor: string[] | undefined; 
  companyNameAll: string; 
  bdUserId: string | null; 
  bdUserName: string | null; 
}>({ 
  id: '', 
  bdAdvisor: [], 
  companyNameAll: '', 
  bdUserId: '', 
  bdUserName: null 
})
  customerTrackingStore.queryCustomerTrackBdAdvisor();
  const handleUpdateCustomerTrackBdAdvisor = (record: CustomerTrackItem) => {
    updateCustomerTrackBdAdvisorForm.value.id = record.id.toString();
    updateCustomerTrackBdAdvisorForm.value.bdUserId = record.bdUserId?.toString() || null;
    updateCustomerTrackBdAdvisorForm.value.bdUserName = record.bdUserName || null;
    updateCustomerTrackBdAdvisorForm.value.companyNameAll = record.companyNameAll;
    visibleUpdateCustomerTrackBdAdvisor.value = true;
  }
  const handleCancelUpdateCustomerTrackBdAdvisor = () => {
    visibleUpdateCustomerTrackBdAdvisor.value = false;
    updateCustomerTrackBdAdvisorForm.value.id = '';
    updateCustomerTrackBdAdvisorForm.value.bdAdvisor = [];
    updateCustomerTrackBdAdvisorForm.value.companyNameAll = '';
    updateCustomerTrackBdAdvisorForm.value.bdUserId = '';
    updateCustomerTrackBdAdvisorForm.value.bdUserName = '';
  }
  const handleOkUpdateCustomerTrackBdAdvisor = () => {
    
    if (!updateCustomerTrackBdAdvisorForm.value.bdAdvisor?.length) {
      message.error('请选择BD顾问');
      return;
    }
    updateCustomerTrackBdAdvisorForm.value.bdUserId = updateCustomerTrackBdAdvisorForm.value.bdAdvisor[1];
    updateCustomerTrackBdAdvisorForm.value.bdUserName = '';
    getCustomerTrackBdAdvisorArr.value.forEach(item => {
      //@ts-ignore
      if (item.value === updateCustomerTrackBdAdvisorForm.value?.bdAdvisor[0]) {
        //@ts-ignore
        updateCustomerTrackBdAdvisorForm.value.bdUserName = item.children.find(subItem => subItem.value === updateCustomerTrackBdAdvisorForm.value?.bdAdvisor[1])?.label;
      }
    })
    customerTrackingStore.updateCustomerTrackBdAdvisorById(updateCustomerTrackBdAdvisorForm.value).then(res => {
      if (res.code == 1) {
        handleCancelUpdateCustomerTrackBdAdvisor();
        message.success('操作成功');
      }
    });
  }
  const customerTrackingHRFlag = ref(false);
  const handleCustomerTrackContact = (record: CustomerTrackItem) => {
    customerTrackingHRFlag.value = true;
    customerTrackContractPage.value.pageNumber = 1;
    customerTrackingStore.queryCompanyNameAll(record as CustomerTrackItem);

  }

</script>

<style lang="less" scoped>
  .tag {
    cursor: pointer;
  }
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
  :deep(.ant-pagination-prev ){
    padding-right: 5px;
  }
  :deep(.ant-pagination-next ){

    padding-left: 5px;
  }
</style>