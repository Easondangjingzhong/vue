import { PlagiarusnItem } from './model';
import { post } from '/@/utils/http';

enum URL {
  plagiarusn_wai = '/candidate/query-resume-repeat-newVueTwo.action',
  plagiarusn = '/candidate/query-resume-repeat-newVue.action',
}

const infoWai = async (params: PlagiarusnItem) =>
  post<any>({ url: URL.plagiarusn_wai ,data: params});
const info = async (params: PlagiarusnItem) =>
  post<any>({ url: URL.plagiarusn ,data: params});

export default { info,infoWai };
