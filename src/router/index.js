import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [{
            name: '',
            path: '/',
            redirect: '/down', // 重定向
        },
        {
            path: '/login',
            name: 'login',
            component: (resolve) => require(['@/views/login'], resolve),
            meta: {
                title: '登录',
            },
        },
        {
            path: '/down',
            name: 'down',
            component: (resolve) => require(['@/views/down'], resolve),
            meta: {
                title: '下载',
            },
        },
        {
            path: '/register',
            name: 'register',
            component: (resolve) => require(['@/views/register'], resolve),
            meta: {
                title: '分享',
            },
        },
    ],
});

const whiteList = ['/login', '/down', '/register'];
router.beforeEach(async(to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (whiteList.includes(to.path)) {
        if (store.getters.isLogin && to.path === 'login') {
            next('/');
            return;
        }
        Vue.navigation.cleanRoutes();
        next();
        return;
    }
    if (!store.getters.isLogin) {
        next('/login');
        return;
    }
    next();
});

export default router;