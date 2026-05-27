<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :data-source="getOfferOutsourceSheBao"
        :scroll="{ x: 2200 }"
      >
    </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOfferOutsourceSheBao, getOutsourceSalaryColumnsSheBao } = storeToRefs(outsourceDetailStore);
const defaultColumns = computed<TableColumnsType>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      fixed: 'left',
    },
     {
      title: '姓名',
      dataIndex: 'userNameCn',
      key: 'userNameCn',
      fixed: 'left',
    },
     {
      title: '缴费月份',
      dataIndex: 'yearAndMonth',
      key: 'yearAndMonth',
      fixed: 'left',
    },
     {
      title: '养老保险',
      children: [
        {
          title: '养老基数',
          dataIndex: 'yanglaoCompanyJishu',
          key: 'yanglaoCompanyJishu',
        },
        {
          title: '单位',
          dataIndex: 'yanglaoCompany',
          key: 'yanglaoCompany',
        },
        {
          title: '个人',
          dataIndex: 'yanglaoPerson',
          key: 'yanglaoPerson',
        },
      ],
    },
     {
      title: '失业保险',
      children: [
        {
          title: '失业基数',
          dataIndex: 'shiyeCompanyJishu',
          key: 'shiyeCompanyJishu',
        },
        {
          title: '单位',
          dataIndex: 'shiyeCompany',
          key: 'shiyeCompany',
        },
        {
          title: '个人',
          dataIndex: 'shiyePerson',
          key: 'shiyePerson',
        },
      ]
     },
    {
      title: '医疗保险',
      children: [
        {
          title: '医疗基数',
          dataIndex: 'yiliaoCompanyJishu',
          key: 'yiliaoCompanyJishu',
        },
        {
          title: '单位',
          dataIndex: 'yiliaoCompany',
          key: 'yiliaoCompany',
        },
        {
          title: '个人',
          dataIndex: 'yiliaoPerson',
          key: 'yiliaoPerson',
        },
      ]
    },  
      {
      title: '大病救助保险',
      children: [
        {
          title: '大病基数',
          dataIndex: 'dabingCompanyJishu',
          key: 'dabingCompanyJishu',
        },
        {
          title: '单位',
          dataIndex: 'dabingCompany',
          key: 'dabingCompany',
        },
        {
          title: '个人',
          dataIndex: 'dabingPerson',
          key: 'dabingPerson',
        },
      ],
      },
      {
      title: '工伤保险',
      children: [
        {
          title: '工伤基数',
          dataIndex: 'gongshangJishu',
          key: 'gongshangJishu',
        },
        {
          title: '单位',
          dataIndex: 'gongshangCompany',
          key: 'gongshangCompany',
        },
      ],
      },  
      {
      title: '生育保险',
      children: [
        {
          title: '生育基数',
          dataIndex: 'shengyuJishu',
          key: 'shengyuJishu',
        },
        {
          title: '单位',
          dataIndex: 'shengyuCompany',
          key: 'shengyuCompany',
        },
      ],
      },  
      {
      title: '住房公积金',
      children: [
        {
          title: '公积金基数',
          dataIndex: 'yijinCompanyJishu',
          key: 'yijinCompanyJishu',
        },
        {
          title: '单位',
          dataIndex: 'yijinCompany',
          key: 'yijinCompany',
        },
        {
          title: '个人',
          dataIndex: 'yijinPerson',
          key: 'yijinPerson',
        },
      ],
      },    
     {
      title: '单位合计',
      dataIndex: 'companyTotal',
      key: 'companyTotal',
    },
     {
      title: '个人合计',
      dataIndex: 'personTotal',
      key: 'personTotal',
    },
  ]);
  const columns = computed(() => {
      const saved = getOutsourceSalaryColumnsSheBao.value;
      if (saved && saved.length > 0) {
        const savedMap = new Map(saved.map((c: any) => [c.key, c]));
        return defaultColumns.value.map((col: any) => {
          const s = savedMap.get(col.key);
          if (s) {
            // If saved, use saved title and visibility
            if (s.show === false) return null;
            return { ...col,
               title: s.rowOther || s.rowName,
               width: s.width || col.width,
               fixed: s.fixed || col.fixed,
               key: s.key,
               dataIndex: s.key,
               ellipsis: true,
            };
          }
          // If not in saved list, keep it default
          return col;
        }).filter((c: any) => c !== null);
      }
      return defaultColumns.value;
    });
    watch(() => outsourceDetailStore.formStatePersonMoney.companyName, (val) => {
      if (val) {
        outsourceDetailStore.queryOutsourceCompanyExcel(val);
      }
    }, { immediate: true });
</script>

<style lang="less" scoped>
</style>
