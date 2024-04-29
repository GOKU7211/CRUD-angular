import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Task } from '../model/task.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  taskListFromService:Task[]=[];
  currenTaskid:string|undefined='';
constructor(private crud:CrudService,
  private http:HttpClient,
  private router:Router,
  private route:ActivatedRoute
){}

  ngOnInit(): void {
    this.crud.getTasks().subscribe((tasks)=>{
     console.log(tasks)
     this.taskListFromService=tasks;
     console.log('kl',this.taskListFromService)
    })
  }


onDelete(id:string | undefined){
  event?.preventDefault()
  if(confirm('you want to delete the task?')){
    this.crud.deleteTask(id).subscribe((RES)=>{
      this.crud.getTasks().subscribe((tasks)=>{
        console.log(tasks)
        this.taskListFromService=tasks;
        console.log('kl',this.taskListFromService)
       })
      this.router.navigate(['/home'])
    })
    
  }
  
}
onClear(){
  if(confirm('you want to delete all')){
    this.http.delete('https://angularpro-192b2-default-rtdb.firebaseio.com/tasks.json').subscribe(()=>{
      this.crud.getTasks().subscribe((tasks)=>{
        console.log(tasks)
        this.taskListFromService=tasks;
        console.log('kl',this.taskListFromService)
       })
      this.router.navigate(['/home'])
    })
  }
 
}
onEditClick(id:string|undefined){
  event?.preventDefault()
  let currentP = this.taskListFromService.find((p)=>{return p.id === id})
  console.log('currentP',currentP)
  this.crud.currentProduct=currentP
  this.crud.currentProductId=id
  this.router.navigate(['edit',id])
  
}
}
