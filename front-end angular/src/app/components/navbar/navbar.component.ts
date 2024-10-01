import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authetication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TabMenuModule, BadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  activeItem: MenuItem | undefined;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
    // { label: 'Gifts', routerLink: '/gifts' },
    { label: 'Themes', routerLink: '/themes' },
    { label: 'My Orders', routerLink: '/orders' },
    { label: 'Logout', command: () => this.logout() }
  ];
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.activeItem = this.items[0];
  }
  logout() {
    sessionStorage.removeItem('auth');
    this.authService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
