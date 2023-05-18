class Storage{
        
        constructor(){
            this.dir = '1Ade1232gAgwggiTYTgatewTvTasy/aquabill2023/storage/';
        }
        setItem(key, value){
            localStorage.setItem(this.dir+key, value);
        }
        getItem(key){
            return localStorage.getItem(this.dir+key, key);
        }
        setJSON(path  ='', json = {}){
            localStorage.setItem(this.dir+path, JSON.stringify(json));
        }
        getJSON(path){
            const data = localStorage.getItem(this.dir+path);
            return JSON.parse(data);
        }
        deleteJSON(path = ''){
            localStorage.removeItem(this.dir+path);
        }
        createList(path = '', lists = []){
                localStorage.setItem(this.dir+'list/'+path, JSON.stringify(lists));
    
        } 
        deleteOnList(path, id){
            const key = this.dir+'list/'+path;
            let lists = [], result = [];
            lists = JSON.parse(localStorage.getItem(key));
            if(lists){
                for(let list of lists){
                    if(id != list.id){
                        result.push(list);
                    }
                }
            }
            localStorage.setItem(key, JSON.stringify(result));
            lists = [];
            result = [];
        }
        updateList(){
                
        }

}
export { Storage }