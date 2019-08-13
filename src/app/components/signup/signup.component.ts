import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import CustomValidators from '../../shared/validators/customValidators';
import { AuthService } from 'src/app/shared/services/auth-service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/services/token-storage-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../../assets/scss/_social_media.scss']
})
export class SignupComponent implements OnInit {
  signUpForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z]).{8,}/)]],
    confirmPassword: ['']
  });

  toggleButtonText = 'Hide';
  authError: string;
  toggleFdbckTimerId: number;
  passwordValidationMsg: string;
  passwordPatternFailMsg: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    // To ensure users don't enter passwords
    // that don't match
    const validatorFns = [Validators.required, CustomValidators.validateCustomPassword(this.signUpForm.get('password').value)];
    this.signUpForm.setValidators(validatorFns);

    if (this.tokenStorage.token) {
      this.router.navigate(['/meetups']);
    }
  }

  onTogglePassword(event: boolean) {
    this.toggleButtonText = event ? 'Show' : 'Hide';
  }

  setFormControlType(): string {
    return this.toggleButtonText === 'Show' ? 'password' : 'text';
  }

  submitSignUpForm() {
    this.authService.signUpUser(this.signUpForm.value).subscribe(({ data }) => {
      this.authError = '';
      this.router.navigate(['/meetups']);
      this.tokenStorage.saveToken(data[0].token);
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

  passwordsMatch(): boolean {
    return this.password === this.passwordConfirm;
  }

  get password(): string {
    return this.signUpForm.get('password').value;
  }

  get passwordConfirm(): string {
    return this.signUpForm.get('confirmPassword').value;
  }

  onConfirmPwdChange() {
    if (!this.passwordsMatch()) {
      this.passwordValidationMsg = 'Passwords do not match';
    } else {
      this.passwordValidationMsg = '';
    }
  }
}
