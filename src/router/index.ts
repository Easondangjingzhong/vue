import { createRouter, createWebHistory } from 'vue-router';
import routes from './router.config';
import {useCityStoreWithOut} from '/@/store/modules/city'
const cityStore = useCityStoreWithOut();
// app router
export const router = createRouter({
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    // @ts-ignore
    document.title = to.meta.title
  }
  next()
})
function getQueryVariable(variable) 
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
          return decodeURIComponent(pair[1]);
        }
    }
    return("");
}
export const routerQuery = async () => {
  //if (getQueryVariable("loginFirst")) {
    localStorage.removeItem("loginVueUser");
    localStorage.setItem("loginVueUser",JSON.stringify({"loginId": getQueryVariable("loginId"),"loginName": getQueryVariable("loginName"),"loginTocken": getQueryVariable("loginTocken"),"loginType": getQueryVariable("loginType"),"loginOutFlag": getQueryVariable("loginOutFlag")}));
    return true;
  // }
  // return await cityStore.resuemCheckLogin(getQueryVariable("loginTocken")).then(res => {
  //   if (res.code == 1) {
  //     const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  //     if (getQueryVariable("loginId") && (!loginVueUser.loginId || (loginVueUser.loginId && loginVueUser.loginId != getQueryVariable("loginId")))) {
  //       window.open("http://work.wotui.com:8889/WTSM/","_self");
  //       return false;
  //     }
  //     localStorage.removeItem("loginVueUser");
  //     localStorage.setItem("loginVueUser",JSON.stringify({"loginId": getQueryVariable("loginId"),"loginName": getQueryVariable("loginName"),"loginTocken": getQueryVariable("loginTocken"),"loginType": getQueryVariable("loginType"),"loginOutFlag": getQueryVariable("loginOutFlag")}));
  //     return true;
  //   } else {
  //     window.open("http://work.wotui.com:8889/WTSM/","_self");
  //     return false;
  //  }
  // })
}

/**
 * 跳转简历详情页面
 * @param resumeId 简历id
 * @param addConsultantId 添加顾问id
 */
export const handleToResumeDetails = (resumeId,addConsultantId) => {
  const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  let query = {...loginVueUser, resumeId, addConsultantId};
  // if (loginVueUser.loginType != "A" && (!formState.value.leftType || formState.value.leftType == "1" || formState.value.leftType == "2" || formState.value.leftType == "3" || formState.value.leftType == "4")) {
  //   query = {...loginVueUser, resumeId, addConsultantId,searchRecommend: "T"};
  // }
  const href = router.resolve({
    path: '/resume/detail',
    query: query,
  });
  window.open(href.href, '_blank')
  // 跳转到简历详情页
  //window.open(`http://work.wotui.com:8889/WTSM/system/consultant-query-resume.html?resumeId=${resumeId}&resumeType=C&addConsultantId=${addConsultantId}`);
}
export const handleToAddResumeDetails = () => {
  const loginVueUser: {loginName: "", loginId: "", loginTocken: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  const href = router.resolve({
    path: '/resume',
    query: {...loginVueUser},
  });
  window.open(href.href, '_blank')
  // 跳转到简历详情页
  //window.open(`http://work.wotui.com:8889/WTSM/system/consultant-query-resume.html?resumeId=${resumeId}&resumeType=C&addConsultantId=${addConsultantId}`);
}

export const handleToMappingList = () => {
  const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  let query = {...loginVueUser};
  const href = router.resolve({
    path: '/mapping/list',
    query: query,
  });
  window.open(href.href, '_blank')
}