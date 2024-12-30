import { Component,OnInit } from '@angular/core';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit{
  
 constructor(
  private masterSrv: MasterService,
 ){}
 deptList: any[]=[]; // It is going to hold an array
 parentCategoryList: any[]=[];
 childCategoryList: any[]=[];
 filterCategoryList: any[]=[];
 selectPcategory: string = '';

 //created an object of createNewTicket
 newTicketObj: any ={
  "employeeId": 0,
  "severity": "",
  "childCategoryId": 0,
  "deptId": 0,
  "requestDetails": ""
 }


 ngOnInit():void{ //we need to call there 3 api on the page load also
  const  loggedUserData = localStorage.getItem('ticketUser');
  if(loggedUserData != null){
    const userData = JSON.parse(loggedUserData);
    this.newTicketObj.employeeId = userData.employeeId;
  }
  this.getAllDept();
  this.getAllParentCategory();
  this.getAllChildCategory();
 }
 onCategoryChange(){ //we need to filter the child category based on the selected parent category
     this.filterCategoryList = this.childCategoryList.filter(x=>x.parentCategoryName == this.selectPcategory);
 }
 OnCreateTicket(){
  debugger;
    this.masterSrv.createNewTicket(this.newTicketObj).subscribe((res:any)=>{
     if(res.result){
      alert("Ticket created successfully");
     }
     else{
       alert(res.message);
     }
    })
 }

 //getAllDepartment
 getAllDept(){ //we need to call the api 
  this.masterSrv.getAllDepartment().subscribe((res:any)=>{
    debugger;
    this.deptList = res.data; //in res.data we will get the actual data.In data we have an array
  })
}
getAllParentCategory(){ //we need to call the api 
  this.masterSrv.getAllParentCategory().subscribe((res:any)=>{
    debugger;
    this.parentCategoryList = res.data; //in res.data we will get the actual data.In data we have an array
  })
}

getAllChildCategory(){ //we need to call the api 
  this.masterSrv.getAllChildCategory().subscribe((res:any)=>{
    debugger;
    this.childCategoryList = res.data; //in res.data we will get the actual data.In data we have an array
  })
}
}
