<script>
import * as Realm from 'realm-web'
export default {
  name: 'Auth',
  emits: ['loggedIn', 'loggedOut'],
  props: {
    
  },
  data() {
    return {
      clicksEnabled: true,
      loggingIn: false,
      user: {},
      username: '',
      password: '',
    }
  },
  mounted() {
    // this.mongoDBRealmLogin() // temp    
    this.clearInputFields()
    document.getElementById('authMainDiv').style.display = 'none'
    this.$refs.loginDiv.style.display = 'none'
    this.$refs.registerDiv.style.display = 'none'
  },
  methods: {
    checkInputs(mode) { // mode = 'login' || 'register'
      console.log('checkInputs called with param ', mode)
      if (mode === 'login') {
        if (document.getElementById('loginUsername').value === '') {
          // alert('empty username input') // temp
          this.errorInput(document.getElementById('loginUsername'))
          return false
        }
        if (document.getElementById('loginPassword').value === '') {
          // alert('empty password input') // temp
          this.errorInput(document.getElementById('loginPassword'))
          return false
        }
        // alert('checks passed') // temp
        return true
      } else { // if mode === 'register'
        if (document.getElementById('registerUsername').value === '') {
          // alert('empty username input') // temp
          this.errorInput(document.getElementById('registerUsername'))
          return false
        }
        if (document.getElementById('registerPassword').value === '') {
          // alert('empty password input') // temp
          this.errorInput(document.getElementById('registerPassword'))
          return false
        }
        // alert('checks passed') // temp
        return true  
      }
    }, 
    clearInputFields() {
      document.querySelectorAll('.authInput').forEach(el => {
        el.value = ''
      })
      this.username = ''
      this.password = ''
    },
    async doLogin() { // temp
      if (!this.clicksEnabled) {
        console.log('nope') // temp
        return
      }
      this.clicksEnabled = false
      this.loggingIn = true
      if (this.checkInputs('login')) {
        // alert('checks passed on doLogin') // temp
      } else {
        // alert('checks failed on doLogin') // temp
        return
      }
      // alert('logged in as ', this.username) // temp
      // login api
      // let APP_ID = 'application-0-rfndu'
      // const realmApp = new Realm.App({ id: APP_ID });
      // const credentials = Realm.Credentials.anonymous();
      // const user = await realmApp.logIn(credentials);
      // console.log(await user.functions.login(this.username, this.password))
      let response = await this.user.functions.login(this.username, this.password)    
      console.log('response:', response)
      if (response === 'true') {
        // login success
        console.log('login success') // temp
        this.$emit('loggedIn', this.username)
        document.getElementById('authMainDiv').style.display = 'none'
        this.$refs.loginDiv.style.display = 'none'
        this.$refs.registerDiv.style.display = 'none'        
      } else {
        this.errorInput(document.getElementById('loginUsername'))
        this.errorInput(document.getElementById('loginPassword'))
      }
      this.clicksEnabled = true
      this.loggingIn = false
      // this.$emit('loggedIn')
    },
    async doRegister() { // temp
      if (!this.clicksEnabled) {
        console.log('nope') // temp
        return
      }     
      if (this.checkInputs('register')) {
        // alert('checks passed on doRegister') // temp
      } else {
        // alert('checks failed on doRegister') // temp
      }
      this.clicksEnabled = false
      this.loggingIn = true      
      // register api
      let response = await this.user.functions.register(this.username, this.password)
      console.log('response:', response)
      this.clicksEnabled = true
      this.loggingIn = false
      if (response === 'true') {
        // register success
        this.doLogin()
      } else {
        this.errorInput(document.getElementById('registerUsername'))
        this.errorInput(document.getElementById('registerPassword'))  
      }
    },
    errorInput(el) {
      el.style.animation = 'shake 0.5s'
      el.style.border = '2px solid red'
      setTimeout(function() {
        el.style.animation = 'none'
        el.style.border = '1px solid black'
      }, 500)      
    },    
    fadeIn(el) {
      this.clicksEnabled = false
      el.style.display = 'flex'
      el.style.animation = 'fadeIn 0.3s forwards'
      let that = this
      setTimeout(function() {
        that.clicksEnabled = true
      }, 300)
    },
    fadeOut(el) {
      this.clicksEnabled = false
      el.style.animation = 'fadeOut 0.3s forwards'
      let that = this
      setTimeout(function() {
        that.clicksEnabled = true
        el.style.display = 'none'
      }, 300)
    },
    async mongoDBRealmLogin() {
      // Add your APP ID
      let APP_ID = 'application-0-rfndu'
      const realmApp = new Realm.App({ id: APP_ID });
      // Create an anonymous credential
      // const credentials = Realm.Credentials.anonymous();
      // Authenticate the user
      // const user = await realmApp.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      // console.log(user.id === app.currentUser.id); 
      // health function call
      // console.log(await user.functions.health())

      const credentials = Realm.Credentials.apiKey('z1lIrBlAixb8c6l4m2FhEB7i8CgGyMQsZoVvQ3dLtInq6v0OV05qokiPyqTy10Yr')
      this.user = await realmApp.logIn(credentials)
      console.log(await this.user.functions.health())
    },    
    showAuth(initial) {
      this.toggleWindow(initial)
      document.getElementById('authMainDiv').style.display = 'flex'
    },
    toggleWindow(to) {
      if (!this.clicksEnabled) {
        return
      }
      this.clearInputFields()
      if (to === 'login') {
        this.fadeIn(this.$refs.loginDiv)
        if (this.$refs.registerDiv.style.display !== 'none') {
          this.fadeOut(this.$refs.registerDiv)
        }
      } else {
        this.fadeIn(this.$refs.registerDiv)
        if (this.$refs.loginDiv.style.display !== 'none') {
          this.fadeOut(this.$refs.loginDiv)
        }
      }
      // console.log('toggleWindow finishes')
    }
  }
}
</script>
  
