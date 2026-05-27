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
      <template v-if="column.key === 'operation'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                 <a href="javascript:;" @click.prevent="handleOpenSendHr(record)">发送HR</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;">HR确认</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;">分函</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;">开票</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;" @click.prevent="handleUpdateZhanDan(record)">更新账单</a>
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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceQingKuanZhixingMonth, outsourcePersonSalaryCommitYearAndMonth } =
  storeToRefs(outsourceDetailStore);


const sendHrModalOpen = ref(false);
const sendHrSubmitting = ref(false);
const sendHrForm = ref<{ sendHr: string; sendTime: string }>({ sendHr: '', sendTime: '' });
const currentRow = ref<any>(null);

const hrOptions = ref([
  {
    value: '1',
    label: '已发',
  },
]);

const getCollectId = (record: any) => record?.collectId || record?.id || record?.key || '';

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

const handleUpdateZhanDan = (record: any) => {
  Modal.confirm({
    title: '提示',
    content: '确认更新账单吗？',
    async onOk() {
      const companyName = record?.companyName || '';
      const zhanDanMonth = record?.zhanDanMonth || ''; 
      const zhixingMonth = record?.zhiXingMonth || outsourcePersonSalaryCommitYearAndMonth.value || '';
      const xinZiRi = record?.xinZiRi || '';
      const jobType = record?.jobType || '';

      const res = await outsourceDetailStore.queryOutsourceQingKuanZhandan(
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
    dataIndex: 'xinZiRi',
    key: 'xinZiRi',
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
    width: 40,
  },
  {
    title: '账单状态',
    dataIndex: 'zhangdanFlag',
    key: 'zhangdanFlag',
    width: 40,
  },
  {
    title: '发送HR',
    dataIndex: 'sendHr',
    key: 'sendHr',
    width: 40,
  },
  {
    title: 'HR确认',
    dataIndex: 'hrSure',
    key: 'hrSure',
    width: 40,
  },
  {
    title: '确认日期',
    dataIndex: 'sureTime',
    key: 'sureTime',
    width: 40,
  },
  {
    title: '开票',
    dataIndex: 'invoiceFlag',
    key: 'invoiceFlag',
    width: 40,
  },
  {
    title: '开票日期',
    dataIndex: 'invoiceTime',
    key: 'invoiceTime',
    width: 40,
  },
  {
    title: '回款',
    dataIndex: 'collectionFlag',
    key: 'collectionFlag',
    width: 40,
  },
  {
    title: '回款日期',
    dataIndex: 'collectionTime',
    key: 'collectionTime',
    width: 40,
  },
   {
    title: '下载/预览',
    dataIndex: 'excelPath',
    key: 'excelPath',
    width: 40,
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
