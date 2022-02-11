<template>
    <v-dialog
        v-model="show"
        max-width="720"
        max-height="720px"
        persistent
    >
        <v-card class="px-10 pt-10" >
                <v-spacer></v-spacer>
                <label
                    label="label"
                    id="id"
                >
                    Ingreso de novelas
                </label>
                <v-form ref="novela"  @submit.prevent="onSubmit">
                    <v-text-field
                        name="title"
                        label="title"
                        v-model="novela.title"
                    ></v-text-field>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="true"
                        reactive
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="novela.year" 
                                label="Fecha de estreno"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            :active-picker.sync="activePicker"
                            v-model="novela.year" 
                            no-title
                            reactive
                            show-current
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            min="1800-01-01"
                            >
                        </v-date-picker>
                    </v-menu>   
                    <v-select
                        name="country"
                        v-model="novela.country"
                        label="country"
                        :items="getAllPaises"
                    ></v-select>
                    <v-text-field
                        @change="buscarPelicula(buscador)"
                        ref="posterIMDB"
                        name="name"
                        label="Nombre de la pelicula/serie"
                        id="id"
                        v-model="buscador"
                        class="hide"
                    >
                    </v-text-field>
                    <v-img
                        :src="novela.poster">
                    </v-img>
                    <v-text-field
                        name="seasons"
                        label="seasons"
                        v-model="novela.seasons"
                    ></v-text-field>
                    <v-select
                        name="genre"
                        label="genre"
                        v-model="novela.genre"
                        :items="generos"
                    ></v-select>
                    <v-text-field
                        name="summary"
                        label="summary"
                        v-model="novela.summary"
                    ></v-text-field>
                </v-form>
                <v-row>
                    <v-flex v-if="item._id">
                        <v-btn 
                            color="success" 
                            @click="actualizarNovela(novela)">
                                    Actualizar
                        </v-btn>
                        <v-btn 
                            color="red" 
                            @click="borrarNovela(novela)">
                                    Eliminar
                        </v-btn>
                    </v-flex>
                    <v-flex v-if="!item._id">
                        <v-btn 
                            color="success" 
                            @click="guardarPelicula(novela)">
                                    Agregar
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            color="yellow" 
                            @click="show=false">
                            Cancelar
                        </v-btn>
                    </v-flex>
                   
                </v-row>
        </v-card>
    </v-dialog>
    
</template>
<script>
import { mapActions, mapGetters } from "vuex";
    export default{
        props: {
            value: Boolean,
            item: {
                type: Object
            }
        },
        data: ()=>({
            activePicker: "month",
            buscador: "",
            generos:[
                "Drama",
                "Fantasy",
                "Sci-Fi",
                "Thriller",
                "Comedy"
            ],
            menu: false,
            novela:{
                title: '',
                year: '',
                country: '',
                poster: '',
                seasons:'',  
                genre:'',
                summary:''
            },
            fake:{
                title: '',
                year: '',
                country: '',
                poster: '',
                seasons:'',  
                genre:'',
                summary:''
            }
        }),
        methods:{
            ...mapActions({
                agregarNovela: "novelas/agregarNovela",
                fetchPaises: "paises/fetchPaises",
                fetchPeliculas: "peliculas/fetchPeliculas",
                eliminarNovela:"novelas/eliminarNovela",
                updateNovela:"novelas/updateNovela"

            }),
            guardarPelicula(pelicula){
                this.agregarNovela(pelicula)
                this.$emit('update-novelas')
                this.show=false;
            },
            buscarPelicula(string){
                    this.fetchPeliculas(string)
            },
            borrarNovela(item){
                this.eliminarNovela(item)
                this.$emit('update-novelas')
                this.show=false;
            },
            actualizarNovela(novela){
                this.updateNovela(novela)
                this.$emit('update-novelas')
                this.show=false;
            }
        },
        computed:{
            ...mapGetters({
                getAllPaises: "paises/getAllPaises",
                getPeliculas: "peliculas/getPeliculas",

            }),
            show:{
                get(){
                    return this.value
                },
                set(value){
                    this.$emit('input', value)
                }
            }
        },
        watch: {
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        getPeliculas(){
            this.novela.poster=this.getPeliculas.Poster
        }
        },
        mounted(){
            if(this.item._id==undefined){
                this.novela=this.fake
            }else{
                this.novela=this.item
            }
            this.fetchPaises();
        }
    }
</script>