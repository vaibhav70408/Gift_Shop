import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OrderformService } from '../../services/orderform/orderform.service';
import OrderPlacedResponse from '../../common/types/orderPlacedResponse';
import { Router } from '@angular/router';
import ThemesData from '../../common/types/themesData';
import OrderData from '../../common/types/orderData';
import { ThemesService } from '../../services/themes/themes.service';
import { HomeService } from '../../services/home/home.service';
import { Gift } from '../../common/types/gifts';

@Component({
  selector: 'app-orderform',
  standalone: true,
  imports: [
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './orderform.component.html',
  styleUrl: './orderform.component.scss'
})
export class OrderformComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private orderformService: OrderformService,
    private router: Router,
    private themesService: ThemesService,
    private homeService: HomeService
  ) { }

  selectedGiftName = 'Wooden Frame';
  selectedGiftPrice = 200;
  loggedInUser = 'user';
  themeModel: ThemesData[] = [];
  giftModel: Gift = {
    giftId: '',
    giftName: '',
    giftImageUrl: '',
    giftDetails: '',
    giftPrice: 0
  };
  orderPrice = 0;

  orderDetailsForm = this.fb.group({
    orderName: ['', [Validators.required, Validators.maxLength(50)]],
    orderDescription: [`This order is placed at ${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`, [Validators.required, Validators.maxLength(255)]],
    themeModel: [this.themeModel],
    giftModel: [this.giftModel],
    orderDate: [new Date(), Validators.required],
    orderPrice: [this.orderPrice, Validators.required],
    orderAddress: ['', [Validators.required, Validators.maxLength(255)]],
    orderPhone: ['', [Validators.required, Validators.max(9999999999), Validators.min(1000000000)]],
    orderEmail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    orderStatus: ['confirmed'],
    orderUpdatedBy: [this.loggedInUser]
  });

  onPlaceOrder() {
    this.orderformService.addOrder(this.orderDetailsForm.value as OrderData).subscribe((response: OrderPlacedResponse) => {
      if (response.error) {
        console.log(`Error placing order: ${response.error}`);
        return;
      }
      this.router.navigate(['/orderconfirmed']);
    });
  }

  setOrderDetailsOnInit() {
    this.themeModel = this.themesService.selectedThemesData;
    this.themeModel.forEach((item: ThemesData) => this.orderPrice += Number(item.themePrice));
    
    if(this.homeService.giftModel?.giftName) this.giftModel = this.homeService.giftModel;
    this.orderPrice += Number(this.giftModel?.giftPrice ?? 0);

    this.orderDetailsForm.patchValue({
      themeModel: this.themeModel,
      orderPrice: this.orderPrice,
      giftModel: this.giftModel
    });
  }

  ngOnInit(): void {
    this.setOrderDetailsOnInit();
  }
}
