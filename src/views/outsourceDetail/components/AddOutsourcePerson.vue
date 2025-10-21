<template>
 <a-drawer
    v-model:open="addOutsourcePersonFlag"
    title="添加外包人员"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="addOutsourcePersonFlag = false" />
    </template>
    <div>
      <a-form :model="addOutsourcePersonForm" :label-col="labelCol"  @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="8" class="row_col_space">
            <a-form-item name="userNameCn" label="姓名" class="row_col_space_left">
              <a-input v-model:value="addOutsourcePersonForm.userNameCn" placeholder="请输入中文" />
            </a-form-item>
            <a-form-item name="userNameEn" class="row_col_space_right">
              <a-input v-model:value="addOutsourcePersonForm.userNameEn" placeholder="请输入英文" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="sex" label="性别">
               <a-radio-group v-model:value="addOutsourcePersonForm.sex">
                <a-radio value="男">男</a-radio>
                <a-radio value="女">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="age" label="年龄">
              <a-date-picker v-model:value="addOutsourcePersonForm.age" placeholder="请选择年龄" type="date" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="phoneNumber" label="手机号"
             :rules="[
              { required: true, message: '请输入手机号' },
              { 
                pattern: /^1[3-9]\d{9}$/, 
                message: '请输入正确的11位手机号码'
              },
              ]">
              <a-input v-model:value="addOutsourcePersonForm.phoneNumber" placeholder="请输入手机号" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="jobNumber" label="工号">
              <a-input v-model:value="addOutsourcePersonForm.jobNumber" placeholder="请输入工号" />
            </a-form-item>
          </a-col>
           <a-col :span="8">
            <a-form-item name="email" label="邮箱" :rules="[{ required: true, message: '请输入邮箱' }]">
              <a-input v-model:value="addOutsourcePersonForm.email" disabled placeholder="请输入邮箱" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="companyName" label="公司" :rules="[{ required: true, message: '请选择公司' }]">
              <a-select 
              v-model:value="addOutsourcePersonForm.companyName" 
              placeholder="请选择公司" 
              :showArrow="false"
              allowClear
              optionFilterProp="label"
              @change="handleCompanyChange"
              :options="getOutsourceCompanyAll"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="brand" label="品牌">
             <a-select 
              v-model:value="addOutsourcePersonForm.brand" 
              placeholder="请选择品牌" 
              :showArrow="false"
              allowClear
              optionFilterProp="label"
              :options="getOutsourceCompanyBrand"></a-select>
            </a-form-item>  
          </a-col>
          <a-col :span="8">
            <a-form-item name="city" label="城市">
              <a-input v-model:value="addOutsourcePersonForm.city" placeholder="请输入城市" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="positions" label="岗位">
              <a-input v-model:value="addOutsourcePersonForm.positions" placeholder="请输入岗位" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="market" label="店铺">
              <a-input v-model:value="addOutsourcePersonForm.market" placeholder="请输入店铺" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="jobType" label="性质">
              <a-input v-model:value="addOutsourcePersonForm.jobType" placeholder="请输入性质" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="recruitParty" label="招聘">
              <a-input v-model:value="addOutsourcePersonForm.recruitParty" placeholder="请输入招聘" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="offerTime" label="OFFER日期">
              <a-input v-model:value="addOutsourcePersonForm.offerTime" placeholder="请输入OFFER日期" />
            </a-form-item>
          </a-col>
           
           <a-col :span="8">
            <a-form-item name="currentStatus" label="状态">
              <a-select v-model:value="addOutsourcePersonForm.currentStatus" placeholder="请选择状态">
                <a-select-option value="2">在职</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
            <a-form-item name="planEntryTime" label="预计入职">
              <a-input v-model:value="addOutsourcePersonForm.planEntryTime" placeholder="请输入预计入职" />
            </a-form-item>
            </a-col>
          <a-col :span="8">
            <a-form-item name="realEntryTime" label="实际入职">
              <a-input v-model:value="addOutsourcePersonForm.realEntryTime" placeholder="请输入实际入职" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="planLeaveTime" label="预计离职">
              <a-input v-model:value="addOutsourcePersonForm.planLeaveTime" placeholder="请输入OFFER日期" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="addOutsourcePersonFlag = false">
              取消
            </a-button>
          </a-col>
         </a-row>
      </a-form>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { addOutsourcePersonFlag, addOutsourcePersonForm, getOutsourceCompanyAll, getOutsourceCompanyBrand } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const labelCol = { style: { width: '65px' } };
const handleCompanyChange = (value) => {
  outsourceDetailStore.queryCompanyBrand(value);
}
const iconLoading = ref(false);
const handleSubmit = () => {

}
</script>

<style lang="less" scoped>
  :deep(.row_col_space) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 6px;
  }
  :deep(.row_col_space_left) {
    width: 65%;
    margin-inline-end: -2px;
  }
  :deep(.row_col_space_right) {
    width: 36%;
  }
  
  :deep(.row_col_space_right .ant-input) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
   :deep(.row_col_space_left .ant-input) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
</style>