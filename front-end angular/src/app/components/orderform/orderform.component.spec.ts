import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderformComponent } from './orderform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderformService } from '../../services/orderform/orderform.service';
import { Router } from '@angular/router';
import { ThemesService } from '../../services/themes/themes.service';
import { HomeService } from '../../services/home/home.service';
import { of } from 'rxjs';
import OrderPlacedResponse from '../../common/types/orderPlacedResponse';

 
describe('OrderformComponent', () => {
  let component: OrderformComponent;
  let fixture: ComponentFixture<OrderformComponent>;
  let orderformService: jasmine.SpyObj<OrderformService>;
  let router: Router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let themesService: jasmine.SpyObj<ThemesService>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let homeService: jasmine.SpyObj<HomeService>;
 
  beforeEach(async () => {
    const orderformServiceSpy = jasmine.createSpyObj('OrderformService', ['addOrder']);
    const themesServiceSpy = jasmine.createSpyObj('ThemesService', ['getSelectedThemesData']);
    const homeServiceSpy = jasmine.createSpyObj('HomeService', ['getGiftModel']);
 
    await TestBed.configureTestingModule({
      declarations: [ OrderformComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule.withRoutes([]) ],
      providers: [
        { provide: OrderformService, useValue: orderformServiceSpy },
        { provide: ThemesService, useValue: themesServiceSpy },
        { provide: HomeService, useValue: homeServiceSpy }
      ]
    })
    .compileComponents();
 
    orderformService = TestBed.inject(OrderformService) as jasmine.SpyObj<OrderformService>;
    themesService = TestBed.inject(ThemesService) as jasmine.SpyObj<ThemesService>;
    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
    router = TestBed.inject(Router);
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(OrderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call addOrder when onPlaceOrder is called', () => {
    const orderData = {}; // Mock order data
    const orderPlacedResponse: OrderPlacedResponse = { error: undefined }; 
 
    orderformService.addOrder.and.returnValue(of(orderPlacedResponse));
 
    component.onPlaceOrder();
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(orderformService.addOrder).toHaveBeenCalledWith(orderData as any);
    expect(router.navigate).toHaveBeenCalledWith(['/orderconfirmed']);
  });
});