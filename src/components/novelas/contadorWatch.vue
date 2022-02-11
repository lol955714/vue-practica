<template>
    <v-container grid-list-xs>
        <v-text-field
        name="name"
        :value="count"
        label="conteo"
        id="id"
    ></v-text-field>
    </v-container>
</template>
<script>
    import {mapActions, mapGetters} from "vuex";
    export default{
         methods: {
            ...mapActions({
                        setNovelas: "novelas/fetchNovelas",
                        sumarCount: "novelas/sumarCount",
                        restarCount: "novelas/restarCount"
                        })
        },
        computed: {
            ...mapGetters({
                        novelas: "novelas/getAllNovelas" ,
                        count: "novelas/getCount"
                        })
        },
    }
</script>