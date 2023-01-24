import { defineStore } from 'pinia'

import axios from 'axios'

const SERVER = import.meta.env.VITE_SERVERURL

export const useDataStore = defineStore('data', {
  state: () => ({
    temas: [],
    autores: [],
    libros: [],
  }),
  getters: {
    // reciben como primer parámetro el 'state'
    numAutores: (state) => state.autores.length,
    getAutor: (state) => (id) => {
        return state.autores.find((autor) => autor.id === Number(id))
    },
    getLibros: (state) => state.libros,
    getLibrosFromAutor: (state) => (autorId) => {
        return state.libros.filter((libro) => libro.autor === Number(autorId))
    },
    getLibrosFromTema: (state) => (temaId) => {
        return state.libros.filter((libro) => libro.tema === Number(temaId))
    },
    getTemaFromId: (state) => (id) => {
        return state.temas.find((tema) => tema.id === Number(id))
    },
    getLibroFromId: (state) => (id) => {
        return state.libros.find((libro) => libro.id === Number(id))
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    async addLibro(libro){
        if (libro) {
            try {
                const response = await axios.post(SERVER + '/libros', {
                    ISBN: libro.ISBN,
                    nombre: libro.nombre,
                    tema: libro.tema,
                    autor: libro.autor,
                    desc: libro.desc,
                    img: libro.img
                })
                this.libros.push(response.data)
            } catch (err) {
                alert(err)
            }
        }
    },
    async updateLibro(item){
        if (item) {
            try {
                const response = await axios.patch(SERVER + '/libros/' + item.id, {
                    ISBN: item.ISBN,
                    nombre: item.nombre,
                    tema: item.tema,
                    autor: item.autor,
                    desc: item.desc,
                    img: item.img
                })
                let elem = this.libros.find(libro => libro.id == item.id)
                elem.ISBN = response.data.ISBN
                elem.nombre = response.data.nombre
                elem.tema = response.data.tema
                elem.autor = response.data.autor
                elem.desc = response.data.desc
                elem.img = response.data.img
            } catch (err) {
                alert(err)
            }
        }
    },
    async loadData() {
        try {
            const responseAutores = await axios.get(SERVER + '/autores')
            this.autores = responseAutores.data
            const responseTemas = await axios.get(SERVER + '/temas')
            this.temas = responseTemas.data
            const responseLibros = await axios.get(SERVER + '/libros')
            this.libros = responseLibros.data
        } catch (err){
            alert(err)
        }
    },
    async removeLibro(item){
        try {
            const response = await axios.delete(SERVER + '/libros/' + item.id)
            this.libros.splice((this.libros.findIndex(libro => libro.id == item.id)), 1)
        } catch (err) {
            alert(err)
        }
    },
  },
})