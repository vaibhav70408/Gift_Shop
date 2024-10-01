import { Component } from '@angular/core';
import { UserService } from '../../services/signup/signup.service';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../common/types/validators/signupValidator';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, InputTextModule, CommonModule,ButtonModule,MessagesModule,TooltipModule, RouterModule],
})
export class SignupComponent {
  registerForm: FormGroup;
  apiError: string | null = null;
  registrationSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, CustomValidators.userNameValidator()]],
      mobileNumber: ['', [Validators.required, CustomValidators.mobileNumberValidator()]],
      password: ['', [Validators.required, CustomValidators.passwordValidator()]],
      userRole: ['user']
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.userService.signup(this.registerForm.value).subscribe((response: any) => {
      if (response.success) {
        console.log("success");
        this.registrationSuccess = true; 
      } else {
        console.error('Error during login', response.error);
      } 
    });
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}


