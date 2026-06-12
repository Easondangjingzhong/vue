<template>
  <a-drawer
    v-model:open="resumeSnapshotFlag"
    title="简历快照"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
    <a-row :gutter="12">
      <a-col :span="8" class="snapshot-list-panel">
        <div class="snapshot-list-header">
          <span>快照记录</span>
          <a-tag color="blue" v-if="selectedSnapshotRecord">当前查看：{{ selectedSnapshotRecord.snapshotType }}</a-tag>
        </div>
        <a-table
          size="small"
          :pagination="false"
          rowKey="id"
          :columns="columns"
          :dataSource="resumeSnapshotList"
          :loading="resumeSnapshotLoading"
          :rowClassName="rowClassName"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              <span class="snapshot-index">{{ Number(index) + 1 }}</span>
            </template>
            <template v-else-if="column.key === 'snapshotType'">
              <span class="snapshot-type-cell">
                {{ record.snapshotType }}
                <a-tag v-if="record.id === resumeSnapshotSelectedId" color="processing">当前</a-tag>
              </span>
            </template>
            <template v-else-if="column.key === 'createTime'">{{ formatToDateMinute(record.createTime) }}</template>
            <template v-else-if="column.key === 'action'">
              <a-button
                size="small"
                :type="record.id === resumeSnapshotSelectedId ? 'primary' : 'default'"
                @click="handleView(record)"
              >
                {{ record.id === resumeSnapshotSelectedId ? '当前查看' : '查看' }}
              </a-button>
            </template>
          </template>
        </a-table>
      </a-col>
      <a-col :span="16" class="snapshot-preview">
        <a-alert v-if="resumeSnapshotParseError" type="error" :message="resumeSnapshotParseError" />
        <a-empty v-else-if="!resumeSnapshotSelectedResume" description="请选择快照" />
        <div v-else class="snapshot-preview-card">
          <div class="snapshot-preview-header">
            <div class="snapshot-preview-title">
              <span>{{ resumeSnapshotSelectedResume.userName || '-' }} 的简历快照</span>
              <a-tag color="processing">{{ selectedSnapshotRecord?.snapshotType || '快照' }}</a-tag>
            </div>
            <div class="snapshot-preview-meta">
              <span>顾问：{{ selectedSnapshotRecord?.realNameEn || '-' }}</span>
              <span>时间：{{ selectedSnapshotRecord ? formatToDateMinute(selectedSnapshotRecord.createTime) : '-' }}</span>
              <span>记录：第 {{ selectedSnapshotIndex + 1 }} 条</span>
            </div>
          </div>
          <div class="snapshot-preview-body">
            <ResumeDetailPersonInfo :resumeData="resumeSnapshotSelectedResume" :showResumeAdd="false" />
            <ResumeDetailWorkInfo
              v-for="(item, idx) in snapshotWorkList"
              :key="item.id || idx"
              :indexNum="Number(idx)"
              :resumeData="item"
              :showResumeAdd="false"
            />
            <ResumeDetailEducationInfo
              v-for="(item, idx) in snapshotEducationList"
              :key="item.id || idx"
              :indexNum="Number(idx)"
              :resumeData="item"
              :showResumeAdd="false"
            />
            <ResumeDetailLanguagesInfo
              :resumeData="resumeSnapshotSelectedResume"
              :Languages="resumeSnapshotSelectedResume.resumeLanguageList"
              :showResumeAdd="false"
              :resumeId="Number(resumeSnapshotSelectedResume.id)"
            />
            <ResumeDetaiSelfInfo :resumeData="resumeSnapshotSelectedResume" :showResumeAdd="false" />
          </div>
        </div>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { formatToDateMinute } from '/@/utils/dateUtil';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import ResumeDetailPersonInfo from './ResumeDetailPersonInfo.vue';
  import ResumeDetailWorkInfo from './ResumeDetailWorkInfo.vue';
  import ResumeDetailEducationInfo from './ResumeDetailEducationInfo.vue';
  import ResumeDetailLanguagesInfo from './ResumeDetailLanguagesInfo.vue';
  import ResumeDetaiSelfInfo from './ResumeDetaiSelfInfo.vue';

  const resumeDetailStore = useResumeDetailStore();
  const {
    resumeSnapshotFlag,
    resumeSnapshotLoading,
    resumeSnapshotList,
    resumeSnapshotSelectedId,
    resumeSnapshotSelectedResume,
    resumeSnapshotParseError,
  } = storeToRefs(resumeDetailStore);

  const drawerWidth = computed(() => Math.min(1400, Math.max(980, Math.round(window.innerWidth * 0.9))));

  const columns = [
    { title: '编号', key: 'index', width: 50 },
    { title: '动作', dataIndex: 'snapshotType', key: 'snapshotType', width: 90 },
    { title: '顾问', dataIndex: 'realNameEn', key: 'realNameEn', width: 120 },
    { title: '日期', dataIndex: 'createTime', key: 'createTime', width: 160 },
    { title: '快照', key: 'action', width: 100 },
  ];

  const selectedSnapshotIndex = computed(() =>
    resumeSnapshotList.value.findIndex((item) => item.id === resumeSnapshotSelectedId.value),
  );

  const selectedSnapshotRecord = computed(() =>
    resumeSnapshotList.value.find((item) => item.id === resumeSnapshotSelectedId.value),
  );

  const snapshotWorkList = computed(() => {
    return Array.isArray(resumeSnapshotSelectedResume.value?.workExpeList)
      ? resumeSnapshotSelectedResume.value.workExpeList
      : [];
  });

  const snapshotEducationList = computed(() => {
    const list = Array.isArray(resumeSnapshotSelectedResume.value?.eduExpeList)
      ? resumeSnapshotSelectedResume.value.eduExpeList
      : [];
    return list.map((item, idx) => ({
      ...item,
      // 教育组件会在没有 id 时切到编辑态，快照预览统一补一个只读 id。
      id: item?.id || `snapshot-edu-${idx}`,
    }));
  });

  const handleClose = () => {
    resumeDetailStore.closeResumeSnapshotDrawer();
  };

  const handleView = (record: any) => {
    resumeDetailStore.selectResumeSnapshot(record);
  };

  const rowClassName = (record: any) => {
    return record.id === resumeSnapshotSelectedId.value ? 'snapshot-row-active' : '';
  };
