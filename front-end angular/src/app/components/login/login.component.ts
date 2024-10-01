import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { AuthenticationService } from '../../services/authentication/authetication.service';
import { HttpClientXsrfModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    MessagesModule,
    TooltipModule,
    HttpClientXsrfModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show: boolean = false;
  apiError: string | null = null;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: LoginService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((response: any) => {
      if (response.success) {
        sessionStorage.setItem('auth', response.token);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/home']);
      }
    });
  }
}
