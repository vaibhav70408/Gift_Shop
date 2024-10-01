import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ThemesComponent } from './themes.component';
import { ThemesService } from '../../services/themes/themes.service';
import { Router } from '@angular/router';
import ThemesData from '../../common/types/themesData';

describe('ThemesComponent', () => {
  let component: ThemesComponent;
  let mockThemesService: jasmine.SpyObj<ThemesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockThemesService = jasmine.createSpyObj('ThemesService', [
      'getThemesData'
    ]);
    mockThemesService.getThemesData.and.returnValue(of([]));

    component = new ThemesComponent(mockThemesService, mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data correctly from the service on ngOnInit', () => {
    component.ngOnInit();
    expect(component.finaldata).toEqual([]);
  });

  it('should add a selected theme to the selectedThemesData if checkbox is checked', () => {
    const theme: ThemesData = {
      themeId: ' 1',
      themeName: 'Test Theme',
      themeDetails: 'Test Details',
      themePrice: 100,
      createdAt: '2024-04-03T09:39:05.876Z',
      updatedAt: '2024-04-03T09:39:05.876Z'
    };
    mockThemesService.selectedThemesData = [];
    const event = { checked: true };
    component.onCheckboxChange(event, theme);
    expect(mockThemesService.selectedThemesData).toContain(theme);
  });

  it('should remove a selected theme from the selectedThemesData if checkbox is unchecked', () => {
    const theme: ThemesData = {
      themeId: ' 1',
      themeName: 'Test Theme',
      themeDetails: 'Test Details',
      themePrice: 100,
      createdAt: '2024-04-03T09:39:05.876Z',
      updatedAt: '2024-04-03T09:39:05.876Z'
    };
    mockThemesService.selectedThemesData = [theme];
    const event = { checked: false };
    component.onCheckboxChange(event, theme);
    expect(mockThemesService.selectedThemesData).not.toContain(theme);
  });

  it('should navigate to /orders when redirectToMyOrders is called', fakeAsync(() => {
    component.redirectToMyOrders();
    tick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/orders']);
  }));

  it('should navigate to /gifts when redirectToGifts is called', fakeAsync(() => {
    component.redirectToGifts();
    tick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/gifts']);
  }));
});
