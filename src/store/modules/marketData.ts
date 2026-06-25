import { defineStore } from 'pinia';
import { store } from '/@/store';
import {
  MarketDataListSearchItem,
  MappingTempItem,
  MarketRightListSearchItem,
} from '/@/api/marketData/model';
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
    positionsList: [] as any[],
    MarkList: [] as any[],
    enterpriseConsultant: [] as any[],
    structureList: [] as any[],
    personList: [] as any[],
    searchAssignList: [] as any[],
    searchBrandList: [] as any[],
    searchEntryList: [] as any[],
    searchMarketList: [] as any[],
    searchCityList: [] as any[],
    searchPositionList: [] as any[],
    marketRightList: [] as any[],
    formStateMarketRightList: reactive<MarketRightListSearchItem>({} as MarketRightListSearchItem),
    pageMarketRightList: reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }),
  }),
  getters: {
    getMarketDataList: (state) =>
      state.marketDataList?.map((item, index) => ({
        ...item,
        index:
          state.pageMarketDataList.pageNum > 1
            ? state.pageMarketDataList.pageNum * state.pageMarketDataList.pageSize + (index + 1)
            : index + 1,
        createTime: item.createTime ? formatToDate(item.createTime) : '',
        assignTime: item.assignTime ? formatToDate(item.assignTime) : '',
      })),
    getMarketRightList: (state) =>
      state.marketRightList?.map((item, index) => ({
        ...item,
        key: item?.id ?? `${state.pageMarketRightList.pageNum}-${index}`,
        index:
          state.pageMarketRightList.pageNum > 1
            ? (state.pageMarketRightList.pageNum - 1) * state.pageMarketRightList.pageSize +
              (index + 1)
            : index + 1,
      })),
    getProvince: (state) =>
      state.province?.map((item) => {
        return {
          label: item.cityName ? item.cityName : item.provinceName,
          value: item.cityName ? item.cityName : item.provinceName,
        };
      }),
    getCity: (state) =>
      state.province?.map((item) => {
        return {
          label: item.cityName ? item.cityName : item.provinceName,
          value: item.id,
        };
      }),
    getBrandList: (state) =>
      state.brandList?.map((item) => {
        const cnName = item.cnName?.trim() || '';
        const usName = item.usName?.trim() || '';
        return {
          label: cnName && usName ? `${cnName}/${usName}` : cnName || usName,
          value: item.brandId,
        };
      }),
    getPositionsList: (state) =>
      state.positionsList?.map((item) => {
        const cnPosition = item.cnPosition?.trim() || '';
        const usPosition = item.usPosition?.trim() || '';
        return {
          label:
            cnPosition && usPosition ? `${cnPosition}/${usPosition}` : cnPosition || usPosition,
          value: item.positionId,
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
    getStructureList: (state) =>
      state.structureList?.map((item) => {
        return {
          label: item.structureName,
          value: item.structureId,
        };
      }),
    getPersonList: (state) =>
      state.personList?.map((item) => {
        return {
          label: item.realNameEn,
          value: item.id?.toString(),
        };
      }),
    getSearchAssignList: (state) =>
      state.searchAssignList?.map((item) => {
        return {
          label: item.assignRealNameEn,
          value: item.assignRecruitId?.toString(),
        };
      }),
    getSearchBrandList: (state) =>
      state.searchBrandList?.map((item) => {
        return {
          label: item.brandName,
          value: item.brandId?.toString(),
        };
      }),
    getSearchEntryList: (state) =>
      state.searchEntryList?.map((item) => {
        return {
          label: item.entryRealNameEn,
          value: item.entryRecruitId?.toString(),
        };
      }),
    getSearchMarketList: (state) =>
      state.searchMarketList?.map((item) => {
        return {
          label: item.marketName,
          value: item.marketId?.toString(),
        };
      }),
    getSearchCityList: (state) =>
      state.searchCityList?.map((item) => {
        return {
          label: item.city,
          value: item.city,
        };
      }),
    getSearchPositionList: (state) =>
      state.searchPositionList?.map((item) => {
        return {
          label: item.positionName,
          value: item.positionId?.toString(),
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
          phoneNum: this.formStateMarketData.phoneNum,
          marketId: this.formStateMarketData.marketId,
          brandId: this.formStateMarketData.brandId,
          entryRecruitId: this.formStateMarketData.entryRecruitId,
          assignRecruitId: this.formStateMarketData.assignRecruitId,
          teamId: this.formStateMarketData.teamId,
          positionId: this.formStateMarketData.positionId,
          tellFlag: this.formStateMarketData.tellFlag,
          userName: this.formStateMarketData.userName,
          checkTime: this.formStateMarketData.checkTime,
          SystemRecruitId: loginVueUser.loginId || '',
        })
        .then((res) => {
          if (res.code === 1) {
            this.marketDataList = res.info.list as MappingTempItem[];
            this.pageMarketDataList.total = res.info.totalCount;
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
    async queryBrandList() {
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
     * 根据职位数据类型参数查询
     * @param param 职位的类型参数
     */
    async queryPositionsList() {
      let formData = new FormData();
      formData.append('industry', '');
      formData.append('jobCategory2', '');
      formData.append('management2', '');
      const res = await fetchResumeList.queryPositionsList(formData);
      if (res.info) {
        this.positionsList = res.info.postList;
      }
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
        positionName: data?.positionName || '',
        jobStatus: data?.jobStatus || '',
        sex: data?.sex || '',
        age: data?.age || '',
        floor: data?.floor || '',
        isRepeat: data?.isRepeat || '',
        checkStatus: data?.checkStatus || '',
        resumePath: data?.resumePath || '',
        systemRecruitId: loginVueUser.loginId || '',
      };
      const res = await fetchApi.addMappingTemp(payload);
      if (res.code === 1) {
        this.queryMappingTempPageAjax();
        this.queryMappingTempDuplicateList();
      }
      return res;
    },
    /**
     * 分配
     */
    async updateAssignMappingTemp(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.updateAssignMappingTemp(payload);
      return res;
    },
    /**
     * 核对
     * @param id
     * @param checkStatus
     * @param checkRemark
     * @param falseReason
     */
    async updateCheckMappingTemp(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.updateCheckMappingTemp(payload);
      if (res.code === 1) {
        this.queryMappingTempPageAjax();
      }
      return res;
    },
    /**
     * 新增商场品牌校验
     * @param cId
     * @param cityName
     * @param mId
     * @param bId
     * @param floor
     * @param phoneBrand
     * @param isChe
     * @param SystemRecruitId
     * @returns
     */
    async addMarketBrandCheck(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.addMarketBrandCheck(payload);
      return res;
    },
    /**
     * 新增商场品牌校验
     * @param cId
     * @param cityName
     * @param mId
     * @param bId
     * @param floor
     * @param phoneBrand
     * @param isChe
     * @param SystemRecruitId
     * @returns
     */
    async addMarketBrand(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.addMarketBrand(payload);
      return res;
    },
    /**
     * 查询商场信息临时顾问手机号
     * @param phoneNum
     * @returns
     */
    async checkMappingTempPhone(payload: any) {
      const res = await fetchApi.checkMappingTempPhone(payload);
      return res;
    },
    /**
     * 查询商场信息商场品牌楼层
     * @param marketId
     * @param brandId
     * @returns
     */
    async checkCandidateMarketBrand(payload: any) {
      const res = await fetchApi.checkCandidateMarketBrand(payload);
      return res;
    },
    /**
     * 查询商场信息商场品牌
     * @param marketName
     * @param city
     * @param curPage
     * @returns
     */
    async queryMarketMapping(payload: any) {
      const res = await fetchApi.queryMarketMapping(payload);
      if (res.code === 1) {
        this.MarkList = res.info;
      }
      return res;
    },
    /**
     * 查询所有业务人员(权限)
     * @param SystemRecruitId
     * @param teamId
     * @returns
     */
    async queryConsultantByTeam(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.queryConsultantByTeam(payload);
      if (res.code === 1) {
        this.personList = res.info;
      }
      return res;
    },
    /**
     * 查询所有业务团队(权限)
     * @param SystemRecruitId
     * @returns
     */
    async queryStructureAllByLevel() {
      const payload = {
        SystemRecruitId: loginVueUser.loginId || '',
      };
      const res = await fetchApi.queryStructureAllByLevel(payload);
      if (res.code === 1) {
        this.structureList = res.info;
      }
      return res;
    },
    /**
     * 查询简历SDK
     * @param fname
     * @param file
     * @returns
     */
    async queryResumeSDK(payload: any) {
      const formData = new FormData();
      formData.append('fname', payload?.fname || '');
      if (payload?.file) {
        formData.append('file', payload.file);
      }
      const res = await fetchApi.queryResumeSDK(formData);
      return res;
    },
    /**
     * 查询简历文件下载路径
     * @param file
     * @returns
     */
    async queryResumeFileBackPath(payload: any) {
      const formData = new FormData();
      if (payload?.file) {
        formData.append('file', payload.file);
      }
      const res = await fetchApi.queryResumeFileBackPath(formData);
      return res;
    },
    /**
     * 查询重复人才列表
     * @param params
     * @returns
     */
    async queryMappingTempDuplicateList() {
      const res = await fetchApi.queryMappingTempDuplicateList().then((res) => {
        if (res.code === 1) {
          this.searchAssignList = res.info.assignList || [];
          this.searchBrandList = res.info.brandList || [];
          this.searchEntryList = res.info.entryList || [];
          this.searchMarketList = res.info.marketList || [];
          this.searchCityList = res.info.cityList || [];
          this.searchPositionList = res.info.positionList || [];
        }
      });
      return res;
    },
    /**
     * 查询商场信息
     * @param pageNumber
     * @param city
     * @param cityStr
     * @param market
     * @param marketStr
     * @param marketLevel
     * @param marketPhone
     * @param brandPhone
     * @param floor
     * @param brand
     * @param retail
     * @param category
     * @param brandStr
     * @param brandLevel
     * @param resumeHave
     * @returns
     */
    async queryMappingRightMarketPage(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.queryMappingRightMarketPage(payload);
      if (res.code === 1) {
        const pager = res.info?.pager;
        this.marketRightList = pager?.list || res.info?.list || [];
        this.pageMarketRightList.total = pager?.totalCount || 0;
        this.pageMarketRightList.pageNum = pager?.pageNumber || 1;
        this.pageMarketRightList.pageSize = pager?.pageSize || this.pageMarketRightList.pageSize;
      }
      return res;
    },
    /**
     * 取消商场品牌关联
     * @param mId 市场id
     * @param bId 品牌id
     * @param floor 楼层
     * @param SystemRecruitId
     * @returns
     */
    async cancelMarketBrand(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.cancelMarketBrand(payload);
      return res;
    },
    /**
     * 添加商场城市
     * @param cityName
     * @param marketName
     * @param telPhone
     * @param SystemRecruitId
     * @returns
     */
    async addMarketCity(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.addMarketCity(payload);
      return res;
    },
    /**
     * 添加商场品牌
     * @param cnName
     * @param usName
     * @param shortOne
     * @param retail
     * @param retailLevel
     * @param category
     * @param pinji
     * @param leibie
     * @param standard
     * @param source
     * @param SystemRecruitId
     * @returns
     */
    async addBrandNew(payload: any) {
      payload.SystemRecruitId = loginVueUser.loginId || '';
      const res = await fetchApi.addBrandNew(payload);
      return res;
    },
  },
});

export function useMarketDataStoreWithOut() {
  return useMarketDataStore(store);
}
