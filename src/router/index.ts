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
export const routerQuery = () => {
  console.log(",,,,,",localStorage.getItem("loginFirst"))
  if (getQueryVariable("loginFirst")) {
    localStorage.removeItem("loginVueUser");
    localStorage.setItem("loginVueUser",JSON.stringify({"loginId": getQueryVariable("loginId"),"loginName": getQueryVariable("loginName"),"loginTocken": getQueryVariable("loginTocken"),"loginType": getQueryVariable("loginType")}));
    return true;
  }
  cityStore.resuemCheckLogin(getQueryVariable("loginTocken")).then(res => {
    console.log(",,,,,",localStorage.getItem("loginVueUser"))
    if (res == 1) {
      const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
      if (getQueryVariable("loginId") && (!loginVueUser.loginId || (loginVueUser.loginId && loginVueUser.loginId != getQueryVariable("loginId")))) {
        window.open("http://work.wotui.com:8889/WTSM/","_self");
        return false;
      }
      localStorage.removeItem("loginVueUser");
      localStorage.setItem("loginVueUser",JSON.stringify({"loginId": getQueryVariable("loginId"),"loginName": getQueryVariable("loginName"),"loginTocken": getQueryVariable("loginTocken"),"loginType": getQueryVariable("loginType")}));
      return true;
    } else {
      window.open("http://work.wotui.com:8889/WTSM/","_self");
      return false;
   }
  });
  return false;
//   window.addEventListener('message', function (e) {
//    console.log(e.data)
// }); 

  // const oldLoginUserNameRecruitId = localStorage.getItem("oldLoginUserNameRecruitId");
  // if (oldLoginUserNameRecruitId != getQueryVariable("loginId")) {

  // } else {
 // @ts-ignore
 // const { searchParams } = new URL(window.location.href);
 // Array.from(searchParams.entries()).reduce((params, [key, value]) => {
 //   params[key] = value;
 //   return params;
 // }, {});
 // }
 
}