<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        {{messages}}
        <hr />
      </div>
      <v-card class="overflow-y-auto" max-height="600" id="mensajes">
        <div class="card-body">
          <div class="messages">
            <v-col
              v-for="message in messages"
              :key="message.id"
              v-if="user != ''"
            >
              <v-container>
                <v-row dense>
                  <v-col cols="6" v-if="message.user === user"></v-col>
                  <v-col cols="6">
                    <v-card color="#385F73" dark>
                      <v-card-title class="text-h5">{{
                        message.message
                      }}</v-card-title>
                      <v-card-subtitle>{{ message.user }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </div>
        </div>
      </v-card>
    </div>
    <div class="card-footer">
      <v-spacer></v-spacer>
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <v-text-field
            @change="scrollDown()"
            label="Usuario"
            class="form-control"
            v-model="user"
          ></v-text-field>
        </div>
        <div class="gorm-group pb-3">
          <v-row v-if="user != ''">
            <v-text-field
              label="Mensaje"
              class="form-control"
              v-model="message"
              filled
              clear-icon="mdi-close-circle"
            ></v-text-field>
            <v-btn type="submit" color="success">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-row>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
    import io from 'socket.io-client';
    export default {
        data: () =>({
                user: '',
                message: '',
                messages: [],
                socket : io("http://localhost:3001", {transports: ['websocket']})
        }),
        methods: {
            sendMessage(e) {
                e.preventDefault();
                if(this.message!=''){
                    this.socket.emit('SEND_MESSAGE', {
                      user: this.user,
                      message: this.message
                    });
                    this.message = ''
                    this.scrollDown();
                }
            },
            scrollDown(){
                const container = document.querySelector("#mensajes");
                const scrollHeight = container.scrollHeight;
                container.scrollTop = scrollHeight;
            },
        },
        mounted() {
            this.socket.on('MESSAGE', (data) => {
                this.messages= data
            });
            this.scrollDown()
        },
        watch:{
            user(){
                this.scrollDown()
            }
        },
        computed: {
            pageHeight () {
            return document.body.scrollHeight
            }
        }
    }
</script>
