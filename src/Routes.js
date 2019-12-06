import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import chooseFile from '@/pages/FileUpload/chooseFile';
import chooseTool from '@/pages/ChooseTool/ChooseTool';
import autoConvers from '@/pages/Conversion/autoConversion';
import Conversion from '@/pages/Conversion/Conversion';
import conversionResult from '@/pages/Conversion/ConversionResult';
// import Login from '@/pages/Login/Login';
// import ErrorPage from '@/pages/Error/Error';
import Fun2a from '@/pages/Fun2a/Fun2a';
import Fun2b from '@/pages/Fun2b/Fun2b';
import Fun2c from '@/pages/Fun2c/Fun2c';
import Fun2d from '@/pages/Fun2d/Fun2d';
import Fun2e from '@/pages/Fun2e/Fun2e';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login,
    // },
    // {
    //   path: '/error',
    //   name: 'Error',
    //   component: ErrorPage,
    // },
    {
      path: '/app/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Dashboard,
        },
        {
          path: 'datafuc/Fun2a',
          name: 'Fun2a',
          component: Fun2a,
        },{
          path: 'datafuc/Fun2b',
          name: 'Fun2b',
          component: Fun2b,
        },{
          path: 'datafuc/Fun2c',
          name: 'Fun2c',
          component: Fun2c,
        },{
          path: 'datafuc/Fun2d',
          name: 'Fun2d',
          component: Fun2d,
        },{
          path: 'datafuc/Fun2e',
          name: 'Fun2e',
          component: Fun2e,
        }
      ],
    },
    {
      path: '/app/convert',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'chooseFile',
          name: 'chooseFile',
          component: chooseFile
        },
        {
          path: 'chooseTool',
          name: 'chooseTool',
          component: chooseTool
        },
        {
          path: 'autoIdentity/conversion',
          name: 'autoconvers',
          component: autoConvers,
        },
        {
          path: 'identity/conversion',
          name: 'conversion',
          component: Conversion
        },
        {
          path: 'autoIdentity/conversionResult',
          name: 'conversionResult',
          component: conversionResult
        },
        {
          path: 'identity/conversionResult',
          name: 'conversionResult',
          component: conversionResult
        },
      ]
    }
    // {
    //   path: '*',
    //   name: 'Error',
    //   component: ErrorPage,
    // }
  ],
});
