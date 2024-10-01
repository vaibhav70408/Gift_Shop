import { Component, OnInit, inject } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home/home.service';
import { BadgeModule } from 'primeng/badge';
import { Gift } from '../../common/types/gifts';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TabMenuModule, BadgeModule, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  gifts: Gift[] = [];

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadGifts();
  }

  loadGifts() {
    this.homeService.getGifts().subscribe((gifts: Gift[]) => {
      this.gifts = gifts;
    });
  }
  buyGift(gift: Gift) {
    this.homeService.giftModel = gift;
    this.router.navigate(['/themes']);
  }
  redirectToGifts() {
    this.router.navigate(['/gifts']);
  }
}
