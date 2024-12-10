export interface ResInfoCityListItem {
  id: number;
  cityNameEn: string;
  cityName: string;
  createTime: string;
  newOfferTime: string;
  newPredictEntryTime: string;
  updateTime: string;
}


export interface ResInfoList {
  code: number;
  info: ResInfoCityListItem[];
}

