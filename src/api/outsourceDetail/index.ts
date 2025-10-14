import { post } from '/@/utils/http';
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
}
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
