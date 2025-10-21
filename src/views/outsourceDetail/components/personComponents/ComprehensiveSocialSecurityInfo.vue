<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
    <div class="comprehensive-contract-info-title">社保信息</div>
    <a-button class="comprehensive-contract-info-btn" size="small" @click="addSocialSecurityInfo">新增</a-button>
  </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <div class="custom-table-container">
    <table class="custom-table">
      <tbody>
        <tr>
          <td>社保</td>
          <td>
             <a-tag v-if="getOutsourceSocialSecurityDetailList.length === 0" color="red">不缴</a-tag>
             <a-tag v-if="socialSecurity.shebaoStatus === '1'" color="red">不缴</a-tag>
             <a-tag v-if="socialSecurity.shebaoStatus === '2'" color="orange">待缴</a-tag>
             <a-tag v-if="socialSecurity.shebaoStatus === '3'" color="green">已缴</a-tag>
             <a-tag v-if="socialSecurity.shebaoStatus === '4'" color="orange">待停</a-tag>
             <a-tag v-if="socialSecurity.shebaoStatus === '5'" color="red">已停</a-tag>
          </td>
          <td>最低基数</td>
          <td>{{ socialSecurity.shebaoZuidiJishu ? socialSecurity.shebaoZuidiJishu : '-' }}</td>
          <td>实际基数</td>
          <td>{{ socialSecurity.shebaoShijiJishu ? socialSecurity.shebaoShijiJishu : '-' }}</td>
          <td>社保预缴</td>
          <td>{{ socialSecurity.shebaoYujiaoTime ? socialSecurity.shebaoYujiaoTime : '-' }}</td>
          <td>社保实缴</td>
          <td>{{ socialSecurity.shebaoShijiaoTime ? socialSecurity.shebaoShijiaoTime : '-' }}</td>
          <td>预停</td>
          <td>{{ socialSecurity.shebaoYutingTime ? socialSecurity.shebaoYutingTime : '-' }}</td>
          <td>实停</td>
          <td>{{ socialSecurity.shangbaoShitingTime ? socialSecurity.shangbaoShitingTime : '-' }}</td>
          <td>缴纳单位</td>
          <td>{{ socialSecurity.shebaoCompany ? socialSecurity.shebaoCompany : '-' }}</td>
          <td>缴纳标准</td>
          <td>
            <a-tag v-if="socialSecurity.shebaoStandard === '1'" color="green">最低基数</a-tag>
             <a-tag v-else-if="socialSecurity.shebaoStandard === '2'" color="orange">基本工资</a-tag>
             <a-tag v-else-if="socialSecurity.shebaoStandard === '3'" color="red">特殊基数</a-tag>
             <span v-else>-</span>
          </td>
        </tr>
        <tr>
          <td>一金</td>
          <td>
            <a-tag v-if="getOutsourceSocialSecurityDetailList.length === 0" color="red">不缴</a-tag>
             <a-tag v-if="socialSecurity.yijinStatus === '1'" color="red">不缴</a-tag>
             <a-tag v-if="socialSecurity.yijinStatus === '2'" color="orange">待缴</a-tag>
             <a-tag v-if="socialSecurity.yijinStatus === '3'" color="green">已缴</a-tag>
             <a-tag v-if="socialSecurity.yijinStatus === '4'" color="orange">待停</a-tag>
             <a-tag v-if="socialSecurity.yijinStatus === '5'" color="red">已停</a-tag>
          </td>
          <td>最低基数</td>
          <td>{{ socialSecurity.yijinZuidiJishu ? socialSecurity.yijinZuidiJishu : '-' }}</td>
          <td>实际基数</td>
          <td>{{ socialSecurity.yijinShijiJishu ? socialSecurity.yijinShijiJishu : '-' }}</td>
          <td>一金预缴</td>
          <td>{{ socialSecurity.yijinYujiaoTime ? socialSecurity.yijinYujiaoTime : '-' }}</td>
          <td>一金实缴</td>
          <td>{{ socialSecurity.yijinShijiaoTime ? socialSecurity.yijinShijiaoTime : '-' }}</td>
          <td>预停</td>
          <td>{{ socialSecurity.yijinYutingTime ? socialSecurity.yijinYutingTime : '-' }}</td>
          <td>实停</td>
          <td>{{ socialSecurity.yijinShitingTime ? socialSecurity.yijinShitingTime : '-' }}</td>
          <td>缴纳单位</td>
          <td>{{ socialSecurity.yijinJiaoCompany ? socialSecurity.yijinJiaoCompany : '-' }}</td>
          <td>缴纳标准</td>
          <td>
             <a-tag v-if="socialSecurity.yijinStandard === '1'" color="green">最低基数</a-tag>
             <a-tag v-else-if="socialSecurity.yijinStandard === '2'" color="orange">基本工资</a-tag>
             <a-tag v-else-if="socialSecurity.yijinStandard === '3'" color="red">特殊基数</a-tag>
             <span v-else>-</span>
          </td>
        </tr>
         <tr>
          <td>商保</td>
          <td>
            <a-tag v-if="getOutsourceSocialSecurityDetailList.length === 0" color="red">不缴</a-tag>
             <a-tag v-if="socialSecurity.shangbaoStatus === '1'" color="red">不缴</a-tag>
             <a-tag v-if="socialSecurity.shangbaoStatus === '2'" color="orange">缴纳</a-tag>
          </td>
          <td>客户收费</td>
          <td>{{ socialSecurity.keShangbao ? socialSecurity.keShangbao : '-' }}</td>
          <td>实际支出</td>
          <td>{{ socialSecurity.shiShangbao ? socialSecurity.shiShangbao : '-' }}</td>
          <td>商保预缴</td>
          <td>{{ socialSecurity.shangbaoYujiaoTime ? socialSecurity.shangbaoYujiaoTime : '-' }}</td>
          <td>商保实缴</td>
          <td>{{ socialSecurity.shangbaoShijiaoTime ? socialSecurity.shangbaoShijiaoTime : '-' }}</td>  
          <td>预停</td>
          <td>{{ socialSecurity.shangbaoYutingTime ? socialSecurity.shangbaoYutingTime : '-' }}</td>
          <td>实停</td>
          <td>{{ socialSecurity.shangbaoShitingTime ? socialSecurity.shangbaoShitingTime : '-' }}</td>
          <td>缴纳单位</td>
          <td>{{ socialSecurity.shangbaoJiaoCompany ? socialSecurity.shangbaoJiaoCompany : '-' }}</td>
          <td>项目</td>
          <td>{{ socialSecurity.shangbaoProject ? socialSecurity.shangbaoProject : '-' }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </a-col>
</a-row>
<a-row :gutter="24" v-if="getOutsourceSocialSecurityDetailList.length > 0">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourceSocialSecurityDetailList"
      :pagination="false"
      :scroll="{ x: 1800 }"
    >
  <template #bodyCell="{ column, record }">
      <span v-if="column.key == 'yijinRate'">{{ parseFloat((record.yijinRate * 100).toFixed(2)) }}%</span>
      <a-tag v-if="column.key == 'shangbaoProject' && record.shangbaoStatus == '1'" color="red">不缴</a-tag>
      <span v-if="column.key == 'keShangbao' && record.shangbaoStatus == '1'">-</span>
      <span v-if="column.key == 'shiShangbao' && record.shangbaoStatus == '1'">-</span>
      <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
      <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
      <span v-if="column.key == 'operation'">
        <FormOutlined @click="handleEditClick(record)"/>
      </span>
  </template>
  </a-table>
  </a-col>
</a-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { FormOutlined } from '@ant-design/icons-vue';
import { OutsourceSheBaoItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceSocialSecurityDetailList, outsourceSocialSecurityForm,outsourceSocialSecurityFlag,outsourcePersonDetail } = storeToRefs(outsourceDetailStore);
const socialSecurity = ref<OutsourceSheBaoItem>({} as OutsourceSheBaoItem);
watch(getOutsourceSocialSecurityDetailList, (newVal) => {
  if (newVal.length > 0) {
    socialSecurity.value = newVal[0];
  } else {
    socialSecurity.value = {} as OutsourceSheBaoItem;
  }
})
const columns:TableColumnsType = [
  {
    title: '基本信息',
    children: [
      {
        title: '编号',
        dataIndex: 'index',
        key: 'index',
        fixed: 'left',
        width: 40,
      },
       {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    fixed: 'left',
    width: 60,
    ellipsis: true,
      },
      {
        title: '生效日期',
        dataIndex: 'shebaoShijiaoTime',
        key: 'shebaoShijiaoTime',
        fixed: 'left',
        width: 80,
      },
      {
        title: '城市',
        dataIndex: 'shebaoCity',
        key: 'shebaoCity',
        fixed: 'left',
        width: 60,
      },
      {
        title: '缴纳单位',
        dataIndex: 'shebaoCompany',
        key: 'shebaoCompany',
        fixed: 'left',
        width: 60,
      },
      {
        title: '手续费',
        dataIndex: 'serviceMoney',
        key: 'serviceMoney',
        fixed: 'left',
        width: 50,
      },
    ]
  },
  {
    title: '养老保险',
    children: [
      {
        title: '基数',
        dataIndex: 'yanglaoJishu',
        key: 'yanglaoJishu',
        width: 60,
      },
      {
        title: '企业',
        dataIndex: 'yanglaoCompany',
        key: 'yanglaoCompany',
        width: 60,
      },
       {
        title: '个人',
        dataIndex: 'yanglaoPerson',
        key: 'yanglaoPerson',
        width: 60,
      },
    ]
  },
  {
    title: '医疗生育',
    children: [
      {
        title: '基数',
        dataIndex: 'yiliaoJishu',
        key: 'yiliaoJishu',
        width: 60,
      },
      {
        title: '企医',
        dataIndex: 'yiliaoCompany',
        key: 'yiliaoCompany',
        width: 60,
      },
       {
        title: '个医',
        dataIndex: 'yiliaoPerson',
        key: 'yiliaoPerson',
        width: 60,
      },
       {
        title: '企病',
        dataIndex: 'dabingCompany',
        key: 'dabingCompany',
        width: 60,
      },
       {
        title: '个病',
        dataIndex: 'dabingPerson',
        key: 'dabingPerson',
        width: 60,
      },
       {
        title: '企育',
        dataIndex: 'shengyuCompany',
        key: 'shengyuCompany',
        width: 60,
      },
    ]
  },
  {
    title: '失业工伤',
    children: [
      {
        title: '基数',
        dataIndex: 'shiyeJishu',
        key: 'shiyeJishu',
        width: 60,
      },
      {
        title: '企失',
        dataIndex: 'shiyeCompany',
        key: 'shiyeCompany',
        width: 60,
      },
       {
        title: '个失',
        dataIndex: 'shiyePerson',
        key: 'shiyePerson',
        width: 60,
      },
       {
        title: '企工',
        dataIndex: 'gongshangCompany',
        key: 'gongshangCompany',
        width: 60,
      },
    ]
  },
  {
    title: '社保总计',
    children: [
      {
        title: '企业',
        dataIndex: 'companyTotal',
        key: 'companyTotal',
        width: 60,
      },
      {
        title: '个人',
        dataIndex: 'personTotal',
        key: 'personTotal',
        width: 60,
      },
    ]
  },
  {
    title: '公积金总计',
    children: [
      {
        title: '基数',
        dataIndex: 'yijinJishu',
        key: 'yijinJishu',
        width: 60,
      },
      {
        title: '比例',
        dataIndex: 'yijinRate',
        key: 'yijinRate',
        width: 60,
      },
       {
        title: '企业',
        dataIndex: 'yijinCompany',
        key: 'yijinCompany',
        width: 60,
      },
       {
        title: '个人',
        dataIndex: 'yijinPerson',
        key: 'yijinPerson',
        width: 60,
      },
    ]
  },
  {
    title: '商业保险',
    children: [
      {
        title: '项目',
        dataIndex: 'shangbaoProject',
        key: 'shangbaoProject',
        width: 60,
      },
      {
        title: '客户',
        dataIndex: 'keShangbao',
        key: 'keShangbao',
        width: 60,
      },
       {
        title: '实际',
        dataIndex: 'shiShangbao',
        key: 'shiShangbao',
        width: 60,
      },
    ]
  },
  {
    title: '',
    children: [
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        width: 37,
      },
    ]
  },
]
watch(() => outsourcePersonDetail.value.id, () => {
  outsourceDetailStore.queryOutsourceSheBaoByPersonId();
})
outsourceDetailStore.queryOutsourceSheBaoByPersonId();
const addSocialSecurityInfo = () => {
  outsourceDetailStore.addSocialSecurityInfo();
}
const handleEditClick = (record) => {
  outsourceSocialSecurityFlag.value = true;
  outsourceSocialSecurityForm.value = record;
}
</script>

<style lang="less" scoped>
.comprehensive-contract-info {
  display: flex;
  justify-content: space-between;
}
  .comprehensive-contract-info-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: auto;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .comprehensive-contract-info-btn {
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .custom-table-container {
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #f0f0f0;
  margin-bottom: 5px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.custom-table tr {
  transition: all 0.3s;
  border-bottom: 1px solid #f0f0f0;
}

.custom-table tr:hover {
  background-color: #fafafa;
}

.custom-table td {
  padding: 3px 4px;
  border-bottom: 1px solid #f0f0f0;
}

.custom-table td:nth-child(odd) {
  font-weight: 700;
  background-color: #fafafa;
  position: sticky;
  left: 0;
  z-index: 1;
  width: 70px;
}
.custom-table td:nth-child(even) {
  width: 85px;
}
.custom-table td:nth-child(1),
.custom-table td:nth-child(2),
.custom-table td:nth-child(4),
.custom-table td:nth-child(6),
.custom-table td:nth-child(11),
.custom-table td:nth-child(13)
 {
  width: 45px;
}
// 与a-table的标签样式保持一致
.custom-table .ant-tag {
  margin-right: 0;
}
</style>