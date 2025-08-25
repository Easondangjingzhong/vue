<template>
<a-modal
  title="添加HR信息"
  width="580px"
  :open="openAddCustomerTrackHRFlag"
  :footer="null"
  @cancel="handleAddCustomerTrackHRCancel"
  @ok="handleAddCustomerTrackHRInfo"
>
<a-form :label-col="{span: 4}" :model="addCustomerTrackHRInfo" @finish="handleAddCustomerTrackHRInfo">
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
      <a-form-item :rules="[{ required: true, message: '请输入HR姓名' }]" name="hrName" label="姓名">
        <div style="display: flex; align-items: center; gap: 8px;">
      <a-input v-model:value="addCustomerTrackHRInfo.hrName" placeholder="HR姓名" />
      <a-button @click="handleHrNameSelect">切换</a-button>
    </div>
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-form-item label="手机">
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
          :options="positionsListOptions"
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
      <a-form-item :label-col="{span: 2}" :rules="[{ required: true, message: '请选择品牌' }]" name="brandId" label="品牌">
        <a-select
          :showSearch="true"
          v-model:value="addCustomerTrackHRInfo.brandId"
          optionFilterProp="label"
          mode="multiple"
          :options="brandListOptions"
        ></a-select>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-form-item :label-col="{span: 2}" label="地址">
        <a-input v-model:value="addCustomerTrackHRInfo.address"/>
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
const { addCustomerTrackHRInfo, openAddCustomerTrackHRFlag, hrDetailList,customerTrackInfo,getPositionsList } = storeToRefs(customerTrackingStore);
const hrNameSelect = ref(false);
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
  const hrDetail = hrDetailList.value.filter(item => item.id === e)[0];
  addCustomerTrackHRInfo.value = {
    ...hrDetail,
    //@ts-ignore
    brandId: hrDetail?.brandId?.toString().split(",") || [],
    //@ts-ignore
    brandName: hrDetail?.brandName?.split(",") || [],
    address: hrDetail.officeAddress || hrDetail.familyAddress || '',
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
const positionsListOptions = ref<{
  label: string;
  value: string;
}[]>(getPositionsList.value);
watch(getPositionsList, () => {
  positionsListOptions.value = getPositionsList.value;
})
const loading = ref(false);
const handleAddCustomerTrackHRInfo = () => {
  loading.value = true;
  try {
    //@ts-ignore
    addCustomerTrackHRInfo.value.brandName = addCustomerTrackHRInfo.value.brandId?.map(item => {
      return brandListOptions.value?.filter(brand => brand.value === item)[0]?.label;
    }).join(',');
    //@ts-ignore
    addCustomerTrackHRInfo.value.brandId = addCustomerTrackHRInfo.value.brandId?.join(',');
    addCustomerTrackHRInfo.value.positionName = positionsListOptions.value.filter(item => item.value == addCustomerTrackHRInfo.value?.positionId?.toString())[0]?.label;
    customerTrackingStore.addCustomerTrackHRInfoDetail(addCustomerTrackHRInfo.value).then(res => {
      if (res.code == 1) {
        loading.value = false;
      } else {
        loading.value = false;
      }
    });
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}
const handleAddCustomerTrackHRCancel = () => {
  customerTrackingStore.closeAddCustomerTrackHRInfo();
}


</script>

<style lang="less" scoped>

</style>