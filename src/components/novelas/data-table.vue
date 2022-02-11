<template>
    <v-container grid-list-xs>
        <v-btn 
        color="success"
        @click="cambiarEdit(null)"
        >
            Agregar
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="buscar"
            label="buscar"
        ></v-text-field>
        <v-data-table
            :headers="headers"
            :items-per-page="5"
            :items="novelas"
            loading-text="Loading... Please wait"
            class="elevation-1"
            pagination.sync="pagination"
            :search= "buscar"
        >
            <template #[`item.acciones`]="{ item }">
                <v-btn 
                @click="cambiarEdit(item)"
                color="success">
                   Detalle 
                </v-btn>
            </template>
        </v-data-table>
        <agregar v-if="detalle" v-model="detalle" :item="idEdicion" @update-novelas='refresh'/>
        
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import agregar from './agregar.vue'

    export default{
        components:{
            agregar,
        },
        data: () => ({
            idEdicion:{
                type: Object
            },
            buscar:'',
            show:false,
            detalle:false,
            headers:[
                {
                    text: "Title",
                    value: "title"
                },
                {
                    text: "Year", 
                    value: "year"
                },
                {
                    text: "Country", 
                    value: 'country'
                },
                {
                    text: "Seasons", 
                    value: 'seasons'
                },
                {
                    text: "Genre", 
                    value: "genre"
                },
                {
                    text: "Summary", 
                    value: 'summary'
                },
                {
                    text : "Acciones",
                    value: "acciones"
                }
            ]
        }),
        methods: {
            ...mapActions({
                        setNovelas: "novelas/fetchNovelas",
                        }),
            cambiarDetalle:function(){
                if(this.detalle) this.detalle=false
                else this.detalle=true
            },
            cambiarEdit:function(id){
                this.idEdicion= {...id}
                this.cambiarDetalle()
            },
            refresh:function(){
                this.cambiarDetalle()
                this.setNovelas()
            }
        },
        computed: {
            ...mapGetters({
                        novelas: "novelas/getAllNovelas" ,
                        count: "novelas/getCount"
                        }),
            
        },
        mounted(){
            this.setNovelas()
        },
    }
</script>
