<template>
   <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          职位意向
        </h4>
        <!-- <PlusOutlined @click="handlePositons" /> -->
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;margin-bottom: 5px;" />
    </a-row>
    <!-- <div v-if="expend">
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="24" name="content">
            <a-textarea :rows="7" v-model:value="formState.content" placeholder="请输入联络记录"></a-textarea>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" offset="24">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div> -->
    <a-table
    class="row_table"
    :pagination="pagination"
      size="small"
      :dataSource="resumeList"
      rowKey="key"
      :columns="columns"
      :locale="{ emptyText: '暂无职位意向' }"
    ></a-table>
  </div>
</template>
<script setup lang="ts">
  const pagination = ref({
  pageSize: 10,
  current: 1,
  total: 0,
  hideOnSinglePage: true,
  size:'small',
})
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
    },
    {
      title: '意向',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  const resumeList = ref([]);
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
   :deep(.row_table) td{
    padding: 3px !important;
  }
</style>