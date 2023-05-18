<template>
          <div class="bg-slate-50">
            <div  class="h-44  w-full bg-blue-500 shadow-xl">
            <div  class=" py-4 px-4 -mt-2 flex justify-between  ">
            <span class="text-lg font-bold text-white py-3 "> <i class="bi bi-person-lines-fill"></i> &nbsp;Profile</span>
            <img class="w-12 h-12 rounded-full"  :src="user.img_url?user.img_url:user.default_img">
            </div>
            <div class="-mt-3">
                <div class="text-white text-sm font-bold px-4">
                <span class="">Name : <span>{{ user.full_name }}</span></span><br>
                <span>Role : <span>{{ user.role }}</span></span>
            </div>
                <div class="mt-1">
                    <button @click="resetpass" class="bg-gray-100 ml-4 px-3 py-1 rounded-sm text-sm font-bold text-gray-800"> Reset Password</button>
                </div>
                </div>
            </div>
            <div  class="box-height overflow-x-scroll w-full ">
                <div class="flex justify-center mt-3 mb-6" >
                    <img ref="img_display" class="w-28 border-2 border-blue-500 shadow-md h-28 rounded-full" :src="user.img_url?user.img_url:user.default_img">
                    <div class="float-right ml-7 mt-4" >
                        <input @change="loadIMG" ref="photo_upload"  accept="image/*" type="file" class="hidden">
                        <button @click="upload_file" class="rounded bg-blue-500 w-40 text-white px-6 py-1">Change Picture</button>
                        <button class="rounded block w-40 text-white mt-2  bg-gray-400 px-6 py-1">Reset</button>
                </div>
                </div>
             <div>
                <div  style="width: 90vw;" class="m-auto  bg-white shadow-xl rounded">
                <div class="flex justify-center px-2">
                   <div   >
                        <div class="px-2 py-1 mt-auto">
                            <label class="text-xs text-gray-600" for="fname">First Name</label>
                            <input v-model="user.first_name"  class="py-1 px-2 text-xs active:border-gray-500 border-2 w-36 rounded border-blue-500  " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Last Name</label>
                            <input v-model="user.last_name"  class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Phone</label>
                            <input  v-model="user.phone"  class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Email</label>
                            <input readonly v-model="user.email"  class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Meter ID</label>
                            <input  v-model="user.meter_id"  class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                    
                </div>
                    <div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Street</label>
                            <input v-model="user.address.street" class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Barangay</label>
                            <input v-model="user.address.barangay"  class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Municipality</label>
                            <input v-model="user.address.municipality"  class=" py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                        <div class="px-2 py-1">
                            <label class="text-xs text-gray-600" for="fname">Province</label>
                            <input v-model="user.address.province"  class="py-1 px-2 text-xs border-2 w-36 rounded border-blue-500 " name="fname" id="fname" type="text">
                        </div>
                </div>
                
                </div>
                <div class="flex justify-end mt-4 mr-4 text-sm">
                    <button @click="update_profile" class="px-3 py-1 bg-blue-500 text-white rounded" >Save Changes</button>
                </div>
                <br>
            </div> 
            
                </div>
            </div> 
        </div>
</template>
<script>
 import {firebase, question_box, validate} from "@/main";


 export default{
   
    name:"AccountSetting",
    mounted: async function(){
        this.refresh();
     
    },
    methods:{
        loadIMG(){
            let file_input = this.$refs.photo_upload;
            let img = file_input.files[0], display = this.$refs.img_display;
            if(img){
                this.user.profile_img = img;
                const reader = new FileReader();
                reader.onload = (event) => {
                display.src = event.target.result;
                };
                reader.readAsDataURL(img);
                }
        },
        upload_file(){
            let file_input = this.$refs.photo_upload;
            file_input.click();
        },
        async update_profile(){
        
          

            const dialogue = await question_box();
            if(dialogue){
                this.$emit('set-loader', true);
                let error = validate([
                   { key:"first name", value: this.user.first_name },
                   { key:"last name", value: this.user.last_name },
                   { key:"street", value: this.user.address.street },
                   { key:"barangay", value: this.user.address.barangay },
                   { key:"municipality", value: this.user.address.municipality },
                   { key:"province", value: this.user.address.province },
                   { key:"phone", value: this.user.phone },
                   { key:"meter id", value: this.user.meter_id }
            ]);
            let img_path = null;
            if(this.user.profile_img){
                const upload_image = await firebase.setImage(this.user.profile_img, this.user.uid);
                if(upload_image){
                    img_path = upload_image;
                }
            }
               
                if(!error){
                let update = await firebase.update_value(`userAccount/${this.user.uid}`,{
                    first_name:this.user.first_name,
                    last_name:this.user.last_name,
                    street:this.user.address.street,
                    baranggay:this.user.address.barangay,
                    municipality:this.user.address.municipality,
                    province:this.user.address.province,
                    phone_number:this.user.phone,
                    img_url:img_path??this.user.img_url,
                    meter_id:this.user.meter_id,
                  
                })
                if(update){
                    await firebase.update_value(`customers/${this.user.uid}`,{
                        first_name:this.user.first_name,
                        last_name:this.user.last_name,
                        street:this.user.address.street,
                        baranggay:this.user.address.barangay,
                        municipality:this.user.address.municipality,
                        province:this.user.address.province,
                        phone_number:this.user.phone,
                        img_url:img_path??this.user.img_url,
                        meter_id:this.user.meter_id
                    })
                    this.$toast.success('Record update',{position: 'top-right'});
                    this.refresh();
                }
            }else{
                this.$toast.error(error,{position: 'top-right'});
                this.$emit('set-loader', false);
            }
            }

        },
        async refresh(){
            this.$emit('set-loader', true);
            const auth = await firebase.auth_user();
            const user = await firebase.getUserInfo(auth.uid);
            this.$emit('set-loader', false);
            if(auth && user){
                this.user.uid = auth.uid;
                this.user.full_name = user.first_name+" "+user.last_name;
                this.user.first_name = user.first_name;
                this.user.last_name = user.last_name;
                this.user.role = user.role;
                this.user.email = user.email;
                this.user.address.street = user.street;
                this.user.address.barangay = user.baranggay;
                this.user.address.municipality = user.municipality;
                this.user.address.province = user.province;
                this.user.phone = user.phone_number;
                this.user.img_url = user.img_url;
                this.user.meter_id = user.meter_id
            }

        },
        async resetpass(){
            let dialogue = await question_box();
            if(dialogue){
                this.$emit('set-loader', true);
                let reset_pass = await firebase.resetPassword(this.user.email);
                if(reset_pass){
                    this.$emit('set-loader', false);
                    this.$toast.success('An email containing a link to reset your password has been sent. Kindly check your email inbox for further instructions.');
                }
            }
        }
    },
    data(){
        return{
           user:{
                uid:null,
                full_name:null,
                first_name:null,
                last_name:null,
                role:null,
                address:{
                    street:null,
                    barangay:null,
                    province:null,
                    municipality:null
                },
                profile_img:null,
                email:null,
                phone:null,
                img_url:null,
                meter_id:null,
                default_img : localStorage.getItem('img/eaquabill/defaultimg/profile')
           },
          
           
        }
    }
 }
</script>
<style scoped>
.box-height{
    height: calc(100vh - 14rem);
}

</style>