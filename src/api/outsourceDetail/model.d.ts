/**
 * 外包个人信息
 */
export interface OutsourcePersonItem {
  id: number;
  rId: number;
  cId: number;
  userNameCn: string;
  userNameEn: string;
  currentStatus: string;
  headPhoto: string;
  city: string;
  companyName: string;
  jobType: string;
  recruitParty: string;
  sex: string;
  bId: number;
  brand: string;
  jobNumber: string;
  mId: string;
  market: string;
  mkName: string;
  positionId: string;
  positions: string;
  pId: number;
  recommendCounselor: string;
  counselor: string;
  recommendRecruitId: number;
  recruitId: number;
  serviceRecruitId: number;
  serviceCounselor: string;
  offerPic: string;
  offerFlag: string;
  infoTableFlag: string;
  infoTablePath: string;
  salaryStructure: string;
  contractCompany: string;
  contractPeriod: string;
  startTime: string;
  endTime: string;
  offerTime: string;
  planEntryTime: string;
  realEntryTime: string;
  planLeaveTime: string;
  realLeaveTime: string;
  proofFlag: string;
  socialFlag: string;
  yijinFlag: string;
  shangbaoFlag: string;
  socialCompany: string;
  annualLeave: number;
  annualLeaveUsed: number;
  annualLeaveBalance: number;
  yujiaoTime: string;
  yutingTime: string;
  paymentYearMonth: string;
  prestopYearMonth: string;
  phoneNumber: string;
  email: string;
  idCard: string;
  noCriminal: string;
  leaveProve: string;
  birthYear: string;
  bornMonth: string;
  newOfferTime: string;
  newPredictEntryTime: string;
  resumeId: number;
  age: string;
  workCity: string;
  socialCity: string;
  taxCity: string;
  department: string;
  placeOfBirth: string;
  ethnic: string;
  politicsStatus: string;
  highestStandard: string;
  healthCondition: string;
  placeOfDomicile: string;
  martialStatus: string;
  censusRegister: string;
  criminalRecord: string;
  emergencyContact: string;
  emergencyMobile: string;
  emergencyRelationshiip: string;
  isDismissed: string;
  dismissedReason: string;
  isNonCompete: string;
  documentAddress: string;
  livingAddress: string;
  offerOutsourceWorks: any[];
  offerOutsourceFamilies: any[];
  signOfferType: string;
  shixiStartTime: string;
  shixiEndTime: string;
  signBaseMoney: string;
  signEndTime: string;
  shixiBaseMoney: string;
  faxinDay: string;
  contractPath: string;
  leavePath: string;
  idPhotoFan: string;
  idPhotoZheng: string;
  allowance: string;
  haveZhao: string;
}
//业绩分配详情
export interface OfferDetailsItem {
  collectId: string;
  personId: string;
  monthSalaryId: string;
  goodNewsTime: string;
  recruitId: string;
  counselor: string;
  teamId: string;
  teamName: string;
  taxIncluded: string;
  money: string;
  ratio: string;
  offerNum: string;
  orderType: string;
  isMain: string;
  outFlag: string;
  manageChargeTax: string;
  manageChargeRate: string;
  manageChargeAfter: string;
  zhuanChargeTax: string;
  zhuanChargeRate: string;
  zhuanChargeAfter: string;
}
/**
 * 外包查询个人信息
 */
export interface SearchPersonItem {
  city: string;
  bId: string;
  currentStatus: string;
  positionId: string;
  userName: string;
  companyArrange: string;
  jobType: string;
  companyName: string;
  bankNum: string;
}
/**
 * 外包外包月度薪资
 */
export interface SearchSalaryItem {
  city: string;
  bId: string;
  currentStatus: string;
  positionId: string;
  userName: string;
  jobType: string;
  companyArrange: string;
  companyName: string;
}
/**
 * 外包薪资
 */
