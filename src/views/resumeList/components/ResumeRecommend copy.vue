<template>
  <div class="resume-content-search">
    <a-form
      ref="formRef"
      :labelCol="{ span: 6 }"
      :model="formState"
      @finish="onFinish"
      labelAlign="right"
    >
      <a-row :gutter="24">
        <a-col :span="spanCol">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formState.userName" />
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="phone" label="手机">
            <a-input v-model:value="formState.phone" />
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.city"
              show-search
              :allowClear="true"
              :options="optionsCity"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="brand" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.brand"
              show-search
              :allowClear="true"
              :options="optionsBrand"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="spanCol" class="row_col_space_counselor">
          <a-form-item
            name="recommendChangeCounselor"
            label="推荐顾问"
            class="row_col_space_left_counselor"
          >
            <a-select
              optionFilterProp="label"
              :allowClear="true"
              :showArrow="false"
              v-model:value="formState.recommendChangeCounselor"
              :options="optionsRecommendCounselorChange"
              @change="handleRecommendCounselorChange"
            ></a-select>
          </a-form-item>
          <a-form-item name="recommendCounselor" class="row_col_space_right_counselor">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.recommendCounselor"
              show-search
              :allowClear="true"
              :options="optionsRecommendCounselor"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="counselor" label="企业顾问">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.counselor"
              show-search
              :allowClear="true"
              :options="optionsCounselor"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="consultantFeedback" label="顾问反馈">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.consultantFeedback"
              show-search
              :allowClear="true"
              :options="optionsFeedback"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="hrFeedback" label="HR反馈">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.hrFeedback"
              show-search
              :allowClear="true"
              :options="optionsHrFeedback"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" v-if="expand > 2">
        <a-col :span="spanCol">
          <a-form-item name="interviewResult" label="面试状态">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.interviewResult"
              show-search
              :allowClear="true"
              :options="optionsInterviewResult"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="offerChoice" label="OFFER">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.offerChoice"
              show-search
              :allowClear="true"
              :options="optionsOfferChoice"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="recommendStatus" label="当前状态">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.recommendStatus"
              show-search
              :allowClear="true"
              :options="optionsRecommendStatus"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="endStatus" label="最终">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.endStatus"
              show-search
              :allowClear="true"
              :options="optionsEndStatus"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" v-if="expand > 3">
        <a-col :span="spanCol">
          <a-form-item name="positionsId" label="职位">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.positionsId"
              show-search
              :allowClear="true"
              :options="optionsPositions"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="teamId" label="团队">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.teamId"
              show-search
              :allowClear="true"
              :options="optionsTeam"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="quality" label="颜色">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.quality"
              show-search
              :allowClear="true"
              :options="optionsQuality"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.companyName"
              show-search
              :allowClear="true"
              :options="optionsCompany"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="spanCol">
          <a-form-item name="timeType" label="时间类型">
            <a-select
              optionFilterProp="label"
              v-model:value="formState.timeType"
              show-search
              :allowClear="true"
              :options="optionsTimeType"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-range-picker v-model:value="selectTime" />
        </a-col>
        <a-col :span="spanCol" style="margin-left: 50px">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
          <a @click="handleExpand">
            <template v-if="expand < 4">
              <DoubleRightOutlined :rotate="90" />
              更多
            </template>
            <template v-else="expand == 4">
              <DoubleLeftOutlined :rotate="90" />
              最简
            </template>
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-row style="margin-bottom: 5px;">
      <a-tag v-for="item in listNumber" :class="item.classNum" @click="handleListNumber(item.btnNum)">{{ item.name }}{{ item.num }}</a-tag>
    </a-row>
    <a-table
      size="small"
      :dataSource="resumeList"
      :pagination="false"
      rowKey="key"
      :loading="tableLoading"
      :columns="columns"
      :scroll="{ x: 1355 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'newRecommendTime'">
          <a-tag
            v-if="record.repeatTime"
            :title="`${record.newRecommendTime} &#10;重新推荐时间: ${record.repeatTime}`"
            color="cyan"
            >查看</a-tag
          >
          <a-tag v-else :title="record.newRecommendTime" color="cyan">查看</a-tag>
        </template>
        <template v-if="column.key === 'recommendCounselor'">
          <a-tag v-if="record.overOneDay === '1'" title="超一日未发简历" color="red">{{
            record.recommendCounselor
          }}</a-tag>
          <span v-if="record.overOneDay != '1'" :title="record.recommendCounselor">{{
            record.recommendCounselor
          }}</span>
        </template>
        <template v-if="column.key === 'consultantFeedback'">
          <a-tag
            :title="
              record.feedbackReason
                ? `${record.consultantFeedbackTime} &#10;${record.feedbackReason}`
                : `${record.consultantFeedbackTime}`
            "
            v-if="record.quality == '红花'"
            color="#FD6661"
            >{{
              record.consultantFeedback == '顾问通过'
                ? '企顾通过'
                : record.consultantFeedback == '顾问拒绝'
                ? '企顾拒绝'
                : record.consultantFeedback
            }}</a-tag
          >
          <a-tag
            :title="
              record.feedbackReason
                ? `${record.consultantFeedbackTime} &#10;${record.feedbackReason}`
                : `${record.consultantFeedbackTime}`
            "
            v-else-if="record.quality == '蓝花'"
            color="#5BC0DE"
            >{{
              record.consultantFeedback == '顾问通过'
                ? '企顾通过'
                : record.consultantFeedback == '顾问拒绝'
                ? '企顾拒绝'
                : record.consultantFeedback
            }}</a-tag
          >
          <a-tag
            :title="
              record.feedbackReason
                ? `${record.consultantFeedbackTime} &#10;${record.feedbackReason}`
                : `${record.consultantFeedbackTime}`
            "
            v-else-if="record.quality == '绿叶'"
            color="#5eb95e"
            >{{
              record.consultantFeedback == '顾问通过'
                ? '企顾通过'
                : record.consultantFeedback == '顾问拒绝'
                ? '企顾拒绝'
                : record.consultantFeedback
            }}</a-tag
          >
          <a-tag
            :title="
              record.feedbackReason
                ? `${record.consultantFeedbackTime} &#10;${record.feedbackReason}`
                : `${record.consultantFeedbackTime}`
            "
            v-else
            >{{
              record.consultantFeedback == '顾问通过'
                ? '企顾通过'
                : record.consultantFeedback == '顾问拒绝'
                ? '企顾拒绝'
                : record.consultantFeedback
            }}</a-tag
          >
        </template>
        <template v-if="column.key === 'recommendStatus'">
          <a-tag v-if="record.isHuan == '1' && record.recommendStatus != '职位关闭'" color="#ff9800"
            >系统暂缓</a-tag
          >
          <a-tag v-else-if="record.isErro == '1'" color="#ff9800">流程异常</a-tag>
          <a-tag v-else-if="record.isErro == '3'" color="#bf1b0f">强制结束</a-tag>
          <a-tag v-else-if="record.recommendStatus == 'HR通过'" color="#00b050">HR简过</a-tag>
          <a-tag v-else-if="record.recommendStatus == 'HR拒绝'" color="#bf1b0f">HR简拒</a-tag>
          <a-tag v-else-if="record.recommendStatus == 'HR待定'" color="#ff9800">HR待定</a-tag>
          <a-tag v-else-if="record.recommendStatus == '简历重复'" color="#bf1b0f">简历重复</a-tag>
          <a-tag v-else-if="record.recommendStatus == '催促中'" color="#c0504d">催促中</a-tag>
          <a-tag v-else-if="record.recommendStatus == '企顾企弃'" color="#bf1b0f">企业放弃</a-tag>
          <a-tag v-else-if="record.recommendStatus == '企顾人弃'" color="#bf1b0f">人才放弃</a-tag>
          <a-tag v-else-if="record.recommendStatus == '顾问拒绝'" color="#bf1b0f">企顾拒绝</a-tag>
          <a-tag
            v-else-if="
              record.recommendStatus == '未发HR' ||
              record.recommendStatus == 'HR拒绝' ||
              record.recommendStatus == '超时关闭' ||
              record.recommendStatus == '顾问放弃' ||
              record.recommendStatus == '强制关闭' ||
              record.recommendStatus == '暂时拒绝' ||
              record.recommendStatus == '未出席' ||
              record.recommendStatus == '拒绝面试' ||
              record.recommendStatus == 'OFFER拒绝' ||
              record.recommendStatus == '职位关闭' ||
              record.recommendStatus == '面试未过'
            "
            color="#bf1b0f"
            >{{ record.recommendStatus }}</a-tag
          >
          <a-tag
            v-else-if="
              record.jobType == '自营外包职位' &&
              (record.recommendStatus == '被动离职' || record.recommendStatus == '主动离职')
            "
            color="#bf1b0f"
            >外包离职</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '主动离职'"
            title="保期未过-人才放弃"
            color="#bf1b0f"
            >保期未过</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '被动离职'"
            title="保期未过-企业放弃"
            color="#bf1b0f"
            >保期未过</a-tag
          >
          <a-tag
            v-else-if="record.jobType == '自营外包职位' && record.recommendStatus == '保证期中'"
            color="#00b050"
            >外包保护</a-tag
          >
          <a-tag
            v-else-if="record.jobType == '自营外包职位' && record.recommendStatus == 'OFFER接受'"
            color="#00b050"
            >外包OFFER</a-tag
          >
          <a-tag
            v-else-if="
              record.recommendStatus == '保证期中' || record.recommendStatus == 'OFFER接受'
            "
            color="#00b050"
            >{{ record.recommendStatus }}</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '个人放弃'"
            title="未下OFFER-个人放弃"
            color="#bf1b0f"
            >未下OFFER</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '人才放弃'"
            title="放弃入职-人才放弃"
            color="#bf1b0f"
            >放弃入职</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '企业放弃' && record.offerChoice != 'OFFER接受'"
            title="未下OFFER-企业放弃"
            color="#bf1b0f"
            >未下OFFER</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '企业放弃' && record.offerChoice == 'OFFER接受'"
            title="放弃入职-企业放弃"
            color="#bf1b0f"
            >放弃入职</a-tag
          >
          <a-tag v-else-if="record.recommendStatus == '面过企弃'" color="#bf1b0f">企业放弃</a-tag>
          <a-tag v-else-if="record.recommendStatus == '入超放弃'" color="#bf1b0f">放弃入职</a-tag>
          <a-tag
            v-else-if="record.recommendStatus == '已OFFER背调问题'"
            title="背调拒绝-已OFFER"
            color="#bf1b0f"
            >背调拒绝</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '背调问题'"
            title="背调拒绝-未OFFER"
            color="#bf1b0f"
            >背调拒绝</a-tag
          >
          <a-tag
            v-else-if="record.recommendStatus == '超时未审' || record.recommendStatus == '超时未发'"
            color="#ff9800"
            >{{ record.recommendStatus }}</a-tag
          >
          <a-tag v-else-if="record.recommendStatus == '过保'" color="#00b050">{{
            record.recommendStatus
          }}</a-tag>
          <a-tag
            v-else-if="
              record.recommendStatus.includes('试未过') || record.recommendStatus.includes('试拒绝')
            "
            color="#bf1b0f"
            >{{ record.recommendStatus }}</a-tag
          >
          <a-tag v-else-if="record.recommendStatus == '顾问通过'" color="#00b050">企顾通过</a-tag>
          <a-tag v-else-if="record.recommendStatus == '推荐顾问'" color="#00b050">推荐人才</a-tag>
          <a-tag v-else-if="record.recommendStatus == '流程重启'" color="#00b050">职关重启</a-tag>
          <a-tag v-else>{{ record.recommendStatus }}</a-tag>
        </template>
      </template>
    </a-table>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pagination.current"
        :pageSize="pagination.pageSize"
        @change="handleResumeListData"
        :total="pagination.total"
        :showSizeChanger="false"
        :showQuickJumper="true"
        :hideOnSinglePage="true"
        size="small"
        :show-total="(total) => `共 ${total} 条`"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { formatToDateTime, formatToDate } from '/@/utils/dateUtil';
  import type { SelectProps } from 'ant-design-vue';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import type { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];
  const selectTime = ref<RangeValue>();
  const cityStore = useCityStoreWithOut();
  const resumeListStore = useResumeListStoreWithOut();
  const { province } = storeToRefs(cityStore);
  const {
    companyCnList,
    teamPersonChangeArr,
    positionsList,
    brandList,
    recommendCounselorArr,
    enterpriseConsultantArr,
  } = storeToRefs(resumeListStore);
  const optionsCity = ref<SelectProps['options']>([]);
  optionsCity.value = province.value.reduce((prev, curr) => {
    //@ts-ignore
    if (
      (curr.provinceName == curr.cityName || !curr.cityName) &&
      !(curr.cityName == '吉林' || curr.cityName == '海南')
    ) {
      //@ts-ignore
      prev.push({
        //@ts-ignore
        label: curr.provinceName,
        //@ts-ignore
        value: curr.provinceName,
      });
    } else {
      //@ts-ignore
      prev.push({
        //@ts-ignore
        label: curr.cityName,
        //@ts-ignore
        value: curr.cityName,
      });
    }
    return prev;
  }, []);
  const optionsBrand = ref<SelectProps['options']>([]);
  let tempOptionBrand = [];
  brandList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: brandListShow(item.cnName, item.usName),
      //@ts-ignore
      value: item.brandId,
    };
    //@ts-ignore
    tempOptionBrand.push(tempObj);
  });
  optionsBrand.value = tempOptionBrand;
  function brandListShow(cnName, usName) {
    if (cnName && usName) {
      return `${cnName}/${usName}`;
    } else if (cnName && !usName) {
      return cnName;
    } else if (!cnName && usName) {
      return usName;
    } else {
      return '';
    }
  }
  const optionsRecommendCounselorChange = ref([
    {
      value: '离职',
      label: '离职',
    },
    {
      value: '在职',
      label: '在职',
    },
  ]);
  resumeListStore.queryRecommendCounselor();
  resumeListStore.queryEnterpriseConsultant();
  const optionsRecommendCounselor = ref<SelectProps['options']>([]);
  watch(recommendCounselorArr, () => {
    optionsRecommendCounselor.value = recommendCounselorArr.value.map((item) => {
      return {
        value: item.id,
        label: item.realNameEn,
      };
    });
  });
  const handleRecommendCounselorChange = (values) => {
    resumeListStore.queryRecommendCounselor(values);
  };
  const optionsCounselor = ref<SelectProps['options']>([]);
  watch(enterpriseConsultantArr, () => {
    optionsCounselor.value = enterpriseConsultantArr.value.map((item) => {
      return {
        value: item.id,
        label: item.realNameEn,
      };
    });
  });
  const optionsFeedback = ref<SelectProps['options']>([
    {
      value: '顾问通过',
      label: '企顾通过',
    },
    {
      value: '顾问待定',
      label: '顾问待定',
    },
    {
      value: '顾问拒绝',
      label: '企顾拒绝',
    },
    {
      value: '暂时拒绝',
      label: '暂时拒绝',
    },
  ]);
  const optionsHrFeedback = ref<SelectProps['options']>([
    {
      value: 'HR通过',
      label: 'HR通过',
    },
    {
      value: 'HR拒绝',
      label: 'HR拒绝',
    },
    {
      value: 'HR待定',
      label: 'HR待定',
    },
  ]);
  const optionsInterviewResult = ref<SelectProps['options']>([
    { value: '面试未过', label: '面试未过' },
    { value: '面试通过', label: '面试通过' },
    { value: '面试待定', label: '面试待定' },
    { value: '未出席', label: '未出席' },
    { value: '延迟面试', label: '延迟面试' },
    { value: '拒绝面试', label: '拒绝面试' },
  ]);
  const optionsOfferChoice = ref<SelectProps['options']>([
    { value: 'OFFER接受', label: 'OFFER接受' },
    { value: 'OFFER拒绝', label: 'OFFER拒绝' },
    { value: '企弃(未)', label: '企弃(未)' },
    { value: '个弃(未)', label: '个弃(未)' },
    { value: '全部', label: '全部' },
  ]);
  const optionsRecommendStatus = ref<SelectProps['options']>([
    { value: '职位关闭', label: '职位关闭' },
    { value: '等待推荐', label: '等待推荐' },
    { value: '强制结束', label: '强制结束' },
    { value: '暂无消息', label: '暂无消息' },
    { value: '超时关闭', label: '超时关闭' },
    { value: '强制关闭', label: '强制关闭' },
    { value: '顾问放弃', label: '顾问放弃' },
    { value: '推荐顾问', label: '推荐顾问' },
    { value: '顾问通过', label: '企顾通过' },
    { value: '简发顾问', label: '简发顾问' },
    { value: '顾问拒绝', label: '企顾拒绝' },
    { value: '暂时拒绝', label: '暂时拒绝' },
    { value: '顾问待定', label: '顾问待定' },
    { value: '简发HR', label: '简发HR' },
    { value: 'HR通过', label: 'HR通过' },
    { value: 'HR拒绝', label: 'HR拒绝' },
    { value: 'HR待定', label: 'HR待定' },
    { value: '面试中', label: '面试中' },
    { value: '未出席', label: '未出席' },
    { value: '面试未过', label: '面试未过' },
    { value: '面试待定', label: '面试待定' },
    { value: '面试通过', label: '面试通过' },
    { value: '延迟面试', label: '延迟面试' },
    { value: '拒绝面试', label: '拒绝面试' },
    { value: 'OFFER接受', label: 'OFFER接受' },
    { value: 'OFFER拒绝', label: 'OFFER拒绝' },
    { value: '人才放弃', label: '人才放弃' },
    { value: '企业放弃', label: '企业放弃' },
    { value: '未入职', label: '未入职' },
    { value: '保证期中', label: '保证期中' },
    { value: '过保证期', label: '过保证期' },
    { value: '未过保', label: '未过保' },
    { value: '流程中', label: '流程中' },
  ]);
  const optionsEndStatus = ref<SelectProps['options']>([
    { value: '过保', label: '过保' },
    { value: '个弃', label: '人才放弃' },
    { value: '企弃', label: '企业放弃' },
  ]);
  const optionsPositions = ref<SelectProps['options']>([]);
  let tempOptionPositions = [];
  positionsList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnPosition, item.usPosition),
      //@ts-ignore
      value: item.positionId.toString(),
    };
    //@ts-ignore
    tempOptionPositions.push(tempObj);
  });
  optionsPositions.value = tempOptionPositions;
  function positionsListShow(cnName, usName) {
    if (cnName && usName) {
      return `${cnName}/${usName}`;
    } else if (cnName && !usName) {
      return cnName;
    } else if (!cnName && usName) {
      return usName;
    } else {
      return '';
    }
  }
  const optionsTeam = ref<SelectProps['options']>([]);
  //@ts-ignore
  optionsTeam.value = teamPersonChangeArr.value.map((item) => ({
    value: item.teamId,
    label: item.teamName,
  }));
  const optionsQuality = ref<SelectProps['options']>([
    { value: '红花', label: '红花' },
    { value: '绿叶', label: '绿叶' },
    { value: '蓝花', label: '蓝花' },
  ]);
  const optionsTimeType = ref<SelectProps['options']>([
    { value: '推荐时间', label: '推荐时间' },
    { value: '预计入职', label: '预计入职' },
    { value: '实际入职', label: '实际入职' },
    { value: '过保日期', label: '过保日期' },
  ]);
  const optionsCompany = ref<SelectProps['options']>([]);
  resumeListStore.queryCompanyCnList();
  watch(companyCnList, () => {
    let tempOptionCompanyId = [];
    companyCnList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        label: item.companyName,
        value: item.companyName,
      };
      //@ts-ignore
      tempOptionCompanyId.push(tempObj);
    });
    optionsCompany.value = tempOptionCompanyId;
  });
  const spanCol = 6;
  interface SearchForm {
    pageNumber: string;
    number: string;
    city: string;
    brand: string;
    counselor: string;
    recommendCounselor: string;
    sex: string;
    positions: string;
    positionsId: string;
    market: string;
    recommendTimeStart: string;
    recommendTimeEnd: string;
    interviewTimeStart: string;
    interviewTimeEnd: string;
    recommendStatus: string;
    hrFeedback: string;
    consultantFeedback: string;
    userName: string;
    phone: string;
    guaranteePeriodTimeStart: string;
    guaranteePeriodTimeEnd: string;
    predictEntryTimeStart: string;
    predictEntryTimeEnd: string;
    practicalEntryTimeStart: string;
    practicalEntryTimeEnd: string;
    interviewResult: string;
    offerChoice: string;
    endStatus: string;
    recruitId: string;
    isQuit: string;
    teamId: string;
    quality: string;
    companyName: string;
    zhiLei: string;
    isErro: string;
    id: string;
    collectId: string;
    recommendRecruitId: string;
    recommendChangeCounselor: string;
    timeType: string;
  }
  const formState = ref<SearchForm>({
    pageNumber: '1',
    number: '',
    city: '',
    brand: '',
    counselor: '',
    recommendCounselor: '',
    sex: '',
    positions: '',
    positionsId: '',
    market: '',
    recommendTimeStart: '',
    recommendTimeEnd: '',
    interviewTimeStart: '',
    interviewTimeEnd: '',
    recommendStatus: '',
    hrFeedback: '',
    consultantFeedback: '',
    userName: '',
    phone: '',
    guaranteePeriodTimeStart: '',
    guaranteePeriodTimeEnd: '',
    predictEntryTimeStart: '',
    predictEntryTimeEnd: '',
    practicalEntryTimeStart: '',
    practicalEntryTimeEnd: '',
    interviewResult: '',
    offerChoice: '',
    endStatus: '',
    recruitId: '',
    isQuit: '',
    teamId: '',
    quality: '',
    companyName: '',
    zhiLei: '',
    isErro: '',
    id: '',
    collectId: '',
    recommendRecruitId: '',
    recommendChangeCounselor: '',
    timeType: '',
  });

  const clearFromState = () => {
    // ��空搜索条件
    formState.value = {} as SearchForm;
  };
  const expandArr = [1, 2, 3, 4, 2];
  const expand = ref(2);
  const handleExpand = () => {
    // 点击更多或最简时执行的函数
    expand.value = expandArr[expand.value];
  };
  const resumeList = ref([]);
  const tableLoading = ref(false);
  const columns = ref([
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 45,
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      ellipsis: true,
      key: 'userName',
      width: 80,
      fixed: 'left',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      key: 'sex',
      width: 40,
      fixed: 'left',
    },
    {
      title: '城市',
      dataIndex: 'city',
      ellipsis: true,
      key: 'city',
      width: 45,
      fixed: 'left',
    },
    {
      title: '品牌',
      dataIndex: 'rBrand',
      ellipsis: true,
      key: 'rBrand',
      width: 80,
      fixed: 'left',
    },
    {
      title: '商场',
      dataIndex: 'rMarket',
      ellipsis: true,
      key: 'rMarket',
      width: 80,
      fixed: 'left',
    },
    {
      title: '职位',
      dataIndex: 'rPositions',
      ellipsis: true,
      key: 'rPositions',
      width: 80,
      fixed: 'left',
    },
    {
      title: '企顾',
      dataIndex: 'rCounselor',
      ellipsis: true,
      key: 'rCounselor',
      width: 70,
      fixed: 'left',
    },
    {
      title: '推顾',
      dataIndex: 'recommendCounselor',
      ellipsis: true,
      key: 'recommendCounselor',
      width: 70,
      fixed: 'left',
    },
    {
      title: '推时',
      dataIndex: 'newRecommendTime',
      key: 'newRecommendTime',
      ellipsis: true,
      width: 40,
      fixed: 'left',
    },
    {
      title: '顾反',
      dataIndex: 'consultantFeedback',
      key: 'consultantFeedback',
      ellipsis: true,
      width: 65,
      fixed: 'left',
    },
    {
      title: '简发',
      dataIndex: 'sendResume',
      key: 'sendResume',
      ellipsis: true,
      width: 40,
    },
    {
      title: 'HR',
      dataIndex: 'resumeCondition',
      key: 'resumeCondition',
      width: 60,
      ellipsis: true,
    },
    {
      title: 'HR审简',
      dataIndex: 'hrFeedback',
      key: 'hrFeedback',
      width: 60,
      ellipsis: true,
    },
    {
      title: '面状',
      dataIndex: 'rInterviewStatus',
      key: 'rInterviewStatus',
      width: 60,
      ellipsis: true,
    },
    {
      title: 'OFFER',
      dataIndex: 'offerChoice',
      key: 'offerChoice',
      width: 70,
      ellipsis: true,
    },
    {
      title: '预入',
      dataIndex: 'newPredictEntryTime',
      key: 'newPredictEntryTime',
      ellipsis: true,
      width: 80,
    },
    {
      title: '实入',
      dataIndex: 'newPracticalEntryTime',
      key: 'newPracticalEntryTime',
      ellipsis: true,
      width: 80,
    },
    {
      title: '保证',
      dataIndex: 'newGuaranteePeriodTime',
      key: 'newGuaranteePeriodTime',
      ellipsis: true,
      width: 80,
    },
    {
      title: '最终',
      dataIndex: 'endStatus',
      key: 'endStatus',
      ellipsis: true,
      width: 80,
    },
    {
      title: '当前状态',
      dataIndex: 'recommendStatus',
      key: 'recommendStatus',
      ellipsis: true,
      width: 70,
      fixed: 'right',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 40,
      fixed: 'right',
    },
  ]);
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  interface FormRecommend {
    index: number;
    key: string;
    userName: string;
    sex: string;
    city: string;
    rBrand: string;
    rMarket: string;
    jobType: string;
    rPositions: string;
    rCounselor: string;
    overOneDay: string;
    recommendCounselor: string;
    repeatTime: string;
    newRecommendTime: string;
    consultantFeedback: string;
    sendResume: string;
    resumeCondition: string;
    hrFeedback: string;
    rInterviewStatus: string;
    offerChoice: string;
    newPredictEntryTime: string;
    newPracticalEntryTime: string;
    newGuaranteePeriodTime: string;
    endStatus: string;
    recommendStatus: string;
    action: string;
    quality: string;
    feedbackReason: string;
    consultantFeedbackTime: string;
    isHuan: string;
    isErro: string;
  }
  interface ListNumber {
    index: number;
    name: string;
    num: number;
    btnNum: number;
    classNum: string;
  }
  const listNumber = ref([{} as ListNumber]);
  const currentListNum = ref(0);
  const generaListNumber = (listNum) => {
    listNumber.value = [];
    listNumber.value.push({
      index: 0,
      btnNum: 1,
      name: '待审',
      num: listNum.consultantFeedbackPendingSum,
      classNum: currentListNum.value == 1 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 1,
      btnNum: 3,
      name: '顾待',
      num: listNum.consultantFeedbackRejectSum,
      classNum: currentListNum.value == 3 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 2,
      btnNum: 4,
      name: '待简',
      num: listNum.assendResumeSum,
      classNum: currentListNum.value == 4 ? 'classNumActivce' : 'classNumRed'
    });
    listNumber.value.push({
      index: 3,
      btnNum: 5,
      name: '待发HR',
      num: listNum.resumeConditionPendingSum,
      classNum: currentListNum.value == 5 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 4,
      btnNum: 6,
      name: '已发HR',
      num: listNum.resumeConditionPassSum,
      classNum: currentListNum.value == 6 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 5,
      btnNum: 7,
      name: 'HR过',
      num: listNum.hrFeedbackPassSum,
      classNum: currentListNum.value == 7 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 6,
      btnNum: 9,
      name: '面中',
      num: listNum.interviewResultPendingSum,
      classNum: currentListNum.value == 9 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 7,
      btnNum: 15,
      name: '面过',
      num: listNum.interviewResultPassSum,
      classNum: currentListNum.value == 15 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 8,
      btnNum: 11,
      name: 'OFFER',
      num: listNum.offerChoiceSum,
      classNum: currentListNum.value == 11 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 9,
      btnNum: 12,
      name: '入职',
      num: listNum.entryStatusSum,
      classNum: currentListNum.value == 12 ? 'classNumActivce' : 'classNum'
    });
    listNumber.value.push({
      index: 10,
      btnNum: 19,
      name: '入超',
      num: listNum.unemployedExceedSum,
      classNum: currentListNum.value == 19 ? 'classNumActivce' : 'classNumRed'
    });
    listNumber.value.push({
      index: 11,
      btnNum: 20,
      name: '过超',
      num: listNum.confirmedExceedSum,
      classNum: currentListNum.value == 20 ? 'classNumActivce' : 'classNumRed'
    });
    listNumber.value.push({
      index: 12,
      btnNum: 27,
      name: '流程中',
      num: listNum.liuChengSumTrue,
      classNum: currentListNum.value == 27 ? 'classNumActivce' : 'classNumRed'
    });
    // listNumber.value.push({
    //   index: 13,
    //   btnNum: 22,
    //   name: '待交接',
    //   num: listNum.liuChengSum,
    // });
  }
  const handleListNumber = (value) => {
    currentListNum.value = value;
    formState.value = {...formState.value,number: value, pageNumber: '1'};
    listNumber.value = listNumber.value.reduce((prev,curr) => {
      if (curr.btnNum === value) {
        return [...prev, {...curr,classNum: 'classNumActivce'}];
      }
      return [...prev, curr];
    },[]);
    onFinish();
  }
  const onFinish = () => {
    // 点击搜索时执行的函数
    tableLoading.value = true;
    resumeListStore.queryRecommendResumeButton(formState.value).then((res) => {
      if (res.code == 1) {
        tableLoading.value = false;
        let info = res.info.pager;
        let listNum = res.info.listNum;
        generaListNumber(listNum);
        let list = res.info.pager.list;
        let tempList = [];
        list.forEach((item: any, index) => {
          let tempItem = {} as FormRecommend;
          tempItem.index = (info.pageNumber - 1) * info.pageSize + (index + 1);
          tempItem.key = item.id;
          tempItem.userName = item.userName;
          tempItem.sex = item.sex;
          tempItem.city = item.city;
          tempItem.rBrand = item.secret == '是' ? item.secretBrand : item.rBrand;
          tempItem.rMarket = item.rMarket;
          tempItem.jobType = item.jobType; //自营外包职位 猎头
          tempItem.rPositions = item.rPositions;
          tempItem.rCounselor = item.rCounselor;
          tempItem.overOneDay = item.overOneDay; //1超一日未发简历
          tempItem.recommendCounselor = item.recommendCounselor;
          tempItem.repeatTime = item.repeatTime ? formatToDateTime(item.repeatTime) : '';
          tempItem.newRecommendTime = item.newRecommendTime;
          tempItem.quality = item.quality;
          tempItem.consultantFeedback = item.consultantFeedback;
          tempItem.feedbackReason = item.feedbackReason;
          tempItem.consultantFeedbackTime = item.consultantFeedbackTime
            ? formatToDateTime(item.consultantFeedbackTime)
            : '';
          tempItem.sendResume = item.sendResume == 1 ? '已发' : '';
          tempItem.resumeCondition = item.resumeCondition;
          if (item.hrFeedback == 'HR通过') {
            tempItem.hrFeedback = 'HR简过';
          } else if (item.hrFeedback == 'HR拒绝') {
            tempItem.hrFeedback = 'HR简拒';
          } else if (item.hrFeedback == 'HR待定') {
            tempItem.hrFeedback = 'HR简待';
          } else {
            tempItem.hrFeedback = item.hrFeedback;
          }
          tempItem.rInterviewStatus = item.rInterviewStatus;
          tempItem.offerChoice = item.offerChoice;
          tempItem.newPredictEntryTime = item.newPredictEntryTime
            ? formatToDate(item.newPredictEntryTime)
            : '';
          tempItem.newPracticalEntryTime = item.newPracticalEntryTime
            ? formatToDate(item.newPracticalEntryTime)
            : '';
          tempItem.newGuaranteePeriodTime = item.newGuaranteePeriodTime
            ? formatToDate(item.newGuaranteePeriodTime)
            : '';
          tempItem.endStatus = item.endStatus == '已OFFER背调问题' ? '背调拒绝' : item.endStatus;
          tempItem.isHuan = item.isHuan;
          tempItem.isErro = item.isErro;
          tempItem.recommendStatus = item.recommendStatus;
          tempList.push(tempItem);
        });
        resumeList.value = tempList;
        pagination.value = {
          current: parseInt(info.pageNumber),
          pageSize: parseInt(info.pageSize),
          total: info.totalCount,
        };
      }
    });
  };
  onFinish();
  const handleResumeListData = (values) => {
    // 点击分页器时执行的函数
    formState.value = { ...formState.value, pageNumber: values };
    onFinish();
  };
</script>
<style lang="less" scoped>
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
  .ant-pagination.ant-pagination-mini .ant-pagination-prev,
  .ant-pagination.ant-pagination-mini .ant-pagination-next {
    margin-right: 5px;
  }
  .classNum {
    background-color: #f3f3f3;
    color: #000;
    cursor: pointer;
    transition: all 0.2s, background 0s;
  }
  .classNumRed {
    background-color: red;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s, background 0s;
  }
  .classNum:hover,
  .classNumRed:hover,
  .classNumActivce {
    background-color: #23c6c8;
    color: #000;
  }
  :deep(.row_col_space_counselor) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 6px;
  }
  :deep(.row_col_space_right_counselor) {
    width: 80%;
  }
  :deep(.row_col_space_right_counselor .ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  :deep(.row_col_space_left_counselor) {
    width: 70%;
    margin-inline-end: -1px;
    padding-left: 3px;
  }
  :deep(.row_col_space_left_counselor .ant-form-item-row .ant-form-item-label) {
    display: contents;
  }
  :deep(.row_col_space_left_counselor .ant-select-selector) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
</style>
