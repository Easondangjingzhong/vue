//import BasicLayout from '/@/layouts/BasicLayout/index.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import Resume from '/@/views/resume/index.vue';
import ResumeList from '/@/views/resumeList/index.vue';
import ResumeDetail from '/@/views/resumeDetail/index.vue';
import MappingList from '/@/views/mappingList/index.vue'
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/resume',
    name: 'resume',
    component: Resume,
    meta: { title: '简历解析' },
  },
];
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: Resume,
    meta: { title: '简历解析' },
  },
  {
    path: '/resume',
    name: 'resume',
    component: Resume,
    meta: { title: '简历解析' },
  },
  {
    path: '/resume/list',
    name: 'resumeList',
    component: ResumeList,
    meta: { title: '简历库' },
  },
  {
    path: '/resume/detail',
    name: 'ResumeDetail',
    component: ResumeDetail,
    meta: { title: '简历管理' },
  },
   {
    path: '/mapping/list',
    name: 'MappingList',
    component: MappingList,
    meta: { title: '人员信息' },
  },
  // ...accessRoutes,
];
export const publicRoutes = [
  {
    path: '/redirect',
    component: BlankLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;
