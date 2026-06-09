import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  showNavbar = false;
  showDashboard = false;

  constructor(private router: Router, public auth: AuthService) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const hiddenRoutes = ['/login', '/signup'];
      this.showNavbar = !hiddenRoutes.includes(e.urlAfterRedirects);
      this.showDashboard = false; // reset à chaque changement de page
    });
  }

  onToggleDashboard() {
    this.showDashboard = !this.showDashboard;
  }
}