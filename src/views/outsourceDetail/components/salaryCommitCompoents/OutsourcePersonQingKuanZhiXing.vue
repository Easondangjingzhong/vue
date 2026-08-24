<template>
  <div style="margin-bottom: 5px;margin-top: 5px; display: flex; justify-content: flex-end;">
    <a-select
      v-model:value="collectionFilter"
      allow-clear
      placeholder="请选择回款状态"
      style="width: 100px;"
    >
      <a-select-option value="已回">已回</a-select-option>
      <a-select-option value="待回">待回</a-select-option>
    </a-select>
  </div>
  <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="false"
      :columns="columns"
      :dataSource="filteredQingKuanZhixingMonth"
    >
   <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'zhangdanFlag'" :color="record.zhangdanFlag === '1' ? 'green' : 'orange'">{{ record.zhangdanFlag === '1' ? '已生成' : '待生成' }}</a-tag>
      <a-tag v-if="column.key === 'sendHr' && record.zhangdanFlag === '1'" :color="record.sendHr ? 'green' : 'orange'">{{ record.sendHr ? '已发' : '待发' }}</a-tag>
      <a-tag v-if="column.key === 'hrSure' && record.sendHr" :color="record.hrSure ? 'green' : 'orange'">{{ record.hrSure ? '已确认' : '待确认' }}</a-tag>
      <a-tag v-if="column.key === 'invoiceFlag' && record.hrSure" :color="record.invoiceFlag ? 'green' : 'orange'">{{ record.invoiceFlag ? '已开' : '待开' }}</a-tag>
      <a-tag v-if="column.key === 'collectionFlag' && record.invoiceFlag" :color="record.collectionFlag ? 'green' : 'orange'">{{ record.collectionFlag ? '已回' : '待回' }}</a-tag>
      <template v-if="column.key === 'excelPath' && record.excelPath">
        <a-button type="primary" size="small" @click="handleDownload(record.excelPath)">下载</a-button>
        <a-button type="primary" size="small" style="margin-left: 8px;" @click="handlePreview(record.excelPath)">预览</a-button>
      </template>
      <template v-if="column.key === 'totalCharge'">
        {{ record.totalCharge }}
        <!-- <span v-if="record.invoiceMoney">{{ record.invoiceMoney }}</span>
        <span v-else>{{ record.totalCharge }}</span> -->
      </template>
      <template v-if="column.key === 'operation'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                 <a href="javascript:;" @click.prevent="handleUpdateZhanDan(record)">更新账单</a>
                </a-menu-item>
                <a-menu-item v-if="record.zhangdanFlag === '1' && !record.sendHr">
                 <a href="javascript:;" @click.prevent="handleOpenSendHr(record)">发送HR</a>
                </a-menu-item>
                <a-menu-item v-if="record.sendHr && !record.hrSure">
                 <a href="javascript:;" @click.prevent="handleOpenHrConfirm(record)">HR确认</a>
                </a-menu-item>
                <a-menu-item v-if="record.hrSure && !record.invoiceFlag">
                 <a href="javascript:;" @click.prevent="handleOpenInvoiceFen(record)">分函</a>
                </a-menu-item>
                <a-menu-item v-if="record.hrSure && !record.invoiceFlag">
                 <a href="javascript:;" @click.prevent="handleOpenInvoice(record)">开票</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
     </template>
    </template>
    <template #summary>
      <a-table-summary-row>
        <a-table-summary-cell :index="0" :colSpan="5">
          总计
        </a-table-summary-cell>
        <a-table-summary-cell :index="5">
          {{ tableSummary.peopleNum }}
        </a-table-summary-cell>
        <a-table-summary-cell :index="6">
          {{ tableSummary.totalCharge.toFixed(2) }}
        </a-table-summary-cell>
        <a-table-summary-cell :index="7" :colSpan="7" />
      </a-table-summary-row>
    </template>
  </a-table>

  <a-modal
    v-model:open="sendHrModalOpen"
    title="发送HR"
    :confirm-loading="sendHrSubmitting"
    @ok="handleSubmitSendHr"
    @cancel="handleCloseSendHr"
  >
    <a-form layout="vertical">
      <a-form-item label="发送HR">
        <a-select
          v-model:value="sendHrForm.sendHr"
          placeholder="请选择HR状态"
          show-search
          allow-clear
          :options="hrOptions"
        />
      </a-form-item>
      <a-form-item label="发送日期">
        <a-date-picker
          v-model:value="sendHrForm.sendTime"
          value-format="YYYY-MM-DD"
          placeholder="请选择发送日期"
          style="width: 100%;"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:open="hrConfirmModalOpen"
    title="HR确认"
    :confirm-loading="hrConfirmSubmitting"
    @ok="handleSubmitHrConfirm"
    @cancel="handleCloseHrConfirm"
  >
    <a-form layout="vertical">
      <a-form-item label="确认状态">
        <a-select v-model:value="hrConfirmForm.hrSure" placeholder="请选择确认状态" :options="hrConfirmOptions" />
      </a-form-item>
      <a-form-item label="确认日期">
        <a-date-picker
          v-model:value="hrConfirmForm.sureTime"
          value-format="YYYY-MM-DD"
          placeholder="请选择确认日期"
          style="width: 100%;"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:open="invoiceModalOpen"
    title="开票"
    :width="700"
    @cancel="handleCloseInvoice"
  >
    <template #footer>
      <a-button @click="handleCloseInvoice">取消</a-button>
      <a-button v-if="currentStep === 2" @click="currentStep = 1">上一步</a-button>
      <a-button v-if="currentStep === 1" type="primary" @click="handleNextStep">下一步</a-button>
      <a-button v-if="currentStep === 2" type="primary" :loading="invoiceSubmitting" @click="handleSubmitInvoice">确定</a-button>
    </template>

    <div v-show="currentStep === 1">
      <a-form layout="vertical">
        <a-form-item label="选择人员" v-if="availablePersonList.length > 0">
          <a-checkbox-group v-model:value="selectedSalaryIds" style="width: 100%;" @change="onPersonSelectionChange('invoice')">
            <a-row>
              <a-col :span="8" v-for="person in availablePersonList" :key="person.salaryId" style="margin-bottom: 8px;">
                <a-checkbox :value="person.salaryId">
                  {{ person.userNameCn }}{{ person.userNameEn ? '(' + person.userNameEn + ')' : '' }} - ￥{{ person.totalCharge }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
          <div style="text-align: right; font-weight: bold; margin-top: 8px;">
            已选金额合计: ￥{{ selectedTotalCharge }}
          </div>
        </a-form-item>
        <div v-else style="text-align: center; padding: 20px; color: #999;">
          当前没有可选择的人员，请直接点击下一步。
        </div>
      </a-form>
    </div>

    <div v-show="currentStep === 2">
      <a-form layout="vertical">
        <a-row :gutter="24">
          <a-col :span="12">
          <a-form-item label="开票公司">
            <a-input v-model:value="invoiceForm.invoiceCompany" placeholder="请输入开票公司" style="width: 100%;" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="类型">
            <a-select v-model:value="invoiceForm.invoiceType" placeholder="请选择类型" :options="invoiceTypeOptions" style="width: 100%;" />
          </a-form-item>
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="12">
       <a-form-item label="客户">
        <a-input v-model:value="invoiceForm.kehuName" placeholder="请输入客户" />
      </a-form-item>
      </a-col>
      <a-col :span="12">
      <a-form-item label="开票日期">
        <a-date-picker
          v-model:value="invoiceForm.invoiceTime"
          value-format="YYYY-MM-DD"
          placeholder="请选择开票日期"
           @change="handleInvoiceMoneyChange"
          style="width: 100%;"
        />
      </a-form-item>
      </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="12">
      <a-form-item label="发票号码">
        <a-input v-model:value="invoiceForm.invoiceNumber" placeholder="请输入发票号码" />
      </a-form-item>
      </a-col>
      <a-col :span="12">
       <a-form-item label="开票金额">
        <a-input v-model:value="invoiceForm.invoiceMoney" @change="handleInvoiceMoneyChange" placeholder="请输入开票金额" />
      </a-form-item>
      </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="12">
       <a-form-item label="开票税率">
        <a-input v-model:value="invoiceForm.taxRate" placeholder="请输入开票税率" />
      </a-form-item>
       </a-col>
      <a-col :span="12">
       <a-form-item label="开票税额">
        <a-input v-model:value="invoiceForm.taxMoney" placeholder="请输入开票税额" />
      </a-form-item>
      </a-col>
      </a-row>
       <a-form-item label="税后金额">
        <a-input v-model:value="invoiceForm.invoiceMoneyAfter" placeholder="请输入开票金额（含税）" />
      </a-form-item>
      <a-form-item label="上传附件">
        <a-upload-dragger
          v-model:file-list="invoiceFileList"
          name="file"
          :multiple="false"
          accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
          :before-upload="beforeInvoiceUpload"
          @remove="handleInvoiceRemove"
        >
          <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p class="ant-upload-hint">仅支持 .pdf/.jpg/.png/.xls/.xlsx</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form>
    </div>
  </a-modal>

  <a-modal
    v-model:open="invoiceFenModalOpen"
    title="分函"
    :width="700"
    @cancel="handleCloseInvoiceFen"
  >
    <template #footer>
      <a-button @click="handleCloseInvoiceFen">取消</a-button>
      <a-button v-if="currentStep === 2" @click="currentStep = 1">上一步</a-button>
      <a-button v-if="currentStep === 1" type="primary" @click="handleNextStep">下一步</a-button>
      <a-button v-if="currentStep === 2" type="primary" :loading="invoiceFenSubmitting" @click="handleSubmitInvoiceFen">确定</a-button>
    </template>

    <div v-show="currentStep === 1">
      <a-form layout="vertical">
        <a-form-item label="选择人员" v-if="availablePersonList.length > 0">
          <a-checkbox-group v-model:value="selectedSalaryIds" style="width: 100%;" @change="onPersonSelectionChange('invoiceFen')">
            <a-row>
              <a-col :span="8" v-for="person in availablePersonList" :key="person.salaryId" style="margin-bottom: 8px;">
                <a-checkbox :value="person.salaryId">
                  {{ person.userNameCn }}{{ person.userNameEn ? '(' + person.userNameEn + ')' : '' }} - ￥{{ person.totalCharge }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
          <div style="text-align: right; font-weight: bold; margin-top: 8px;">
            已选金额合计: ￥{{ selectedTotalCharge }}
          </div>
        </a-form-item>
        <div v-else style="text-align: center; padding: 20px; color: #999;">
          当前没有可选择的人员，请直接点击下一步。
        </div>
      </a-form>
    </div>

    <div v-show="currentStep === 2">
      <a-form layout="vertical">
        <a-row :gutter="24">
          <a-col :span="12">
      <a-form-item label="销方">
        <a-input v-model:value="invoiceFenForm.invoiceCompany" disabled placeholder="请输入销方" />
      </a-form-item>
        </a-col>
        <a-col :span="12">
       <a-form-item label="类型">
        <a-select v-model:value="invoiceFenForm.invoiceType" placeholder="请选择类型" :options="invoiceTypeOptions" />
      </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
      <a-form-item label="客户">
        <a-input v-model:value="invoiceFenForm.kehuName" disabled placeholder="请输入客户" />
      </a-form-item>
       </a-col>
        <a-col :span="12">
      <a-form-item label="开票日期">
        <a-date-picker
          v-model:value="invoiceFenForm.invoiceTime"
          value-format="YYYY-MM-DD"
          placeholder="请选择开票日期"
          @change="handleInvoiceFenMoneyChange"
          style="width: 100%;"
        />
      </a-form-item>
       </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
      <a-form-item label="发票号码">
        <a-input v-model:value="invoiceFenForm.invoiceNumber" placeholder="请输入发票号码" />
      </a-form-item>
      </a-col>
        <a-col :span="12">
      <a-form-item label="开票金额">
        <a-input v-model:value="invoiceFenForm.invoiceMoney" @change="handleInvoiceFenMoneyChange" placeholder="请输入开票金额" />
      </a-form-item>
      </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="12">
      <a-form-item label="开票税率">
        <a-input v-model:value="invoiceFenForm.taxRate" disabled placeholder="请输入开票税率" />
      </a-form-item>
       </a-col>
        <a-col :span="12">
       <a-form-item label="税额">
        <a-input v-model:value="invoiceFenForm.taxMoney" disabled placeholder="请输入税额" />
      </a-form-item>
      </a-col>
      </a-row>
      <a-form-item label="税后金额">
        <a-input v-model:value="invoiceFenForm.invoiceMoneyAfter" disabled placeholder="请输入税后金额" />
      </a-form-item>
      <a-form-item label="上传附件">
        <a-upload-dragger
          v-model:file-list="invoiceFenFileList"
          name="file"
          :multiple="false"
          accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
          :before-upload="beforeInvoiceFenUpload"
          @remove="handleInvoiceFenRemove"
        >
          <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p class="ant-upload-hint">仅支持 .pdf/.jpg/.png/.xls/.xlsx</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form>
    </div>
  </a-modal>
   <a-drawer
    v-model:open="orginalPathBlobPathFlag"
    title="文件预览"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="closeDrawer" />
    </template>
    <div>
      <OrginalPath :orginalPathBlobPath="orginalPathBlobPath" />
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { TableColumnsType, UploadProps } from 'ant-design-vue';
import { CloseOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import OrginalPath from '/@/components/OrginalPath/index.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceQingKuanZhixingMonth, outsourcePersonSalaryCommitYearAndMonth } =
  storeToRefs(outsourceDetailStore);
const orginalPathBlobPathFlag = ref(false);
const orginalPathBlobPath = ref('');
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const collectionFilter = ref<string>();
const filteredQingKuanZhixingMonth = computed(() => {
  const list = getOutsourceQingKuanZhixingMonth.value || [];
  if (!collectionFilter.value) {
    return list;
  }
  if (collectionFilter.value === '已回') {
    return list.filter((item: any) => item?.invoiceFlag && item?.collectionFlag);
  }
  if (collectionFilter.value === '待回') {
    return list.filter((item: any) => item?.invoiceFlag && !item?.collectionFlag);
  }
  return list;
});
const closeDrawer = () => {
  orginalPathBlobPathFlag.value = false;
  orginalPathBlobPath.value = '';
};
const handlePreview = (excelPath?: string) => {
  if (!excelPath) {
    message.error('文件不存在');
    return;
  }
  const src = /^https?:\/\//i.test(excelPath)
    ? excelPath
    : excelPath.startsWith('/')
    ? new URL(excelPath, window.location.origin).toString()
    : excelPath;
  orginalPathBlobPath.value = src;
  orginalPathBlobPathFlag.value = true;
};
const handleDownload = (excelPath?: string) => {
  if (!excelPath) {
    message.error('文件不存在');
    return;
  }
  const src = /^https?:\/\//i.test(excelPath)
    ? excelPath
    : excelPath.startsWith('/')
    ? new URL(excelPath, window.location.origin).toString()
    : excelPath;
  window.open(src, '_blank');
};
const invoiceTypeOptions = ref([
  { value: '专票', label: '专票' },
  { value: '普票', label: '普票' },
]);

const sendHrModalOpen = ref(false);
const sendHrSubmitting = ref(false);
const sendHrForm = ref<{ sendHr: string; sendTime: string }>({ sendHr: '', sendTime: '' });
const currentRow = ref<any>(null);

const hrConfirmModalOpen = ref(false);
const hrConfirmSubmitting = ref(false);
const hrConfirmForm = ref<{ hrSure: string; sureTime: string }>({ hrSure: '', sureTime: '' });

const invoiceModalOpen = ref(false);
const invoiceSubmitting = ref(false);
const invoiceForm = ref<{
  invoiceFlag: string;
  invoiceTime: string;
  invoiceNumber: string;
  invoiceCompany: string;
  invoiceMoney: string;
  invoiceType: string;
  taxRateShow: string;
  taxRate: string;
  taxMoney: string;
  invoiceMoneyAfter: string;
  kehuName: string;
}>({
  invoiceFlag: '1',
  invoiceTime: '',
  invoiceNumber: '',
  invoiceCompany: '北京博瑞',
  invoiceMoney: '',
  invoiceType: '',
  taxRateShow: '',
  taxRate: '',
  taxMoney: '',
  invoiceMoneyAfter: '',
  kehuName: '',
});
const invoiceFileList = ref<any[]>([]);

const invoiceFenModalOpen = ref(false);
const invoiceFenSubmitting = ref(false);
const availablePersonList = ref<any[]>([]);
const selectedSalaryIds = ref<number[]>([]);

const currentStep = ref(1);

const handleNextStep = () => {
  if (availablePersonList.value.length > 0 && selectedSalaryIds.value.length === 0) {
    message.warning('请至少选择一名人员');
    return;
  }
  currentStep.value = 2;
};

const selectedTotalCharge = computed(() => {
  let total = 0;
  selectedSalaryIds.value.forEach((id) => {
    const person = availablePersonList.value.find((p) => p.salaryId === id);
    if (person && person.totalCharge) {
      total += Number(person.totalCharge);
    }
  });
  return total.toFixed(2);
});
const tableSummary = computed(() => {
  return filteredQingKuanZhixingMonth.value.reduce(
    (acc: { peopleNum: number; totalCharge: number }, item: any) => {
      acc.peopleNum += Number(item?.peopleNum || 0);
      acc.totalCharge += Number(item?.totalCharge || 0);
      return acc;
    },
    { peopleNum: 0, totalCharge: 0 },
  );
});

const onPersonSelectionChange = (type: 'invoice' | 'invoiceFen') => {
  const total = selectedTotalCharge.value;
  if (type === 'invoice') {
    invoiceForm.value.invoiceMoney = total;
    handleInvoiceMoneyChange();
  } else {
    invoiceFenForm.value.invoiceMoney = total;
    handleInvoiceFenMoneyChange();
  }
};

const invoiceFenForm = ref<{
  invoiceFlag: string;
  invoiceTime: string;
  invoiceNumber: string;
  invoiceCompany: string;
  invoiceMoney: string;
  invoiceType: string;
  taxRateShow: string;
  taxRate: string;
  taxMoney: string;
  invoiceMoneyAfter: string;
  kehuName: string;
}>({
  invoiceFlag: '1',
  invoiceTime: '',
  invoiceNumber: '',
  invoiceCompany: '北京博瑞',
  invoiceMoney: '',
  invoiceType: '',
  taxRateShow: '',
  taxRate: '',
  taxMoney: '',
  invoiceMoneyAfter: '',
  kehuName: '',
});
const invoiceFenFileList = ref<any[]>([]);
const currentRowInvoiceFen = ref<any>(null);

const hrOptions = ref([
  {
    value: '1',
    label: '已发',
  },
]);

const hrConfirmOptions = ref([
  { value: '1', label: '已确认' },
]);

const getCollectId = (record: any) => record?.collectId || '';

const beforeInvoiceUpload: UploadProps['beforeUpload'] = (file) => {
  invoiceFileList.value = [file as any];
  return false;
};

const handleInvoiceRemove: UploadProps['onRemove'] = () => {
  invoiceFileList.value = [];
  return true;
};

const beforeInvoiceFenUpload: UploadProps['beforeUpload'] = (file) => {
  invoiceFenFileList.value = [file as any];
  return false;
};

const handleInvoiceFenRemove: UploadProps['onRemove'] = () => {
  invoiceFenFileList.value = [];
  return true;
};

const handleOpenSendHr = async (record: any) => {
  currentRow.value = record;
  sendHrForm.value = {
    sendHr: record?.sendHr || '',
    sendTime: record?.sendTime || '',
  };
  sendHrModalOpen.value = true;
};

const handleCloseSendHr = () => {
  sendHrModalOpen.value = false;
  sendHrSubmitting.value = false;
  sendHrForm.value = { sendHr: '', sendTime: '' };
  currentRow.value = null;
};

const handleOpenHrConfirm = async (record: any) => {
  currentRow.value = record;
  hrConfirmForm.value = {
    hrSure: record?.hrSure || '',
    sureTime: record?.sureTime || '',
  };
  hrConfirmModalOpen.value = true;
};

const handleCloseHrConfirm = () => {
  hrConfirmModalOpen.value = false;
  hrConfirmSubmitting.value = false;
  hrConfirmForm.value = { hrSure: '', sureTime: '' };
  currentRow.value = null;
};

const handleSubmitHrConfirm = async () => {
  const record = currentRow.value;
  const collectId = getCollectId(record);
  if (!collectId) {
    message.error('缺少collectId');
    return;
  }
  if (!hrConfirmForm.value.hrSure) {
    message.error('请选择确认状态');
    return;
  }
  if (!hrConfirmForm.value.sureTime) {
    message.error('请选择确认日期');
    return;
  }
  hrConfirmSubmitting.value = true;
  const res = await outsourceDetailStore.queryOutsourceQingKuanHrConfirm(
    String(collectId),
    hrConfirmForm.value.hrSure,
    hrConfirmForm.value.sureTime,
  );
  hrConfirmSubmitting.value = false;
  if (res && res.code === 1) {
    message.success('操作成功');
    const month = outsourcePersonSalaryCommitYearAndMonth.value || record?.zhiXingMonth || '';
    if (month) {
      outsourceDetailStore.queryOutsourceQingKuanZhixingMonth(month);
    }
    handleCloseHrConfirm();
  } else {
    message.error(res?.msg || '操作失败');
  }
};

const handleSubmitSendHr = async () => {
  const record = currentRow.value;
  const collectId = getCollectId(record);
  if (!collectId) {
    message.error('缺少collectId');
    return;
  }
  if (!sendHrForm.value.sendHr) {
    message.error('请选择HR');
    return;
  }
  if (!sendHrForm.value.sendTime) {
    message.error('请选择发送日期');
    return;
  }
  sendHrSubmitting.value = true;
  const res = await outsourceDetailStore.queryOutsourceQingKuanSendHR(
    String(collectId),
    sendHrForm.value.sendHr,
    sendHrForm.value.sendTime,
  );
  sendHrSubmitting.value = false;
  if (res && res.code === 1) {
    message.success('操作成功');
    const month = outsourcePersonSalaryCommitYearAndMonth.value || record?.zhiXingMonth || '';
    if (month) {
      outsourceDetailStore.queryOutsourceQingKuanZhixingMonth(month);
    }
    handleCloseSendHr();
  } else {
    message.error(res?.msg || '操作失败');
  }
};
const handleInvoiceMoneyChange = () => {
  if (!invoiceForm.value.invoiceMoney) {
    return;
  }
  outsourceDetailStore.queryOutsourceQingKuanCompanyTax("1", invoiceForm.value.invoiceTime).then((res) => {
    if (res && res.code === 1) {
      const info = res.info[0]
      invoiceForm.value.taxRate = ((info.valueAddedTax) * 100 + "%");
      invoiceForm.value.taxRateShow = info.valueAddedTax;
      const invoiceMoneyAfter = Number(invoiceForm.value.invoiceMoney) / (1 + parseFloat(info.valueAddedTax));
      invoiceForm.value.taxMoney = (Number(invoiceForm.value.invoiceMoney) - invoiceMoneyAfter).toFixed(2);
      invoiceForm.value.invoiceMoneyAfter = invoiceMoneyAfter.toFixed(2);
    }
  });
}
const handleOpenInvoice = (record: any) => {
  currentRow.value = record;
  currentStep.value = 1;

  if (record && record.list && Array.isArray(record.list)) {
    availablePersonList.value = record.list.filter((item: any) => !item.invoiceNumber);
  } else {
    availablePersonList.value = [];
  }
  selectedSalaryIds.value = availablePersonList.value.map(p => p.salaryId);

  invoiceForm.value = {
    invoiceFlag: '1',
    invoiceTime: record?.invoiceTime || '',
    invoiceNumber: record?.invoiceNumber || '',
    invoiceCompany: record?.invoiceCompany || '北京博瑞',
    invoiceMoney: selectedTotalCharge.value,
    invoiceType: record?.invoiceType || '',
    taxRateShow: record?.taxRateShow || '',
    taxRate: record?.taxRate || '',
    taxMoney: record?.taxMoney || '',
    invoiceMoneyAfter: record?.invoiceMoneyAfter || '',
    kehuName: record?.companyName || '',
  };
  invoiceFileList.value = [];
  invoiceModalOpen.value = true;
  handleInvoiceMoneyChange();
};

const handleCloseInvoice = () => {
  invoiceModalOpen.value = false;
  invoiceSubmitting.value = false;
  invoiceForm.value = {
    invoiceFlag: '1',
    invoiceTime: '',
    invoiceNumber: '',
    invoiceCompany: '北京博瑞',
    invoiceMoney: '',
    invoiceType: '',
    taxRateShow: '',
    taxRate: '',
    taxMoney: '',
    invoiceMoneyAfter: '',
    kehuName: '',
  };
  invoiceFileList.value = [];
  currentRow.value = null;
};

const handleSubmitInvoice = async () => {
  if (availablePersonList.value.length > 0 && selectedSalaryIds.value.length === 0) {
    message.warning('请至少选择一名人员');
    return;
  }
  const record = currentRow.value;
  const collectId = getCollectId(record);
  if (!collectId) {
    message.error('缺少collectId');
    return;
  }
  if (!invoiceForm.value.invoiceTime) {
    message.error('请选择开票日期');
    return;
  }
  if (!invoiceForm.value.invoiceNumber) {
    message.error('请输入发票号码');
    return;
  }
  if (!invoiceForm.value.invoiceCompany) {
    message.error('请输入开票公司');
    return;
  }
  const fileObj = invoiceFileList.value?.[0]?.originFileObj || invoiceFileList.value?.[0];
  if (!fileObj) {
    message.error('请上传附件');
    return;
  }

  invoiceSubmitting.value = true;
  const res = await outsourceDetailStore.queryOutsourceQingKuanInvoice(
    String(collectId),
    invoiceForm.value.invoiceFlag,
    invoiceForm.value.invoiceTime,
    invoiceForm.value.invoiceNumber,
    invoiceForm.value.invoiceCompany,
    invoiceForm.value.invoiceMoney,
    invoiceForm.value.taxMoney,
    invoiceForm.value.invoiceMoneyAfter,
    invoiceForm.value.taxRateShow,
    invoiceForm.value.invoiceType,
    invoiceForm.value.kehuName,
    fileObj,
    selectedSalaryIds.value.join(','),
  );
  invoiceSubmitting.value = false;
  if (res && res.code === 1) {
    message.success('操作成功');
    const month = outsourcePersonSalaryCommitYearAndMonth.value || record?.zhiXingMonth || '';
    if (month) {
      outsourceDetailStore.queryOutsourceQingKuanZhixingMonth(month);
    }
    handleCloseInvoice();
  } else {
    message.error(res?.msg || '操作失败');
  }
};
const handleInvoiceFenMoneyChange = () => {
  if (!invoiceFenForm.value.invoiceMoney) {
    return;
  }
  outsourceDetailStore.queryOutsourceQingKuanCompanyTax("1", invoiceFenForm.value.invoiceTime).then((res) => {
    if (res && res.code === 1) {
      const info = res.info[0]
      invoiceFenForm.value.taxRate = ((info.valueAddedTax) * 100 + "%");
      invoiceFenForm.value.taxRateShow = info.valueAddedTax;
      const invoiceMoneyAfter = Number(invoiceFenForm.value.invoiceMoney) / (1 + parseFloat(info.valueAddedTax));
      invoiceFenForm.value.taxMoney = (Number(invoiceFenForm.value.invoiceMoney) - invoiceMoneyAfter).toFixed(2);
      invoiceFenForm.value.invoiceMoneyAfter = invoiceMoneyAfter.toFixed(2);
    }
  });
}
const handleOpenInvoiceFen = (record: any) => {
  currentRowInvoiceFen.value = record;
  currentStep.value = 1;

  if (record && record.list && Array.isArray(record.list)) {
    availablePersonList.value = record.list.filter((item: any) => !item.invoiceNumber);
  } else {
    availablePersonList.value = [];
  }
  selectedSalaryIds.value = availablePersonList.value.map(p => p.salaryId);

  invoiceFenForm.value = {
    invoiceFlag: '1',
    invoiceTime: '',
    invoiceNumber: '',
    invoiceCompany: '北京博瑞',
    invoiceMoney: selectedTotalCharge.value,
    kehuName: record?.companyName || '',
    invoiceType: '',
    taxRateShow: '',
    taxRate: '',
    taxMoney: '',
    invoiceMoneyAfter: '',
  };
  invoiceFenFileList.value = [];
  invoiceFenModalOpen.value = true;
  handleInvoiceFenMoneyChange();
};

const handleCloseInvoiceFen = () => {
  invoiceFenModalOpen.value = false;
  invoiceFenSubmitting.value = false;
  invoiceFenForm.value = {
    invoiceFlag: '1',
    invoiceTime: '',
    invoiceNumber: '',
    invoiceCompany: '北京博瑞',
    invoiceMoney: '',
    invoiceType: '',
    taxRateShow: '',
    taxRate: '',
    taxMoney: '',
    invoiceMoneyAfter: '',
    kehuName: '',
  };
  invoiceFenFileList.value = [];
  currentRowInvoiceFen.value = null;
};

const handleSubmitInvoiceFen = async () => {
  if (availablePersonList.value.length > 0 && selectedSalaryIds.value.length === 0) {
    message.warning('请至少选择一名人员');
    return;
  }
  const record = currentRowInvoiceFen.value;
  const oldCollectId = getCollectId(record);
  if (!oldCollectId) {
    message.error('缺少oldCollectId');
    return;
  }
  if (!invoiceFenForm.value.invoiceTime) {
    message.error('请选择开票日期');
    return;
  }
  if (!invoiceFenForm.value.invoiceNumber) {
    message.error('请输入发票号码');
    return;
  }
  if (!invoiceFenForm.value.invoiceCompany) {
    message.error('请输入开票公司');
    return;
  }
  if (!invoiceFenForm.value.invoiceMoney) {
    message.error('缺少开票金额');
    return;
  }
  const fileObj = invoiceFenFileList.value?.[0]?.originFileObj || invoiceFenFileList.value?.[0];
  if (!fileObj) {
    message.error('请上传附件');
    return;
  }

  invoiceFenSubmitting.value = true;
  const res = await outsourceDetailStore.queryOutsourceQingKuanInvoiceFen(
    String(oldCollectId),
    invoiceFenForm.value.invoiceFlag,
    invoiceFenForm.value.invoiceTime,
    invoiceFenForm.value.invoiceNumber,
    invoiceFenForm.value.invoiceCompany,
    invoiceFenForm.value.invoiceMoney,
    invoiceFenForm.value.taxMoney,
    invoiceFenForm.value.invoiceMoneyAfter,
    invoiceFenForm.value.taxRateShow,
    invoiceFenForm.value.invoiceType,
    invoiceFenForm.value.kehuName,
    fileObj,
    selectedSalaryIds.value.join(','),
  );
  invoiceFenSubmitting.value = false;
  if (res && res.code === 1) {
    message.success('操作成功');
    const month = outsourcePersonSalaryCommitYearAndMonth.value || record?.zhiXingMonth || '';
    if (month) {
      outsourceDetailStore.queryOutsourceQingKuanZhixingMonth(month);
    }
    handleCloseInvoiceFen();
  } else {
    message.error(res?.msg || '操作失败');
  }
};

const handleUpdateZhanDan = (record: any) => {
  Modal.confirm({
    title: '提示',
    content: '确认更新账单吗？',
    async onOk() {
      const collectId = getCollectId(record);
      const companyName = record?.companyName || '';
      const zhanDanMonth = record?.zhanDanMonth || ''; 
      const zhixingMonth = record?.zhiXingMonth || outsourcePersonSalaryCommitYearAndMonth.value || '';
      const xinZiRi = record?.xinZiRi || '';
      const jobType = record?.jobType || '';

      const res = await outsourceDetailStore.queryOutsourceQingKuanZhandan(
        collectId,
        companyName,
        zhanDanMonth,
        zhixingMonth,
        xinZiRi,
        jobType,
      );
      if (res && res.code === 1) {
        message.success('操作成功');
        if (zhixingMonth) {
          await outsourceDetailStore.queryOutsourceQingKuanZhixingMonth(zhixingMonth);
        }
        return;
      }
      message.error(res?.msg || '操作失败');
      throw new Error(res?.msg || '操作失败');
    },
  });
};
const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 20,
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 40,
    ellipsis: true,
  },
  {
    title: '执行月',
    dataIndex: 'zhiXingMonth',
    key: 'zhiXingMonth',
    width: 30,
  },
  {
    title: '账单月',
    dataIndex: 'zhanDanMonth',
    key: 'zhanDanMonth',
    width: 30,
  },
  {
    title: '账单日',
    dataIndex: 'xinZiRiShow',
    key: 'xinZiRiShow',
    width: 30,
  },
  {
    title: '人数',
    dataIndex: 'peopleNum',
    key: 'peopleNum',
    width: 30,
  },
  {
    title: '费用合计',
    dataIndex: 'totalCharge',
    key: 'totalCharge',
    width: 30,
  },
  {
    title: '账单状态',
    dataIndex: 'zhangdanFlag',
    key: 'zhangdanFlag',
    width: 30,
  },
  {
    title: '发送HR',
    dataIndex: 'sendHr',
    key: 'sendHr',
    width: 30,
  },
  {
    title: 'HR确认',
    dataIndex: 'hrSure',
    key: 'hrSure',
    width: 30,
  },
  {
    title: '确认日期',
    dataIndex: 'sureTime',
    key: 'sureTime',
    width: 45,
  },
  {
    title: '开票',
    dataIndex: 'invoiceFlag',
    key: 'invoiceFlag',
    width: 30,
  },
  {
    title: '开票日期',
    dataIndex: 'invoiceTime',
    key: 'invoiceTime',
    width: 50,
  },
  {
    title: '回款',
    dataIndex: 'collectionFlag',
    key: 'collectionFlag',
    width: 30,
  },
  {
    title: '回款日期',
    dataIndex: 'collectionTime',
    key: 'collectionTime',
    width: 45,
  },
   {
    title: '下载/预览',
    dataIndex: 'excelPath',
    key: 'excelPath',
    width: 55,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 30,
  },
];
</script>

<style lang="less" scoped>
  :deep(.ant-descriptions .ant-descriptions-header) {
    margin-bottom: 10px;
  } 
  :deep(.ant-descriptions .ant-descriptions-item-label) {
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    font-weight: bold;
  }
  
  :deep(.ant-descriptions .ant-descriptions-item-content) {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
</style>
