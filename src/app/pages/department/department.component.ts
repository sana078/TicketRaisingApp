import { Component,OnInit } from '@angular/core';
import { MasterService } from '../../master.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [DatePipe,FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

 // Injecting the service using inject() method
  constructor(
    private masterSrv: MasterService,
  ) {}
  
  deptList : any[]=[]; //initially deptList is empty and this datalist we need to display on the table
  newDeptObj: any ={  //this object we need to bind to our form
      "deptId": 0,
      "deptName": "",  //there are the properties
      "createdDate": ""
  }

  ngOnInit():void {
    this.getDept();  
  }
  getDept(){ //we need to call the api 
    this.masterSrv.getAllDepartment().subscribe((res:any)=>{
      debugger;
      this.deptList = res.data; //in res.data we will get the actual data.In data we have an array
    })
  }

  //save btn
  saveDepartment(){
    debugger;
    this.masterSrv.createNewDepartment(this.newDeptObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert("Dept Created Success");
      }
      else{
        alert(res.message);
      }
    })
  }

  //Edit btn
  onEdit(data:any){ 
    this.newDeptObj = data;
  }
   //update btn
   updateDepartment(){
    debugger;
    this.masterSrv.updateDepartment(this.newDeptObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert("Dept update Successfully");
      }
      else{
        alert(res.message);
      }
    })
  }
  //delete
  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete?");
    if(isDelete){
      this.masterSrv.deleteDepartmentbyId(id).subscribe((res:any)=>{
        debugger;
        if(res.result){
          alert("Dept deleted Success");
        }
        else{
          alert(res.message);
        }
      })
    }
  }

}
