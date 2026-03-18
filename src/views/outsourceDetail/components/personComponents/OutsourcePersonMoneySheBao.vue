<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :data-source="getOfferOutsourceSheBao"
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
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
     {
      title: '项目',
      dataIndex: 'companyName',
      key: 'companyName',
    },
     {
      title: '姓名',
      dataIndex: 'userNameCn',
      key: 'userNameCn',
    },
     {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
    },
     {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
     {
      title: '缴费月份',
      dataIndex: 'yearAndMonth',
      key: 'yearAndMonth',
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
