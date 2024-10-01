import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GiftsComponent } from './components/gifts/gifts.component';
//import { OrdersComponent } from './components/orders/orders.component';
import { ThemesComponent } from './components/themes/themes.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {OrdersComponent } from './components/orders/orders.component'

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: 'themes', component: ThemesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'signup', component: SignupComponent},
  {
    path: 'placeorder',
    loadComponent: () =>
      import('./components/placeorder/placeorder.component').then(
        (c) => c.PlaceorderComponent
      )
  },
  {
    path: 'orderconfirmed',
    loadComponent: () =>
      import(
        './components/placeorder/orderconfirmation/orderconfirmation.component'
      ).then((c) => c.OrderconfirmationComponent)
  }
];