export interface OutsourceSalaryItem {
  id: string;
  userNameCn: string;
  userNameEn: string;
  currentStatus: string;
  city: string;
  companyName: string;
  jobType: string;
  recruitParty: string;
  personId: string;
  startTime: string;
  endTime: string;
  dixin: string;
  canbu: string;
  jintie: string;
  quanqin: string;
  geti: string;
  tuanti: string;
  teshu: string;
  jili: string;
  dacheng: string;
  thirteenthSalary: string;
  yearEndBouns: string;
  zonghe: string;
  shangbao: string;
  companyTotal: string;
  personTotal: string;
  shebaoStandard: string;
  yanglaoJishu: string;
  shiyeJishu: string;
  yiliaoJishu: string;
  dabingJishu: string;
  gongshangJishu: string;
  shengyuJishu: string;
  yijinStandard: string;
  yijinJishu: string;
  workCity: string;
  socialCity: string;
  taxCity: string;
  changeReason: string;
  currentPosition: string;
  currentPositionId: string;
  changeTime: string;
  unit: string;
  companyShebao: string;
  personShebao: string;
  companyYijin: string;
  personYijin: string;
  keShangbao: string;
  shiShangbao: string;
  bankName: string;
  bankCard: string;
}
/**
 * 外包外包社保
 */
export interface SearchSheBaoItem {
  city: string;
  bId: string;
  currentStatus: string;
  positionId: string;
  userName: string;
  jobType: string;
  companyArrange: string;
  companyName: string;
  shebaoCompany: string;
  yearAndMonth: string;
}
/**
 * 外包社保
 */
export interface OutsourceSheBaoItem {
  id?: number;
  shebaoSign?: string;
  userNameCn?: string;
  userNameEn?: string;
  currentStatus?: string;
  city?: string;
  companyName?: string;
  jobType?: string;
  recruitParty?: string;
  personId?: number;
  companyTotal?: number;
  personTotal?: number;
  buchaMoney?: number;
  shangbao?: number;
  shebaoStandard?: string;
  yanglaoJishu?: number;
  yanglaoCompany?: number;
  yanglaoPerson?: number;
  shiyeJishu?: number;
  shiyeCompany?: number;
  shiyePerson?: number;
  yiliaoJishu?: number;
  yiliaoCompany?: number;
  yiliaoPerson?: number;
  dabingJishu?: number;
  dabingCompany?: number;
  dabingPerson?: number;
  gongshangJishu?: number;
  gongshangCompany?: number;
  shengyuJishu?: number;
  shengyuCompany?: number;
  yijinStandard?: string;
  yijinJishu?: number;
  yijinRate?: number;
  yijinCompany?: number;
  yijinPerson?: number;
  effectiveDate?: Date;
  shebaoCity?: string;
  shebaoCompany?: string;
  serviceMoney?: string;
  shangbaoProject?: string;
  keShangbao?: number;
  shiShangbao?: number;
  shebaoStatus?: string;
  yijinStatus?: string;
  shangbaoStatus?: string;
  shebaoShijiJishu?: number;
  yijinShijiJishu?: number;
  shebaoZuidiJishu?: number;
  yijinZuidiJishu?: number;
  yijinJiaoCompany?: string;
  shangbaoJiaoCompany?: string;
  shebaoYujiaoTime?: string;
  yijinYujiaoTime?: string;
  shangbaoYujiaoTime?: string;
  shebaoShijiaoTime?: string;
  yijinShijiaoTime?: string;
  shangbaoShijiaoTime?: string;
  shebaoYutingTime?: string;
  yijinYutingTime?: string;
  shangbaoYutingTime?: string;
  shebaoShitingTime?: string;
  yijinShitingTime?: string;
  shangbaoShitingTime?: string;
  yanglaoCompanyJishu?: number;
  yanglaoRate?: number;
  yanglaoCompanyRate?: number;
  shiyeCompanyJishu?: number;
  shiyeRate?: number;
  shiyeCompanyRate?: number;
  yiliaoCompanyJishu?: number;
  yiliaoRate?: number;
  yiliaoCompanyRate?: number;
  dabingCompanyJishu?: number;
  dabingRate?: number;
  dabingCompanyRate?: number;
  gongshangCompanyRate?: number;
  shengyuCompanyRate?: number;
  yijinCompanyJishu?: number;
  yijinCompanyRate?: number;
  yearAndMonth?: string;
  checkFlag?: string;
  checkTime?: string;
  checkUser?: string;
}
/**
 * 外包社保汇总详情项
 */
