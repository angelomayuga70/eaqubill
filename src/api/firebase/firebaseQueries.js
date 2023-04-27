import { get, set, remove, update, child, ref, getDatabase } from "firebase/database";
import {getAnalytics  } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,signOut,sendPasswordResetEmail } from "firebase/auth";
import {app} from './firebaseConfig.js';
import { getStorage, getDownloadURL, ref as sRef,  uploadBytesResumable} from "firebase/storage";



const delay = ms => new Promise(res => setTimeout(res, ms));



 class Firebase{
    constructor(){
        this.storage = getStorage();
        this.db = getDatabase();
        this.analytics = getAnalytics(app);
        this.auth = getAuth();
    }


    async auth_user(){
        return await new Promise((resolve)=>{
            onAuthStateChanged(this.auth,(user)=>{
                resolve(user);
            })
        });
    }

    async signOut(){
        return await new Promise((resolve)=>{
            signOut(this.auth).then(()=>{
                resolve(true);
            }).catch(async (error)=>{
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.signOut();
                }else{
                    resolve(error.message);
                   
                }
            })
        })
    }
        
    async signup(data){
        return await new Promise((resolve)=>{
          createUserWithEmailAndPassword(this.auth, data.email, data.password).then((userCredential)=>{
            const user = userCredential.user;
          data.password = '';
          data.uid = user['uid'];
            set(ref(this.db, "userAccount/"+user.uid), data).then(()=>{
                    resolve({stat:true, value:data, uid:user.uid});
            }).catch(async (error)=>{
                
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.signup(data);
                }else{
                    resolve({stat:false, message:error.message});
                }
            })

          }).catch(async (error)=>{
            if(error.message === 'Error: Client is offline.'){
                await delay(2000);
                   this.signup(data);
            }else{
                resolve({stat:false, message:error.message});
               
                
            }
        });

        }
    )}

 
    async signin(email, password){
        return await new Promise((resolve)=>{
        signInWithEmailAndPassword(this.auth, email, password).then((userCredential)=>{
                let user = userCredential.user;
                resolve({value:user, stat:true});
        }).catch(async(error)=>{
            if(error.message === 'Error: Client is offline.'){
                await delay(2000);
                   this.signin(email, password);
            }else{
                resolve({value:error.message, stat:false});
               
            }
        })
    })

    }

    
    async resetPassword(email = typeof String){
        return await new Promise((resolve)=>{
        sendPasswordResetEmail(this.auth, email).then(()=>{
            resolve(true)
        }).catch(async(error)=>{
            if(error.message === 'Error: Client is offline.'){
                await delay(2000);
                   this.resetPassword(email);
            }else{
                
                resolve(error.message);
            }
        })
    })

    }
    async insert(path = typeof String, data = typeof Object){
       
        return await new Promise((resolve)=>{
            set(ref(this.db, path), data).then(()=>{
                    resolve(true);
            }).catch(async(error)=>{
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.insert(path, data);
                }else{
                    alert(error.message);
                    resolve(false);
                }
            })
      

        })
    }
    async update_value(path  = typeof String, data = typeof Object){
        return await new Promise((resolve)=>{
            update(ref(this.db, path), data).then(()=>{
                resolve(true);
            }).catch(async(error)=>{
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.update(path, data);
                }else{
                    alert(error.message);
                    resolve(false);
                }
            })
        })

    }
    async delete(path){
        return await new Promise((resolve)=>{
            remove(ref(this.db, path)).then(()=>{   
                resolve(true);
            }).catch(async(error)=>{
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.delete(path);
                }else{
                    alert(error.message);
                    resolve(false);
                }
            })
        })

    }
    async getValue(path){
        return await new Promise((resolve)=>{
            get(child(ref(this.db), path)).then((snapshot)=>{
                if(snapshot.exists()){
                    console.table(snapshot.val())
                    resolve(snapshot.val());
                }else{
                    resolve(null);
                }
            }).catch(async(error)=>{
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.getValue(path);
                }else{
                    alert(error.message);
                    resolve(false);
                }
            })

        })
    }
    async getImage(path, name, ext){
        return await new Promise((resolve)=>{
        getDownloadURL(sRef(this.storage, path+'/'+name+'.'+ext))
        .then((url) => {
        
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
       
          xhr.open('GET', url);
          xhr.send();
          resolve(url);
        })
        .catch(async(error) => {
            if(error.message === 'Error: Client is offline.'){
                await delay(2000);
                   this.getImage(path, name, ext);
            }else{
                
                resolve(false);
            }
        })
    })
    }

    async getObjects(path){
        return await new Promise((resolve)=>{
            get(child(ref(this.db), path)).then((snapshot)=>{
                if(snapshot.exists()){
                    let result = [];
                    snapshot.forEach(childSnapshot =>{
                        result.push(childSnapshot.val());
                    });
                    resolve(result);
                }else{
                    resolve(null);
                }
            }).catch(async(error)=>{
                if(error.message === 'Error: Client is offline.'){
                    await delay(2000);
                       this.getObjects(path);
                }else{
                    alert(error.message);
                    resolve(false);
                }
            })
        })

    }
  
    async setImage(image , name){
    
        return await new Promise((resolve)=>{
            const metaData = {
                contentType: image.type,
                
            }
           
            const storageRef = sRef(this.storage, 'users/'+name+'.png');
            const uploadTask = uploadBytesResumable(storageRef,image,metaData);
                uploadTask.on('state-changed', ()=>{
              
            },(error)=>{
                alert(error.message);
               resolve(false);
            },async ()=>{
             await   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                   resolve(downloadURL);
                
                })
            })
                
    
        
        })
    }
    async getUserInfo(uid){
        return new Promise((resolve)=>{
            const temp_object = async (path) =>{
                return await this.getObjects(path);
            }
            
            async function searchUsers() {
                let users = await temp_object('userAccount');
                for(let user of users){
                    if(user.uid === uid){
                        resolve(user);
                        break;
                    }
                }
            }
            searchUsers();
        });
    }




}
export {Firebase}