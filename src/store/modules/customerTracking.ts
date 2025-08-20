import { defineStore } from 'pinia';
import { store } from '/@/store';
import { formatToDate } from '/@/utils/dateUtil';
import fetchApi from '/@/api/customerTracking';
import { HrDetailItem, CustomerTrackItem, PageItem } from '/@/api/customerTracking/model';
export const useCustomerTrackingStore = defineStore('app-CustomerTrackingStore',{
  state: () => ({
    // info
    hrDetailList: [] as HrDetailItem[],
    customerTrackList: [] as CustomerTrackItem[],
    customerTrackIsLoading: false,
    hrInfoFlag: false,//hr详情弹窗展示
    hrInfoCompanyAll: '',//hr详情弹窗展示所有公司
    pageCustomerTrackList: {
      pageNumber: 1,
      pageSize: 15,
      total: 0,
    } as PageItem,
  }),
  getters: {
    getHrDetailList: (state) => state.hrDetailList,
    getCustomerTrackList: (state) => state.customerTrackList.map((item,index)=> {
          return {
            ...item,
          index: ((state.pageCustomerTrackList.pageNumber - 1) * state.pageCustomerTrackList.pageSize) + (index + 1),
          category: item.category ?? '',
          hrInfo: item.hrInfo ?? '',
          brand: item.brand ?? '',
          cooperation: item.cooperation ?? '',
          customerService: item.customerService ?? '',
          bdAdvisor: item.bdAdvisor ?? '',
          meeting: item.meeting ?? '-',
          contact: item.contact ?? '',
          contactDate: item.contactDate ?? '',
          registTime: formatToDate(item.registTime),
          updateTime: formatToDate(item.updateTime),
          }
        }),
  },
  actions: {
    /**
     * @description: 查询客户汇总
     */
    async queryCustomerTrack(data) {
      if (this.customerTrackIsLoading) {
        return;
      }
      let params = new FormData();
      params.append('pageNumber', this.pageCustomerTrackList.pageNumber.toString());
      params.append('pageSize', this.pageCustomerTrackList.pageSize.toString());
      params.append('companyName', data.companyName || '');
      params.append('type', data.type || '');
      params.append('flag', data.flag || '');
      params.append('cooperateStatus', data.cooperateStatus || '');
      this.customerTrackIsLoading = true;
      try {
        const res = await fetchApi.queryCustomerTrack(params);
        if (res.code == 1) {
        this.customerTrackList = res.info.list as CustomerTrackItem[];
        this.pageCustomerTrackList = {
          pageNumber: res.info.pageNumber,
          pageSize: res.info.pageSize,
          total: res.info.totalCount,
        } as PageItem;
        this.customerTrackIsLoading = false;
      } else {
        this.customerTrackIsLoading = false;
      }
        return res;
      } catch (error) {
        this.customerTrackIsLoading = false;
      } finally {
        this.customerTrackIsLoading = false;
      }
    },
    /**
     * @description: 查询客户汇总
     */
    async queryHrDetail(data) {
      let params = new FormData();
      params.append('cId', data.companyId);
      params.append('companyName', data.companyName);
      params.append('jobType', data.jobType || '在职');
      this.hrInfoCompanyAll = data.companyNameAll;
      const res = await fetchApi.queryHrDetail(params);
      if (res.code == 1) {
        this.hrInfoFlag = true;
        this.hrDetailList = res.info.list as HrDetailItem[];
      }
      return res;
    },
  },
});

export function useCustomerTrackingStoreWithOut() {
  return useCustomerTrackingStore(store);
}