<template>
  <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4"> 联络记录 </h4>
        <PlusOutlined v-if="!expend" @click="handleContactContent" />
        <CloseOutlined v-if="expend" @click="handleContactContent" />
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0; margin-bottom: 5px" />
    </a-row>
    <div v-if="expend">
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item :rules="[{ required: true, message: '请输入联络记录' }]" name="content">
              <a-textarea
                :rows="7"
                v-model:value="formState.content"
                placeholder="请输入联络记录"
              ></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="7">
            <a-form-item
              :rules="[{ required: true, message: '请输入沟通状态' }]"
              name="contactFlag"
            >
              <a-select
                v-model:value="formState.contactFlag"
                placeholder="沟通状态"
                :options="optionsContactFlag"
                :allowClear="true"
                @change="handleContactFlag"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :rules="[{ required: true, message: '请输入联系工具' }]"
              name="contactTool"
            >
              <a-select
                v-model:value="formState.contactTool"
                placeholder="联系工具"
                :options="optionsContactTool"
                :allowClear="true"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :rules="[{ required: false, message: '请输入下次联络' }]" name="nextTime">
              <a-date-picker
                v-model:value="formState.nextTime"
                value-format="YYYY-MM-DD"
                picker="date"
                placeholder="下次联络"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button type="primary" :loading="iconLoading" html-type="submit">保存</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div v-if="resumeContact.length > 0" v-for="item in resumeContact">
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24">
          {{ item.index }}、<span v-html="item.contactFlag"></span> - {{ item.contactTool }}
          <span v-if="item.nextTime"> 下次联络: {{ item.nextTime }} </span>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row">
        <a-col :span="24">
          {{ item.content }}
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row" style="text-align: right">
        <a-col :span="24"> {{ item.createTime }} {{ item.realNameEn }} </a-col>
      </a-row>
    </div>
    <a-row :gutter="24" class="resume_row_pagination">
      <a-pagination
        size="small"
        :current="pagination.current"
        :pageSize="pagination.pageSize"
        :total="pagination.total"
        :hideOnSinglePage="pagination.hideOnSinglePage"
        @change="handlePagination"
        :show-total="(total) => `共 ${total} 条`"
      />
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import { PlusOutlined,CloseOutlined } from '@ant-design/icons-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeContactContent } = storeToRefs(resumeDetailStore);
  const iconLoading = ref(false);
  const expend = ref(false);
  const formState = ref({
    content: '',
    contactFlag: '',
    contactTool: '',
    nextTime: '',
  });
  const handleContactContent = () => {
    expend.value = !expend.value;
    formState.value = {
      content: '',
      contactFlag: '',
      contactTool: '',
      nextTime: '',
    };
  };
  const optionsContactFlag = ref<SelectProps['options']>([
    { label: '未接通', value: '1' },
    { label: '拒绝沟通', value: '2' },
    { label: '黑名单', value: '3' },
    { label: '空号', value: '4' },
    { label: '核对简历', value: '19' },
    { label: '基础沟通-日常维系', value: '8' },
    { label: '基础沟通-拒绝机会', value: '12' },
    { label: '基础沟通-需要跟进', value: '13' },
    { label: '基础沟通-看机会', value: '14' },
    { label: '有效沟通-拒绝机会', value: '9' },
    { label: '有效沟通-看机会', value: '10' },
    { label: '有效沟通-需要跟进', value: '11' },
  ]);
  const contactTool = [
    { label: '公司电话', value: '1' },
    { label: '微信文字', value: '2' },
    { label: '其他', value: '3' },
  ];
  const optionsContactTool = ref<SelectProps['options']>(contactTool);
  const handleContactFlag = (value) => {
    if (value == '19') {
      formState.value.content = formState.value.content ? formState.value.content : '核对简历';
      optionsContactTool.value = [{ label: '公司电话', value: '1' }];
    } else {
      formState.value.content = formState.value.content ? formState.value.content : '';
      optionsContactTool.value = contactTool;
    }
  };
  const resumeContact = ref([
    {
      contactFlag: '',
      contactTool: '',
      nextTime: '',
      content: '',
      createTime: '',
      realNameEn: '',
      index: 0,
    },
  ]);
  const pagination = ref({
    pageSize: 10,
    current: 1,
    total: 0,
    hideOnSinglePage: true,
    size: 'small',
  });
  watch(resumeContactContent, () => {
    resumeContact.value = resumeContactContent.value.list.map((item,index) => ({
      contactFlag: handleContactFlagHtml(item.contactFlag),
      contactTool: contactTool.filter((item1) => item1.value == item.contactTool)[0].label,
      nextTime: item.nextTime ? formatToDateMinute(item.nextTime) : '',
      content: item.content?.replaceAll(/<[^>]+>/g, ''),
      createTime: item.createTime ? formatToDateMinute(item.createTime) : '',
      realNameEn: item.realNameEn,
      index: ((resumeContactContent.value.pageNumber - 1) * resumeContactContent.value.pageSize + (index + 1)),
    }));
    pagination.value = {
      pageSize: resumeContactContent.value.pageSize,
      current: resumeContactContent.value.pageNumber,
      total: resumeContactContent.value.totalCount,
      hideOnSinglePage: true,
      size: 'small',
    };
  });
  const handleContactFlagHtml = (contactFlag) => {
    if (['10', '14'].includes(contactFlag)) {
      return `<span style='color: green;'>${
        optionsContactFlag.value?.filter((item1) => item1.value == contactFlag)[0].label
      }</span>`;
    } else if (['11', '13'].includes(contactFlag)) {
      return `<span style='color: orange;'>${
        optionsContactFlag.value?.filter((item1) => item1.value == contactFlag)[0].label
      }</span>`;
    } else {
      return `<span style='color: red;'>${
        optionsContactFlag.value?.filter((item1) => item1.value == contactFlag)[0].label
      }</span>`;
    }
  };
  const onFinish = () => {
    resumeDetailStore.addResumeContactContent(formState.value).then((res) => {
      if (res.code == 1) {
        message.success('保存成功');
        handleContactContent();
      } else {
        message.error('保存失败');
      }
      iconLoading.value = false;
    });
  };
  const handlePagination = (current) => {
    resumeDetailStore.queryResumeContactContent(current);
  };
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
  .resume_row {
    margin-bottom: 10px;
  }
  .resume_row_pagination {
    justify-content: end;
  }
</style>
