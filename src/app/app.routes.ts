import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup').then(m => m.SignupComponent)
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/projects/projects').then(m => m.ProjectsComponent)
  },
  {
    path: 'projects/:id/kanban',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/kanban/kanban').then(m => m.KanbanComponent)
  },
  { path: '**', redirectTo: 'login' }
];