import { get,post } from '/@/utils/http';

enum URL {
  query_mapping_candidate = '/candidate/resume-vue-query-candidateForCondition-page-ajax.action',
}
const queryMappingCandidate = async (data: any) =>
  post<any>({ url: URL.query_mapping_candidate, data});

export default { queryMappingCandidate };
