import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      'target': 'http://0.0.0.0:3001',
      'changeOrigin': true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  qiankun: {
    slave: {}
  },
  esbuild: {},
  routes: [
    {
      path: '/',
      component: '@/layouts',
      routes:[
        {
          path:'/',
          component: './index'
        },
        {
          path:'/:id',
          component: './article'
        },
      ],
    },
  ],
});
