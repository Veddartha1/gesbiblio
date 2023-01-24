<script>
import { useDataStore } from '../stores/data';
import { mapActions, mapState } from 'pinia';

export default {
    props: {
        libro: {
            type: Object,
        },
    },
    data() {
        return {
            tema: {},
            autor: {}
        }
    },
    computed: {
        ...mapState(useDataStore, {
            getTemaFromId: 'getTemaFromId',
            getAutor: 'getAutor'
        })
    },
    methods: {
        verAutor(autorId) {
            this.$router.push({ name: 'autor', params: { id: autorId }})
        },
        ...mapActions(useDataStore, ['removeLibro']),

        removeLibroFromStore() {
          if (confirm('Se va a borrar ' + this.libro.nombre)) {
                this.removeLibro(this.libro)
            }
        },
    },
    mounted() {
        this.tema = this.getTemaFromId(this.libro.tema)
        this.autor = this.getAutor(this.libro.autor)
    }
}
</script>
<template>
        <div class="col-4">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="'/src/assets/img/' + libro.img" class="card-img-top foto" :alt="libro.nombre" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{libro.nombre}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{autor.nombre}}</h6>
                    <p class="card-text"><small class="text-muted">{{tema.nombre}}</small></p>
                    <p class="card-text">{{libro.desc}}</p>
                    <button class="btn btn-secondary" title="Editar" @click="this.$router.push('/edit/libro/' + libro.id)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-secondary" title="Eliminar" @click="removeLibroFromStore()">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-secondary" title="Ver libros" @click="verAutor(autor.id)">
                      <i class="bi bi-person"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>