<template>
<!-- AUTH CONTAINER -->
<div id="authMainDiv">
  <!-- LOGIN FORM -->
  <div class="form" id="authLoginDiv" ref="loginDiv">
    <h3>Login</h3>
    <label for="loginUsername">Username</label>
    <input @keyup.enter="doLogin()" v-model="username" class="authInput" id="loginUsername" type="text">
    <label for="loginPassword">Password</label>
    <input @keyup.enter="doLogin()" v-model="password" class="authInput" id="loginPassword" type="password">
    <button @click="doLogin()">
      <span v-if="!loggingIn">Login</span>
      <img v-else src="../assets/Dual Ball-1.4s-200px.svg" style="height: 1em; width: 1em;">
    </button>
    <span>Don't have an account? <a href="#" @click="toggleWindow('register')">Register</a>.</span>
  </div>

  <!-- REGISTER FORM -->
  <div class="form" id="authRegisterDiv" ref="registerDiv">
    <h3>Register</h3>
    <label for="registerUsername">Username</label>
    <input @keyup.enter="doRegister()" v-model="username" class="authInput" id="registerUsername" type="text">
    <label for="registerPassword">Password</label>
    <input @keyup.enter="doRegister()" v-model="password" class="authInput" id="registerPassword" type="password">
    <button @click="doRegister()">
      <span v-if="!loggingIn">Register</span>
      <img v-else src="../assets/Dual Ball-1.4s-200px.svg" style="height: 1em; width: 1em;">
    </button>
    <span>Already have an account? <a href="#" @click="toggleWindow('login')">Login</a>.</span>
  </div>
</div>
</template>

<style scoped>
#authMainDiv {
  background-color: rgba(0, 0, 0, 0.75);  
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
}

  #authLoginDiv, #authRegisterDiv {
    align-items: center;
    background-color: white;
    border: 2px solid black;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 400px;
    justify-content: center;
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
  }

  #authMainDiv > div > h3 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;    
  }

  #authMainDiv > div > label {
    cursor: text;
  }

  #authMainDiv > div > input {
    padding: 0.3rem 0.7rem;
    font-size: 1.1rem;
    border-radius: 8px;
    border: 1px solid;
    outline: none;
  }

  #authMainDiv > div > button {
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

    #authMainDiv > div > button:hover {
      transform: scale(1.1)
    }

  #authMainDiv > div a {
    color: rgb(17, 195, 17);
    text-decoration: none;
  }

</style>

<style>
@keyframes fadeIn {
 from {
  opacity: 0;
 }
 to {
  opacity: 1;
 }
}
@keyframes fadeOut {
 from {
  opacity: 1;
 }
 to {
  opacity: 0;
 }
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
