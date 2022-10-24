import {createRouter, createWebHistory} from "vue-router";
import ThanksPage from './ThanksPage.vue'
import GalleryPage from './GalleryPage.vue'
import IndexPage from './IndexPage.vue'
import Attendance from './AttendancePage.vue'
import DefaultLayout from "./DefaultLayout.vue"
import imageThanks from "./imageThanksPage.vue"

export const routes = [
    {
        path: '/',
        name: '',
        component: DefaultLayout,
        children :[
            {
                path: '/',
                name: 'index',
                component: IndexPage,
            },
            {
                path: '/gallery',
                name: 'gallery',
                component: GalleryPage,
            },
            {
                path: '/attendance',
                name: 'attendance',
                component: Attendance,
            },
            {
                path: '/thanks',
                name: 'thanks',
                component: ThanksPage,
            },
            {
                path: '/thanks-for-photo',
                name: 'thanks-for-post',
                component: imageThanks,
            },
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
