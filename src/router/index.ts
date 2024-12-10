import { createRouter, createWebHistory } from 'vue-router';
import routes from './router.config';

// app router
export const router = createRouter({
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
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
  localStorage.removeItem("loginVueUser");
  // @ts-ignore
  localStorage.setItem("loginVueUser",JSON.stringify({"loginId": getQueryVariable("loginId"),"loginName": getQueryVariable("loginName")}));
  // const { searchParams } = new URL(window.location.href);
  // Array.from(searchParams.entries()).reduce((params, [key, value]) => {
  //   params[key] = value;
  //   return params;
  // }, {});
}