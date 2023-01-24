<script>
    import { useDataStore } from '../stores/data';
    import { mapState } from 'pinia';

export default {
    data() {
      return {
        autor: {}
      }
    },
    computed: {
        ...mapState(useDataStore, {
            getAutor: 'getAutor',
        })
    },
    mounted() {
      if (this.$route.params.id) {
          this.autor = this.getAutor(this.$route.params.id)
      }  
    }
}
</script>
<template>
    <div class="row">
        <div class="col-4">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img v-if="autor.img != ''" :src="'/src/assets/img/' + autor.img" class="card-img-top foto" :alt="autor.nombre" />
                  <img v-else :src="'/src/assets/img/default.jpg'" class="card-img-top foto" :alt="autor.nombre" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{autor.nombre}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{autor.nacionalidad}}</h6>
                    <button class="btn btn-secondary" title="Ver libros" @click="this.$router.push('/libros/autor/' + autor.id)">
                      <i class="bi bi-book"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
           </div>
    </div>
</template>