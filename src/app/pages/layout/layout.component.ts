import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router = inject(Router);
  onLogOff(){
    //clr the localstorage data
    localStorage.removeItem('ticketUser');
    //redirect to the login page
    this.router.navigateByUrl('login');
  }
}
