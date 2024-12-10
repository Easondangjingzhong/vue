import { PlagiarusnItem } from './model';
import { post } from '/@/utils/http';

enum URL {
  plagiarusn = '/candidate/query-resume-repeat-newVueTwo.action',
}

const info = async (params: PlagiarusnItem) =>
  post<any>({ url: URL.plagiarusn ,data: params});

export default { info };
