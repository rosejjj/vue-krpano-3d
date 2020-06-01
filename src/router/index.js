import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/basic',
    component: () => import('@/views/home/Home'),
    children: [
      {
        path: 'basic',
        name: 'basic',
        component: () => import('@/views/edit/component/workCode')
      },
      {
        path: 'hotspot',
        name: 'hotspot',
        component: () => import('@/views/edit/component/hotspot')
      },
      {
        path: 'perspe',
        name: 'perspe',
        component: () => import('@/views/edit/component/perspe')
      },
      {
        path: 'music',
        name: 'music',
        component: () => import('@/views/edit/component/musicEdit')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
});

export default router;
