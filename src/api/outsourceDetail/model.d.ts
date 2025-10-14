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
  positionId: string;
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
  serviceMoney?: number;
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
}
/**
 * 外包月度薪资
 */
export interface OutsourceMonthSalaryItem {
  id?: number;
  userNameCn?: string;
  userNameEn?: string;
  currentStatus?: string;
  city?: string;
  companyName?: string;
  jobType?: string;
  recruitParty?: string;
  personId?: number;
  jinxinMonth?: Date;
  entryTime?: Date;
  leaveTime?: Date;
  biaozhunSalary?: number;
  biaozhunGongshi?: number;
  yuguGongshi?: number;
  chuqinSalary?: number;
  canbu?: number;
  jintie?: number;
  quanqin?: number;
  zhengchangJiaban?: number;
  fadingJiaban?: number;
  jiabanSalary?: number;
  shangyueYugu?: number;
  chidao?: number;
  shijia?: number;
  bingjia?: number;
  daixin?: number;
  geti?: number;
  tuanti?: number;
  teshu?: number;
  jili?: number;
  dacheng?: number;
  salaryTiaocha?: number;
  canbuTiaocha?: number;
  tiaochaTotal?: number;
  monthTax?: number;
  yearTax?: number;
  yanglao?: number;
  shiye?: number;
  yiliao?: number;
  dabing?: number;
  yijin?: number;
  monthShebao?: number;
  yearShebao?: number;
  zinvJiaoyu?: number;
  jixuJiaoyu?: number;
  fangdaiLixi?: number;
  fangzu?: number;
  shangyangFumu?: number;
  monthZhuankou?: number;
  yearZhuankou?: number;
  yearMianzheng?: number;
  monthGeshui?: number;
  yearGeshui?: number;
  shouxuMoney?: number;
  salaryAfterTax?: number;
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
