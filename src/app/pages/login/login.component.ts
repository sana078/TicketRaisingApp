import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any ={ // this object we need to bind in the login form
    "emailId": '',
    "password": ''
  }

 // Dependency injection through constructor
 constructor(
  private masterSrv: MasterService,
  private router: Router
) {}
 
  onLogin(){
    debugger;
    this.masterSrv.login(this.loginObj).subscribe((res:any) => {
      debugger;
      if(res.result){
        localStorage.setItem('ticketUser',JSON.stringify(res.data))
        //navigate to the dashboard page
        this.router.navigateByUrl('dashboard');
      }
      else{
        alert(res.message);
      }  
    })
  }

}
