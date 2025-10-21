<template>
 <a-drawer
    v-model:open="outsourceContractFlag"
    title="合同信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerContractWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseContract" />
    </template>
    <div>
      <a-form :model="outsourceContractForm" :label-col="labelCol" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
             <a-form-item name="offerTime" label="OFFER日期" :rules="[{ required: true, message: '请选择OFFER日期' }]">
              <a-date-picker v-model:value="outsourceContractForm.offerTime"  value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="offerSign" label="OFFER" :rules="[{ required: true, message: '请选择OFFER' }]">
              <a-select v-model:value="outsourceContractForm.offerSign" :options="offerSignOption"></a-select>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="contractType" label="合同类型"
            :rules="[{ required: false, message: '请选择合同类型' }]">
              <a-select 
              v-model:value="outsourceContractForm.contractType" 
              :options="contractTypeOption"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="signType" label="签署类型" :rules="[{ required: false, message: '请选择签署类型' }]">
              <a-select v-model:value="outsourceContractForm.signType" :options="signTypeOption"></a-select>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24">
           <a-col :span="12">
            <a-form-item name="contractFlag" label="签署状态" :rules="[{ required: false, message: '请选择签署状态' }]">
              <a-select v-model:value="outsourceContractForm.contractFlag" :options="contractFlagOption"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="contractStatus" label="合同状态" :rules="[{ required: false, message: '请选择合同状态' }]">
              <a-select v-model:value="outsourceContractForm.contractStatus" :options="contractStatusOption"></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="outsourceContractForm.contractStatus === '已失效'">
           <a-col :span="12">
            <a-form-item name="loseReason" label="失效原因" :rules="[{ required: true, message: '请选择失效原因' }]">
              <a-select v-model:value="outsourceContractForm.loseReason" :options="loseReasonOption"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="loseDate" label="失效日期" :rules="[{ required: true, message: '请选择失效日期' }]">
              <a-date-picker v-model:value="outsourceContractForm.loseDate"  value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
           <a-col :span="12">
            <a-form-item name="signCompany" label="签署公司" :rules="[{ required: false, message: '请选择签署公司' }]">
              <a-select v-model:value="outsourceContractForm.signCompany" :options="signCompanyOption"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="signDate" label="签署日期" :rules="[{ required: false, message: '请选择签署日期' }]">
              <a-date-picker v-model:value="outsourceContractForm.signDate"  value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
         <a-col :span="12">
            <a-form-item name="startDate" label="合同开始" :rules="[{ required: false, message: '请选择合同开始' }]">
               <a-date-picker v-model:value="outsourceContractForm.startDate" @change="handleStartDateChange" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="contractCycle" label="合同周期" :rules="[{ required: false, message: '请选择合同周期' }]">
              <a-select v-model:value="outsourceContractForm.contractCycle" :options="contractCycleOption" @change="handleContractCycleChange"></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="endDate" label="合同结束" :rules="[{ required: false, message: '请选择合同结束' }]">
              <a-input v-if="outsourceContractForm.contractCycle == '长期'" disabled v-model:value="outsourceContractForm.endDate" placeholder="长期" />
              <a-date-picker v-else v-model:value="outsourceContractForm.endDate"  @change="handleEndDateChange" value-format="YYYY-MM-DD"/> 
            </a-form-item>
          </a-col>
          <a-col :span="12" style="text-align: right;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="handleColseContract">
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
import { PersonContractItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceContractFlag, outsourceContractForm } = storeToRefs(outsourceDetailStore);
const drawerContractWidth = ref(Math.max(600, window.innerWidth * 0.5));
const labelCol = {
  span: 6,
};
const iconLoading = ref(false);

