import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isOnKanban = false;
  @Output() toggleDashboard = new EventEmitter<void>();

  constructor(public auth: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.isOnKanban = e.urlAfterRedirects.includes('/kanban');
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goToProjects() {
    this.router.navigate(['/projects']);
  }

  onToggleDashboard() {
    this.toggleDashboard.emit();
  }
}