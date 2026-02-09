import { defineStore } from 'pinia';
import { store } from '/@/store';
import { formatToDate, currentDate, formatToMonth, formatToDateTime } from '/@/utils/dateUtil';
import dayjs from 'dayjs';
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
  OutsourceFormulaItem,
  OutsourcePersonMoneyItem, //外包人员请款单 表单信息
} from '/@/api/outsourceDetail/model';
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
      pageSize: 12,
      total: 0,
    } as PageItem,
    outsourceAttendList: [] as OutsourceAttendItem[], //外包考勤列表
    formStateAttend: {} as SearchAttendItem,
    pageOutsourceAttendList: {
      pageNumber: 1,
      pageSize: 13,
      total: 0,
    } as PageItem,
    province: [] as any[], //搜索条件城市
    outsourceBrand: [] as any[], //搜索条件品牌
    outsourcePosition: [] as any[], //搜索条件岗位
    outsourceCompanyAll: [] as any[], //外包公司列表
    outsourceCompanyBrand: [] as any[], //外包公司下品牌列表
    outsourceBankName: [] as any[], //外包银行名称
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
    newJoinerPersonalInformationFormTemp: {} as OutsourcePersonItem, //新员工个人信息登记表
    outsourceShebaoCollect: [] as OutsourceSheBaoCollectItem[], //外包社保月度总计
    outsourceSocialSecurityCollectFlag: false, //外包社保月度总计详情控制
    outsourceAttendFlag: false, //外包考勤详情控制
    outsourceAttendForm: {} as OutsourceAttendItem, //外包考勤详情 考勤信息
    outsourceMonthSalaryShiJiFlag: false, //外包月度薪资详情控制 实发工资
    outsourceMonthSalaryFlag: false, //外包月度薪资详情控制 奖金总计
    outsourceMonthSalaryForm: {} as OutsourceMonthSalaryItem, //外包月度薪资详情 月度薪资信息
    outsourceSocialSecuritInfoFlag: false, //外包社保基数详情控制
    outsourceSocialSecuritInfoList: [] as OutsourceShebaoInfoItem[], //外包社保基数详情 社保信息
    outsourceSocialSecuritInfoDetailsFlag: false, //外包社保基数详情控制
    outsourceSocialSecuritInfoDetailsList: [] as OutsourceShebaoInfoItem[], //外包社保基数详情 社保信息
    outsourceSocialSecurityInfoFormFlag: false, //外包社保基数详情 社保信息表单控制
    outsourceSocialSecurityInfoFormType: '' as string, //外包社保基数详情 社保信息表单类型
    outsourceSocialSecurityInfoForm: {} as OutsourceShebaoInfoItem, //外包社保基数详情 社保信息表单
    markIdList: [] as any[], //外包店铺列表
    counselorList: [] as any[], //外包顾问列表
    LeaveInfomatiomFlag: false, //离职申请
    contractInfomatiomFlag: false, //合同信息
    esignTemplateList: [] as any[], //电子合同模板列表
    esignTemplateDetail: {} as any, //电子合同模板详情
    contractInfomationFormTemp: {} as OutsourcePersonItem, //合同信息
    esignTemplatePsnAccount: {} as any, //电子合同模板 经办人信息
    outsourceFormulaFlag: false, //外包公司公式详情控制
    outsourceFormulaList: [] as OutsourceFormulaItem[], //外包公司公式详情 公式信息
    pageOutsourceFormulaList: {
      pageNumber: 1,
      pageSize: 16,
      total: 0,
    } as PageItem,
    addOutsourceFormulaFlag: false, //外包公司公式详情 新增公式信息表单控制
    outsourceFormulaForm: {} as OutsourceFormulaItem, //外包公司公式详情 公式信息表单
    orginalPathBlobPathFlag: false, //文件原路径详情控制
    orginalPathBlobPath: '' as string, //文件原路径详情
    orginalPathBlobType: 0, //文件原路径详情类型
    outsourcePersonProcessNum: 0, //外包人员列表入离职流程状态
    outsourcePersonProcessFlag: false, //外包人员列表入离职流程状态
    outsourcePersonProcessList: [] as OutsourcePersonItem[], //外包人员列表入离职流程
    pageOutsourcePersonProcessList: {
      pageNumber: 1,
      pageSize: 17,
      total: 0,
    } as PageItem,
    outsourcePersonMoneyFlag: false, //外包人员请款单
    formStatePersonMoney: {} as OutsourcePersonMoneyItem, //外包人员请款单 表单信息
    offerOutsourceMonthSalary: [] as OutsourceMonthSalaryItem[], //外包人员请款单 请款单
    offerOutsourceSheBao: [] as OutsourceSheBaoItem[], //外包人员请款单 社保信息
    outsourcePersonPerformanceDetailFlag: false, //外包人员绩效详情控制
    outsourcePersonPerformanceDetail: {} as OutsourceMonthSalaryItem, //外包人员绩效详情月度薪资
    outsourcePersonPerformanceDetailPersonInfo: [] as OutsourcePersonItem[], //外包人员绩效详情基本信息
    outsourcePersonPerformanceDetailSalaryInfo: [] as OutsourceSalaryItem[], //外包人员绩效详情薪资标准
    outsourcePersonPerformanceDetailAttendInfo: [] as OutsourceAttendItem[], //外包人员绩效详情薪资标准
    outsourcePersonPerformanceDetailSheBaoInfo: [] as OutsourceSheBaoItem[], //外包人员绩效详情月度社保
    formStateMonthSalaryOffer: {} as SearchMonthSalaryItem,
    outsourceMonthSalaryOfferList: [] as OutsourceMonthSalaryItem[], //外包人员业绩分配
    pageOutsourceMonthSalaryOfferList: {
      pageNumber: 1,
      pageSize: 16,
      total: 0,
    } as PageItem,
  }),
  getters: {
    getOutsourcePersonList: (state) =>
      state.outsourcePersonList.map((item, index) => ({
        ...item,
        index:
          state.pageOutsourcePersonList.pageSize * (state.pageOutsourcePersonList.pageNumber - 1) +
          (index + 1),
        mId: item.mId?.toString() || '',
        enterprise: `${item.recommendCounselor}/${item.counselor}`,
        planEntryTime: item.planEntryTime ? formatToDate(item.planEntryTime) : '',
        age: item.birthYear ? (new Date().getFullYear() - Number(item.birthYear)).toString() : '',
        offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        planLeaveTime: item.planLeaveTime ? formatToDate(item.planLeaveTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
        startTime: item.startTime ? formatToDate(item.startTime) : '',
        endTime:
          item.contractPeriod == '长期' ? '长期' : item.endTime ? formatToDate(item.endTime) : '',
        yujiaoTime: item.yujiaoTime ? formatToDate(item.yujiaoTime) : '',
        yutingTime: item.yutingTime ? formatToDate(item.yutingTime) : '',
        paymentYearMonth: item.paymentYearMonth ? formatToMonth(item.paymentYearMonth) : '',
        prestopYearMonth: item.prestopYearMonth ? formatToMonth(item.prestopYearMonth) : '',
      })),
    getOutsourcePersonProcessNum: (state) => state.outsourcePersonProcessNum,
    getOutsourcePersonProcessList: (state) =>
      state.outsourcePersonProcessList.map((item, index) => ({
        ...item,
        index:
          state.pageOutsourcePersonProcessList.pageSize *
            (state.pageOutsourcePersonProcessList.pageNumber - 1) +
          (index + 1),
        enterprise: `${item.recommendCounselor}/${item.counselor}`,
        planEntryTime: item.planEntryTime ? formatToDate(item.planEntryTime) : '',
        age: item.birthYear ? (new Date().getFullYear() - Number(item.birthYear)).toString() : '',
        offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        planLeaveTime: item.planLeaveTime ? formatToDate(item.planLeaveTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
        startTime: item.startTime ? formatToDate(item.startTime) : '',
        endTime:
          item.contractPeriod == '长期' ? '长期' : item.endTime ? formatToDate(item.endTime) : '',
        yujiaoTime: item.yujiaoTime ? formatToDate(item.yujiaoTime) : '',
        yutingTime: item.yutingTime ? formatToDate(item.yutingTime) : '',
        paymentYearMonth: item.paymentYearMonth ? formatToMonth(item.paymentYearMonth) : '',
        prestopYearMonth: item.prestopYearMonth ? formatToMonth(item.prestopYearMonth) : '',
      })),
    getOutsourceSalaryList: (state) =>
      state.outsourceSalaryList.map((item, index) => ({
        ...item,
        index:
          state.pageOutsourceSalaryList.pageSize * (state.pageOutsourceSalaryList.pageNumber - 1) +
          (index + 1),
        startTime: item.startTime ? formatToDate(item.startTime) : '',
        endTime: item.endTime ? formatToDate(item.endTime) : '',
        changeTime: item.changeTime ? formatToDate(item.changeTime) : '',
      })),
    getOutsourceSheBaoList: (state) =>
      state.outsourceSheBaoList.map((item, index) => ({
        ...item,
        index:
          state.pageOutsourceSheBaoList.pageSize * (state.pageOutsourceSheBaoList.pageNumber - 1) +
          (index + 1),
        shebaoShijiaoTime: item.shebaoShijiaoTime ? formatToMonth(item.shebaoShijiaoTime) : '',
        serviceMoney:
          item.serviceMoney != '公式'
            ? parseFloat(item.serviceMoney || '0').toFixed(2)
            : item.serviceMoney,
        companyTotal: parseFloat(((item?.companyTotal || 0) - (item.yijinCompany || 0)).toFixed(2)),
        personTotal: parseFloat(((item?.personTotal || 0) - (item.yijinPerson || 0)).toFixed(2)),
        shangbaoTotal: parseFloat(
          (
            parseFloat(((item?.companyTotal || 0) - (item.yijinCompany || 0)).toFixed(2)) +
            parseFloat(((item?.personTotal || 0) - (item.yijinPerson || 0)).toFixed(2)) +
            parseFloat(item.serviceMoney != '公式' ? item.serviceMoney?.toString() || '0' : '0')
          ).toString(),
        ).toFixed(2),
      })),
    getOutsourceAttendList: (state) =>
      state.outsourceAttendList.map((item, index) => ({
        ...item,
        index:
          state.pageOutsourceAttendList.pageSize * (state.pageOutsourceAttendList.pageNumber - 1) +
          (index + 1),
        userNameCn: `${item.userNameCn}${item.userNameEn ? '/' + item.userNameEn : ''}`,
        lastMonthYuHoursTotal: parseFloat(item.lastMonthYuHours || '0').toFixed(2),
        lastMonthShiHoursTotal: parseFloat(item.lastMonthShiHours || '0').toFixed(2),
        currentMonthYuHoursTotal: parseFloat(item.currentMonthYuHours || '0').toFixed(2),
        currentMonthShiHoursTotal: parseFloat(item.currentMonthShiHours || '0').toFixed(2),
        totalChaHoursTotal: parseFloat(item.totalChaHours || '0').toFixed(2),
        overDouble: item.overDouble || '1.5',
        overHoursTotal: (
          parseFloat(item.overHours || '0') * parseFloat(item.overDouble || '1.5')
        ).toFixed(2),
        holidayOverDouble: item.holidayOverDouble || '3',
        holidayOverHoursTotal: (
          parseFloat(item.holidayOverHours || '0') * parseFloat(item.holidayOverDouble || '3')
        ).toFixed(2),
        restOverDouble: item.restOverDouble || '2',
        restOverHoursTotal: (
          parseFloat(item.restOverHours || '0') * parseFloat(item.restOverDouble || '2')
        ).toFixed(2),
        daixinBingjiaDouble: item.daixinBingjiaDouble || '1',
        daixinBingjiaHoursTotal: (
          parseFloat(item.daixinBingjiaHours || '0') * parseFloat(item.daixinBingjiaDouble || '1')
        ).toFixed(2),
        kouxinBingjiaDouble: item.kouxinBingjiaDouble || '0.4',
        kouxinBingjiaHoursTotal: (
          parseFloat(item.kouxinBingjiaHours || '0') * parseFloat(item.kouxinBingjiaDouble || '0.4')
        ).toFixed(2),
        shijiaDouble: item.shijiaDouble || '1',
        shijiaHoursTotal: (
          parseFloat(item.shijiaHours || '0') * parseFloat(item.shijiaDouble || '1')
        ).toFixed(2),
        nianjianDouble: item.nianjianDouble || '1',
        nianjianHoursTotal: (
          parseFloat(item.nianjianHours || '0') * parseFloat(item.nianjianDouble || '1')
        ).toFixed(2),
        hunjiaDouble: item.hunjiaDouble || '1',
        hunjiaHoursTotal: (
          parseFloat(item.hunjiaHours || '0') * parseFloat(item.hunjiaDouble || '1')
        ).toFixed(2),
        sanjiaDouble: item.sanjiaDouble || '1',
        sanjiaHoursTotal: (
          parseFloat(item.sanjiaHours || '0') * parseFloat(item.sanjiaDouble || '1')
        ).toFixed(2),
        otherDaixinDouble: item.otherDaixinDouble || '1',
        otherDaixinHoursTotal: (
          parseFloat(item.otherDaixinHours || '0') * parseFloat(item.otherDaixinDouble || '1')
        ).toFixed(2),
        utDouble: item.utDouble || '1',
        utHoursTotal: (parseFloat(item.utHours || '0') * parseFloat(item.utDouble || '1')).toFixed(
          2,
        ),
      })),
    getOutsourceMonthSalaryList: (state) =>
      state.outsourceMonthSalaryList.map((item, index) => ({
        ...item,
        index:
          index < state.outsourceMonthSalaryList.length - 1
            ? state.pageOutsourceMonthSalaryList.pageSize *
                (state.pageOutsourceMonthSalaryList.pageNumber - 1) +
              (index + 1)
            : '',
        jinxinMonth: item.jinxinMonth ? formatToMonth(item.jinxinMonth) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
        userNameCn: item.userNameCn
          ? `${item.userNameCn}${item.userNameEn ? '/' + item.userNameEn : ''}`
          : '',
      })),
    getOutsourceMonthSalaryOfferList: (state) =>
      state.outsourceMonthSalaryOfferList.map((item, index) => ({
        ...item,
        index:
          index < state.outsourceMonthSalaryOfferList.length - 1
            ? state.pageOutsourceMonthSalaryOfferList.pageSize *
                (state.pageOutsourceMonthSalaryOfferList.pageNumber - 1) +
              (index + 1)
            : '',
        jinxinMonth: item.jinxinMonth ? formatToMonth(item.jinxinMonth) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
        userNameCn: item.userNameCn
          ? `${item.userNameCn}${item.userNameEn ? '/' + item.userNameEn : ''}`
          : '',
      })),
    getOutsourcePersonByPhoneList: (state) =>
      state.outsourcePersonByPhoneList.map((item, index) => ({
        ...item,
        index: index + 1,
        enterprise: `${item.recommendCounselor}/${item.counselor}`,
        planEntryTime: item.planEntryTime ? formatToDate(item.planEntryTime) : '',
        offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        planLeaveTime: item.planLeaveTime ? formatToDate(item.planLeaveTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
      })),
    getOutsourceContractList: (state) =>
      state.outsourceContractList.map((item, index) => ({
        ...item,
        index: index + 1,
        offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
        signDate: item.signDate ? formatToDate(item.signDate) : '',
        startDate: item.startDate ? formatToDate(item.startDate) : '',
        endDate:
          item.contractCycle == '长期' ? '长期' : item.endDate ? formatToDate(item.endDate) : '',
        loseDate: item.loseDate ? formatToDate(item.loseDate) : '',
      })),
    getOutsourceSalaryDetailList: (state) =>
      state.outsourceSalaryDetailList.map((item, index) => ({
        ...item,
        index: index + 1,
        changeTime: item.changeTime ? formatToDate(item.changeTime) : '',
        companyShebao: parseFloat(
          (Number(item.companyShebao || 0) - Number(item.companyYijin || 0)).toFixed(2),
        ),
        personShebao: parseFloat(
          (Number(item.personShebao || 0) - Number(item.personYijin || 0)).toFixed(2),
        ),
      })),
    getOutsourceSocialSecurityDetailList: (state) =>
      state.outsourceSocialSecurityDetailList.map((item, index) => ({
        ...item,
        index: index + 1,
        serviceMoney:
          item.serviceMoney == '公式'
            ? item.serviceMoney
            : parseFloat(item.serviceMoney || '0').toFixed(2),
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
        companyTotal: parseFloat(((item?.companyTotal || 0) - (item.yijinCompany || 0)).toFixed(2)),
        personTotal: parseFloat(((item?.personTotal || 0) - (item.yijinPerson || 0)).toFixed(2)),
      })),
    getOutsourceMarkList: (state) =>
      state.markIdList?.map((item) => {
        return {
          label: item.text,
          value: item.id,
        };
      }),
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
    getOutsourceRecruitList: (state) => {
      const recruitList =
        state.counselorList?.flatMap(
          (team) =>
            team.recruitList?.map((recruit) => ({
              value: recruit.recruitId,
              label: recruit.realNameEn,
            })) || [],
        ) || [];
      // 添加固定选项
      const allOptions = [
        { value: '9999', label: '公司' },
        { value: '5485', label: 'Mona Xu' },
        ...recruitList,
      ];

      // 去重处理：使用Map来确保value的唯一性
      const uniqueOptionsMap = new Map();
      allOptions.forEach((option) => {
        // 只保留首次出现的value对应的选项
        if (!uniqueOptionsMap.has(option.value)) {
          uniqueOptionsMap.set(option.value, option);
        }
      });

      // 将Map转换回数组并返回
      return Array.from(uniqueOptionsMap.values());
    },
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
    getOutsourceShebaoCollect: (state) =>
      state.outsourceShebaoCollect.map((item, index) => ({
        ...item,
        index: index + 1,
        serviceMoney: parseFloat(item.serviceMoney?.toString() || '0').toFixed(2),
        shebaoTotal: parseFloat(
          (
            (item.companyTotal || 0) +
            (item.personTotal || 0) +
            parseFloat(item.serviceMoney?.toString() || '0')
          ).toString(),
        ).toFixed(2),
        detaillist: item.detaillist.map((detailItem) => ({
          ...detailItem,
          serviceMoney: parseFloat(detailItem.serviceMoney?.toString() || '0').toFixed(2),
          shebaoTotal: parseFloat(
            (
              (detailItem.companyTotal || 0) +
              (detailItem.personTotal || 0) +
              parseFloat(
                detailItem.serviceMoney?.toString() == '公式'
                  ? '0'
                  : detailItem.serviceMoney?.toString() || '0',
              )
            ).toString(),
          ).toFixed(2),
        })),
      })),
    getOutsourceSocialSecuritInfoList: (state) =>
      state.outsourceSocialSecuritInfoList.map((item, index) => ({
        ...item,
        index: index + 1,
        addDeleteMonth: `${item.addMonth}/${item.deleteMonth}`,
        startTime: item.startTime ? formatToMonth(item.startTime) : '',
        endTime: item.endTime ? formatToMonth(item.endTime) : '',
        issueTime: item.issueTime ? formatToMonth(item.issueTime) : '',
        updateTime: item.updateTime ? formatToDate(item.updateTime) : '',
      })),
    getOutsourceSocialSecuritInfoDetailsList: (state) =>
      state.outsourceSocialSecuritInfoDetailsList.map((item, index) => ({
        ...item,
        index: index + 1,
        addDeleteMonth: `${item.addMonth}/${item.deleteMonth}`,
        startTime: item.startTime ? formatToMonth(item.startTime) : '',
        endTime: item.endTime ? formatToMonth(item.endTime) : '',
        issueTime: item.issueTime ? formatToMonth(item.issueTime) : '',
        updateTime: item.updateTime ? formatToDate(item.updateTime) : '',
      })),
    getEsignTemplateList: (state) =>
      state.esignTemplateList.map((item) => {
        return {
          label: item.signTemplateName,
          value: item.signTemplateId,
        };
      }),
    getEsignTemplateDetail: (state) => state.esignTemplateDetail,
    getEsignTemplatePsnAccount: (state) => state.esignTemplatePsnAccount, //电子合同模板 经办人信息
    getOutsourceFormulaList: (state) =>
      state.outsourceFormulaList.map((item, index) => ({
        ...item,
        index: index + 1,
        startTime: item.startTime ? formatToDate(item.startTime) : '',
        endTime: item.endTime ? formatToDate(item.endTime) : '',
        mId: item.mId?.toString(),
        youzhaoRateShow: item.youzhaoRate ? `${Number(item.youzhaoRate) * 100}%` : '',
        wuzhaoRateShow: item.wuzhaoRate ? `${Number(item.wuzhaoRate) * 100}%` : '',
      })), //外包公司公式详情 公式信息
    getOrginalPathBlobPath: (state) => state.orginalPathBlobPath,
    getOrginalPathBlobType: (state) => {
      const orginalPathBlobTypeList = [
        '文件预览',
        '信息OFFER文件',
        '合同文件',
        '离职申请文件',
        '其他文件',
      ];
      return orginalPathBlobTypeList[state.orginalPathBlobType] || '其他文件';
    },
    getOfferOutsourceSheBao: (state) =>
      state.offerOutsourceSheBao.map((item, index) => ({
        ...item,
        index: index + 1,
      })), //外包人员请款单 社保信息
    getOfferOutsourceMonthSalary: (state) =>
      state.offerOutsourceMonthSalary.map((item, index) => {
        const monthStr = item.jinxinMonth ? formatToMonth(item.jinxinMonth) : '';
        let jinxinMonth = '';
        if (monthStr) {
          const [yearStr, monthPart] = monthStr.split('-');
          const year = Number(yearStr);
          const month = Number(monthPart);
          if (year && month) {
            const lastDay = new Date(year, month, 0).getDate().toString().padStart(2, '0');
            jinxinMonth = `${year}/${month.toString().padStart(2, '0')}/01-${year}/${month
              .toString()
              .padStart(2, '0')}/${lastDay}`;
          }
        }
        const sheBaoMoneyValue = Number(item.monthShebao || 0) + Number(item.yijin || 0);
        const canBaoMoneyValue = Number(item.monthTax || 0) * 0.015;
        const personCostValue = Number(item.monthTax || 0) + sheBaoMoneyValue + canBaoMoneyValue;
        const rateValue = 0.22;
        const serviceFeeValue = personCostValue * rateValue;
        const shangbaoValue = 0;
        const salaryTaxValue = personCostValue + serviceFeeValue + shangbaoValue;
        const salaryRateValue = 0.0672;
        const salaryRateMoneyValue = salaryTaxValue * salaryRateValue;
        const salaryTotalValue = salaryTaxValue + salaryRateMoneyValue;
        const lastMonthLeiJiValue = Number(item.yearGeshui || 0) + Number(item.monthGeshui || 0);
        return {
          ...item,
          index: index + 1,
          serviceType: '岗位外包',
          userName: `${item.userNameEn || ''}${item.userNameCn}`,
          jinxinMonth,
          shangBao: Number(item.shangBao || 0),
          jingJiBuChangJin: 0,
          jinxinMonthDetail: item.jinxinMonth,
          sheBaoMoney: parseFloat(sheBaoMoneyValue.toString()).toFixed(2),
          canBaoMoney: parseFloat(canBaoMoneyValue.toString()).toFixed(2),
          economicCompensation: 0,
          personCost: parseFloat(personCostValue.toString()).toFixed(2),
          rate: rateValue * 100 + '%',
          serviceFee: parseFloat(serviceFeeValue.toString()).toFixed(2),
          salaryTax: parseFloat(salaryTaxValue.toString()).toFixed(2),
          salaryRate: salaryRateValue * 100 + '%',
          salaryRateMoney: parseFloat(salaryRateMoneyValue.toString()).toFixed(2),
          salaryTotal: parseFloat(salaryTotalValue.toString()).toFixed(2),
          realEntryTime: item.realEntryTime
            ? dayjs(item.realEntryTime).format('YYYY年MM月DD日')
            : '',
          realLeaveTime: item.realLeaveTime
            ? dayjs(item.realLeaveTime).format('YYYY年MM月DD日')
            : '',
          lastMonthLeiJi: parseFloat(lastMonthLeiJiValue.toString()).toFixed(2),
        };
      }), //外包人员请款单 社保信息
    getFormStatePersonMoney: (state) => {
      const yearAndMonth = state.formStatePersonMoney?.yearAndMonth;
      if (!yearAndMonth) {
        return {
          currentMonth: '',
          lastMonth: '',
        };
      }
      return {
        currentMonth: dayjs(yearAndMonth).format('MM'),
        lastMonth: dayjs(yearAndMonth).subtract(1, 'month').format('MM'),
      };
    },
    getOutsourcePersonPerformanceDetail: (state) => [state.outsourcePersonPerformanceDetail],
    getOutsourcePersonPerformanceDetailPersonInfo: (state) =>
      state.outsourcePersonPerformanceDetailPersonInfo.map((item, index) => ({
        ...item,
        index: index + 1,
        enterprise: `${item.recommendCounselor}/${item.counselor}`,
        planEntryTime: item.planEntryTime ? formatToDate(item.planEntryTime) : '',
        offerTime: item.offerTime ? formatToDate(item.offerTime) : '',
        realEntryTime: item.realEntryTime ? formatToDate(item.realEntryTime) : '',
        planLeaveTime: item.planLeaveTime ? formatToDate(item.planLeaveTime) : '',
        realLeaveTime: item.realLeaveTime ? formatToDate(item.realLeaveTime) : '',
      })),
    getOutsourcePersonPerformanceDetailSalaryInfo: (state) =>
      state.outsourcePersonPerformanceDetailSalaryInfo.map((item) => ({
        ...item,
        startTime: item.startTime ? formatToDate(item.startTime) : '',
        endTime: item.endTime ? formatToDate(item.endTime) : '',
        changeTime: item.changeTime ? formatToDate(item.changeTime) : '',
      })),
    getOutsourcePersonPerformanceDetailAttendInfo: (state) =>
      state.outsourcePersonPerformanceDetailAttendInfo.map((item) => ({
        ...item,
        userNameCn: `${item.userNameCn}${item.userNameEn ? '/' + item.userNameEn : ''}`,
        lastMonthYuHoursTotal: parseFloat(item.lastMonthYuHours || '0').toFixed(2),
        lastMonthShiHoursTotal: parseFloat(item.lastMonthShiHours || '0').toFixed(2),
        currentMonthYuHoursTotal: parseFloat(item.currentMonthYuHours || '0').toFixed(2),
        currentMonthShiHoursTotal: parseFloat(item.currentMonthShiHours || '0').toFixed(2),
        totalChaHoursTotal: parseFloat(item.totalChaHours || '0').toFixed(2),
        overDouble: item.overDouble || '1.5',
        overHoursTotal: (
          parseFloat(item.overHours || '0') * parseFloat(item.overDouble || '1.5')
        ).toFixed(2),
        holidayOverDouble: item.holidayOverDouble || '3',
        holidayOverHoursTotal: (
          parseFloat(item.holidayOverHours || '0') * parseFloat(item.holidayOverDouble || '3')
        ).toFixed(2),
        restOverDouble: item.restOverDouble || '2',
        restOverHoursTotal: (
          parseFloat(item.restOverHours || '0') * parseFloat(item.restOverDouble || '2')
        ).toFixed(2),
        daixinBingjiaDouble: item.daixinBingjiaDouble || '1',
        daixinBingjiaHoursTotal: (
          parseFloat(item.daixinBingjiaHours || '0') * parseFloat(item.daixinBingjiaDouble || '1')
        ).toFixed(2),
        kouxinBingjiaDouble: item.kouxinBingjiaDouble || '0.4',
        kouxinBingjiaHoursTotal: (
          parseFloat(item.kouxinBingjiaHours || '0') * parseFloat(item.kouxinBingjiaDouble || '0.4')
        ).toFixed(2),
        shijiaDouble: item.shijiaDouble || '1',
        shijiaHoursTotal: (
          parseFloat(item.shijiaHours || '0') * parseFloat(item.shijiaDouble || '1')
        ).toFixed(2),
        nianjianDouble: item.nianjianDouble || '1',
        nianjianHoursTotal: (
          parseFloat(item.nianjianHours || '0') * parseFloat(item.nianjianDouble || '1')
        ).toFixed(2),
        hunjiaDouble: item.hunjiaDouble || '1',
        hunjiaHoursTotal: (
          parseFloat(item.hunjiaHours || '0') * parseFloat(item.hunjiaDouble || '1')
        ).toFixed(2),
        sanjiaDouble: item.sanjiaDouble || '1',
        sanjiaHoursTotal: (
          parseFloat(item.sanjiaHours || '0') * parseFloat(item.sanjiaDouble || '1')
        ).toFixed(2),
        otherDaixinDouble: item.otherDaixinDouble || '1',
        otherDaixinHoursTotal: (
          parseFloat(item.otherDaixinHours || '0') * parseFloat(item.otherDaixinDouble || '1')
        ).toFixed(2),
        utDouble: item.utDouble || '1',
        utHoursTotal: (parseFloat(item.utHours || '0') * parseFloat(item.utDouble || '1')).toFixed(
          2,
        ),
      })),
    getOutsourcePersonPerformanceDetailSheBaoInfo: (state) => {
      const shebaoStandardMap: Record<string, string> = {
        '1': '最低基数',
        '2': '基本工资',
        '3': '特殊基数',
      };
      return state.outsourcePersonPerformanceDetailSheBaoInfo.map((item) => ({
        ...item,
        shebaoShijiaoTime: item.shebaoShijiaoTime ? formatToMonth(item.shebaoShijiaoTime) : '',
        serviceMoney:
          item.serviceMoney != '公式'
            ? parseFloat(item.serviceMoney || '0').toFixed(2)
            : item.serviceMoney,
        companyTotal: parseFloat(((item?.companyTotal || 0) - (item.yijinCompany || 0)).toFixed(2)),
        personTotal: parseFloat(((item?.personTotal || 0) - (item.yijinPerson || 0)).toFixed(2)),
        shangbaoTotal: parseFloat(
          (
            parseFloat(((item?.companyTotal || 0) - (item.yijinCompany || 0)).toFixed(2)) +
            parseFloat(((item?.personTotal || 0) - (item.yijinPerson || 0)).toFixed(2)) +
            parseFloat(item.serviceMoney != '公式' ? item.serviceMoney?.toString() || '0' : '0')
          ).toString(),
        ).toFixed(2),
        shebaoStandard: shebaoStandardMap[item.shebaoStandard || ''] || '',
      }));
    },
    getOutsourcePersonPerformanceDetailCostInfo: (state) => {
      const costArr = [];
      const costMap = state.outsourcePersonPerformanceDetail;
      // costArr.push({

      // })
      return costArr;
    },
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
        this.formStatePerson.currentStatus = '2';
      }
      if (this.formStatePerson.currentStatus == '1') {
        this.formStatePerson.currentStatus = '';
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
          this.outsourcePersonProcessNum = res.info.liucheng;
          this.outsourcePersonList = res.info.pager.list as OutsourcePersonItem[];
          this.pageOutsourcePersonList = {
            pageNumber: res.info.pager.pageNumber,
            pageSize: res.info.pager.pageSize,
            total: res.info.pager.totalCount,
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
        this.formStateSalary.currentStatus = '2';
      }
      if (this.formStateSalary.currentStatus == '1') {
        this.formStateSalary.currentStatus = '';
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
        this.formStateSheBao.currentStatus = '1';
      }
      if (!this.formStateSheBao.yearAndMonth) {
        this.formStateSheBao.yearAndMonth = currentDate('YYYY-MM');
      }
      if (this.formStateSheBao.currentStatus == '1') {
        this.formStateSheBao.currentStatus = '';
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
        this.formStateAttend.currentStatus = '2';
      }
      if (!this.formStateAttend.yearAndMonth) {
        this.formStateAttend.yearAndMonth = currentDate('YYYY-MM');
      }
      if (this.formStateAttend.currentStatus == '1') {
        this.formStateAttend.currentStatus = '';
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
      params.append('yearAndMonth', this.formStateAttend.yearAndMonth || '');
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
      if (!this.formStateMonthSalary.yearAndMonth) {
        this.formStateMonthSalary.yearAndMonth = currentDate('YYYY-MM');
      }
      if (this.formStateMonthSalary.currentStatus == '1') {
        this.formStateMonthSalary.currentStatus = '';
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourceMonthSalaryList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourceMonthSalaryList.pageSize.toString());
      params.append('city', this.formStateMonthSalary.city || '');
      params.append('bId', this.formStateMonthSalary.bId || '');
      params.append('positionId', this.formStateMonthSalary.positionId || '');
      params.append('currentStatus', this.formStateMonthSalary.currentStatus || '');
      params.append('userName', this.formStateMonthSalary.userName || '');
      params.append('companyName', this.formStateMonthSalary.companyName || '');
      params.append('companyArrange', this.formStateMonthSalary.companyArrange || '');
      params.append('jobType', this.formStateMonthSalary.jobType || '');
      params.append('yearAndMonth', this.formStateMonthSalary.yearAndMonth || '');
      this.monthSalaryIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourceMonthSalary(params);
        if (res.code == 1) {
          this.monthSalaryIsLoading = false;
          const totalNum = res.info.totalNum;
          this.outsourceMonthSalaryList = res.info.pager.list as OutsourceMonthSalaryItem[];
          this.outsourceMonthSalaryList.push(totalNum);
          this.pageOutsourceMonthSalaryList = {
            pageNumber: res.info.pager.pageNumber,
            pageSize: res.info.pager.pageSize,
            total: res.info.pager.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.monthSalaryIsLoading = false;
        return null;
      }
    },
    /**
     * 查外包业绩分配
     */
    async queryOutsourceMonthSalaryOffer() {
      if (this.monthSalaryIsLoading) {
        return;
      }
      if (!this.formStateMonthSalaryOffer.yearAndMonth) {
        this.formStateMonthSalaryOffer.yearAndMonth = currentDate('YYYY-MM');
      }
      if (this.formStateMonthSalaryOffer.currentStatus == '1') {
        this.formStateMonthSalaryOffer.currentStatus = '';
      }
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourceMonthSalaryOfferList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourceMonthSalaryOfferList.pageSize.toString());
      params.append('city', this.formStateMonthSalaryOffer.city || '');
      params.append('bId', this.formStateMonthSalaryOffer.bId || '');
      params.append('positionId', this.formStateMonthSalaryOffer.positionId || '');
      params.append('currentStatus', this.formStateMonthSalaryOffer.currentStatus || '');
      params.append('userName', this.formStateMonthSalaryOffer.userName || '');
      params.append('companyName', this.formStateMonthSalaryOffer.companyName || '');
      params.append('companyArrange', this.formStateMonthSalaryOffer.companyArrange || '');
      params.append('jobType', this.formStateMonthSalaryOffer.jobType || '');
      params.append('yearAndMonth', this.formStateMonthSalaryOffer.yearAndMonth || '');
      this.monthSalaryIsLoading = true;
      try {
        const res = await fetchApi.queryOutsourceMonthSalary(params);
        if (res.code == 1) {
          this.monthSalaryIsLoading = false;
          const totalNum = res.info.totalNum;
          this.outsourceMonthSalaryOfferList = res.info.pager.list as OutsourceMonthSalaryItem[];
          this.outsourceMonthSalaryOfferList.push(totalNum);
          this.pageOutsourceMonthSalaryOfferList = {
            pageNumber: res.info.pager.pageNumber,
            pageSize: res.info.pager.pageSize,
            total: res.info.pager.totalCount,
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
      this.outsourceContractForm = {
        ...this.outsourceContractForm,
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
        formData.append('id', this.outsourceContractForm.id?.toString() || '');
        formData.append(
          'personId',
          this.outsourceContractForm.personId?.toString() ||
            this.outsourcePersonDetail.id?.toString() ||
            '',
        );
        formData.append('signType', this.outsourceContractForm.signType || '');
        formData.append('contractType', this.outsourceContractForm.contractType || '');
        formData.append('signCompany', this.outsourceContractForm.signCompany || '');
        formData.append('signDate', this.outsourceContractForm.signDate || '');
        formData.append('startDate', this.outsourceContractForm.startDate || '');
        formData.append(
          'endDate',
          this.outsourceContractForm.contractCycle == '长期'
            ? ''
            : this.outsourceContractForm.endDate || '',
        );
        formData.append('contractCycle', this.outsourceContractForm.contractCycle || '');
        formData.append('offerTime', this.outsourceContractForm.offerTime || '');
        formData.append('offerSign', this.outsourceContractForm.offerSign || '');
        formData.append('contractFlag', this.outsourceContractForm.contractFlag || '');
        formData.append('contractStatus', this.outsourceContractForm.contractStatus || '');
        formData.append('loseReason', this.outsourceContractForm.loseReason || '');
        formData.append('loseDate', this.outsourceContractForm.loseDate || '');
        const res = await fetchApi.addOutsourcePersonContract(formData);
        if (res.code == 1) {
          //this.queryOutsourcePersonContract();
          this.queryOutsourcePerson();
          this.handleSearchOutsourcePersonProcess();
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
        formData.append('personId', this.outsourcePersonDetail.id?.toString() || '');
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
        currentStatus: '2',
        realEntryTime: this.outsourcePersonDetail.planEntryTime
          ? formatToDate(this.outsourcePersonDetail.planEntryTime)
          : '',
      };
    },
    /**
     * 新增修改外包人员基本信息
     */
    async addUpdateOutsourceBasic() {
      const formData = new FormData();
      formData.append('id', this.outsourceBasicForm.id?.toString() || '');
      formData.append('rId', this.outsourceBasicForm.rId?.toString() || '');
      formData.append('jobType', this.outsourceBasicForm.jobType || '');
      formData.append('jobNumber', this.outsourceBasicForm.jobNumber || '');
      formData.append('planEntryTime', this.outsourceBasicForm.planEntryTime || '');
      formData.append('realEntryTime', this.outsourceBasicForm.realEntryTime || '');
      formData.append('planLeaveTime', this.outsourceBasicForm.planLeaveTime || '');
      formData.append('realLeaveTime', this.outsourceBasicForm.realLeaveTime || '');
      formData.append('offerTime', this.outsourceBasicForm.offerTime || '');
      formData.append('currentStatus', this.outsourceBasicForm.currentStatus || '');
      formData.append('mId', this.outsourceBasicForm.mId?.toString() || '');
      formData.append('market', this.outsourceBasicForm.market || '');
      formData.append('userNameEn', this.outsourceBasicForm.userNameEn || '');
      formData.append('haveZhao', this.outsourceBasicForm.haveZhao || '');
      const res = await fetchApi.addUpdateOutsourceBasic(formData);
      if (res.code == 1) {
        this.outsourcePersonDetail = {
          ...this.outsourceBasicForm,
        };
        this.queryOutsourcePerson();
        this.handleSearchOutsourcePersonProcess();
        this.queryOutsourcePersonByPhone(this.outsourceBasicForm.phoneNumber);
      }
      return res;
    },
    async addOutsourceBasic() {
      const formData = new FormData();
      formData.append('userNameCn', this.addOutsourcePersonForm.userNameCn || '');
      formData.append('userNameEn', this.addOutsourcePersonForm.userNameEn || '');
      formData.append('headPhoto', this.addOutsourcePersonForm.headPhoto || '');
      formData.append('sex', this.addOutsourcePersonForm.sex || '');
      formData.append('age', this.addOutsourcePersonForm.age || '');
      formData.append('phoneNumber', this.addOutsourcePersonForm.phoneNumber || '');
      formData.append('email', this.addOutsourcePersonForm.email || '');
      formData.append('companyName', this.addOutsourcePersonForm.companyName || '');
      formData.append('city', this.addOutsourcePersonForm.city || '');
      formData.append('recruitParty', this.addOutsourcePersonForm.recruitParty || '');
      formData.append('mId', this.addOutsourcePersonForm.mId?.toString() || '');
      formData.append('market', this.addOutsourcePersonForm.market || '');
      formData.append('positionId', this.addOutsourcePersonForm.positionId || '');
      formData.append('positions', this.addOutsourcePersonForm.positions || '');
      formData.append('bId', this.addOutsourcePersonForm.bId?.toString() || '');
      formData.append('brand', this.addOutsourcePersonForm.brand || '');
      formData.append('recommendCounselor', this.addOutsourcePersonForm.recommendCounselor || '');
      formData.append(
        'recommendRecruitId',
        this.addOutsourcePersonForm.recommendRecruitId?.toString() || '',
      );
      formData.append('counselor', this.addOutsourcePersonForm.counselor || '');
      formData.append('recruitId', this.addOutsourcePersonForm.recruitId?.toString() || '');
      formData.append('serviceCounselor', this.addOutsourcePersonForm.serviceCounselor || '');
      formData.append(
        'serviceRecruitId',
        this.addOutsourcePersonForm.serviceRecruitId?.toString() || '',
      );
      formData.append('jobType', this.addOutsourcePersonForm.jobType || '');
      formData.append('jobNumber', this.addOutsourcePersonForm.jobNumber || '');
      formData.append('planEntryTime', this.addOutsourcePersonForm.planEntryTime || '');
      formData.append('realEntryTime', this.addOutsourcePersonForm.realEntryTime || '');
      formData.append('planLeaveTime', this.addOutsourcePersonForm.planLeaveTime || '');
      formData.append('offerTime', this.addOutsourcePersonForm.offerTime || '');
      formData.append('currentStatus', this.addOutsourcePersonForm.currentStatus || '');
      formData.append('resumeId', this.addOutsourcePersonForm.resumeId?.toString() || '');
      const res = await fetchApi.addOutsourceBasic(formData);
      if (res.code == 1) {
        this.addOutsourcePersonForm = {} as OutsourcePersonItem;
        this.queryOutsourcePerson();
      }
      return res;
    },
    /**
     * 查询外包人员薪资
     */
    async queryOutsourceLeijiChae(personId?: string, jinXinMonth?: string) {
      try {
        const formData = new FormData();
        formData.append('personId', personId || '');
        formData.append('jinxinMonth', jinXinMonth || '');
        const res = await fetchApi.queryOutsourceLeijiChae(formData);
        return res;
      } catch (error) {
        return null;
      }
    },
    /**
     * 查询外包人员薪资
     */
    async queryOutsourceSalaryByPersonId(personId?: string, jinXinMonth?: string) {
      try {
        const formData = new FormData();
        formData.append('personId', personId || this.outsourcePersonDetail.id?.toString() || '');
        formData.append('jinXinMonth', jinXinMonth || '');
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
        formData.append('personId', this.outsourcePersonDetail.id?.toString() || '');
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
        const shebaoDetail =
          this.outsourceSocialSecurityDetailList.length > 0
            ? this.outsourceSocialSecurityDetailList[0]
            : {};
        this.outsourceSalaryForm = {
          ...this.outsourceSalaryForm,
          personId:
            this.outsourceSalaryForm.personId || this.outsourcePersonDetail.id?.toString() || '',
          currentPositionId:
            this.outsourceSalaryForm.currentPositionId ||
            this.outsourcePersonDetail.positionId?.toString() ||
            '',
          currentPosition:
            this.outsourceSalaryForm.currentPosition || this.outsourcePersonDetail.positions || '',
          companyShebao: shebaoDetail?.companyTotal?.toString() || '',
          personShebao: shebaoDetail?.personTotal?.toString() || '',
          companyYijin: shebaoDetail?.yijinCompany?.toString() || '',
          personYijin: shebaoDetail?.yijinPerson?.toString() || '',
          keShangbao: shebaoDetail?.keShangbao?.toString() || '',
          shiShangbao: shebaoDetail?.shiShangbao?.toString() || '',
        };
        const res = await fetchApi.addOutsourceSalaryByPerson(this.outsourceSalaryForm);
        if (res.code == 1) {
          this.queryOutsourceSalaryByPersonId();
          this.handleSearchOutsourcePersonProcess();
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
      };
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
          this.handleSearchOutsourcePersonProcess();
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
        formData.append('city', this.outsourceSocialSecurityForm.shebaoCity || '');
        formData.append(
          'time',
          this.outsourceSocialSecurityForm.shebaoShijiaoTime ||
            this.outsourceSocialSecurityForm.shebaoYujiaoTime ||
            currentDate(),
        );
        const res = await fetchApi.queryOutsourceShebaoContractRates(formData);
        if (res.code == 1) {
          this.outsourceSocialSecurityContractRatesList =
            res.info as OutsourceSheBaoContractRatesItem[];
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
      formData.append('jobType', '外包');
      const res = await fetchApi.queryCompanyAll(formData);
      if (res) {
        // save token
        this.outsourceCompanyAll = res.info;
      }
      return res;
    },
    async queryCompanyBrand(companyName: string) {
      const formData = new FormData();
      formData.append('companyName', companyName);
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
    async queryOutsourceShebaoCollect(year?: string, yearAndMonth?: string) {
      const outsourceShebaoCollectForm = new FormData();
      outsourceShebaoCollectForm.append('year', year || '');
      outsourceShebaoCollectForm.append('yearAndMonth', yearAndMonth || '');
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
      formData.append('yearAndMonth', yearAndMonth || '');
      formData.append('companyName', companyName || '');
      formData.append('checkFlag', '2');
      formData.append('SystemRecruitId', loginVueUser.loginId);
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
      formData.append('city', city || '');
      formData.append('pageNumber', '1');
      formData.append('pageSize', '1000');
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
      formData.append('city', city || '');
      formData.append('pageNumber', '1');
      formData.append('pageSize', '1000');
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
        startTime: this.outsourceSocialSecurityInfoForm.startTime
          ? this.outsourceSocialSecurityInfoForm.startTime + '-01'
          : '',
        issueTime: this.outsourceSocialSecurityInfoForm.issueTime
          ? this.outsourceSocialSecurityInfoForm.issueTime + '-01'
          : '',
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
        startTime: this.outsourceSocialSecurityInfoForm.startTime
          ? this.outsourceSocialSecurityInfoForm.startTime + '-01'
          : '',
        issueTime: this.outsourceSocialSecurityInfoForm.issueTime
          ? this.outsourceSocialSecurityInfoForm.issueTime + '-01'
          : '',
        updateUser: loginVueUser.loginName || '',
      };
      const res = await fetchApi.addOutsourceInfo(this.outsourceSocialSecurityInfoForm);
      if (res) {
        this.queryOutsourceShebaoInfo();
      }
      return res;
    },
    handleNewJoinerPersonalInformationForm(record: OutsourcePersonItem) {
      this.newJoinerPersonalInformationFormTemp = {
        ...record,
      };
    },
    handleContractInfomationForm(record: OutsourcePersonItem) {
      this.contractInfomationFormTemp = {
        ...record,
      };
    },
    /**
     * 根据resumeId查询工作经历
     */
    async handleQueryWorkByResumeId(resumeId) {
      const formData = new FormData();
      formData.append('resumeId', resumeId || '');
      const res = await fetchApi.handleQueryWorkByResumeId(formData);
      return res;
    },
    /**
     * 根据手机号查询简历基础信息
     */
    async queryOutsourcePersonMsg(phoneNumber) {
      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber || '');
      const res = await fetchApi.queryOutsourcePersonMsg(formData);
      return res;
    },
    async queryMarkListSearch(city = '', marketName = '') {
      let formData = new FormData();
      formData.append('city', city);
      formData.append('marketName', marketName || '');
      formData.append('curPage', '1');
      const res = await fetchApi.queryMarkList(formData);
      if (res.info) {
        this.markIdList = res.info;
      }
      return res;
    },
    async queryCounselorList() {
      const res = await fetchApi.queryCounselorList();
      if (res.info) {
        this.counselorList = res.info;
      }
      return res;
    },
    /**
     * 查询签署模板列表
     * @param ruCompanyName
     * @returns
     */
    async queryEsignTemplateList(ruCompanyName: string) {
      const formData = new FormData();
      formData.append('pageNumber', '1');
      formData.append('pageSize', '50');
      formData.append('ruCompanyName', ruCompanyName);
      formData.append('status', '1');
      const res = await fetchApi.queryEsignTemplateList(formData);
      if (res.info) {
        this.esignTemplateList = res.info?.data?.signTemplates;
      }
      return res;
    },
    /**
     * 查询签署模板列表
     * @param ruCompanyName
     * @returns
     */
    async queryEsignTemplateDetail(ruCompanyName: string, templateId: string) {
      if (!ruCompanyName || !templateId) {
        this.esignTemplateDetail = {};
        return;
      }
      const formData = new FormData();
      formData.append('templateId', templateId);
      formData.append('ruCompanyName', ruCompanyName);
      const res = await fetchApi.queryEsignTemplateDetail(formData);
      if (res.info) {
        this.esignTemplateDetail = res.info?.data;
      }
      return res;
    },
    /**
     * 查询经办人信息
     * @param ruCompanyName
     * @returns
     */
    async handleChangePsnAccount(ruCompanyName: string, psnAccount: string) {
      if (!ruCompanyName || !psnAccount) {
        this.esignTemplatePsnAccount = {};
        return;
      }
      const formData = new FormData();
      formData.append('psnAccount', psnAccount);
      formData.append('ruCompanyName', ruCompanyName);
      const res = await fetchApi.handleChangePsnAccount(formData);
      if (res.info) {
        this.esignTemplatePsnAccount = res.info?.data;
      }
      return res;
    },
    /**
     * 签署模板拟定合同
     * @param data TemplateDetail
     * @returns
     */
    async queryEsignTemplateBySign(TemplateDetail) {
      const res = await fetchApi.queryEsignTemplateBySign(TemplateDetail);
      return res;
    },
    /**
     * 签署模板离职申请
     * @param data TemplateDetail
     * @returns
     */
    async queryEsignTemplateBySignLeave(TemplateDetail) {
      const res = await fetchApi.queryEsignTemplateBySignLeave(TemplateDetail);
      return res;
    },
    /**
     * 更新外包人员信息表
     * @param data OfferOutsourcePerson
     * @returns
     */
    async updateOutsourcePersonMsg(TemplateDetail) {
      const res = await fetchApi.updateOutsourcePersonMsg(TemplateDetail);
      return res;
    },
    /**
     * 查询外包公司公式详情
     */
    async queryOutsourceFormula(
      companyName?: string,
      bId?: string,
      city?: string,
      jobType?: string,
      city2?: string,
    ) {
      const formData = new FormData();
      formData.append('companyName', companyName || '');
      formData.append('pageNumber', this.pageOutsourceFormulaList.pageNumber.toString() || '1');
      formData.append('pageSize', this.pageOutsourceFormulaList.pageSize.toString() || '10');
      formData.append('bId', bId || '');
      formData.append('city', city || ''); //匹配公司公式
      formData.append('jobType', jobType || '');
      formData.append('city2', city2 || ''); //搜索条件使用
      const res = await fetchApi.queryOutsourceFormula(formData);
      if (res.info) {
        this.outsourceFormulaList = res.info?.list || [];
        this.pageOutsourceFormulaList = {
          pageNumber: res.info.pageNumber,
          pageSize: res.info.pageSize,
          total: res.info.totalCount,
        } as PageItem;
      }
      return res;
    },
    /**
     * 删除外包公司公式详情
     */
    async deleteOutsourceFormula(id: string) {
      const formData = new FormData();
      formData.append('id', id || '');
      const res = await fetchApi.deleteOutsourceFormula(formData);
      if (res.code === 1) {
        this.queryOutsourceFormula();
      }
      return res;
    },
    /**
     * 添加或更新外包公司公式详情
     */
    async addUpdateOutsourceFormula(outsourceFormula: OutsourceFormulaItem) {
      const res = await fetchApi.addUpdateOutsourceFormula(outsourceFormula);
      if (res.code === 1) {
        this.queryOutsourceFormula();
      }
      return res;
    },
    /**
     * 查询外包公司年度薪资
     */
    async queryOutsourceYearTotalPre(personId: string, jinxinMonth: string) {
      const formData = new FormData();
      formData.append('personId', personId || '');
      formData.append('jinxinMonth', jinxinMonth || '');
      const res = await fetchApi.queryOutsourceYearTotalPre(formData);
      return res;
    },
    /**
     * 添加或更新外包公司月度薪资
     */
    async addUpdateOutsourceSalaryMonth(outsourceSalaryMonth: OutsourceMonthSalaryItem) {
      const res = await fetchApi.addUpdateOutsourceSalaryMonth(outsourceSalaryMonth);
      return res;
    },
    /**
     * 添加或更新外包公司年度薪资
     */
    async addUpdateOutsourceSalaryMonthYearlPre(outsourceSalaryMonthYear) {
      const formData = new FormData();
      formData.append('personId', outsourceSalaryMonthYear.personId || '');
      formData.append('jinxinMonth', outsourceSalaryMonthYear.jinxinMonth || '');
      formData.append('yearShebaoPre', outsourceSalaryMonthYear.yearShebaoPre || '');
      formData.append('yearGeshuiPre', outsourceSalaryMonthYear.yearGeshuiPre || '');
      formData.append('yearMianzhengPre', outsourceSalaryMonthYear.yearMianzhengPre || '');
      formData.append('yearTaxPre', outsourceSalaryMonthYear.yearTaxPre || '');
      formData.append('yearZhuankouPre', outsourceSalaryMonthYear.yearZhuankouPre || '');
      const res = await fetchApi.addUpdateOutsourceSalaryMonthYearlPre(formData);
      return res;
    },
    /**
     * 信息表签署
     */
    async personMessageEsign(personMessage) {
      console.log(personMessage);
      const formData = new FormData();
      formData.append('personId', personMessage.personId || '');
      formData.append('createTime', personMessage.createTime || '');
      formData.append('idCard', personMessage.idCard || '');
      formData.append('realNameCn', personMessage.realNameCn || '');
      formData.append('phoneNum', personMessage.phoneNum || '');
      formData.append('pdfUrl', personMessage.pdfUrl || '');
      formData.append('ruCompanyName', personMessage.ruCompanyName || '');
      formData.append('fileName', personMessage.fileName || '');
      formData.append('fileSize', personMessage.fileSize || '');
      formData.append('X1', personMessage.X1 || '');
      formData.append('Y1', personMessage.Y1 || '');
      formData.append('X2', personMessage.X2 || '');
      formData.append('Y2', personMessage.Y2 || '');
      formData.append('X3', personMessage.X3 || '');
      formData.append('Y3', personMessage.Y3 || '');
      formData.append('X4', personMessage.X4 || '');
      formData.append('Y4', personMessage.Y4 || '');
      formData.append('pageNum1', personMessage.pageNum1 || '');
      formData.append('pageNum2', personMessage.pageNum2 || '');
      formData.append('pageNum3', personMessage.pageNum3 || '');
      formData.append('pageNum4', personMessage.pageNum4 || '');
      const res = await fetchApi.personMessageEsign(formData);
      if (res.code === 1) {
        this.handleSearchOutsourcePersonProcess();
      }
      return res;
    },
    /**
     * 信息表签署文件上传
     */
    async uploadMessageEsignFile(file) {
      const formData = new FormData();
      formData.append('file', file || '');
      const res = await fetchApi.uploadMessageEsignFile(formData);
      return res;
    },
    /**
     * 同步简历名称
     */
    async updateUserName(resumeId: string, rId?: string) {
      const formData = new FormData();
      formData.append('resumeId', resumeId || '');
      formData.append('rId', rId || '');
      const res = await fetchApi.updateUserName(formData);
      return res;
    },
    /**
     * 文件预览
     * @param originalPathBlobPath 文件路径
     */
    handleFileYulanInfo(originalPathBlobPath: string, orginalPathBlobType: number) {
      this.orginalPathBlobPathFlag = true;
      this.orginalPathBlobPath = originalPathBlobPath;
      this.orginalPathBlobType = orginalPathBlobType;
    },
    /**
     * 查外包人员入离职流程
     */
    async handleSearchOutsourcePersonProcess() {
      const params = new FormData();
      params.append('pageNumber', this.pageOutsourcePersonProcessList.pageNumber.toString());
      params.append('pageSize', this.pageOutsourcePersonProcessList.pageSize.toString());
      params.append('liucheng ', '1');
      try {
        const res = await fetchApi.queryOutsourcePerson(params);
        if (res.code == 1) {
          this.outsourcePersonProcessList = res.info.pager.list as OutsourcePersonItem[];
          this.pageOutsourcePersonProcessList = {
            pageNumber: res.info.pager.pageNumber,
            pageSize: res.info.pager.pageSize,
            total: res.info.pager.totalCount,
          } as PageItem;
        }
        return res;
      } catch (error) {
        this.personIsLoading = false;
        return null;
      }
    },
    /**
     * 外包人员请款单
     */
    async outsourcePersonMoney(outsourcePersonMoney) {
      const formData = new FormData();
      formData.append('yearAndMonth', outsourcePersonMoney.yearAndMonth || '');
      formData.append('companyName', outsourcePersonMoney.companyName || '');
      const res = await fetchApi.outsourcePersonMoney(formData);
      if (res.code == 1) {
        this.offerOutsourceMonthSalary = res.info
          .offerOutsourceMonthSalary as OutsourceMonthSalaryItem[];
        this.offerOutsourceSheBao = res.info.offerOutsourceSheBao as OutsourceSheBaoItem[];
      }
      return res;
    },
    /**
     * 外包人员更新店铺简称
     */
    async updateOutsourcePersonMarketName(outsourcePerson: OutsourcePersonItem) {
      const formData = new FormData();
      formData.append('companyName', outsourcePerson.companyName || '');
      formData.append('bId', outsourcePerson?.bId.toString() || '');
      formData.append('mId', outsourcePerson?.mId.toString() || '');
      formData.append('mkName', outsourcePerson.mkName || '');
      formData.append('marketName', outsourcePerson?.market.toString() || '');
      const res = await fetchApi.outsourcePersonMarketName(formData);
      return res;
    },
    async handleOutsourceMonthSalaryOfferAllocation(record) {
      this.outsourcePersonPerformanceDetailFlag = true;
      this.outsourcePersonPerformanceDetail = record as OutsourceMonthSalaryItem;
      const formData = new FormData();
      formData.append('personId', record.personId || '');
      formData.append('jinxinMonth', record.jinxinMonth || '');
      const resPerson = await fetchApi.queryOutsourcePersonByPersonId(formData);
      if (resPerson.code == 1) {
        this.outsourcePersonPerformanceDetailPersonInfo = resPerson.info as OutsourcePersonItem[];
      }
      const resSalary = await fetchApi.queryOutsourceSalaryByPersonId(formData);
      if (resSalary.code == 1) {
        this.outsourcePersonPerformanceDetailSalaryInfo = resSalary.info as OutsourceSalaryItem[];
      }
      const resAttend = await fetchApi.queryOutsourceAttendMonthPersonId(formData);
      if (resAttend.code == 1) {
        this.outsourcePersonPerformanceDetailAttendInfo = resAttend.info as OutsourceAttendItem[];
      }
      const resSheBao = await fetchApi.queryOutsourceShebaoByPersonId(formData);
      if (resSheBao.code == 1) {
        this.outsourcePersonPerformanceDetailSheBaoInfo =
          resSheBao.info as OutsourceShebaoInfoItem[];
      }
    },
  },
});

export function useOutsourceDetailStoreWithOut() {
  return useOutsourceDetailStore(store);
}
