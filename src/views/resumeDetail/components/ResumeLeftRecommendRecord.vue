<template>
   <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          推荐记录
        </h4>
        <a v-if="expendMapping" @click="handleToMappingDetails">
          <svg style="vertical-align: -webkit-baseline-middle;" t="1742461890138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4775" width="12" height="12"><path d="M590.665387 86.129778v178.119111c-390.144 0-713.386667 129.649778-544.995556 703.260444-26.396444-358.570667 147.456-471.096889 544.995556-471.096889v174.762667a30.606222 30.606222 0 0 0 52.451555 21.959111l371.768889-291.783111a31.232 31.232 0 0 0 0-44.032l-371.768889-293.205333a30.606222 30.606222 0 1 0-52.451555 22.016z" fill="#666666" p-id="4776"></path></svg>
        </a>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;margin-bottom: 5px;" />
    </a-row>
    <a-table
      size="small"
      :dataSource="resumeList"
      rowKey="key"
      :pagination="pagination"
      :columns="columns"
      class="row_table"
      :locale="{ emptyText: '暂无推荐记录' }"
      @change="handleQueryResumeRecord"
    >
    <template #bodyCell="{ column, record }">
      <!-- <template v-if="column.key === 'action' && (record.currentStatus == '顾问通过' || record.currentStatus == 'HR通过' || record.currentStatus == '简发顾问' || record.currentStatus == '重新推荐' || record.currentStatus == '超时未审' || record.currentStatus == '初试已排' || record.currentStatus.includes('试通过') || record.currentStatus.includes('试确认')
|| record.currentStatus == '推荐顾问'  || record.currentStatus == 'OFFER接受' || record.currentStatus == '简发HR' || record.currentStatus == '简发HR' || record.currentStatus == '顾问待定')
      ">
      <VerticalAlignBottomOutlined :style="{fontSize: '16px'}" @click="handleOpenResumeUpload(record.city,record.market,record.brand,record.positions,record.pId,record.resumeName,record.resumeLanguage)"/>
      </template> -->
      <template v-if="column.key === 'action'">
        <svg v-if="record.recommendResumePdf && record.currentStatus === '简历存疑'" @click="handleResumeOrginalPathDwonload(record,1)" style="vertical-align: middle;margin-left: 3px;" t="1752564505670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5261" width="13" height="13"><path d="M721.066667 674.133333H302.933333c-25.6 0-42.666667-17.066667-42.666666-42.666666s17.066667-42.666667 42.666666-42.666667h418.133334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666666zM721.066667 819.2H302.933333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666h418.133334c25.6 0 42.666667 17.066667 42.666666 42.666666s-17.066667 42.666667-42.666666 42.666667zM503.466667 499.2c-25.6 0-42.666667-17.066667-42.666667-42.666667v-25.6c0-29.866667-21.333333-51.2-51.2-51.2h-12.8c-29.866667 0-55.466667 21.333333-55.466667 51.2v25.6c0 25.6-17.066667 42.666667-42.666666 42.666667s-42.666667-17.066667-42.666667-42.666667v-25.6c0-76.8 59.733333-136.533333 136.533333-136.533333h12.8c76.8 0 136.533333 59.733333 136.533334 136.533333v25.6c4.266667 25.6-12.8 42.666667-38.4 42.666667z" fill="#8a8a8a" p-id="5262"></path><path d="M396.8 332.8C341.333333 332.8 298.666667 285.866667 298.666667 230.4s42.666667-98.133333 98.133333-98.133333 98.133333 46.933333 98.133333 98.133333-42.666667 102.4-98.133333 102.4z m0-115.2c-8.533333 0-12.8 4.266667-12.8 12.8 0 8.533333 8.533333 12.8 12.8 12.8s12.8-8.533333 12.8-12.8c4.266667-8.533333-4.266667-12.8-12.8-12.8z" fill="#8a8a8a" p-id="5263"></path><path d="M942.933333 307.2c0-12.8-4.266667-21.333333-12.8-29.866667L648.533333 12.8c-8.533333-8.533333-17.066667-12.8-25.6-12.8H119.466667c-25.6 0-42.666667 17.066667-42.666667 42.666667v938.666666c0 25.6 17.066667 42.666667 42.666667 42.666667h780.8c25.6 0 42.666667-17.066667 42.666666-42.666667V307.2c4.266667 0 0 0 0 0z m-277.333333-166.4l128 119.466667h-128V140.8zM162.133333 938.666667V85.333333h413.866667v221.866667c0 12.8 4.266667 21.333333 12.8 29.866667 8.533333 8.533333 17.066667 12.8 29.866667 12.8h238.933333V938.666667H162.133333z" fill="#8a8a8a" p-id="5264"></path></svg>            
          <svg v-else-if="record.recommendResumePdf && !(record.currentStatus == '顾问通过' || record.currentStatus == 'HR通过' || record.currentStatus == '简发顾问' || record.currentStatus == '重新推荐' || record.currentStatus == '超时未审' || record.currentStatus == '初试已排' || record.currentStatus.includes('试通过') || record.currentStatus.includes('试确认')
