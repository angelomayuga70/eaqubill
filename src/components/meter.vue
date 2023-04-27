<template>
    <div class="bg-white h-screen">
        <div  class="h-44  w-full bg-blue-500 py-4 px-4 -mt-2 shadow-xl ">
           <div class="flex justify-between ">
            <span class="text-lg font-bold text-white py-3 "><i class="bi bi-speedometer2"></i> &nbsp;Meter Reading</span>
            <img class="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_-9C12h7JKdb02jgBDNiFgHWTp04Xbud_ZFS8xnjIylg-7wIPfixzgB5f6NT76T5R6M&usqp=CAU">
        </div>
            <div class="">
                <div>
                  
                    <span  class="ml-0  text-white font-bold">ALCATE, HILLTOP WATER SYSTEM</span>
                </div>
                <span class= "text-white  text-4xl  mt-3 block font-semibold">P. 20.00 / m</span>
                <span class="text-white text-sm">Current Water Rate </span>
               
            </div>
        </div>
      <div class="flex justify-around mt-2 ">
        <div @click="navigate('list')" class="text-center 0 px-10 text-blue-500">
            <i class="bi bi-list block text-3xl "></i>
          
        </div>
        <div @click="navigate('custom')" class="text-center px-10 text-blue-500">
            <i class="bi bi-calculator block text-2xl"></i>
        </div>
      </div>
      <div class="w-full">
        <hr ref="hover" style="width: 45%; margin-left: 2.5%;" class="h-1 bg-blue-500 mt-1">
       
      </div>
      
        <div class="w-full mt-1 flex justify-center">
            <div v-if="navigation['list']"  class="  w-full box-height    overflow-y-scroll">
                <div v-for="customer in customers" :key="customer.uid"  class="border-2 box border-gray-300 bg-white block mx-auto h-32 mt-2">
                    <div class="w-full flex justify-between">
                        <span class="text-gray-500 px-2 py-1 text-sm">Consumer Information</span>
                        <span class="px-3 py-1 font-bold">{{ customer.meter_id }}</span>

                    </div>
                    <div class="flex justify-between">
                    <div class="">
                        <span class="block px-2 -mt-2 text-lg font-bold">{{ customer.first_name }} {{ customer.last_name }}</span>
                        <span class="px-2 text-blue-500 text-sm"><i class="bi bi-geo-alt-fill"></i> Sitio 5</span>
                    </div>
                    <div  class="mr-4 mt-3">
                        <button class="px-3 bg-gray-500 py-1 text-sm text-white rounded"><i class="bi bi-graph-up-arrow"></i> History</button>&nbsp;
                        <button class="px-3 py-1 bg-blue-500 rounded text-sm  text-white"><i class="bi bi-check2-square"></i> Select</button>
                    </div>
                </div>
                    <hr class="mt-1 w-80 m-auto">
                    <div>
                        <span class="px-2 py-1 block text-sm text-gray-500">January 01, 2023 | 23 cubic meter</span>
                    </div>

                </div>
                
      
            </div>

            <div v-if="!navigation['list']"  class="  w-full box-height  second-box  overflow-y-scroll">
                <div v-if="true">
                        <div class="text-center mt-6 ">
                            <span class="text-blue-500 font-bold text-lg">  METER ID NUMBER</span>
                            <br>
                            <span class="text-gray-600">Type the identification number and then<br> press the enter button.</span>
                        </div>
                        <div class="flex justify-center ">
                            <input class=" text-center outline-none border-2 border-blue-500 px-3 py-1 rounded mt-4" placeholder="ID Number" type="number" />
                        </div>
                        <div class="flex justify-center mt-6">
                            <button class="w-40 bg-blue-500 px-3 py-2 text-white rounded">Enter</button>
                        </div>
                    </div>

                    <div v-if="false">
                        <div class="text-center mt-2 ">
                           <div class="flex justify-center">
                            <img class="w-28 border-2 border-blue-500 h-28 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_-9C12h7JKdb02jgBDNiFgHWTp04Xbud_ZFS8xnjIylg-7wIPfixzgB5f6NT76T5R6M&usqp=CAU">
                           </div>
                           <div>
                            <span>P. 00</span><br>
                                <span class="font-bold text-lg">Kulas Capernecus</span>
                                <br>
                                <span class="text-gray-500">Previous Usage</span>
                                <br>
                                <span class="text-blue-500 text-bold text-lg">204 m</span>
                           </div>
                        </div>
                        <div class="flex justify-center ">
                            <input class=" text-center outline-none border-2 border-blue-500 px-3 py-1 rounded mt-2" placeholder="Current usage" type="number" />
                        </div>
                        <div class="flex justify-center mt-4">
                            <button class="w-28 bg-gray-500 px-3 py-2 text-white rounded">Back</button>
                            <button class="w-28 bg-blue-500 px-3 ml-3 py-2 text-white rounded">Submit</button>
                        </div>
                    </div>
            </div>

        </div>
     
      
    </div>
</template>
<script>
import { firebase } from '@/main';

    export default{
        name:"MeterPage",
        mounted: async function(){
            let hover = this.$refs.hover;
            this.navigation['hover_line'] = hover;
            this.loadCustomers();
           
        },
            props:{
            slide : Boolean
        },
        watch:{
            slide(){
              
                let hover = this.$refs.hover;
               if(this.slide){
                hover.style.visibility = "hidden";
               }else{
                hover.style.visibility = "visible";
               }
            }
        },methods:{
            selectCustomer(meter_id){
                    alert(meter_id)
            },
            navigate(navname){
                this.navigation['list'] = false;
                this.navigation['custom'] = false;
                this.navigation[navname] = true;
                this.navigation['hover_line'].style.transition = '.2s';
                if(navname == 'list'){
                    this.navigation['hover_line'].style.transform = 'translateX(0)';
                }else{
                    this.navigation['hover_line'].style.transform = 'translateX(110%)';
                }
                
            },
            async loadCustomers(){
                this.$emit('set-loader', true);
            let users = await firebase.getObjects('userAccount');
            this.$emit('set-loader', false);
            let customers = [];

            if(users){
              users.forEach(user =>{
                    if(user.type === 'customer'){
                        customers.push(user);
                    }
              });
              this.customers = customers;
            }
           
            
        },
        }, 
       
        data(){
            return{
                navigation:{
                    list:true,
                    custom:false,
                    hover_line: ""
                },
              customers:[]
                
            }
        }
    }
</script>
<style scoped>
.box{
    width:95%; height: auto;  border-left: 4px solid #3B82F6; border-radius: 4px;  animation: left-slide .2s linear;
}
@keyframes left-slide {
    from{
        transform: translateX(-110%);
    }to{
        transform: translateX(0);
    }
}
.second-box{
    animation: right-slide .2s linear;
}
@keyframes right-slide {
    from{
        transform: translateX(110%);
    }to{
        transform: translateX(0);
    }
}
.box-height{
    height: calc(100vh - 19rem);
}

</style>