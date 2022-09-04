<script>
import Auth from './components/Auth.vue'
export default {
  components: {
    Auth
  },
  methods: {
    showAuth(initial) {
      this.$refs.auth.showAuth(initial)
    }
  }
}
</script>

<template>
<div id="appMainDiv">
  <h1>
    App.vue
  </h1>
  <button @click="showAuth('login')">Login</button>
  <button @click="showAuth('register')">Register</button>
<Auth ref="auth"/>
</div>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}
#appMainDiv {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
