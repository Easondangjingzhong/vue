<template>
  <div style='margin-top: 10px;' v-if="customerTrackContractFlag">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
    <a-row :gutter="24">
      <a-col :span="4">
            <a-form-item
              :rules="[{ required: true, message: '请输入HR名字' }]"
              name="hrId"
            >
              <a-select
                v-model:value="formState.hrId"
                placeholder="HR名字"
                :options="optionsContractHrName"
                :allowClear="true"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              :rules="[{ required: true, message: '请输入沟通方式' }]"
              name="contractType"
            >
              <a-select
                v-model:value="formState.contractType"
                placeholder="沟通方式"
                :options="optionsContractType"
                :allowClear="true"
              ></a-select>
            </a-form-item>
          </a-col>
           <a-col :span="4">
            <a-form-item
              :rules="[{ required: true, message: '请输入沟通状态' }]"
              name="contractFlag"
            >
              <a-select
                v-model:value="formState.contractFlag"
                placeholder="沟通状态"
                :options="optionsContactFlag"
                :allowClear="true"
                showSearch
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :rules="[{ required: true, message: '请输入联络时间' }]" name="contractTime">
              <a-date-picker
                v-model:value="formState.contractTime"
                value-format="YYYY-MM-DD HH:mm"
                picker="date"
                :show-time="{ format: 'HH:mm' }"
                placeholder="联络时间"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :rules="[{ required: false, message: '请输入下次联络' }]" name="nextTime">
              <a-date-picker
                v-model:value="formState.nextTime"
                value-format="YYYY-MM-DD HH:mm"
                picker="date"
                :show-time="{ format: 'HH:mm' }"
                placeholder="下次联络"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4" style="line-height: 2.4;">
            <a-button type="primary" size="small" :loading="iconLoading" html-type="submit">保存</a-button>
            <a-button size="small" style="margin-left: 5px;" @click="openAddCustomerTrackContract">取消</a-button>
          </a-col>
        </a-row>
    <a-row :gutter="24">
      <a-col :span="20">
            <a-form-item :rules="[{ required: true, message: '请输入联络记录' }]" name="contractDetail">
              <a-textarea
                :rows="4"
                v-model:value="formState.contractDetail"
                placeholder="请输入联络记录"
              ></a-textarea>
            </a-form-item>
          </a-col>
    </a-row>
    </a-form>
  </div>
  <div class="customerTrackContract" v-if="getCustomerTrackContract.length > 0">
<div style='padding: 10px;' v-for="(item,index) in getCustomerTrackContract" :key="item.hrId">
  <a-row :gutter="24">
    <a-col :span="1">{{ (customerTrackContractPage.pageNumber - 1) * customerTrackContractPage.pageSize + index+1 }}</a-col>
    <a-col :span="3"><strong>{{ item.hrName }}</strong></a-col>
    <a-col :span="4">
      {{ item.contractType }} -
      <a-tag v-if="item.contractFlag == '日常联系'" color="orange">{{ item.contractFlag }}</a-tag>
      <a-tag v-if="item.contractFlag == '项目跟进'" color="pink">{{ item.contractFlag }}</a-tag>
      <a-tag v-if="item.contractFlag == '信息记录'" color="cyan">{{ item.contractFlag }}</a-tag>
    </a-col>
    <a-col :span="4"><span v-if="item.contractTime">联络时间-</span>{{ item.contractTime }}</a-col>
    <a-col :span="11"><span v-if="item.nextTime">下次联系-</span>{{ item.nextTime }}</a-col>
    <a-col :span="1" style="text-align: right;">
      <PlusOutlined v-if="index == 0" @click="openAddCustomerTrackContract"/>
    </a-col>
  </a-row>
  <a-row :gutter="24" style='margin-top: 10px;'>
    <a-col :span="16" style="padding-left: 52px;">
      {{ item.contractDetail }}
    </a-col>
  </a-row>
  <!-- <a-row :gutter="24" style='margin-top: 10px;'>
    <a-col :span="15" style="padding-left: 52px;text-align: right;">
      {{ item.contractTime }} {{ item.createUser }}
    </a-col>
  </a-row> -->
</div>
 <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="customerTrackContractPage.pageNumber"
        :pageSize="customerTrackContractPage.pageSize"
        @change="handleCustomerTrackContract"
        :total="customerTrackContractPage.total"
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
import { PlusOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { CustomerTrackContractItem } from '/@/api/customerTracking/model';
import {contactFlagOptionsArr,contractTypeOptionsArr} from '/@/api/customerTracking/constants';
import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
const customerTrackingStore = useCustomerTrackingStoreWithOut();
const { getCustomerTrackContract,customerTrackContractPage,getCustomerTrackHr,customerTrackContractFlag } = storeToRefs(customerTrackingStore);
const handleCustomerTrackContract = () => {
  customerTrackingStore.queryCustomerTrackContract();
}
handleCustomerTrackContract();
const formState = ref<CustomerTrackContractItem>({
  id: '',
  hrName: '',
  hrId: '',
  contractType: '',
  contractFlag: '',
  contractTime: '',
  nextTime: '',
  contractDetail: '',
  createTime: '',
  createUser: '',
});
const iconLoading = ref(false);
const optionsContractType = ref(contractTypeOptionsArr);
const optionsContactFlag = ref(contactFlagOptionsArr);
const optionsContractHrName = ref(getCustomerTrackHr.value.map((item) => ({
  label: item.hrName,
  value: item.id,
})));
watch(() => getCustomerTrackHr.value, (newVal) => {
  optionsContractHrName.value = newVal.map((item) => ({
    label: item.hrName,
    value: item.id,
  }))
})

const onFinish = () => {
  iconLoading.value = true;
  formState.value.hrName = getCustomerTrackHr.value.filter(item => item.id.toString() == formState.value.hrId)[0].hrName;
  customerTrackingStore.addCustomerTrackContract(formState.value).then(res => {
    if (res.code == 1) {
      formState.value = {
        id: '',
        hrName: '',
        hrId: '',
        contractType: '',
        contractFlag: '',
        contractTime: '',
        nextTime: '',
        contractDetail: '',
        createTime: '',
        createUser: '',
      };
    }
    iconLoading.value = false;
  });
}
const openAddCustomerTrackContract = () => {
  customerTrackContractFlag.value = !customerTrackContractFlag.value;
}
</script>

<style lang="less" scoped>
.customerTrackContract{
  box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 0.07292rem;
    line-height: 1.5714285714285714;
    list-style: none;
    border-radius: 8px;
    border: 0.666667px solid #0505050f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
}
</style>