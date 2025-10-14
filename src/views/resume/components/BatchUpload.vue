<template>
<div class="resume-content">
    <a-row :gutter="24" style="justify-content: end;margin-bottom: 10px;">
      <a-col :span="4" v-if="batchUploadPercent">
        <a-progress :percent="batchUploadPercent" size="small" status="active" />
      </a-col>
      <a-col :span="3.5" style="justify-content: end;display: flex;">
       <a-upload
            v-model:file-list="batchUploadFileList"
            name="file"
            :headers="headers"
            :showUploadList="false"
            :custom-request="downloadFilesBatchUpload"
            directory
            multiple
          >
            <a-button style="background-color: #eee;" size="small" class="upload_btn">
              增加文件
            </a-button>
          </a-upload>
       <a-button :loading="isLoading" @click="handleStartParse" style="background-color: #eee;margin-left: 10px;" size="small">开始解析</a-button>
    </a-col>
    </a-row>
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      :columns="columnsBatchUpload"
      :data-source="batchUploadList"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'uploadStatus'">
          <a-tag v-if="record.uploadStatus === '等待解析'" color="orange">{{ record.uploadStatus }}</a-tag>
          <a-tag v-if="record.uploadStatus === '上传成功'" color="green">{{ record.uploadStatus }}</a-tag>
          <a-tag v-if="record.uploadStatus === '简历重复' || record.uploadStatus === '上传失败'" color="red">{{ record.uploadStatus }}</a-tag>
        </template>
        <template v-if="column.key === 'operation' && record.uploadStatus === '等待解析'">
         <DeleteOutlined @click="handleDelBatchUpload(record.id)" style="cursor: pointer;"/>
        </template>
      </template>
    </a-table>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { currentDate } from '/@/utils/dateUtil';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useResumeStoreWithOut } from '/@/store/modules/resume';
const resumeStore = useResumeStoreWithOut();
const { batchUploadFileList,batchUploadList } = storeToRefs(resumeStore);
const headers = {
    authorization: 'authorization-text',
  };
const columnsBatchUpload = ref([
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 660,
      ellipsis: true,
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
      width: 100,
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 100,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 100,
    },
    {
      title: '上传状态',
      dataIndex: 'uploadStatus',
      key: 'uploadStatus',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 40,
    }
  ])
const downloadFilesBatchUpload = () => {
  batchUploadList.value = batchUploadFileList.value.map((item: any) => {
    return {
      id: item.uid,
      fileName: item.name,
      fileType: item.name.split('.').pop(),
      fileSize: `${(item.size / 1024).toFixed(0)}KB`,
      uploadTime: currentDate(),
      uploadStatus: '等待解析',
      file: item,
    }
  })
}
const handleDelBatchUpload = (id: string) => {
  batchUploadList.value = batchUploadList.value.filter((item: any) => item.id !== id);
  //@ts-ignore
  batchUploadFileList.value = batchUploadFileList.value.filter((item: any) => item.uid !== id);
}
const isLoading = ref(false);
const batchUploadNum = ref(0);
const batchUploadPercent = ref(0);
const handleStartParse = async () => {
  if (!batchUploadList.value.length) {
    message.warning('请先选择要解析的文件');
    return;
  }
  isLoading.value = true;
  // 筛选出需要上传的文件
  const pendingItems = batchUploadList.value.filter(item => item.uploadStatus === '等待解析');

  for (const item of pendingItems) {
    try {
      // 等待当前文件上传完成
      await handleStartParseUpload(item).then((res) => {
        item.uploadStatus = res;
        batchUploadNum.value++;
        batchUploadPercent.value = Math.floor(batchUploadNum.value / pendingItems.length * 100);
      });
    } catch (error) {
      console.error('文件上传失败:', error);
      item.uploadStatus = '上传失败';
      // 如需失败后继续上传其他文件，可移除以下break
      // break;
    }
  }
  isLoading.value = false;
  message.success(`成功解析${batchUploadNum.value}个文件`);
  batchUploadNum.value = 0;
  batchUploadPercent.value = 0;
  batchUploadList.value = [];
  batchUploadFileList.value = [];
}
const handleStartParseUpload = async (item: any) => {
  try {
      return await resumeStore
      .startParseUpload(item)
      .then((res) => {
         return res;
      })
      .catch((res) => {
        return res;
      });
    } catch (error) {
      return "上传失败";
    }
}
</script>

<style lang="less" scoped>
.resume-content {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px 55px;
    margin: 0 40px;
  }
  .upload_btn .anticon-upload {
      vertical-align: text-bottom;
    }
</style>