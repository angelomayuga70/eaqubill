<template>
  <div  class="overflow-y-scroll bg-blue-100">
  

      <div  class="bg-blue-500 px-5 flex justify-between py-3 w-full h-auto fixed ">
        <div @click="slideMenu(true)">
          <i style="font-size: 1.9rem; " class="bi bi-list text-white p-1 active:bg-gray-500"></i>
        </div>
        <div >
            <span class="text-2xl flex justify-center font-bold text-black-500 font-mono mt-2  text-white">&nbsp;&nbsp;<img class="h-7" src="@/assets/droplet.png">eAquaBill</span>
      </div>
      </div>
      <div class="absolute block" ref="navmenu" style="margin-left:-16rem;">
    
        <NavPage :user="user" :online="online" @navigate-to="navigate" />
       
    </div>
    <div  class="h-screen w-full block mt-16  " @click="slideMenu(false)">
        <div v-if="menulist['dashboard']" >
            <DashBoard :user="user" :slide="nav" @set-loader="setLoader"  />
        </div>

        <div v-if="menulist['meter']">
            <MeterPage :user="user" @set-loader="setLoader"  :slide="nav" />
        </div>
        <div v-if="menulist['payment']">
            <PaymentPage :user="user" @set-loader="setLoader" />
        </div>
        <div v-if="menulist['customers']">
          <CustomersPAge :user="user" @set-loader="setLoader" />
        </div>
        <div v-if="menulist['setting']">
          <AccountSetting :user="user"  @set-loader="setLoader" />
        </div>
  </div>
     

  </div>
    
</template>
<script>
import NavPage from './navigation.vue'
import DashBoard from './dashboard.vue';
import MeterPage from './meter.vue';
import PaymentPage from './payment.vue'
import CustomersPAge from './customers.vue';
import AccountSetting from './AccountSetting.vue';
import {firebase, storage, isUserOnline} from '@/main.js';

  export default{
      name:"WebPage",
      components:{
          NavPage,
          DashBoard,
          MeterPage,
          PaymentPage,
          CustomersPAge,
          AccountSetting
      },
      
      mounted:async function(){
      
        if(await isUserOnline()){
       
          this.online = true
          let auth = await firebase.auth_user();
          this.navigate(storage.getItem('page')??"dashboard");
         
        if(auth){
          const records = this.convertObjectToArray(storage.getJSON('records_offline')??{})??[];
         
          if(records){
            records.map(async record =>{
              await firebase.insert(`records/${Object.keys(record)[0]}`, record[Object.keys(record)[0]]);
            });
           
            storage.deleteJSON('records_offline');
          }

          const histories = storage.getJSON('histories')??[];
          if(histories){
             histories.map(async history =>{
                await firebase.insert(`histories/${Object.keys(history)[0]}`,history[Object.keys(history)[0]])
             });
             storage.deleteJSON('histories');
          }
        
          storage.setItem('water_rate', await firebase.getValue('props/water_rate'))?? 0;

          let usage_id = await firebase.getValue('props/usage_id') ?? 0;
          storage.setItem('usage_id', usage_id);
          
          let user_info = await firebase.getUserInfo(auth.uid);
         
          this.user = user_info;
          storage.setJSON('auth_user', this.user);
          this.img_url = user_info.img_url;
          let customers = await firebase.getObjects('customers/');
          storage.setJSON('customers',customers);
          let usage = await firebase.getValue('records/');
          if(usage){
            storage.setJSON('records', usage);
          }else{
            storage.setJSON('records', []);
          }
          
         
        }
      
        }else{
          this.online = false
          const user = storage.getJSON('auth_user');
          this.user = user;
          // this.$toast.error('You are offline some features not available',{position:'top-right'})
        }
      },
      created() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  unmounted: function(){
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },
     
     
      methods:{
        refresh(){
          console.log('asd')
            location.reload();
        },
       convertObjectToArray(obj) {
          const keys = Object.keys(obj);
          const arr = keys.map((key) => ({ [key]: obj[key] })); 
          return arr;
     
      },
      async  updateOnlineStatus() {
        this.online = await  isUserOnline();
        if (!this.online) {
          // Display a message or perform some other action
         this.$toast.error('You are currently offline', {position:'top-right'})
        }else{
          this.$toast.success('You are currently online', {position:'top-right'})
        }
      },
        setLoader(stat){
          this.$emit('set-loader', stat);
        },
        slideMenu(stat){
              let slide_menu = this.$refs.navmenu;
              slide_menu.style.transition = '.3s';
              if(stat){
                slide_menu.style.transform = 'translateX(16rem)';
              }else{
                slide_menu.style.transform = 'translateX(0)';
              }
              this.nav = stat;
          },
         
          navigate(navname){
            this.clearNav();
            this.menulist[navname] = true;
            this.slideMenu(false);
        
        },
            clearNav(){
              this.menulist['dashboard'] = false;
              this.menulist['customers'] = false;
              this.menulist['meter'] = false;
              this.menulist['payment'] = false;
              this.menulist['setting'] = false;
            }
      },
      data(){
        return{
            nav:false,
            user:[],
            img_url:null,
            online: false,
            menulist:{
              dashboard:true,
              meter:false,
              payment:false,
              customers:false,
              setting:false

            }
        }
      }
                                                                                                              
  }
</script>
<style scoped>
.modal{
  background: rgba(0, 0, 0, 0.233);
}
.modal .box{
  width: 90%;
  height: calc(30rem);
  animation: slidein .4s;
}

@keyframes slidein {
    from{
      transform: translateY(-400px);
    }to{
      transform: translateY(0);
    }
}

</style>