export interface OutsourceSheBaoDetailItem {
  yijinCompany: number;
  shebaoCompany: number;
  shebaoPerson: number;
  yearAndMonth: string;
  companyTotal: number;
  personNum: number;
  personTotal: number;
  serviceMoney: string | number;
  shebaoCompany?: string;
  yijinPerson: number;
  checkFlag: string;
}

/**
 * 外包社保汇总信息
 */
export interface OutsourceSheBaoCollectItem {
  companyTotal: number;
  detaillist: OutsourceSheBaoDetailItem[];
  personNum: number;
  personTotal: number;
  serviceMoney: string | number;
  shebaoCompany: number;
  shebaoPerson: number;
  yearAndMonth: string;
  yijinCompany: number;
  yijinPerson: number;
  checkFlag: string;
}
/**
 * 外包外包月度薪资
 */
export interface SearchMonthSalaryItem {
  city: string;
  bId: string;
  currentStatus: string;
  positionId: string;
  userName: string;
  jobType: string;
  companyArrange: string;
  companyName: string;
  shebaoCompany: string;
  yearAndMonth: string;
}
/**
 * 外包月度薪资
 */
export interface OutsourceMonthSalaryItem {
  // 基本信息
  id?: string;
  bId?: string;
  brand?: string;
  companyName?: string;
  city?: string;
  jobType?: string;
  positions?: string;
  recruitParty?: string;
  userNameCn?: string;
  userNameEn?: string;
  sign?: string;
  personId?: number;
  zhanDanMonth?: string;
  mkName?: string;
  shangBao?: number;

  // 时间相关
  jinxinMonth?: string; // 时间戳
  entryTime?: string; // 可为null
  leaveTime?: string; // 可为null
  newOfferTime?: string; // 可为null
  newPredictEntryTime?: string; // 可为null
  realEntryTime?: string; // 可为null
  realLeaveTime?: string; // 可为null

  // 薪资相关
  biaozhunGongshi?: string;
  biaozhunSalary?: string;
  chuqinSalary?: string;
  jiabanSalary?: string;
  yuguGongshi?: string;
  tiaochaTotal?: string;

  // 各项津贴和调整
  canbu?: string;
  canbuTiaocha?: string;
  jintie?: string;
  jintieTiaocha?: string; // 可为null
  quanqin?: string;
  quanqinTiaocha?: string; // 可为null
  salaryTiaocha?: string;

  // 加班相关
  fadingJiaban?: string;
  zhengchangJiaban?: string;
  xiuxiJiaban?: string; // 可为null

  // 各项可能为null的值
  bebyueShiji?: string; // 可为null
  benyueChae?: string; // 可为null
  bingjia?: string; // 可为null
  chidao?: string; // 可为null
  dabing?: string; // 可为null
  dacheng?: string; // 可为null
  thirteenthSalary?: string; // 可为null
  yearEndBouns?: string; // 可为null
  daixin?: string; // 可为null
  fangdaiLixi?: string; // 可为null
  fangzu?: string; // 可为null
  geti?: string; // 可为null
  jili?: string; // 可为null
  jixuJiaoyu?: string; // 可为null
  leijiChae?: string; // 可为null
  jiangjinTotal?: string; // 可为null
  baodiJiangjin?: string; // 可为null
  markTarget?: string; // 可为null
  markTidian?: string; // 可为null
  markYingshou?: string; // 可为null
  marketDachengRate?: string; // 可为null
  geshuiCha?: string; // 可为null
  monthGeshui?: string; // 可为null
  monthMianzheng?: string; // 可为null
  monthShebao?: string; // 可为null
  monthTax?: string; // 可为null
  monthZhuankou?: string; // 可为null
  personDachengRate?: string; // 可为null
  personTarget?: string; // 可为null
  personTidian?: string; // 可为null
  personYingshou?: string; // 可为null
  salaryAfterTax?: string; // 可为null
  shangyangFumu?: string; // 可为null
  shangyueShiji?: string; // 可为null
  shangyueYugu?: string;
  shijia?: string; // 可为null
  shiye?: string; // 可为null
  shouxuMoney?: string; // 可为null
  teshu?: string; // 可为null
  tuanti?: string; // 可为null
  yanglao?: string; // 可为null
  yearGeshui?: string; // 可为null
  yearMianzheng?: string; // 可为null
  yearShebao?: string; // 可为null
  yearTax?: string; // 可为null
  yearZhuankou?: string; // 可为null
  yijin?: string; // 可为null
  yiliao?: string; // 可为null
  zinvJiaoyu?: string; // 可为null

