export interface SearchResumeList {
  pageNumber: string;
  pageSize: string;
  recruitId: string;
  hangye: string;
  pinlei: string;
  leibie: string;
  pinji: string;
  pinjibie: string;
  markId: string;
  marketName: string;//名称搜索
  brandId: string;
  guoji: string;
  huji: string;
  city: string;
  userName: string;
  phoneNum: string;
  email: string;
  sex: string;
  hangye2: string;
  positionType: string;
  positionLevel: string;
  positionId: string;
  companyName: string;
  hunyu: string;
  language: string;
  wantCity: string;
  resumeType: string;
  education: string;
  keyWords: string;
  brandNp: string;//1 当前 2 所有 3过往
  companyNameRuleOut: string; //1 标准 2 排除
  companyNameNp: string;//1 当前 2 所有 3过往
  marketNp: string;//1 当前 2 所有 3过往
  positionNp: string;//1 当前 2 所有 3过往
  positionNp: string;//1 当前 2 所有 3过往
  minHeight: string; //最小身高
  maxHeight: string; //最大身高
  minAge: string; //最小年龄
  maxAge: string; //最大年龄 
  change: number; //对象内容发生改变
}

export interface Item {
  key: string; //id key
  icon?: string; //图标
  label?: string; //内容数字
  title?: string; //标题
  level?: number; //菜单的等级 1级样式加粗
  type?: string; //是否有线
  children?: Item[]; //是否有子菜单
}

export interface BrandList {
  brandList: [];
  categoryList: [];
  leibieList: [];
  pinjiList: [];
  retailList: [];
}