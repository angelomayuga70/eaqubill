<template>
    <div class="h-screen w-full bg-white">
    <div  class="w-full h-64 block bg-blue-500">
      <div class="block mt-4">
        <div class="flex justify-between px-3 mt-3 py-4 ">
            <span class="text-lg font-bold text-white py-3 "><i class="bi bi-cash-coin"></i> &nbsp;Payment</span>
            <img class="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_-9C12h7JKdb02jgBDNiFgHWTp04Xbud_ZFS8xnjIylg-7wIPfixzgB5f6NT76T5R6M&usqp=CAU">
        </div>
    </div>
                <div class="flex justify-center">
                    <span class="text-white text-lg font-bold mt-3 ">Payment Method</span>
                </div>
                <div class="flex justify-center mt-3 ">
                    <div class="w-24 h-24    shadow-2xl  bg-white rounded-lg flex justify-center items-center overflow-hidden">
                        <img  class=" h-26 w-20n rounded" src="@/assets/gcash.png">
                     
                    </div>
                    <div class="w-24 h-24   shadow-2xl bg-white ml-5 rounded text-center ">
                        <i class="bi bi-cash-stack text-5xl mt-4 text-blue-600 block"></i>
                        <span>Cash</span>
                    </div>
                </div>
             
    </div>
   <div class="box-height ">
    <div class="flex justify-center ">
      

                    <div class="mt-8  rounded-lg block justify-center items-center overflow-hidden">
                        <img class=" h-32 w-62 rounded shadow-2xl " src="@/assets/gcash.png">            
                    </div>
    </div>
                     <div class="px-4 text-center font-bold py-3">
                        <span class="text-gray-800">GCash is an internationally-acclaimed micropayment service that transforms the mobile phone into a virtual wallet for secure, fast, and convenient money transfer.</span>
                    </div>
                    <div class="flex justify-center">
                        <button class=" px-4 py-2 bg-blue-500 text-white font-bold rounded shadow-xl cursor-pointer mt-3">Proceed to Payment</button>
                    </div>
</div>
</div>
</template>
<script>
// import axios from 'axios';


    export default{
        name:"PaymentPage",
        data(){
            return{

            }
        }
    
    }
</script>
<style scoped>
.box-height{
    height: calc(100vh - 24rem);
    overflow-y: scroll;
}

</style>