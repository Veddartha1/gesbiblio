<script>
import { useDataStore } from '../stores/data';
import { mapState } from 'pinia';

export default {
    computed: {
        ...mapState(useDataStore, {
            autores: 'autores',
            numAutores: 'numAutores',
        })
    },
    methods: {
        verAutor(autorId) {
            this.$router.push({ name: 'autor', params: { id: autorId }})
        },
    }
}
</script>

<template>
    <div class="row">
        <div class="col-12">
            <h2>Listado de autores</h2>
        </div>
        <div class="col-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Nacionalidad</th>
                        <th>Foto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="autor in autores"
                    :key="autor.id"
                    >
                        <td>{{autor.id}}</td>
                        <td>{{autor.nombre}}</td>
                        <td>{{autor.apellidos}}</td>
                        <td>{{autor.nacionalidad}}</td>
                        <td><img :src="'/src/assets/img/' + autor.img" :alt="autor.name"></td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <button type="button" class="btn btn-secondary" @click="verAutor(autor.id)">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-secondary" @click="this.$router.push('/libros/autor/' + autor.id)">
                                            <i class="bi bi-book"></i>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Autores listados:</th>
                        <th>{{numAutores}}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
<style>
td img {
    height: 150px;
}
</style>