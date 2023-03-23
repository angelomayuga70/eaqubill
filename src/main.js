import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import Toaster from "@meforma/vue-toaster";
import {Firebase} from "@/firebase/firebaseQueries.js";

let firebase = new Firebase();
function validate(inputs){
    for(let input of inputs){
        if(!input['value']){
            return "Missing "+ input['key']+"!";
        }
        if(input['type'] == 'email'){
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!input['value'].match(validRegex)) {
                return "Invalid email!";
            } 
        }
        if(input['type']=='contact'){  
            if(isNaN(parseFloat(input['value'])) && isFinite(input['value'])){
                return "Invalid phone number!";
            }
            if(input['value'].toString().length >= 13 || input['value'].toString().length <= 10){
                return "Invalid phone number!";
            }
            
        }
    }
 
    return false;
}


const firebase_error = {
    "Firebase: Error (auth/network-request-failed).":"Connection failed!",
    "Firebase: Error (auth/user-not-found).":"User not found!",
    "Firebase: Error (auth/wrong-password).":"Incorrect password",
    "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":"To many attemps. Try again later!",
    "Firebase: Error (auth/invalid-email).":"Invalid email!",
    "Firebase: Error (auth/email-already-in-use).":"Email already in use!",
    "Firebase: Error (auth/timeout).":"Connection timeout!",
    "Firebase: Password should be at least 6 characters (auth/weak-password).":"Weak password!"

}

function errorMessage(error){
  return firebase_error[error];
}

export {validate, firebase, errorMessage}

createApp(App).use(Toaster).mount("#app");

