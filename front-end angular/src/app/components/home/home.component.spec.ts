import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HomeService } from '../../services/home/home.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Gift } from '../../common/types/gifts';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHomeService: jasmine.SpyObj<HomeService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Creating mock objects for HomeService and Router
    mockHomeService = jasmine.createSpyObj('HomeService', ['getGifts']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        CommonModule,
        TabMenuModule,
        BadgeModule,
        CardModule,
        ButtonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HomeService, useValue: mockHomeService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load gifts on initialization', () => {
    const mockGifts: Gift[] = [
      {
        giftId: '1',
        giftName: 'Gift 1',
        giftImageUrl: 'url1',
        giftDetails: 'Details 1',
        giftPrice: 10
      },
      {
        giftId: '2',
        giftName: 'Gift 2',
        giftImageUrl: 'url2',
        giftDetails: 'Details 2',
        giftPrice: 20
      }
    ];
    mockHomeService.getGifts.and.returnValue(of(mockGifts));

    component.ngOnInit();
    expect(component.gifts).toEqual(mockGifts);
  });

  it('should set gift model and navigate to themes page on buyGift', () => {
    const mockGift: Gift = {
      giftId: '1',
      giftName: 'Gift 1',
      giftImageUrl: 'url1',
      giftDetails: 'Details 1',
      giftPrice: 10
    };

    component.buyGift(mockGift);
    expect(mockHomeService.giftModel).toEqual(mockGift);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/themes']);
  });

  it('should navigate to gifts page on redirectToGifts', () => {
    component.redirectToGifts();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/gifts']);
  });
});
