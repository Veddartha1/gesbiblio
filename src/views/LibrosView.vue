<script>
    import { useDataStore } from '../stores/data';
    import { mapState } from 'pinia';
    import LibroItem from '../components/LibroItem.vue'

export default {
    components: {
        LibroItem
    },
    data() {
      return {
        autor: {},
        arrayLibros: [],
        tema: '',
      }
    },
    computed: {
        ...mapState(useDataStore, {
            getAutor: 'getAutor',
            getLibrosFromAutor: 'getLibrosFromAutor',
            getLibros: 'getLibros',
            temas: 'temas',
            getLibrosFromTema: 'getLibrosFromTema',
            libros: 'libros',
        }),
    },
    methods: {
      checkRoute() {
        if (this.$route.params.id) {
        this.autor = this.getAutor(this.$route.params.id),
        this.arrayLibros = this.getLibrosFromAutor(this.$route.params.id)
        } else {
          this.arrayLibros = this.getLibros
        }
      }
    },
    watch: {
    $route() {
      this.checkRoute()
    },
    tema(newValue, oldValue) {
      if (this.$route.params.id) {
        if (this.tema === 'todos') {
          this.arrayLibros = this.getLibrosFromAutor(this.autor.id)
        } else {
          this.arrayLibros = this.getLibrosFromAutor(this.autor.id).filter((libro) => libro.tema === Number(this.tema))
        }
      } else {
        if (this.tema === 'todos') {
          this.arrayLibros = this.libros
        } else {
          this.arrayLibros = this.getLibrosFromTema(this.tema)
        }
      }
    }
  },
    mounted() {
      this.checkRoute()
    }
}
</script>
<template>
  <div class="row p-2">
    <h2 class="col-12 my-2">{{this.$route.params.id ? 'Libros de ' + autor.nombre  : 'Todos los libros'}}</h2>
    <form class="col-4">
        <select class="form-select" v-model="tema">
          <option selected disabled hidden value="">Selecciona un tema</option>
          <option v-for="tema in temas" :key="tema.id" :value="tema.id">
              {{ tema.nombre }}
          </option>
          <option value="todos">Todos</option>
      </select>
    </form>
  </div>
  <div class="row p-2">
    <libro-item v-for="libro in arrayLibros"
    :key="libro.id"
    :libro="libro"
    >
    </libro-item>
  </div>
</template>