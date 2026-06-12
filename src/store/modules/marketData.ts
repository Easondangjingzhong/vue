import { defineStore } from 'pinia';
import { store } from '/@/store';
import { MarketDataListSearchItem, MappingTempItem } from '/@/api/marketData/model';
import { formatToDate, currentDate, formatToMonth } from '/@/utils/dateUtil';
import fetchApi from '/@/api/marketData';
import fetchCityApi from '/@/api/city';
import fetchResumeDetail from '/@/api/resumeDetail';
import fetchResumeList from '/@/api/resumeList';
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser') || '{}',
);
export const useMarketDataStore = defineStore('app-MarketData', {
  state: () => ({
    formStateMarketData: reactive<MarketDataListSearchItem>({} as MarketDataListSearchItem),
    pageMarketDataList: reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }),
    marketDataList: [] as MappingTempItem[],
    province: [] as any[],
    brandList: [] as any[],
    MarkList: [] as any[],
    enterpriseConsultant: [] as any[],
  }),
  getters: {
    getMarketDataList: (state) => state.marketDataList?.map((item, index) => ({
      ...item,
      index: state.pageMarketDataList.pageNum > 1 ? state.pageMarketDataList.pageNum * state.pageMarketDataList.pageSize + (index + 1) : index + 1,
      createTime: item.createTime ? formatToDate(item.createTime) : '',
      assignTime: item.assignTime ? formatToDate(item.assignTime) : '',
    })),
    getProvince: (state) =>
      state.province?.map((item) => {
        return {
          label: item.cityName,
          value: item.cityName,
        };
      }),
    getBrandList: (state) =>
      state.brandList?.map((item) => {
        return {
          label: item.cnName || item.usName,
          value: item.brandId, 
        };
      }),
    getMarkList: (state) =>
      state.MarkList?.map((item) => {
        return {
          label: item.text,
          value: item.id,
        };
      }),
    getEnterpriseConsultant: (state) =>
      state.enterpriseConsultant?.map((item) => {
        return {
          label: item.realNameEn,
          value: item.id?.toString(),
        };
      }),
  },
  actions: {
    /**
     * 查询商场信息临时顾问
     * @param pageNumber 页码,
     * @param pageSize 每页数量,
     * @param type 类型,
     * @param assignStatus 分配状态,
     * @param checkStatus 审核状态,
     * @param jobStatus 岗位状态,
     * @param city 城市,
     * @param marketId 商场ID,
     * @param brandId 品牌ID,
     * @param entryRecruitId 录入招聘ID,
     * @param assignRecruitId 分配招聘ID
     * @returns
     */
    async queryMappingTempPageAjax() {
      const res = await fetchApi
        .queryMappingTempPageAjax({
          pageNumber: this.pageMarketDataList.pageNum,
          endRow: this.pageMarketDataList.pageSize,
          type: this.formStateMarketData.type,
          assignStatus: this.formStateMarketData.assignStatus,
          checkStatus: this.formStateMarketData.checkStatus,
          jobStatus: this.formStateMarketData.jobStatus,
          city: this.formStateMarketData.city,
          marketId: this.formStateMarketData.marketId,
          brandId: this.formStateMarketData.brandId,
          entryRecruitId: this.formStateMarketData.entryRecruitId,
          assignRecruitId: this.formStateMarketData.assignRecruitId,
          SystemRecruitId: loginVueUser.loginId || '',
        })
        .then((res) => {
          if (res.code === 1) {
            this.marketDataList = res.info.list as MappingTempItem[];
            this.pageMarketDataList.total = res.info.total;
            this.pageMarketDataList.pageNum = res.info.pageNumber;
            this.pageMarketDataList.pageSize = res.info.pageSize;
          }
        });
      return res;
    },
    async queryProvince() {
      const res = await fetchCityApi.province();
      if (res) {
        // save token
        this.province = res.info;
      }
      return res;
    },
    /**
     * 根据城市商场数据类型参数查询
     * @param param 城市商场
     */
    async queryMarkList(city: string, marketName?: string) {
      const formData = new FormData();
      formData.append('city', city);
      formData.append('marketName', marketName || '');
      formData.append('curPage', '1');
      const res = await fetchResumeDetail.queryMarkList(formData);
      if (res.code === 1) {
        this.MarkList = res.info;
      }
      return res;
    },
    async queryMarkBrandFloor(marketId?: string, brandId?: string) {
      const formData = new FormData();
      formData.append('marketId', marketId || '');
      formData.append('brandId', brandId || '');
      formData.append('recruitId', loginVueUser.loginId || '');
      const res = await fetchResumeDetail.queryMarkBrandFloor(formData);
      if (res.code === 1) {
        this.brandList = res.info;
      }
      return res;
    },
    /**
     * 查询职位排除门店销售和门店支持
     */
    async queryResumePositions(jobCategory = '店铺') {
      const formData = new FormData();
      formData.append('industry', '');
      formData.append('jobCategory2', '');
      formData.append('management2', '');
      formData.append('jobCategory', jobCategory);
      const res = await fetchResumeDetail.queryResumePositions(formData);
      return res;
    },
    /**
     * 根据品牌类型参数查询
     * @param param 品牌的类型参数
     */
    async queryBranList() {
      let formData = new FormData();
      formData.append('retail', '');
      formData.append('category', '');
      formData.append('leibie', '');
      formData.append('pinji', '');
      const res = await fetchResumeList.queryBranList(formData);
      if (res.code === 1) {
        this.brandList = res.info.brandList;
      }
      return res;
    },
    /**
     * 查询企业顾问
     */
    async queryEnterpriseConsultant(teamId = '') {
      const formData = new FormData();
      formData.append('teamId', teamId);
      formData.append('SystemRecruitId', loginVueUser.loginId || '');
      const res = await fetchResumeDetail.queryEnterpriseConsultant(formData);
      if (res.code === 1) {
        this.enterpriseConsultant = res.info || [];
      }
      return res;
    },
    /**
     * 新增商场信息临时顾问
     */
    async addMappingTemp(data?: Partial<MappingTempItem>) {
      const payload = {
        type: data?.type || '',
        userName: data?.userName || '',
        city: data?.city || '',
        marketId: data?.marketId?.toString() || '',
        marketName: data?.marketName || '',
        brandId: data?.brandId?.toString() || '',
        brandName: data?.brandName || '',
        phoneNum: data?.phoneNum || '',
        positionId: data?.positionId?.toString() || '',
        jobStatus: data?.jobStatus || '',
        sex: data?.sex || '',
        age: data?.age || '',
        systemRecruitId: loginVueUser.loginId || '',
      };
      const res = await fetchApi.addMappingTemp(payload);
      if (res.code === 1) {
        this.queryMappingTempPageAjax();
      }
      return res;
    },
    /**
     * 分配
     */
    async updateAssignMappingTemp(payload: any) {
      const formData = new FormData();
      formData.append('ids', payload.ids || '');
      formData.append('assignRecruitId', payload.assignRecruitId || '');
      formData.append('assignRealNameEn', payload.assignRealNameEn || '');
      const res = await fetchApi.updateAssignMappingTemp(formData);
      if (res.code === 1) {
        this.queryMappingTempPageAjax();
      }
      return res;
    },
  },
});

export function useMarketDataStoreWithOut() {
  return useMarketDataStore(store);
}
