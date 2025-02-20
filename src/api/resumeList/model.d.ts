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
  brandRuleOut: string; //1 标准 2 排除
  companyNameRuleOut: string; //1 标准 2 排除
  companyNameNp: string;//1 当前 2 所有 3过往
  marketNp: string;//1 当前 2 所有 3过往
  positionNp: string;//1 当前 2 所有 3过往
  positionNp: string;//1 当前 2 所有 3过往
  minHeight: string; //最小身高
  maxHeight: string; //最大身高
  minAge: string; //最小年龄
  maxAge: string; //最大年龄 
  leftTeamId: string;//导航栏团队Id
  leftRecruitId: string;//导航栏个人Id
  sortId: string;//导航栏个人分类Id
  isWorkExp: string;//1 查询工作经历 其他的参数都不查
  leftType: string;//1全部简历 2 公共简历 3 港澳地区 4 团队、个人 5我的简历 6 人才分类 7 一键搜索 默认1全部简历
  id: string; //一键搜搜或人才分类的id
  searchName: string; //一键搜搜名称
  sortName: string; //人才分类名称
  isTwoYear: string; // 1 查询两年 空其他的查询全部
}

export interface Item {
  key: string; //id key
  icon?: string; //图标
  label?: string; //内容数字
  title?: string; //标题
  level?: number; //菜单的等级 1级样式加粗
  type?: string; //是否有线
  children?: Item[]; //是否有子菜单
  selectable?: boolean; //是否可以选中
}

export interface BrandList {
  brandList: [];
  categoryList: [];
  leibieList: [];
  pinjiList: [];
  retailList: [];
}