<template>
    <a-table
      size="small"
      :pagination="pageOutsourceSalaryPurchaseList"
      :columns="columns"
      :loading="loading"
      :dataSource="getOutsourceSalaryPurchaseList"
    >
    <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '1'" color="orange">等待审批</a-tag>
      <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '2'" color="green">通过审批</a-tag>
      <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '3'" color="red">拒绝审批</a-tag>
      <a-tag v-if="column.key === 'invioiceStatus' && record.invioiceStatus === '1'" color="green">无发票</a-tag>
      <a-tag v-if="column.key === 'invioiceStatus' && record.invioiceStatus === '2'" color="orange">发票待回</a-tag>
      <a-tag v-if="column.key === 'invioiceStatus' && record.invioiceStatus === '3'" color="green">发票已回</a-tag>
      <a-tag v-if="column.key === 'invioiceStatus' && record.invioiceStatus === '4'" color="red">发票拒回</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '1'" color="orange">等待审批</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '2'" color="green">通过审批</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '3'" color="red">拒绝审批</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '4'" color="red">发票待回</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '5'" color="green">等待入账</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '6'" color="green">已经入账</a-tag>
      <a-tag v-if="column.key === 'currentStatus' && !record.currentStatus" color="red">已经撤回</a-tag>
      <a-tag v-if="column.key === 'applyPath' && record.applyPath" style="cursor: pointer;" @click="handleExcelPreviewUpload(record)">下载</a-tag>
    <template v-if="column.key === 'operation' && record.checkStatus === '1'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                 <a-menu-item v-if="record.purchaseName.indexOf('51社保') !== -1">
                  <a href="javascript:;" @click="addOutsourceSalaryPurchaseExcel(record.id,record.purchaseId)">上传</a>
                </a-menu-item>
                 <a-menu-item>
                  <a href="javascript:;" @click="deleteOutsourceSalaryPurchase(record.purchaseId)">撤回</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
     </template>
    </template>
  </a-table>

  <a-modal
    v-model:open="uploadVisible"
    title="上传 Excel 文件"
    @ok="handleUploadOk"
    @cancel="handleUploadCancel"
    :confirmLoading="uploadLoading"
    okText="确定"
    cancelText="取消"
  >
    <a-upload-dragger
      v-model:file-list="fileList"
      name="file"
      :multiple="false"
      accept=".xls,.xlsx"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <p class="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
      <p class="ant-upload-hint">仅支持 .xls 或 .xlsx 文件</p>
    </a-upload-dragger>
  </a-modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { MenuUnfoldOutlined, InboxOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType, UploadProps } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceSalaryPurchaseList,pageOutsourceSalaryPurchaseList} = storeToRefs(outsourceDetailStore);
const loading = ref(false);

const columns: TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 20,
  },
  {
    title: '项目名称',
    dataIndex: 'purchaseName',
    key: 'purchaseName',
    width: 100,
    ellipsis: true,
  },
   {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 70,
    ellipsis: true,
  },
   {
    title: '金额',
    dataIndex: 'money',
    key: 'money',
    width: 30,
  },
  {
    title: '申请日期',
    dataIndex: 'applyTime',
    key: 'applyTime',
    width: 30,
  },
   {
    title: '申请人',
    dataIndex: 'applyUser',
    key: 'applyUser',
    width: 30,
    ellipsis: true,
  },
  {
    title: '审批状态',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    width: 30,
  },
  {
    title: '发票',
    dataIndex: 'invioiceStatus',
    key: 'invioiceStatus',
    width: 30,
  },
  {
    title: '回票日期',
    dataIndex: 'ticketReturnTime',
    key: 'ticketReturnTime',
    width: 30,
  },
  {
    title: '票责人',
    dataIndex: 'ticketRealNameEn',
    key: 'ticketRealNameEn',
    width: 30,
    ellipsis: true,
  },
   {
    title: '当前状态',
    dataIndex: 'currentStatus',
    key: 'currentStatus',
    width: 30,
  },
   {
    title: '文件',
    dataIndex: 'applyPath',
    key: 'applyPath',
    width: 20,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 20,
  },
];

const handleExcelPreviewUpload = async (record) => {
  if (!record.applyPath) {
    message.error('文件不存在');
    return;
  }
  const src = /^https?:\/\//i.test(record.applyPath)
    ? record.applyPath
    : new URL(record.applyPath, window.location.origin).toString();
  const filename = `${record.purchaseName}.xlsx`;
  try {
    const res = await fetch(src);
    if (!res.ok) {
      throw new Error(`download failed: ${res.status}`);
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (e) {
    window.open(src, '_blank');
    message.warning('已在新窗口打开文件，请手动保存下载');
  }
};

const deleteOutsourceSalaryPurchase = (ids) => {
  outsourceDetailStore.deleteOutsourceSalaryPurchase(ids).then((res) => {
    if (res.code === 1) {
      message.success('撤回成功');
      outsourceDetailStore.queryOutsourceSalaryPurchase();
    } else {
      message.error('撤回失败');
    }
  });
};

const uploadVisible = ref(false);
const uploadLoading = ref(false);
const uploadId = ref('');
const uploadPurchaseId = ref('');
const fileList = ref<UploadProps['fileList']>([]);

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [file];
  return false;
};

const handleRemove: UploadProps['onRemove'] = () => {
  fileList.value = [];
};

const handleUploadOk = () => {
  if (fileList?.value?.length === 0) {
    message.warning('请先选择文件');
    return;
  }
  const file = fileList?.value?.[0].originFileObj || fileList?.value?.[0];
  uploadLoading.value = true;
  outsourceDetailStore
    .addOutsourceSalaryPurchaseExcel(uploadId.value, uploadPurchaseId.value, file)
    .then((res) => {
      if (res.code === 1) {
        message.success('上传成功');
        uploadVisible.value = false;
        fileList.value = [];
        outsourceDetailStore.queryOutsourceSalaryPurchase();
      } else {
        message.error(res.msg || '上传失败');
      }
      uploadLoading.value = false;
    })
    .catch(() => {
      uploadLoading.value = false;
      message.error('上传出错');
    });
};

const handleUploadCancel = () => {
  fileList.value = [];
  uploadId.value = '';
  uploadPurchaseId.value = '';
};

const addOutsourceSalaryPurchaseExcel = (id: string, purchaseId: string) => {
  uploadId.value = id;
  uploadPurchaseId.value = purchaseId;
  uploadVisible.value = true;
};

</script>

<style lang="less" scoped>
:deep(.even-row) {
    background-color: #f0f8ff;
  }
  :deep(.even-row .ant-table-cell-row-hover) {
    background-color: #f0f8ff;
  }
  :deep(.ant-table-expanded-row > td) {
    padding: 0 !important;
  }
  :deep(.ant-table-row-expand-icon-cell) {
    width: 30px !important;
    min-width: 30px !important;
    max-width: 30px !important;
    padding: 0 !important;
  }
</style>
