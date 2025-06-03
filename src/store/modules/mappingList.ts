import { defineStore } from 'pinia';
import { store } from '/@/store';
import { formatToDate,formatToDateTime } from '/@/utils/dateUtil';
import fetchApi from '/@/api/mappingList';
import {SearchMappingCandidate} from '/@/api/mappingList/model';

interface PaginationItem {
  current: Number;
  pageSize: Number;
  total: Number;
}
interface currentDateItem {
  year: string;
  month: string;
  week: string;
}
interface MappingListState {
  mappingCandidate: {};
  tableLoading: Boolean;
  mappingList: [];
  pagination: {}; //分页
  mappingAppealList: [];
  tableAppealLoading: Boolean;
  mappingAppealFlag: Boolean;
  mappingAppealPagination: {}; //分页
  mappingLvmhList: [];
  tableLvmhLoading: Boolean;
  mappingLvmhFlag: Boolean;
  mappingLvmhPagination: {}; //分页
  mappingLvmhAddFlag: Boolean; //新增
  mappingCheckedList: [];
  tableCheckedLoading: Boolean;
  mappingCheckedFlag: Boolean;
  mappingCheckedPagination: {}; //分页
  weekNumArr: [];
  currentYearMonthWeek: {}; //当前年月周
  teamArr: []; //团队
  counselorArr: []; //顾问
  mappingReleaseTaskDetailsFlag: Boolean; //发布任务详情
  releaseTaskList: []; //发布任务列表
  tableReleaseTaskLoading: Boolean; //发布任务列表状态
  searchMappingCandidate: {}; //查询
}
const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
export const useMappingListStore = defineStore({
  id: 'app-MappingList',
  state: (): MappingListState => ({
    // info
    searchMappingCandidate: {},
    mappingCandidate: [],
    tableLoading: false,
    mappingList: [],
    pagination: {
      current: 1,
      pageSize: 12,
      total: 0,
    } as PaginationItem,
    mappingAppealList: [],
    tableAppealLoading: false,
    mappingAppealFlag: false,
    mappingAppealPagination: {
      current: 1,
      pageSize: 15,
      total: 0,
    } as PaginationItem,
    mappingLvmhList: [],
    tableLvmhLoading: false,
    mappingLvmhFlag: false,
    mappingLvmhPagination: {
      current: 1,
      pageSize: 15,
      total: 0,
    } as PaginationItem,
    mappingLvmhAddFlag: false, //新增
    mappingCheckedList: [],
    tableCheckedLoading: false,
    mappingCheckedFlag: false,
    mappingCheckedPagination: {
      current: 1,
      pageSize: 15,
      total: 0,
    } as PaginationItem,
    weekNumArr: [], //周数
    currentYearMonthWeek: {} as currentDateItem, //当前年月周
    teamArr: [], //团队
    counselorArr: [], //顾问
    mappingReleaseTaskDetailsFlag: false, //发布任务详情
    releaseTaskList: [], //发布任务列表
    tableReleaseTaskLoading: false, //发布任务列表状态
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
      this.searchMappingCandidate = data;
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
            market: item.market? `${item.market}${item.floor? "/"+item.floor : ''}`: '',
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
    /**
     * @description: 推荐申诉状态打开或关闭
     */
     handleMappingAppealFlag() {
      this.mappingAppealFlag = !this.mappingAppealFlag;
     },
     /**
      * @description: 查询推荐申诉
      */
     async queryMappingAppealList(data) {
      this.tableAppealLoading = true;
      data = {
        ...data,
        pageNumber: this.mappingAppealPagination.current,
        pageSize: this.mappingAppealPagination.pageSize,
      }
      let dataForm = new FormData();
      dataForm.append('pageNumber', data.pageNumber);
      dataForm.append('pageSize', data.pageSize);
      dataForm.append('userName', data.userName || "");
      dataForm.append('phone', data.phone || "");
      dataForm.append('recommendRecruitId', data.recommendRecruitId || "");
      dataForm.append('recruitId', data.recruitId || "");
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
      dataForm.append('city', "");
      dataForm.append('brand', "");
      dataForm.append('counselor', "");
      dataForm.append('recommendCounselor', "");
      dataForm.append('sex', "");
      dataForm.append('positions', "");
      dataForm.append('positionsId', "");
      dataForm.append('market', "");
      dataForm.append('recommendTimeStart', "");
      dataForm.append('recommendTimeEnd', "");
      dataForm.append('interviewTimeStart', "");
      dataForm.append('interviewTimeEnd', "");
      dataForm.append('recommendStatus', "");
      dataForm.append('hrFeedback', "");
      dataForm.append('consultantFeedback', "");
      dataForm.append('guaranteePeriodTimeStart', "");
      dataForm.append('guaranteePeriodTimeEnd', "");
      dataForm.append('predictEntryTimeStart', "");
      dataForm.append('predictEntryTimeEnd', "");
      dataForm.append('practicalEntryTimeStart', "");
      dataForm.append('practicalEntryTimeEnd', "");
      dataForm.append('interviewResult', "");
      dataForm.append('offerChoice', "");
      dataForm.append('endStatus', "");
       const res = await fetchApi.queryMappingAppealList(dataForm);
       if (res) {
        // save token
        this.tableAppealLoading = false; 
        this.mappingAppealList = res.info.pager.list.map((item,index) => {
          return {
           ...item,
            key: item.id,
            index: (res.info.pager.pageNumber - 1) * res.info.pager.pageSize + (index + 1), 
            userName: (item.userName || ""),
            sex: (item.sex || ""),
            phone: (item.phone || ""),
            city: (item.city || ""),
            rBrand: (item.rBrand || ""),
            rMarket: (item.rMarket || ""),
            rPositions: (item.rPositions || ""),
            rCounselor: (item.rCounselor || ""),
            recommendCounselor: (item.recommendCounselor || ""),
            newRecommendTime: (item.newRecommendTime || ""),
            appealType: (item.appealType || ""),
            examineStatus: (item.examineStatus || ""),
            appealRemark: (item.appealRemark || ""),
            refuseRemark: (item.refuseRemark || ""),
          } 
        })
         this.mappingAppealPagination = {
          current: res.info.pager.pageNumber,
          pageSize: res.info.pager.pageSize,
          total: res.info.pager.totalCount,
        } as PaginationItem;
       }
     },
      /**
     * @description: LVMH状态打开或关闭
     */
     handleMappingLvmhFlag() {
      this.mappingLvmhFlag = !this.mappingLvmhFlag;
     },
     /**
      * @description: 查询推荐申诉
      */
     async queryMappingLvmhList(data) {
      this.tableAppealLoading = true;
      data = {
        ...data,
        pageNumber: this.mappingLvmhPagination.current,
        pageSize: this.mappingLvmhPagination.pageSize,
      }
      let dataForm = new FormData();
      dataForm.append('pageNumber', data.pageNumber);
      dataForm.append('pageSize', data.pageSize);
      dataForm.append('teamId', "");
      dataForm.append('recruitId', "");
      dataForm.append('brands', "");
      dataForm.append('userName', "");
      dataForm.append('positionId', "");
      dataForm.append('workPlace', "");
      dataForm.append('phone', "");
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
       const res = await fetchApi.queryMappingLvmhList(dataForm);
       if (res) {
        // save token
        this.tableAppealLoading = false; 
        this.mappingLvmhList = res.info.list.map((item,index) => {
          return {
           ...item,
            key: item.id,
            index: (res.info.pageNumber - 1) * res.info.pageSize + (index + 1), 
            brands: (item.brands || ""),
            userName: (item.userName || ""),
            sex: (item.sex || ""),
            edu: (item.edu || ""),
            major: (item.major || ""),
            hangJingYan: (item.hangJingYan || ""),
            brandJingYan: (item.brandJingYan || ""),
            workPlace: (item.workPlace || ""),
            positionName: (item.positionName || ""),
            phone: (item.phone && item.wechat ? `${item.phone}/${item.wechat}`: (item.phone? item.phone : (item.wechat? item.wechat : ''))),
            workCity1: (item.workCity1 ? `${item.workCompany1},${item.workPosition1},${item.workCity1},${item.workStartYear1},${item.workEndYrar1 == 'present' ? "to"+item.workEndYrar1 : item.workEndYrar1}` : ""),
            workCity2: (item.workCity2 ? `${item.workCompany2},${item.workPosition2},${item.workCity2},${item.workStartYear2},${item.workEndYrar2}` : ""),
            workCity3: (item.workCity3 ? `${item.workCompany3},${item.workPosition3},${item.workCity3},${item.workStartYear3},${item.workEndYrar3}` : ""),
            isLv: (item.isLv || ""),
            isCity: (item.isCity || ""),
            createTime: (item.createTime ? formatToDate(item.createTime) : ""),
          } 
        })
         this.mappingLvmhPagination = {
          current: res.info.pageNumber,
          pageSize: res.info.pageSize,
          total: res.info.totalCount,
        } as PaginationItem;
       }
     },
     /**
      * @description: LVMH新增
      */
     handleMappingLvmhAddFlag() {
      this.mappingLvmhAddFlag = !this.mappingLvmhAddFlag;
     },
     /**
      * @description: M审核状态打开或关闭
      */
     handleMappingCheckedFlag() {
      this.mappingCheckedFlag = !this.mappingCheckedFlag;
     },
     /**
      * @description: 查询推荐申诉
      */
     async queryMappingCheckedList(data) {
      this.tableCheckedLoading = true;
      data = {
        ...data,
        pageNumber: this.mappingCheckedPagination.current,
        pageSize: this.mappingCheckedPagination.pageSize,
      }
      let dataForm = new FormData();
      dataForm.append('pageNumber', data.pageNumber);
      dataForm.append('endRow', data.pageSize);
      dataForm.append('teamId', data.teamId || "")
      dataForm.append('recruitId', data.recruitId || "");
      dataForm.append('mappingCheckFlag',data.mappingCheckFlag || "");
      dataForm.append('year', data.year);
      dataForm.append('month', data.month);
      dataForm.append('weekNum', data.weekNum);
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
       const res = await fetchApi.queryMappingCheckedList(dataForm);
       if (res) {
        // save token
        this.tableCheckedLoading = false; 
        this.mappingCheckedList = res.info.list.map((item,index) => {
          return {
           ...item,
            key: item.id,
            index: (res.info.pageNumber - 1) * res.info.pageSize + (index + 1), 
            place: (item.place || ""),
            market: (item.market && item.market != '0' ? item.market : ""),
            floor: (item.floor || ""),
            brand: (item.brand ? item.brand : (item.cnBrand ? item.cnBrand : (item.enBrand ? item.enBrand : ""))),
            allUserName: (item.allUserName ? item.allUserName : (item.userName? item.userName : (item.cnName? item.cnName : ""))),
            phone: (item.phone || ""),
            positions: (item.cnPosition && item.usPosition ? `${item.cnPosition}/${item.usPosition}`: (item.positions ? item.positions : (item.cnPosition || item.usPosition || ''))),
            jubStatus: (item.jubStatus || ""),
            counselor: (item.counselor || ""),
            groupName: (item.groupName || ""),
            createTime: (item.createTime ? formatToDateTime(item.createTime) : ""),
            mappingUptime: (item.mappingUptime ? formatToDateTime(item.mappingUptime) : ""),
            mappingTaskId: (item.mappingTaskId || ""),
            mappingCheckFlag: (item.mappingCheckFlag || ""),
          } 
        })
         this.mappingCheckedPagination = {
          current: res.info.pageNumber,
          pageSize: res.info.pageSize,
          total: res.info.totalCount,
        } as PaginationItem;
       }
     },
     async queryCurrentWeekNum(year,month) {
      let dataForm = new FormData();
      dataForm.append('year', year);
      dataForm.append('month', month);
      const res = await fetchApi.queryCurrentWeekNum(dataForm);
      if (res) {
        function selectWeekNum(weekNum) {
        let week = '';
        switch (weekNum) {
            case '1':
                week = '第一周';
                break;
            case '2':
                week = '第二周';
                break;
            case '3':
                week = '第三周';
                break;
            case '4':
                week = '第四周';
                break;
            case '5':
                week = '第五周';
                break;
            default:
                week = '';
                break;
        }
        return week;
        }
        this.weekNumArr = res.info.map((item) => {
          return {
            label: selectWeekNum(item.weekNum),
            value: item.weekNum,
          }
        });
      }
     },
     async queryCurrentDate(currentDateNew) {
        let dataForm = new FormData();
        dataForm.append('workDate', currentDateNew);
        const res = await fetchApi.queryCurrentDate(dataForm);
        if (res) {
          this.currentYearMonthWeek = res?.info[0];
        }
     },
      async handleTeamId() {
        let dataForm = new FormData();
        dataForm.append('SystemRecruitId', loginVueUser.loginId);
        const res = await fetchApi.queryTeam(dataForm);
        if (res) {
          this.teamArr = res?.info.map(item => ({ label: item.structureName, value: item.structureId }));
        }
     },
      async handleCounselor(teamId='',isQuit='') {
        let dataForm = new FormData();
        dataForm.append('teamId', teamId);
        dataForm.append('isQuit', isQuit);
        dataForm.append('SystemRecruitId', loginVueUser.loginId);
        const res = await fetchApi.queryCounselor(dataForm);
        if (res) {
          this.counselorArr = res?.info.map(item => ({ label: item.realNameEn, value: item.id }));
        }
     },
     async saveCheckViolationStudent(data) {
      let dataForm = new FormData();
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
      dataForm.append('id', data.id); 
      dataForm.append('studentId', data.studentId); 
      dataForm.append('studentName', data.studentName); 
      dataForm.append('mappingCheckFlag', data.mappingCheckFlag); 
      dataForm.append('mapinngCheckRemark', data.mapinngCheckRemark); 
      const res = await fetchApi.saveCheckViolationStudent(dataForm);
      if (res) {
        return res;
      }
     },
      async saveCheckViolation(data) {
      let dataForm = new FormData();
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
      dataForm.append('id', data.id); 
      dataForm.append('mappingCheckFlag', data.mappingCheckFlag); 
      dataForm.append('mapinngCheckRemark', data.mapinngCheckRemark); 
      const res = await fetchApi.saveCheckViolation(dataForm);
      if (res) {
        return res;
      }
     },
     /**
      * @description: 发布任务详情
      */
     handleRecommendReleaseTaskDetailsFlag() {
       this.mappingReleaseTaskDetailsFlag =!this.mappingReleaseTaskDetailsFlag;
     },
     /**
      * @description: 查询任务详情
      */
     async queryRecommendReleaseTaskDetails(data) {
       let dataForm = new FormData();
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
      dataForm.append('pageNumber', data.pageNumber); 
      dataForm.append('year', data.year); 
      dataForm.append('month', data.month); 
      dataForm.append('weekNum', data.weekNum); 
      dataForm.append('recruitId', data.recruitId); 
      this.tableReleaseTaskLoading = true;
       const res = await fetchApi.queryRecommendReleaseTaskDetails(dataForm);
       if (res) {
        // save token
        this.tableReleaseTaskLoading = false;
        this.releaseTaskList = res.info.list.map((item,index) => {
          return {
          ...item,
            key: item.id,
            index: (index + 1),
            realNameEn: (item.realNameEn || ""),
            brand: (item.secret == '是' ? item.secretBrand : item.brand),
            jobTitle: (item.jobTitle || ""),
            city: (item.city || ""),
            workPlace: (item.workPlace || ""),
            counselor: (item.counselor || ""),
            createTimePostion: (item.createTimePostion? formatToDateTime(item.createTimePostion) : ""),
            updateTimePosition: (item.updateTimePosition? formatToDateTime(item.updateTimePosition) : formatToDateTime(item.createTimePostion)),
            recruitingNum: (item.recruitingNum || "0"),
            openResumesNum: (item.openResumesNum || "0"),
            surplus: (item.surplus || "0"),
            jobStatus: (item.jobStatus || ""),
            taskNum: (item.createTime == item.updateTime ? item.taskNum : item.updateTaskNum),
            createTime: (item.createTime == item.updateTime ? formatToDateTime(item.createTime) :  formatToDateTime(item.updateTime)),
            mappingTarget: (item.createTime == item.updateTime ? item.mappingTarget : item.updateMappingTarget),
            punishNum: (item.punishNum || "0"),
            finishNum: (item.finishNum || "0"),
            finishScore: (item.finishScore || "0"),
            noTaskScore: (item.noTaskScore || "0"),
            endMappingNum: (item.endMappingNum || "0"),
            updateMappingRemark: (item.updateMappingRemark || ""),
          }})
        }
     },
      /**
      * @description: 查询任务详情根据id
      */
     async queryRecommendReleaseTaskDetailsById(mappingTaskId) {
       let dataForm = new FormData();
      dataForm.append('SystemRecruitId', loginVueUser.loginId);
      dataForm.append('id',mappingTaskId); 
      this.tableReleaseTaskLoading = true;
       const res = await fetchApi.queryRecommendReleaseTaskDetailsById(dataForm);
       if (res) {
        // save token
        this.tableReleaseTaskLoading = false;
        this.releaseTaskList = res.info.list.map((item,index) => {
          return {
          ...item,
            key: item.id,
            index: (index + 1),
            realNameEn: (item.realNameEn || ""),
            brand: (item.secret == '是' ? item.secretBrand : item.brand),
            jobTitle: (item.jobTitle || ""),
            city: (item.city || ""),
            workPlace: (item.workPlace || ""),
            counselor: (item.counselor || ""),
            createTimePostion: (item.createTimePostion? formatToDateTime(item.createTimePostion) : ""),
            updateTimePosition: (item.updateTimePosition? formatToDateTime(item.updateTimePosition) : formatToDateTime(item.createTimePostion)),
            recruitingNum: (item.recruitingNum || "0"),
            openResumesNum: (item.openResumesNum || "0"),
            surplus: (item.surplus || "0"),
            jobStatus: (item.jobStatus || ""),
            taskNum: (item.createTime == item.updateTime ? item.taskNum : item.updateTaskNum),
            createTime: (item.createTime == item.updateTime ? formatToDateTime(item.createTime) :  formatToDateTime(item.updateTime)),
            mappingTarget: (item.createTime == item.updateTime ? item.mappingTarget : item.updateMappingTarget),
            punishNum: (item.punishNum || "0"),
            finishNum: (item.finishNum || "0"),
            finishScore: (item.finishScore || "0"),
            noTaskScore: (item.noTaskScore || "0"),
            endMappingNum: (item.endMappingNum || "0"),
            updateMappingRemark: (item.updateMappingRemark || ""),
          }})
        }
     },
     /**
      * 取消关联
      * @param id mapping的id
      * @param taskId 任务的id
      * @returns 
      */
     async cancleCandidateApplyCheck(id,taskId) {
       let dataForm = new FormData();
       dataForm.append('id', id);
       dataForm.append('taskId', taskId);
       dataForm.append('SystemRecruitId', loginVueUser.loginId);
       const res = await fetchApi.cancleCandidateApplyCheck(dataForm);
       if (res) {
        return res; 
       }
     },
     async saveCandidateApplyCheck(data) {
       let dataForm = new FormData();
       dataForm.append('id', data.id);
       dataForm.append('taskId', data.taskId);
       dataForm.append('SystemRecruitId', loginVueUser.loginId);
       const res = await fetchApi.saveCandidateApplyCheck(dataForm);
       if (res) {
        return res; 
       }
     },
  },
});

export function useMappingListStoreWithOut() {
  return useMappingListStore(store);
}