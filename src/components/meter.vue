<template>
    <div class=" h-screen bg-blue-50">
        <div v-if="modal"  class="w-full h-screen absolute modal">
            <div ref="modal" class="modal-box block mt-4">
                <div class="text-center block mt-4 py-3">
                    <span class="font-bold text-lg mt-5 ">Consumption History</span>
                </div>
                <div class="flex justify-evenly py-3">
                    <button class="px-5 py-2 text-xs bg-blue-500 text-white rounded shadow"><i class="bi bi-bar-chart-line"></i> &nbsp;Daily</button>
                    <button class="px-5 py-2 text-xs bg-blue-500 text-white rounded shadow"><i class="bi bi-bar-chart-line"></i> &nbsp;Monthly</button>
                    <button class="px-5 py-2 text-xs bg-blue-500 text-white rounded shadow"><i class="bi bi-bar-chart-line"></i> &nbsp;Yearly</button>
                  
                    
                </div>
                <div>
                    <select style="width: 90%;" class="font-bold block mx-auto text-sm py-1 pl-3 pr-10 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-500 animate-select">
                        <option>Select date</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
                <div style="width: 89%;" class="h-52  bg-white m-auto mt-4  shadow-xl rounded-xl block">
           <div class="block">
                   <div   id="chart" ref="lineChart"></div>
           </div>
           <div  class="bottom-content border-2 px-3 py-2 text-sm font-semibold ">
                <div class="flex justify-between">
                    <span>Name: Angelo P. Mayuga</span>
                
                </div>
                <div class="flex justify-between">
                    <span>Address: Bagong Buhay Victoria Oriental Mindoro</span>
                   
                </div>
                <div class="flex justify-between">
                    <span>Usage: 100meter</span>
                   
                </div>
                <div class="flex justify-between">
                    <span>Rate: P23 per meter</span>

                </div>
                
           </div>


           <div class="float-right mr-3 py-5">
                <button @click="closeModal" class="text-sm px-3 py-2 bg-gray-500 text-white rounded">Close</button>
                <button class="text-sm px-2 py-2 bg-blue-500 text-white ml-3 rounded">Download PDF</button>
           </div>
      <div>
                                                               
      </div>
  </div>

            </div>
        </div>
        <div  class="h-44  w-full bg-blue-500 py-4 px-4 -mt-2 shadow-xl ">
           <div class="flex justify-between ">
            <span class="text-lg font-bold text-white py-3 "><i class="bi bi-speedometer2"></i> &nbsp;Meter Reading</span>
            <img class="w-12 h-12 rounded-full" :src="isOnline?(user.img_url?user.img_url:default_img):default_img">
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
        <div @click="()=>{navigate('list'); reset()}" class="text-center 0 px-10 text-blue-500">
            <i class="bi bi-list block text-3xl "></i>
          
        </div>
        <div @click="navigate('custom')" class="text-center px-10 text-blue-500">
            <i class="bi bi-calculator block text-2xl"></i>
        </div>
      </div>
      
      <div class="w-full">
        <hr ref="hover" style="width: 45%; margin-left: 2.5%;" class="h-1 bg-blue-500 mt-1">
       
      </div>
     

        <div  class="w-full  mt-1 flex justify-center">
            <div v-if="navigation['list']" class="w-full">
                <div style="width: 95%;"  class="bg-white  mx-auto px-3 mt-3 py-2 shadow-md mb-2 rounded-md">
                    <div class="search-box">
                        <i class="bi bi-search"></i>
                        <input  type="text" placeholder="Search here..." style="width: 90%;" class="  ml-2 search-bar">
                    </div>
                </div>
                <div  class="w-full box-height    overflow-y-scroll">
                   
                <div v-for="customer in customers" :key="customer.uid"  class="border-2 box border-gray-300 bg-white block mx-auto h-32 mt-2">
                    <div class="w-full flex justify-between">
                        <span class="text-gray-500 px-2 py-1 text-sm">Consumer Information</span>
                        <span class="px-3 py-1 font-bold">{{ customer.meter_id }}</span>
                    </div>
                    <div class="flex justify-between">
                    <div class="">
                        <span class="block px-2 -mt-2 text-md font-bold">{{ customer.first_name }} {{ customer.last_name }}</span>
                        <span class="px-2 text-blue-500 text-sm"><i class="bi bi-geo-alt-fill"></i> {{ customer.address?customer.address.split(', ')[0]:customer.street }}</span>
                    </div>
                    <div  class="mr-4 mt-3">
                        <button  @click="openModal" class="px-3 bg-gray-500 py-1 text-sm text-white rounded"><i class="bi bi-graph-up-arrow"></i> History</button>&nbsp;
                        <button @click="selectCustomer(customer)" class="px-3 py-1 bg-blue-500 rounded text-sm  text-white"><i class="bi bi-check2-square"></i> Set</button>
                    </div>
                </div>
                    <hr class="mt-1 w-80 m-auto">
                    <div class="flex justify-between">
                        <span class="px-2 py-1 block text-sm text-gray-500">January 01, 2023 | 23 cubic meter</span>
                        <div>
                            <span :class="customer.inactive?'bg-red-500':'bg-green-500'" class="px-2 mr-2  text-white rounded text-xs font-bold"> {{ customer.inactive?'In-active':'Active' }}</span>
                        </div>
                    </div>

                </div>
                
      
            </div>
            </div>
            <div v-if="!navigation['list']"  class="  w-full box-height  second-box  overflow-y-scroll">
                <div v-if="!form">
                        <div class="text-center mt-6 ">
                            <span class="text-blue-500 font-bold text-lg">  METER ID NUMBER</span>
                            <br>
                            <span class="text-gray-600">Type the identification number and then<br> press the enter button.</span>
                        </div>
                        <div class="flex justify-center ">
                            <input  class=" text-center outline-none border-2 border-blue-500 px-3 py-1 rounded mt-4" placeholder="ID Number" type="number" />
                        </div>
                        <div class="flex justify-center mt-6">
                            <button class="w-40 bg-blue-500 px-3 py-2 text-white rounded">Enter</button>
                        </div>
                    </div>

                    <div v-else>
                        <div class="text-center mt-2 ">
                           <div class="flex justify-center">
                            <img class="w-28 border-2 border-blue-500 h-28 rounded-full" :src="isOnline()?(selected.img_url?selected.img_url:default_img):default_img">
                           </div>
                           <div>

                            <br>
                                <span class="font-bold text-lg">{{ selected.first_name }} {{ selected.last_name }}</span>
                                <br>
                                <span class="text-gray-500">Previous Reading</span>
                                <br>
                                <span class="text-blue-500 text-bold text-lg">{{ previous_usage.toLocaleString() }} cubic meter</span>
                           </div>
                        </div>
                        <div class="flex justify-center ">
                            <input v-model="usage" class=" text-center outline-none border-2 border-blue-500 px-3 py-1 rounded mt-2" placeholder="Current usage" type="number" />
                        </div>
                        <div class="flex justify-center mt-4">
                            <button @click="()=>{reset(); navigate('list') }" class="w-28 bg-gray-500 px-3 py-2 text-white rounded">Back</button>
                            <button @click="submit" class="w-28 bg-blue-500 px-3 ml-3 py-2 text-white rounded">Submit</button>
                        </div>
                    </div>
            </div>

        </div>
     
      
    </div>
