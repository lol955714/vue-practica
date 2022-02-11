<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Chat />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from './chat.vue'

export default {
  name: 'app',
  components: {
    Chat
  },
}
</script>

<style>

</style>