import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z]).{8,}/)]]
  });

  authError: string;
  toggleFdbckTimerId: number;
  toggleButtonText = 'Hide';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // TODO: PUT INITIALIZATION LOGIC HERE
  }

  submitLoginForm(): void {
    this.authService.login(this.loginForm.value).subscribe((response) => {
      this.authError = '';
      this.router.navigate(['/meetups']);
    }, ({ error }) => {
      this.authError = error.error;
      this.toggleFeedbackMessage();
    });
  }

  toggleFeedbackMessage(time: number = 3000): void {
    this.toggleFdbckTimerId = window.setTimeout(() => {
      this.authError = '';
    }, time);
  }

  onTogglePassword(event: boolean) {
    this.toggleButtonText = event ? 'Show' : 'Hide';
  }

  setFormControlType(): string {
    return this.toggleButtonText === 'Show' ? 'password' : 'text';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy() {
    window.clearInterval(this.toggleFdbckTimerId);
  }
}
