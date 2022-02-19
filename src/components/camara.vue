<template>
    <v-app>
       <v-container grid-list-xs>
       <v-row>
            <v-col>
                <video id="webcam" autoplay playsinline width="120" height="120"></video>
                     <canvas id="canvas" class="d-none"></canvas>
            </v-col>
            <v-col>
                <v-row align-content:center>
                    <v-btn color="success" @click="photo()" v-if="on">photo</v-btn>
                    <v-btn color="success" @click="start()" v-if="! on">start</v-btn>
                    <v-btn color="success" @click="stop()" v-if="on">stop</v-btn>
                </v-row>
            </v-col>
            <v-col>
                <v-img 
                    :src="foto.image"
                    width="120" 
                    height="120"
                ></v-img>
            </v-col>
       </v-row> 
       <v-row>
            {{fotos.length}} fotos
            <v-carousel
            hide-delimiters
            height="auto"
            >
                <v-carousel-item
                v-for="(item,i) in fotos"
                :key="i"
                :src="conversionUrl(item)"
                reverse-transition="fade-transition"
                transition="fade-transition"
                >
                <v-btn color="red" @click="borrarFoto(item)">Eliminar foto # {{++i}}</v-btn>
                </v-carousel-item>
            </v-carousel>
       </v-row>
       </v-container>
    </v-app>
</template>
<script>
    import Webcam from 'webcam-easy';
    import { mapActions, mapGetters } from "vuex";
    export default {
        data: ()=>({
            camara: null,
            foto:{
                image:''
            },
            on: false,
            links:[]
        }),
        methods:{
        ...mapActions({
            agregarFoto: "fotos/agregarFoto",
            eliminarFoto:"fotos/eliminarFoto",
            fetchFotos:"fotos/fetchFotos"
        }),
        init: async function () {
        const webcamElement = document.getElementById('webcam');
        const canvasElement = document.getElementById('canvas');
        //const snapSoundElement = document.getElementById('snapSound');
        const webcam = new Webcam(webcamElement, 'user', canvasElement);
        this.camara=webcam
        },
        photo(){
            this.foto.image= this.camara.snap();
            this.agregarFoto(this.foto)
            this.links.push(this.foto)
            this.fetchFotos();
        },
        stop(){
            this.camara.stop();
            this.on=false
        },
        start(){
            this.on=true
            this.camara.start()
            .then(result =>{
                console.log("webcam started");
            })
            .catch(err => {
                console.log(err);
            });
        },
        conversionUrl(item){
            return "http://localhost:3000/"+item.urlStorage+"";
        },
        borrarFoto(id){
            this.eliminarFoto(id)
            this.fetchFotos();
        }
    },
    computed:{
        ...mapGetters({
            fotos:"fotos/getAllFotos"
        }),
    },
    mounted: function () {
		this.init();
        this.fetchFotos();
	}
    }
</script>
<style>

</style>