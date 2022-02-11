<template>
    <v-app>
       <v-container grid-list-xs>
       <v-row>
            <v-col>
                <video id="webcam" autoplay playsinline width="640" height="480"></video>
                     <canvas id="canvas" class="d-none"></canvas>
            </v-col>
            <v-col>
                <v-row>
                    <v-btn color="success" @click="photo()" v-if="on">photo</v-btn>
                    <v-btn color="success" @click="start()" v-if="! on">start</v-btn>
                    <v-btn color="success" @click="stop()" v-if="on">stop</v-btn>
                </v-row>
            </v-col>
            <v-col>
                <v-img :src="foto"></v-img>
            </v-col>
       </v-row>  
       </v-container>
    </v-app>
</template>
<script>
    import Webcam from 'webcam-easy';
    export default {
        data: ()=>({
            camara: null,
            foto:null,
            on: false
        }),
        methods:{
         init: async function () {
            const webcamElement = document.getElementById('webcam');
            const canvasElement = document.getElementById('canvas');
            //const snapSoundElement = document.getElementById('snapSound');
            const webcam = new Webcam(webcamElement, 'user', canvasElement);
            this.camara=webcam
            },
            photo(){
                this.foto= this.camara.snap();
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
            }
    },
    mounted: function () {
		this.init();
	}
    }
</script>
<style>

</style>