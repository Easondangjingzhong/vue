import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/mappingList';
import {SearchMappingCandidate} from '/@/api/mappingList/model';

interface PaginationItem {
  current: Number;
  pageSize: Number;
  total: Number;
}
interface MappingListState {
  mappingCandidate: {};
  tableLoading: Boolean;
  mappingList: [];
   pagination: {}; //分页
}
const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
export const useMappingListStore = defineStore({
  id: 'app-MappingList',
  state: (): MappingListState => ({
    // info
    mappingCandidate: [],
    tableLoading: false,
    mappingList: [],
    pagination: {
      current: 1,
      pageSize: 12,
      total: 0,
    } as PaginationItem,
  }),
  actions: {
    setInfo(info: []) {
      this.mappingCandidate = info;
    },
    /**
     * @description: 查询人员信息
     */
    async queryMappingCandidate(data) {
      this.tableLoading = true;
      data = {
        ...data,
        pageNumber: this.pagination.current,
        pageSize: this.pagination.pageSize,
      }
      //console.log(this.paramSearchMappingCandidateToformData(data));
      const res = await fetchApi.queryMappingCandidate(this.paramSearchMappingCandidateToformData(data));
      if (res) {
        // save token
        this.setInfo(res.info);
        this.tableLoading = false;
        this.mappingList = res.info.pager.list.map((item,index) => {
          return {
            ...item,
            key: item.id,
            index: (res.info.pager.pageNumber - 1) * res.info.pager.pageSize + (index + 1),
            userName: (item.cnName && item.enName) ?  `${item.cnName}/${item.enName}`: (item.allUserName ? item.allUserName : (item.userName ? item.userName : '')),
            sex: item.sex? item.sex : '',
            age: item.age? item.age : '',
            place: item.place? item.place : '',
            market: item.market? `${item.market}${item.place? "/"+item.place : ''}`: '',
            allBrand: item.allBrand? item.allBrand : (item.cnBrand && item.enBrand ? `${item.cnBrand}/${item.enBrand}`: (item.cnBrand? item.cnBrand : (item.enBrand? item.enBrand : ''))),
            position: (item.cnPosition && item.usPosition) ? `${item.cnPosition}/${item.usPosition}` : (item.cnPosition? item.cnPosition : (item.usPosition? item.usPosition : '')),
            jubStatus: item.jubStatus? item.jubStatus : '',
            counselor: item.counselor? item.counselor : '',
            yearMouthDays: item.yearMouthDays? item.yearMouthDays : '',
            communicate: item.communicate? this.communicateObjParse(item.communicate) : '',
            recommendNum: item.recommendNum? item.recommendNum : '0',
          };
        });
        this.pagination = {
          current: res.info.pager.pageNumber,
          pageSize: res.info.pager.pageSize,
          total: res.info.pager.totalCount,
        } as PaginationItem;
      }
    },
    /**
     * 将沟通状态代码解析为对应的文字描述
     * @param data - 沟通状态代码，预期为数字类型，用于匹配对应的文字描述
     * @returns 匹配到的沟通状态文字描述，如果未匹配到则返回空字符串
     */
    communicateObjParse(data) {
      // 定义沟通状态代码与文字描述的映射对象
      let obj = {
        1: '未接听',
        2: '拒绝沟通',
        3: '黑名单', 
        4: '空号', 
        8: '日常维系', 
        9: '拒绝机会',
        10: '看机会',
        11: '需要跟进',
        12: '拒绝机会',
        13: '看机会',
        14: '需要跟进',
        19: '核对简历',
      }
      // 根据传入的代码查找对应的文字描述，若存在则返回，不存在则返回空字符串
      return obj[data] ? obj[data] : '';
    },
    /**
    * 根据参数返回 formData
    * @param param 搜索参数
    * @returns formData
    */
    paramSearchMappingCandidateToformData(param: SearchMappingCandidate) {
      let formData = new FormData();
      formData.append('pageNumber', param.pageNumber || '1');
      formData.append('pageSize', param.pageSize || '16');
      formData.append('degree', param.degree || '');
      formData.append('userName', param.userName || '');
      formData.append('phone', param.phone || '');
      formData.append('floor', param.floor || '');
      formData.append('brand', param.brand || '');
      formData.append('city', param.city || '');
      formData.append('startAge', param.startAge || '');
      formData.append('endAge', param.endAge || '');
      formData.append('positions', param.positions || '');
      formData.append('positionsId', param.positionsId || '');
      formData.append('positionsIds', param.positionsIds || '');
      formData.append('jubStatus', param.jubStatus || '');
      formData.append('market', param.market || '');
      formData.append('communicate', param.communicate || '');
      formData.append('RecommendState', param.RecommendState || '');
      formData.append('intentionCity', param.intentionCity || '');
      formData.append('labels', param.labels || '');
      formData.append('top', param.top || '');
      formData.append('special', param.special || '');
      formData.append('enLevel', param.enLevel || '');
      formData.append('counselor', param.counselor || '');
      formData.append('sex', param.sex || '');
      formData.append('nextContactTimeEnd', param.nextContactTimeEnd || '');
      formData.append('nextContactTimeStart', param.nextContactTimeStart || '');
      formData.append('offerTimeStart', param.offerTimeStart || '');
      formData.append('offerTimeEnd', param.offerTimeEnd || '');
      formData.append('entryTimeEnd', param.entryTimeEnd || '');
      formData.append('entryTimeStart', param.entryTimeStart || '');
      formData.append('contactTimeEnd', param.contactTimeEnd || '');
      formData.append('contactTimeStart', param.contactTimeStart || '');
      formData.append('birthdayStart', param.birthdayStart || '');
      formData.append('birthdayEnd', param.birthdayEnd || '');
      formData.append('overProtectionEnd', param.overProtectionEnd || '');
      formData.append('overProtectionStart', param.overProtectionStart || '');
      formData.append('attention', param.attention || '');
      formData.append('createDateStart', param.createDateStart || '');
      formData.append('createDateEnd', param.createDateEnd || '');
      formData.append('realContactTimeStart', param.realContactTimeStart || '');
      formData.append('realContactTimeEnd', param.realContactTimeEnd || '');
      formData.append('sureTimeStart', param.sureTimeStart || '');
      formData.append('sureTimeEnd', param.sureTimeEnd || '');
      formData.append('isOnlySure', param.isOnlySure || '');
      formData.append('searchBrandSign', param.searchBrandSign || '');
      formData.append('postionSign', param.postionSign || '');
      formData.append('recruitId', param.recruitId || '');
      formData.append('isQuit', param.isQuit || '');
      formData.append('orderByType', param.orderByType || '');
      formData.append('signStatus', param.signStatus || '');
      formData.append('haveResume', param.haveResume || '');
      formData.append('teamId', param.teamId || '');
      formData.append('SystemRecruitId', loginVueUser.loginId);
      return formData;
    },  
  },
});

export function useMappingListStoreWithOut() {
  return useMappingListStore(store);
}