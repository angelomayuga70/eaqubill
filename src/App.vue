<template>
  <div class="select-none overflow-hidden">
    <div>
      <ForgotPassword  @set-loader="setLoader"  v-if="modal['forgotPassword']" @trigger-modal="modalStat" />
    </div>
    <div >
      <PageLoader  v-if="loader" />
    </div>
    <div  v-if="pages['sigin']">
      <LoginPage  @set-loader="setLoader" @trigger-modal="modalStat" @goto-page="Page" />
    </div>
   
    <div v-if="pages['signup']">
      <SignUpPage @set-loader="setLoader" @goto-page="Page"/>
    </div>
    <div v-if="pages['home']">
      <WebPage />
    </div>
    
  </div>
 
 
</template>

<script>
import LoginPage from './components/Login.vue';
import SignUpPage from './components/SignUp.vue';
import WebPage from './components/page.vue';
import ForgotPassword from './components/forgotPassword.vue';
import PageLoader from './components/loader.vue'


import {firebase} from '@/main.js';


export default {
  name: 'App',
  components: {
    LoginPage,
    SignUpPage,
    WebPage,
    PageLoader,
    ForgotPassword
  },methods:{
    modalStat(stat){
      this.modal['forgotPassword'] = stat;
    },
    setLoader(opt){
      this.loader = opt
    },
    Page(page){
      switch(page){
        case 'signin': this.clearPage(); this.pages['sigin'] = true; break;
        case 'signup': this.clearPage(); this.pages['signup'] = true; break;
        case 'homepage': this.clearPage(); this.pages['home'] = true; break;
      }
      
    },clearPage(){
        this.pages['home'] = false;
        this.pages['sigin'] = false;
        this.pages['signup'] = false;
    }
  },
  mounted:async function(){
    let auth = await firebase.auth_user();
   if(auth){
    this.clearPage();
    this.pages['home'] = true;
   }else{
    this.clearPage();
    this.pages['sigin'] = true;
    
   }

  }, data(){
    return {
      loader:false,
     
      pages:{
        sigin:true,
        signup:false,
        home:false
        
      },
      modal:{
        forgotPassword:false
      }
    }
  }
}
</script>

<style>

</style>
