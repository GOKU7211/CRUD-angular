import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
taskForm!:FormGroup;
constructor(
  private crud:CrudService,
  private fb: FormBuilder,
  private router:Router
){}
ngOnInit(): void {
  this.taskForm =this.fb.group({
 title:['',Validators.required],
 desc:[''],
 status:this.fb.array([])
  })
}

  createTaskdb(taskdataModel:{title:string,desc:string,status:string}){
    if(this.taskForm.valid){
      this.crud.createTask(taskdataModel).subscribe((res)=>{
        this.router.navigate(['/home'])
      })
    }
    
       ;
  }

}
