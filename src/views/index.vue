<template>
    <v-container grid-list-xs>
      <v-tabs
        v-model="value"
        background-color="transparent"
      color="basil"
        slider-color="primary"
      >
        <v-tab
        v-for="item in headers" :key="item.value"
      >
        {{item.value}}
      </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="value"
        >
        <v-tab-item>
          <camara/>
        </v-tab-item>
        <v-tab-item>
          <data_table/>
        </v-tab-item>
         <v-tab-item>
          <chat/>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
</template>
<script>
  import data_table from '../components/novelas/data-table.vue'
  import chat from '../components/chat.vue'
  import camara from "../components/camara.vue"
  export default {
    data: ()=>({
      headers:[
        {value:'chat'}, 
        {value:'data_table'}, 
        {value:'camara'}
      ],
      value:''
    }),
    components: {
        chat,
        camara,
        data_table,
    },
  }
</script>