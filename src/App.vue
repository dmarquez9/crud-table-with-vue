<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue'
import store from './store'

export default {
  name: 'App',
  components: {
    Home
  },
  store
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 90%;
  margin: 60px auto;
  background-color: #fefefe;
}

body.modal-open {
  overflow: hidden;
}

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,.2)
}

.modal .modal-body {
  width: 500px;
  max-width: 100%;
  background-color: #fff;
  padding: 1.2rem;
  border-radius: 1rem;
  margin: .5rem auto;
}

.modal .modal-body form h3 {
  margin-top: 0;
}

.modal .modal-body input {
  display: block;
}

.modal .modal-body input + input {
  margin-top: 1rem;
}
</style>