|| record.currentStatus == '推荐顾问'  || record.currentStatus == 'OFFER接受' || record.currentStatus == '简发HR' || record.currentStatus == '简发HR' || record.currentStatus == '顾问待定')" @click="handleResumeOrginalPath(record.recommendResumePdf,2)" style="vertical-align: middle;margin-left: 3px;" t="1752564505670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5261" width="13" height="13"><path d="M721.066667 674.133333H302.933333c-25.6 0-42.666667-17.066667-42.666666-42.666666s17.066667-42.666667 42.666666-42.666667h418.133334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666666zM721.066667 819.2H302.933333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666h418.133334c25.6 0 42.666667 17.066667 42.666666 42.666666s-17.066667 42.666667-42.666666 42.666667zM503.466667 499.2c-25.6 0-42.666667-17.066667-42.666667-42.666667v-25.6c0-29.866667-21.333333-51.2-51.2-51.2h-12.8c-29.866667 0-55.466667 21.333333-55.466667 51.2v25.6c0 25.6-17.066667 42.666667-42.666666 42.666667s-42.666667-17.066667-42.666667-42.666667v-25.6c0-76.8 59.733333-136.533333 136.533333-136.533333h12.8c76.8 0 136.533333 59.733333 136.533334 136.533333v25.6c4.266667 25.6-12.8 42.666667-38.4 42.666667z" fill="#8a8a8a" p-id="5262"></path><path d="M396.8 332.8C341.333333 332.8 298.666667 285.866667 298.666667 230.4s42.666667-98.133333 98.133333-98.133333 98.133333 46.933333 98.133333 98.133333-42.666667 102.4-98.133333 102.4z m0-115.2c-8.533333 0-12.8 4.266667-12.8 12.8 0 8.533333 8.533333 12.8 12.8 12.8s12.8-8.533333 12.8-12.8c4.266667-8.533333-4.266667-12.8-12.8-12.8z" fill="#8a8a8a" p-id="5263"></path><path d="M942.933333 307.2c0-12.8-4.266667-21.333333-12.8-29.866667L648.533333 12.8c-8.533333-8.533333-17.066667-12.8-25.6-12.8H119.466667c-25.6 0-42.666667 17.066667-42.666667 42.666667v938.666666c0 25.6 17.066667 42.666667 42.666667 42.666667h780.8c25.6 0 42.666667-17.066667 42.666666-42.666667V307.2c4.266667 0 0 0 0 0z m-277.333333-166.4l128 119.466667h-128V140.8zM162.133333 938.666667V85.333333h413.866667v221.866667c0 12.8 4.266667 21.333333 12.8 29.866667 8.533333 8.533333 17.066667 12.8 29.866667 12.8h238.933333V938.666667H162.133333z" fill="#8a8a8a" p-id="5264"></path></svg>            
      <svg  v-else-if="(record.currentStatus == '顾问通过' || record.currentStatus == 'HR通过' || record.currentStatus == '简发顾问' || record.currentStatus == '重新推荐' || record.currentStatus == '超时未审' || record.currentStatus == '初试已排' || record.currentStatus.includes('试通过') || record.currentStatus.includes('试确认')|| record.currentStatus == '推荐顾问'  || record.currentStatus == 'OFFER接受' || record.currentStatus == '简发HR' || record.currentStatus == '简发HR' || record.currentStatus == '顾问待定')" @click="handleResumeOrginalPathDwonload(record,3)" style="vertical-align: middle;margin-left: 3px;" t="1752564505670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5261" width="13" height="13"><path d="M721.066667 674.133333H302.933333c-25.6 0-42.666667-17.066667-42.666666-42.666666s17.066667-42.666667 42.666666-42.666667h418.133334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666666zM721.066667 819.2H302.933333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666h418.133334c25.6 0 42.666667 17.066667 42.666666 42.666666s-17.066667 42.666667-42.666666 42.666667zM503.466667 499.2c-25.6 0-42.666667-17.066667-42.666667-42.666667v-25.6c0-29.866667-21.333333-51.2-51.2-51.2h-12.8c-29.866667 0-55.466667 21.333333-55.466667 51.2v25.6c0 25.6-17.066667 42.666667-42.666666 42.666667s-42.666667-17.066667-42.666667-42.666667v-25.6c0-76.8 59.733333-136.533333 136.533333-136.533333h12.8c76.8 0 136.533333 59.733333 136.533334 136.533333v25.6c4.266667 25.6-12.8 42.666667-38.4 42.666667z" fill="#8a8a8a" p-id="5262"></path><path d="M396.8 332.8C341.333333 332.8 298.666667 285.866667 298.666667 230.4s42.666667-98.133333 98.133333-98.133333 98.133333 46.933333 98.133333 98.133333-42.666667 102.4-98.133333 102.4z m0-115.2c-8.533333 0-12.8 4.266667-12.8 12.8 0 8.533333 8.533333 12.8 12.8 12.8s12.8-8.533333 12.8-12.8c4.266667-8.533333-4.266667-12.8-12.8-12.8z" fill="#8a8a8a" p-id="5263"></path><path d="M942.933333 307.2c0-12.8-4.266667-21.333333-12.8-29.866667L648.533333 12.8c-8.533333-8.533333-17.066667-12.8-25.6-12.8H119.466667c-25.6 0-42.666667 17.066667-42.666667 42.666667v938.666666c0 25.6 17.066667 42.666667 42.666667 42.666667h780.8c25.6 0 42.666667-17.066667 42.666666-42.666667V307.2c4.266667 0 0 0 0 0z m-277.333333-166.4l128 119.466667h-128V140.8zM162.133333 938.666667V85.333333h413.866667v221.866667c0 12.8 4.266667 21.333333 12.8 29.866667 8.533333 8.533333 17.066667 12.8 29.866667 12.8h238.933333V938.666667H162.133333z" fill="#8a8a8a" p-id="5264"></path></svg>            
      </template>
      <template v-if="column.key === 'date'">
        <a-tag :title="`${record.counselor} ${record.date}`">查看</a-tag>
      </template>
    </template>
  </a-table>
  </div>
  <a-modal :maskClosable="false" @cancel="handleCloseResumeUpload" v-model:open="openResumeUpload" style="width: 600px;" title="下载简历" :footer="null">
          <a-row :gutter="24">
            <a-col :span="3">
              推荐信息: 
            </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-input :disabled="true" size="small" style="width: 90%;" v-model:value="workRecommendAll"/> 
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;" v-if="description">
            <a-col :span="3">企顾要求: </a-col>
            <a-col :span="21" style="padding: 0;">{{ description }}</a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="3">简历语言: </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-radio-group v-model:value="resumeType" 
              :disabled="resumeTypeFlag">
              <a-radio value="C">中文</a-radio>
              <a-radio value="E">英文</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="3">简历模板: </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-radio-group v-model:value="templateType" :disabled="true">
              <a-radio value="youtai">U-Talent</a-radio>
              <a-radio value="wotui">Wotui</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="3">联系方式: </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-switch style="margin-bottom: 3px;" v-model:checked="systemUser" checked-children="联系方式已展示" un-checked-children="联系方式已隐藏" />
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="3">简历命名: </a-col>
            <a-col :span="21" style="padding: 0;">
              <a-select
              class="resumeName"
              style="width: 90%;"
              v-model:value="resumeName"
              :disabled="resumeNameFlag"
              :options="optionsResumeName"
            ></a-select>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="24" style="text-align: center;">
              <a-button size="small" @click="handleTemplateType" type="primary">下载</a-button>
            </a-col>
          </a-row>
  </a-modal>
  <a-drawer
    v-model:open="orginalPathShow"
    :title="orginalPathTitle"
    rootClassName="custom-drawer-orginal"
    :keyboard="false"
    :closable="false"
    :mask="false"
    :width="drawerWidth"
    :rootStyle="orginalPathMargin"
    :bodyStyle="{ padding: '14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
    @headerClick="handleOrginalPathIndex" 
  >
   <div 
        class="drag-handle"
        @mousedown="startDragging"
    ></div>
    <!-- <template #header>
      <CloseOutlined @click="handleOrginalPathClose" />
    </template> -->
    <template #extra>
      <a-button size="small" @click="handleOrginalPathReport">报告</a-button>
      <svg v-if="resumeContainerIndexBtnFlag" style="margin-right: 15px;vertical-align: text-bottom;margin-left: -5px;transform: scaleY(-1);" t="1752718465602" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18505" width="16" height="16"><path d="M921.088 630.784c-12.8-12.8-31.744-12.8-44.544 0l-233.472 230.4v-691.2c0-15.872-15.872-31.744-31.744-31.744s-31.744 15.872-31.744 31.744v768c0 15.872 15.872 31.744 31.744 31.744 9.728 0 19.456-3.072 22.528-9.728l287.744-284.672c12.288-12.288 12.288-31.744-0.512-44.544z" fill="#8a8a8a" p-id="18506"></path></svg>
      <svg v-if="!resumeContainerIndexBtnFlag" style="margin-right: 15px;vertical-align: text-bottom;margin-left: -5px;" t="1752718465602" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18505" width="16" height="16"><path d="M921.088 630.784c-12.8-12.8-31.744-12.8-44.544 0l-233.472 230.4v-691.2c0-15.872-15.872-31.744-31.744-31.744s-31.744 15.872-31.744 31.744v768c0 15.872 15.872 31.744 31.744 31.744 9.728 0 19.456-3.072 22.528-9.728l287.744-284.672c12.288-12.288 12.288-31.744-0.512-44.544z" fill="#8a8a8a" p-id="18506"></path></svg>
      <!-- <svg v-if="resumeContainerIndexBtnFlag" style="margin-right: 15px;vertical-align: sub;" t="1752664326017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5297" width="13" height="13"><path d="M90.29375 443.7828125L518.2015625 15.875 939.9078125 437.58125l-49.6125 49.6125-334.884375-334.884375L555.4109375 1008.125l-68.2171875 1e-8 0-855.81562501L139.90625 493.3953125l-49.6125-49.6125z m0 0" p-id="5298" fill="#8a8a8a"></path></svg>
      <svg v-if="!resumeContainerIndexBtnFlag" style="margin-right: 15px;vertical-align: sub;" t="1752664405881" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5997" width="13" height="13"><path d="M947.2 582.4L505.6 1024 70.4 588.8l51.2-51.2 345.6 345.6V0h70.4v883.2L896 531.2l51.2 51.2z m0 0" p-id="5998" fill="#8a8a8a"></path></svg> -->
      <VerticalAlignBottomOutlined title="下载简历" v-if="handleResumeOrginalPathType == 3" style="margin-right: 15px;vertical-align: sub;font-size: 16px;" @click="handleOpenResumeUpload()"/>
      <CloseOutlined @click="handleOrginalPathClose" />
    </template>
    <div @click="handleOrginalPathIndex" style="height: 90vh;">
      <OrginalPath :orginalPathBlobPath="orginalPathBlobPath" />
      <div style="position: absolute;bottom: 2%;left: 38%;" v-if="handleResumeOrginalPathType == 1">
          <a-button type="primary" size="large" danger  @click="handleClickRepeatRecommend()">
    已按照企顾要求修改，重新推荐
  </a-button>
  </div>
    </div>
  </a-drawer>
  <!-- <RecommendCandidatePositionChecked
    :recommendPerson="recommendPerson"
    :userName="resumeDetail.resume.userName"
    :repeatRecommendFlag="false"
  /> -->
