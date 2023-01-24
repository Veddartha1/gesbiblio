<script>
import AppMenu from './components/AppMenu.vue'
import AppFooter from './components/AppFooter.vue'
import {useDataStore} from './stores/data.js'
import { mapActions } from 'pinia'

export default ({
  components: { 
    AppMenu,
    AppFooter,
  },
  computed: {
    ...mapActions(useDataStore, {
        loadData: 'loadData',
    })
  },
  mounted() {
    this.loadData
  }
})
</script>

<template>
  <div class="container-flex">
    <app-menu></app-menu>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>