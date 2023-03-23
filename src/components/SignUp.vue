<template>
    <div>
        <div class="h-screen w-full bg-blue-300 flex justify-center items-center">
            <div>
           
            <div class="block p-6 rounded-lg shadow-lg bg-white w-80">
                <span class="text-2xl flex justify-start font-bold text-blue-400 font-mono"><img class="h-7" src="@/assets/droplet.png">eAquaBill</span>
    <span class="text-2xl font-bold mt-2 block">Sign Up</span>
    <div v-if="default_nav" class="form-group mb-6">
     
      <label for="firstname" class="form-label inline-block mb-2 text-gray-700">First Name</label>
      <input v-model="form['first_name']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstname"
        aria-describedby="emailHelp" placeholder="Enter first name">

        <label for="middlename" class="form-label inline-block mb-2 text-gray-700">Middle Name</label>
      <input v-model="form['middle_name']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="middlename"
        aria-describedby="emailHelp" placeholder="Enter middle name">
        <label for="lastname" class="form-label inline-block mb-2 text-gray-700">Last Name</label>
      <input v-model="form['last_name']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="lastname"
        aria-describedby="emailHelp" placeholder="Enter last name">

        <label for="street" class="form-label inline-block mb-2 text-gray-700">Street</label>
      <input v-model="form['street']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="street"
        aria-describedby="emailHelp" placeholder="Enter street">

        
        <label for="brgy" class="form-label inline-block mb-2 text-gray-700">Barangay</label>
      <input v-model="form['baranggay']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="brgy"
        aria-describedby="emailHelp" placeholder="Enter barangay">
        
        <label for="municipality" class="form-label inline-block mb-2 text-gray-700">Municipality</label>
      <input v-model="form['municipality']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="municipality"
        aria-describedby="emailHelp" placeholder="Enter municipality">

        <button  class="mt-4
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
                    ease-in-out" @click="default_nav = !default_nav" >Next</button>
    
    </div>

    <div v-else class="form-group mb-6">
        <label for="province" class="form-label inline-block mb-2 text-gray-700">Province</label>
      <input v-model="form['province']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="province"
        aria-describedby="emailHelp" placeholder="Enter province">
        <label for="phoneno" class="form-label inline-block mb-2 text-gray-700">Cellphone Number</label>
      <input v-model="form['phone_number']" type="text" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="phoneno"
        aria-describedby="emailHelp" placeholder="Enter contact number">

        <label for="email" class="form-label inline-block mb-2 text-gray-700">Email Address</label>
      <input v-model="form['email']" type="email" class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
        aria-describedby="emailHelp" placeholder="Enter email">
       
       
      <label for="password" class="form-label inline-block mb-2 text-gray-700">Password</label>
      <input v-model="form['password']" type="password" class="form-control
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
        aria-describedby="emailHelp" placeholder="Enter password">
    
   
                   
                    <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">Re-enter Password</label>
                    <input v-model="form['reenter']" type="password" class="form-control block
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
                        placeholder="Re-enter Password">


                        <div class="flex justify-start mt-3">
                        <input v-model="form['terms']" type="checkbox"/>
                        <small for="exampleInputPassword1" class="form-label inline-block ml-2 text-gray-700">I agree with the <button class="text-blue-500 select-none cursor-pointer">Terms & Conditions</button>.</small>
                        </div>
<div class="flex justify-start">
                        <button  class="mt-4
                    px-6
                    py-2.5
                    bg-gray-600
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
                    focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out" @click="default_nav = !default_nav" >Back</button>
                        <button  class="mt-4 ml-3
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
                    ease-in-out" @click="signUp()" >Sign Up</button>
                </div>
                   

    </div>
    

    


    
                    <div class="form-group form-check mb-6">
                    
                    
                    </div>
              

                <span>Already have an account? <a class="text-blue-600 text-underlin cursor-pointer" v-on:click="$emit('goto-page','signin')">Login</a></span>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import {errorMessage, firebase, validate} from '@/main.js'

export default{
    name:"SignUpPage",
    data(){
        return{
            default_nav:true,
            form:{
                first_name:"",
                middle_name:"",
                last_name:"",
                street:"",
                baranggay:"",
                municipality:"",
                province:"",
                phone_number:"",
                email:"",
                password:"",
                reenter:"",
                terms:"",
                uid:""
            }
        }
        
    }, methods:{
      async signUp(){
      
            let error = validate([
                {type:'text', key:"First name", value:this.form['first_name']},
                {type:'text', key:"Middle name", value:this.form['middle_name']},
                {type:'text', key:"Last name", value:this.form['last_name']},
                {type:'text', key:"Street", value:this.form['street']},
                {type:'text', key:"Barangay", value:this.form['baranggay']},
                {type:'text', key:"Municipality", value:this.form['municipality']},
                {type:'text', key:"Province", value:this.form['province']},
                {type:'contact', key:"Contact", value:this.form['phone_number']},
                {type:'email', key:"Email address", value:this.form['email']},
                {type:'password', key:"Password", value:this.form['password']}
                
            ])
            if(!error){
                if(this.form['password'] == this.form['reenter']){
                    if(this.form['terms']){
                      this.$emit('set-loader',true);
                        let execute = await firebase.signup(this.form);
                        if(execute == true){
                            this.$toast.success("Signup successfully!");
                        }else{
                            this.$toast.error(errorMessage(execute));
                        }
                        
                    }else{
                        this.$toast.error("Please see the terms & condition first!");
                    }
                }else{
                    this.$toast.error("You enter not match in your password!");
                }
            }else{
                this.$toast.error(error);
            }
            this.$emit('set-loader',false);
        }
    }
}
</script>
<style scoped>

</style>