</template>
<script setup lang="ts">
 import { VerticalAlignBottomOutlined,CloseOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeUnmount,onMounted  } from 'vue';
import { message, SelectProps } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import OrginalPath from '/@/components/OrginalPath/index.vue';
//import RecommendCandidatePositionChecked from './RecommendCandidatePositionChecked.vue';
//import type { SelectProps } from 'ant-design-vue';
import { formatToDateMinute } from '/@/utils/dateUtil';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
const resumeDetailStore = useResumeDetailStore();
const { resumeId,resumeReport,resumeRecord,resumeDetail,resumeTypeEnglish,handleResumePdfPath,recommendPerson,recommendFlag,repeatRecommendFlag,resumeContainerIndexFlag,resumeContainerIndexBtnFlag,orginalPathShow } =storeToRefs(resumeDetailStore);
const resumeList = ref([])
const pagination = ref({
  pageSize: 10,
  current: 1,
  total: 0,
  hideOnSinglePage: true,
  size:'small',
})
const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  const expendMapping = ref(false);
 const resumeRecordRepeat = ref({});
watch(resumeRecord,() => {
  resumeList.value = resumeRecord.value.list.map((item,index) => {
    let recommendResumePdf = item.recommendResumePdf;
    if (handleResumePdfPath.value && (item.status == '强制关闭' || item.status == '简历存疑' || item.status == '顾问拒绝' || item.status == '顾问放弃' || item.status == '暂时拒绝')) {
   if (item.id == handleResumePdfPath.value) {
        resumeRecordRepeat.value = item;
        if (recommendResumePdf && recommendResumePdf.length > 0 &&repeatRecommendFlag.value) {
          handleResumeOrginalPath((recommendResumePdf[0].checkPath || recommendResumePdf[0].pdfPath),1);
        } else if (item.status == '强制关闭' || item.status == '顾问拒绝' || item.status == '顾问放弃' || item.status == '暂时拒绝') {
          handleResumeOrginalPath('',1);
        }
      }
  }
  return {
    key: item.id.toString(),
    index: ((resumeRecord.value.pageNumber - 1) * resumeRecord.value.pageSize + (index + 1)),
    city: (item.city || ""),
    market: (item.marketName || ""),
    brand: item.brand,
    counselor: item.counselor,
    cId: item.cId,
    bId: item.bId,
    id: item.id,
    pId: item.pId,
    recommendResumePdf: (recommendResumePdf && recommendResumePdf.length > 0) ? (recommendResumePdf[0].checkPath ? recommendResumePdf[0].checkPath : recommendResumePdf[0].pdfPath) : "",
    positions: item.positions,
    date: (item.time ? formatToDateMinute(item.time) : ''),
    currentStatus: item.status,
    resumeName: item.resumeName,
    resumeLanguage: item.resumeLanguage,
  }});
  pagination.value = { pageSize: resumeRecord.value.pageSize, current: resumeRecord.value.pageNumber, total: resumeRecord.value.totalCount,hideOnSinglePage: true,size: 'small' };
  if (resumeRecord.value?.list?.length > 0 && (loginVueUser.loginType == "A" || loginVueUser.loginType == "T" || loginVueUser.loginType == "V" || loginVueUser.loginId == resumeDetail.value.resume.recruitId)) {
    expendMapping.value = true;
  }
})
  
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 40,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 40,
    },
    {
      title: '商场',
      dataIndex: 'market',
      key: 'market',
      ellipsis: true,
      width: 50,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 65,
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      ellipsis: true,
      width: 95,
    },
    {
      title: '推时',
      dataIndex: 'date',
      key: 'date',
      width: 40,
    },
    {
      title: '当前状态',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
      width: 60,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 20,
    },
  ];
  const handleQueryResumeRecord = (pagination) => {
    resumeDetailStore.queryResumeRecord(pagination.current);
  }
  //下载简历
  const openResumeUpload = ref(false);
  const workRecommendAll = ref("");
  const templateTypeShow = ref(false);
  const templateType = ref("");
  const description = ref("");
  const management = ref("");
  const systemUser = ref(true);
  const resumeTypeFlag = ref(true);
  const resumeNameFlag = ref(true);
  const resumeType = ref("");
  const resumeName = ref("");
  const optionsResumeName = ref<SelectProps['options']>([
    {label: "A中文格式:CN-姓名/中英-推荐职位/中文-推荐品牌/英文-推荐城市/中文-推荐商场/中文", value: "1"},
    {label: "B中文格式:CN-姓名/中英-推荐职位/中文-推荐品牌/中文-推荐城市/中文-推荐商场/中文", value: "2"},
    {label: "C英文格式:EN-姓名/中英-推荐职位/英文-推荐品牌/英文-推荐商场/中文-推荐城市/英文", value: "3"},
  ]);
  if (resumeTypeEnglish.value == '1') {
    resumeType.value = 'E';
  } else {
    resumeType.value = 'C';
  }
  watch(resumeTypeEnglish, () => {
    if (resumeTypeEnglish.value == '1') {
    resumeType.value = 'E';
  } else {
    resumeType.value = 'C';
  }
  })
  
  const handleResumeOrginalRecord = ref({});
  const handleOpenResumeUpload = () => {
    openResumeUpload.value = true;
    const recommendCity = handleResumeOrginalRecord.value.city;
    const recommendMarket = handleResumeOrginalRecord.value.market;
    const recommendBrand = handleResumeOrginalRecord.value.brand;
    const recommendPosition = handleResumeOrginalRecord.value.positions;
    const pId = handleResumeOrginalRecord.value.pId;
    const resumeNameTemp = handleResumeOrginalRecord.value.resumeName;
    const resumeLanguageTemp = handleResumeOrginalRecord.value.resumeLanguage;
    let tempObj = {
      recommendCity: recommendCity,
      recommendMarket: recommendMarket,
      recommendBrand: recommendBrand,
      recommendPosition: recommendPosition,
    }
    workRecommendAll.value = `${recommendCity}-${recommendBrand}-${recommendMarket}-${recommendPosition}`
    resumeDetailStore.resumeRecommendMsg(tempObj).then(res => {
      resumeDetailStore.queryCandidatePositionRequest(pId).then(res => {
        if (res.code == 1) {
          if (res.info) {
            templateType.value = res.info.template == '0' ? 'youtai' : 'wotui';
            description.value = res.info.description;
            management.value = res.info.management == '管理' ? '2' : '1';
            if (res.info.management == '管理') {
              systemUser.value = false;
            }
            templateTypeShow.value = true;
            if (resumeNameTemp) {
              resumeName.value = resumeNameTemp;
            } else {
              resumeNameFlag.value = false;
            }
            if (resumeLanguageTemp && resumeLanguageTemp != 'F') {
              resumeType.value = resumeLanguageTemp;            
              if (checkCurrentResumeHaveEnglish()) {
                  resumeTypeFlag.value = false;
              }
            } else {
              if (checkCurrentResumeHaveEnglish()) {
                  resumeTypeFlag.value = false;
              }
            }
          }
        }
      })
    })
  }

  const resumeReportTemp = ref([]);
  const checkCurrentResumeHaveEnglish = () => {
    const currentResumeId = resumeId.value;
    // 使用find代替some获取匹配对象
    const matchedItem = resumeReport.value.find(item => 
      (item.resumeId === currentResumeId || item.resumeIdEn === currentResumeId) && 
      item.resumeIdEn
    );
    // 将找到的对象赋值给resumeReportTemp
    resumeReportTemp.value = matchedItem ? [matchedItem] : [];
    // 返回是否找到的布尔值
    return !!matchedItem;
  }


  const screenWidth = Math.round(window.screen.width * window.devicePixelRatio);
  const handleCloseResumeUpload = () => {
    openResumeUpload.value = false;
    templateTypeShow.value = false;
    templateType.value = '';
    workRecommendAll.value = '';
  }
  const handleTemplateType = () => {
    if (!templateType.value) {
      message.error('请选择模板');
      return;
    }
    if (!resumeName.value) {
      message.error('请选择简历命名');
      return;
    }
    const realNameEn = resumeDetail.value.realNameEn;
    const systemUserTemp = systemUser.value ? "1" : "2";
    const resumeIdsWord = `${resumeId.value}-${handleResumeOrginalRecord.value?.pId}-${handleResumeOrginalRecord.value?.id}`;
    let resumeIdTemp = resumeId.value;
    if (!resumeTypeFlag.value) {
      if (resumeType.value == 'E') {
        resumeIdTemp = resumeReportTemp.value[0].resumeIdEn;
      } else {
        resumeIdTemp = resumeReportTemp.value[0].resumeId;
      }
    }
    //location.href = "http://work.wotui.com:8889/WTSM/" + "DownloadResumeServlet?resumeId=${resume.id }&resumeType=C&systemUser=" + resumeTypeFlag + "&template=" + valTemp + "&realEnName=" + realNameEn+"&screenWidth="+screenWidth;
    //location.href = `http://localhost:8080/WTSM/DownloadResumeServlet?resumeId=${resumeId.value}&resumeType=${resumeType.value}&systemUser=${systemUserTemp}&template=${templateType.value}&resumeName=${resumeName.value}&realEnName=${realNameEn}&screenWidth=${screenWidth}`
    location.href = `http://work.wotui.com:8889/WTSM/DownloadResumeServlet?resumeId=${resumeIdTemp}&resumeType=${resumeType.value}&systemUser=${systemUserTemp}&template=${templateType.value}&resumeName=${resumeName.value}&realEnName=${realNameEn}&screenWidth=${screenWidth}&isPdf=&pid=${handleResumeOrginalRecord.value.pId}&recommendId=${handleResumeOrginalRecord.value.id}&isZip=&resumeIdsPdf=&resumeIdsWord=${resumeIdsWord}&recommendIdList=${handleResumeOrginalRecord.value.id}&isVideoImage=`
    handleCloseResumeUpload();
  }
  
  const handleToMappingDetails = () => {
    window.open(`http://work.wotui.com:8889/WTSM/candidateRecommend/query-search-recommend-list-pager.html?phone=${resumeDetail.value.resume.phoneNum}`,"_blank")
  }

  

  const orginalPathBlobPath = ref('');
  // watch(handleResumePdfPath, () => {
  //   handleResumeOrginalPath("");
  // })
  const orginalPathMargin = ref({marginTop: '0%'});
  const handleResumeOrginalPathType = ref(1);
  const orginalPathTitle = ref("审核标注");
  const handleResumeOrginalPathDwonload = (record,type) => {
    handleResumeOrginalRecord.value = record;
    if (type == 1) {
        resumeRecordRepeat.value = record;
    }
    handleResumeOrginalPath(record.recommendResumePdf,type);
  }
  const handleResumeOrginalPath = (path,type) => {
    orginalPathMargin.value = {marginTop: '0%'};
    orginalPathBlobPath.value = path;
    orginalPathShow.value = true;
    handleResumeOrginalPathType.value = type;
    if (handleResumeOrginalPathType.value == 1) {
      orginalPathTitle.value = "审核标注";
    } else {
      orginalPathTitle.value = "推荐简历";
    }
  };
  const handleOrginalPathClose = () => {
    orginalPathShow.value = false;
    handleOrginalPathIndex();
  };
  const handleOrginalPathReport = () => {
    resumeContainerIndexBtnFlag.value = !resumeContainerIndexBtnFlag.value;
    if (resumeContainerIndexBtnFlag.value) {
      orginalPathMargin.value = {marginTop: '20%'};
    } else {
      orginalPathMargin.value = {marginTop: '0%'};
    }
    
  }
  const handleClickRepeatRecommend = () => {
    recommendPerson.value = {
      ...recommendPerson.value,
      city: resumeRecordRepeat.value.city,
      id: resumeRecordRepeat.value.pId,
      bId: resumeRecordRepeat.value.bId,
      rid: resumeRecordRepeat.value.id,
      cId: resumeRecordRepeat.value.cId,
    }; 
    recommendFlag.value= true;
    repeatRecommendFlag.value= false;
  }
  // watch(repeatRecommendFlag,() => {
  //   if (repeatRecommendFlag.value && handleResumePdfPath.value) {
  //       resumeDetailStore.queryResumeRecord(1);
  //       handleOrginalPathClose();
  //   }
  // })
  const drawerWidth = ref(639);
