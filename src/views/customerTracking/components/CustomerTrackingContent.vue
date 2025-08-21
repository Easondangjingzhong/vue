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
              allowClear
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
        <a-col :span="4">
          <a-form-item name="cooperateStatus" label="合作">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.cooperateStatus"
              :options="cooperateStatusOptions"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
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
                <a-tag class="tag">查看</a-tag>
            </a-tooltip>
        </template>
         <template v-if="column.key === 'category'">
           <a-tooltip :title="record.category" color="cyan" :overlay-style="{ whiteSpace: 'pre-line', maxWidth: '300px' }">
                <a-tag class="tag">查看</a-tag>
            </a-tooltip>
        </template>
        <template v-if="column.key === 'hrInfo'">
          <a-tag class="tag" @click="handleHrInfo(record as CustomerTrackItem)">查看</a-tag>
        </template>
         <template v-if="column.key === 'contact'">
          <a-tag class="tag">查看</a-tag>
        </template>
        <template v-if="column.key === 'customerService'">
          <template v-if="record.lieList && record.waiList">
             <a-tooltip :title="`${record.lieList || ''}\n${record.waiList || ''}`" color="cyan" :overlay-style="{ whiteSpace: 'pre-line', maxWidth: '300px' }">
                <a-tag class="tag">查看</a-tag>
            </a-tooltip>
          </template>
          <template v-else-if="record.lieList">
             <a-tooltip :title="record.lieList" color="cyan">
                <a-tag class="tag">查看</a-tag>
            </a-tooltip>
          </template>
          <template v-else-if="record.waiList">
             <a-tooltip :title="record.waiList" color="cyan">
                <a-tag class="tag">查看</a-tag>
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
                 <a href="javascript:;">类别</a>
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
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { CustomerTrackItem } from '/@/api/customerTracking/model';
  import { flagOptionsArr,typeOptionsArr,cooperateStatusOptionsArr } from '/@/api/customerTracking/constants';
  import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
  const customerTrackingStore = useCustomerTrackingStoreWithOut();
  const { getCustomerTrackList, customerTrackIsLoading, pageCustomerTrackList } = storeToRefs(customerTrackingStore);
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
      ellipsis: true,
      width: 40,
    },
    {
      title: '状态',
      dataIndex: 'flag',
      key: 'flag',
      ellipsis: true,
      width: 40,
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
      width: 35,
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
  const flagOptions = ref(flagOptionsArr);
  const cooperateStatusOptions = ref(cooperateStatusOptionsArr);
  const formState = reactive({
    companyName: '',
    type: '',
    flag: '',
    cooperateStatus: '',
  });
  const clearFromState = () => {
    formState.companyName = '';
    formState.type = '';
    formState.flag = '';
    formState.cooperateStatus = '';
  }
  const onSearch = () => {
    pageCustomerTrackList.value = {
      ...pageCustomerTrackList.value,
      pageNumber: 1,
    }
    customerTrackingStore.queryCustomerTrack(formState);
  }
  const handleCustomerTrackListData = () => {
    customerTrackingStore.queryCustomerTrack(formState);
  }
  onSearch();
  const handleHrInfo = (record: CustomerTrackItem) => {
    customerTrackingStore.queryHrDetail(record);
  }
  const handleCompanyNameAll = (record: CustomerTrackItem) => {
    customerTrackingStore.queryCompanyNameAll(record);
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