<template>
<a-modal
  title="添加HR信息"
  width="500px"
  :open="openAddCustomerTrackHRFlag"
  :footer="null"
  @close="handleAddCustomerTrackHRCancel"
  @ok="handleAddCustomerTrackHRInfo"
>
<a-form :model="addCustomerTrackHRInfo" @finish="handleAddCustomerTrackHRInfo">
  <a-row :gutter="24">
    <a-col :span="12" v-if="hrNameSelect">
      <a-form-item label="姓名">
        <div style="display: flex; align-items: center; gap: 8px;">
        <a-select 
        :options="hrDetailListOptions" 
        :showSearch="true" 
        v-model:value="addCustomerTrackHRInfo.id"
        @change="handleAddCustomerTrackHRSelect"
        optionFilterProp="label"></a-select>
        <a-button @click="handleHrNameSelect">切换</a-button>
        </div>
      </a-form-item>
    </a-col>
    <a-col :span="12" v-if="!hrNameSelect">
      <a-form-item label="姓名">
        <div style="display: flex; align-items: center; gap: 8px;">
      <a-input v-model:value="addCustomerTrackHRInfo.hrName" placeholder="HR姓名" />
      <a-button @click="handleHrNameSelect">切换</a-button>
    </div>
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-form-item label="手机号">
        <a-input v-model:value="addCustomerTrackHRInfo.mobilePhone" />
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="12">
      <a-form-item label="性别">
        <a-radio-group v-model:value="addCustomerTrackHRInfo.gender">
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-col>
     <a-col :span="12">
      <a-form-item label="职位">
        <a-select
          :showSearch="true"
          v-model:value="addCustomerTrackHRInfo.positionId"
          optionFilterProp="label"
        ></a-select>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="12">
      <a-form-item label="固话">
        <a-input v-model:value="addCustomerTrackHRInfo.telPhone"/>
      </a-form-item>
    </a-col>
     <a-col :span="12">
      <a-form-item label="微信">
        <a-input v-model:value="addCustomerTrackHRInfo.wechat"/>
      </a-form-item>
    </a-col>
  </a-row>
    <a-row :gutter="24">
    <a-col :span="12">
      <a-form-item label="邮箱">
        <a-input v-model:value="addCustomerTrackHRInfo.email"/>
      </a-form-item>
    </a-col>
     <a-col :span="12">
      <a-form-item label="当状">
        <a-select
          :showSearch="true"
          v-model:value="addCustomerTrackHRInfo.jobType"
          optionFilterProp="label"
        >
          <a-select-option value="在职">在职</a-select-option>
          <a-select-option value="离职">离职</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-form-item label="品牌">
        <a-select
          :showSearch="true"
          v-model:value="addCustomerTrackHRInfo.brandId"
          optionFilterProp="label"
          multiple
          :options="brandListOptions"
        ></a-select>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-form-item label="地址">
        <a-input v-model:value="addCustomerTrackHRInfo.officeAddress"/>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="24" style="text-align: right;">
      <a-button @click="handleAddCustomerTrackHRCancel">取消</a-button>
      <a-button type="primary" :loading="loading" style="margin-left: 5px;" html-type="submit">提交</a-button>
    </a-col>
  </a-row>
</a-form>
</a-modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
const customerTrackingStore = useCustomerTrackingStoreWithOut();
const { addCustomerTrackHRInfo, openAddCustomerTrackHRFlag, hrDetailList,customerTrackInfo } = storeToRefs(customerTrackingStore);
const hrNameSelect = ref(false);
if (!addCustomerTrackHRInfo.value.id) {
  hrNameSelect.value = true;
}
const hrDetailListOptions = ref<{
  label: string;
  value: string;
}[]>([]);
watch(hrDetailList, () => {
  hrDetailListOptions.value = hrDetailList.value.map(item => {
    return {
      label: item.hrName,
      value: item.id,
    }
  })
})
const handleHrNameSelect = () => {
  hrNameSelect.value = !hrNameSelect.value;
}
const handleAddCustomerTrackHRSelect = (e: any) => {
  hrNameSelect.value = !hrNameSelect.value;
  addCustomerTrackHRInfo.value = {
    ...hrDetailList.value.filter(item => item.id === e)[0],
    id: '',
  };
}
const brandListOptions = ref<{
  label: string;
  value: string;
}[]>([]);
watch(customerTrackInfo, () => {
  brandListOptionsChange();
})
const brandListOptionsChange = () => {
  const brandId= customerTrackInfo.value?.brandId?.toString().split(",") || [];
  const brandName = customerTrackInfo.value?.brandName?.split(",") || [];
  brandListOptions.value = brandId.map((item,index) => {
    return {
      label: brandName[index],
      value: item,
    }
  })
}
brandListOptionsChange();
const loading = ref(false);
const handleAddCustomerTrackHRInfo = () => {
  loading.value = true;
  try {
    customerTrackingStore.addCustomerTrackHRInfoDetail(addCustomerTrackHRInfo.value).then(res => {
      if (res.code == 1) {
        loading.value = false;
      } else {
        loading.value = false;
      }
    });
  } catch (error) {
    loading.value = false;
  }
}
const handleAddCustomerTrackHRCancel = () => {
  customerTrackingStore.closeAddCustomerTrackHRInfo();
}
</script>

<style lang="less" scoped>

</style>