  // 状态
  currentStatus: string;
  //业绩分配
  companyShebao?: string;//公司社保金额
  companyYijin?: string;//公司一金金额
  moneyCahrgeTax?: string;//总营收费含税
  moneyCahrgeTaxMoney?: string;//总营收费税金
  moneyCahrgeRate?: string;//总营收费税率
  moneyChargeAfter?: string;//总营收费税后金额
  manageChargeTax?: string;//管理费金额
  manageChargeTaxMoney?: string;//管理费税金
  manageChargeRate?: string;//管理费税率
  manageChargeAfter?: string;//管理费税后金额
  zhuanChargeTax?: string;//转换金额
  zhuanChargeTaxMoney?: string;//转换税金
  zhuanChargeRate?: string;//转换税率
  zhuanChargeAfter?: string;//转换税后金额
  totalCharge?: string;//总收费金额
  welfare?: string;//福利金额
  otherPay?: string;//其他支付金额
  companyShebaoKe?: string;//公司社保金额(客户)
  companyYijinKe?: string;//公司一金金额(客户)
  keShangbao?: string;//商业保险(客户)
  shiShangbao?: string;//实际商业保险
  welfareKe?: string;//福利金额(客户)
  otherPayKe?: string;//其他支付金额(客户)
  manageGongShi?: string;//管理公式
  rMoney?: string;
  rRatio?: string;
  cMoney?: string;
  cRatio?: string;
  dMoney?: string;
  dRatio?: string;
  d2Money?: string;
  d2Ratio?: string;
  d2Ratio?: string;
  fMoney?: string;
  fRatio?: string;
  offerMoneyTax?: string;
  offerMoney?: string;
  recommendRecruitId?: string;
  recommendRealNameEn?: string;
  recruitId?: string;
  realNameEn?: string;
  discoverRecruitId?: string;
  discoverRealNameEn?: string;
  supportRecruitId?: string;
  supportRealNameEn?: string;
  discover2RecruitId?: string;
  discover2RealNameEn?: string;
  serviceRecruitId?: string;
  serviceRealNameEn?: string;
  otherPayKeStr?: string;
  otherPayStr?: string;
  welfareList?: Array<WelfareItem>;
  serviceMoney?: string;//三方服务金额
  chenbenTiaocha?: string;//调差调整金额
  chenbenTiaochaKe?: string;//调差调整金额
  chenbenTiaochaStr?: string;//调差调整金额
  chenbenTiaochaKeStr?: string;//调差调整金额
  otherCha?: string;//其他差额
  offerOutSourceDetails?: OfferDetailsItem[];
  yearShebaoPre?: string;//年社保
  yearGeshuiPre?: string;//年个税
  yearMianzhengPre?: string;//年免征
  yearTaxPre?: string;//年个税
  yearZhuankouPre?: string;//年专扣
  gongziCha?: string;//工资差额
}
//用工成本
export interface CostItem {
  costType: string;
  monthTax?: string;
  companyShebao?: string;
  companyYijin?: string;
  shangbao?: string;
  canBao?: string;
  welfare?: string;
  otherPay?: string;
  chenbenTiaocha?: string;
  serviceMoney?: string;
  costTotal?: string;
  manageGongShi?: string;
  manageChargeTax?: string;
  manageChargeRate?: string;
  manageChargeTaxMoney?: string;
  moneyCahrgeTax?: string;
  zhuanChargeTax?: string;
  zhuanChargeRate?: string;
  zhuanChargeTaxMoney?: string;
  zhuanChargeAfter?: string;
  totalCharge?: string;     
}
//外包用工成本详情
export interface ComprehensiveCostItem {
  userNameCn: string;
  companyName: string;
  brand: string;
  city: string;
  jobType: string;
  currentStatus: string;
  personId: string;
  monthTax: string;
  jinxinMonth: string;
  canBao?: string;//企业残保
  costTotal?: string;//成本总计
  costTotalke?: string;//成本总计
  //业绩分配
  companyShebao?: string;//公司社保金额
  companyYijin?: string;//公司一金金额
  moneyCahrgeTax?: string;//总营收费含税
  moneyCahrgeTaxMoney?: string;//总营收费税金
  moneyCahrgeRate?: string;//总营收费税率
  moneyChargeAfter?: string;//总营收费税后金额
  manageChargeTax?: string;//管理费金额
  manageChargeTaxMoney?: string;//管理费税金
  manageChargeRate?: string;//管理费税率
  manageChargeAfter?: string;//管理费税后金额
  zhuanChargeTax?: string;//转换金额
  zhuanChargeTaxMoney?: string;//转换税金
  zhuanChargeRate?: string;//转换税率
  zhuanChargeAfter?: string;//转换税后金额
  totalCharge?: string;//总收费金额
  welfare?: string;//福利金额
  otherPay?: string;//其他支付金额
  companyShebaoKe?: string;//公司社保金额(客户)
  companyYijinKe?: string;//公司一金金额(客户)
  keShangbao?: string;//商业保险(客户)
  shiShangbao?: string;//实际商业保险
  welfareKe?: string;//福利金额(客户)
  otherPayKe?: string;//其他支付金额(客户)
  manageGongShi?: string;//管理公式
  rMoney?: string;
  rRatio?: string;
  cMoney?: string;
  cRatio?: string;
  dMoney?: string;
  dRatio?: string;
  d2Money?: string;
  d2Ratio?: string;
  d2Ratio?: string;
  fMoney?: string;
  fRatio?: string;
  offerMoneyTax?: string;
  offerMoney?: string;
  recommendRecruitId?: string;
  recommendRealNameEn?: string;
  recruitId?: string;
  realNameEn?: string;
  discoverRecruitId?: string;
  discoverRealNameEn?: string;
  supportRecruitId?: string;
  supportRealNameEn?: string;
  discover2RecruitId?: string;
  discover2RealNameEn?: string;
  serviceRecruitId?: string;
  serviceRealNameEn?: string;
  otherPayKeStr?: string;
  otherPayStr?: string;
  welfareList?: Array<WelfareItem>;
  serviceMoney?: string;//三方服务金额
  chenbenTiaocha?: string;//调差调整金额
  chenbenTiaochaKe?: string;//调差调整金额
  chenbenTiaochaStr?: string;//调差调整金额
  chenbenTiaochaKeStr?: string;//调差调整金额    
}
/**
 * 外包福利
 */
