import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemesComponent } from './components/themes/themes.component';
import { HomeComponent } from './components/home/home.component';

import { AuthenticationService } from './services/authentication/authetication.service';
import { OrdersComponent } from './components/orders/orders.component';

import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HttpClientModule,
    LoginComponent,
    CommonModule,
    RouterOutlet,
    SignupComponent,
    ButtonModule,
    OrdersComponent,
    TableModule,
    ToolbarModule,
    ThemesComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = 'Customer-app';
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
