import { Component } from '@angular/core';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css'
})
export class ChildCategoryComponent {
  // Injecting the service using inject() method
     constructor(
       private masterSrv: MasterService,
     ) {}
     
     gridList : any[]=[]; 
     parentCategoryList : any[]=[]; //initially dparentCategoryList is empty and this datalist we need to display on the table
  
     newObj: any ={  //this object we need to bind to our form
         "childCategoryId": 0,
         "categoryName": "",
         "parentCategoryId": 0 
     }
   
     ngOnInit():void {
       this.getGridDept(); //on the page load there will be 2 api call
       this.getPCategory();
  
     }
     getPCategory(){ //we need to call the api 
      this.masterSrv.getAllParentCategory().subscribe((res:any)=>{
        debugger;
        this.parentCategoryList = res.data; //in res.data we will get the actual data.In data we have an array
      })
    }
     getGridDept(){ //we need to call the api 
       this.masterSrv.getAllChildCategory().subscribe((res:any)=>{
         debugger;
         this.gridList = res.data; //in res.data we will get the actual data.
       })
     }
   
     //save btn
     save(){
       debugger;
       this.masterSrv.createNewChildCategory(this.newObj).subscribe((res:any)=>{
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
       this.masterSrv.updateChildCategory(this.newObj).subscribe((res:any)=>{
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
         this.masterSrv.deleteChildCategorybyId(id).subscribe((res:any)=>{
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
