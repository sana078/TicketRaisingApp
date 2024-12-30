import { Component } from '@angular/core';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent {
 // Injecting the service using inject() method
   constructor(
     private masterSrv: MasterService,
   ) {}
   
   gridList : any[]=[]; //initially deptList is empty and this datalist we need to display on the table
   deptList : any[]=[];

   newObj: any ={  //this object we need to bind to our form
       "categoryId": 0,
       "categoryName": "",
       "deptId": 0
   }
 
   ngOnInit():void {
     this.getGridDept(); //on the page load there will be 2 api call
     this.getAllDept();

   }
   getAllDept(){ //we need to call the api 
    this.masterSrv.getAllDepartment().subscribe((res:any)=>{
      debugger;
      this.deptList = res.data; //in res.data we will get the actual data.In data we have an array
    })
  }
   getGridDept(){ //we need to call the api 
     this.masterSrv.getAllParentCategory().subscribe((res:any)=>{
       debugger;
       this.gridList = res.data; //in res.data we will get the actual data.In data we have an array
     })
   }
 
   //save btn
   save(){
     debugger;
     this.masterSrv.createNewParentCategory(this.newObj).subscribe((res:any)=>{
       debugger;
       if(res.result){
         alert("Parent Category Created Success");
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
     this.masterSrv.updateParentCategory(this.newObj).subscribe((res:any)=>{
       debugger;
       if(res.result){
         alert("Parent-category update Successfully");
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
       this.masterSrv.deleteParentCategorybyId(id).subscribe((res:any)=>{
         debugger;
         if(res.result){
           alert("parent-category deleted Success");
           this.getGridDept();
         }
         else{
           alert(res.message);
         }
       })
     }
   }
 
}
