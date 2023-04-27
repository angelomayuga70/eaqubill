<template >
    <div class="w-full h-screen absolute flex justify-center items-center bg-shadow">
        <div  class="h-28 w-60 border-2 dialogue shadow-lg  bg-white ">
            <div class="flex justify-between"> 
                <span class="text-base text-gray-600 px-3 py-2">Please confirm</span>
                <i class="bi bi-x text-lg text-gray-600 px-3 py-1 cursor-pointer"></i>
            </div>
                
                 <span class="block text-xs px-3">Are you sure you want to continue?</span>
           <div> 
            <button @click="option_yes" class="bg-blue-500 text-white px-4 text-xs py-1  border-gray-400 ml-4 mt-3">Yes</button>
            <button @click="option_no" class="bg-gray-400 text-white px-4 text-xs py-1  border-gray-400 ml-3 mt-3">No</button>
            
           </div>
        </div>

    </div>
</template>
<script>
    export default{
        name:"QuestionDialog",
        methods:{
            option_no(){
                this.$emit('question-dialogue-val', {stat:false, value:false});
            },
            option_yes(){
                this.$emit('question-dialogue-val', {stat:false, value:true});
            }
        },
        data(){
            return{
           
            }
        } ,
    
    }
</script>

<style scoped>  
.bg-shadow{
    background-color: rgba(0, 0, 0, 0.103);
}

.dialogue{
    animation: focus_ .2s ease-in;    
    animation-iteration-count: 2;
    border: 2px solid transparent;
}
@keyframes focus_ {
    from{
        transform: scale(.99);        
    }
    to{
        border: 2px solid gray;
    }
}


</style>