</template>
<script>
import { firebase, storage,user_defaultimg, question_box , validate,getCurrentDate, isUserOnline } from '@/main';
import ApexCharts from 'apexcharts';


    export default{
        name:"MeterPage",
        mounted: async function(){
           
            this.loadChart();
         
            let hover = this.$refs.hover;
            this.navigation['hover_line'] = hover;
        
            

            this.loadCustomers();

        },
        props:{
            slide : Boolean,
            user:Object
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
            computeWaterBill(previous_usage, present_usage, water_rate){
                const current_usage = present_usage - previous_usage;
                let bill = 100;
                if(current_usage <=10){
                    return bill;
                }else{
                    for(let i = 11; i<=current_usage; i++){
                        bill += water_rate;
                    }
                    return bill;
                }
                
            },
            async submit(){
                let error =  validate([{key:'usage', type:'number', value:this.usage}])
                if(!error){
                const confirm = await question_box();
                if(confirm){
                  
                    if(await isUserOnline()){
                     this.$emit('set-loader', true);
                        let water_rate = await firebase.getValue('props/water_rate')??0;
                        let update_data = await firebase.update_value(`customers/${this.selected.uid}/`, {meter:this.usage});
                        if(update_data){
                            this.selected['meter'] = this.usage;
                          
                            let meter = await firebase.getValue('records/'+this.selected.uid+'/meter');
                            await firebase.insert('records/'+this.selected.uid,{
                                meter:this.usage,
                                bill: this.computeWaterBill(meter,this.usage, water_rate),
                                uid:this.selected.uid,
                                last_read_date:getCurrentDate('dd-mm-yyyy'),
                                water_rate:water_rate
                            });
                            
                           
                            this.$toast.success('Record saved',{position:'top-right'});
                            this.selected['bill'] = this.computeWaterBill(meter,this.usage, water_rate);
                            this.selected['date'] = getCurrentDate('dd-mm-yyyy');
                            this.selected['water_rate'] = water_rate;
                            await firebase.insert(`histories/${this.selected.uid}/${getCurrentDate('dd-mm-yyyy')}`,this.selected);
                            this.usage = null;
                            this.$emit('set-loader', false);
                            this.reset();
                            this.navigate('list');  
                            this.loadCustomers();
                        }

                    }else{
                        //offline
                        const water_rate = parseFloat(storage.getItem('water_rate')??0);
                        let histories = storage.getJSON("histories") ?? [];
                        let records = storage.getJSON("records_offline")??{};
                        records[this.selected.uid] = {};
                        let previous_usage = records[this.selected.uid]['meter']??0;
                        this.selected['meter'] = this.usage;
                      
                       
                        records[this.selected.uid]['meter'] = this.usage;
                        records[this.selected.uid]['uid'] = this.selected.uid;
                        records[this.selected.uid]['last_read_date'] = getCurrentDate('dd-mm-yyyy');
                        records[this.selected.uid]['water_rate'] = water_rate;
                        records[this.selected.uid]['bill'] = this.computeWaterBill(previous_usage, this.usage, water_rate);
                       
                        this.selected['bill'] = this.computeWaterBill(previous_usage,this.usage, water_rate);
                        this.selected['date'] = getCurrentDate('dd-mm-yyyy');
                        this.selected['water_rate'] = water_rate;
                        histories.push({[this.selected.uid]:{[getCurrentDate('dd-mm-yyyy')]:this.selected}});
                        storage.setJSON("histories", histories);
                        storage.setJSON('records_offline', records);
                        this.$toast.info('Record saved',{position:'top-right'});
                        this.usage = null;
                        this.reset();
                        this.navigate('list');
                    }
                }
            }else{
                this.$toast.error(error, {position:'top-right'});
            }

            },
            reset(){
                this.form = false;
                this.selected = {};
            },
            loadChart(){
                new ApexCharts(this.$refs.lineChart, {

                    series: [
                    {name:'Current usage', data:[30.90, 34.80, 29.80, 26.70]},
                    {name:'Previous usage', data:[60.90, 65.80, 70.80, 80.70]},

                    ],
                   

                    markers: {
                    size: 4
                    },
                    colors: ['#4154f1', '#2eca6a'],
                    fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.3,
                        opacityTo: 0.4,
                        stops: [0, 90, 100]
                    }
                    },
                    dataLabels: {
                    enabled: false
                    },
                    chart: {
                        type: 'bar',
                        height: 200
                    },
                    plotOptions: {
                        bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                        },
                    },
                    stroke: {
                    curve: 'smooth',
                    width: 2
                    },
                    xaxis: {
                    categories: ['32', '45', "22", "23"]
                    },
                    tooltip: {

                    style: {
                    zIndex: 0
                    }

                    }
                    }).render();
            },
         
           async isOnline(){
                return await isUserOnline();
            },
            async  selectCustomer(customer){
                if(await isUserOnline()){
                    this.$emit('set-loader', true);
                    let last_usage = await firebase.getValue(`records/${customer.uid}`) ?? 0;
                    this.previous_usage = last_usage.meter??0;
                    this.$emit('set-loader', false);
                }else{
                    //offline
                    const last_usage = storage.getJSON('records')??{};
                    this.previous_usage = last_usage[customer.uid]?last_usage[customer.uid]['meter']: 0;
                }
                this.navigate('custom');
                let customer_usage = this.usages[this.selected.uid] ?? [];
                
                    this.form = true
                    this.selected = customer;
                    this.selected['usages'] = customer_usage;

               

                 
            },
            openModal(){
                let hover = this.$refs.hover;
                hover.style.visibility = 'hidden';
                this.modal = true;
               
                setTimeout(()=>{
                    this.loadChart();
                    hover.style.visibility = 'hidden';
                },100);
              
               
            },
            closeModal(){
                let hover = this.$refs.hover;
                let modal = this.$refs.modal;
                modal.style ='transform:translateY(-150%)';
                modal.style.transition = '.3s';
                setTimeout(()=>{
                    this.modal = false;
                    hover.style.visibility = 'visible';
                }, 300);
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
                    if(await isUserOnline()){
                        this.$emit('set-loader', true);
                        storage.setItem('usage_id', await firebase.getValue("props/usage_id"));
                        let customers = await firebase.getObjects('customers');
                        this.$emit('set-loader', false);
                        let usages = await firebase.getObjects('usages');
                            if(usages){
                                this.usages = usages;
                            }
                        if(customers && customers.length > 0){
                            this.customers = customers;
                        }else{
                            this.$toast.info('No customers found', {position:'top-right'});
                        }
                    }else{

                        let  customers = storage.getJSON('customers');
                        let usages = storage.getJSON('usages');
                        if(usages && usages.length){
                            this.usages = usages;
                        }
                        // let auth_user = storage.getJSON('auth_user');
                        if(customers && customers.length > 0){
                            this.customers = customers;
                        }else{
                            this.$toast.info('No customers found', {position:'top-right'});
                        }
                    }
            },
        }, 
       
        data(){
            return{
                offline_data:{
                    records:null,
                    customers:null,
                    readings:null,
                    usage_id:null
                },
                navigation:{
                    list:true,
                    custom:false,
                    hover_line: ""
                },
                selected:{},
                usage:null,
              previous_usage:null,
              modal:false,
              customers:[],
              recent:{},
              usages:[],
              auth_user:{},
              default_img:user_defaultimg(),
              form:false,

                
            }
        }
    }
