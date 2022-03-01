import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home.vue'
import AdminLinks from '@/components/admin/AdminLinks.vue'
import Auth from '@/components/auth/Auth.vue'

Vue.use(VueRouter)

const routes =[{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'links',
    path: '/links',
    component: AdminLinks
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

export default new VueRouter({
    mode:'history',
    routes
})

 