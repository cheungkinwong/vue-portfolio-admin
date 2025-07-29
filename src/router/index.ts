import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import LoginPage from '@/pages/Login.vue'
import HomePage from '@/pages/Home.vue'

const routes = [
  { path: '/login', component: LoginPage },
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  { path: '/section', component: () => import('@/pages/section/SectionList.vue'), meta: { requiresAuth: true }},
  { path: '/section/:id/edit', component: () => import('@/pages/section/SectionFormPage.vue'), meta: { requiresAuth: true } },
  
  { path: '/workexperience', component: () => import('@/pages/workexperience/WorkExperienceList.vue'), meta: { requiresAuth: true }},
  { path: '/workexperience/new', component: () => import('@/pages/workexperience/WorkExperienceFormPage.vue'), meta: { requiresAuth: true }},
  { path: '/workexperience/:id/edit', component: () => import('@/pages/workexperience/WorkExperienceFormPage.vue'), meta: { requiresAuth: true } },

  { path: '/education', component: () => import('@/pages/education/EducationList.vue'), meta: { requiresAuth: true }},
  { path: '/education/new', component: () => import('@/pages/education/EducationFormPage.vue'), meta: { requiresAuth: true }},
  { path: '/education/:id/edit', component: () => import('@/pages/education/EducationFormPage.vue'), meta: { requiresAuth: true }},

  { path: '/softskill', component: () => import('@/pages/softskill/SoftSkillList.vue'), meta: { requiresAuth: true }},
  { path: '/softskill/new', component: () => import('@/pages/softskill/SoftSkillFormPage.vue'), meta: { requiresAuth: true }},
  { path: '/softskill/:id/edit', component: () => import('@/pages/softskill/SoftSkillFormPage.vue'), meta: { requiresAuth: true }},

  { path: '/technicalskill', component: () => import('@/pages/technicalskill/TechnicalSkillList.vue'), meta: { requiresAuth: true }},
  { path: '/technicalskill/new', component: () => import('@/pages/technicalskill/TechnicalSkillFormPage.vue'), meta: { requiresAuth: true }},
  { path: '/technicalskill/:id/edit', component: () => import('@/pages/technicalskill/TechnicalSkillFormPage.vue'), meta: { requiresAuth: true }},

  { path: '/hobby', component: () => import('@/pages/hobby/HobbyList.vue'), meta: { requiresAuth: true }},
  { path: '/hobby/new', component: () => import('@/pages/hobby/HobbyFormPage.vue'), meta: { requiresAuth: true }},
  { path: '/hobby/:id/edit', component: () => import('@/pages/hobby/HobbyFormPage.vue'), meta: { requiresAuth: true }},

  { path: '/project', component: () => import('@/pages/project/ProjectList.vue'), meta: { requiresAuth: true }},
  { path: '/project/new', component: () => import('@/pages/project/ProjectFormPage.vue'), meta: { requiresAuth: true }},
  { path: '/project/:id/edit', component: () => import('@/pages/project/ProjectFormPage.vue'), meta: { requiresAuth: true }},

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    localStorage.removeItem('token')
    if (to.meta.requiresAuth) {
      return next('/login')
    }
    return next()
  }

  const token = localStorage.getItem('token')

  const isExpired = !token || (() => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return Date.now() >= payload.exp * 1000
    } catch {
      return true
    }
  })()

  if (isExpired) {
    localStorage.removeItem('token')
    auth.logout()
    if (to.meta.requiresAuth) {
      return next('/login')
    }
  }

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (token && !auth.token) {
    auth.token = token
  }

  next()
})


export default router
