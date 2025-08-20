<template>
  <!-- <div class="resume_header" @click="handleResumeContainerIndex" :class="{'resume_container_index_up': resumeContainerIndexBtnFlag}"> -->
  <div class="resume_header" @click="handleResumeContainerIndex">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4"> 简历信息 </h4>
        <a-button
          v-if="showResumeRightOutFlag"
          type="primary"
          style="background-color: #22c428"
          size="small"
          @click="handleResumeMapping"
          >M</a-button
        >
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0; margin-bottom: 5px" />
    </a-row>
    <a-row
      :gutter="24"
      :key="item.resumeId"
      v-if="resumeReportDetails.length > 0"
      v-for="item in resumeReportDetails"
      :class="item.resumeId == resumeId ? ['resume_row', 'active'] : 'resume_row'"
    >
      <a-col :span="24">
        <span class="resume_span_one">{{ item.index }}</span>
        <span class="resume_span_name">{{ item.realNameEn }}</span>
        <span class="resume_span_name">{{ item.teamName }}</span>
        <span class="resume_span_two">{{ item.source }}</span>
        <span class="resume_span_name"  v-if="!item.resumeId && item.resumeIdEn" :title="`英文: ${item.registTime}`">{{ item.registTime }}</span>
        <span class="resume_span_name"  v-if="item.resumeId && !item.resumeIdEn" :title="`中文: ${item.registTime}`">{{ item.registTime }}</span>
        <span class="resume_span_name"  v-if="item.resumeId && item.resumeIdEn" :title="`中文: ${item.registTime}&#13;英文: ${item.registTimeOther}`">{{ item.registTime }}</span>
        <span class="resume_span">
          <a-tag v-if="!item.resumeId" style="cursor: not-allowed">中文</a-tag>
          <a-tag
            v-if="item.resumeId && resumeTypeEnglish == '1'"
            style="cursor: pointer"
            :class="resumeId == item.resumeId ? 'activceResume' : ''"
            color="pink"
            @click="handleChangeResume(item.resumeId, item.addConsultantId, 2)"
            >中文</a-tag
          >
          <a-tag
            v-if="item.resumeId && resumeTypeEnglish != '1'"
            :class="resumeId == item.resumeId ? 'activceResume' : ''"
            color="pink"
            style="cursor: pointer"
            @click="handleChangeResume(item.resumeId, item.addConsultantId, 2)"
            >中文</a-tag
          >
        </span>
        <!-- <span class="resume_span" v-if="!item.resumeIdEn">英文</span> -->
        <span class="resume_span_name">
          <a-tag
            v-if="!item.resumeIdEn && item.addConsultantId != '28'"
            style="cursor: pointer"
            @click="handleChangeResumeToAddEnglish(item.resumeId, item.addConsultantId)"
            >英文</a-tag
          >
          <a-tag
            v-if="!item.resumeIdEn && item.addConsultantId == '28'"
            style="cursor: not-allowed"
            >英文</a-tag
          >
          <a-tag
            v-if="item.resumeIdEn && resumeTypeEnglish != '1'"
            :class="resumeId == item.resumeIdEn ? 'activceResume' : ''"
            color="pink"
            style="cursor: pointer"
            @click="handleChangeResume(item.resumeIdEn, item.addConsultantId, 1)"
            >英文</a-tag
          >
          <a-tag
            v-if="item.resumeIdEn && resumeTypeEnglish == '1'"
            :class="resumeId == item.resumeIdEn ? 'activceResume' : ''"
            color="pink"
            style="cursor: pointer"
            @click="handleChangeResume(item.resumeIdEn, item.addConsultantId, 1)"
            >英文</a-tag
          >
          <!-- <LinkOutlined v-if="item.orginalPathEn" @click="handleResumeOrginalPath(item.orginalPathEn)"/> -->
          <LinkOutlined
            v-if="item.orginalPath && !item.orginalPathEn"
            @click="handleResumeOrginalPath(item.orginalPath)"
          />
          <LinkOutlined
            v-if="!item.orginalPath && item.orginalPathEn"
            @click="handleResumeOrginalPath(item.orginalPathEn)"
          />
          <LinkOutlined
            v-if="item.orginalPath && item.orginalPathEn"
            @click="handleResumeOrginalPathChoose(item.orginalPath, item.orginalPathEn)"
          />
        </span>
        <span class="resume_span">
          <a-tag
            v-if="item.reportContent && resumeTypeEnglish != '1'"
            color="#ffa500"
            style="cursor: pointer"
            @click="handleReportContent(item.reportContent)"
            >报告</a-tag
          >
          <a-tag
            v-if="!item.reportContent && item.addConsultantId == '28' && resumeTypeEnglish != '1'"
            style="cursor: not-allowed"
            >报告</a-tag
          >
          <a-tag
            v-if="!item.reportContent && item.addConsultantId != '28' && resumeTypeEnglish != '1'"
            style="cursor: pointer"
            @click="handleReportContent(item.reportContent)"
            >报告</a-tag
          >
          <a-tag
            v-if="item.reportContentEn && resumeTypeEnglish == '1'"
            color="#ffa500"
            style="cursor: pointer"
            @click="handleReportContent(item.reportContentEn)"
            >报告</a-tag
          >
          <a-tag
            v-if="!item.reportContentEn && item.addConsultantId == '28' && resumeTypeEnglish == '1'"
            style="cursor: not-allowed"
            >报告</a-tag
          >
          <a-tag
            v-if="!item.reportContentEn && item.addConsultantId != '28' && resumeTypeEnglish == '1'"
            style="cursor: pointer"
            @click="handleReportContent(item.reportContentEn)"
            >报告</a-tag
          >
        </span>
      </a-col>
    </a-row>
    <div v-if="expend">
      <a-row :gutter="24">
        <a-col :span="24" v-html="formState.reportContentShow"  class="report-content"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24" style="text-align: right">
          <a-button
            v-if="showResumeAdd"
            type="primary"
            size="small"
            style="margin: 0 8px"
            @click="handleReportContentUpdate"
            >修改</a-button
          >
          <a-button v-if="showResumeAdd" size="small" @click="expend = false">关闭</a-button>
        </a-col>
      </a-row>
    </div>
    <div v-if="expendUpdate">
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="24"  class="hint-text-area">
            <a-form-item
              name="reportContent"
              :rules="[{ required: true, message: '请输入简历报告' }]"
            >
             <div class="hint-text">必须填写序号，只能为以下2种：1、2、或1. 2. 其他格式推荐时简历序号会乱</div>
             <a-textarea
                :rows="7"
                style="white-space: pre-wrap;padding-top: 20px;"
                v-model:value="formState.reportContent"
                placeholder="请输入简历报告"
              @input="e => formState.reportContent = normalizeText(e.target.value)"
              ></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: right">
            <a-button
              type="primary"
              size="small"
              :loading="iconLoading"
              style="margin: 0 8px"
              html-type="submit"
              >保存</a-button
            >
            <a-button size="small" @click="handleCancelReportContent">取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
  <a-modal :footer="null" v-model:open="openOrginalPatChoose" title="简历预览">
    <p>
      <a-tag color="pink" style="cursor: pointer" @click="handleResumeOrginalPathChooseDetail(1)"
        >中文</a-tag
      >
      <a-tag color="pink" style="cursor: pointer" @click="handleResumeOrginalPathChooseDetail(2)"
        >英文</a-tag
      >
    </p>
  </a-modal>
  <a-drawer
    v-model:open="orginalPathHeaderShow"
    title="文件预览"
    :keyboard="false"
    :closable="false"
    :mask="false"
    :width="639"
    :bodyStyle="{ padding: '14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleOrginalPathClose" />
    </template>
    <div>
      <OrginalPath :orginalPathBlobPath="orginalPathBlobPath" />
    </div>
  </a-drawer>
  <a-drawer
    v-model:open="resumeMappinglag"
    title="Mapping信息"
    :keyboard="false"
    :closable="false"
    :width="1000"
    :bodyStyle="{ padding: '14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseCandidatePosition" />
    </template>
    <a-table
      size="small"
      :dataSource="personMappingList"
      rowKey="key"
      :pagination="false"
      :columns="personMappingColumns"
      :locale="{ emptyText: '暂无信息' }"
    ></a-table>
    <div>
      <a-row :gutter="24" style="margin-top: 5px">
        <a-col :span="24">
          <h4 class="resume_h4">职位信息</h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #0505050f; margin-top: 0" />
      </a-row>
      <a-table
        size="small"
        :dataSource="workExpMappingList"
        rowKey="key"
        :pagination="false"
        :columns="workExpColumns"
        :locale="{ emptyText: '暂无信息' }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'siGongNum'">
            <a
              :class="[
                'siGongNum',
                mappingJiaGouId == `${record.brandId}/${record.marketId}` ? 'siGongNumActive' : '',
              ]"
              v-if="record.siGongNum"
              @click="handleMappingJiaGou(record.brandId, record.marketId,record.siGongNum,record.siGongLeaveNum)"
              >{{ record.siGongNum }}/{{record.siGongLeaveNum}}</a
            >
            <a v-else>{{ record.siGongNum }}/{{record.siGongLeaveNum}}</a>
          </template>
        </template>
      </a-table>
    </div>
    <div style="position: relative;" v-if="mappingJiaGouFlag">
       <a-switch style="position: absolute;top: 14px;right: 4px;z-index: 6;" v-model:checked="mappingJiaGouFlagDetail" @change="mappingJiaGouFlagDetailChange" :checked-children="siGongNumTitle" :un-checked-children="siGongLeaveNumTitle" />
      <MappingJiaGou v-if="mappingJiaGouArrDetail.mappingJiaManage && mappingJiaGouArrDetail.mappingJiaManage.length > 0" :mappingArr="mappingJiaGouArrDetail.mappingJiaManage" :mappingType="'经理级别'" :flag="mappingJiaGouFlagDetail"/>
      <MappingJiaGou v-if="mappingJiaGouArrDetail.mappingJiaCharge && mappingJiaGouArrDetail.mappingJiaCharge.length > 0" :mappingArr="mappingJiaGouArrDetail.mappingJiaCharge" :mappingType="'主管级别'" :flag="mappingJiaGouFlagDetail"/>
      <MappingJiaGou v-if="mappingJiaGouArrDetail.mappingJiaSenior && mappingJiaGouArrDetail.mappingJiaSenior.length > 0" :mappingArr="mappingJiaGouArrDetail.mappingJiaSenior" :mappingType="'资深级别'" :flag="mappingJiaGouFlagDetail"/>
      <MappingJiaGou v-if="mappingJiaGouArrDetail.mappingJiaBase && mappingJiaGouArrDetail.mappingJiaBase.length > 0" :mappingArr="mappingJiaGouArrDetail.mappingJiaBase" :mappingType="'基础级别'" :flag="mappingJiaGouFlagDetail"/>
      <MappingJiaGou v-if="mappingJiaGouArrDetail.mappingJiaStore && mappingJiaGouArrDetail.mappingJiaStore.length > 0" :mappingArr="mappingJiaGouArrDetail.mappingJiaStore" :mappingType="'门店支持'" :flag="mappingJiaGouFlagDetail"/>
      <!-- <a-row
        :gutter="24"
        v-if="mappingJiaGouArr.mappingJiaManage && mappingJiaGouArr.mappingJiaManage.length > 0"
      >
        <a-col :span="24">
          <h4 class="resume_h4">经理级别({{ mappingJiaGouArr.mappingJiaManage.length }})</h4>
        </a-col>
        <a-divider :dashed="true" class="mappingJiaGouspandivider" />
        <a-col :span="24">
          <span
            class="mappingJiaGouspanWidth"
            v-for="item in mappingJiaGouArr.mappingJiaManage"
            :key="item.key"
          >
            <span
              :class="[
                'mappingJiaGouspan',
                item.jobStatus == 1 ? 'mappingJiaGouspanZaizhi' : 'mappingJiaGouspanLizhi',
                mappingJiaGouToResumeId == item.id ? 'mappingJiaGouspanActive' : '',
              ]"
              @click="handleMappingJiaGouToResume(item.id, item.addConsultantId)"
              :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})&#13;${item.worksOne}&#13;${item.worksTwo}`"
            >
              {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
            </span>
          </span>
        </a-col>
      </a-row>
      <a-row
        :gutter="24"
        v-if="mappingJiaGouArr.mappingJiaCharge && mappingJiaGouArr.mappingJiaCharge.length > 0"
      >
        <a-col :span="24">
          <h4 class="resume_h4">主管级别({{ mappingJiaGouArr.mappingJiaCharge.length }})</h4>
        </a-col>
        <a-divider :dashed="true" class="mappingJiaGouspandivider" />
        <a-col :span="24">
          <span
            class="mappingJiaGouspanWidth"
            v-for="item in mappingJiaGouArr.mappingJiaCharge"
            :key="item.key"
          >
            <span
              :class="[
                'mappingJiaGouspan',
                item.jobStatus == 1 ? 'mappingJiaGouspanZaizhi' : 'mappingJiaGouspanLizhi',
                mappingJiaGouToResumeId == item.id ? 'mappingJiaGouspanActive' : '',
              ]"
              @click="handleMappingJiaGouToResume(item.id, item.addConsultantId)"
              :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})&#13;${item.worksOne}&#13;${item.worksTwo}`"
            >
              {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
            </span>
          </span>
        </a-col>
      </a-row>
      <a-row
        :gutter="24"
        v-if="mappingJiaGouArr.mappingJiaSenior && mappingJiaGouArr.mappingJiaSenior.length > 0"
      >
        <a-col :span="24">
          <h4 class="resume_h4">资深级别({{ mappingJiaGouArr.mappingJiaSenior.length }})</h4>
        </a-col>
        <a-divider :dashed="true" class="mappingJiaGouspandivider" />
        <a-col :span="24">
          <span
            class="mappingJiaGouspanWidth"
            v-for="item in mappingJiaGouArr.mappingJiaSenior"
            :key="item.key"
          >
            <span
              :class="[
                'mappingJiaGouspan',
                item.jobStatus == 1 ? 'mappingJiaGouspanZaizhi' : 'mappingJiaGouspanLizhi',
                mappingJiaGouToResumeId == item.id ? 'mappingJiaGouspanActive' : '',
              ]"
              @click="handleMappingJiaGouToResume(item.id, item.addConsultantId)"
              :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})&#13;${item.worksOne}&#13;${item.worksTwo}`"
            >
              {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
            </span>
          </span>
        </a-col>
      </a-row>
      <a-row
        :gutter="24"
        v-if="mappingJiaGouArr.mappingJiaBase && mappingJiaGouArr.mappingJiaBase.length > 0"
      >
        <a-col :span="24">
          <h4 class="resume_h4">基础级别({{ mappingJiaGouArr.mappingJiaBase.length }})</h4>
        </a-col>
        <a-divider :dashed="true" class="mappingJiaGouspandivider" />
        <a-col :span="24">
          <span
            class="mappingJiaGouspanWidth"
            v-for="item in mappingJiaGouArr.mappingJiaBase"
            :key="item.key"
          >
            <span
              :class="[
                'mappingJiaGouspan',
                item.jobStatus == 1 ? 'mappingJiaGouspanZaizhi' : 'mappingJiaGouspanLizhi',
                mappingJiaGouToResumeId == item.id ? 'mappingJiaGouspanActive' : '',
              ]"
              @click="handleMappingJiaGouToResume(item.id, item.addConsultantId)"
              :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})&#13;${item.worksOne}&#13;${item.worksTwo}`"
            >
              {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
            </span>
          </span>
        </a-col>
      </a-row>
      <a-row
        :gutter="24"
        v-if="mappingJiaGouArr.mappingJiaStore && mappingJiaGouArr.mappingJiaStore.length > 0"
      >
        <a-col :span="24">
          <h4 class="resume_h4">门店支持({{ mappingJiaGouArr.mappingJiaStore.length }})</h4>
        </a-col>
        <a-divider :dashed="true" class="mappingJiaGouspandivider" />
        <a-col :span="24">
          <span
            class="mappingJiaGouspanWidth"
            v-for="item in mappingJiaGouArr.mappingJiaStore"
            :key="item.key"
          >
            <span
              :class="[
                'mappingJiaGouspan',
                item.jobStatus == 1 ? 'mappingJiaGouspanZaizhi' : 'mappingJiaGouspanLizhi',
                mappingJiaGouToResumeId == item.id ? 'mappingJiaGouspanActive' : '',
              ]"
              @click="handleMappingJiaGouToResume(item.id, item.addConsultantId)"
              :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})&#13;${item.worksOne}&#13;${item.worksTwo}`"
            >
              {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
            </span>
          </span>
        </a-col>
      </a-row> -->
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
  import { LinkOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { message, Modal } from 'ant-design-vue';
  import { formatToDate } from '/@/utils/dateUtil';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import OrginalPath from '/@/components/OrginalPath/index.vue';
  import MappingJiaGou from './MappingJiaGou.vue';
  import { normalizeText } from '/@/utils/normalizeText';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeReport, resumeId, resumeTypeEnglish,resumeContainerIndexBtnFlag,orginalPathShow } = storeToRefs(resumeDetailStore);
  defineProps({
    showResumeAdd: {
      type: Boolean,
      default: false,
    },
    showResumeRightOutFlag: {
      type: Boolean,
      default: false,
    },
  });
  const resumeIdCurrent = ref('');
  watch(resumeId, () => {
    resumeIdCurrent.value = resumeId.value;
  });
  const expend = ref(false);
  const expendUpdate = ref(false);
  const handleReportContentUpdate = () => {
    expendUpdate.value = true;
    expend.value = false;
  };
  const resumeReportDetails = ref([
    {
      index: '',
      resumeId: '',
      realNameEn: '',
      reportContent: '',
      reportContentEn: '',
      orginalPathEn: '',
      resumeIdEn: '',
      orginalPath: '',
      teamName: '',
      source: '',
      registTime: '',
      addConsultantId: '',
    },
  ]);
  watch(resumeReport, () => {
    resumeReportDetails.value = resumeReport.value?.map((item, index) => ({
      index: (index + 1).toString(),
      resumeId: item.resumeId,
      realNameEn: item.realNameEn,
      reportContent: item.reportContent,
      reportContentEn: item.reportContentEn,
      orginalPathEn: item.orginalPathEn,
      resumeIdEn: item.resumeIdEn,
      orginalPath: item.orginalPath,
      teamName: item.teamName || '',
      source: item.source || '',
      registTime: item.registTime ? formatToDate(item.registTime) : '',
      registTimeOther: item.registTimeOther ? formatToDate(item.registTimeOther) : '',
      addConsultantId: item.addConsultantId,
    }));
  });
  const formState = ref({
    reportContent: '',
    reportContentShow: '',
  });
  const iconLoading = ref(false);
  const handleReportContent = (reportContent) => {
    if (reportContent) {
      //formState.value.reportContent = reportContent?.replaceAll(/<[^>]+>/g, '');
    formState.value.reportContent = reportContent
      ?.replaceAll(/<\/?p[^>]*>/g, '\n')  // 匹配所有p标签替换为换行
      .replace(/\n+/g, '\n')             // 合并多个换行
      .trim(); 
      formState.value.reportContentShow = formState.value.reportContent;
      expend.value = true;
    } else {
      expendUpdate.value = true;
      formState.value.reportContent = '';
      formState.value.reportContentShow = '';
    }
  };
  const handleCancelReportContent = () => {
    expend.value = false;
    expendUpdate.value = false;
    formState.value.reportContent = '';
    iconLoading.value = false;
  };
  const onFinish = () => {
    iconLoading.value = true;
    resumeDetailStore.updateResumeReportContent(formState.value.reportContent).then((res) => {
      if (res.code == 1) {
        message.success('保存成功');
        handleCancelReportContent();
      } else {
        message.error('保存失败');
      }
      iconLoading.value = false;
    });
  };
  //原始简历预览开始
  const orginalPathBlobPath = ref('');
  const orginalPathHeaderShow = ref(false);
  const handleResumeOrginalPath = (path) => {
    orginalPathBlobPath.value = path;
    orginalPathHeaderShow.value = true;
  };
  const handleOrginalPathClose = () => {
    mappingJiaGouId.value = "";
    orginalPathHeaderShow.value = false;
  };
  const openOrginalPatChoose = ref(false);
  const openOrginalPatChooseOrginalPath = ref('');
  const openOrginalPatChooseOrginalPathEn = ref('');
  const handleResumeOrginalPathChoose = (orginalPath, orginalPathEn) => {
    openOrginalPatChoose.value = true;
    openOrginalPatChooseOrginalPath.value = orginalPath;
    openOrginalPatChooseOrginalPathEn.value = orginalPathEn;
  };
  const handleResumeOrginalPathChooseDetail = (type) => {
    openOrginalPatChoose.value = false;
    if (type == 1) {
      handleResumeOrginalPath(openOrginalPatChooseOrginalPath.value);
    } else {
      handleResumeOrginalPath(openOrginalPatChooseOrginalPathEn.value);
    }
  };
  //原始简历预览结束
  const handleChangeResume = (resumeIdChange, addConsultantIdChange, resumeTypeEnglish) => {
    resumeDetailStore.$patch({
      resumeTypeEnglish: resumeTypeEnglish,
    });
    resumeDetailStore.queryResumeDetail(resumeIdChange, addConsultantIdChange);
  };
  const personMappingColumns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 90,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      ellipsis: true,
      width: 40,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true,
      width: 50,
    },
    {
      title: '职状',
      dataIndex: 'jubStatus',
      key: 'jubStatus',
      ellipsis: true,
      width: 50,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 750,
    },
  ];
  const workExpColumns = [
    {
      title: '周期',
      dataIndex: 'isNewtest',
      key: 'isNewtest',
      width: 50,
    },
    {
      title: '行业',
      dataIndex: 'retail',
      key: 'retail',
      ellipsis: true,
      width: 50,
    },
    {
      title: '品类',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 50,
    },
    {
      title: '类别',
      dataIndex: 'leiBie',
      key: 'leiBie',
      ellipsis: true,
      width: 70,
    },
    {
      title: '品籍',
      dataIndex: 'pinJi',
      key: 'pinJi',
      ellipsis: true,
      width: 50,
    },
    {
      title: '品级',
      dataIndex: 'retailLevel',
      key: 'retailLevel',
      ellipsis: true,
      width: 50,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 50,
    },
    {
      title: '商场',
      dataIndex: 'marketName',
      key: 'marketName',
      ellipsis: true,
      width: 100,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 180,
    },
    {
      title: '楼层',
      dataIndex: 'workFloor',
      key: 'workFloor',
      ellipsis: true,
      width: 40,
    },
    {
      title: '职位',
      dataIndex: 'postitonName',
      key: 'postitonName',
      ellipsis: true,
      width: 180,
    },
    {
      title: '年限',
      dataIndex: 'workYear',
      key: 'workYear',
      ellipsis: true,
      width: 40,
    },
    {
      title: '架构',
      dataIndex: 'siGongNum',
      key: 'siGongNum',
      ellipsis: true,
      width: 60,
    },
  ];
  const personMappingList = ref([]);
  const workExpMappingList = ref([]);
  const resumeMappinglag = ref(false);
  const handleResumeMapping = () => {
    resumeMappinglag.value = true;
    resumeDetailStore.resumeMapping().then((res) => {
      if (res.code == 1) {
        const { personMapping, workExpList } = res.info;
        personMappingList.value = personMapping.map((item) => {
          return {
            key: item.id,
            userName: item.userName,
            sex: item.sex,
            age: item.age,
            jubStatus: item.jubStatus == '1' ? '在职' : '离职',
          };
        });
        workExpMappingList.value = workExpList.map((item) => {
          return {
            key: item.id,
            isNewtest: item.IS_NEWTEST == 1 ? '当前' : '过往',
            category: item.category || '-',
            city: item.city || -'',
            marketId: item.marketId || '',
            marketName: item.marketName || '-',
            brandId: item.brandId || '',
            brand: item.brand || '-',
            workFloor: item.workFloor || '-',
            postitonName: item.postitonName || '-',
            workYear: item.workYear ? (item.workYear < 0 ? '0' : item.workYear.toFixed(2)) : '',
            siGongNum: ((item.noresumeMappingNum || 0)+(item.resumeNum || 0)),
            siGongLeaveNum: ((item.noresumeMappingLeaveNum || 0)+(item.resumeLeaveNum || 0)) ,
            retail: item.RETAIL || '',
            leiBie: item.LEIBIE || '',
            pinJi: item.PINJI || '',
            retailLevel: item.RETAILLEVEL || '',
          };
        });
      }
    });
  };
  const mappingJiaGouFlag = ref(false);
  let mappingJiaGouArrDetail = ref({
    mappingJiaManage: [],
    mappingJiaCharge: [],
    mappingJiaSenior: [],
    mappingJiaBase: [],
    mappingJiaStore: [],
  });
  let mappingJiaGouArr = ref({
    mappingJiaManage: [],
    mappingJiaCharge: [],
    mappingJiaSenior: [],
    mappingJiaBase: [],
    mappingJiaStore: [],
  });
 
  const handleColseCandidatePosition = () => {
    resumeMappinglag.value = false;
  };
  const handleWorks = (item) => {
    let html = "";
    if (item.END_YEAR == '-1') {
       html += `${item.START_YEAR}.${handleMonth(item.START_MONTH)} - 至今`;
    } else {
      html += `${item.START_YEAR}.${handleMonth(item.START_MONTH)} - ${item.END_YEAR}.${handleMonth(item.END_MONTH)}`;
    }
    if (item.COMPANY_NAME) {
      html += ` ${item.COMPANY_NAME}`;
    }
    if (item.CITY_NAME) {
      html += `-${item.CITY_NAME}`;
    }
    if (item.MARKET_NAME) {
      html += `-${item.MARKET_NAME}`;
    }
    if (item.BRAND_NAME) {
      html += `-${item.BRAND_NAME}`;
    }
    if (item.POSITION_NAME) {
      html += `-${item.POSITION_NAME}`;
    }
    return html;
  }
  const handleMonth = (month) => {
    return month < 10 ? `0${(+month)}` :  `${month}`;
  }
  const handleMappingJia = (item,type) => {
	return {
		key: item.ID,
		id: item.ID,
		addConsultantId: item.ADD_CONSULTANT_ID,
		userName: ((item.USER_NAME && item.USER_NAME != undefined) ? item.USER_NAME : ""),
		brand: ((item.BRAND_NAME && item.BRAND_NAME != undefined) ? item.BRAND_NAME : ""),
		city: ((item.isOpen == 1 && item.CITY_NAME && item.CITY_NAME != undefined) ? item.CITY_NAME : ""),
		age: ((item.isOpen == 1 && item.AGE && item.AGE != undefined) ? item.AGE : ""),
		sex: ((item.isOpen == 1 && item.SEX && item.SEX != undefined) ? item.SEX : ""),
		phoneNum: item.PHONE_NUM,
		management: item.MANAGEMENT2,
		marketName: ((item.MARKET_NAME && item.MARKET_NAME != undefined) ? item.MARKET_NAME : ""),
		groupName: ((item.isOpen == 1 && item.GROUP_NAME && item.GROUP_NAME != undefined) ? item.GROUP_NAME : ""),
		realNameEn: ((item.isOpen == 1 && item.REAL_NAME_EN && item.REAL_NAME_EN != undefined) ? item.REAL_NAME_EN : ""),
		positionName: ((item.POSITION_NAME && item.POSITION_NAME != undefined) ? item.POSITION_NAME : ""),
		jobStatus: item.JOB_STATUS == '在职' ? 1 : 2,
		type: type == 1 ? '简': 'M',
		isOpen: item.isOpen,
		updateTime: ((item.isOpen == 1 && item.UPDATE_TIME && item.UPDATE_TIME != undefined) ? formatToDate(item.UPDATE_TIME) : ""),
		worksOne: (item.isOpen == 1 && item.works && item.works.length > 0 ? handleWorks(item.works[0]) : ""),
		worksTwo: (item.isOpen == 1 && item.works && item.works.length > 1 ? handleWorks(item.works[1]) : ""),
	}
}
const mappingJiaGouFlagDetail = ref(true);
const mappingJiaGouFlagDetailChange = () => {
  if (mappingJiaGouFlagDetail.value) {
    mappingJiaGouArrDetail.value = {
      mappingJiaManage: mappingJiaGouArr.value.mappingJiaManage.filter(item => item.jobStatus == 1),
      mappingJiaCharge: mappingJiaGouArr.value.mappingJiaCharge.filter(item => item.jobStatus == 1),
      mappingJiaSenior: mappingJiaGouArr.value.mappingJiaSenior.filter(item => item.jobStatus == 1),
      mappingJiaBase: mappingJiaGouArr.value.mappingJiaBase.filter(item => item.jobStatus == 1),
      mappingJiaStore: mappingJiaGouArr.value.mappingJiaStore.filter(item => item.jobStatus == 1),
    }
  } else {
    mappingJiaGouArrDetail.value = {
      mappingJiaManage: mappingJiaGouArr.value.mappingJiaManage.filter(item => item.jobStatus == 2),
      mappingJiaCharge: mappingJiaGouArr.value.mappingJiaCharge.filter(item => item.jobStatus == 2),
      mappingJiaSenior: mappingJiaGouArr.value.mappingJiaSenior.filter(item => item.jobStatus == 2),
      mappingJiaBase: mappingJiaGouArr.value.mappingJiaBase.filter(item => item.jobStatus == 2),
      mappingJiaStore: mappingJiaGouArr.value.mappingJiaStore.filter(item => item.jobStatus == 2),
    }
  }
}
const siGongNumTitle = ref("在职");
const siGongLeaveNumTitle = ref("离职");
const mappingJiaGouId = ref("")
  const handleMappingJiaGou = (brandId, marketId, siGongNum, siGongLeaveNum) => {
    siGongNumTitle.value = `在职${siGongNum}`;
    siGongLeaveNumTitle.value = `离职${siGongLeaveNum}`;
    mappingJiaGouId.value = "";
    mappingJiaGouArr.value = {
      mappingJiaManage: [],
      mappingJiaCharge: [],
      mappingJiaSenior: [],
      mappingJiaBase: [],
      mappingJiaStore: [],
    };
    mappingJiaGouFlag.value = false;
    mappingJiaGouId.value = `${brandId}/${marketId}`;
    resumeDetailStore.resumeMappingJiagou(brandId, marketId).then((res) => {
      if (res.code == 1) {
        mappingJiaGouFlag.value = true;
        const tempSiArr = res.info?.resume;
        const tempGongArr = res.info?.noResumeMapping;
        if (tempSiArr && tempSiArr.length > 0) {
          tempSiArr.forEach((item) => {
            if (item.MANAGEMENT2 == '经理级别') {
              mappingJiaGouArr.value.mappingJiaManage.push(handleMappingJia(item,1));
            } else if (item.MANAGEMENT2 == '主管级别') {
              mappingJiaGouArr.value.mappingJiaCharge.push(handleMappingJia(item,1));
            } else if (item.MANAGEMENT2 == '资深级别') {
              mappingJiaGouArr.value.mappingJiaSenior.push(handleMappingJia(item,1));
            } else if (item.MANAGEMENT2 == '基础级别') {
              mappingJiaGouArr.value.mappingJiaBase.push(handleMappingJia(item,1));
            } else {
              mappingJiaGouArr.value.mappingJiaStore.push(handleMappingJia(item,1));
            }
          });
        }
        if (tempGongArr && tempGongArr.length > 0) {
          tempGongArr.forEach((item) => {
            if (item.MANAGEMENT2 == '经理级别') {
              mappingJiaGouArr.value.mappingJiaManage.push(handleMappingJia(item,2));
            } else if (item.MANAGEMENT2 == '主管级别') {
              mappingJiaGouArr.value.mappingJiaCharge.push(handleMappingJia(item,2));
            } else if (item.MANAGEMENT2 == '资深级别') {
              mappingJiaGouArr.value.mappingJiaSenior.push(handleMappingJia(item,2));
            } else if (item.MANAGEMENT2 == '基础级别') {
              mappingJiaGouArr.value.mappingJiaBase.push(handleMappingJia(item,2));
            } else {
              mappingJiaGouArr.value.mappingJiaStore.push(handleMappingJia(item,2));
            }
          });
        }
        mappingJiaGouFlagDetail.value = true;
        mappingJiaGouFlagDetailChange();
      }
    });
  };
  const router = useRouter();
  //跳转到英文简历添加页面根据中文简历ID
  const handleChangeResumeToAddEnglish = (resumeId, addConsultantId) => {
    Modal.confirm({
      title: '英文简历',
      content: '您是想要新增此候选人英文简历吗？系统支持“手动填写”或“英文简历上传”2种方式新增哦，请确认是否继续？',
      okText: '继续新增',
      onOk() {
        const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } =
          JSON.parse(localStorage.getItem('loginVueUser'));
        let query = { ...loginVueUser, addEnglish: '1', resumeId, addConsultantId };
        const href = router.resolve({
          path: '/resume',
          query: query,
        });
        window.open(href.href, '_blank');
      },
    });
  };
  const handleResumeContainerIndex = () => {
    if (orginalPathShow.value) {
      resumeContainerIndexBtnFlag.value = true;
    }
  }
