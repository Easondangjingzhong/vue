import { defineStore } from 'pinia';
import { store } from '/@/store';
import { formatToDate,formatToDateMinute } from '/@/utils/dateUtil';
import fetchApi from '/@/api/customerTracking';
import fetchResumeApi from '/@/api/resumeList';
import { HrDetailItem, CustomerTrackItem, PageItem, CustomerTrackHrItem,CustomerTrackContractItem } from '/@/api/customerTracking/model';
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser') || '{}',
);
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
    formState: {
    companyName: '',
    type: '',
    flag: '',
    cooperateStatus: '',
    },
    positionsList: [] as any[],//职位列表
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
    customerTrackContractFlag: false,//新增HR联络记录弹窗展示
    customerTrackContract: [] as CustomerTrackContractItem[],//HR联络记录
    customerTrackContractPage: {
      pageNumber: 1,
      pageSize: 5,
      total: 0,
    } as PageItem,
    companyList: [] as any[],//公司列表
    customerTrackBdAdvisorArr: [] as any[],//BD顾问列表
  }),
  getters: {
    getHrDetailList: (state) => state.hrDetailList,
    getCustomerTrackList: (state) => state.customerTrackList.map((item,index)=> {
          return {
            ...item,
          index: ((state.pageCustomerTrackList.pageNumber - 1) * state.pageCustomerTrackList.pageSize) + (index + 1),
          category: item.lslist?.map(item => `${item.brandName}=${item.brandType}`) ?? '',
          hrInfo: item.hrInfo ?? '',
          lieList: mergeCustomerServices(item.lieList,1) ?? '',
          waiList: mergeCustomerServices(item.waiList,2) ?? '',
          bdAdvisor: item.bdUserName ?? '',
          meeting: item.yueJianNum == 0 ? '-' : item.yueJianNum,
          contact: item.contact ?? '',
          contactDate: formatToDate(item.lastContractTime) ?? '',
          registTime: formatToDate(item.registTime),
          updateTime: formatToDate(item.updateTime),
          }
        }),
    getCustomerTrackHr: (state) => state.customerTrackHr,
    getCustomerTrackContract: (state) => state.customerTrackContract.map((item) => {
      return {
        ...item,
        contractTime: formatToDateMinute(item.contractTime) || '',
        nextTime: formatToDateMinute(item.nextTime) || '',
      }
    }),
    getPositionsList: (state) => state.positionsList.map(item => {
      return {
        label: [item.cnPosition, item.usPosition].filter(val => val != null && val !== '' && val !== ' ').join('/'),
        value: item.positionId,
      }
    }),
    getCompanyList: (state) => state.companyList.map(item => {
      return {
        label: item.companyName,
        value: item.companyName,
      }
    }),
    getCustomerTrackBdAdvisorArr: (state) => state.customerTrackBdAdvisorArr.map(item => ({value: item.teamId,label: item.teamName,children: item.recruitList.map(subItem => ({value: subItem.recruitId,label: subItem.realNameEn}))})),
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
    },
     /**
     * @description: 新增客户追踪HR信息
     */
    async queryCustomerTrackContract() {
      let params = new FormData();
      params.append('collectId', this.customerTrackInfo.id.toString());
      params.append('pageNumber', this.customerTrackContractPage.pageNumber.toString());
      params.append('pageSize', this.customerTrackContractPage.pageSize.toString());
      const res = await fetchApi.queryCustomerTrackContract(params);
      if (res.code == 1) {
        this.customerTrackContract = res.info.list as CustomerTrackContractItem[];
        this.customerTrackContractPage = {
          pageNumber: res.info.pageNumber,
          pageSize: res.info.pageSize,
          total: res.info.totalCount,
        } as PageItem;
         if (res.info.totalCount == 0) {
          this.customerTrackContractFlag = true;
        }
      }
      return res;
    },
    /**
     * @description: 新增客户追踪合同信息
     */
    async addCustomerTrackContract(data) {
      let params = new FormData();
      params.append('collectId', this.customerTrackInfo.id.toString());
      params.append('hrName', data.hrName || '');
      params.append('hrId', data.hrId || '');
      params.append('contractType', data.contractType || '');
      params.append('contractFlag', data.contractFlag || '');
      params.append('contractTime', data.contractTime || '');
      params.append('nextTime', data.nextTime ? data.nextTime : '');
      params.append('contractDetail', data.contractDetail || '');
      params.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.addCustomerTrackContract(params);
      if (res.code == 1) {
        this.customerTrackContractFlag = false;
        this.customerTrackContractPage.pageNumber = 1;
        this.queryCustomerTrackContract();
      }
      return res;
    },
    /**
         * 根据职位数据类型参数查询
         * @param param 职位的类型参数
         */
        async queryPositionsList() {
          let formData = new FormData();
          formData.append('industry', '');
          formData.append('jobCategory2', '');
          formData.append('management2', '');
          const res = await fetchResumeApi.queryPositionsList(formData);
          if (res.info) {
            this.positionsList = res.info.postList;
          }
        },
        /**
     * @description: 更新客户追踪HR信息
     */
    updateOpenCustomerTrackHRInfo(data) {
      this.openAddCustomerTrackHRFlag = true;
      this.addCustomerTrackHRInfo = {
        ...data,
        //@ts-ignore
        brandId: data?.brandId?.toString().split(",") || [],
        //@ts-ignore
        brandName: data?.brandName?.split(",") || [],
      };
    },
     /**
         * 根据公司数据类型参数查询
         * @param param 公司的类型参数
         */
        async queryCompanyList() {
          const res = await fetchApi.queryCompanyList();
          if (res.info) {
            this.companyList = res.info;
          }
        },
         /**
         * 根据公司数据类型参数查询
         * @param param 公司的类型参数
         */
        queryCustomerTrackSider(data) {
          if (data == '2') {
            this.formState.cooperateStatus = '';
          }
           if (data == '21') {
            this.formState.cooperateStatus = '猎头客户';
          }
          if (data == '211') {
            this.formState.cooperateStatus = '猎头合作';
          }
          if (data == '212') {
            this.formState.cooperateStatus = '猎头过期';
          }
          if (data == '213') {
            this.formState.cooperateStatus = '猎头未合';
          }
          if (data == '31') {
            this.formState.cooperateStatus = '外包客户';
          }
          if (data == '311') {
            this.formState.cooperateStatus = '外包合作';
          }
          if (data == '312') {
            this.formState.cooperateStatus = '外包过期';
          }
          if (data == '313') {
            this.formState.cooperateStatus = '外包未合';
          }
          this.pageCustomerTrackList.pageNumber = 1;
          this.queryCustomerTrack(this.formState);
        },
         /**
         * 更新客户追踪类型
         * @param param 公司的类型参数
         */
        async updateCustomerTrackType(data) {
          let params = new FormData();
          params.append('id', this.customerTrackInfo.id.toString());
          params.append('type', data);
          const res = await fetchApi.updateCustomerTrackType(params);
          if (res.code == 1) {
            this.customerTrackList = this.customerTrackList.map((item) => {
              if (item.id == this.customerTrackInfo.id) {
                item.type = data;
              }
              return item;
            })
          }
        },
          /**
         * 更新客户追踪类型
         * @param param 公司的类型参数
         */
        async updateCustomerTrackFlag(data) {
          let params = new FormData();
          params.append('id', this.customerTrackInfo.id.toString());
          params.append('flag', data);
          const res = await fetchApi.updateCustomerTrackFlag(params);
          if (res.code == 1) {
            this.customerTrackList = this.customerTrackList.map((item) => {
              if (item.id == this.customerTrackInfo.id) {
                item.flag = data;
              }
              return item;
            })
          }
        },
         /**
         * 更新客户追踪类型
         * @param param 公司的类型参数
         */
        async updateCustomerTrackTypeById(data) {

          let params = new FormData();
          params.append('id', data.id);
          params.append('type', data.type);
          const res = await fetchApi.updateCustomerTrackType(params);
          if (res.code == 1) {
            this.customerTrackList = this.customerTrackList.map((item) => {
              if (item.id == data.id) {
                item.type = data.type;
              }
              return item;
            })
          }
          return res;
        },
          /**
         * 更新客户追踪类型
         * @param param 公司的类型参数
         */
        async updateCustomerTrackFlagById(data) {
          let params = new FormData();
          params.append('id', data.id);
          params.append('flag', data.flag);
          const res = await fetchApi.updateCustomerTrackFlag(params);
          if (res.code == 1) {
            this.customerTrackList = this.customerTrackList.map((item) => {
              if (item.id == data.id) {
                item.flag = data.flag;
              }
              return item;
            })
          }
          return res;
        },
        /**
         * BD顾问
         * @param param 公司的类型参数
         */
        async updateCustomerTrackBdAdvisorById(data) {
          let params = new FormData();
          params.append('id', data.id);
          params.append('bdUserId', data.bdUserId);
          params.append('bdUserName', data.bdUserName);
          const res = await fetchApi.updateCustomerTrackBdAdvisor(params);
          if (res.code == 1) {
            this.customerTrackList = this.customerTrackList.map((item) => {
              if (item.id == data.id) {
                item.bdUserId = data.bdUserId;
                item.bdUserName = data.bdUserName;
              }
              return item;
            })
          }
          return res;
        },
         /**
         * BD顾问
         * @param param 公司的类型参数
         */
        async queryCustomerTrackBdAdvisor() {
          const res = await fetchResumeApi.queryTeamPersonChangeSystemA();
          if (res.code == 1) {
           this.customerTrackBdAdvisorArr = res.info;
          }
        },
  },
});

export function useCustomerTrackingStoreWithOut() {
  return useCustomerTrackingStore(store);
}