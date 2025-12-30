<template>
 <a-drawer
    v-model:open="outsourceSocialSecurityInfoFormFlag"
    :title="outsourceSocialSecurityInfoFormType === '1' ? '新增社保基数' : '修改社保基数'"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
    <div>
      <a-form :label-col="labelCol" :model="outsourceSocialSecurityInfoForm" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="标识" name="shebaoSign">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.shebaoSign"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" name="flag">
              <a-select v-model:value="outsourceSocialSecurityInfoForm.flag">
                <a-select-option value="1">有效</a-select-option>
                <a-select-option value="2">无效</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="城市" name="city">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.city" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="大病企业" name="companyDabingRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyDabingRate"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="社保基数" name="shebaoBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.shebaoBase"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="生育企业" name="companyShengyuRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyShengyuRate"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="养老企业" name="companyYanglaoRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyYanglaoRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="生效月" name="startTime">
              <a-date-picker
                v-model:value="outsourceSocialSecurityInfoForm.startTime"
                value-format="YYYY-MM"
                picker="month"
                placeholder="请选择生效月"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="养老个人" name="personYanglaoRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personYanglaoRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="发布月" name="issueTime">
              <a-date-picker
                v-model:value="outsourceSocialSecurityInfoForm.issueTime"
                value-format="YYYY-MM"
                picker="month"
                placeholder="请选择发布月"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="失业企基" name="companyShiyeBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyShiyeBase"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="公积金基数" name="yijinBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.yijinBase"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="失业个基" name="personShiyeBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personShiyeBase"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="公积金企业" name="companyYijinRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyYijinRate"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="失业企业" name="companyShiyeRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyShiyeRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="公积金个人" name="personYijinRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personYijinRate"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="失业个人" name="personShiyeRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personShiyeRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="客户商业保险" name="shangBao">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.shangBao"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="工伤基数" name="companyGongshangBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyGongshangBase"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="实际商业保险" name="shiShangBao">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.shiShangBao"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="工伤企业" name="companyGongshangRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyGongshangRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="缴纳公司" name="companyJiao">
              <a-select v-model:value="outsourceSocialSecurityInfoForm.companyJiao" :options="companyJiaoOption"></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="医疗企基" name="yiliaoBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.yiliaoBase"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手续费" name="handingFee">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.handingFee"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="医疗个基" name="personYiliaoBase">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personYiliaoBase"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="增减员时间" name="addDeleteDay">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.addDeleteDay"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="医疗企业" name="companyYiliaoRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.companyYiliaoRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" class="row_col_space">
            <a-form-item label="增减员月份" name="addMonth" :label-col="{style: { width: '79px' }}" class="row_col_space_left">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.addMonth"/>
            </a-form-item>
            <a-form-item name="deleteMonth" class="row_col_space_right">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.deleteMonth"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="医疗个人" name="personYiliaoRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personYiliaoRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最长补缴" name="bujiao">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.bujiao"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="大病个人" name="personDabingRate">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.personDabingRate"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
             <a-form-item label="缴纳月" name="companyJiao">
              <a-select v-model:value="outsourceSocialSecurityInfoForm.jiaoMonth">
                <a-select-option value="当月缴纳">当月缴纳</a-select-option>
                <a-select-option value="次月缴纳">次月缴纳</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
  
          <a-col :span="12">
            <a-form-item label="备注" name="remark">
              <a-input v-model:value="outsourceSocialSecurityInfoForm.remark"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="handleClose">
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
import { message } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { companyJiaoOption } from '/@/api/outsourceDetail/constants';
import { OutsourceShebaoInfoItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecurityInfoFormFlag,outsourceSocialSecurityInfoForm,outsourceSocialSecurityInfoFormType } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.4));
const labelCol = {
  span: 7,
};
const iconLoading = ref(false);
const handleClose = () => {
  outsourceSocialSecurityInfoFormFlag.value = false;
  outsourceSocialSecurityInfoForm.value = {} as OutsourceShebaoInfoItem;
}
const handleSubmit = () => {
  iconLoading.value = true;
  if (outsourceSocialSecurityInfoFormType.value === '1') {
     outsourceDetailStore.addOutsourceShebaoInfo().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceSocialSecurityInfoFormFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
  } else {
     outsourceDetailStore.updateOutsourceShebaoInfo().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceSocialSecurityInfoFormFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
  }
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