export interface WelfareItem {
  id?: string;
  collectId?: string;
  personId?: string;
  name?: string;
  money?: number;
}
/**
 * 外包分页
 */
export interface PageItem {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * 外包合同
 */
export interface PersonContractItem {
  id?: string; // 有ID更新，没有新增
  personId?: string;
  offerTime?: string;
  offerSign?: string;
  contractType?: string;
  contractFlag?: string;
  signType?: string;
  signCompany?: string;
  signDate?: string;
  startDate?: string;
  endDate?: string;
  contractCycle?: string;
  leaveApply?: string;
  contractStatus?: string;
  loseReason?: string;
  loseDate?: string;
  companyName?: string;
}

export interface OutsourceSheBaoContractRatesItem {
  id?: number;
  personId?: number;
  shebaoCity?: string;
  shebaoCompany?: string;
  yanglaoJishu?: number;
  yanglaoCompany?: number;
  yanglaoPerson?: number;
  shiyeJishu?: number;
  shiyeCompany?: number;
  shiyePerson?: number;
  yiliaoJishu?: number;
  yiliaoCompany?: number;
  yiliaoPerson?: number;
  dabingJishu?: number;
  dabingCompany?: number;
  dabingPerson?: number;
  gongshangJishu?: number;
  gongshangCompany?: number;
  shengyuJishu?: number;
  shengyuCompany?: number;
  addDeleteDay?: string | null;
  addMonth?: string | null;
  bujiao?: string | null;
  city?: string | null;
  cityNum?: number | null;
  companyDabingBase?: number;
  companyDabingRate?: number;
  companyGongshangBase?: number;
  companyGongshangRate?: number;
  companyJiao?: string | null;
  companyShengyuBase?: number;
  companyShengyuRate?: number;
  companyShiyeBase?: number;
  companyShiyeRate?: number;
  companyYanglaoBase?: number;
  companyYanglaoRate?: number;
  companyYijinBase?: number;
  companyYijinRate?: number;
  companyYiliaoBase?: number;
  companyYiliaoRate?: number;
  deleteMonth?: string | null;
  endTime?: number | null;
  handingFee?: string | null;
  isEffect?: string | null;
  personDabingBase?: number;
  personDabingRate?: number;
  personShiyeBase?: number;
  personShiyeRate?: number;
  personYanglaoBase?: number;
  personYanglaoRate?: number;
  personYijinBase?: number;
  personYijinRate?: number;
  personYiliaoBase?: number;
  personYiliaoRate?: number;
  remark?: string | null;
  shangBao?: number | null;
  shebaoBase?: number;
  shiShangBao?: number | null;
  showIndex?: number | null;
  startTime?: number;
  yijinBase?: number;
  yiliaoBase?: number;
}
/**
 * 外包考勤搜索
 */
export interface SearchAttendItem {
  city: string;
  bId: string;
  currentStatus: string;
  positionId: string;
  userName: string;
  jobType: string;
  companyArrange: string;
  companyName: string;
  yearAndMonth: string;
  flag: string;
}
/**
 * 外包考勤
 */
export interface OutsourceAttendItem {
  // 基本信息字段
  id?: number;
  userNameCn?: string;
  userNameEn?: string | null;
  currentStatus?: string;
  city?: string;
  companyName?: string;
  jobType?: string;
  recruitParty?: string;
  personId?: number;

