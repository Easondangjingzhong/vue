import { defineStore } from 'pinia';
import { store } from '/@/store';
import { formatToDate, currentDate, formatToMonth } from '/@/utils/dateUtil';
import fetchApi from '/@/api/outsourceDetail';
import {
  PersonContractItem,
  OutsourcePersonItem,
  OutsourceSalaryItem,
  OutsourceSheBaoItem,
  OutsourceAttendItem,
  OutsourceMonthSalaryItem,
  PageItem,
  SearchPersonItem,
  SearchSheBaoItem,
  SearchSalaryItem,
  SearchAttendItem,
  SearchMonthSalaryItem,
  OutsourceSheBaoCollectItem,
  OutsourceSheBaoContractRatesItem,
  OutsourceShebaoInfoItem,
} from '/@/api/outsourceDetail/model';
//import { get } from 'http';
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser') || '{}',
);

export const useOutsourceDetailStore = defineStore('app-OutsourceDetailStore', {
  state: () => ({
    outsourcePersonDetailFlag: false, //外包人员详情
    outsourcePersonDetail: {} as OutsourcePersonItem, //外包人员详情
    addOutsourcePersonFlag: false, //新增外包人员
    outsourceBasicFlag: false, //外包人员基本信息修改
    outsourceBasicForm: {} as OutsourcePersonItem, //外包人员基本信息修改
    addOutsourcePersonForm: {} as OutsourcePersonItem, //新增外包人员信息
    personIsLoading: false, //外包人员loading
    sheBaoIsLoading: false, //外包社保loading
    salaryIsLoading: false, //外包薪资loading
    monthSalaryIsLoading: false, //外包月度薪资loading
    attendIsLoading: false, //外包考勤loading
    outsourceDetailSider: '1',
    outsourcePersonList: [] as OutsourcePersonItem[], //外包人员列表
    formStatePerson: {} as SearchPersonItem,
    pageOutsourcePersonList: {
      pageNumber: 1,
      pageSize: 13,
      total: 0,
    } as PageItem,
    outsourceSalaryList: [] as OutsourceSalaryItem[], //外包薪资列表
    formStateSalary: {} as SearchSalaryItem,
    pageOutsourceSalaryList: {
      pageNumber: 1,
      pageSize: 13,
      total: 0,
    } as PageItem,
    outsourceSheBaoList: [] as OutsourceSheBaoItem[], //外包社保列表
    formStateSheBao: {} as SearchSheBaoItem,
    pageOutsourceSheBaoList: {
      pageNumber: 1,
      pageSize: 13,
      total: 0,
    } as PageItem,
    outsourceMonthSalaryList: [] as OutsourceMonthSalaryItem[], //外包月度薪资列表
    formStateMonthSalary: {} as SearchMonthSalaryItem,
    pageOutsourceMonthSalaryList: {
      pageNumber: 1,
      pageSize: 13,
      total: 0,
    } as PageItem,
    outsourceAttendList: [] as OutsourceAttendItem[], //外包考勤列表
    formStateAttend: {} as SearchAttendItem,
    pageOutsourceAttendList: {
      pageNumber: 1,
      pageSize: 13,
      total: 0,
    } as PageItem,
    province: [] as any[],//搜索条件城市
    outsourceBrand: [] as any[],//搜索条件品牌
    outsourcePosition: [] as any[],//搜索条件岗位
    outsourceCompanyAll: [] as any[],//外包公司列表
    outsourceCompanyBrand: [] as any[],//外包公司下品牌列表
    outsourceBankName: [] as any[],//外包银行名称
    outsourcePersonByPhoneList: [] as OutsourcePersonItem[], //根据手机号查外包人员详细信息
    outsourceContractFlag: false, //外包合同详情 合同信息
    outsourceContractForm: {} as PersonContractItem, //外包合同详情 合同信息
    outsourceContractList: [] as PersonContractItem[], //外包合同详情 合同信息列表
    outsourceSalaryFlag: false, //外包薪资详情 薪资信息
    outsourceSalaryForm: {} as OutsourceSalaryItem, //外包社保详情 社保信息
    outsourceSalaryDetailList: [] as OutsourceSalaryItem[], //外包薪资详情 薪资信息
    outsourceSocialSecurityFlag: false, //外包社保详情 社保信息
    outsourceSocialSecurityForm: {} as OutsourceSheBaoItem, //外包社保详情 社保信息
    outsourceSocialSecurityDetailList: [] as OutsourceSheBaoItem[], //外包社保详情 社保信息
    outsourceSocialSecurityContractRatesList: [] as OutsourceSheBaoContractRatesItem[], //外包社保合同费率列表
    newJoinerPersonalInformationFlag: false, //新员工个人信息登记表
    outsourceShebaoCollect: [] as OutsourceSheBaoCollectItem[], //外包社保月度总计
    outsourceSocialSecurityCollectFlag: false, //外包社保月度总计详情控制
    outsourceAttendFlag: false, //外包考勤详情控制
    outsourceAttendForm: {} as OutsourceAttendItem, //外包考勤详情 考勤信息
    outsourceSocialSecuritInfoFlag: false, //外包社保基数详情控制
    outsourceSocialSecuritInfoList: [] as OutsourceShebaoInfoItem[], //外包社保基数详情 社保信息
    outsourceSocialSecuritInfoDetailsFlag: false, //外包社保基数详情控制
    outsourceSocialSecuritInfoDetailsList: [] as OutsourceShebaoInfoItem[], //外包社保基数详情 社保信息
    outsourceSocialSecurityInfoFormFlag: false, //外包社保基数详情 社保信息表单控制
    outsourceSocialSecurityInfoFormType: '' as string, //外包社保基数详情 社保信息表单类型
    outsourceSocialSecurityInfoForm: {} as OutsourceShebaoInfoItem, //外包社保基数详情 社保信息表单
  }),
  getters: {
    getOutsourcePersonList: (state) =>
      state.outsourcePersonList.map((item, index) => ({
        ...item,
        index:
          state.pageOutsourcePersonList.pageSize * (state.pageOutsourcePersonList.pageNumber - 1) +
          (index + 1),
        enterprise: `${item.recommendCounselor}/${item.counselor}`,
        planEntryTime: item.planEntryTime ? formatToDate(item.planEntryTime) : '',
        age: item.birthYear ? (new Date().getFullYear() - Number(item.birthYear)).toString() : '',
        offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        planLeaveTime: item.planLeaveTime ? formatToDate(item.planLeaveTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
        startTime: item.startTime ? formatToDate(item.startTime) : '',
        endTime: item.contractPeriod == "长期" ? "长期" : (item.endTime ? formatToDate(item.endTime) : ''),
        yujiaoTime: item.yujiaoTime ? formatToDate(item.yujiaoTime) : '',
        yutingTime: item.yutingTime ? formatToDate(item.yutingTime) : '',
        paymentYearMonth: item.paymentYearMonth ? formatToMonth(item.paymentYearMonth) : '',
        preStopYearMonth: item.preStopYearMonth ? formatToMonth(item.preStopYearMonth) : '',
      })),
    getOutsourceSalaryList: (state) => state.outsourceSalaryList.map((item, index) => ({
      ...item,
      index: 
          state.pageOutsourceSalaryList.pageSize * (state.pageOutsourceSalaryList.pageNumber - 1) +
          (index + 1),
      startTime: item.startTime ? formatToDate(item.startTime) : '',
      endTime: item.endTime ? formatToDate(item.endTime) : '',
      changeTime: item.changeTime ? formatToDate(item.changeTime) : '',
    })),
    getOutsourceSheBaoList: (state) => state.outsourceSheBaoList.map((item, index) => ({
      ...item,
      index: 
          state.pageOutsourceSheBaoList.pageSize * (state.pageOutsourceSheBaoList.pageNumber - 1) +
          (index + 1),
      shebaoShijiaoTime: item.shebaoShijiaoTime ? formatToMonth(item.shebaoShijiaoTime) : '',
      serviceMoney: item.serviceMoney != '公式' ? parseFloat(item.serviceMoney || '0').toFixed(2) : item.serviceMoney,
      shangbaoTotal: parseFloat((parseFloat(item.personTotal?.toString() || '0') + parseFloat(item.companyTotal?.toString() || '0') + parseFloat(item.serviceMoney != '公式' ? (item.serviceMoney?.toString() || '0') : '0')).toString()).toFixed(2),
    })),
    getOutsourceAttendList: (state) => state.outsourceAttendList.map((item, index) => ({
      ...item,
      index: 
          state.pageOutsourceAttendList.pageSize * (state.pageOutsourceAttendList.pageNumber - 1) +
          (index + 1),
      userNameCn: `${item.userNameCn}${item.userNameEn ? "/"+item.userNameEn : ''}`,
      lastMonthYuHoursTotal: parseFloat(item.lastMonthYuHours || '0').toFixed(2),
      lastMonthShiHoursTotal: parseFloat(item.lastMonthShiHours || '0').toFixed(2),
      currentMonthYuHoursTotal: parseFloat(item.currentMonthYuHours || '0').toFixed(2),
      currentMonthShiHoursTotal: parseFloat(item.currentMonthShiHours || '0').toFixed(2),
      totalChaHoursTotal: parseFloat(item.totalChaHours || '0').toFixed(2),
      overDouble: item.overDouble || '1.5',
      overHoursTotal: (parseFloat(item.overHours || '0') * parseFloat(item.overDouble || '1.5')).toFixed(2),
      holidayOverDouble: item.holidayOverDouble || '3',
      holidayOverHoursTotal: (parseFloat(item.holidayOverHours || '0') * parseFloat(item.holidayOverDouble || '3')).toFixed(2),
      restOverDouble: item.restOverDouble || '2',
      restOverHoursTotal: (parseFloat(item.restOverHours || '0') * parseFloat(item.restOverDouble || '2')).toFixed(2),
      daixinBingjiaDouble: item.daixinBingjiaDouble || '1',
      daixinBingjiaHoursTotal: (parseFloat(item.daixinBingjiaHours || '0') * parseFloat(item.daixinBingjiaDouble || '1')).toFixed(2),
      kouxinBingjiaDouble: item.kouxinBingjiaDouble || '0.4',
      kouxinBingjiaHoursTotal: (parseFloat(item.kouxinBingjiaHours || '0') * parseFloat(item.kouxinBingjiaDouble || '0.4')).toFixed(2),
      shijiaDouble: item.shijiaDouble || '1',
      shijiaHoursTotal: (parseFloat(item.shijiaHours || '0') * parseFloat(item.shijiaDouble || '1')).toFixed(2),
      nianjianDouble: item.nianjianDouble || '1',
      nianjianHoursTotal: (parseFloat(item.nianjianHours || '0') * parseFloat(item.nianjianDouble || '1')).toFixed(2),
      hunjiaDouble: item.hunjiaDouble || '1',
      hunjiaHoursTotal: (parseFloat(item.hunjiaHours || '0') * parseFloat(item.hunjiaDouble || '1')).toFixed(2),
      sanjiaDouble: item.sanjiaDouble || '1',
      sanjiaHoursTotal: (parseFloat(item.sanjiaHours || '0') * parseFloat(item.sanjiaDouble || '1')).toFixed(2),
      otherDaixinDouble: item.otherDaixinDouble || '1',
      otherDaixinHoursTotal: (parseFloat(item.otherDaixinHours || '0') * parseFloat(item.otherDaixinDouble || '1')).toFixed(2),
      utDouble: item.utDouble || '1',
      utHoursTotal: (parseFloat(item.utHours || '0') * parseFloat(item.utDouble || '1')).toFixed(2),
    })),
    getOutsourceMonthSalaryList: (state) => state.outsourceMonthSalaryList,
    getOutsourcePersonByPhoneList: (state) => state.outsourcePersonByPhoneList.map((item, index) => ({
      ...item,
      index: index + 1,
      enterprise: `${item.recommendCounselor}/${item.counselor}`,
      planEntryTime: item.planEntryTime ? formatToDate(item.planEntryTime) : '',
      offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
      realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
      planLeaveTime: item.planLeaveTime ? formatToDate(item.planLeaveTime) : '',
      realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
    })),
    getOutsourceContractList: (state) => state.outsourceContractList.map((item, index) => ({
      ...item,
      index: index + 1,
      offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
      signDate: item.signDate ? formatToDate(item.signDate) : '',
      startDate: item.startDate ? formatToDate(item.startDate) : '',
      endDate: item.contractCycle == "长期" ? "长期" : (item.endDate ? formatToDate(item.endDate) : ''),
      loseDate: item.loseDate ? formatToDate(item.loseDate) : '',
    })),
    getOutsourceSalaryDetailList: (state) => state.outsourceSalaryDetailList.map((item, index) => ({
      ...item,
      index: index + 1,
      changeTime: item.changeTime ? formatToDate(item.changeTime) : '',
    })),
    getOutsourceSocialSecurityDetailList: (state) => state.outsourceSocialSecurityDetailList.map((item, index) => ({
      ...item,
      index: index + 1,
      serviceMoney: item.serviceMoney == '公式' ? item.serviceMoney : parseFloat(item.serviceMoney || '0').toFixed(2),
      shebaoYujiaoTime: item.shebaoYujiaoTime ? formatToDate(item.shebaoYujiaoTime) : '',
      yijinYujiaoTime: item.yijinYujiaoTime ? formatToDate(item.yijinYujiaoTime) : '',
      shangbaoYujiaoTime: item.shangbaoYujiaoTime ? formatToDate(item.shangbaoYujiaoTime) : '',
      shebaoShijiaoTime: item.shebaoShijiaoTime ? formatToDate(item.shebaoShijiaoTime) : '',
      yijinShijiaoTime: item.yijinShijiaoTime ? formatToDate(item.yijinShijiaoTime) : '',
      shangbaoShijiaoTime: item.shangbaoShijiaoTime ? formatToDate(item.shangbaoShijiaoTime) : '',
      shebaoYutingTime: item.shebaoYutingTime ? formatToDate(item.shebaoYutingTime) : '',
      yijinYutingTime: item.yijinYutingTime ? formatToDate(item.yijinYutingTime) : '',
      shangbaoYutingTime: item.shangbaoYutingTime ? formatToDate(item.shangbaoYutingTime) : '',
      shebaoShitingTime: item.shebaoShitingTime ? formatToDate(item.shebaoShitingTime) : '',
      yijinShitingTime: item.yijinShitingTime ? formatToDate(item.yijinShitingTime) : '',
      shangbaoShitingTime: item.shangbaoShitingTime ? formatToDate(item.shangbaoShitingTime) : '',
    })),
    getProvince: (state) =>
      state.province?.map((item) => {
        return {
          label: item.city,
          value: item.city,
        };
      }),
    getOutsourceBrand: (state) =>
      state.outsourceBrand?.map((item) => {
        return {
          label: item.brand,
          value: item.bId,
        };
      }),
    getOutsourcePosition: (state) =>
      state.outsourcePosition?.map((item) => {
        return {
          label: item.positionName,
          value: item.positionId,
        };
      }),
      getOutsourceCompanyAll: (state) =>
        state.outsourceCompanyAll?.map((item) => {
          return {
            label: item.cn,
            value: item.cn,
          };
        }),
    getOutsourceCompanyBrand: (state) =>
        state.outsourceCompanyBrand?.map((item) => {
          return {
            label: item.allBrand,
            value: item.bId,
          };
        }),
    getOutsourceBankName: (state) =>
        state.outsourceBankName?.map((item) => {
          return {
            label: item.bankName,
            value: item.bankName,
          };
        }),
    getOutsourceShebaoCollect: (state) => state.outsourceShebaoCollect.map((item, index) => ({
      ...item,
      index: index + 1,
      shebaoTotal: parseFloat(((item.companyTotal || 0) + (item.personTotal || 0) + parseFloat(item.serviceMoney?.toString() || '0')).toString()).toFixed(2),
      detaillist: item.detaillist.map((detailItem) => ({
        ...detailItem,
        shebaoTotal: parseFloat(((detailItem.companyTotal || 0) + (detailItem.personTotal || 0) + parseFloat(detailItem.serviceMoney?.toString() == '公式' ? '0' : detailItem.serviceMoney?.toString() || '0')).toString()).toFixed(2),
      })),
    })),
    getOutsourceSocialSecuritInfoList: (state) => state.outsourceSocialSecuritInfoList.map((item, index) => ({
      ...item,
      index: index + 1,
      addDeleteMonth: `${item.addMonth}/${item.deleteMonth}`,
      startTime: item.startTime ? formatToMonth(item.startTime) : '',
      endTime: item.endTime ? formatToMonth(item.endTime) : '',
      issueTime: item.issueTime ? formatToMonth(item.issueTime) : '',
      updateTime: item.updateTime ? formatToDate(item.updateTime) : '',
    })),
    getOutsourceSocialSecuritInfoDetailsList: (state) => state.outsourceSocialSecuritInfoDetailsList.map((item, index) => ({
      ...item,
      index: index + 1,
      addDeleteMonth: `${item.addMonth}/${item.deleteMonth}`,
      startTime: item.startTime ? formatToMonth(item.startTime) : '',
      endTime: item.endTime ? formatToMonth(item.endTime) : '',
      issueTime: item.issueTime ? formatToMonth(item.issueTime) : '',
      updateTime: item.updateTime ? formatToDate(item.updateTime) : '',
    })),
  },
  actions: {
    /**
     * 查外包人员
     */
    async queryOutsourcePerson() {
      if (this.personIsLoading) {
        return;
      }
      if (!this.formStatePerson.currentStatus) {
        this.formStatePerson.currentStatus = '2'
      }
      if (this.formStatePerson.currentStatus == '1') {
        this.formStatePerson.currentStatus = ''
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourcePersonList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourcePersonList.pageSize.toString());
      params.append('city', this.formStatePerson.city || '');
      params.append('bId', this.formStatePerson.bId || '');
      params.append('currentStatus', this.formStatePerson.currentStatus);
      params.append('positionId', this.formStatePerson.positionId || '');
      params.append('userName', this.formStatePerson.userName || '');
      params.append('companyName', this.formStatePerson.companyName || '');
      params.append('companyArrange', this.formStatePerson.companyArrange || '');
      params.append('jobType', this.formStatePerson.jobType || '');
      this.personIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourcePerson(params);
        if (res.code == 1) {
          this.personIsLoading = false;
          this.outsourcePersonList = res.info.list as OutsourcePersonItem[];
          this.pageOutsourcePersonList = {
            pageNumber: res.info.pageNumber,
            pageSize: res.info.pageSize,
            total: res.info.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.personIsLoading = false;
        return null;
      }
    },
    /**
     * 查外包薪资
     */
    async queryOutsourceSalary() {
      if (this.salaryIsLoading) {
        return;
      }
        if (!this.formStateSalary.currentStatus) {
        this.formStateSalary.currentStatus = '2'
      }
      if (this.formStateSalary.currentStatus == '1') {
        this.formStateSalary.currentStatus = ''
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourceSalaryList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourceSalaryList.pageSize.toString());
      params.append('city', this.formStateSalary.city || '');
      params.append('bId', this.formStateSalary.bId || '');
      params.append('positionId', this.formStateSalary.positionId || '');
      params.append('currentStatus', this.formStateSalary.currentStatus);
      params.append('userName', this.formStateSalary.userName || '');
      params.append('companyName', this.formStateSalary.companyName || '');
      params.append('companyArrange', this.formStateSalary.companyArrange || '');
      params.append('jobType', this.formStateSalary.jobType || '');
      this.salaryIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourceSalary(params);
        if (res.code == 1) {
          this.salaryIsLoading = false;
          this.outsourceSalaryList = res.info.list as OutsourceSalaryItem[];
          this.pageOutsourceSalaryList = {
            pageNumber: res.info.pageNumber,
            pageSize: res.info.pageSize,
            total: res.info.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.salaryIsLoading = false;
        return null;
      }
    },
    /**
     * 查外包社保
     */
    async queryOutsourceSheBao() {
      if (this.sheBaoIsLoading) {
        return;
      }
      if (!this.formStateSheBao.currentStatus) {
        this.formStateSheBao.currentStatus = '1'
      }
       if (!this.formStateSheBao.yearAndMonth) {
        this.formStateSheBao.yearAndMonth = currentDate('YYYY-MM');
      }
      if (this.formStateSheBao.currentStatus == '1') {
        this.formStateSheBao.currentStatus = ''
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourceSheBaoList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourceSheBaoList.pageSize.toString());
      params.append('city', this.formStateSheBao.city || '');
      params.append('bId', this.formStateSheBao.bId || '');
      params.append('positionId', this.formStateSheBao.positionId || '');
      params.append('currentStatus', this.formStateSheBao.currentStatus);
      params.append('userName', this.formStateSheBao.userName || '');
      params.append('companyName', this.formStateSheBao.companyName || '');
      params.append('companyArrange', this.formStateSheBao.companyArrange || '');
      params.append('jobType', this.formStateSheBao.jobType || '');
      params.append('shebaoCompany', this.formStateSheBao.shebaoCompany || '');
      params.append('yearAndMonth', this.formStateSheBao.yearAndMonth || currentDate('YYYY-MM'));
      this.sheBaoIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourceSheBao(params);
        if (res.code == 1) {
          this.sheBaoIsLoading = false;
          this.outsourceSheBaoList = res.info.list as OutsourceSheBaoItem[];
          this.pageOutsourceSheBaoList = {
            pageNumber: res.info.pageNumber,
            pageSize: res.info.pageSize,
            total: res.info.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.sheBaoIsLoading = false;
        return null;
      }
    },
      /**
     * 查外包考勤
     */
    async queryOutsourceAttend() {
      if (this.attendIsLoading) {
        return;
      }
      if (!this.formStateAttend.currentStatus) {
        this.formStateAttend.currentStatus = '2'
      }
      if (this.formStateAttend.currentStatus == '1') {
        this.formStateAttend.currentStatus = ''
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourceAttendList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourceAttendList.pageSize.toString());
      params.append('city', this.formStateAttend.city || '');
      params.append('bId', this.formStateAttend.bId || '');
      params.append('positionId', this.formStateAttend.positionId || '');
      params.append('currentStatus', this.formStateAttend.currentStatus);
      params.append('userName', this.formStateAttend.userName || '');
      params.append('companyName', this.formStateAttend.companyName || '');
      params.append('companyArrange', this.formStateAttend.companyArrange || '');
      params.append('jobType', this.formStateAttend.jobType || '');
      this.attendIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourceAttend(params);
        if (res.code == 1) {
          this.attendIsLoading = false;
          this.outsourceAttendList = res.info.list as OutsourceAttendItem[];
          this.pageOutsourceAttendList = {
            pageNumber: res.info.pageNumber,
            pageSize: res.info.pageSize,
            total: res.info.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.sheBaoIsLoading = false;
        return null;
      }
    },
    /**
     * 查外包薪资
     */
    async queryOutsourceMonthSalary() {
      if (this.monthSalaryIsLoading) {
        return;
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourceMonthSalaryList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourceMonthSalaryList.pageSize.toString());
      params.append('city', this.formStateMonthSalary.city || '');
      params.append('bId', this.formStateMonthSalary.bId || '');
      params.append('positionId', this.formStateMonthSalary.positionId || '');
      this.monthSalaryIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourceMonthSalary(params);
        if (res.code == 1) {
          this.monthSalaryIsLoading = false;
          this.outsourceMonthSalaryList = res.info.list as OutsourceMonthSalaryItem[];
          this.pageOutsourceMonthSalaryList = {
            pageNumber: res.info.pageNumber,
            pageSize: res.info.pageSize,
            total: res.info.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.monthSalaryIsLoading = false;
        return null;
      }
    },
    /**
     * 查询同一手机号的外包记录
     * @param phoneNumber 手机号
     * @returns
     */
    async queryOutsourcePersonByPhone(phoneNumber: string) {
      try {
        const formData = new FormData();
        formData.append('phoneNumber', phoneNumber || '');
        const res = await fetchApi.queryOutsourcePersonByPhone(formData);
        if (res.code == 1) {
          this.outsourcePersonByPhoneList = res.info as OutsourcePersonItem[];
        }
        return res;
      } catch (error) {
        return null;
      }
    },
    /**
     * 查询同一手机号的外包记录
     * @param params 手机号
     * @returns
     */
    async updateOutsourcePersonIdcard(params: { personId: string; idCard: File }) {
      try {
        const res = await fetchApi.updateOutsourcePersonIdcard(params);
        return res;
      } catch (error) {
        return null;
      }
    },
    handleAddPersonContract() {
      this.outsourceContractForm = {...this.outsourceContractForm,
         offerTime: this.outsourcePersonDetail.offerTime,
        } as PersonContractItem;
      this.outsourceContractFlag = true;
    },
    /**
     * 新增外包人员合同
     */
    async addOutsourcePersonContract() {
      try {
        const formData = new FormData();
        formData.append("id", this.outsourceContractForm.id?.toString() || '');
        formData.append("personId", this.outsourceContractForm.personId?.toString() || this.outsourcePersonDetail.id?.toString() || '');
        formData.append("signType", this.outsourceContractForm.signType || '');
        formData.append("contractType", this.outsourceContractForm.contractType || '');
        formData.append("signCompany", this.outsourceContractForm.signCompany || '');
        formData.append("signDate", this.outsourceContractForm.signDate || '');
        formData.append("startDate", this.outsourceContractForm.startDate || '');
        formData.append("endDate",  this.outsourceContractForm.contractCycle == "长期" ? "" : (this.outsourceContractForm.endDate || ''));
        formData.append("contractCycle",this.outsourceContractForm.contractCycle || '');
        formData.append("offerTime", this.outsourceContractForm.offerTime || '');
        formData.append("offerSign", this.outsourceContractForm.offerSign || '');
        formData.append("contractFlag", this.outsourceContractForm.contractFlag || '');
        formData.append("contractStatus", this.outsourceContractForm.contractStatus || '');
        formData.append("loseReason", this.outsourceContractForm.loseReason || '');
        formData.append("loseDate", this.outsourceContractForm.loseDate || '');
        const res = await fetchApi.addOutsourcePersonContract(formData);
        if (res.code == 1) {
          this.queryOutsourcePersonContract();
          this.queryOutsourcePerson();
        }
        return res;
      } catch (error) {
        return null;
      }
    },
    /**
     * 查询外包人员合同
     */
    async queryOutsourcePersonContract() {
      try {
        const formData = new FormData();
        formData.append("personId", this.outsourcePersonDetail.id?.toString() || '');
        const res = await fetchApi.queryOutsourcePersonContract(formData);
        if (res.code == 1) {
          this.outsourceContractList = res.info as PersonContractItem[];
        }
        return res;
      } catch (error) {
        return null;
      }
    },
    /**
     * 外包人员详情
     */
    async handleOutsourcePersonDetail(record: OutsourcePersonItem) {
      this.outsourcePersonDetail = record;
      this.outsourcePersonDetailFlag = true;
    },
    /**
     * 修改个人信息
     */
    async handleComprehensiveBasicUpdate() {
      this.outsourceBasicFlag = true;
      this.outsourceBasicForm = {
        ...this.outsourcePersonDetail,
      };
    },
    /**
     * 新增修改外包人员基本信息
     */
    async addOutsourceBasic() {
      const formData = new FormData();
      formData.append("id", this.outsourceBasicForm.id?.toString() || '');
      formData.append("jobType", this.outsourceBasicForm.jobType || '');
      formData.append("jobNumber", this.outsourceBasicForm.jobNumber || '');
      formData.append("planEntryTime", this.outsourceBasicForm.planEntryTime || '');
      formData.append("realEntryTime", this.outsourceBasicForm.realEntryTime || '');
      formData.append("planLeaveTime", this.outsourceBasicForm.planLeaveTime || '');
      formData.append("realLeaveTime", this.outsourceBasicForm.realLeaveTime || '');
      formData.append("offerTime", this.outsourceBasicForm.offerTime || '');
      formData.append("currentStatus", this.outsourceBasicForm.currentStatus || '');
      const res = await fetchApi.addUpdateOutsourceBasic(formData);
      if (res.code == 1) {
        this.outsourcePersonDetail = {
        ...this.outsourceBasicForm,
        };
        this.queryOutsourcePerson();
        this.queryOutsourcePersonByPhone(this.outsourceBasicForm.phoneNumber);
      }
      return res;
    },
    /**
     * 查询外包人员薪资
     */
    async queryOutsourceSalaryByPersonId() {
      try {
        const formData = new FormData();
        formData.append("personId", this.outsourcePersonDetail.id?.toString() || '');
        const res = await fetchApi.queryOutsourceSalaryByPerson(formData);
        if (res.code == 1) {
          this.outsourceSalaryDetailList = res.info as OutsourceSalaryItem[];
        }
        return res;
      } catch (error) {
        return null;
      }
    },
    /**
     * 查询外包人员薪资
     */
    async queryOutsourceSheBaoByPersonId() {
      try {
        const formData = new FormData();
        formData.append("personId", this.outsourcePersonDetail.id?.toString() || '');
        const res = await fetchApi.queryOutsourceShebaoByPerson(formData);
        if (res.code == 1) {
          this.outsourceSocialSecurityDetailList = res.info as OutsourceSheBaoItem[];
        }
        return res;
      } catch (error) {
        return null;
      }
    },
    /**
     * 新增外包人员薪资
     */
    async addOutsourceSalaryByPerson() {
      try {
        const shebaoDetail = this.outsourceSocialSecurityDetailList.length > 0 ? this.outsourceSocialSecurityDetailList[0] : {};
        this.outsourceSalaryForm = {
          ...this.outsourceSalaryForm,
          personId: this.outsourceSalaryForm.personId || this.outsourcePersonDetail.id?.toString() || '',
          currentPositionId: this.outsourceSalaryForm.currentPositionId || this.outsourcePersonDetail.positionId?.toString() || '',
          currentPosition: this.outsourceSalaryForm.currentPosition || this.outsourcePersonDetail.positions || '',
          companyShebao: shebaoDetail?.companyTotal?.toString() || '',
          personShebao: shebaoDetail?.personTotal?.toString() || '',
          companyYijin: shebaoDetail?.yijinCompany?.toString() || '',
          personYijin: shebaoDetail?.yijinPerson?.toString() || '',
          keShangbao: shebaoDetail?.keShangbao?.toString() || '',
          shiShangbao: shebaoDetail?.shiShangbao?.toString() || '',
        }
        const res = await fetchApi.addOutsourceSalaryByPerson(this.outsourceSalaryForm);
        if (res.code == 1) {
          this.queryOutsourceSalaryByPersonId();
        }
        return res;
    } catch (error) {
      return null;
    }
    },
     /**
     * 新增社保信息
     */
    async addSocialSecurityInfo() {
      this.outsourceSocialSecurityFlag = true;
      this.outsourceSocialSecurityForm = {
        ...this.outsourceSocialSecurityForm,
        personId: this.outsourcePersonDetail.id,
        shebaoCity: this.outsourcePersonDetail.city || '',
      }
    },
    /**
     * 新增外包人员社保信息
     * @returns 新增外包人员社保信息
     */
     async addOutsourceSocialSecurityByPerson() {
      try {
        const res = await fetchApi.addOutsourceShebaoByPerson(this.outsourceSocialSecurityForm);
        if (res.code == 1) {
          this.queryOutsourceSheBaoByPersonId();
        }
        return res;
    } catch (error) {
      return null;
    }
    },
    /**
     * 查询外包人员社保费率
     */
    async queryOutsourceShebaoContractRates() {
      try {
        const formData = new FormData();
        formData.append("city", this.outsourceSocialSecurityForm.shebaoCity || '');
        formData.append("time", this.outsourceSocialSecurityForm.shebaoYujiaoTime || currentDate());
        const res = await fetchApi.queryOutsourceShebaoContractRates(formData);
        if (res.code == 1) {
          this.outsourceSocialSecurityContractRatesList = res.info as OutsourceSheBaoContractRatesItem[];
        }
        return res;
      } catch (error) {
        return null;
      }
    },
    async queryProvince() {
      const res = await fetchApi.queryOutsourceCity();
      if (res) {
        // save token
        this.province = res.info;
      }
      return res;
    },
    async queryOutsourceBrand() {
      const res = await fetchApi.queryOutsourceBrand();
      if (res) {
        // save token
        this.outsourceBrand = res.info;
      }
      return res;
    },
    async queryOutsourcePosition() {
      const res = await fetchApi.queryOutsourcePosition();
      if (res) {
        // save token
        this.outsourcePosition = res.info;
      }
      return res;
    },
    async queryCompanyAll() {
      const formData = new FormData();
      formData.append("jobType", '外包');
      const res = await fetchApi.queryCompanyAll(formData);
      if (res) {
        // save token
        this.outsourceCompanyAll = res.info;
      }
      return res;
    },
    async queryCompanyBrand(companyName: string) {
      const formData = new FormData();
      formData.append("companyName", companyName);
      const res = await fetchApi.queryCompanyBrand(formData);
      if (res) {
        // save token
        this.outsourceCompanyBrand = res.info;
      }
      return res;
    },
    async queryOutsourceBankName() {
      const res = await fetchApi.queryOutsourceBankName();
      if (res) {
        // save token
        this.outsourceBankName = res.info;
      }
      return res;
    },
    /**
     * 查询外包社保月度总计
     */
     async queryOutsourceShebaoCollect(year?: string,yearAndMonth?: string) {
      const outsourceShebaoCollectForm = new FormData();
      outsourceShebaoCollectForm.append("year", year || '');
      outsourceShebaoCollectForm.append("yearAndMonth", yearAndMonth || '');
      const res = await fetchApi.queryOutsourceShebaoCollect(outsourceShebaoCollectForm);
      if (res) {
        // save token
        this.outsourceShebaoCollect = res.info as OutsourceSheBaoCollectItem[];
      }
      return res;
    },
     /**
     * 修改外包考勤
     */
     async updateOutsourceAttend() {
      const res = await fetchApi.updateOutsourceAttend(this.outsourceAttendForm);
      if (res) {
        this.queryOutsourceAttend();
      }
      return res;
    },
     /**
     * 修改外包考勤
     */
     async updateOutsourceShebaoChecked(yearAndMonth: string, companyName?: string) {
      const formData = new FormData();
      formData.append("yearAndMonth", yearAndMonth || '');
      formData.append("companyName", companyName || '');
      formData.append("checkFlag", '2');
      formData.append("SystemRecruitId", loginVueUser.loginId);
      const res = await fetchApi.updateOutsourceShebaoChecked(formData);
      if (res) {
        this.queryOutsourceShebaoCollect();
      }
      return res;
    },
     /**
     * 查询社保基数信息
     */
     async queryOutsourceShebaoInfo(city?: string) {
      const formData = new FormData();
      formData.append("city", city || '');
      formData.append("pageNumber", '1');
      formData.append("pageSize", '1000');
      const res = await fetchApi.queryOutsourceShebaoInfo(formData);
      if (res) {
        this.outsourceSocialSecuritInfoList = res.info.list as OutsourceShebaoInfoItem[];
      }
      return res;
    },
      /**
     * 查询社保基数信息
     */
     async queryOutsourceShebaoInfoDetails(city?: string) {
      this.outsourceSocialSecuritInfoDetailsFlag = true;
      const formData = new FormData();
      formData.append("city", city || '');
      formData.append("pageNumber", '1');
      formData.append("pageSize", '1000');
      const res = await fetchApi.queryOutsourceShebaoInfo(formData);
      if (res) {
        this.outsourceSocialSecuritInfoDetailsList = res.info.list as OutsourceShebaoInfoItem[];
      }
      return res;
    },
      /**
     *  修改外包社保
     */
     async updateOutsourceShebaoInfo() {
      this.outsourceSocialSecurityInfoForm = {
        ...this.outsourceSocialSecurityInfoForm,
        startTime: this.outsourceSocialSecurityInfoForm.startTime ? this.outsourceSocialSecurityInfoForm.startTime + "-01" : '',
        issueTime: this.outsourceSocialSecurityInfoForm.issueTime ? this.outsourceSocialSecurityInfoForm.issueTime + "-01" : '',
        updateUser: loginVueUser.loginName || '',
      };
      const res = await fetchApi.updateOutsourceInfo(this.outsourceSocialSecurityInfoForm);
      if (res) {
        this.queryOutsourceShebaoInfo();
      }
      return res;
    },
      /**
     * 新增外包社保
     */
     async addOutsourceShebaoInfo() {
       this.outsourceSocialSecurityInfoForm = {
        ...this.outsourceSocialSecurityInfoForm,
        startTime: this.outsourceSocialSecurityInfoForm.startTime ? this.outsourceSocialSecurityInfoForm.startTime + "-01" : '',
         issueTime: this.outsourceSocialSecurityInfoForm.issueTime ? this.outsourceSocialSecurityInfoForm.issueTime + "-01" : '',
        updateUser: loginVueUser.loginName || '',
      };
      const res = await fetchApi.addOutsourceInfo(this.outsourceSocialSecurityInfoForm);
      if (res) {
        this.queryOutsourceShebaoInfo();
      }
      return res;
    },
  },
});

export function useOutsourceDetailStoreWithOut() {
  return useOutsourceDetailStore(store);
}
