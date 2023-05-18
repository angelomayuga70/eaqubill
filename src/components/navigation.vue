<template>
    <div style="z-index: 940 ;" ref="navbar"  class="h-screen block   py-5 w-64 relative  bg-white shadow-2xl">
      <div  class="absolute w-full">
        <div class="rounded-full ml-8 w-8 h-8 bg-blue-500 bottom-2"></div>
        <div class="rounded-full w-3 h-3 mt-4 ml-8 bg-blue-500 bottom-2"></div>
        <div class="rounded-full w-3 h-3 mt-4 ml-16 bg-blue-500 bottom-2"></div>
       
        <div class="rounded-full w-8 h-8 -mt-4 float-right mr-3 bg-blue-500 bottom-2"></div>
        <div class="rounded-full w-3 h-3 mt-8 float-right ml-8 bg-blue-500 bottom-2 "></div>
      </div>
      <div class="w-full flex justify-center ">
        <img style="z-index: 90;" class="w-36 h-36 rounded-full border-blue-500 border-4" :src="!online?default_profile():(user.img_url?user.img_url:default_profile())" alt="Profile Image">
      </div>
      <div class="w-full flex justify-center ">
          <span class="text-xl font-bold">{{ user.first_name + ' ' + user.last_name  }}</span>
      </div>

      <div class="w-full flex justify-center">
          <span class="">Staff</span>
      </div>
            <ul class="mx-auto mt-5" style="font-size: 1.2rem; width: 96%;">
              <li @click="navigate('dashboard')" :class="{active:menulist['dashboard']}"  class="px-5 py-2"><i class="bi bi-ui-checks-grid"></i> Dashboard</li>
              <li @click="navigate('meter')" :class="{active:menulist['meter']}"   class="px-5 py-2"><i class="bi bi-speedometer2"></i> Meter reading</li>
              <li @click="navigate('payment')" :class="{active:menulist['payment']}" v-if="online"  class="px-5 py-2"><i class="bi bi-cash-coin"></i> Payment</li>
              <li @click="navigate('customers')" :class="{active:menulist['customers']}" v-if="online"  class="px-5 py-2"><i class="bi bi-people"></i> Customers</li>
              <li @click="navigate('setting')" :class="{active:menulist['setting']}" v-if="online"  class="px-5 py-2"><i class="bi bi-person-fill-gear"></i> Account Setting</li>
              <li @click="reload"  class="px-5 py-2"><i class="bi bi-arrow-clockwise"></i> Reload</li>
              <li @click="signOut" v-if="online"  class="px-5 py-2"><i class="bi bi-box-arrow-left"></i> Sign Out</li>
            </ul>

    </div>    
</template>
<script>
import {firebase, errorMessage, storage, user_defaultimg} from '@/main.js';

  export default{
    name:"NavPage",
    mounted: async function(){
       this.navigate(storage.getItem("page")??'dashboard');
    },
    props:['user', 'online'],
    data(){
       return{
           menulist:{
              dashboard:false,
              meter:false,
              payment:false,
              customers:false,
              default_profile: user_defaultimg()
           },
          
       }
    },
  
    methods:{
      default_profile(){
         
         return user_defaultimg();
       },
    
      reload(){
        location.reload();
      },
        navigate(navname){
          storage.setItem('page', navname);
          this.clearNav();
         
          this.menulist[navname] = true;
          this.$emit('navigate-to', navname);
        },
        async signOut(){
          let signout = await firebase.signOut();
          if(signout == true){
            storage.deleteJSON('auth_user');
            storage.deleteJSON('page');
            window.location.reload();
          }else{
            this.$toast.error(errorMessage(signout));
          }
        },
        clearNav(){
          this.menulist['dashboard'] = false;
          this.menulist['customers'] = false;
          this.menulist['meter'] = false;
          this.menulist['payment'] = false;
          this.menulist['setting'] = false;
        }
    }
  }
</script>
<style scoped>
.active{
  background-color: #3B82F6;
  border-radius: 5px;
  color: white;
}

</style>