//import 'ant-design-vue';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import '/@/styles/index.less';
import './utils/flexible'
import '/@/styles/ant/antd.css'

import { createApp } from 'vue';
import App from './App.vue';
import { router,routerQuery } from './router';
import { store } from './store';
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css';
//import screenAdapter from 'screen-adapter-plugin'


//import { setupGlobDirectives } from './directives';
//import './router/permission';
//import { setupComponents } from './plugin';
routerQuery().then(res => {
  if (res) {
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(VueCropper);
  //app.use(screenAdapter, {rootValue: 192})
  // Register global directive 配置全局权限
  //setupGlobDirectives(app);
  
  // Register UI components
  // setupComponents(app);
  // 全局属性
  // app.config.globalProperties.AuthEnum = AuthEnum;
    app.mount('#app');
  }
});


