//import { ResInfoList } from './model';
import { get, post } from '/@/utils/http';

enum URL {
  query_mapping_temp_page_ajax = '/candidate/resume-vue-query-mappingTemp-page-ajax.action',
  add_mapping_temp = '/candidate/resume-vue-insert-mappingTemp.action',
  update_check_mapping_temp = '/candidate/resume-vue-check-mappingTemp.action',
  update_assign_mapping_temp = '/candidate/resume-vue-assign-mappingTemp.action',
  update_mapping_temp = '/candidate/resume-vue-update-mappingTemp.action',
  query_mapping_temp_log = '/candidate/resume-vue-query-mappingTempLog.action',
  add_market_brand_check = '/candidate/resume-vue-add-market-brand_check.action',
  add_market_brand = '/candidate/resume-vue-add-market-brand.action',
  check_mapping_temp_phone = '/candidate/resume-vue-check-mappingTemp-phone.action',
  check_candidate_market_brand = '/candidate/resume-vue-check-candidate-market-brand.action',
  query_market_mapping = '/candidate/resume-vue-query-market-mapping.action',
  query_brand = '/candidate/resume-vue-query-brand.action',
  query_structure_all_by_level = '/employee-group/resume-vue-query-structure-all-byLevel-YeWu.action',
  query_consultant_by_team = '/candidate/resume-vue-query-consultant-byTeam.action',
  query_resume_sdk = '/candidate/query-resumeSDK.action',
  query_resume_file_back_path = '/candidate/resume-vue-file-back-path.action',
  query_mapping_temp_duplicate_list = '/candidate/resume-vue-query-mappingTemp-parmarList.action',
  query_mapping_right_market_page = '/candidate/resume-vue-query-mappingRightMarket-page.action',
  cancel_market_brand = '/candidate/resume-vue-canel-market-brand.action',
  add_market_city = '/city/resume-vue-city-add-market.action',
  add_brand_new = '/sales/resume-vue-resume-sales-add-brand.action',
}
/**
 * 添加商场品牌
 * @param cnName
 * @param usName
 * @param shortOne
 * @param retail
 * @param retailLevel
 * @param category
 * @param pinji
 * @param leibie
 * @param standard
 * @param source
 * @param SystemRecruitId
 * @returns
 */
const addBrandNew = async (params: any) => post<any>({ url: URL.add_brand_new, params });
/**
 * 添加商场城市
 * @param cityName
 * @param marketName
 * @param telPhone
 * @param SystemRecruitId
 * @returns
 */
const addMarketCity = async (params: any) => post<any>({ url: URL.add_market_city, params });
/**
 * 取消商场品牌关联
 * @param marketId 市场id
 * @param brandId 品牌id
 * @param floor 楼层
 * @param SystemRecruitId
 */
const cancelMarketBrand = async (params: any) => post<any>({ url: URL.cancel_market_brand, params });
/**
 * 查询商场信息
 * @param pageNumber
 * @param city
 * @param cityStr
 * @param market
 * @param marketStr
 * @param marketLevel
 * @param marketPhone
 * @param brandPhone
 * @param floor
 * @param brand
 * @param retail
 * @param category
 * @param brandStr
 * @param brandLevel
 * @param resumeHave
 * @returns
 */
const queryMappingRightMarketPage = async (params: any) => get<any>({ url: URL.query_mapping_right_market_page, params });
/**
 * 查询重复人才列表
 * @param params
 * @returns
 */
const queryMappingTempDuplicateList = async () =>
  get<any>({ url: URL.query_mapping_temp_duplicate_list });
/**
 * 查询简历文件下载路径
 * @param file
 * @returns
 */
const queryResumeFileBackPath = async (data: any) =>
  post<any>({ url: URL.query_resume_file_back_path, data });
/**
 * 查询简历SDK
 * @param fname
 * @param file
 * @returns
 */
const queryResumeSDK = async (data: any) => post<any>({ url: URL.query_resume_sdk, data });
/**
 * 查询所有业务人员(权限)
 * @param teamId
 * @param SystemRecruitId
 * @returns
 */
const queryConsultantByTeam = async (params: any) =>
  post<any>({ url: URL.query_consultant_by_team, params });
