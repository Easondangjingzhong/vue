<template>
 <a-drawer
    v-model:open="outsourceAttendFlag"
    title="外包考勤"
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
      <a-form :label-col="labelCol" :model="outsourceAttendForm" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="姓名">{{outsourceAttendForm.userNameCn}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="公司">{{outsourceAttendForm.companyName}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="品牌">{{outsourceAttendForm.brand}}</a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="城市">{{outsourceAttendForm.city}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="性质">{{outsourceAttendForm.jobType}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="状态">
              <a-tag v-if="outsourceAttendForm.currentStatus === '2'" color="green">在职</a-tag>
              <a-tag v-if="outsourceAttendForm.currentStatus === '3'" color="red">离职</a-tag>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="quanqinHours" label="全勤工时" :rules="[{ required: false, message: '请输入全勤工时' }]">
              <a-input v-model:value="outsourceAttendForm.quanqinHours" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
           <a-form-item name="isYugu" label="预估工时" :rules="[{ required: true, message: '请选择当前状态' }]">
              <a-select v-model:value="outsourceAttendForm.isYugu" placeholder="请选择预估工时">
                <a-select-option value="是">是</a-select-option>
                <a-select-option value="否">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="yearAndMonth" label="计薪月" :rules="[{ required: false, message: '请输入计薪月' }]">
              <a-input v-model:value="outsourceAttendForm.yearAndMonth" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
             <a-form-item label="工时标识" :colon="false">工时</a-form-item>
          </a-col>
          <a-col :span="4" class="outsourceAttendCol">倍数</a-col>
          <a-col :span="8" class="outsourceAttendCol">
             <a-form-item label="工时标识" :colon="false">工时</a-form-item>
          </a-col>
          <a-col :span="4" class="outsourceAttendCol">倍数</a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="lastMonthYuHours" label="上月预估" :rules="[{ required: false, message: '请输入上月预估' }]">
              <a-input v-model:value="outsourceAttendForm.lastMonthYuHours" @change="handleTotalChaHours"/>
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="lastMonthShiHours" label="上月实际" :rules="[{ required: false, message: '请输入上月预估' }]">
              <a-input v-model:value="outsourceAttendForm.lastMonthShiHours" @change="handleTotalChaHours"/>
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="currentMonthYuHours" label="本月预估" :rules="[{ required: false, message: '请输入本月预估' }]">
              <a-input v-model:value="outsourceAttendForm.currentMonthYuHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="currentMonthShiHours" label="本月实际" :rules="[{ required: false, message: '请输入本月实际' }]">
              <a-input v-model:value="outsourceAttendForm.currentMonthShiHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="totalChaHours" label="累计差额" :rules="[{ required: false, message: '请输入累计差额' }]">
              <a-input v-model:value="outsourceAttendForm.totalChaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="overHours" label="正常加班" :rules="[{ required: false, message: '请输入正常加班' }]">
              <a-input v-model:value="outsourceAttendForm.overHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="overDouble" :rules="[{ required: false, message: '请输入加班倍数' }]">
             <a-input v-model:value="outsourceAttendForm.overDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="holidayOverHours" label="国定加班" :rules="[{ required: false, message: '请输入国定加班' }]">
              <a-input v-model:value="outsourceAttendForm.holidayOverHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="holidayOverDouble" :rules="[{ required: false, message: '请输入国定加班倍数' }]">
             <a-input v-model:value="outsourceAttendForm.holidayOverDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="restOverHours" label="休息加班" :rules="[{ required: false, message: '请输入休息加班' }]">
              <a-input v-model:value="outsourceAttendForm.restOverHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="restOverDouble" :rules="[{ required: false, message: '请输入休息加班倍数' }]">
             <a-input v-model:value="outsourceAttendForm.restOverDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="daixinBingjiaHours" label="带薪病假" :rules="[{ required: false, message: '请输入带薪病假' }]">
              <a-input v-model:value="outsourceAttendForm.daixinBingjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="daixinBingjiaDouble" :rules="[{ required: false, message: '请输入带薪病假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.daixinBingjiaDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="kouxinBingjiaHours" label="扣薪病假" :rules="[{ required: false, message: '请输入扣薪病假' }]">
              <a-input v-model:value="outsourceAttendForm.kouxinBingjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="kouxinBingjiaDouble" :rules="[{ required: false, message: '请输入扣薪病假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.kouxinBingjiaDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="otherDaixinHours" label="其它带薪" :rules="[{ required: false, message: '请输入其它带薪' }]">
              <a-input v-model:value="outsourceAttendForm.otherDaixinHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="otherDaixinDouble" :rules="[{ required: false, message: '请输入其它带薪倍数' }]">
             <a-input v-model:value="outsourceAttendForm.otherDaixinDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="shijiaHours" label="事假" :rules="[{ required: false, message: '请输入事假' }]">
              <a-input v-model:value="outsourceAttendForm.shijiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="shijiaDouble" :rules="[{ required: false, message: '请输入事假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.shijiaDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="nianjianHours" label="年假" :rules="[{ required: false, message: '请输入年假' }]">
              <a-input v-model:value="outsourceAttendForm.nianjianHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="nianjianDouble" :rules="[{ required: false, message: '请输入年假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.nianjianDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="hunjiaHours" label="婚假" :rules="[{ required: false, message: '请输入婚假' }]">
              <a-input v-model:value="outsourceAttendForm.hunjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="hunjiaDouble" :rules="[{ required: false, message: '请输入婚假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.hunjiaDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="sanjiaHours" label="丧假" :rules="[{ required: false, message: '请输入丧假' }]">
              <a-input v-model:value="outsourceAttendForm.sanjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="sanjiaDouble" :rules="[{ required: false, message: '请输入丧假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.sanjiaDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="utHours" label="UT" :rules="[{ required: false, message: '请输入UT' }]">
              <a-input v-model:value="outsourceAttendForm.utHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="utDouble" :rules="[{ required: false, message: '请输入UT倍数' }]">
             <a-input v-model:value="outsourceAttendForm.utDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="lateHours" label="迟到" :rules="[{ required: false, message: '请输入迟到' }]">
              <a-input v-model:value="outsourceAttendForm.lateHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4"></a-col>
          <a-col :span="8">
            <a-form-item name="isQuanqin" label="全勤" :rules="[{ required: false, message: '请输入全勤' }]">
              <a-select v-model:value="outsourceAttendForm.isQuanqin" placeholder="请选择全勤">
                <a-select-option value="是">是</a-select-option>
                <a-select-option value="否">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4"></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
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
import { OutsourceAttendItem } from '/@/api/outsourceDetail/model';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceAttendFlag,outsourceAttendForm } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.4));
const labelCol = {
  span: 9,
};
const iconLoading = ref(false);
const handleClose = () => {
  outsourceAttendFlag.value = false;
  outsourceAttendForm.value = {} as OutsourceAttendItem;
}
const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.updateOutsourceAttend().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceAttendFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
}
const handleTotalChaHours = () => {
  outsourceAttendForm.value.totalChaHours = (parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0') -
    parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') + parseFloat(outsourceAttendForm.value.totalChaHours || '0')).toString();
}
</script>

<style lang="less" scoped>
:deep(.outsourceAttendCol .ant-form-item) {
  margin-bottom: 0;
}
</style>