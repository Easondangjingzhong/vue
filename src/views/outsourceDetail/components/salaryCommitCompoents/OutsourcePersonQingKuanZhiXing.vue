<template>
  <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="false"
      :columns="columns"
      :dataSource="getOutsourceQingKuanZhixingMonth"
    >
   <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'zhangdanFlag'" :color="record.zhangdanFlag === '1' ? 'green' : 'orange'">{{ record.zhangdanFlag === '1' ? '已生成' : '待生成' }}</a-tag>
      <a-tag v-if="column.key === 'sendHr' && record.zhangdanFlag === '1'" :color="record.sendHr ? 'green' : 'orange'">{{ record.sendHr ? '已发' : '待发' }}</a-tag>
      <a-tag v-if="column.key === 'hrSure' && record.sendHr" :color="record.hrSure ? 'green' : 'orange'">{{ record.hrSure ? '已确认' : '待确认' }}</a-tag>
      <a-tag v-if="column.key === 'invoiceFlag' && record.hrSure" :color="record.invoiceFlag ? 'green' : 'orange'">{{ record.invoiceFlag ? '已开' : '待开' }}</a-tag>
      <a-tag v-if="column.key === 'collectionFlag' && record.invoiceFlag" :color="record.collectionFlag ? 'green' : 'orange'">{{ record.collectionFlag ? '已回' : '待回' }}</a-tag>
      <a-button type="primary" size="small" @click="handlePreview(record.excelPath)">查看</a-button>
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
                <a-menu-item v-if="record.invoiceFlag">
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
    :confirm-loading="invoiceSubmitting"
    @ok="handleSubmitInvoice"
    @cancel="handleCloseInvoice"
  >
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
  </a-modal>

  <a-modal
    v-model:open="invoiceFenModalOpen"
    title="分函"
    :confirm-loading="invoiceFenSubmitting"
    @ok="handleSubmitInvoiceFen"
    @cancel="handleCloseInvoiceFen"
  >
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
  invoiceForm.value = {
    invoiceFlag: '1',
    invoiceTime: record?.invoiceTime || '',
    invoiceNumber: record?.invoiceNumber || '',
    invoiceCompany: record?.invoiceCompany || '北京博瑞',
    invoiceMoney: record?.invoiceMoney || record?.totalCharge || '',
    invoiceType: record?.invoiceType || '',
    taxRateShow: record?.taxRateShow || '',
    taxRate: record?.taxRate || '',
    taxMoney: record?.taxMoney || '',
    invoiceMoneyAfter: record?.invoiceMoneyAfter || '',
    kehuName: record?.companyName || '',
  };
  invoiceFileList.value = [];
  invoiceModalOpen.value = true;
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
  invoiceFenForm.value = {
    invoiceFlag: '1',
    invoiceTime: '',
    invoiceNumber: '',
    invoiceCompany: '北京博瑞',
    invoiceMoney: '',
    kehuName: record?.companyName || '',
    invoiceType: '',
    taxRateShow: '',
    taxRate: '',
    taxMoney: '',
    invoiceMoneyAfter: '',
    };
  invoiceFenFileList.value = [];
  invoiceFenModalOpen.value = true;
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
  },
  {
    title: '执行月',
    dataIndex: 'zhiXingMonth',
    key: 'zhiXingMonth',
    width: 20,
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
    width: 40,
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
    width: 50,
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
    width: 50,
  },
   {
    title: '下载/预览',
    dataIndex: 'excelPath',
    key: 'excelPath',
    width: 50,
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