  // 品牌和时间信息
  bId?: string;
  brand?: string;
  yearAndMonth?: string;
  flag?: string;

  AllHours?: string;
  // 工时相关字段
  currentMonthShiHours?: string;
  currentMonthYuHours?: string;
  lastMonthShiHours?: string;
  lastMonthYuHours?: string;

  // 加班相关字段
  overHours?: string;
  overDouble?: string;
  holidayOverHours?: string;
  holidayOverDouble?: string;
  restOverHours?: string;
  restOverDouble?: string;
  otherDaixinHours?: string;
  otherDaixinDouble?: string;

  // 假期相关字段
  hunjiaHours?: string;
  hunjiaDouble?: string;
  nianjianHours?: string;
  nianjianDouble?: string;
  daixinBingjiaHours?: string;
  daixinBingjiaDouble?: string;
  kouxinBingjiaHours?: string;
  kouxinBingjiaDouble?: string;
  sanjiaHours?: string;
  sanjiaDouble?: string;
  shijiaHours?: string;
  shijiaDouble?: string;

  // 其他考勤相关字段
  utHours?: string;
  utDouble?: string;
  lateHours?: string;
  quanqinHours?: string;
  totalChaHours?: string;
  isQuanqin?: string;
  isYugu?: string;

  // 入职相关字段
  newOfferTime?: string;
  newPredictEntryTime?: string;
}
/**
 * 外包 shebao 基础信息
 */
export interface OutsourceShebaoInfoItem {
  id?: number;
  addDeleteDay?: string;
  addMonth?: string;
  bujiao?: string;
  city?: string;
  cityNum?: string;
  companyDabingBase?: string;
  companyDabingRate?: string;
  companyGongshangBase?: string;
  companyGongshangRate?: string;
  companyJiao?: string;
  companyShengyuBase?: string;
  companyShengyuRate?: string;
  companyShiyeBase?: string;
  companyShiyeRate?: string;
  companyYanglaoBase?: string;
  companyYanglaoRate?: string;
  companyYijinBase?: string;
  companyYijinRate?: string;
  companyYiliaoBase?: string;
  companyYiliaoRate?: string;
  deleteMonth?: string;
  issueTime?: string;
  endTime?: string;
  flag?: string;
  handingFee?: string;
  isEffect?: string;
  personDabingBase?: string;
  personDabingRate?: string;
  personShiyeBase?: string;
  personShiyeRate?: string;
  personYanglaoBase?: string;
  personYanglaoRate?: string;
  personYijinBase?: string;
  personYijinRate?: string;
  personYiliaoBase?: string;
  personYiliaoRate?: string;
  remark?: string;
  shangBao?: string;
  shebaoBase?: string;
  shebaoSign?: string;
  shiShangBao?: string;
  showIndex?: string;
  startTime?: string;
  yijinBase?: string;
  yiliaoBase?: string;
  updateTime?: string;
  updateUser?: string;
  jiaoMonth?: string;
}

export interface OfferOutsourceFamilyItem {
  id?: number;
  personId?: number;
  relationship?: string;
  name?: string;
  age?: string;
  companyName?: string;
  position?: string;
  mobile?: string;
}
export interface OfferOutsourceWorkItem {
  id?: number;
  personId?: number;
  startDate?: string;
  endDate?: string;
  companyName?: string;
  position?: string;
  demissionReason?: string;
}
export interface NewJoinerPersonalInfoItem {
  id?: number;
  userNameCn?: string;
  userNameEn?: string;
  idCard?: string;
  sex?: string;
  phoneNumber?: string;
  email?: string;
  position?: string;
  city?: string;
  jobType?: string;
  headPhoto?: string;

