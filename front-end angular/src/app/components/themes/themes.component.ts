import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../services/themes/themes.service';
import ThemesData from '../../common/types/themesData';
import { CardModule } from 'primeng/card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CardModule, CheckboxModule, CommonModule, ButtonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnInit {

  themesInfo: ThemesData | undefined
  finaldata: ThemesData[] = []
  constructor(private themesService: ThemesService, private router: Router) {
  }

  ngOnInit(): void {
    this.themesService.getThemesData().subscribe((data: ThemesData[]) => {
      this.finaldata = data;
    })
  }

  onCheckboxChange(event: CheckboxChangeEvent, item: ThemesData) {
    if (event.checked) {
      this.themesService.selectedThemesData.push(item)
    } else {
      const index = this.themesService.selectedThemesData.indexOf(item);
      if (index > -1) {
        this.themesService.selectedThemesData.splice(index, 1);
      }
    }
  }

  redirectToMyOrders() {
    this.router.navigate(['/placeorder']);

  }

  redirectToGifts() {
    this.router.navigate(['/home'])
  }
}
