<template>
   <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          简历信息
        </h4>
        <a-button type="primary" style="background-color: #22c428;" size="small" @click="handleResumeMapping">M</a-button>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;margin-bottom: 5px;" />
    </a-row>
    <a-row :gutter="24" :key="item.resumeId" v-if="resumeReportDetails.length > 0" v-for="item in resumeReportDetails" :class="item.resumeId == resumeId ? ['resume_row','active'] : 'resume_row'" >
      <a-col :span="24">
        <span class="resume_span_one">{{ item.index }}</span>
        <span class="resume_span_name">{{ item.realNameEn }}</span>
        <span class="resume_span_name">{{ item.teamName }}</span>
        <span class="resume_span_two">{{ item.source }}</span>
        <span class="resume_span_name">{{ item.registTime }}</span>
        <span class="resume_span">
          <a-tag  v-if="!item.resumeId" style="cursor: not-allowed;">中文</a-tag>
          <a-tag  v-if="item.resumeId && resumeTypeEnglish == '1'" style="cursor: pointer;" @click="handleChangeResume(item.resumeId,item.addConsultantId,2)">中文</a-tag>
          <a-tag  v-if="item.resumeId && resumeTypeEnglish != '1'" color="pink" style="cursor: pointer;" @click="handleChangeResume(item.resumeId,item.addConsultantId,2)">中文</a-tag>
        </span>
        <!-- <span class="resume_span" v-if="!item.resumeIdEn">英文</span> -->
        <span class="resume_span_name">
          <a-tag  v-if="!item.resumeIdEn" style="cursor: not-allowed;">英文</a-tag>
          <a-tag  v-if="item.resumeIdEn && resumeTypeEnglish != '1'" @click="handleChangeResume(item.resumeIdEn,item.addConsultantId,1)">英文</a-tag>
          <a-tag  v-if="item.resumeIdEn && resumeTypeEnglish == '1'" color="pink" @click="handleChangeResume(item.resumeIdEn,item.addConsultantId,1)">英文</a-tag>
          <!-- <LinkOutlined v-if="item.orginalPathEn" @click="handleResumeOrginalPath(item.orginalPathEn)"/> -->
          <LinkOutlined v-if="item.orginalPath" @click="handleResumeOrginalPath(item.orginalPath)"/>
        </span>
        <span class="resume_span">
          <a-tag v-if="item.reportContent" color="#ffa500" style="cursor: pointer;" @click="handleReportContent(item.reportContent)">报告</a-tag>
          <a-tag v-if="!item.reportContent" style="cursor: pointer;" @click="handleReportContent(item.reportContent)">报告</a-tag>
        </span>
      </a-col>
    </a-row>
    <div v-if="expend">
      <a-row :gutter="24">
        <a-col :span="24" v-html="formState.reportContentShow"></a-col>
      </a-row>
      <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button v-if="showResumeAdd" type="primary" size="small" style="margin: 0 8px;" @click="handleReportContentUpdate">修改</a-button>
            <a-button v-if="showResumeAdd" size="small" @click="expend = false">关闭</a-button>
          </a-col>
        </a-row>
    </div>
    <div v-if="expendUpdate">
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item  name="reportContent" :rules="[{ required: true, message: '请输入简历报告' }]">
              <a-textarea
                :rows="7"
                v-model:value="formState.reportContent"
                placeholder="请输入简历报告"
              ></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button type="primary" size="small" :loading="iconLoading" style="margin: 0 8px;" html-type="submit">保存</a-button>
            <a-button size="small" @click="handleCancelReportContent">取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <OrginalPath v-if="orginalPathShow" :orginalPath="orginalPath"/>
  </div>
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
    <a-row :gutter="24" style="margin-top: 5px;">
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
          <a v-if="record.siGongNum" @click="handleMappingJiaGou(record.brandId,record.marketId)">{{ record.siGongNum }}</a>
          <a v-else>{{ record.siGongNum }}</a>
        </template>
      </template>
  </a-table>
  </div>
  <div v-if="mappingJiaGouFlag">
    <a-row :gutter="24" v-if="mappingJiaGouArr.mappingJiaManage && mappingJiaGouArr.mappingJiaManage.length >0">
      <a-col :span="24">
          <h4 class="resume_h4">经理级别</h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #0505050f;margin-top: 0;margin-bottom: 0;" />
      <a-col :span="24">
        <span class="mappingJiaGouspan" v-for="item in mappingJiaGouArr.mappingJiaManage" :key="item.key" @click="handleMappingJiaGouToResume(item.id,item.addConsultantId)" :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})`">
          {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
        </span>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="mappingJiaGouArr.mappingJiaCharge && mappingJiaGouArr.mappingJiaCharge.length >0">
      <a-col :span="24">
          <h4 class="resume_h4">主管级别</h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #0505050f;margin-top: 0;margin-bottom: 0;" />
      <a-col :span="24">
        <span class="mappingJiaGouspan" v-for="item in mappingJiaGouArr.mappingJiaCharge" :key="item.key" @click="handleMappingJiaGouToResume(item.id,item.addConsultantId)" :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})`">
          {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
        </span>
      </a-col>
      
    </a-row>
    <a-row :gutter="24" v-if="mappingJiaGouArr.mappingJiaSenior && mappingJiaGouArr.mappingJiaSenior.length >0">
      <a-col :span="24">
          <h4 class="resume_h4">资深级别</h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #0505050f;margin-top: 0;margin-bottom: 0;" />
    </a-row>
      <a-col :span="24">
        <span class="mappingJiaGouspan" v-for="item in mappingJiaGouArr.mappingJiaSenior" :key="item.key" @click="handleMappingJiaGouToResume(item.id,item.addConsultantId)" :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})`">
          {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
        </span>
      </a-col>
      
    <a-row :gutter="24" v-if="mappingJiaGouArr.mappingJiaBase && mappingJiaGouArr.mappingJiaManage.length >0">
      <a-col :span="24">
          <h4 class="resume_h4">基础级别</h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #0505050f;margin-top: 0;margin-bottom: 0;" />
      <a-col :span="24">
        <span class="mappingJiaGouspan" v-for="item in mappingJiaGouArr.mappingJiaBase" :key="item.key" @click="handleMappingJiaGouToResume(item.id,item.addConsultantId)" :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})`">
          {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
        </span>
      </a-col>
      
    </a-row>
    <a-row :gutter="24" v-if="mappingJiaGouArr.mappingJiaStore && mappingJiaGouArr.mappingJiaStore.length >0">
      <a-col :span="24">
          <h4 class="resume_h4">门店支持</h4>
        </a-col> 
        <a-divider :dashed="true" style="background-color: #0505050f;margin-top: 0;margin-bottom: 0;" />
      <a-col :span="24">
        <span class="mappingJiaGouspan" v-for="item in mappingJiaGouArr.mappingJiaStore" :key="item.key" @click="handleMappingJiaGouToResume(item.id,item.addConsultantId)" :title="`${item.userName}/${item.positionName}/${item.type}(${item.gongSi})`">
          {{ item.userName }}/{{ item.positionName }}/{{ item.type }}({{ item.gongSi }})
        </span>
      </a-col>
    </a-row>
  </div>
  </a-drawer>
</template>
<script setup lang="ts">
 import {  LinkOutlined,CloseOutlined } from '@ant-design/icons-vue';
 import { storeToRefs } from 'pinia';
 import { message } from 'ant-design-vue';
 import { formatToDate } from '/@/utils/dateUtil';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
import OrginalPath from '/@/components/OrginalPath/index.vue'
const resumeDetailStore = useResumeDetailStore();
const { resumeReport,resumeId,resumeTypeEnglish } =storeToRefs(resumeDetailStore);
defineProps({
    showResumeAdd: {
      type: Boolean,
      default: false,
    }
  });
const expend = ref(false);
const expendUpdate = ref(false);
const handleReportContentUpdate = () => {
  expendUpdate.value = true;
  expend.value = false;
}
const resumeReportDetails = ref([{
  index: '',
  resumeId: '',
  realNameEn: '',
  reportContent: '',
  orginalPathEn: '',
  resumeIdEn: '',
  orginalPath: '',
  teamName: '',
  source: '',
  registTime: '',
  addConsultantId: '',
}])
watch(resumeReport,()=> {
  resumeReportDetails.value = resumeReport.value?.map((item,index) => ({
    index: (index + 1).toString(),
    resumeId: item.resumeId,
    realNameEn: item.realNameEn,
    reportContent: item.reportContent,
    orginalPathEn: item.orginalPathEn,
    resumeIdEn: item.resumeIdEn,
    orginalPath: item.orginalPath,
    teamName: item.teamName || "",
    source: item.source || "",
    registTime: (item.registTime ? formatToDate(item.registTime) : ""),
    addConsultantId: item.addConsultantId,
  }))
})
const formState = ref({
  reportContent: '',
  reportContentShow: '',
})
const iconLoading = ref(false);
const handleReportContent = (reportContent) => {
  if (reportContent) {
    //formState.value.reportContent = reportContent?.replaceAll(/<[^>]+>/g, '');
    formState.value.reportContent = reportContent?.replaceAll(/<p>/g, '').replaceAll(/<(\/)?p>/g, '\n');
    formState.value.reportContentShow = reportContent;
    expend.value = true;
  } else {
    expendUpdate.value = true;
    formState.value.reportContent = '';
    formState.value.reportContentShow = '';
  }
  
}
const handleCancelReportContent = () => {
  expend.value = false;
  expendUpdate.value = false;
  formState.value.reportContent = '';
  iconLoading.value = false;
}
const onFinish = () => {
  iconLoading.value = true;
  resumeDetailStore.updateResumeReportContent(formState.value.reportContent).then(res => {
    if (res.code == 1) {
        message.success('保存成功');
        handleCancelReportContent();
      } else {
        message.error('保存失败');
      }
      iconLoading.value = false;
  });
}
const orginalPath = ref('');
const orginalPathShow = ref(false);
const handleResumeOrginalPath = (path) => {
  resumeDetailStore.resumeFlieToBlob(path).then(res => {
    orginalPath.value = path;
    orginalPathShow.value = true;
  })
}
const handleChangeResume = (resumeIdChange,addConsultantIdChange,resumeTypeEnglish) =>{
  resumeDetailStore.$patch({
    resumeTypeEnglish: resumeTypeEnglish
  })
  resumeDetailStore.queryResumeDetail(resumeIdChange,addConsultantIdChange);
}
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
      width: 70,
    },
    {
      title: '品类',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 70,
    },
    {
      title: '类别',
      dataIndex: 'leiBie',
      key: 'leiBie',
      ellipsis: true,
      width: 50,
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
      width: 70,
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
      width: 50,
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
      width: 50,
    },
    {
      title: '架构',
      dataIndex: 'siGongNum',
      key: 'siGongNum',
      ellipsis: true,
      width: 50,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 140,
    },
  ];