  department?: string;
  placeOfBirth?: string;
  ethnic?: string;
  politicsStatus?: string;
  highestStandard?: string;
  martialStatus?: string;
  healthCondition?: string;
  placeOfDomicile?: string;
  censusRegister?: string;
  criminalRecord?: string;
  emergencyContact?: string;
  emergencyMobile?: string;
  emergencyRelationshiip?: string;
  isDismissed?: string;
  dismissedReason?: string;
  isNonCompete?: string;
  documentAddress?: string;
  livingAddress?: string;

  offerOutsourceFamilies: OfferOutsourceFamilyItem[];
  offerOutsourceWorks: OfferOutsourceWorkItem[];
  
  signOfferType: string;
  shixiStartTime: string;
  shixiEndTime: string;
  signBaseMoney: string;
  signEndTime: string;
}

export interface OutsourceFormulaItem {
  id: number; // private Long id;
  companyName: string; // private String companyName;
  bId: number; // private Long bId;
  brand: string; // private String brand;
  mId: string; // private Long mId;
  market: string; // private String market;
  city: string; // private String city;
  jobType: string; // private String jobType;
  startTime: string; // private Date startTime; (使用ISO日期字符串)
  endTime: string; // private Date endTime; (使用ISO日期字符串)
  cycle: string; // private String cycle;
  totalWorkHours: string; // private String totalWorkHours;
  hoursType: string; // private String hoursType;
  dangmonthCha: string; // private String dangmonthCha;
  chuqinSalary: string; // private Double chuqinSalary;
  canbu: string; // private Double canbu;
  jintie: string; // private Double jintie;
  quanqin: string; // private Double quanqin;
  zhengchangJiaban: string; // private Double zhengchangJiaban;
  fadingJiaban: string; // private Double fadingJiaban;
  restJiaban: string; // private Double restJiaban;
  salaryTiaocha: string; // private Double salaryTiaocha;
  canbuTiaocha: string; // private Double canbuTiaocha;
  jintieTiaocha: string; // private Double jintieTiaocha;
  quanqinTiaocha: string; // private Double quanqinTiaocha;
  zhanDanMonth: string; // private String zhanDanMonth;
  kaoQinBiao: string; // private String kaoQinBiao;
  zhanDanRi: string; // private String zhanDanRi;
  xinZiRi: string; // private String xinZiRi;
  nianJia: string; // private String nianJia;
  youzhaoRate: string; // private String youzhaoRate;
  wuzhaoRate: string; // private String wuzhaoRate;
  keZhaoGongShi: string; // private String wuzhaoRate;
  gongZhaoGongShi: string; // private String wuzhaoRate;
  keZhaoGongShiStudent: string; // private String wuzhaoRate;
  gongZhaoGongShiStudent: string; // private String wuzhaoRate;
}

export interface OutsourcePersonMoneyItem {
  companyName?: string;
  yearAndMonth?: string;
}
