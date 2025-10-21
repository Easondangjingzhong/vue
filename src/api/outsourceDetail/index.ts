import { post, get } from '/@/utils/http';
enum URL {
  query_outsource_person = '/candidateRecommend/resume-vue-select-out-person.action',
  query_outsource_salary = '/candidateRecommend/resume-vue-select-out-Salary.action',
  query_outsource_shebao = '/candidateRecommend/resume-vue-select-out-SheBao.action',
  query_outsource_month_salary = '/candidateRecommend/resume-vue-select-out-MonthSalary.action',
  update_out_person_idcard = '/candidateRecommend/resume-vue-update-out-person-idcard.action',
  query_outsource_person_byPhone = '/candidateRecommend/resume-vue-select-out-person-byPhone.action',
  query_outsource_person_contract = '/candidateRecommend/resume-vue-select-out-personContract.action',
  add_outsource_person_contract = '/candidateRecommend/resume-vue-insertupdate-out-personContract.action',
  query_outsource_salary_by_person = '/candidateRecommend/resume-vue-select-out-Salary-byperson.action',
  add_outsource_salary_by_person = '/candidateRecommend/resume-vue-insert-out-Salary-byperson.action',
  query_outsource_shebao_by_person = '/candidateRecommend/resume-vue-select-out-SheBao-person.action',
  add_outsource_shebao_by_person = '/candidateRecommend/resume-vue-insert-out-Shebao-byperson.action',
  add_update_outsource_basic = '/candidateRecommend/resume-vue-update-out-person-base.action',
  query_outsource_shebao_contractRates = '/contractRates/resume-vue-query-contractRates-out-shebao.action',
  query_outsource_brand = '/candidateRecommend/resume-vue-query-out-brand.action',
  query_outsource_city = '/candidateRecommend/resume-vue-query-out-city.action',
  query_outsource_position = '/candidateRecommend/resume-vue-query-out-position.action',
  query_outsource_company = '/candidateRecommend/resume-vue-query-out-company.action',
  query_company_all = '/companyBrand/resume-vue-query-company-all.action',
  query_company_brand = '/companyBrand/rusume-vue-query-brand-for-cid.action',
  query_outsource_bankName = '/candidateRecommend/resume-vue-select-out-bankName.action',
}
/**
 * 查询外包银行名称
 * @param data personId
 * @returns 
 */
const queryOutsourceBankName = async () =>
  post<any>({ url: URL.query_outsource_bankName, });

/**
 * 查询所有外包公司品牌
 * @param data companyName
 * @returns 
 */
const queryCompanyBrand = async (data: any) =>
  post<any>({ url: URL.query_company_brand, data});
/**
 * 查询所有公司
 * @param data jobType
 * @returns 
 */
const queryCompanyAll = async (data: any) =>
  post<any>({ url: URL.query_company_all, data});
/**
 * 搜索条件外包公司
 * @returns 
 */
const queryOutsourceCompany = async () =>
  get<any>({ url: URL.query_outsource_company}); 
/**
 * 搜索条件岗位
 * @returns 
 */
const queryOutsourcePosition = async () =>
  get<any>({ url: URL.query_outsource_position}); 
/**
 * 搜索条件城市
 * @returns 
 */
const queryOutsourceCity = async () =>
  get<any>({ url: URL.query_outsource_city}); 
/**
 * 搜索条件品牌
 * @returns 
 */
const queryOutsourceBrand = async () =>
  get<any>({ url: URL.query_outsource_brand});  
/**
 * 查询外包社保合同费率
 * @param data personId
 * @returns 
 */
const queryOutsourceShebaoContractRates = async (data: any) =>
  post<any>({ url: URL.query_outsource_shebao_contractRates, data});

/**
 * 新增修改外包信息
 * @param data personId
 * @returns 
 */
const addUpdateOutsourceBasic = async (data: any) =>
  post<any>({ url: URL.add_update_outsource_basic, data});

/**
 * 新增外包社保
 * @param data personId
 * @returns 
 */
const addOutsourceShebaoByPerson = async (data: any) =>
  post<any>({ url: URL.add_outsource_shebao_by_person, data});
/**
 * 查询外包社保
 * @param data personId
 * @returns 
 */
const queryOutsourceShebaoByPerson = async (data: any) =>
  post<any>({ url: URL.query_outsource_shebao_by_person, data});
/**
 * 查询外包薪资
 * @param data personId
 * @returns 
 */
const queryOutsourceSalaryByPerson = async (data: any) =>
  post<any>({ url: URL.query_outsource_salary_by_person, data});
/**
 * 新增外包薪资
 * @param data personId
 * @returns 
 */
const addOutsourceSalaryByPerson = async (data: any) =>
  post<any>({ url: URL.add_outsource_salary_by_person, data});
/**
 * 新增修改合同信息
 * @param data personId
 * @returns 
 */
const addOutsourcePersonContract = async (data: any) =>
  post<any>({ url: URL.add_outsource_person_contract, data});
/**
 * 查询合同信息
 * @param data personId
 * @returns 
 */
const queryOutsourcePersonContract = async (data: any) =>
  post<any>({ url: URL.query_outsource_person_contract, data});
/**
 * 查询同一手机号的外包记录
 * @param data phoneNumber
 * @returns 
 */
const queryOutsourcePersonByPhone = async (data: any) =>
  post<any>({ url: URL.query_outsource_person_byPhone, data});
/**
 * 外包个人信息上传身份证
 * @param data id file
 * @returns 
 */
const updateOutsourcePersonIdcard = async (data: any) =>
  post<any>({ url: URL.update_out_person_idcard, data});
/**
 * 查原本HR信息
 * @param data cId jobType companyName hrId
 * @returns 
 */
const queryOutsourcePerson = async (data: any) =>
  post<any>({ url: URL.query_outsource_person, data});
/**
 * 查外包薪资
 * @param data cId jobType companyName hrId
 * @returns 
 */
const queryOutsourceSalary = async (data: any) =>
  post<any>({ url: URL.query_outsource_salary, data});
/**
 * 查外包社保
 * @param data cId jobType companyName hrId
 * @returns 
 */
const queryOutsourceSheBao = async (data: any) =>
  post<any>({ url: URL.query_outsource_shebao, data});
/**
 * 查外包月度薪资
 * @param data cId jobType companyName hrId
 * @returns 
 */
const queryOutsourceMonthSalary = async (data: any) =>
  post<any>({ url: URL.query_outsource_month_salary, data});

export default { 
  queryOutsourceBankName,
  queryCompanyBrand,
  queryCompanyAll,
  queryOutsourceCity, 
  queryOutsourceBrand, 
  queryOutsourceCompany,
  queryOutsourcePosition, 
  queryOutsourceShebaoContractRates, 
  addOutsourcePersonContract, 
  addUpdateOutsourceBasic,
  addOutsourceShebaoByPerson,
  queryOutsourceShebaoByPerson,
  addOutsourceSalaryByPerson,
  queryOutsourceSalaryByPerson,
  queryOutsourcePersonContract, 
  queryOutsourcePersonByPhone, 
  updateOutsourcePersonIdcard, 
  queryOutsourcePerson, 
  queryOutsourceSalary, 
  queryOutsourceSheBao, 
  queryOutsourceMonthSalary 
};
