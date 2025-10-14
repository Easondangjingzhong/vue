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
      <a-form :form="addOutsourcePersonForm" :label-col="labelCol">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="name" label="姓名">
              <a-input v-model:value="addOutsourcePersonForm.name" placeholder="请输入姓名" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="gender" label="性别">
              <a-select v-model:value="addOutsourcePersonForm.gender" placeholder="请选择性别">
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="status" label="状态">
              <a-select v-model:value="addOutsourcePersonForm.status" placeholder="请选择状态">
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">离职</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="mobile" label="手机号">
              <a-input v-model:value="addOutsourcePersonForm.mobile" placeholder="请输入手机号" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="workNumber" label="工号">
              <a-input v-model:value="addOutsourcePersonForm.workNumber" placeholder="请输入工号" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="company" label="公司">
              <a-input v-model:value="addOutsourcePersonForm.company" placeholder="请输入公司" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="email" label="邮箱">
              <a-input v-model:value="addOutsourcePersonForm.email" placeholder="请输入邮箱" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="brand" label="品牌">
              <a-input v-model:value="addOutsourcePersonForm.brand" placeholder="请输入品牌" />
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
            <a-form-item name="position" label="岗位">
              <a-input v-model:value="addOutsourcePersonForm.position" placeholder="请输入岗位" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="store" label="店铺">
              <a-input v-model:value="addOutsourcePersonForm.store" placeholder="请输入店铺" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="property" label="性质">
              <a-input v-model:value="addOutsourcePersonForm.property" placeholder="请输入性质" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item name="department" label="部门">
              <a-input v-model:value="addOutsourcePersonForm.department" placeholder="请输入部门" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item name="outsourceType" label="外包类型" :rules="[{ required: true, message: '请选择外包类型' }]">
              <a-select v-model:value="addOutsourcePersonForm.outsourceType" placeholder="请选择外包类型">
                <a-select-option value="1">外包人员</a-select-option>
                <a-select-option value="2">外包公司</a-select-option>
              </a-select>
            </a-form-item>
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
const { addOutsourcePersonFlag, addOutsourcePersonForm } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.5));
const labelCol = { style: { width: '65px' } };
</script>

<style lang="less" scoped>

</style>