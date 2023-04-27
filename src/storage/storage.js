class Storage{
        
        constructor(){
            this.dir = 'aquabill/storage/';
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