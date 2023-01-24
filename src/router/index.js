import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddLibroView from  '../views/AddLibroView.vue'
import AutoresView from  '../views/AutoresView.vue'
import LibrosView from  '../views/LibrosView.vue'
import AutorView from '../views/AutorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-libro',
      name: 'add-libro',
      component: AddLibroView
    },
    {
      path: '/edit/libro/:id',
      name: 'edit-libro',
      component: AddLibroView
    },
    {
      path: '/autores',
      name: 'autores',
      component: AutoresView
    },
    {
      path: '/autor/:id',
      name: 'autor',
      component: AutorView
    },
    {
      path: '/libros',
      name: 'libros',
      component: LibrosView
    },
    {
      path: '/libros/autor/:id',
      name: 'libros-autor',
      component: LibrosView
    },
  ]
})

export default router
