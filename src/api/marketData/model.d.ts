export interface MarketDataListSearchItem {
  userName: string;
  type: string;
  city: string;
  assignStatus: string;
  checkStatus: string;
  jobStatus: string;
  marketId: string;
  brandId: string;
  entryRecruitId: string;
  assignRecruitId: string;
}

export interface MappingTempItem {
  id?: string | number;
  type?: string;
  userName?: string;
  userNameCn?: string;
  userNameEn?: string;
  city?: string;
  marketId?: string | number;
  marketName?: string;
  brandId?: string | number;
  brandName?: string;
  phoneNum?: string;
  positionId?: string | number;
  positionName?: string;
  jobStatus?: string;
  sex?: string;
  age?: string;
  entryRecruitId?: string | number;
  entryRealNameEn?: string;
  createTime?: string | number;
  assignStatus?: string;
  assignRecruitId?: string | number;
  assignRealNameEn?: string;
  assignTime?: string | number;
  checkStatus?: string;
  cid?: string | number;
  checkRemark?: string;
  falseReason?: string;
  currentFlag?: string;
  tellFlag?: string;
  systemRecruitId?: string | number;
}
