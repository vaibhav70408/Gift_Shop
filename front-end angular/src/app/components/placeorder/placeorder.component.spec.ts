import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceorderComponent } from './placeorder.component';
import { RouterTestingModule } from '@angular/router/testing';
 
describe('PlaceorderComponent', () => {
  let component: PlaceorderComponent;
  let fixture: ComponentFixture<PlaceorderComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceorderComponent ],
      imports: [ RouterTestingModule.withRoutes([]) ] // This is for mocking Router
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should redirect to /themes when redirectToThemes() is called', () => {
    const routerSpy = spyOn(component.router, 'navigate').and.stub();
    component.redirectToThemes();
    expect(routerSpy).toHaveBeenCalledWith(['/themes']);
  });
});
