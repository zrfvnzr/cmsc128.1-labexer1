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
  },
  mounted() {
    console.log('mounted')
  }
}
</script>

<template>
<div id="appMainDiv">
  <h1>
    CMSC 128.1 Lab Activity 1
  </h1>
  <br>
  <h3>Basic Login System Created by <u>John Paolo M. Licup</u></h3>
  <button @click="showAuth('login')" class="myButtons">Login</button>
  <button @click="showAuth('register')" class="myButtons">Register</button>
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
.myButtons {
  margin-top: 1rem;
  padding: 0.3em 1em;
  font-size: 1rem;
  background: transparent;
  border-radius: 5px;
  border: 2px solid black;
  box-shadow: 0px 0px 5px 0px gray;
  cursor: pointer;
  outline: none;
  transition-duration: 0.3s;
  transform-origin: center;
  transition-property: transform;   
}

  .myButtons:hover {
    transform: scale(1.1)
  }
</style>
