import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login/login.service';
import { AuthenticationService } from '../../services/authentication/authetication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let authService: AuthenticationService;
  let router: Router | null = null; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [LoginService, AuthenticationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.login method when onSubmit is called', () => {
    const loginSpy = spyOn(loginService, 'login').and.callThrough();
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
  });

  it('should set auth token in sessionStorage and navigate to /home if login is successful', () => {
    if (router) { 
      const successResponse = { success: true, token: 'testToken' };
      spyOn(loginService, 'login').and.returnValue({
        subscribe: (callback: (value: any) => void) => {
          callback(successResponse);
          return { unsubscribe: () => {} };
        }
      });
      const setItemSpy = spyOn(sessionStorage, 'setItem');
      const setLoggedInSpy = spyOn(authService, 'setLoggedIn');
      const navigateSpy = spyOn(router, 'navigate'); 
  
      component.onSubmit();
    
      expect(setItemSpy).toHaveBeenCalledWith('auth', 'testToken');
      expect(setLoggedInSpy).toHaveBeenCalledWith(true);
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    } else {
      fail('Router is null'); 
    }
  });
});
