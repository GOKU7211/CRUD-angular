import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  taskId!:any;
  taskForm!: FormGroup;
  taskarray:Task[]=[];

  constructor(
    private router:ActivatedRoute,
    private fb:FormBuilder,
    private crud:CrudService,
    private route: Router
  ){}

ngOnInit(): void {
  this.taskForm = this.fb.group({
    title: ['', Validators.required],
    desc: [''],
    status: ['', Validators.required]
  });
 console.log(this.crud.currentProduct)
 this.taskForm.patchValue({
  title:this.crud.currentProduct.title,
  desc:this.crud.currentProduct.desc,
  status:this.crud.currentProduct.status
 })
}
onSubmit(taskDataModel2:{title:string,desc:string,status:string}){
  if(this.taskForm.valid){
    this.crud.updateTask(this.crud.currentProductId,taskDataModel2).subscribe((res)=>{
      this.route.navigate(['/home'])
    })
  }
  
}
}
