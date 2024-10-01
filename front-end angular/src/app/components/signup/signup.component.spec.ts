import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SignupComponent } from './signup.component';
import { UserService } from '../../services/signup/signup.service';
import { CustomValidators } from '../../common/types/validators/signupValidator';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['signup']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    formBuilder = TestBed.inject(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with form controls', () => {
    expect(component.registerForm.controls['email']).toBeDefined();
    expect(component.registerForm.controls['userName']).toBeDefined();
    expect(component.registerForm.controls['mobileNumber']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
    expect(component.registerForm.controls['userRole']).toBeDefined();
  });

  it('should mark form as invalid if fields are empty', () => {
    component.registerForm.reset();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should mark form as invalid if fields are not valid', () => {
    component.registerForm.setValue({
      email: 'invalidemail',
      userName: 'user@name',
      mobileNumber: '123456',
      password: '123',
      userRole: 'user'
    });
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should call userService.signup() on form submission', () => {
    const formData = {
      email: 'test@example.com',
      userName: 'testuser',
      mobileNumber: '1234567890',
      password: 'Test@123',
      userRole: 'user'
    };
    component.registerForm.setValue(formData);
    userServiceSpy.signup.and.returnValue(of({ success: true }));
    component.onSubmit();
    expect(userServiceSpy.signup).toHaveBeenCalledWith(formData);
    expect(component.registrationSuccess).toBeTruthy();
  });

  it('should navigate to login page when navigateToLogin() is called', () => {
    component.navigateToLogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
