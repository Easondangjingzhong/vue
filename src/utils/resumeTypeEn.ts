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
      positionName: {label: "当前职位", message: "请输入当前职位"},
      marriageStatus: {label: "婚育状态", message: "请输入婚育状态"},
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
}