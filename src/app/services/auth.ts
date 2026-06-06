import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private users: { name: string; email: string; password: string }[] = [
    { name: 'Alice', email: 'alice@taskflow.com', password: '1234' },
    { name: 'Bob',   email: 'bob@taskflow.com',   password: '1234' }
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): boolean {
    const found = this.users.find(u => u.email === email && u.password === password);
    if (found) {
      this.currentUserSubject.next({ name: found.name, email: found.email });
      return true;
    }
    return false;
  }

  signup(name: string, email: string, password: string): boolean {
    const exists = this.users.find(u => u.email === email);
    if (exists) return false;
    this.users.push({ name, email, password });
    this.currentUserSubject.next({ name, email });
    return true;
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.getValue() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }
}