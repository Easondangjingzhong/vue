import { defineStore } from 'pinia';
import { store } from '/@/store';
import { formatToDate } from '/@/utils/dateUtil';
import fetchApi from '/@/api/customerTracking';
import { HrDetailItem, CustomerTrackItem, PageItem, CustomerTrackHrItem } from '/@/api/customerTracking/model';

const mergeCustomerServices = (list?: { counselor: string; recruitId: number }[] | null,type?:number): string => {

  const safeList = list ?? [];
  
  if (!safeList?.length) return '';
  
  const counselors: string[] = [];
  
  if (safeList?.length) {
    counselors.push(...safeList.map(item => item.counselor));
  }
  
  return `${type === 1 ? '猎头企顾' : '外包企顾'}: ${counselors.join(', ')}`;

};
export const useCustomerTrackingStore = defineStore('app-CustomerTrackingStore',{
  state: () => ({
    // info
    hrDetailList: [] as HrDetailItem[],
    customerTrackHr: [] as CustomerTrackHrItem[],
    customerTrackList: [] as CustomerTrackItem[],
    customerTrackIsLoading: false,
    hrInfoFlag: false,//hr详情弹窗展示
    hrInfoCompanyAll: '',//hr详情弹窗展示所有公司
    customerTrackInfoFlag: false,//客户追踪详情弹窗展示
    customerTrackInfo: {} as CustomerTrackItem,
    openAddCustomerTrackHRFlag: false,//新增HR信息弹框
    addCustomerTrackHRInfo: {} as HrDetailItem,
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
          category: item.lslist?.map(item => `${item.brandName} ${item.brandType}`).join("\n") ?? '',
          hrInfo: item.hrInfo ?? '',
          lieList: mergeCustomerServices(item.lieList,1) ?? '',
          waiList: mergeCustomerServices(item.waiList,2) ?? '',
          bdAdvisor: item.bdAdvisor ?? '',
          meeting: item.yueJianNum ?? '',
          contact: item.contact ?? '',
          contactDate: item.lastContractTime ?? '',
          registTime: formatToDate(item.registTime),
          updateTime: formatToDate(item.updateTime),
          }
        }),
    getCustomerTrackHr: (state) => state.customerTrackHr,

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
      } else {
        this.hrDetailList = [] as HrDetailItem[];
      }
      return res;
    },
    /**
     * @description: 查询客户追踪HR信息
     */
    async queryCompanyNameAll(data) {
      this.customerTrackInfo = data;
      this.customerTrackInfoFlag = true;
      let params = new FormData();
      params.append('collectId', data.id);
      const res = await fetchApi.queryCustomerTrackHr(params);
      if (res.code == 1) {
        this.customerTrackHr = res.info as CustomerTrackHrItem[];
      }
      return res;
    },
    /**
     * @description: 新增客户追踪HR信息
     */
    async addOpenCustomerTrackHRInfo() {
      this.openAddCustomerTrackHRFlag = true;
      let params = new FormData();
      params.append('cId', this.customerTrackInfo.companyId);
      params.append('companyName', this.customerTrackInfo.companyName);
      params.append('jobType', '在职');
      const res = await fetchApi.queryHrDetail(params);
      if (res.code == 1) {
        this.hrDetailList = res.info.list as HrDetailItem[];
      } else {
        this.hrDetailList = [] as HrDetailItem[];
      }
    },
    /**
     * @description: 关闭新增客户追踪HR信息
     */
    closeAddCustomerTrackHRInfo() {
      this.openAddCustomerTrackHRFlag = false;
      this.hrDetailList = [] as HrDetailItem[];
      this.addCustomerTrackHRInfo = {} as HrDetailItem;
    },
    /**
     * @description: 新增客户追踪HR信息
     */
    async addCustomerTrackHRInfoDetail(data) {
      data.collectId = this.customerTrackInfo.id;
      const res = await fetchApi.addCustomerTrackHr(data as HrDetailItem);
      if (res.code == 1) {
        this.closeAddCustomerTrackHRInfo();
        this.queryCompanyNameAll(this.customerTrackInfo)
      }
      return res;
    }

  },
});

export function useCustomerTrackingStoreWithOut() {
  return useCustomerTrackingStore(store);
}