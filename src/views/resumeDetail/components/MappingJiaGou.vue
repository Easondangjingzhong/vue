<template>
  <a-row :gutter="24">
        <a-col :span="24">
          <h4 class="resume_h4">{{mappingType}}({{ mappingData.length }})</h4>
        </a-col>
        <a-divider :dashed="true" class="mappingJiaGouspandivider" />
        <a-col :span="24">
          <a-table
        size="small"
        :dataSource="mappingData"
        rowKey="key"
        :pagination="false"
        :columns="mappingColumns"
        :row-class-name="(_record) => (_record.type == '简' ? 'table-striped-j' : 'table-striped-m')"
        :locale="{ emptyText: '暂无信息' }"
        :expandedRowKeys="expandedRowKeysArr"
        @expand="onExpand"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <span class="typeSpanOne" v-if="record.type == '简'">{{ record.type }}</span>
            <span class="typeSpanTwo" v-if="record.type == 'M'">{{ record.type }}</span>
            <span class="jobStatusSpanOne" v-if="record.jobStatus == '1'">在</span>
            <span class="jobStatusSpanTwo" v-if="record.jobStatus == '2'">离</span>
          </template>
          <template v-if="column.key === 'userName'">
            <a
              v-if="record.isOpen == '1' && record.type == '简'"
              @click="handleMappingJiaGouToResume(record.id, record.addConsultantId)"
              >{{ record.userName }}</a
            >
            <span v-else>{{ record.userName }}</span>
          </template>
        </template>
        <template #expandedRowRender="{ record }">
        <p style="margin: 0; margin-bottom: 4px; margin-left: 11.5%" v-if="record.worksOne">
          {{ record.worksOne }}
        </p>
        <p style="margin: 0; margin-bottom: 4px; margin-left: 11.5%" v-if="record.worksTwo">
          {{ record.worksTwo }}
        </p>
      </template>
      <template #expandColumnTitle>
        <PlusSquareOutlined
          style="font-size: 14px"
          v-if="!expandedRowKeysFlag"
          @click="handleExpandedRowKeys"
        />
        <MinusSquareOutlined
          style="font-size: 14px"
          v-if="expandedRowKeysFlag"
          @click="handleExpandedRowKeys"
        />
      </template>
      </a-table>
      </a-col>
  </a-row>

</template>
<script setup lang="ts">
 import {
    PlusSquareOutlined,
    MinusSquareOutlined,
  } from '@ant-design/icons-vue';
const props = defineProps({
  mappingArr: {
      type: Array,
      require: true,
    },
    mappingType: {
      type: String,
      require: true,
    },
    flag: {
      type: Boolean,
      require: true,
    },
})
const expandedRowKeys = ref(['']);
const mappingData = ref([])
mappingData.value = props.mappingArr?.reduce((prev,curr,index) => {
  if (curr.type == "简") {
    expandedRowKeys.value.push(curr.id)
  }
  return [...prev,{...curr,index: (index +1)}];
},[]);
watch(() => props.flag,() => {
  expandedRowKeys.value = [];
  mappingData.value = props.mappingArr?.reduce((prev,curr,index) => {
    if (curr.type == "简") {
    expandedRowKeys.value.push(curr.id)
  }
  return [...prev,{...curr,index: (index +1)}];
},[]);
})
const router = useRouter();
  const handleMappingJiaGouToResume = (resumeId, addConsultantId) => {
    const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
      localStorage.getItem('loginVueUser'),
    );
    let query = { ...loginVueUser, resumeId, addConsultantId };
    // if (loginVueUser.loginType != "A" && (!formState.value.leftType || formState.value.leftType == "1" || formState.value.leftType == "2" || formState.value.leftType == "3" || formState.value.leftType == "4")) {
    //   query = {...loginVueUser, resumeId, addConsultantId,searchRecommend: "T"};
    // }
    const href = router.resolve({
      path: '/resume/detail',
      query: query,
    });
    window.open(href.href, '_blank');
  };
const mappingColumns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 20,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,
      width: 28,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: 50,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      ellipsis: true,
      width: 20,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true,
      width: 20,
    },
    {
      title: '当前职位',
      dataIndex: 'positionName',
      key: 'positionName',
      ellipsis: true,
      width: 90,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ellipsis: true,
      width: 20,
    },
    {
      title: '商场',
      dataIndex: 'marketName',
      key: 'marketName',
      ellipsis: true,
      width: 60,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 80,
    },
    {
      title: '团队',
      dataIndex: 'groupName',
      key: 'groupName',
      ellipsis: true,
      width: 35,
    },
    {
      title: '顾问',
      dataIndex: 'realNameEn',
      key: 'realNameEn',
      ellipsis: true,
      width: 40,
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      width: 40,
    },
    {
      title: '报错',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      width: 20,
    },
  ];
  
  const expandedRowKeysFlag = ref(false);
  const expandedRowKeysArr = ref<string[]>([]);
  const handleExpandedRowKeys = () => {
    expandedRowKeysFlag.value = !expandedRowKeysFlag.value;
    if (expandedRowKeysFlag.value) {
      expandedRowKeysArr.value = expandedRowKeys.value;
    } else {
      expandedRowKeysArr.value = [];
    }
  };
  const onExpand = (expanded, record) => {
    if (expanded) {
      expandedRowKeysArr.value = [...expandedRowKeysArr.value, record.key]; // 确保这里的 key 是唯一的
    } else {
      expandedRowKeysArr.value = expandedRowKeysArr.value.filter((item) => item != record.key);
    }
  };
</script>
<style scoped>
.mappingJiaGouspandivider {
    background-color: #0505050f;
    margin-top: 0;
    margin-bottom: 3px;
  }
  /* :deep(.table-striped-j) {
  background-color: #d7e7d7;
}
  :deep(.table-striped-m) {
  background-color: #f4ede0;
} */
:deep(.ant-table-wrapper .ant-table-expand-icon-col) {
  width: 15px;
}
:deep(.table-striped-m .ant-table-row-expand-icon-collapsed) {
  display: none;
}
.typeSpanOne {
  margin-right: 4px;
  background-color: #d7e7d7;
  border-radius: 4px;
  padding: 2px 3px;
  background-color: #d7e7d7;
}
.typeSpanTwo {
  margin-right: 4px;
  background-color: #f5c786;
  border-radius: 4px;
  padding: 2px 3px;
  background-color: #f0ad4e;
}
.jobStatusSpanOne {
  background-color: #31db31;
  color: white;
  border-radius: 4px;
  padding: 2px 3px;
}
.jobStatusSpanTwo {
  background-color: #e44444;
  color: white;
  border-radius: 4px;
  padding: 2px 3px;
}
</style>