<template>
  <MenuTop />
  <div class="resume_container">
    <div class="resume-content">
      <a-calendar :value="datesTemp" @select="onSelect" @panelChange="onPanelChange">
        <template #headerRender="{ value: datesTemp, onChange }">
          <div style="padding: 0 0 12px 0; display: flex; justify-content: space-between">
            <div
              style="
                background: #e6f4ff;
                border: 1px solid #ccc;
                padding: 0 2px;
                border-radius: 3px;
              "
              >工作日期: {{ selectedValue && selectedValue.format('YYYY-MM-DD') }}</div
            >
            <a-row type="flex" justify="end">
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  class="my-year-select"
                  :options="specialistOptions"
                  v-model:value="workDetailRecruitId"
                  style="min-width: 80px"
                  @change="handleWorkDetailRecruitId"
                />
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  class="my-year-select"
                  style="margin-inline-start: 8px"
                  :value="String(datesTemp.year())"
                  @change="
                    (newYear) => {
                      onChange(datesTemp.year(+newYear));
                    }
                  "
                >
                  <a-select-option
                    v-for="val in getYears(datesTemp)"
                    :key="String(val)"
                    class="year-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  :value="String(datesTemp.month())"
                  style="margin-inline-start: 8px"
                  @change="
                    (selectedMonth) => {
                      onChange(datesTemp.month(parseInt(String(selectedMonth), 10)));
                    }
                  "
                >
                  <a-select-option
                    v-for="(val, index) in getMonths(datesTemp)"
                    :key="String(index)"
                    class="month-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col>
                <a-button
                  style="margin-inline-start: 8px"
                  type="link"
                  size="small"
                  @click="openSetting"
                >
                  <template #icon><SettingOutlined /></template>
                </a-button>
              </a-col>
            </a-row>
          </div>
        </template>
        <template #dateCellRender="{ current }">
          <ul class="events">
            <li v-for="item in getListData(current)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </ul>
        </template>
      </a-calendar>
    </div>
    <!-- 详情 -->
    <a-drawer
      v-model:open="visible"
      :title="workDetailTitle"
      :keyboard="false"
      :closable="false"
      :mask="false"
      :width="800"
      :bodyStyle="{ padding: '14px' }"
      :headerStyle="{ padding: '5px 18px 5px 12px' }"
      placement="right"
    >
      <template #extra>
        <CloseOutlined @click="handleWorkDetailClose" />
      </template>
      <div>
        <a-table
          :columns="columns"
          :data-source="workDetailMonthDayList"
          :pagination="false"
          size="small"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'filePath'">
              <a v-if="record.filePath" :href="record.filePath" target="_blank">查看</a>
            </template>
            <template v-if="column.key === 'currentFlag'">
              <a-tag
                :title="record.delyedRemark"
                v-if="record.currentFlag === '等待处理' || record.currentFlag === '延迟处理'"
                color="orange"
                >{{ record.currentFlag }}</a-tag
              >
              <a-tag v-if="record.currentFlag === '已经超时'" color="red">{{
                record.currentFlag
              }}</a-tag>
              <a-tag
                :title="record.endRemark"
                v-if="record.currentFlag === '超时处理' || record.currentFlag === '处理完毕'"
                color="green"
                >{{ record.currentFlag }}</a-tag
              >
            </template>
            <template v-if="column.key === 'remark'">
              <a-tag v-if="record.remark" :title="record.remark">查看</a-tag>
            </template>
            <template
              v-if="
                column.key === 'action' &&
                record.currentFlag !== '超时处理' &&
                record.currentFlag !== '处理完毕'
              "
            >
              <a-dropdown>
                <span class="ant-dropdown-link" style="cursor: pointer" @click.prevent>
                  <MenuUnfoldOutlined style="font-size: 15px" />
                </span>
                <template #overlay>
                  <a-menu>
                    <a-menu-item v-if="record.workDate != '当日'">
                      <a href="javascript:;" @click="openDelayModal(record.id)">延迟</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;" @click="openEndModal(record.id)">结束</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </template>
        </a-table>
      </div>
    </a-drawer>
    <!-- 延迟处理弹窗 -->
    <a-modal
      v-model:open="visibleDelay"
      title="延迟处理"
      width="500px"
      @ok="handleDelaySubmit"
      @cancel="closeDelay"
    >
      <a-form :model="formDelay" layout="vertical">
        <a-form-item label="工作内容">
          <a-input v-model:value="formDelay.workContent" disabled placeholder="当前工作内容" />
        </a-form-item>
        <a-form-item
          label="延迟时间"
          name="delyedTime"
          :rules="[{ required: true, message: '请选择延迟时间' }]"
        >
          <a-date-picker
            v-model:value="formDelay.delyedTime"
            show-time
            format="YYYY-MM-DD HH:mm"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item
          label="延迟备注"
          name="remark"
          :rules="[{ required: true, message: '请输入延迟备注' }]"
        >
          <a-textarea
            v-model:value="formDelay.remark"
            placeholder="请输入延迟原因或备注"
            :rows="4"
          />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="closeDelay">取消</a-button>
        <a-button type="primary" @click="handleDelaySubmit">提交</a-button>
      </template>
    </a-modal>
    <!-- 结束处理弹窗 -->
    <a-modal v-model:open="visibleEnd" title="结束处理" width="500px" @ok="handleEndSubmit">
      <a-form :model="formEnd" layout="vertical">
        <a-form-item label="工作内容">
          <a-input v-model:value="formEnd.workContent" disabled placeholder="当前工作内容" />
        </a-form-item>
        <a-form-item
          v-if="formEnd.isLink == '未联' || formEnd.isLink == '关联'"
          label="是否关联"
          name="isLink"
        >
          <a-select v-model:value="formEnd.isLink" placeholder="请选择状态">
            <a-select-option value="" />
            <a-select-option value="关联">关联</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="结束备注" name="remark">
          <a-textarea v-model:value="formEnd.remark" placeholder="请输入结束备注" :rows="3" />
        </a-form-item>
        <a-form-item v-if="formEnd.isFile == '1'" label="相关文件">
          <a-upload v-model:file-list="fileList" :before-upload="() => false" :max-count="1">
            <a-button> <upload-outlined /> 点击上传 </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="closeEnd">取消</a-button>
        <a-button type="primary" @click="handleEndSubmit">提交</a-button>
      </template>
    </a-modal>
    <a-drawer
      v-model:open="visibleSetting"
      title="工作流程"
      :keyboard="false"
      :closable="false"
      :mask="false"
      :width="800"
      :bodyStyle="{ padding: '14px' }"
      :headerStyle="{ padding: '5px 18px 5px 12px' }"
      placement="right"
    >
      <template #extra>
        <CloseOutlined @click="handleVisibleSettingClose" />
      </template>
      <div class="visibleSettingBtn">
        <a-button size="small" @click="openSettingAdd">新增</a-button>
      </div>
      <div>
        <a-table
          :columns="columnsSetting"
          :data-source="workDetailSettingList"
          :pagination="false"
          size="small"
          :scroll="{ y: 510 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'currentFlag'">
              <a-tag
                v-if="record.currentFlag === '等待处理' || record.currentFlag === '延迟处理'"
                color="orange"
                >{{ record.currentFlag }}</a-tag
              >
              <a-tag v-if="record.currentFlag === '已经超时'" color="red">{{
                record.currentFlag
              }}</a-tag>
              <a-tag
                v-if="record.currentFlag === '超时处理' || record.currentFlag === '处理完毕'"
                color="green"
                >{{ record.currentFlag }}</a-tag
              >
            </template>
            <template v-if="column.key === 'remark'">
              <a-tag v-if="record.remark" :title="record.remark">查看</a-tag>
            </template>
            <template
              v-if="
                column.key === 'action' &&
                record.currentFlag !== '超时处理' &&
                record.currentFlag !== '处理完毕'
              "
            >
              <a-dropdown>
                <span class="ant-dropdown-link" style="cursor: pointer" @click.prevent>
                  <MenuUnfoldOutlined style="font-size: 15px" />
                </span>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a href="javascript:;" @click="openSettingAdd(record.id)">修改</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </template>
        </a-table>
      </div>
    </a-drawer>
    <a-modal
      ref="formRef"
      v-model:open="visibleAdd"
      :title="formAdd.id ? '修改工作流程' : '新增工作流程'"
      width="700px"
      :confirm-loading="confirmLoading"
      @ok="handleAddSubmit"
    >
      <a-form ref="formRef" :model="formAdd" layout="horizontal" :label-col="labelCol">
        <a-row :gutter="20">
          <!-- 类别选择 -->
          <a-col :span="20">
            <a-form-item
              label="类别"
              name="workType"
              :rules="[{ required: true, message: '请选择类别' }]"
            >
              <a-select v-model:value="formAdd.workType">
                <a-select-option v-for="(value, key) in workTypeMap" :key="key" :value="key">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <!-- 工作内容 -->
          <a-col :span="20">
            <a-form-item
              label="内容"
              name="workContent"
              :rules="[{ required: true, message: '请输入内容' }]"
            >
              <a-input v-model:value="formAdd.workContent" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 周期和时间选择 -->
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item
              label="周期"
              name="workCycle"
              :rules="[{ required: true, message: '请选择周期' }]"
            >
              <a-select v-model:value="formAdd.workCycle">
                <a-select-option v-for="(value, key) in workCycleMap" :key="key" :value="key">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="workDate" :rules="[{ required: true, message: '请选择周期' }]">
              <a-select v-model:value="formAdd.workDate">
                <a-select-option v-for="(value, key) in workDateMap" :key="key" :value="key">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="toLastDay">
              <a-select v-model:value="formAdd.toLastDay">
                <a-select-option value="2">不延长</a-select-option>
                <a-select-option value="1">延长至月底</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 限时时间和关联 -->
        <a-row :gutter="20">
          <a-col :span="20">
            <a-form-item
              label="限时"
              name="workTime"
              :rules="[{ required: true, message: '请选择限时' }]"
            >
              <!-- <a-time-picker
            v-model:value="formAdd.workTime" 
            format="HH:mm" 
          /> -->
              <a-select v-model:value="formAdd.workTime">
                <a-select-option value="09:00">09:00</a-select-option>
                <a-select-option value="09:30">09:30</a-select-option>
                <a-select-option value="10:00">10:00</a-select-option>
                <a-select-option value="10:30">10:30</a-select-option>
                <a-select-option value="11:00">11:00</a-select-option>
                <a-select-option value="11:30">11:30</a-select-option>
                <a-select-option value="12:00">12:00</a-select-option>
                <a-select-option value="12:30">12:30</a-select-option>
                <a-select-option value="13:00">13:00</a-select-option>
                <a-select-option value="13:30">13:30</a-select-option>
                <a-select-option value="14:00">14:00</a-select-option>
                <a-select-option value="14:30">14:30</a-select-option>
                <a-select-option value="15:00">15:00</a-select-option>
                <a-select-option value="15:30">15:30</a-select-option>
                <a-select-option value="16:00">16:00</a-select-option>
                <a-select-option value="16:30">16:30</a-select-option>
                <a-select-option value="17:00">17:00</a-select-option>
                <a-select-option value="17:30">17:30</a-select-option>
                <a-select-option value="18:00">18:00</a-select-option>
                <a-select-option value="18:30">18:30</a-select-option>
                <a-select-option value="18:40">18:40</a-select-option>
                <a-select-option value="19:00">19:00</a-select-option>
                <a-select-option value="19:30">19:30</a-select-option>
                <a-select-option value="20:00">20:00</a-select-option>
              </a-select>
              <!-- <a-input v-model:value="formAdd.workTime" />-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="20">
            <a-form-item
              label="关联"
              name="isLink"
              :rules="[{ required: true, message: '请选择关联' }]"
            >
              <a-select v-model:value="formAdd.isLink">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="20">
            <a-form-item
              label="文件"
              name="isFile"
              :rules="[{ required: true, message: '请选择文件' }]"
            >
              <a-select v-model:value="formAdd.isFile">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 专员和备注 -->
        <a-row :gutter="20">
          <a-col :span="20">
            <a-form-item
              label="专员"
              name="person"
              :rules="[{ required: true, message: '请选择专员' }]"
            >
              <a-select
                v-model:value="formAdd.person"
                :options="specialistOptions"
                :labelInValue="true"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="20">
            <a-form-item label="注释">
              <a-textarea v-model:value="formAdd.remark" :rows="4" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="20">
            <!-- 文件上传 -->
            <a-form-item label="模板">
              <a-upload
                v-model:file-list="formAdd.fileList"
                :before-upload="() => false"
                :max-count="1"
              >
                <a-button> <upload-outlined /> 点击上传 </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    MenuUnfoldOutlined,
    UploadOutlined,
    SettingOutlined,
    CloseOutlined,
  } from '@ant-design/icons-vue';
  import MenuTop from '/@/views/MenuTop/index.vue';
  import type { FormInstance } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { ref } from 'vue';
  import dayjs from 'dayjs'; // 添加dayjs类型
  import { Dayjs } from 'dayjs';
  import { storeToRefs } from 'pinia';
  import { currentDate } from '/@/utils/dateUtil';
  import { useAdministrativeStore } from '/@/store/modules/administrative';
  const administrativeStore = useAdministrativeStore();
  const { workDetailMonthList } = storeToRefs(administrativeStore);
  const workDetailRecruitId = ref('5485');
  const handleWorkDetailRecruitId = () => {
    queryWorkDetailMonth(dayjs(currentDate()).format('YYYY-MM'));
  };
  const queryWorkDetailMonth = async (dateTemp) => {
    await administrativeStore.queryWorkDetailMonth(dateTemp, workDetailRecruitId.value);
  };
  queryWorkDetailMonth(dayjs(currentDate()).format('YYYY-MM'));

  const datesTemp = ref(dayjs(currentDate()));
  const workDetailTitle = ref('');
  const isPanelChanging = ref(false);
  const selectedValue = ref(dayjs(currentDate()));
  const onSelect = (value) => {
    if (isPanelChanging.value) return;
    datesTemp.value = value;
    workDetailTitle.value = `工作流程: ${value.format('YYYY-MM-DD')}`;
    //selectedValue.value = value;
    showModal(value.format('YYYY-MM-DD'));
  };
  const onPanelChange = (value) => {
    isPanelChanging.value = true;
    datesTemp.value = value;
    queryWorkDetailMonth(value.format('YYYY-MM'));
    // 在下一个事件循环重置状态
    setTimeout(() => {
      isPanelChanging.value = false;
    }, 0);
  };

  const getMonths = (value: Dayjs) => {
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(localeData.monthsShort(value.month(i)));
    }
    return months;
  };

  const getYears = (value: Dayjs) => {
    const year = value.year();
    const years = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      years.push(i);
    }
    return years;
  };
  // 添加类型定义
  interface WorkDetail {
    workType: string;
    workContent: string;
  }

  interface WorkDetailMonthItem {
    day: string;
    workList: WorkDetail[];
  }

  const getListData = (value: Dayjs) => {
    if (workDetailMonthList.value.length === 0) return [];

    let listData: { type: string; content: string }[] = [];
    workDetailMonthList.value.forEach((item: WorkDetailMonthItem) => {
      if (item.day === value.format('YYYY-MM-DD')) {
        listData = item.workList.map((work) => {
          // 根据工作类型设置状态颜色
          const statusMap = {
            等待处理: 'warning',
            延迟处理: 'warning',
            已经超时: 'error',
            超时处理: 'success',
            处理完毕: 'success',
          };
          return {
            //@ts-ignore
            type: statusMap[work.currentFlag] || 'warning', // 默认用warning
            content: `${work.workTime} ${work.workType}-${work.workContent}`,
          };
        });
      }
    });
    return listData;
  };
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '类别',
      dataIndex: 'workType',
      key: 'workType',
    },
    {
      title: '工作内容',
      dataIndex: 'workContent',
      key: 'workContent',
    },
    {
      title: '限时',
      dataIndex: 'outTime',
      key: 'outTime',
    },
    {
      title: '关联',
      dataIndex: 'isLink',
      key: 'isLink',
    },
    {
      title: '文件',
      dataIndex: 'filePath',
      key: 'filePath',
    },
    {
      title: '当前状态',
      dataIndex: 'currentFlag',
      key: 'currentFlag',
    },
    {
      title: '注释',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '35px',
    },
  ];
  interface WorkDetailDayItem {
    id: string;
    workType: string;
    workContent: string;
    workCycle: string; // 周期代码
    workDate: string; // 日期代码
    workTime: string; // 限时要求
    isLink: string; // 关联状态
    isFile: string; // 关联状态
    filePath: string; // 文件路径
    currentFlag: string; // 当前状态
    remark?: string; // 备注（可选）
    collectId: string; // 关联ID
    key: string; // 表格行key
    index: number; // 序号
    outTime?: string; // 超时时间
    recruitId: string;
    realNameEn: string;
    toLastDay: string;
    delyedRemark: string;
    endRemark: string;
  }
  const visible = ref(false);
  const workDetailMonthDayList = ref<WorkDetailDayItem[]>([]);
  const workCycleMap = {
    '1': '工作日',
    '2': '自然月',
    '3': '考核周',
    '4': '考核月',
    '5': '自然季度',
  };
  const workDateMap = {
    '1': '当日',
    '2': '首工作日',
    '3': '2工作日',
    '4': '3工作日',
    '5': '6工作日',
    '6': '10工作日',
    '7': '末工作日',
    '8': '17自然日',
    '9': '20自然日',
    '10': '25自然日',
  };
  const handleWorkDetailClose = () => {
    visible.value = false;
  };
  const showModal = async (dateTemp: string) => {
    visible.value = true;
    const res = await administrativeStore.queryWorkDetailMonthDay(dateTemp);
    if (res) {
      workDetailMonthDayList.value = res.info.map((item, index) => ({
        index: index + 1,
        workType: item.workType,
        workContent: item.workContent,
        workCycle: workCycleMap[item.workCycle],
        workDate: workDateMap[item.workDate],
        workTime: item.workTime,
        isLink: item.isLink,
        filePath: item.filePath,
        currentFlag: item.currentFlag,
        remark: item.remark,
        delyedRemark: item.delyedRemark,
        endRemark: item.endRemark,
        outTime: item.delyedTime
          ? dayjs(item.delyedTime).format('YYYY-MM-DD HH:mm')
          : dayjs(item.outTime).format('YYYY-MM-DD HH:mm'),
        id: item.id,
        key: item.id,
        collectId: item.collectId,
      }));
    }
  };
  const visibleDelay = ref(false);
  const formDelay = ref({
    id: '', // 添加任务ID字段
    workContent: '',
    delyedTime: null as Dayjs | null,
    remark: '',
  });
  // 添加打开延迟弹窗的方法
  const openDelayModal = (id: string) => {
    const record = workDetailMonthDayList.value.find((item) => item.id === id);
    if (record) {
      formDelay.value = {
        ...formDelay.value,
        id,
        workContent: `${record.workType || ''}-${record.workContent}`, // 填充工作内容
      };
      visibleDelay.value = true;
    }
  };
  const closeDelay = () => {
    visibleDelay.value = false;
    formDelay.value = {
      id: '',
      workContent: '',
      delyedTime: null,
      remark: '',
    };
  };
  const handleDelaySubmit = async () => {
    try {
      // 表单验证
      if (!formDelay.value.delyedTime) {
        return message.error('请选择延迟时间');
      }
      if (!formDelay.value.remark) {
        return message.error('请输入延迟备注');
      }
      // 构造提交数据
      const params = {
        id: formDelay.value.id,
        delyedTime: formDelay.value.delyedTime.format('YYYY-MM-DD HH:mm'),
        remark: formDelay.value.remark,
      };
      // 调用store action
      const res = await administrativeStore.handleDelayTime(params);
      if (res.code == 1) {
        message.success('延迟处理成功');
        closeDelay();
        // 刷新数据
        queryWorkDetailMonth(dayjs(datesTemp.value).format('YYYY-MM'));
        showModal(dayjs(datesTemp.value).format('YYYY-MM-DD'));
      } else {
        message.success('延迟处理失败');
      }
    } catch (error) {
      message.error('提交失败');
    }
  };
  // script部分添加
  const visibleEnd = ref(false);
  const formEnd = ref({
    id: '',
    workContent: '',
    outTime: '',
    isLink: '',
    isFile: '',
    remark: '',
  });
  const fileList = ref([]);

  // 打开结束弹窗方法
  const openEndModal = (id: string) => {
    const record = workDetailMonthDayList.value.find((item) => item.id === id);
    if (record) {
      formEnd.value = {
        ...formEnd.value,
        id,
        workContent: `${record.workType || ''}-${record.workContent}`, // 填充工作内容
        outTime: record.outTime || '',
        isLink: record.isLink || '',
        isFile: record.isFile || '',
        remark: '',
      };
      visibleEnd.value = true;
    }
  };
  const closeEnd = () => {
    visibleEnd.value = false;
    formEnd.value = {
      id: '',
      workContent: '',
      outTime: '',
      isLink: '',
      isFile: '',
      remark: '',
    };
  };
  // 提交处理方法
  const handleEndSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('id', formEnd.value.id);
      formData.append('isLink', formEnd.value.isLink);
      formData.append('endRemark', formEnd.value.remark);
      const currentTime = dayjs();
      const outTime = dayjs(formEnd.value.outTime);
      const currentFlag = outTime.isBefore(currentTime) ? '超时处理' : '处理完毕';
      formData.append('currentFlag', currentFlag);
      fileList.value.forEach((file) => {
        //@ts-ignore
        formData.append('file', file.originFileObj);
      });
      const res = await administrativeStore.handleEndProcess(formData);
      if (res.code == 1) {
        message.success('处理成功');
        closeEnd();
        // 刷新数据
        queryWorkDetailMonth(dayjs(datesTemp.value).format('YYYY-MM'));
        showModal(dayjs(datesTemp.value).format('YYYY-MM-DD'));
      } else {
        message.error('处理失败');
      }
    } catch (error) {
      message.error('提交失败');
    }
  };

  const columnsSetting = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '类别',
      dataIndex: 'workType',
      key: 'workType',
    },
    {
      title: '工作内容',
      dataIndex: 'workContent',
      key: 'workContent',
    },
    {
      title: '周期',
      dataIndex: 'workCycle',
      key: 'workCycle',
    },
    {
      title: '',
      dataIndex: 'workDate',
      key: 'workDate',
    },
    {
      title: '限时',
      dataIndex: 'workTime',
      key: 'workTime',
    },
    {
      title: '关联',
      dataIndex: 'isLink',
      key: 'isLink',
    },
    {
      title: '文件',
      dataIndex: 'isFile',
      key: 'isFile',
    },
    {
      title: '当前状态',
      dataIndex: 'currentFlag',
      key: 'currentFlag',
    },
    {
      title: '注释',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '35px',
    },
  ];
  const labelCol = { style: { width: '70px' } };
  const workTypeMap = {
    考勤系统: '考勤系统',
    KPI系统: 'KPI系统',
    证件系统: '证件系统',
    警告系统: '警告系统',
    职级升降: '职级升降',
    开票系统: '开票系统',
    电话系统: '电话系统',
    工单系统: '工单系统',
    社保系统: '社保系统',
    合同系统: '合同系统',
    入职离职: '入职离职',
    采购系统: '采购系统',
    卫生整洁: '卫生整洁',
    工作汇报: '工作汇报',
  };
  const visibleSetting = ref(false);
  const workDetailSettingList = ref<WorkDetailDayItem[]>([]);
  const handleVisibleSettingClose = () => {
    visibleSetting.value = false;
  };
  const openSetting = async () => {
    visibleSetting.value = true;
    try {
      const res = await administrativeStore.queryWorkDetailSetting();
      if (res) {
        workDetailSettingList.value = res.info.map((item, index) => ({
          index: index + 1,
          workType: item.workType,
          workContent: item.workContent,
          workCycle: workCycleMap[item.workCycle],
          workDate: workDateMap[item.workDate],
          workTime: item.workTime,
          isLink: item.isLink == 1 ? '是' : '否',
          isFile: item.isFile == 1 ? '是' : '否',
          currentFlag: item.currentFlag,
          remark: item.remark,
          outTime: item.delyedTime || item.outTime,
          id: item.id,
          key: item.id,
          recruitId: item.recruitId,
          realNameEn: item.realNameEn,
          toLastDay: item.toLastDay,
          collectId: item.collectId,
        }));
      }
    } catch (error) {
      message.error('获取设置数据失败');
    }
  };
  const visibleAdd = ref(false);
  const formAdd = ref({
    workType: '',
    workContent: '',
    workCycle: '',
    workDate: '',
    workTime: '',
    isLink: '',
    isFile: '',
    toLastDay: '',
    person: { value: '', label: '' },
    remark: '',
    fileList: [],
    id: '',
  });
  const specialistOptions = ref([
    { value: '5485', label: 'Mona Xu' },
    { value: '142', label: 'Sally Wang' },
  ]);
  const formRef = ref<FormInstance>(); // 表单引用
  const confirmLoading = ref(false); // 加载状态
  const openSettingAdd = (id?: string) => {
    visibleAdd.value = true;
    if (id) {
      // 数据回填逻辑
      const record = workDetailSettingList.value.find((item) => item.id === id);
      if (record) {
        formAdd.value = {
          workType: record.workType,
          workContent: record.workContent,
          workCycle:
            Object.keys(workCycleMap).find((k) => workCycleMap[k] === record.workCycle) || '',
          workDate: Object.keys(workDateMap).find((k) => workDateMap[k] === record.workDate) || '',
          workTime: record.workTime || '',
          isLink: record.isLink === '是' ? '1' : '0',
          isFile: record.isFile === '是' ? '1' : '0',
          toLastDay: record.toLastDay || '',
          person: { value: record.recruitId, label: record.realNameEn }, // 根据实际字段调整
          remark: record.remark || '',
          fileList: [],
          id: record.id, // 添加ID字段
        };
      }
    } else {
      // 清空表单
      formAdd.value = {
        workType: '',
        workContent: '',
        workCycle: '',
        workDate: '',
        workTime: '',
        isLink: '0',
        isFile: '0',
        toLastDay: '',
        person: { value: '', label: '' },
        remark: '',
        fileList: [],
        id: '',
      };
    }
  };
  const handleAddSubmit = async () => {
    try {
      // 1. 先进行表单校验
      if (!formRef.value) return;
      await formRef.value.validate();

      // 2. 设置加载状态
      confirmLoading.value = true;
      const formData = new FormData();
      const isEdit = !!formAdd.value.id;
      // 添加表单字段
      Object.entries(formAdd.value).forEach(([key, value]) => {
        //@ts-ignore
        if (!['fileList', 'person', 'id'].includes(key)) formData.append(key, value);
      });
      // 添加文件
      if (formAdd.value.fileList) {
        formAdd.value.fileList.forEach((file) => {
          //@ts-ignore
          formData.append('file', file.originFileObj);
        });
      } else {
        formData.append('file', '');
      }

      if (formAdd.value.person) {
        formData.append('recruitId', formAdd.value.person.value);
        formData.append('realNameEn', formAdd.value.person.label);
      }
      if (isEdit) {
        formData.append('id', formAdd.value.id);
      }
      const res = isEdit
        ? await administrativeStore.updateWorkSetting(formData)
        : await administrativeStore.addWorkSetting(formData);
      if (res.code === 1) {
        message.success(isEdit ? '修改成功' : '新增成功');
        visibleAdd.value = false;
        // 刷新设置列表
        queryWorkDetailMonth(dayjs(datesTemp.value).format('YYYY-MM'));
        openSetting();
        visibleAdd.value = false;
        formAdd.value = {
          workType: '',
          workContent: '',
          workCycle: '',
          workDate: '',
          workTime: '',
          isLink: '0',
          isFile: '0',
          toLastDay: '',
          person: { value: '', label: '' },
          remark: '',
          fileList: [],
          id: '',
        };
      } else {
        message.error('提交失败');
        visibleAdd.value = false;
      }
    } catch (error: unknown) {
      const e = error as { errorFields?: Array<any> };
      if (e.errorFields) {
        message.error('请正确填写所有必填项');
      } else {
        message.error('提交失败');
      }
    } finally {
      confirmLoading.value = false;
    }
  };
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 1920px;
    height: 92vh;
    background-color: #f5f5f5;
    overflow: hidden;
    padding: 10px;
    margin-top: 35px;
    overflow-y: auto;
    .resume-content {
      background-color: #fff;
      box-shadow: 0 0 2px #ccc;
      border-radius: 5px;
      overflow: hidden;
      padding: 20px;
    }
  }
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
  :deep(.ant-radio-group) {
    display: none !important;
  }
  :deep(.ant-upload-wrapper) {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;

    .ant-upload-list-item {
      flex-shrink: 0;
      margin-right: 8px;
      max-width: 180px;

      &-name {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
      }
    }

    .ant-upload-select {
      margin: 0;
    }
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    :deep(.ant-btn-link) {
      padding: 0;
      color: #666; // 添加文字颜色
      &:hover {
        color: #8c8c8c; // 悬停颜色
      }
    }

    // 新增图标颜色设置
    :deep(.anticon) {
      color: #666;
      &:hover {
        color: #8c8c8c;
      }
    }
  }
  .visibleSettingBtn {
    display: flex;
    justify-content: end;
  }
</style>
