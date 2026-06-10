<template>
 <a-table
      class="shebao-collect-table"
      size="small"
      :pagination="false"
      :columns="columns"
      :loading="loading"
      :dataSource="getOutsourceShebaoCollect"
      rowKey="yearAndMonth"
      :expandedRowKeys="expandedRowKeys"
       :row-expandable="(record) => record.detaillist && record.detaillist.length > 0"
       @expand="onExpand"
       :expand-column-width="20"
       rowClassName="even-row"
    >
    <template #bodyCell="{ column, record }">
      <a-popconfirm v-if="column.key === 'checkFlag' && record.checkFlag === '1'" title="社保核对" :overlay-style="{ width: '130px' }" @confirm="handleChecked(1,record)">
        <a-tag style="cursor: pointer;" color="red">未核</a-tag>
      </a-popconfirm>
      <a-tag v-if="column.key === 'checkFlag' && record.checkFlag === '2'" color="green">已核</a-tag>
     <a v-if="column.key === 'personNum'" @click="handleClick(record.yearAndMonth,'')"> {{ record.personNum }} </a>
    </template>
    <template #expandedRowRender="{ record }">
      <div class="expanded-wrapper">
        <a-table size="small" :columns="innerColumns" :data-source="record.detaillist" :pagination="false">
        <template #bodyCell="{ column, record }">
          <a-popconfirm v-if="column.key === 'checkFlag' && record.checkFlag === '1'" title="社保核对" :overlay-style="{ width: '130px' }" @confirm="handleChecked(2,record)">
            <a-tag style="cursor: pointer;" color="red">未核</a-tag>
          </a-popconfirm>
          <!-- <a-tag v-if="column.key === 'checkFlag' && record.checkFlag === '1'" color="red">未核</a-tag> -->
          <a-tag v-if="column.key === 'checkFlag' && record.checkFlag === '2'" color="green">已核</a-tag>
          <a-tag v-if="column.key === 'bankPurchaseStatus' && record.bankPurchaseStatus === '1'" color="orange">采购</a-tag>
          <a v-if="column.key === 'personNum'" @click="handleClick(record.yearAndMonth,record.companyName)"> {{ record.personNum }} </a>
          <template v-if="column.key === 'action' && record.checkFlag === '2' && (record.companyName === '51社保' || record.companyName === '江苏今元')">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                 <a-menu-item>
                  <a href="javascript:;" @click="handleAddOutsourceSheBaoPurchaseCollect(record)">提交采购</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="handleAddOutsourceSheBaoShebaoaoWeiCha(record)">社保尾差</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          </template>
        </template>
      </a-table>
      </div>
    </template>
  </a-table>

  <a-modal
    v-model:open="shebaoWeiChaModalOpen"
    title="社保尾差"
    :confirm-loading="shebaoWeiChaSubmitting"
    @ok="handleSubmitShebaoWeiCha"
    @cancel="handleCloseShebaoWeiCha"
  >
    <a-form layout="vertical">
      <a-form-item label="年月">
        <a-input v-model:value="shebaoWeiChaForm.yearAndMonth" disabled />
      </a-form-item>
      <a-form-item label="公司">
        <a-input v-model:value="shebaoWeiChaForm.companyName" disabled />
      </a-form-item>
      <a-form-item label="尾差">
        <a-input v-model:value="shebaoWeiChaForm.chaMoney" placeholder="请输入尾差金额" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message, Modal } from 'ant-design-vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { OutsourceSheBaoCollectItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceShebaoCollect,outsourceSocialSecurityCollectFlag } = storeToRefs(outsourceDetailStore);

const handleClick = (yearAndMonth,companyName) => {
  outsourceDetailStore.queryOutsourceSalaryCommitCollectSheBao(yearAndMonth,companyName);
  outsourceSocialSecurityCollectFlag.value = true;
}