const loseReasonOption = ref([
  {
    label: '主动离职',
    value: '主动离职',
  },
  {
    label: '客户发起',
    value: '客户发起',
  },
  {
    label: '合同到期',
    value: '合同到期',
  },
]);
const contractStatusOption = ref([
  {
    label: '生效中',
    value: '生效中',
  },
  {
    label: '已失效',
    value: '已失效',
  },
]);
const contractFlagOption = ref([
  {
    label: '等待发起',
    value: '等待发起',
  },
  {
    label: '已经发起',
    value: '已经发起',
  },
  {
    label: '签署完成',
    value: '签署完成',
  },
]);
const offerSignOption = ref([
  {
    label: '等待发起',
    value: '等待发起',
  },
  {
    label: '已经发起',
    value: '已经发起',
  },
  {
    label: '签署完成',
    value: '签署完成',
  },
]);
const contractTypeOption = ref([
  {
    label: '全职合同',
    value: '全职合同',
  },
  {
    label: '兼职合同',
    value: '兼职合同',
  },
]);
const signTypeOption = ref([
  {
    label: '入职签署',
    value: '入职签署',
  },
  {
    label: '合同续签',
    value: '合同续签',
  },
]);
const signCompanyOption = ref([
  {
    label: '北京博瑞',
    value: '北京博瑞',
  },
  {
    label: '北京我推',
    value: '北京我推',
  },
]);
const contractCycleOption = ref([
  {
    label: '长期',
    value: '长期',
  },
  {
    label: '1个月',
    value: '1个月',
  },
  {
    label: '2个月',
    value: '2个月',
  },
  {
    label: '3个月',
    value: '3个月',
  },
  {
    label: '6个月',
    value: '6个月',
  },
  {
    label: '1年',
    value: '1年',
  },
]);

const handleContractCycleChange = () => {
  if (outsourceContractForm.value.contractCycle && outsourceContractForm.value.contractCycle != '长期' && outsourceContractForm.value.startDate) {
    const cycle = outsourceContractForm.value.contractCycle;
    const startDate = new Date(outsourceContractForm.value.startDate);
    
    // 深拷贝一个新的日期对象以避免修改原始日期
    const endDate = new Date(startDate.getTime());
    
    // 根据合同周期类型计算结束日期
    if (cycle.includes('天')) {
      // 处理天数
      const days = parseInt(cycle);
      endDate.setDate(endDate.getDate() + days); // 减1是因为当天算在内
    } else if (cycle.includes('月')) {
      // 处理月数
      const months = parseInt(cycle);
      endDate.setMonth(endDate.getMonth() + months);
      // 处理月底边界情况（例如从3月31日加1个月不应是4月31日，而应是4月30日）
      if (endDate.getDate() !== startDate.getDate()) {
        endDate.setDate(0); // 设置为前一个月的最后一天
      }
    } else if (cycle.includes('年')) {
      // 处理年数
      const years = parseInt(cycle);
      endDate.setFullYear(endDate.getFullYear() + years);
    }
    // 格式化为YYYY-MM-DD格式并更新表单
    endDate.setDate(endDate.getDate() - 1);
    const formattedEndDate = endDate.toISOString().split('T')[0];
    outsourceContractForm.value.endDate = formattedEndDate;
  } else if (outsourceContractForm.value.contractCycle == '长期') {
    outsourceContractForm.value.endDate = '长期';
  }
}
watch(() => outsourceContractForm.value.contractCycle, (newVal, oldVal) => {
  if (newVal != oldVal) {
    hasDiffDays(outsourceContractForm.value.contractCycle);
  }
});
const handleStartDateChange = () => {
  if (outsourceContractForm.value.contractCycle != '长期') {
    handleContractCycleChange();
  }
}
const handleEndDateChange = () => {
  if (outsourceContractForm.value.startDate && outsourceContractForm.value.endDate) {
    const startDate = new Date(outsourceContractForm.value.startDate);
    const endDate = new Date(outsourceContractForm.value.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    outsourceContractForm.value.contractCycle = diffDays + "天";
    hasDiffDays(diffDays + "天");
  }
}
const hasDiffDays = (diffDays) => {
  // 添加以下代码，检查并添加选项
    // 1. 检查contractCycleOption是否已包含diffDays + "天"选项
    const hasDiffDaysOption = contractCycleOption.value.some(option => option.value === diffDays);
    // 2. 如果不存在，则添加到contractCycleOption中
    if (!hasDiffDaysOption) {
      contractCycleOption.value.push({
        label: diffDays,
        value: diffDays,
      });
    }
}
const handleColseContract = () => {
  outsourceContractFlag.value = false;
  outsourceContractForm.value = {} as PersonContractItem;
}
const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addOutsourcePersonContract().then(res => {
    if (res.code == 1) {
      message.success('新增成功');
      handleColseContract();
      iconLoading.value = false;
    } else {
      message.error('新增失败');
      iconLoading.value = false;
    }
  });
}
</script>

<style lang="less" scoped>

</style>