const personMappingList = ref([]);
const workExpMappingList = ref([]);
const resumeMappinglag = ref(false);
const handleResumeMapping = () => {
  resumeMappinglag.value = true;
  resumeDetailStore.resumeMapping().then(res => {
    if (res.code == 1) {
        const {personMapping,workExpList} = res.info;
        personMappingList.value = personMapping.map(item => {
          return {
            key: item.id,
            userName: item.userName,
            sex: item.sex,
            age: item.age,
            jubStatus: item.jubStatus == "1" ? "在职" : "离职",
          }
        })
        workExpMappingList.value = workExpList.map(item => {
          return {
            key: item.id,
            isNewtest: item.IS_NEWTEST == 1 ? "当前" : "过往",
            category: item.category || "-",
            city: item.city || -"",
            marketId: item.marketId || "",
            marketName: item.marketName || "-",
            brandId: item.brandId || "",
            brand: item.brand || "-",
            workFloor: item.workFloor || "-",
            postitonName: item.postitonName || "-",
            workYear: (item.workYear ? (item.workYear < 0 ? "0" : item.workYear.toFixed(2)) : ""),
            siGongNum: (item.siNum ? (item.siNum || "")+"/"+(item.gongNum || "") : "-"),
            retail: item.RETAIL || "",
            leiBie: item.LEIBIE || "",
            pinJi: item.PINJI || "",
            retailLevel: item.RETAILLEVEL || "",
          }
        })
    }
  });
}
const mappingJiaGouFlag = ref(false);
let mappingJiaGouArr = ref({
  mappingJiaManage: [],
  mappingJiaCharge: [],
  mappingJiaSenior: [],
  mappingJiaBase: [],
  mappingJiaStore: [],
});
const router = useRouter();
const handleMappingJiaGouToResume = (resumeId,addConsultantId) => {
  const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
    let query = {...loginVueUser, resumeId, addConsultantId};
    // if (loginVueUser.loginType != "A" && (!formState.value.leftType || formState.value.leftType == "1" || formState.value.leftType == "2" || formState.value.leftType == "3" || formState.value.leftType == "4")) {
    //   query = {...loginVueUser, resumeId, addConsultantId,searchRecommend: "T"};
    // }
    const href = router.resolve({
      path: '/resume/detail',
      query: query,
    });
    window.open(href.href, '_blank')
}
const handleMappingJiaGou = (brandId,marketId) =>{
  mappingJiaGouArr.value = {
  mappingJiaManage: [],
  mappingJiaCharge: [],
  mappingJiaSenior: [],
  mappingJiaBase: [],
  mappingJiaStore: [],
}
  mappingJiaGouFlag.value = false;
  resumeDetailStore.resumeMappingJiagou(brandId,marketId).then(res => {
    if (res.code == 1) {
        mappingJiaGouFlag.value = true;
        const tempSiArr = res.info?.markPersonSi;
        const tempGongArr = res.info?.markPersonGong;
        if (tempSiArr && tempSiArr.length > 0) {
          tempSiArr.forEach(item => {
            if (item.MANAGEMENT2 == '经理级别') {
              mappingJiaGouArr.value.mappingJiaManage.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '私',
                type: '简'
              });
            } else if (item.MANAGEMENT2 == '主管级别') {
              mappingJiaGouArr.value.mappingJiaCharge.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '私',
                type: '简'
              });
            } else if (item.MANAGEMENT2 == '资深级别') {
              mappingJiaGouArr.value.mappingJiaSenior.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '私',
                type: '简'
              });
            } else if (item.MANAGEMENT2 == '基础级别') {
              mappingJiaGouArr.value.mappingJiaBase.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '私',
                type: '简'
              });
            } else {
              mappingJiaGouArr.value.mappingJiaStore.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '私',
                type: '简'
              });
            }
          });
        }
        if (tempGongArr && tempGongArr.length > 0) {
          tempGongArr.forEach(item => {
            if (item.MANAGEMENT2 == '经理级别') {
              mappingJiaGouArr.value.mappingJiaManage.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '公',
                type: '简'
              });
            } else if (item.MANAGEMENT2 == '主管级别') {
              mappingJiaGouArr.value.mappingJiaCharge.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '公',
                type: '简'
              });
            } else if (item.MANAGEMENT2 == '资深级别') {
              mappingJiaGouArr.value.mappingJiaSenior.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '公',
                type: '简'
              });
            } else if (item.MANAGEMENT2 == '基础级别') {
              mappingJiaGouArr.value.mappingJiaBase.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '公',
                type: '简'
              });
            } else {
              mappingJiaGouArr.value.mappingJiaStore.push({
                key: item.ID,
                id: item.ID,
                addConsultantId: item.ADD_CONSULTANT_ID,
                userName: item.USER_NAME,
                management: item.MANAGEMENT2,
                positionName: item.POSITION_NAME,
                gongSi: '公',
                type: '简'
              });
            }
          });
        }
        console.log(mappingJiaGouArr)
    }
  });
} 
const handleColseCandidatePosition = () => {
  resumeMappinglag.value = false;
}
</script>
<style lang="less" scoped>
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
    margin-top: 2px;
    margin-right: 15px;
    padding: 0 10px;
    border-radius: 15px;
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
</style>