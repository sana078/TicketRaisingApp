import { Component } from '@angular/core';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
   // Injecting the service using inject() method
        constructor(
          private masterSrv: MasterService,
        ) {}
        
        gridList : any[]=[]; 
        deptList : any[]=[]; //initially deptList is empty and this datalist we need to display on the table
        roleList: any[]=[]; 
        isNewView:boolean = false;
        newObj: any ={  //this object we need to bind to our form
          "employeeId": 0, 
          "employeeName": "",
          "contactNo": "",
          "emailId": "",
          "deptId": 0, 
          "password": "",
          "gender": "",
          "role": ""
        }
      
        ngOnInit():void {
          this.getGridDept(); //on the page load there will be 2 api call
          this.getAllDepartment();
          this.getAllRoles();
     
        }
        getAllDepartment(){ //we need to call the api 
         this.masterSrv.getAllDepartment().subscribe((res:any)=>{
           debugger;
           this.deptList = res.data; //in res.data we will get the actual data.In data we have an array
         })
       }
       getAllRoles(){ //we need to call the api 
        this.masterSrv.getAllRoles().subscribe((res:any)=>{
          debugger;
          this.roleList = res.data; //in res.data we will get the actual data.In data we have an array
        })
      }
        getGridDept(){ //we need to call the api 
          this.masterSrv.getAllEmployee().subscribe((res:any)=>{
            debugger;
            this.gridList = res.data; //in res.data we will get the actual data.In data we have an array
          })
        }
      
        //save btn
        save(){
          debugger;
          this.masterSrv.createEmp(this.newObj).subscribe((res:any)=>{
            debugger;
            if(res.result){
              alert("Employe Created Success");
              this.getGridDept();
            }
            else{
              alert(res.message);
            }
          })
        }
      
        //Edit btn
        onEdit(data:any){ 
          this.newObj = data;
        }
         //update btn
         update(){
          debugger;
          this.masterSrv.updateEmp(this.newObj).subscribe((res:any)=>{
            debugger;
            if(res.result){
              alert("Employee update Successfully");
              this.getGridDept();
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
            this.masterSrv.deleteEmp(id).subscribe((res:any)=>{
              debugger;
              if(res.result){
                alert("Employee deleted Success");
                this.getGridDept();
              }
              else{
                alert(res.message);
              }
            })
          }
    }
}
