<template>
 <a-drawer
    v-model:open="outsourceSalaryFlag"
    title="薪资信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="cancelSalaryFlag"/>
    </template>
    <div>
      <a-form :model="outsourceSalaryForm" :label-col="labelCol" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="changeReason" label="调薪原因"
            :rules="[{ required: true, message: '请选择调薪原因' }]">
              <a-select 
              v-model:value="outsourceSalaryForm.changeReason" 
              :options="changeReasonOption"
              ></a-select>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="changeTime" label="生效日期" :rules="[{ required: true, message: '请选择生效日期' }]">
              <a-date-picker v-model:value="outsourceSalaryForm.changeTime"  value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="dixin" label="底薪" :rules="[{ required: true, message: '请填写底薪' }]">
              <a-input v-model:value="outsourceSalaryForm.dixin" @change="handleChangeZonghe"/>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="canbu" label="餐补" :rules="[{ required: false, message: '请填写餐补' }]">
              <a-input v-model:value="outsourceSalaryForm.canbu" @change="handleChangeZonghe"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="jintie" label="津贴" :rules="[{ required: false, message: '请填写津贴' }]">
              <a-input v-model:value="outsourceSalaryForm.jintie" @change="handleChangeZonghe"/>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="quanqin" label="全勤" :rules="[{ required: false, message: '请填写全勤' }]">
              <a-input v-model:value="outsourceSalaryForm.quanqin" @change="handleChangeZonghe"/>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="unit" label="单位" :rules="[{ required: true, message: '请填写单位' }]">
               <a-select 
              v-model:value="outsourceSalaryForm.unit" 
              :options="unitOption"
              ></a-select>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="zonghe" label="总计" :rules="[{ required: true, message: '请填写总计' }]">
              <a-input v-model:value="outsourceSalaryForm.zonghe" readonly/>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="geti" label="个人奖金" :rules="[{ required: true, message: '请填写个人奖金' }]">
              <a-input v-model:value="outsourceSalaryForm.geti"/>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="tuanti" label="团队奖金" :rules="[{ required: true, message: '请填写团队奖金' }]">
              <a-input v-model:value="outsourceSalaryForm.tuanti"/>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="bankName" label="银行名称"
            :rules="[{ required: true, message: '请选择银行名称' }]">
              <a-select
                v-model:value="outsourceSalaryForm.bankName"
                placeholder="请选择银行名称"
                :options="bankNameOption.map(item => ({ value: item.value, label: item.label }))"
              >
                <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0" />
                  <a-space style="padding: 4px 8px">
                  <a-input ref="addBankNameRef" v-model:value="addBankNameOption" placeholder="请输入银行名称" />
                  <a-button type="text" @click="addItemBankName">
                  <template #icon>
                  <plus-outlined />
                </template>
                  新增
                </a-button>
                </a-space>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="bankCard" label="卡号" :rules="[{ required: true, message: '请填写卡号' }]">
              <a-input v-model:value="outsourceSalaryForm.bankCard"/>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: end;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="cancelSalaryFlag">
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
import { defineComponent } from 'vue';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { OutsourceSalaryItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSalaryFlag, outsourceSalaryForm, getOutsourceBankName } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.5));
const labelCol = ref({
  span: 5,
});
const handleChangeZonghe = () => {
  outsourceSalaryForm.value.zonghe = (Number(outsourceSalaryForm.value.dixin || 0) + Number(outsourceSalaryForm.value.canbu || 0) + Number(outsourceSalaryForm.value.jintie || 0) + Number(outsourceSalaryForm.value.quanqin || 0)).toString();
}
const iconLoading = ref(false);

const changeReasonOption = ref([
  {
    label: '入职薪资',
    value: '入职薪资',
  },
]);
const bankNameOption = ref(getOutsourceBankName.value);
watch(getOutsourceBankName, (newVal) => {
  bankNameOption.value = newVal;
});
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});
const addBankNameRef = ref();
const addBankNameOption = ref("");
const addItemBankName = e => {
  e.preventDefault();
  hasDiffDays(addBankNameOption.value);
  outsourceSalaryForm.value.bankName = addBankNameOption.value;
  addBankNameOption.value = '';
  setTimeout(() => {
    addBankNameRef.value?.focus();
  }, 0);
};
const hasDiffDays = (diffDays) => {
  // 添加以下代码，检查并添加选项
    // 1. 检查contractCycleOption是否已包含diffDays + "天"选项
    const hasDiffDaysOption = bankNameOption.value.some(option => option.value === diffDays);
    // 2. 如果不存在，则添加到contractCycleOption中
    if (!hasDiffDaysOption) {
      bankNameOption.value.push({
        label: diffDays,
        value: diffDays,
      });
    }
}
const unitOption = ref([
  {
    label: '月',
    value: '月',
  },
  {
    label: '时',
    value: '时',
  },
]);
const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addOutsourceSalaryByPerson().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceSalaryFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
}
const cancelSalaryFlag = () => {
  outsourceSalaryFlag.value = false;
  outsourceSalaryForm.value = {} as OutsourceSalaryItem;
}
</script>

<style lang="less" scoped>

</style>