import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
currentProduct:any;
currentProductId:any;
url="https://angularpro-192b2-default-rtdb.firebaseio.com/tasks.json"
  constructor(private http:HttpClient) { }

createTask(task:any){
  return this.http.post(this.url,task)
  }
getTasks(){
    return this.http.get<{[key:string]:Task}>(this.url).pipe(map((response)=>{
      let tasks =[];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key],id:key})
        } 
      }
      return tasks;
    }))
  }
  deleteTask(id:string | undefined){
    return this.http.delete('https://angularpro-192b2-default-rtdb.firebaseio.com/tasks/'+id+'.json')
  }
  getTaskById(id:string|undefined){
    return this.http.get<Task>('https://angularpro-192b2-default-rtdb.firebaseio.com/tasks/edit/'+id+'.json')
  }
  updateTask(id:string|undefined, task:Task){
   return this.http.put('https://angularpro-192b2-default-rtdb.firebaseio.com/tasks/'+id+'.json',task)
  }
  
}
