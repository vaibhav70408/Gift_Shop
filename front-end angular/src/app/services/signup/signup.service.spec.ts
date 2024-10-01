import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './signup.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should send a POST request to signupUrl with provided user data', () => {
    const userData = {
      email: 'test@example.com',
      userName: 'testuser',
      mobileNumber: '1234567890',
      password: 'Test@123',
      userRole: 'user'
    };
    userService.signup(userData).subscribe();

    const req = httpTestingController.expectOne('http://localhost:4000/user/signup');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(userData);
    req.flush({});
  });

  it('should return the response from the server', () => {
    const userData = {
      email: 'test@example.com',
      userName: 'testuser',
      mobileNumber: '1234567890',
      password: 'Test@123',
      userRole: 'user'
    };
    const mockResponse = { success: true };

    userService.signup(userData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/user/signup');
    req.flush(mockResponse);
  });
});
