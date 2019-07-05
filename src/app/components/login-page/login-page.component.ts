import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  authError: string;
  toggleFdbckTimerId: number;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // TODO: PUT INITIALIZATION LOGIC HERE
  }

  submitLoginForm(): void {
    this.authService.login(this.loginForm.value).subscribe((response) => {
      this.authError = '';
    }, ({ error }) => {
      this.authError = error.error;
      this.toggleFeedbackMessage();
    });
  }

  toggleFeedbackMessage() {
    this.toggleFdbckTimerId = window.setTimeout(() => {
      this.authError = '';
    }, 3000);
  }

  ngOnDestroy() {
    window.clearInterval(this.toggleFdbckTimerId);
  }
}
