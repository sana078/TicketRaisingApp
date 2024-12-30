import { Component ,OnInit} from '@angular/core';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit{
 mode: string = 'My Tickets'; //after change the mode we need to call an api
 ticketList:any[]=[];
 loggedUserEmployeeId:any;
  constructor(
      private masterSrv: MasterService,
    ) {}
  ngOnInit(): void {
    const  loggedUserData = localStorage.getItem('ticketUser');
    if(loggedUserData != null){
      const userData = JSON.parse(loggedUserData);
      this.loggedUserEmployeeId = userData.employeeId;
    }
    this.changeMode(this.mode);
  }

 changeMode(tab : string){
  this.mode = tab;
  if(this.mode == 'My Tickets'){
    this.masterSrv.getCreatedByLoggedEmp(this.loggedUserEmployeeId).subscribe((res:any)=>{
       this.ticketList = res.data;
    })
  }else{
      this.masterSrv.getTicketAssignendToEmp(this.loggedUserEmployeeId).subscribe((res:any)=>{
      this.ticketList = res.data;
    })
  }
 }

}
