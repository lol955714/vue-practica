<template> 
    <v-container grid-list-xs>
    <div class="d-flex flex-column justify-space-between align-center">
        <v-text-field
            @change="buscarPelicula(buscar)"
            name="name"
            label="Nombre de la pelicula/serie"
            id="id"
            v-model="buscar"
        ></v-text-field>
        <v-img
        :src="getPeliculas.Poster">
        </v-img>
        <v-btn color="success">Guardar Imagen</v-btn>
    </div>
    </v-container>
</template>
<script>
    import {mapActions, mapGetters} from "vuex"
    export default {
        data: () =>({
            buscar:''
        }),
        methods:{
            ...mapActions({
                fetchPeliculas: "peliculas/fetchPeliculas"
            }),
            buscarPelicula(string){
                this.fetchPeliculas(string)
            }
        },
        computed:{
            ...mapGetters({
                getPeliculas: "peliculas/getPeliculas"
            }),
        }
    }
</script>