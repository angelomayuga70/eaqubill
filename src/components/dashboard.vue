<template>
    <div>
        <div style="border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;" class="h-44  w-full bg-blue-500 py-4 px-4 -mt-2 flex justify-between shadow-xl ">
            <span class="text-lg font-bold text-white py-3 "> <i class="bi bi-ui-checks-grid"></i> &nbsp;DashBoard</span>
            <img class="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_-9C12h7JKdb02jgBDNiFgHWTp04Xbud_ZFS8xnjIylg-7wIPfixzgB5f6NT76T5R6M&usqp=CAU">
            
        </div>
        <div style="width: 89%;" class="h-52  bg-white m-auto -mt-28 shadow-xl rounded-xl block">
           
            <div class="w-full h-full block mt-8">
            <div class="w-full flex justify-center mt-8">
                <span class="mt-8 text-gray-600 block">Total Customers</span>
            </div>
            <div class="w-full flex justify-center">
                <span class="mt-auto block text-blue-500 font-bold font-mono text-4xl">203</span>
            </div>
            <div class="flex justify-evenly w-full h-24 items-end ">
                <div class="block text-center mt-5 w-full ">
                    <span class="block font-mono font-bold text-3xl">40</span>
                    <span class="block font-mono ">Pending</span>
                </div>

                <div class="block mt-5 text-center w-full">
                    <span class="block font-mono font-bold text-3xl">12</span>
                    <span class="block font-mono">Meter Read</span>
                </div>

                <div class="block mt-5 text-center w-full">
                    <span class="block font-mono font-bold text-3xl">10</span>
                    <span class="block font-mono">Paid</span>
                </div>
            </div>
            </div>

            <div>

            </div>
        </div>
      

        <div style="width: 89%;" class="h-52  bg-white m-auto mt-4  shadow-xl rounded-xl block">
           
                <div>
                    <div style="z-index: 1;">
                        <div  style="z-index: 1; position: relative;" id="chart" ref="lineChart"></div>
                    </div>
                </div>

           <div>

           </div>
       </div>
      
       
    </div>
</template>
<script> 
    import ApexCharts from 'apexcharts';

    export default{
        name:"DashBoard",
        props:{
            slide : Boolean
        },
        watch:{
            slide(){
               let chart =  this.$refs.lineChart;
               if(this.slide){
                chart.style.visibility = "hidden";
               }else{
                chart.style.visibility = "visible";
               }
            }
        },
        mounted: async function(){
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
        data(){
            return{
           
        }
        },methods:{
         
        }

        
    
    }
</script>

<style scoped>

</style>