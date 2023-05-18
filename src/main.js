import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Toaster from "@meforma/vue-toaster";
import toastr from 'toastr';
import {Firebase} from "@/api/firebase/firebaseQueries";
import { Storage } from '@/storage/storage'
import 'toastr/build/toastr.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Network } from '@capacitor/network';


// Network.addListener('networkStatusChange', () => {
//    window.location.reload();
// });


async function isUserOnline() {
        return (await Network.getStatus()).connected;
 }


  

let firebase = new Firebase(), storage = new Storage();
function validate(inputs){
    for(let input of inputs){
        
        if(!input['value']){
            return  input['key']+" is required!";
        }
        
        if(input['type'] == 'email'){
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!input['value'].match(validRegex)) {
                return "Invalid email!";
            } 
        }
        if(input['type'] == 'number'){
            if (!/^\d+$/.test(input['value'])) {
                return 'Invalid value for '+ input['key']+"!";
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
function closeCustomerModal(){
    let container = document.getElementById('add-customer-modal-container'),
        box = document.getElementById('add-customer-modal'),
        style = document.getElementById('add-customer-modal-style');

        box.style.transform = 'translateY(-800px)';
        box.style.transition = '.4s';
        setTimeout(()=>{
            container.remove();
            style.remove();
        },400);
}
const user_defaultimg = () =>{return localStorage.getItem('img/eaquabill/defaultimg/profile').toString();};

async function addCustomerModal(){
    const style = document.createElement('style');
    style.textContent = `
    .modal{
        background: rgba(0, 0, 0, 0.233);
      
  
      }
      .modal .box{
        width: 90%;
        height: 25rem;
        animation: slidein .4s;
        align-items:center;
        display:block;
        margin:auto;
        margin-top: 90px;
      }
      
      @keyframes slidein {
          from{
            transform: translateY(-400px);
          }to{
            transform: translateY(0);
          }
      }
    `
    document.head.appendChild(style);
    const row = "mb-4"
    let container  = document.createElement('div');
    container.className = "absolute w-full h-screen modal flex justify-center";

    let box = document.createElement('div');
    box.className = "bg-white box mt-32 shadow-xl";
    box.id = "add-customer-modal";
    container.id='add-customer-modal-container'
    style.id = 'add-customer-modal-style'

    let title = document.createElement('h2');
    title.innerText = "ADD CUSTOMER";
    title.className = "text-xl font-bold mb-4 px-4 py-4";


    let form_container = document.createElement('div');
    form_container.className = "m-auto";
    form_container.style.width = "90%";
 let fields = {
                'Full Name':'full-name',
               
                'Meter ID':'meter-id',
              
                "Address":"address"
                };
 let field_keys = Object.keys(fields);

 for(const key of field_keys){

    let field_container = document.createElement('div');
    field_container.className = row;
    let label = document.createElement('label');
    label.className = "block text-gray-700 font-bold mb-2";
    label.for = key;
    label.innerText = key;
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    if(key == "Contact"){
        input.type = "number";
    }
    input.placeholder = `Enter your ${key.toLowerCase()}`;
    input.id = fields[key];
    field_container.appendChild(label);
    field_container.appendChild(input);

    form_container.appendChild(field_container);
 }
 let button_container = document.createElement('div');
 button_container.className = "flex justify-end";

 let cancel_btn = document.createElement('button');
 cancel_btn.className = "bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline";
 cancel_btn.innerText = "Cancel";
 let submit_btn = document.createElement('button');
 submit_btn.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
 submit_btn.innerHTML = "Submit";
 button_container.appendChild(cancel_btn);
 button_container.appendChild(submit_btn);

 form_container.appendChild(button_container);

 box.appendChild(title);
 box.appendChild(form_container);

 container.appendChild(box);
 document.body.insertBefore(container, document.body.firstChild);

function closeModal(){
    box.style.transform = 'translateY(-800px)';
    box.style.transition = '.4s';
    setTimeout(()=>{
        container.remove();
        style.remove();
    },400);
}

return await new Promise((res)=>{
    cancel_btn.onclick = () =>{
        closeModal();
        res(false);
    }
    submit_btn.onclick = async () =>{
        let error = validate([
            {key: "full name", value: document.getElementById('full-name').value},
        
            {key: "meter id", value: document.getElementById('meter-id')},
          
            {key: "address", value: document.getElementById('address').value},
        ]);

        if(!error){
            let id = await char_randomizer();
            let form = {};
            
            for(const key of field_keys){
                form[key.replace(' ','_').toLowerCase()] = document.getElementById(fields[key]).value.toString();
            }
            form['uid'] = id;
            res(form);
        }else{
             toastr.error(error,{position: 'top-right'});
        }     
    }
});
}

async function char_randomizer(){
    return await new Promise((res)=>{
        let result = '';
        const min = 20;
        const max = 40;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        const possibleCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let i = 0;i<randomNum;i++){
            const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
            result += possibleCharacters[randomIndex];
        }
        res(result);
    });
}

async function question_box(){
    const style = document.createElement('style');
    style.textContent = `
    .bg-shadow{
        background-color: rgba(0, 0, 0, 0.103);
    }
    
    .dialogue{
        animation: focus_ .2s ease-in;    
        animation-iteration-count: 2;
        border: 2px solid transparent;
    }
    @keyframes focus_ {    
        to{
            border: 2px solid gray;
        }
    }
    `;

    document.head.appendChild(style);
    let container = document.createElement('div');
    container.className = "w-full h-screen absolute flex justify-center items-center bg-shadow";

    let box = document.createElement('div');
    box.className = "h-28 w-60 border-2 dialogue shadow-lg  bg-white ";

    let top = document.createElement('div');
    top.className = "flex justify-between";

    let title = document.createElement('span');
    title.className = "text-base text-gray-600 px-3 py-2";
    title.innerHTML = "Please confirm";

    let close_icon = document.createElement('i');
    close_icon.className = "bi bi-x text-lg text-gray-600 px-3 py-1 cursor-pointer";

    top.appendChild(title);
    top.appendChild(close_icon);

    let question = document.createElement('div');
    question.className = "block text-xs px-3";
    question.innerText = "Are you sure you want to continue?";

    let bottom_area = document.createElement('div');
    
    let yes_btn = document.createElement('button');
    yes_btn.className = "bg-blue-500 text-white px-4 text-xs py-1  border-gray-400 ml-4 mt-3";
    yes_btn.innerText = "Yes";

    let no_btn = document.createElement('button');
    no_btn.className = "bg-gray-400 text-white px-4 text-xs py-1  border-gray-400 ml-3 mt-3";
    no_btn.innerText = "No";

    bottom_area.appendChild(yes_btn);
    bottom_area.appendChild(no_btn);

    box.appendChild(top);
    box.appendChild(question);
    box.appendChild(bottom_area);

    container.appendChild(box);
    document.body.insertBefore(container, document.body.firstChild);

    const close_modal = () =>{
        box.style.transform = 'scale(0)';
        box.style.transition = '.3s';
        setTimeout(()=>{
            container.remove();
            style.remove();
        },300);
    }

    return await new Promise((res)=>{
        yes_btn.onclick = () =>{
            close_modal();
            res(true);
        }   
        no_btn.onclick = () =>{
            close_modal();
            res(false);
        }
        close_icon.onclick = () =>{
            close_modal();
            res(false);
        }
    })
    
}

function getCurrentDate(format){
    const date = new Date();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const d = date.getDate().toString().padStart(2, '0');
    if(format == 'dd-mm-yyyy'){
        return d+'-'+m+'-'+y;
    }
    
}

export {validate, firebase, errorMessage, question_box, user_defaultimg, storage, addCustomerModal, char_randomizer, closeCustomerModal, getCurrentDate, isUserOnline}

createApp(App).use(Toaster).mount("#app");

