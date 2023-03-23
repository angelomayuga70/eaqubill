<template>
    <div class="w-full h-screen panel absolute flex justify-center items-center">
        <div  class=" w-80 h-48 box rounded shadow-xl" ref="box">
            <div class="px-3 py-3 text-xl font-bold">
                <span>Forgot Password </span>
                <i class="bi bi-question-circle-fill"></i>
            </div>
           
                <div class="input-contain ml-4 mt-2">
                <input type="email" id="fname" name="fname" autocomplete="off" placeholder=" " v-model="email" aria-labelledby="placeholder-fname">
                <label class="placeholder-text" for="fname" id="placeholder-fname">
                <div class="text">Email</div>
                    </label>
                </div>
                <div class="flex w-full justify-end mt-7">
                <div class="w-56  flex justify-between px-8">
                    <button class="px-3 py-1 bg-gray-400 text-white rounded shadow-lg" @click="closeModal()">Cancel</button>
                    <button class="px-3 py-1 bg-blue-500 text-white rounded shadow-lg " @click="forgotPassword()">Submit</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {firebase, validate, errorMessage} from '@/main.js';


export default{
    name:"ForgotPassword",
    methods:{
        async forgotPassword(){
            let error = validate([{type:'email', key:"Email", value:this.email}]);
            if(!error){
                this.$emit('set-loader',true);
                let execute = await firebase.resetPassword(this.email);
                if(execute == true){
                    this.$toast.success('The reset password link has already been sent to your email!');
                    this.closeModal();
                }else{
                    this.$toast.error(errorMessage(execute));
                }
            }else{
                this.$toast.error(error);
            }
          
            this.$emit('set-loader',false);

        },
        closeModal(){
          
            let box = this.$refs.box;
            box.style.transition = '.3s';
            box.style.transform = 'translateY(-100%)';
            setTimeout(()=>{
                this.$emit('trigger-modal', false)
            }, 150);
        }
       
       
    },
    mounted: async function(){
        let input_element = document.querySelector("input");

            input_element.addEventListener("keyup", () => {
                input_element.setAttribute("value", input_element.value);
            })
    },
    data(){
        return{
            email:""
        }
    }
    
}
</script>
<style scoped>

.closemodal{
    transform: translateY(-100%);
    transition: 1s;
}
.panel{
  background-color: rgba(0, 0, 0, 0.449);
}
.box{
 background-color: white;
 animation: zoom .2s linear ;
}
@keyframes zoom {
    from{
        transform: translateY(-80%);
    }to{
        transform: translateY(0);
    }
}

.input-contain{
    position: relative;
}
input{
    height: 3rem;
    width: 90%;
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
}

.placeholder-text{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 3px solid transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
}

.text{
    font-size: .8rem;
    padding: 0 0.5rem;
    background-color: transparent;
    color: black;
    font-weight: bold;
}

input, .placeholder-text{
    font-size: .9rem;
    padding: 0 .8rem;
}

input:focus{
    outline: none;
    border-color: black;
}

input:focus + .placeholder-text .text{
    background-color: white;
    font-size: .8rem;
    color: black;
    transform: translate(0, -170%);
    border-color: black;
    color: black;
}

.text{
    transform: translate(0);
    transition: transform 0.15s ease-out, font-size 0.15s ease-out, background-color 0.2s ease-out, color 0.15s ease-out;
}
input:focus + .placeholder-text .text, input:not(:placeholder-shown) + .placeholder-text .text{
    background-color: white;
    font-size: .7rem;
    color: black;
    transform: translate(0, -120%);
    font-weight: bold;
}

input:focus + .placeholder-text .text{
    border-color: black;
    color: black;
}
</style>