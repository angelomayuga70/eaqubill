<template>
        <div :class="isAdd?'block mt-16 ':''"  class="bg-blue-20 h-screen">
            <div class="h-44  w-full bg-blue-500 py-4 px-4 shadow-xl -mt-2" style="border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;">
            <div  class=" flex justify-between  ">
            <span class="text-lg font-bold text-white py-3 "> <i class="bi bi-people"></i> &nbsp;Customers</span>
            <img class="w-12 h-12 rounded-full" :src="user.img_url?user.img_url:user_defaultimg">
            </div>
            <div class="mt-3 text-white">
                <i class="bi  bi-people-fill text-5xl "></i>
                <span class="text-4xl  font-bold ml-3">{{ customers.length }}</span>
                <span class="block text-sm ">Water level : 100 cubic meter </span>
                
            </div>
      
        
            </div>
                <div style="width: 95%;" class="bg-white  mx-auto px-3 mt-3 py-2 shadow-md mb-2 rounded-md">
                    <div class="search-box">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder="Search here..." style="width: 90%;" class="  ml-2 search-bar">
                    </div>
                </div>

            <div class="box-height">
            <div v-for="customer in customers" :key="customer.uid" class="bg-white  container h-24  shadow-lg  m-auto rounded-md mt-2" style="width: 95%;">
                   <div  class="shadow-xl border-r-2 float-left w-24  h-full ">
                        <img :src="customer.img_url?customer.img_url:default_img"
                        class=" rounded-full bg-red h-24  w-24 py-2  px-3">
                   </div>
                   <div class="px-3 py-1 ">
                        <span class="font-bold text-xl text-gray-800 ml-3  mt-4">{{ customer.first_name+" "+customer.last_name }}</span>
                        <span class="text-xs float-right mr-4 mt-2">ID {{ customer.meter_id }}</span>
                   </div>
                   <div class="px-3 ">
                        <span class="text-sm text-gray-800 ml-3"><i class="bi bi-speedometer2 "></i> 23 cubic meter</span>
                       
                   </div>
                   <div class="px-3">
                        <button class="text-xs ml-3 bg-blue-500 text-white px-3 py-1 rounded">View</button>
                       <button @click="deleteCustomer(customer.uid)" class="ml-2 text-xs bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                       
                   </div>
            </div>
        </div>
     

       <div v-if="!isAdd" @click="addCustomer" class="-mt-20 float-right mr-8 bg-blue-500 rounded-full hover:scale-105 shadow  px-4 py-3">
                <i class="bi bi-plus text-xl font-bold text-white"></i>
       </div>
        </div> 
</template>
<script>
import {question_box, 
        addCustomerModal,
        firebase, 
        closeCustomerModal,
        user_defaultimg} from '@/main';


export default{
    name:"CustomersPage",
    props:{
        user: Object
    },
    mounted: async function(){
        this.$emit('set-loader', true);
        let customers_lists = await firebase.getObjects('customers');
        this.customers = customers_lists;
        this.$emit('set-loader', false);
    },
    methods:{
     async refreshCustomers(){
        
        let customers = await firebase.getObjects('customers');
        if(customers){
            this.customers = customers;
        }
     },
      async  addCustomer (){
            if(!this.isAdd){
            this.isAdd = true;
            let add_customer = await addCustomerModal();
            if(add_customer){
              this.$emit('set-loader', true);
              this.isAdd = false;

              let store_customer = await firebase.insert(`customers/${add_customer.uid}`,add_customer);
              if(store_customer){
                
                this.$toast.success('Record saved.',{position:'top-right'});
                closeCustomerModal();
                this.refreshCustomers();
                this.$emit('set-loader', false);
              }
              
            }else{
                this.isAdd = false;
            }
        }
        },
      async  deleteCustomer (id){
                let dialogue = await question_box();
                if(dialogue){
                   this.$emit('set-loader', true);
                   let delete_customer = await firebase.delete(`customers/${id}`);
                   if(delete_customer){
                    this.refreshCustomers();
                    this.$toast.success('Record deleted', {position:'top-right'});
                    this.$emit('set-loader', false);
                   }
                }
            }
    },
    data(){
        return{
            isAdd:false,
            customers:[],
            default_img:user_defaultimg()
        }
    }
 
  
           
}
</script>
<style scoped>
.box-height{
    height: calc(100vh - 18.3rem);
    overflow-y: scroll;
}

.container{
    animation: slide_in .3s;
}

.container:nth-child(2){
    animation-duration: .4s;

}
.container:nth-child(3){
    animation-duration: .5s;

}
.container:nth-child(4){
    animation-duration: .6s;

}
.container:nth-child(5){
    animation-duration: .7s;

}
.container:nth-child(6){
    animation-duration: .7s;

}
.search-bar{
    outline: 0;
    border: 0;
}



@keyframes slide_in {
    from{
        transform: translateX(-100px);
    }to{
        transform: translateX(0);
    }
}

</style>