</script>

<style scoped lang="less">
  .snapshot-list-panel {
    .snapshot-list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: 600;
    }
  }
  .snapshot-index {
    font-weight: 600;
    color: #666;
  }
  .snapshot-type-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }
  .snapshot-preview {
    max-height: calc(100vh - 120px);
    overflow: auto;
    padding-right: 6px;
  }
  .snapshot-preview-card {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    box-shadow: 0 6px 16px rgb(0 0 0 / 6%);
    overflow: hidden;
  }
  .snapshot-preview-header {
    padding: 16px 20px 12px;
    background: linear-gradient(180deg, #fafcff 0%, #fff 100%);
    border-bottom: 1px solid #f0f0f0;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 8px rgb(0 0 0 / 4%);
  }
  .snapshot-preview-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #1f1f1f;
  }
  .snapshot-preview-meta {
    display: flex;
    gap: 20px;
    margin-top: 8px;
    color: #666;
    font-size: 13px;
    flex-wrap: wrap;
  }
  .snapshot-preview-body {
    padding: 12px 18px 18px;
    background: #fff;
  }
  :deep(.snapshot-row-active td) {
    background: #e6f4ff !important;
  }
  :deep(.snapshot-row-active td:first-child) {
    border-left: 3px solid #1677ff;
  }
  :deep(.snapshot-preview-body .resume_header),
  :deep(.snapshot-preview-body .resume_header_update) {
    margin: 0;
    padding: 14px 10px 18px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    position: static;
    top: auto;
  }
  :deep(.snapshot-preview-body .resume_header:not(:last-child)),
  :deep(.snapshot-preview-body .resume_header_update:not(:last-child)) {
    border-bottom: 1px solid #f0f0f0;
  }
  :deep(.snapshot-preview-body .resume_detail_title) {
    padding-top: 0;
  }
</style>
