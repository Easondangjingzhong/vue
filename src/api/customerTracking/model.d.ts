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
  id: number;
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
}

export interface CustomerTrackItem {
  index: number;
  category: string;
  hrInfo: string;
  brand: string;
  cooperation: string;
  customerService: string;
  bdAdvisor: string;
  meeting: string;
  contact: string;
  contactDate: string;
  id: number;
  bdUserId: number | null;
  bdUserName: string | null;
  brandId: number;
  brandName: string;
  companyId: string;
  companyName: string;
  companyNameAll: string;
  flag: string | null;
  registTime: string | null;
  type: string | null;
  updateTime: string | null;
}

export interface PageItem {
  pageNumber: number;
  pageSize: number;
  total: number;
}