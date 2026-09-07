<template>
  <div>
    <a-card v-if="plagiarusnRseult == 1" class="resume_card">
      <h3 class="resume_title_h3">查重结果</h3>
      <a-divider class="resume_divider" dashed />
      <a-result class="resume_result" status="success" title="恭喜您，查重通过，您可以继续上传简历咯 ！ ">
        <template #extra>
          <a-button type="primary" @click="handleUploadBtn" style="background-color: orange;border-color: orange;">完善简历</a-button>
        </template>
      </a-result>
      <!-- <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 1 }"
      :wrapper-col="{ span: 5 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="中文名"
        name="userNameCn"
        :rules="[{ required: true, message: '必填，必须正确填写中文全名' }]"
      >
        <a-input class="form-input" v-model:value="formState.userNameCn" />
      </a-form-item>

      <a-form-item
        label="英文名"
        name="userNameEn"
        :rules="[{ required: false, message: '选填' }]"
      >
        <a-input class="form-input" v-model:value="formState.userNameEn" />
      </a-form-item>

      <a-form-item
        label="手机"
        name="phoneNum"
        :rules="[{ required: true, message: '必填，必须填写正确手机' }]"
      >
        <a-input class="form-input" v-model:value="formState.phoneNum" />
      </a-form-item>

      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '必填，必须填写正确邮箱' }]"
      >
        <a-input class="form-input" v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="城市"
        name="city"
        :rules="[{ required: true, message: '必填，请正确填写候选人当前所在城市' }]"
      >
        <a-select
          class="form-select"
          v-model:value="formState.city"
          placeholder="请正确填写候选人当前所在城市"
          show-search
        >
        <a-select-option
          v-for = "item in cityList"
          :key="item.id"
          :value="item.cityName"
        >{{ item.cityName }}</a-select-option>
      </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 2, span: 4 }">
        <a-button class="form-btn" type="primary" html-type="submit">提交查重</a-button>
      </a-form-item>
    </a-form> -->
    </a-card>
    <a-card v-if="plagiarusnRseult != 0 && plagiarusnRseult != 1" class="resume_card">
      <h3 class="resume_title_h3">查重结果</h3>
      <a-divider class="resume_divider" dashed />
      <!-- <a-result class="resume_result" status="warning" :title="`此人才简历与您“我的简历”库中简历重复度为100%，您不能重复上传哦！`"></a-result> -->
      <a-result class="resume_result" status="warning" :title="`此人才的简历与系统中简历重复度在${ resultPpercentage }，您不能继续上传哦！`">
        <template v-if="loginVueUser.loginType == 'A'" #extra>
          <a-button type="primary" @click="handleUploadBtn" style="background-color: orange;border-color: orange;">完善简历</a-button>
        </template>
      </a-result>
      <a-table size="small" :dataSource="plagiarusnInfo.info" :columns="columnsPlagiarusnRseult">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userName'">
            <a
              href="javascript:;"
              @click.prevent="handleToResumeDetailsCurrent(record)"
            >
              {{ record.userName }}
            </a>
          </template>
          <template v-if="column.key === 'realNameEn'">
                    <span :title="record.registTimeStr">{{ record.realNameEn || '公共库' }}</span>
                  </template>
                  <template v-if="column.key === 'registTimeStr'">
                    <span :title="record.registTimeStr">{{ record.registTimeStr }}</span>
                  </template>
                  <template v-if="column.key === 'lastUpdateTimeStr'">
                    <a-tag v-if='!record.callLastTime' color="red">7日未联</a-tag>
                    <a-tag v-if='record.callLastTime && calculateDateDiff(record.callLastTime) > 7' color="red">7日未联</a-tag>
                    <a-tag v-if='record.callLastTime && calculateDateDiff(record.callLastTime) <= 7' color="green">7日已联</a-tag>
                    <a-tag v-if='record.notConnectFlag == 1' color="red" :title="record.notConnectTime">未接</a-tag>
                  </template>
                  <template v-if="column.key === 'projectFlag'">
                     <a-tag
                      class="tagspan"
                      v-if="record.zaiZhi == '2'"
                      color="red"
                      >离职</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="record.zaiZhi == '1'"
                      color="green"
                      >在职</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="showResumeRightOutFlag && !record.recruitId && record.projectFlag == '待保'"
                      color="red"
                      >过保</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanGreen"
                      :title="record.limitRemarkDetail"
                      v-if="showResumeRightOutFlag && !record.recruitId && record.projectFlag == '在保'"
                      color="green"
                      >{{ record.projectFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="showResumeRightOutFlag && !record.recruitId && record.projectFlag == '不保'"
                      color="red"
                      >过保</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="showResumeRightOutFlag && !record.recruitId && record.projectFlag == '过保'"
                      color="red"
                      >{{ record.projectFlag }}</a-tag
                    >
                    <!-- <a-tag class="tagspan" v-if="showResumeRightOutFlag && !record.recruitId" color="orange">公共</a-tag> -->
                    <a-tag
                      class="tagspan"
                      v-if="showResumeRightOutFlag && !record.recruitId && record.twoYearFlag == '两年'"
                      color="green"
                      >两年</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanWhite"
                      :title="record.checkedTime"
                      v-if="record.recruitId && record.checkFlag == '待核'"
                      color="#d8d8d8"
                      >{{ record.checkFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="showResumeRightOutFlag && record.recruitId && record.checkFlag == '待激活' && record.resumeStatus != '外包保护期中'"
                      color="#d8d8d8"
                      >激活</a-tag
                    >
                    <!-- <a-tag class="tagspan" v-if="record.recruitId && record.checkFlag == '已激活'" color="green">激活</a-tag> -->
                    <a-tag
                      class="tagspan tagspanGreen"
                      :title="record.newTime"
                      v-if="
                        record.recruitId &&
                        record.checkFlag &&
                        record.checkFlag != '待核' &&
                        record.checkFlag != '待激活' &&
                        record.checkFlag != '已激活' &&
                        record.checkFlag != '过期'
                      "
                      color="green"
                      >{{ record.checkFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanOrange"
                      :title="record.newTime"
                      v-if="
                        record.recruitId &&
                        record.checkFlag &&
                        record.checkFlag == '过期'
                      "
                      color="orange"
                      >{{ record.checkFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanWhite"
                      :title="record.checkedTime"
                      v-if="showResumeRightOutFlag && record.checkFlag == '待核' && record.fristFlag"
                      color="#d8d8d8"
                      >{{ record.fristFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanGreen"
                      :title="record.checkedTime"
                      v-if="showResumeRightOutFlag && record.checkFlag != '待核' && record.fristFlag"
                      color="green"
                      >{{ record.fristFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="record.teamId == '160401' && record.checkFlag == '待核' && record.fristFlag == '首增'"
                      color="#d8d8d8"
                      >{{ record.fristFlag }}</a-tag
                    >
                    <a-tag
                      class="tagspan"
                      v-if="record.teamId == '160401' && record.checkFlag != '待核' && record.fristFlag == '首增'"
                      color="green"
                      >{{ record.fristFlag }}</a-tag
                    >
                    <!-- <a-tag class="tagspan" v-if="showResumeRightOutFlag && record.recruitId && record.onlyFlag" color="green">{{
                      record.onlyFlag
                    }}</a-tag> -->
                    <!-- <a-tag
                      class="tagspan tagspanGreen"
                      :title="record.commonFlagTime"
                      v-if="showResumeRightOutFlag && record.recruitId && record.commonFlag"
                      color="green"
                      >{{ record.commonFlag }}</a-tag
                    > -->
                    <!-- <a-tag class="tagspan" v-if="showResumeRightOutFlag && record.recruitId && record.gognGongFlag" color="orange">{{
                      record.gognGongFlag
                    }}</a-tag> -->
          
                    <!-- <a-tag class="tagspan" v-if="record.recruitId && record.limitFlag == '保护'" color="green">{{ record.limitFlag }}</a-tag> -->
                   
                    <a-tag
                      class="tagspan tagspanOrange"
                      :title="record.limitRemarkDetail"
                      v-if="showResumeRightOutFlag && (record.limitFlag == '限制禁推' || record.limitFlag == '限制分单') && record.resumeStatus != '外包保护期中'"
                      color="orange"
                      >限制</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanOrange"
                      :title="record.limitRemarkDetail ? record.limitRemarkDetail : 'OFFER推荐禁止'"
                      v-if="showResumeRightOutFlag && record.limitFlag == '限制' && record.resumeStatus != '外包保护期中'"
                      color="orange"
                      >限制</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanOrange"
                      :title="record.limitRemarkDetail"
                      v-if="showResumeRightOutFlag && record.limitFlag == '激活' && record.resumeStatus != '外包保护期中'"
                      color="orange"
                      >激活</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanOrange"
                      :title="record.offerTime"
                      v-if="record.limitFlag == 'OFFER' && record.resumeStatus != '保证期中'"
                      color="orange"
                      >OFFER</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanOrange"
                      :title="record.entryTime"
                      v-if="record.limitFlag == 'OFFER' && record.resumeStatus == '保证期中'"
                      color="orange"
                      >保证期</a-tag
                    >
                    <a-tag
                      class="tagspan tagspanOrange"
                      title="外包保护期中"
                      v-if="record.resumeStatus == '外包保护期中'"
                      color="orange"
                      >保证期</a-tag>
                    <a-tag
                      class="tagspan tagspanOrange"
                      v-if="record.isBlack == '1'"
                      color="red"
                      :title="loginVueUser.loginType == 'A' ? (record.blackRemark ? record.blackRemark : '此候选人已经存在公司黑名单中，禁止推荐') : '此候选人已经存在公司黑名单中，禁止推荐'"
                      >黑名单</a-tag>
                  </template>
                  <template v-if="column.key === 'repeat'">
                    {{ resultPpercentage }}
                  </template>
        </template>
      </a-table>
    </a-card>
    <a-card v-if="plagiarusnInfoFlag && showResumeRightOutFlag" class="resume_card">
      <h3 class="resume_title_h3">警告信息</h3>
      <a-divider class="resume_divider" dashed />
      <div>
        <!-- <p class="resume_p">1、系统候选人简历具有唯一性，如系统中候选人简历已经存在，顾问还采用更换手机号码等方式重复添加简历，则公司将按照制度处罚！（如候选人系统中手机号码已经不再使用，则可联系行政部修改，禁止重复添加此人简历）</p
        >
        <p class="resume_p">2、添加简历查重时，候选人“中文姓名”“手机”“邮箱”“当前城市”都是非常重要的信息，如填写虚假或错误信息，则此数据为垃圾数据，并导致系统查重失败引起重复，如发现以上情况，公司不接受任何借口和理由，将统一按照制度处罚，请务必慎重对待！</p
        > -->
        <p class="resume_p">系统中候选人简历具有唯一性，同一名候选人简历若存在不同的顾问名下，则系统将根据“姓名”“手机”“邮箱”“工作经历”等信息关联为同一人才，禁止顾问采用更换手机号码、更换邮箱等方式来规避系统的查重检测，若发现公司将按照制度严重处罚！</p
          >
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { usePlagiarusnStoreWithOut } from '/@/store/modules/plagiarusn';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { handleToResumeDetails } from '/@/router/index';
  import dayjs, { Dayjs } from 'dayjs';
  import { storeToRefs } from 'pinia';
  const plagiarusnStore = usePlagiarusnStoreWithOut();
  const resumeListStore = useResumeListStoreWithOut();
  const {plagiarusnRseult, plagiarusnInfoFlag, plagiarusnInfo} = storeToRefs(plagiarusnStore);
  const showResumeRightOutFlag = ref(false);
  const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginOutFlag: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser'),
);
 if (loginVueUser.loginOutFlag != '1' && loginVueUser.loginOutFlag != '3' && loginVueUser.loginOutFlag != '4') {
      showResumeRightOutFlag.value = true; 
    }
  let resultPpercentage = ref("");
  watch(plagiarusnRseult,() => {
    if (plagiarusnRseult.value == 2 || plagiarusnRseult.value == 4 || plagiarusnRseult.value == 8) {
      resultPpercentage.value = "100%";
    }
    if (plagiarusnRseult.value == 3 || plagiarusnRseult.value == 6 || plagiarusnRseult.value == 9 || plagiarusnRseult.value == 11) {
      resultPpercentage.value = "90%";
    }
    if (plagiarusnRseult.value == 5 || plagiarusnRseult.value == 7) {
      resultPpercentage.value = "95%";
    }
    if (plagiarusnRseult.value == 10 || plagiarusnRseult.value == 7) {
      resultPpercentage.value = "80%";
    }
  }); 
  const handleUploadBtn = () => {
    plagiarusnStore.resumeInfoShow(true);
    plagiarusnStore.plagiarusnRseultShow(0);
    plagiarusnStore.plagiarusnInfoFlagShow(false);
  };
  const handleToResumeDetailsCurrent = (record) => {
    if (!record?.id || !record?.addConsultantId) {
      return;
    }
    handleToResumeDetails(record.id, record.addConsultantId);
  };
 const calculateDateDiff = (callLastTime) => {
  if (callLastTime) {
    const diffDays = dayjs().diff(dayjs(callLastTime), 'day', true);
    const rounded = Math.round(diffDays * 100) / 100;
    return rounded;
  }
  return 0;
 }
  const columnsPlagiarusnRseult = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
     {
      title: '年龄',
      dataIndex: 'birthYear',
      key: 'birthYear',
    },
     {
      title: '城市',
      dataIndex: 'currentCity',
      key: 'currentCity',
    },
    {
      title: '当前职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '手机',
      dataIndex: 'phoneNum',
      key: 'phoneNum',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '顾问',
      dataIndex: 'realNameEn',
      key: 'realNameEn',
    },
    {
      title: '新增日期',
      dataIndex: 'registTimeStr',
      key: 'registTimeStr',
    },
    {
      title: '联络状态',
      dataIndex: 'lastUpdateTimeStr',
      key: 'lastUpdateTimeStr',
    },
    {
      title: '标签',
      dataIndex: 'projectFlag',
      key: 'projectFlag',
    },
    {
      title: '重复度',
      dataIndex: 'repeat',
      key: 'repeat',
    },
  ];
  
 
</script>
<style lang="less">
  .resume_card {
    margin: 0 40px;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 20px 40px 0 rgba(0, 0, 0, 0.02);
    margin-bottom: 5px;
    h3 {
      font-weight: 700;
      margin-bottom: 0;
    }
  }
</style>
