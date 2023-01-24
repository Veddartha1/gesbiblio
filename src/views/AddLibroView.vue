<script>
import { useDataStore } from '../stores/data';
import { mapActions, mapState } from 'pinia';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const mySchema = yup.object({
            nombre: yup.string().required('El nombre es obligatorio').min(2, 'El nombre debe tener al menos 3 carácteres').max(50, 'El nombre debe tener un máximo de 50 carácteres'),
            ISBN: yup.string().required('El ISBN es obligatorio').matches(/^[0-9]+$/, 'Debes introducir sólo números').min(10, 'El ISBN debe tener 10 números').max(10, 'El ISBN debe tener 10 números'),
            autor: yup.string().required('El autor es obligatorio'),
            tema: yup.string().required('El tema es obligatorio'),
        })

        return {
            mySchema,
            libro: {}
        }
    },
    computed: {
        ...mapState(useDataStore, {
            autores: 'autores',
            temas: 'temas',
            getLibroFromId: 'getLibroFromId'
        }),
    
    },
    methods: {
        ...mapActions(useDataStore, ['addLibro', 'updateLibro']),
        onSubmit(values) {
            if (this.$route.params.id) {
                this.updateLibro(values)
            } else {
                this.addLibro(values)
            }
            this.$router.push({ name: 'libros' })
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.libro = this.getLibroFromId(this.$route.params.id)
        }  
    }
}
</script>
<template>
    <h2 class="m-2">{{ this.$route.params.id ? 'Editar ' : 'Nuevo ' }}Libro</h2>
    <Form class="row g-3 align-items-center p-2 my-2" :initial-values="libro" :validation-schema="mySchema" @submit="onSubmit">
        <div class="row">
            <div class="col-3">
                <label class="form-label">ID</label>
                <Field name="id" type="text" class="form-control" disabled />
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="form-group">
                    <label class="form-label">Nombre</label>
                    <Field name="nombre" type="text" class="form-control" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group my-3">
                <ErrorMessage class="alert alert-danger" role="alert" name="nombre" />
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="form-group">
                    <label class="form-label">ISBN</label>
                    <Field name="ISBN" type="text" class="form-control" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group my-3">
                <ErrorMessage class="alert alert-danger" role="alert"  name="ISBN" />
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="form-group my-3">
                    <Field as="select" class="form-select" name="autor">
                        <option disabled selected hidden value=''>Selecciona autor</option>
                        <option v-for="autor in autores" :key="autor.id" :value="autor.id">
                            {{ autor.nombre + autor.apellidos }}
                        </option>
                    </Field>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group my-3">
                <ErrorMessage class="alert alert-danger" role="alert"  name="autor" />
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="form-group my-3">
                    <Field as="select" class="form-select" name="tema">
                        <option disabled selected hidden value=''>Selecciona un tema</option>
                        <option v-for="tema in temas" :key="tema.id" :value="tema.id">
                            {{ tema.nombre }}
                        </option>
                    </Field>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group my-3">
                <ErrorMessage class="alert alert-danger" role="alert" name="tema" />
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="form-group">
                    <label class="form-label">Descripci&oacute;n</label>
                    <Field name="desc" type="textarea" rows="6" cols="40" class="form-control" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="form-group">
                    <label class="form-label">Imagen</label>
                    <Field name="img" type="text" class="form-control" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3 p-3">
                <div class="form-group">
                    <button type="submit" class="btn btn-secondary">{{ this.$route.params.id ? 'Editar' : 'Añadir' }}</button>
                    <button type="reset" class="btn btn-danger mx-2 ">Reset</button>
                    <button type="button" class="btn btn-warning" @click="this.$router.push('libros')">Cancelar</button>
                </div>
            </div>
        </div>
    </Form>
</template>