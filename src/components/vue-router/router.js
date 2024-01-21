/*
 * @Author: CuiMuxuan
 * @Description:
 * @Date: 2023-03-19 17:52:59
 * @LastEditTime: 2023-03-24 12:25:18
 * @FilePath: \white-front\src\components\vue-router\router.js
 */
import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/top'},
        {path: '/top', component: () => import('../views/Top.vue')},
        {path: '/max', component: () => import('../views/Max.vue')},
        {path: '/about', component: () => import('../views/About.vue')},
        {path: '/train', component: () => import('../views/Train.vue')},
        {path: '/rank', component: () => import('../views/Rank.vue')},
        {path: '/compute', component: () => import('../views/Compute.vue')},
        {path: '/create-notice', component: () => import('../about/CreateNotice.vue')},
        {path: '/guide/:id', component: () => import('../views/Guide.vue')},
    ]
})
export default router