import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentRoute: string = '';
  headerTitle: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) 
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;

      // Set the title based on the current route
      switch (this.currentRoute) {
        case '/department':
          this.headerTitle = 'Department List';
          break;
        case '/parent-category':
          this.headerTitle = 'Parent Category List';
          break;
        case '/child-category':
          this.headerTitle= 'Child Category List';
          break;
        case '/employee':
          this.headerTitle = 'Employee List';
          break;
        case '/new-ticket':
          this.headerTitle = 'Create New Ticket';
          break;
        case '/ticket-list':
          this.headerTitle = 'Ticket List';
          break;
        case '/layout':
          this.headerTitle = 'Layout Component';  // Title for layout pages
          break;
        default:
          this.headerTitle = 'dashboard';  // for undefined routes
          break;
      }
    });
  }
}
