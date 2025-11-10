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
  city: string;
  companyName: string;
  jobType: string;
  recruitParty: string;
  sex: string;
  bId: number;
  brand: string;
  jobNumber: string;
  mId: number;
  market: string;
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
  preStopYearMonth: string;
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
}
/**
 * 外包月度薪资
 */
export interface OutsourceMonthSalaryItem {
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
  brand?: string;
  yearAndMonth?: string;
  flag?: string;
  
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
  
  // 新增字段 - 奖金相关
  baodiBouns?: string;
  dachengBouns?: string;
  jiliBouns?: string;
  personBouns?: string;
  specialBouns?: string;
  teamBouns?: string;
  totalBouns?: string;
  
  // 新增字段 - 假期和考勤扩展
  bingjia?: string;
  chidao?: string;
  daixinjia?: string;
  fadingJiaban?: string;
  quanqin?: string;
  quanqinCha?: string;
  restJiaban?: string;
  zhengchangJiaban?: string;
  totalJiaban?: string;
  
  // 新增字段 - 薪资相关
  chuqinSalary?: string;
  monthSalary?: string;
  monthShebao?: string;
  monthTax?: string;
  monthZhuankou?: string;
  personIncome?: string;
  personTarget?: string;
  personTidian?: string;
  salaryTiaocha?: string;
  shifaSalary?: string;
  yearSalary?: string;
  yearShebao?: string;
  yearTax?: string;
  yearZhuankou?: string;
  
  // 新增字段 - 社保公积金相关
  shiyeMoney?: string;
  yanglaoMoney?: string;
  yijinMoney?: string;
  yiliaoMoney?: string;
  
  // 新增字段 - 津贴和福利
  canbu?: string;
  canbuTiaocha?: string;
  fandaiLixi?: string;
  fangzu?: string;
  jintie?: string;
  jintieTiaocha?: string;
  serviceMoney?: string;
  shanyangFumu?: string;
  totalTiaocha?: string;
  
  // 新增字段 - 其他
  jixuEdu?: string;
  shopDacheng?: string;
  shopIncome?: string;
  shopTarget?: string;
  shopTidian?: string;
  yearMianzheng?: string;
  zinvEdu?: string;
  positions?: string;
  realEntryTime?: string;
  realLeaveTime?: string;
  isCheck?: string;
  dixin?: string;
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
  brand?: string;
  yearAndMonth?: string;
  flag?: string;
  
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
}