const columnWidths: Record<string, number> = {
  index: 110,
  companyName: 110,
  yearAndMonth: 110,
  shebaoCompany: 110,
  yijinCompany: 110,
  shebaoPerson: 110,
  yijinPerson: 110,
  companyTotal: 110,
  personTotal: 110,
  canbaoMoney: 90,
  serviceMoney: 90,
  shebaoTotal: 110,
  personNum: 70,
  chaMoney: 60,
  checkFlag: 80,
  bankPurchaseStatus: 80,
  action: 80,
};

const withSameWidths = (cols: any[]) =>
  cols.map((col) => {
    const width = columnWidths[col.dataIndex];
    return width ? { ...col, width } : col;
  });

const withLeftAlign = (cols: any[], leftAlignKeys: Set<string>) =>
  cols.map((col) => (leftAlignKeys.has(col.dataIndex) ? { ...col, align: 'left' } : col));

const commonLeftAlignKeys = new Set([
  'yearAndMonth',
  'shebaoCompany',
  'yijinCompany',
  'shebaoPerson',
  'yijinPerson',
  'companyTotal',
  'personTotal',
  'canbaoMoney',
  'serviceMoney',
  'shebaoTotal',
  'personNum',
  'checkFlag',
  'bankPurchaseStatus',
  'action',
]);

