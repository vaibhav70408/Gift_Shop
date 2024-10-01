import { Component } from '@angular/core';
import { OrderformComponent } from '../orderform/orderform.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-placeorder',
  standalone: true,
  imports: [OrderformComponent, ButtonModule],
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.scss'
})
export class PlaceorderComponent {

  constructor(public router: Router) { }

  redirectToThemes() {
    this.router.navigate(['/themes']);
  }
}
