<template>
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
        <template v-if="column.key === 'brand'">
          <a-tag class="tag">查看</a-tag>
        </template>
        <template v-if="column.key === 'hrInfo'">
          <a-tag class="tag" @click="handleHrInfo(record as CustomerTrackItem)">查看</a-tag>
        </template>
         <template v-if="column.key === 'contact'">
          <a-tag class="tag">查看</a-tag>
        </template>
        <template v-if="column.key === 'customerService' && record.customerService">
          <a-tag class="tag">查看</a-tag>
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
  import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { CustomerTrackItem } from '/@/api/customerTracking/model';
  import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
  const customerTrackingStore = useCustomerTrackingStoreWithOut();
  const { getCustomerTrackList, customerTrackIsLoading, pageCustomerTrackList } = storeToRefs(customerTrackingStore);

  const columnsRseult = ref([
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 35,
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      width: 100,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 35,
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 35,
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
      ellipsis: true,
      width: 40,
    },
    {
      title: '企顾',
      dataIndex: 'customerService',
      key: 'customerService',
      ellipsis: true,
      width: 35,
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
      ellipsis: true,
      width: 35,
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
      width: 35,
    },
  ]);
  const handleCustomerTrackListData = () => {
    customerTrackingStore.queryCustomerTrack({});
  }
  handleCustomerTrackListData();
  const handleHrInfo = (record: CustomerTrackItem) => {
    customerTrackingStore.queryHrDetail(record);
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