const columns = withLeftAlign(
  withSameWidths([
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '周期',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
  },
   {
    title: '单位社保',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
  },
   {
    title: '单位一金',
    dataIndex: 'yijinCompany',
    key: 'yijinCompany',
  },
   {
    title: '个人社保',
    dataIndex: 'shebaoPerson',
    key: 'shebaoPerson',
  },
  {
    title: '个人一金',
    dataIndex: 'yijinPerson',
    key: 'yijinPerson',
  },
  {
    title: '单位总计',
    dataIndex: 'companyTotal',
    key: 'companyTotal',
  },
    {
    title: '个人总计',
    dataIndex: 'personTotal',
    key: 'personTotal',
  },
  {
    title: '残保金',
    dataIndex: 'canbaoMoney',
    key: 'canbaoMoney',
  },
    {
    title: '手续费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
  },
  {
    title: '尾差',
    dataIndex: 'chaMoney',
    key: 'chaMoney',
  },
    {
    title: '社保总计',
    dataIndex: 'shebaoTotal',
    key: 'shebaoTotal',
  },
    {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
  },
    {
    title: '核对',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
   {
    title: '采购',
    dataIndex: 'bankPurchaseStatus',
    key: 'bankPurchaseStatus',
  },
   {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
  ]),
  new Set(['index', ...commonLeftAlignKeys]),
);

const innerLeftAlignKeys = new Set([
  'companyName',
  ...commonLeftAlignKeys,
]);

const innerColumns = withLeftAlign(
  withSameWidths([
  {
    title: '社保公司',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: '周期',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
  },
   {
    title: '单位社保',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
  },
   {
    title: '单位一金',
    dataIndex: 'yijinCompany',
    key: 'yijinCompany',
  },
   {
    title: '个人社保',
    dataIndex: 'shebaoPerson',
    key: 'shebaoPerson',
  },
  {
    title: '个人一金',
    dataIndex: 'yijinPerson',
    key: 'yijinPerson',
  },
  {
    title: '单位总计',
    dataIndex: 'companyTotal',
    key: 'companyTotal',
  },
    {
    title: '个人总计',
    dataIndex: 'personTotal',
    key: 'personTotal',
  },
   {
    title: '残保金',
    dataIndex: 'canbaoMoney',
    key: 'canbaoMoney',
  },
    {
    title: '手续费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
  },
   {
    title: '尾差',
    dataIndex: 'chaMoney',
    key: 'chaMoney',
  },
    {
    title: '社保总计',
    dataIndex: 'shebaoTotal',
    key: 'shebaoTotal',
  },
    {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
  },
    {
    title: '核对',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
   {
    title: '采购',
    dataIndex: 'bankPurchaseStatus',
    key: 'bankPurchaseStatus',
  },
   {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
  ]),
  innerLeftAlignKeys,
);
const loading = ref(false);
const shebaoWeiChaModalOpen = ref(false);
const shebaoWeiChaSubmitting = ref(false);
const shebaoWeiChaForm = ref<{ yearAndMonth: string; companyName: string; chaMoney: string }>({
  yearAndMonth: '',
  companyName: '',
  chaMoney: '',
});

const handleAddOutsourceSheBaoPurchaseCollect = async (record: any) => {
  Modal.confirm({
    title: '提示',
    content: '确认提交采购吗？',
    async onOk() {
      loading.value = true;
    await outsourceDetailStore.addOutsourceSalaryPurchaseSheBao(record.yearAndMonth, record.companyName, record.shebaoTotal, record.personNum).then((res) => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceDetailStore.queryOutsourceShebaoCollect("",record.yearAndMonth);
    } else {
      message.error(res.msg || '操作失败');
    }
    });
      loading.value = false;
    }
  });
}

const handleAddOutsourceSheBaoShebaoaoWeiCha = (record: any) => {
  shebaoWeiChaForm.value = {
    yearAndMonth: record?.yearAndMonth || '',
    companyName: record?.companyName || '',
    chaMoney: '',
  };
  shebaoWeiChaModalOpen.value = true;
};

const handleCloseShebaoWeiCha = () => {
  shebaoWeiChaModalOpen.value = false;
  shebaoWeiChaSubmitting.value = false;
  shebaoWeiChaForm.value = { yearAndMonth: '', companyName: '', chaMoney: '' };
};

const handleSubmitShebaoWeiCha = async () => {
  if (!shebaoWeiChaForm.value.yearAndMonth) {
    message.error('缺少yearAndMonth');
    return;
  }
  if (!shebaoWeiChaForm.value.companyName) {
    message.error('缺少companyName');
    return;
  }
  if (!shebaoWeiChaForm.value.chaMoney) {
    message.error('请输入chaMoney');
    return;
  }
  shebaoWeiChaSubmitting.value = true;
  const res = await outsourceDetailStore.addOutsourceQingKuanShebaoaoWeiCha(
    shebaoWeiChaForm.value.yearAndMonth,
    shebaoWeiChaForm.value.companyName,
    shebaoWeiChaForm.value.chaMoney,
  );
  shebaoWeiChaSubmitting.value = false;
  if (res && res.code === 1) {
    message.success('操作成功');
    outsourceDetailStore.queryOutsourceShebaoCollect('', shebaoWeiChaForm.value.yearAndMonth);
    handleCloseShebaoWeiCha();
  } else {
    message.error(res?.msg || '操作失败');
  }
};

const handleChecked = async (type: number, record: any) => {
  await outsourceDetailStore.updateOutsourceShebaoChecked(record.yearAndMonth, type == 2 ? record.companyName : '');
}
// 添加展开行状态控制
const expandedRowKeys = ref<string[]>([]); // 存储展开行的key

// 处理展开/折叠事件
const onExpand = (expanded: boolean, record: OutsourceSheBaoCollectItem) => {
  if (expanded) {
    // 展开时添加key
    expandedRowKeys.value = [...expandedRowKeys.value, record.yearAndMonth];
  } else {
    // 折叠时移除key
    expandedRowKeys.value = expandedRowKeys.value.filter(key => key !== record.yearAndMonth);
  }
};
</script>

<style lang="less" scoped>
:deep(.even-row) {
    background-color: #f0f8ff;
  }
  :deep(.even-row .ant-table-cell-row-hover) {
    background-color: #f0f8ff;
  }

.shebao-collect-table :deep(.ant-table-expanded-row > td) {
  padding: 0;
}

:deep(.expanded-wrapper .ant-spin-container .ant-table-small) {
  margin-left: 24px !important;
}
</style>