let isDragging = false;
let startX = 0;
let startWidth = 0;

const startDragging = (e) => {
    isDragging = true;
    startX = e.clientX;
    startWidth = drawerWidth.value;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDragging);
};

const handleDrag = (e) => {
    if (!isDragging) return;
     requestAnimationFrame(() => {
        const deltaX = startX - e.clientX;
        const newWidth = startWidth + deltaX;
        // 添加缓冲区域限制
        if (newWidth > 400 && newWidth < window.innerWidth * 0.8) {
            drawerWidth.value = Math.floor(newWidth);
        }
    });
};

const stopDragging = () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDragging);
};
onMounted(() => {
    document.documentElement.style.cursor = 'default'; // 修复光标残留问题
});
onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDragging);
});
const handleOrginalPathIndex = () => {
  resumeContainerIndexFlag.value = false;
  resumeContainerIndexBtnFlag.value = false;
}
</script>
<style lang="less" scoped>
 .resume_header {
  margin: 10px 20px;
 }
 .resume_detail_title {
    display: flex;
    justify-content: space-between;
  }
 .resume_h4 {
    margin: 5px 0;
    font-size: 16px;
  }
  .resume_span {
    margin-right: 40px;
    font-size: 14px;
    font-weight: 400;
  }
   :deep(.row_table) th,
   :deep(.row_table) td{
    padding: 3px !important;
  }
  :deep(.resumeName .ant-select-selector) {
    height: 25px;
  }
  :deep(.resumeName .ant-select-selector .ant-select-selection-item) {
    line-height: 25px;
  }
  .drag-handle {
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    width: 8px;
    cursor: col-resize;
    z-index: 1001;
    &:hover {
        background-color: rgba(24, 144, 255, 0.2);
    }
  }
</style>