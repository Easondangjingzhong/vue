<template>
  <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4"> 客户查重 </h4>
        <PlusOutlined v-if="!expend && showResumeAdd" @click="handleCheckResult" />
        <CloseOutlined v-if="expend && showResumeAdd" @click="handleCheckResult" />
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0; margin-bottom: 5px" />
    </a-row>
    <div v-if="expend">
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="11">
            <a-form-item
              label="公司"
              :rules="[{ required: true, message: '请输入公司' }]"
              name="companyName"
            >
              <a-select
                v-model:value="formState.companyName"
                placeholder="请输入公司"
                :options="optionsCompanyName"
                :allowClear="true"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="结果"
              :rules="[{ required: true, message: '请输入结果' }]"
              name="checkResult"
            >
              <a-select
                v-model:value="formState.checkResult"
                placeholder="请输入结果"
                :options="optionsCheckResult"
                :allowClear="true"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="5" style="line-height: 2.4;">
            <a-button style="margin: 0 8px" type="primary" size="small" :loading="iconLoading" html-type="submit"
              >保存</a-button
            >
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      class="row_table"
      size="small"
      :dataSource="resumeList"
      rowKey="key"
      :pagination="pagination"
      :columns="columns"
      :locale="{ emptyText: '暂无客户查重' }"
      @change="handleQueryResumeCheckResult"
    >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'checkResult'">
          <a-tag v-if="record.checkResult == '录入成功' || record.checkResult == '到面'" color="green">{{ record.checkResult }}</a-tag>
          <a-tag v-if="record.checkResult == '简历重复'" color="red">{{ record.checkResult }}</a-tag>
        </template>
      </template>
  </a-table>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import { formatToDate } from '/@/utils/dateUtil';
  import { PlusOutlined,CloseOutlined } from '@ant-design/icons-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeCheckResult } = storeToRefs(resumeDetailStore);
  defineProps({
    showResumeAdd: {
      type: Boolean,
      default: false,
    }
  });
  const expend = ref(false);
  const iconLoading = ref(false);
  const optionsCheckResult = ref<SelectProps['options']>([
    {
      value: '0',
      label: '简历重复',
    },
    {
      value: '1',
      label: '录入成功',
    },
    {
      value: '2',
      label: '到面',
    },
  ]);
  const optionsCompanyName = ref<SelectProps['options']>([
    {
      value: 'Louis Vuitton',
      label: 'Louis Vuitton',
    },
    {
      value: 'LVMH Fashion Group',
      label: 'LVMH Fashion Group',
    },
    {
      value: 'LVMH集团到面',
      label: 'LVMH集团到面',
    },
    {
      value: '小仙炖',
      label: '小仙炖',
    },
    {
      value: '拉格代尔',
      label: '拉格代尔',
    },
    {
      value: '亚玛芬',
      label: '亚玛芬',
    },
    {
      value: 'Dior',
      label: 'Dior',
    },
    {
      value: '大疆创新',
      label: '大疆创新',
    },
    {
      value: '之禾',
      label: '之禾',
    },
  ]);
  const formState = ref({
    companyName: '',
    checkResult: '',
  });
  const onFinish = () => {
    iconLoading.value = true;
    resumeDetailStore.addResumeCheckResult(formState.value).then((res) => {
      if (res.code == 1) {
        message.success('保存成功');
        handleCheckResult();
      } else {
        message.error('保存失败');
      }
      iconLoading.value = false;
      //resumeDetailStore.getResumeCheckedDuplicate();
    });
  };
  const handleCheckResult = () => {
    expend.value = !expend.value;
    formState.value = {
      companyName: '',
      checkResult: '',
    };
  };
  const pagination = ref({
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
    },
    {
      title: '公司',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '结果',
      dataIndex: 'checkResult',
      key: 'checkResult',
    },
    {
      title: '日期',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '顾问',
      dataIndex: 'recommendCounselor',
      key: 'recommendCounselor',
    },
  ];
  const resumeList = ref([]);
  watch(resumeCheckResult, () => {
    resumeList.value = resumeCheckResult.value.list.map((item, index) => ({
      key: item.id.toString(),
      index: ((resumeCheckResult.value.pageNumber - 1) * resumeCheckResult.value.pageSize + (index + 1)),
      companyName: item.companyName,
      checkResult: optionsCheckResult.value.filter(item1 => item1.value == item.checkResult)[0].label,
      createTime: (item.createTime ? formatToDate(item.createTime) : ""),
      recommendCounselor: item.recommendCounselor,
    }));
    pagination.value = {
      pageSize: resumeCheckResult.value.pageSize,
      current: resumeCheckResult.value.pageNumber,
      total: resumeCheckResult.value.totalCount,
      hideOnSinglePage: true,
      size: 'small',
    };
  });
  const handleQueryResumeCheckResult = (pagination) => {
    resumeDetailStore.queryResumeCheckResult(pagination.current);
  }
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
</style>
