<template>
    <div>
    <div class="h-screen w-full bg-blue-300 flex justify-center items-center">
        
                  
        <div >
           
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <span class="text-2xl flex justify-start font-bold text-black-500 font-mono text-blue-400"><img class="h-7" src="@/assets/droplet.png">eAquaBill</span>
                <br>
    <span class="text-2xl font-bold ">Sign In</span>
   
    <div class="form-group mb-6">
      <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Email address</label>
      <input  type="email" class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder="Enter email" v-model="username">
      <small id="emailHelp" class="block mt-1 text-xs text-gray-600">We'll never share your email with anyone
        else.</small>
    </div>
    <div class="form-group mb-6">
      <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">Password</label>
      <input type="password" class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword1"
        placeholder="Password" v-model="password">
       
    </div>
    
    <div class="form-group form-check mb-3">
      <label class="form-check-label inline-block cursor-pointer  select-none text-blue-500" @click="$emit('trigger-modal',true)" for="exampleCheck1">Forgot Password?</label>
    </div>
    <button type="flat" class="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      flex
      center
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"  @click="login"  >Login</button>

                <span>No Account Yet? <a class="text-blue-600 text-underline cursor-pointer select-none" @click="$emit('goto-page','signup')">Create Account</a></span>
            </div>
        </div>
        </div>
    </div>    
</template>
<script>
import {firebase, validate, errorMessage} from '@/main.js'

export default{
    name:"LoginPage",
    components:{
      
    },
    methods:{
        async login(){
            let error = validate([{key:'email', value:this.username, type:'email'}, {key:'password', value:this.password}]);
            if(!error){
                this.$emit('set-loader',true);
                const signin = await firebase.signin(this.username,this.password);
                if(signin['stat']== true){
                   window.location.reload();
                }else{
                    this.$toast.error(errorMessage(signin['value']));
                }
             
            }else{
                this.$toast.error(error);
            }
            this.$emit('set-loader',false);
        },
       
//         showNotification(){
           
//             this.$toast.show(`Hey! I'm here`);
//             // this.$toast.success(`Hey! I'm here`);
//             // this.$toast.error(`Hey! I'm here`);
//             // this.$toast.warning(`Hey! I'm here`);
//             // this.$toast.info(`Hey! I'm here`);
    
//   }
    },
    data(){
        return{
            username:"",
            password:""
    }
    }
}

</script>
<style scoped>

</style>