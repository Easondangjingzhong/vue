<template>
   <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          推荐记录
        </h4>
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
      <template v-if="column.key === 'action' && (record.currentStatus == '顾问通过' || record.currentStatus == 'HR通过' || record.currentStatus == '简发顾问' || record.currentStatus == '重新推荐' || record.currentStatus == '超时未审' || record.currentStatus == '初试已排'
|| record.currentStatus == '推荐顾问'  || record.currentStatus == 'OFFER接受' || record.currentStatus == '简发HR' || record.currentStatus == '简发HR')
      ">
      <VerticalAlignBottomOutlined :style="{fontSize: '16px'}" @click="handleOpenResumeUpload(record.city,record.market,record.brand,record.positions,record.pId)"/>
      </template>
      <template v-if="column.key === 'date'">
        <a-tag :title="`${record.counselor} ${record.date}`">查看</a-tag>
      </template>
    </template>
  </a-table>
  </div>
  <a-modal :maskClosable="false" @cancel="handleCloseResumeUpload" v-model:open="openResumeUpload" style="width: 600px;" title="下载简历" :footer="null">
          <a-row :gutter="24">
            <a-col :span="24">
              推荐信息: 
              <a-input :disabled="true" size="small" style="width: 90%;" v-model:value="workRecommendAll"/> 
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;" v-if="description">
            <a-col :span="24">企顾要求: </a-col>
            <a-col :span="24">{{ description }}</a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px;">
            <a-col :span="24">
              <a-radio-group v-model:value="templateType" :disabled="true">
              <a-radio value="youtai">优态模板</a-radio>
              <a-radio value="wotui">我推模板</a-radio>
              </a-radio-group>
              <a-switch style="margin-bottom: 3px;" v-model:checked="systemUser" checked-children="联系方式已展示" un-checked-children="联系方式已隐藏" />
              <a-button size="small" style="margin-left: 5px;" @click="handleTemplateType" type="primary">下载</a-button>
            </a-col>
          </a-row>
        </a-modal>
</template>
<script setup lang="ts">
 import { VerticalAlignBottomOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
//import type { SelectProps } from 'ant-design-vue';
import { formatToDateMinute } from '/@/utils/dateUtil';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
const resumeDetailStore = useResumeDetailStore();
const { resumeId,resumeRecord,resumeDetail } =storeToRefs(resumeDetailStore);
const resumeList = ref([])
const pagination = ref({
  pageSize: 10,
  current: 1,
  total: 0,
  hideOnSinglePage: true,
  size:'small',
})
watch(resumeRecord,() => {
  resumeList.value = resumeRecord.value.list.map((item,index) => ({
    key: item.id.toString(),
    index: ((resumeRecord.value.pageNumber - 1) * resumeRecord.value.pageSize + (index + 1)),
    city: (item.city || ""),
    market: (item.marketName || ""),
    brand: item.brand,
    counselor: item.counselor,
    pId: item.pId,
    positions: item.positions,
    date: (item.time ? formatToDateMinute(item.time) : ''),
    currentStatus: item.status,
  }));
  pagination.value = { pageSize: resumeRecord.value.pageSize, current: resumeRecord.value.pageNumber, total: resumeRecord.value.totalCount,hideOnSinglePage: true,size: 'small' };
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
      width: 65,
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
  const handleOpenResumeUpload = (recommendCity,recommendMarket,recommendBrand,recommendPosition,pId) => {
    openResumeUpload.value = true;
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
          }
        }
      })
    })
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
    const realNameEn = resumeDetail.value.realNameEn;
    const systemUserTemp = systemUser.value ? "1" : "2";
    //location.href = "http://work.wotui.com:8889/WTSM/" + "DownloadResumeServlet?resumeId=${resume.id }&resumeType=C&systemUser=" + resumeTypeFlag + "&template=" + valTemp + "&realEnName=" + realNameEn+"&screenWidth="+screenWidth;
    location.href = `http://work.wotui.com:8889/WTSM/DownloadResumeServlet?resumeId=${resumeId.value}&resumeType=C&systemUser=${systemUserTemp}&template=${templateType.value}&realEnName=${realNameEn}&screenWidth=${screenWidth}`
    handleCloseResumeUpload();
  }
</script>
<style lang="less" scoped>
 .resume_header {
  margin: 10px 20px;
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
</style>