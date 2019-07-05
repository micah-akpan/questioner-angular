import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  authError: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // TODO: PUT INITIALIZATION LOGIC HERE
  }

  submitLoginForm(): void {
    // TODO: PUT LOGIN FORM SUBMIT LOGIC HERE
    this.authService.login(this.loginForm.value).subscribe((response) => {
      const { error, ok } = response;
      if (!ok) {
        this.authError = error.error;
      } else {
        this.authError = '';
        console.log('You are logged in....');
      }
    });
  }
}
