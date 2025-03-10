/**
 * 根据不同的类型和语言返回不同的主题
 * @param type 类型 personInfo
 * @param language 1 英语 2或其他 中文
 * @returns 个人信息的中文或英文
 */
export function validateLanguage(type,language) {
  if (type == "personInfo" && language == "1") {
    return {
      userName: {label: "Name", message: "请输入名字"},
      gender: {label: "Sex", message: "请选择性别"},
      phone: {label: "Mobile", message: "请输入手机号"},
      age: {label: "Age", message: "请输入年龄"},
      email: {label: "Email", message: "请输入邮箱"},
      height: {label: "Height", message: "请输入身高cm"},
      nationality: {label: "Nationality", message: "请输入国籍"},
      weight: {label: "Weight", message: "请输入体重kg"},
      huji: {label: "Place of Origin", message: "请输入户籍"},
      currentCity: {label: "CurrentCity", message: "请输入城市"},
      positionName: {label: "Position Applied", message: "请输入当前职位"},
      marriageStatus: {label: "Marital Status", message: "请输入婚育状态"},
    };
  }
  if (type == "personInfo" && language != "1") {
    return {
      userName: {label: "姓名", message: "请输入名字"},
      gender: {label: "性别", message: "请选择性别"},
      phone: {label: "手机", message: "请输入手机号"},
      age: {label: "年龄", message: "请输入年龄"},
      email: {label: "邮箱", message: "请输入邮箱"},
      height: {label: "身高", message: "请输入身高cm"},
      nationality: {label: "国籍", message: "请输入国籍"},
      weight: {label: "体重", message: "请输入体重kg"},
      huji: {label: "户籍", message: "请输入户籍"},
      currentCity: {label: "城市", message: "请输入城市"},
      positionName: {label: "当职", message: "请输入当前职位"},
      marriageStatus: {label: "婚育", message: "请输入婚育状态"},
    };
  }
  if (type == "workInfo" && language == "1") {
    return {
      companyName: {label: "Company Name", message: "请输入公司名称"},
      category: {label: "Category", message: "请选择类别"},
      startYear: {label: "Start Time", message: "请选择开始年月"},
      endYear: {label: "Expiry Time", message: "请选择结束年月"},
      positionName: {label: "Position", message: "请选择职位名称"},
      department: {label: "Department", message: "请输入所在部门"},
      workDuty: {label: "Responsibilities", message: "请输入工作职责"},
      reporter: {label: "Reports To", message: "请输入汇报对象"},
      monthSalary: {label: "Comprehensive Income", message: "请输入综合月薪"},
      brandRetail: {label: "Retail", message: "请输入行业"},
      brandCategory: {label: "Brand Category", message: "请输入品类"},
      salaryStructure: {label: "Salary Structure", message: "请输入薪资构架"},
      personnelStructure: {label: "Personnel Structure", message: "请输入团队构架"},
      isRetreat: {label: "Withdrawal Stores", message: "请选择撤店"},
      isNewtest: {label: "Recent Work", message: "请选择最近工作"},
      cityName: {label: "City", message: "请选择城市"},
      marketName: {label: "Market", message: "请选择商场"},
      brandName: {label: "Brand", message: "请选择品牌"},
      workFloor: {label: "Floor", message: "请选择楼层"},
    };
  }
  if (type == "workInfo" && language != "1") {
    return {
      companyName: {label: "公司名称", message: "请输入公司名称"},
      category: {label: "类别", message: "请选择类别"},
      startYear: {label: "开始年月", message: "请选择开始年月"},
      endYear: {label: "结束年月", message: "请选择结束年月"},
      positionName: {label: "职位名称", message: "请选择职位名称"},
      department: {label: "所在部门", message: "请输入所在部门"},
      workDuty: {label: "工作职责", message: "请输入工作职责"},
      reporter: {label: "汇报对象", message: "请输入汇报对象"},
      monthSalary: {label: "综合月薪", message: "请输入综合月薪"},
      brandRetail: {label: "行业", message: "请输入行业"},
      brandCategory: {label: "品类", message: "请输入品类"},
      salaryStructure: {label: "薪资构架", message: "请输入薪资构架"},
      personnelStructure: {label: "团队构架", message: "请输入团队构架"},
      isRetreat: {label: "撤店", message: "请选择撤店"},
      isNewtest: {label: "最近工作", message: "请选择最近工作"},
      cityName: {label: "城市", message: "请选择城市"},
      marketName: {label: "商场", message: "请选择商场"},
      brandName: {label: "品牌", message: "请选择品牌"},
      workFloor: {label: "楼层", message: "请选择楼层"},
    };
  }
  if (type == "educationInfo" && language == "1") {
    return {
      schoolName: {label: "School Name", message: "请输入学校名称"},
      startYear: {label: "Start Time", message: "请输入开始年月"},
      endYear: {label: "Expiry Time", message: "请输入结束年月"},
      atSchool: {label: "At School", message: "请选择在校"},
      degree: {label: "Degree", message: "请输入学历"},
      majorName: {label: "Major", message: "请输入专业名称"},
      isRegular: {label: "Regular", message: "请选择统招"},
    };
  }
  if (type == "educationInfo" && language != "1") {
    return {
      schoolName: {label: "学校名称", message: "请输入学校名称"},
      startYear: {label: "开始年月", message: "请输入开始年月"},
      endYear: {label: "结束年月", message: "请输入结束年月"},
      atSchool: {label: "在校", message: "请选择在校"},
      degree: {label: "学历", message: "请输入学历"},
      majorName: {label: "专业名称", message: "请输入专业名称"},
      isRegular: {label: "统招", message: "请选择统招"},
    };
  }
  if (type == "englishInfo" && language == "1") {
    return {
      English: {label: "English",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor English', message: "请输入语言能力"},
      French: {label: "French",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor French', message: "请输入语言能力"},
      Japanese: {label: "Japanese",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor Japanese', message: "请输入语言能力"},
      German: {label: "German",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor German', message: "请输入语言能力"},
      Korean: {label: "Korean",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor Korean', message: "请输入语言能力"},
      Cantonese: {label: "Cantonese",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor Cantonese', message: "请输入语言能力"},
      Chinese: {label: "Chinese",language1:'‌Listen and speak fluently',language2:'Read and write fluently',language3: 'Poor Chinese', message: "请输入语言能力"},
    };
  }
  if (type == "englishInfo" && language != "1") {
    return {
      English: {label: "英语",language1:'听说流利',language2: '读写流利',language3: '英语不佳', message: "请输入语言能力"},
      French: {label: "法语",language1:'听说流利',language2: '读写流利',language3: '法语不佳', message: "请输入语言能力"},
      Japanese: {label: "日语",language1:'听说流利',language2: '读写流利',language3: '日语不佳', message: "请输入语言能力"},
      German: {label: "德语",language1:'听说流利',language2: '读写流利',language3: '德语不佳', message: "请输入语言能力"},
      Korean: {label: "韩语",language1:'听说流利',language2: '读写流利',language3: '韩语不佳', message: "请输入语言能力"},
      Cantonese: {label: "粤语",language1:'听说流利',language2: '读写流利',language3: '粤语不佳', message: "请输入语言能力"},
      Chinese: {label: "中文",language1:'听说流利',language2: '读写流利',language3: '中文不佳', message: "请输入语言能力"},
    };
  }
}