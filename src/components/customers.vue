<template>
        <div class="bg-blue-20">
            <div class="h-44  w-full bg-blue-500 py-4 px-4 shadow-xl -mt-2" style="border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;">
            <div  class=" flex justify-between  ">
            <span class="text-lg font-bold text-white py-3 "> <i class="bi bi-people"></i> &nbsp;Customers</span>
            <img class="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_-9C12h7JKdb02jgBDNiFgHWTp04Xbud_ZFS8xnjIylg-7wIPfixzgB5f6NT76T5R6M&usqp=CAU">
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
               
            <div v-for="customer in customers" :key="customer.id" class="bg-white  container h-24  shadow-lg  m-auto rounded-md mt-2" style="width: 95%;">
                   <div  class="shadow-xl border-r-2 float-left w-24  h-full ">
                        <img src="data:image/jpeg;base64,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" 
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
                       <button @click="deleteCustomer(customer.id)" class="ml-2 text-xs bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                       
                   </div>
            </div>
        </div>

       <div @click="addCustomer" class="-mt-20 float-right mr-8 bg-blue-500 rounded-full hover:scale-105  px-4 py-3">
                <i class="bi bi-plus text-xl font-bold text-white"></i>
       </div>
        </div> 
</template>
<script>
import {question_box, addCustomerModal,firebase, closeCustomerModal} from '@/main';
import toastr from 'toastr';



export default{
    name:"CustomersPage",
    mounted: async function(){
        let customers_lists = await firebase.getObjects('customers');
        
        this.customers = customers_lists;
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

              let store_customer = await firebase.insert(`customers/${add_customer.id}`,add_customer);
              if(store_customer){
                
                toastr.success('Record saved.',{position:'bottom-right'});
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
                    toastr.success('Record deleted');
                    this.$emit('set-loader', false);
                    
                   }
                }
            }
    },
    data(){
        return{
            isAdd:false,
            customers:[]
        }
    }
 
  
           
}
</script>
<style scoped>
.box-height{
    height: calc(100vh - 19rem);
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