/**
 * 查询所有业务团队(权限)
 * @param SystemRecruitId
 * @returns
 */
const queryStructureAllByLevel = async (params: any) =>
  get<any>({ url: URL.query_structure_all_by_level, params });
/**
 * 查询商场信息商场品牌
 * @param curPage
 * @returns
 */
const queryBrandMapping = async (params: any) => get<any>({ url: URL.query_brand, params });
/**
 * 查询商场信息商场品牌楼层
 * @param marketId
 * @param brandId
 * @returns
 */
const checkCandidateMarketBrand = async (params: any) =>
  post<any>({ url: URL.check_candidate_market_brand, params });
/**
 * 查询商场信息商场品牌
 * @param marketName
 * @param city
 * @param curPage
 * @returns
 */
const queryMarketMapping = async (params: any) =>
  get<any>({ url: URL.query_market_mapping, params });
/**
 * 查询商场信息临时顾问手机号
 * @param phoneNum
 * @returns
 */
const checkMappingTempPhone = async (params: any) =>
  get<any>({ url: URL.check_mapping_temp_phone, params });
/**
 * 新增商场品牌校验
 * @param cId
 * @param cityName
 * @param mId
 * @param bId
 * @param floor
 * @param phoneBrand
 * @param isChe
 * @param SystemRecruitId
 * @returns
 */
const addMarketBrand = async (params: any) =>
  post<any>(
    { url: URL.add_market_brand, params },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
/**
 * 新增商场品牌校验
 * @param cId
 * @param cityName
 * @param mId
 * @param bId
 * @param floor
 * @param phoneBrand
 * @param isChe
 * @param SystemRecruitId
 * @returns
 */
const addMarketBrandCheck = async (params: any) =>
  post<any>(
    { url: URL.add_market_brand_check, params },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
/**
 * 查询商场信息临时顾问日志
 * @param tempId
 * @returns
 */
const queryMappingTempLog = async (params: any) =>
  post<any>({ url: URL.query_mapping_temp_log, params });
/**
 * 修改
 * @param params
 * @returns
 */
const updateMappingTemp = async (params: any) =>
  post<any>({ url: URL.update_mapping_temp, params });
/**
 * 分配
 * @param ids
 * @param assignRecruitId
 * @param assignRealNameEn
 * @returns
 */
const updateAssignMappingTemp = async (params: any) =>
  post<any>(
    { url: URL.update_assign_mapping_temp, params },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
/**
 * 审核
 * @param  id
 * @param checkStatus
 * @param checkRemark
 * @param falseReason
 * @returns
 */
const updateCheckMappingTemp = async (params: any) =>
  post<any>({ url: URL.update_check_mapping_temp, params });
/**
 * 新增商场信息临时顾问
 * @param data
 * @returns
 */
const addMappingTemp = async (data: any) => {
  return post<any>(
    { url: URL.add_mapping_temp, data },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
/**
 * 查询商场信息临时顾问
 * @param pageNumber 页码,
 * @param pageSize 每页数量,
 * @param type 类型,
 * @param assignStatus 分配状态,
 * @param checkStatus 审核状态,
 * @param jobStatus 岗位状态,
 * @param city 城市,
 * @param marketId 商场ID,
 * @param brandId 品牌ID,
 * @param entryRecruitId 录入招聘ID,
 * @param assignRecruitId 分配招聘ID
 * @returns
 */
const queryMappingTempPageAjax = async (params: any) =>
  get<any>(
    { url: URL.query_mapping_temp_page_ajax, params },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
export default {
  addBrandNew,
  addMarketCity,
  cancelMarketBrand,
  queryMappingRightMarketPage,
  queryMappingTempDuplicateList,
  queryResumeFileBackPath,
  queryResumeSDK,
  queryStructureAllByLevel,
  queryConsultantByTeam,
  queryBrandMapping,
  checkCandidateMarketBrand,
  queryMarketMapping,
  checkMappingTempPhone,
  queryMappingTempPageAjax,
  addMarketBrandCheck,
  addMarketBrand,
  addMappingTemp,
  updateCheckMappingTemp,
  updateAssignMappingTemp,
  updateMappingTemp,
  queryMappingTempLog,
};
