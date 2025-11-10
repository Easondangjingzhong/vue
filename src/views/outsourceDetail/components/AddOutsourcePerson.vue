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
              <a-date-picker v-model:value="addOutsourcePersonForm.age" placeholder="请选择年龄" value-format="YYYY-MM-DD" />
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
              <a-input v-model:value="addOutsourcePersonForm.phoneNumber" placeholder="请输入手机号" @change="handlePhoneNumberChange"/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="jobNumber" label="工号">
              <a-input v-model:value="addOutsourcePersonForm.jobNumber" placeholder="请输入工号" />
            </a-form-item>
          </a-col>
           <a-col :span="8">
            <a-form-item name="email" label="邮箱" :rules="[{ required: true, message: '请输入邮箱' }]">
              <a-input v-model:value="addOutsourcePersonForm.email" placeholder="请输入邮箱" />
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
              showSearch
              optionFilterProp="label"
              @change="handleCompanyChange"
              :options="getOutsourceCompanyAll"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="bId" label="品牌">
             <a-select 
              v-model:value="addOutsourcePersonForm.bId" 
              placeholder="请选择品牌" 
              :showArrow="false"
              allowClear
              showSearch
              optionFilterProp="label"
              :options="getOutsourceCompanyBrand"></a-select>
            </a-form-item>  
          </a-col>
          <a-col :span="8">
            <a-form-item name="city" label="城市">
              <a-select 
              v-model:value="addOutsourcePersonForm.city" 
              placeholder="请选择城市" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getProvince"
              @change="handleCitySearch"
              optionFilterProp="label"></a-select>
            </a-form-item>  
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="positionId" label="岗位">
              <a-select 
              v-model:value="addOutsourcePersonForm.positionId" 
              placeholder="请选择岗位" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getOutsourcePosition"
              optionFilterProp="label"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="mId" label="店铺">
              <a-select 
              v-model:value="addOutsourcePersonForm.mId" 
              placeholder="请选择店铺" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getOutsourceMarkList"
              @search="handleMarkIdSearch"
              optionFilterProp="label"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="jobType" label="性质">
              <a-select 
              v-model:value="addOutsourcePersonForm.jobType" 
              placeholder="请选择性质" 
              :showArrow="false"
              allowClear
              :options="jobTypeOption"
              optionFilterProp="label"></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="recruitParty" label="招聘">
              <a-select 
              v-model:value="addOutsourcePersonForm.recruitParty" 
              placeholder="请输入招聘" 
              :showArrow="false"
              allowClear
              optionFilterProp="label">
             <a-select-option value="客户">客户</a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="offerTime" label="OFFER日期">
              <a-date-picker v-model:value="addOutsourcePersonForm.offerTime" value-format="YYYY-MM-DD" placeholder="请选择OFFER日期" />
            </a-form-item>
          </a-col>
           <a-col :span="8">
            <a-form-item name="currentStatus" label="状态">
              <a-select v-model:value="addOutsourcePersonForm.currentStatus" placeholder="请选择状态">
                <a-select-option value="1">待入</a-select-option>
                <a-select-option value="2">在职</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
            <a-form-item name="planEntryTime" label="预计入职">
              <a-date-picker v-model:value="addOutsourcePersonForm.planEntryTime" value-format="YYYY-MM-DD" placeholder="请选择预计入职日期" />
            </a-form-item>
            </a-col>
          <a-col :span="8">
            <a-form-item name="realEntryTime" label="实际入职">
              <a-date-picker v-model:value="addOutsourcePersonForm.realEntryTime" value-format="YYYY-MM-DD" placeholder="请选择实际入职日期" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="planLeaveTime" label="预计离职">
              <a-date-picker v-model:value="addOutsourcePersonForm.planLeaveTime" value-format="YYYY-MM-DD" placeholder="请选择预计离职日期" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="recommendRecruitId" label="推顾">
              <a-select 
              v-model:value="addOutsourcePersonForm.recommendRecruitId" 
              placeholder="请选择推顾" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getOutsourceRecruitList"
              optionFilterProp="label">
            </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="offerTime" label="企顾">
              <a-select 
              v-model:value="addOutsourcePersonForm.recruitId" 
              placeholder="请选择企顾" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getOutsourceRecruitList"
              optionFilterProp="label">
            </a-select>
          </a-form-item>
          </a-col>
           <a-col :span="8">
            <a-form-item name="currentStatus" label="服顾">
               <a-select 
              v-model:value="addOutsourcePersonForm.serviceRecruitId" 
              placeholder="请选择服顾" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getOutsourceRecruitList"
              optionFilterProp="label">
            </a-select>
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
import { message } from 'ant-design-vue';
import { debounce } from 'lodash-es';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { addOutsourcePersonFlag, addOutsourcePersonForm, getOutsourceCompanyAll, getOutsourceCompanyBrand, getProvince, getOutsourcePosition, getOutsourceMarkList, getOutsourceRecruitList } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const labelCol = { style: { width: '65px' } };
const handleCompanyChange = (value) => {
  outsourceDetailStore.queryCompanyBrand(value);
}
const handlePhoneNumberChange = () => {
  if (!addOutsourcePersonForm.value.phoneNumber) {
    return;
  }
  outsourceDetailStore.queryOutsourcePersonMsg(addOutsourcePersonForm.value.phoneNumber).then(res => {
    if (res.code === 1) {
      const info = res.info;
      addOutsourcePersonForm.value.age = info.BIRTH_YEAR ? `${info.BIRTH_YEAR}-${info.BORN_MONTH?.toString().padStart(2, '0')}-${info.BORN_DAY?.toString().padStart(2, '0')}` : '';
      addOutsourcePersonForm.value.email = info.EMAIL || '';
      addOutsourcePersonForm.value.sex = info.GENDER || '';
      addOutsourcePersonForm.value.userNameCn = info.USER_NAME || '';
      // 处理USER_NAME，提取中文和英文部分
      if (info.USER_NAME) {
        const userName = info.USER_NAME;
        // 检查是否包含斜杠
        if (userName.includes('/')) {
          const [cnPart, enPart] = userName.split('/');
          addOutsourcePersonForm.value.userNameCn = cnPart || '';
          addOutsourcePersonForm.value.userNameEn = enPart || '';
        } else {
          // 不包含斜杠的情况，尝试分离中英文
          // 匹配中文字符
          const cnMatch = userName.match(/[\u4e00-\u9fa5]+/g);
          // 匹配英文、数字和符号（非中文）
          const enMatch = userName.match(/[^\u4e00-\u9fa5]+/g);
          
          addOutsourcePersonForm.value.userNameCn = cnMatch ? cnMatch.join('') : '';
          addOutsourcePersonForm.value.userNameEn = enMatch ? enMatch.join('') : '';
        }
      } else {
        addOutsourcePersonForm.value.userNameCn = '';
        addOutsourcePersonForm.value.userNameEn = '';
      }
    }
  });
}
const jobTypeOption = ref([
  {
    label: '全职',
    value: '全职',
  },
  {
    label: '兼职',
    value: '兼职',
  },
]);
const handleMarkIdSearch = debounce((value?: string) => {
    outsourceDetailStore.queryMarkListSearch( addOutsourcePersonForm.value.city,value || "");
  },1000);
const handleCitySearch = () => {
  handleMarkIdSearch();
}
const iconLoading = ref(false);
const handleSubmit = () => {
  addOutsourcePersonForm.value.market = getOutsourceMarkList.value.find(item => item.value === addOutsourcePersonForm.value.mId)?.label || '';
  addOutsourcePersonForm.value.brand = getOutsourceCompanyBrand.value.find(item => item.value === addOutsourcePersonForm.value.bId)?.label || '';
  addOutsourcePersonForm.value.positions = getOutsourcePosition.value.find(item => item.value === addOutsourcePersonForm.value.positionId)?.label || '';
  addOutsourcePersonForm.value.recommendCounselor = getOutsourceRecruitList.value.find(item => item.value === addOutsourcePersonForm.value.recommendRecruitId)?.label || '';
  addOutsourcePersonForm.value.counselor = getOutsourceRecruitList.value.find(item => item.value === addOutsourcePersonForm.value.recruitId)?.label || '';
  addOutsourcePersonForm.value.serviceCounselor = getOutsourceRecruitList.value.find(item => item.value === addOutsourcePersonForm.value.serviceRecruitId)?.label || '';
  outsourceDetailStore.addOutsourceBasic().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      addOutsourcePersonFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
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