</script>
<style scoped>
.box{
    width:95%; height: auto;  border-left: 4px solid #3B82F6; border-radius: 4px; 
     animation: left-slide; 
     
}
.box:nth-child(1){
    animation-duration: .3s;
}
.box:nth-child(2){
    animation-duration: .4s;
}
.box:nth-child(3){
    animation-duration: .5s;
}
.box:nth-child(4){
    animation-duration: .6s;
}
.box:nth-child(5){
    animation-duration: .7s;
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
    height: calc(100vh - 21.7rem);
}
.search-bar:focus{
    outline: 0;
    border: 0;
}

.modal{
    background-color: rgba(0, 0, 0, 0.288);
}
.modal-box{
    display: block;
    margin: auto;
    background-color: white;
    height: 36.5rem;
    width: 90%;
    margin-top: 17%;
    box-shadow: 0px 1px 21px 0px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0px 1px 21px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 1px 21px 0px rgba(0,0,0,0.5);    
    border-radius: 3px;  
    animation: modal .3s linear;

}
.modal-box .bottom-content{
    height: calc(auto+2rem);
    width: 100%;
    border-radius: 4px;
    margin: auto ;
    margin-top: 1rem;
    
}

@keyframes modal {
    from{
        transform: translateY(-100%);
    }to{
        transform: translateX(0);
    }
    
}



.animate-select {
  animation: select 0.5s ease-in-out infinite;
}


</style>