</script>
<style lang="less" scoped>
.report-content {
  white-space: pre-line;
}
  .resume_header {
    margin: 10px 20px;
  }
  .resume_detail_title {
    font-size: 14px;
    text-align: left;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .resume_row {
    margin: 1px 0;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .active {
    background-color: aliceblue;
    border-radius: 4px;
  }
  .resume_h4 {
    margin: 5px 0;
    font-size: 16px;
  }
  .resume_span_two,
  .resume_span_one,
  .resume_span_name,
  .resume_span {
    display: inline-block;
    width: 45px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .resume_span_name {
    width: 80px;
  }
  .resume_span_one {
    width: 20px;
  }
  .resume_span_two {
    width: 70px;
  }

  .mappingJiaGouspan {
    display: inline-block;
    max-width: 270px;
    height: 25px;
    line-height: 1.6;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid #ccc;
    padding: 0 10px;
    border-radius: 15px;
    cursor: pointer;
  }
  .mappingJiaGouspanZaizhi {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  .mappingJiaGouspanLizhi {
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
  .mappingJiaGouspanWidth {
    display: inline-block;
    width: 280px;
    margin-top: 10px;
    margin-right: 30px;
  }
  .mappingJiaGouspandivider {
    background-color: #0505050f;
    margin-top: 0;
    margin-bottom: 3px;
  }
  .mappingJiaGouspanActive {
    border-color: #f43434;
    border: 2px solid #f43434;
  }
  .siGongNum {
    width: 40px;
    text-align: center;
    border: 1px solid #ccc;
    padding: 0 5px 2px 5px;
    border-radius: 15px;
  }
  .siGongNumActive {
    border-color: #f43434;
    color: #000;
    border: 2px solid #f43434;
  }
  .activceResume {
    border: 2px solid #f43499;
    position: relative;
    border-radius: 0;
  }
  .activceResume::after {
    content: '';
    background-image: url('/@/assets/images/3.png');
    position: absolute;
    width: 14px;
    height: 12px;
    bottom: 0px;
    right: 0px;
    background-size: cover;
  }
  :deep(.ant-drawer-content-wrapper .docx) {
    zoom: 0.6;
  }
  .resume_container_index_up {
    z-index: 99999;
    background-color: #fff;
    position: relative;
    box-shadow: 10px 0 16px #ccc;
    margin: 0px 2px 10px;
    padding-bottom: 10px;
  }
     .hint-text {
    position: absolute;
    top: 1px;
    left: 12px;
    z-index: 1;
    color: rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid #ccc;
    width: 96.5%;
    background-color: #fff;
  }
  .hint-text-area {
    position: relative
  }
  .hint-text-area:focus-within .hint-text {
    border-bottom: 1px solid #2372d9;
  }
   .hint-text-area:hover .hint-text {
    border-bottom: 1px solid #2372d9;
  }
</style>
