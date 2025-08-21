export interface HrDetailItem {
  babyYear: string;
  birthDay: string;
  birthDayNong: string;
  birthType: string;
  brandId: string;
  brandName: string;
  brandRemark: null | string;
  cn: null | string;
  companyId: string;
  companyName: string;
  consuler: string;
  consulerNum: null | string;
  createTime: string;
  createUser: string;
  daiPi: number;
  daiQue: number;
  email: string;
  familyAddress: string;
  gender: string;
  hrName: string;
  hrRecruit: null | string;
  id: string;
  isJiaGou: null | string;
  jobType: string;
  leaveMonth: null | string;
  liWu: number;
  lingYing: string;
  marriage: string;
  mobilePhone: string;
  officeAddress: string;
  oldId: null | string;
  positionId: number;
  positionName: string;
  rId: null | string;
  registTime: null | string;
  remark: string;
  resumePath: null | string;
  serviceUser: null | string;
  showNum: number;
  sign: null | string;
  starSeat: string;
  telPhone: string;
  updateTime: number;
  updateUser: string;
  wechat: string;
  work: string;
  workNum: number;
  collectId: number;
}

export interface CustomerTrackItem {
  index: number;
  category: string;
  hrInfo: string;
  bdAdvisor: string;
  meeting: string;
  contact: string;
  contactDate: string;
  id: number;
  bdUserId: number | null;
  bdUserName: string | null;
  brandId: string;
  brandName: string;
  companyId: string;
  companyName: string;
  companyNameAll: string;
  flag: string;
  registTime: string | null;
  type: string;
  updateTime: string | null;
  lastContractTime: string | null;
  cooperationLie: string | null;
  cooperationWai: string | null;
  lieList: Array<{ counselor: string; recruitId: number }> | null;
  waiList: Array<{ counselor: string; recruitId: number }> | null;
  lslist: Array<BrandCategoryItem> | null;
  yueJianNum: number;
}

export interface BrandCategoryItem {
  brandId: number; // 将string改为number类型以匹配1528数值
  brandName: string;
  brandType: string;
  isPrize: string;
  positionOpen: string;
}

export interface CustomerTrackHrItem {
  address: string | null;
  brandId: string;
  brandName: string;
  collectId: number;
  companyId: string;
  companyName: string;
  email: string;
  gender: string;
  hrName: string;
  id: number;
  jobType: string;
  leaveMonth: string | null;
  mobilePhone: string;
  positionId: string | null;
  positionName: string | null;
  registTime: string | null;
  showNum: number;
  telPhone: string;
  updateTime: string | null;
  wechat: string;
}

export interface PageItem {
  pageNumber: number;
  pageSize: number;
  total: number;
}
