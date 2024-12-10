import { post } from '/@/utils/http';

enum URL {
  resume_format = '/candidate/query-resumeSDK.action',
  resume_add = '/resume/create-resume-by-consultant-vue.action',
  resume_file = '/resume/upload-resume-vue-orginalResume.action',
  resume_photo = '/resume/upload-resume-head-vue.action',
  resume_position = '/candidate/query-position.action',
}
const addResumeInfo = async (resume: any) =>
  post<any>({ url: URL.resume_add, data: resume});
const info = async (formData: any) =>
  post<any>({ url: URL.resume_format, data:formData });
const fetchResumeFile = (formData: any) => 
  post<any>({ url: URL.resume_file, data: formData });
const fetchResumePhote = (formData: any) => 
  post<any>({ url: URL.resume_photo, data: formData });
const fetchResumePosition = async (data: any) => 
  post<any>({ url: URL.resume_position, data});
export default { info, addResumeInfo,fetchResumeFile,fetchResumePhote,fetchResumePosition };