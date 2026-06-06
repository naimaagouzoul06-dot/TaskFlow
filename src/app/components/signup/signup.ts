import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  form: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatch });
  }

  passwordMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { name, email, password } = this.form.value;
    const ok = this.auth.signup(name, email, password);
    if (ok) {
      this.router.navigate(['/projects']);
    } else {
      this.errorMsg = 'Cet email est déjà utilisé.';
    }
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }

  get passwordMismatch(): boolean {
    return !!(this.form.hasError('mismatch') && this.form.get('confirmPassword')?.touched);
  }
}