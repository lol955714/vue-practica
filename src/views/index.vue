<template>
    <v-container grid-list-xs>
      <camara/>
    </v-container>
</template>
  
<script>
  //import data_table from '../components/novelas/data-table.vue'
  //import chat from '../components/chat.vue'
  import camara from "../components/camara.vue"
  export default {
    name: 'Home',
    input:"hola",
    components: {
        //data_table,
        //chat
        camara
    },
  }
</script>