<template>
  <div class="overflow-hidden bg-blue-100">
      
      <div  class="bg-blue-500 px-5 flex justify-between py-3 w-full h-auto fixed ">
        <div @click="slideMenu(true)">
          <i style="font-size: 1.9rem; " class="bi bi-list text-white p-1 active:bg-gray-500"></i>
        </div>
        <div >
            <span class="text-2xl flex justify-center font-bold text-black-500 font-mono mt-2  text-white"><img class="h-7" src="@/assets/droplet.png">eAquaBill</span>
      </div>
      </div>
      <div class="absolute block" ref="navmenu" style="margin-left:-16rem;">
    
        <NavPage @navigate-to="navigate" />
       
    </div>
    <div  class="h-screen w-full block mt-16  " @click="slideMenu(false)">
        <div v-if="menulist['dashboard']" >
            <DashBoard :slide="nav"   />
        </div>

        <div v-if="menulist['meter']">
            <MeterPage  :slide="nav" />
        </div>
        <div v-if="menulist['payment']">
            <PaymentPage />
        </div>
  </div>
     

  </div>
    
</template>
<script>
import NavPage from './navigation.vue'
import DashBoard from './dashboard.vue';
import MeterPage from './meter.vue';
import PaymentPage from './payment.vue'



  export default{
      name:"WebPage",
      components:{
          NavPage,
          DashBoard,
          MeterPage,
          PaymentPage
      },
      
      mounted:async function(){
        this.navigate("payment")
      },
      methods:{
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
            menulist:{
              dashboard:true,
              meter:false,
              payment:false,
              customers:false,

            }
        }
      }
                                                                                                              
  }
</script>
<style scoped>

</style>
