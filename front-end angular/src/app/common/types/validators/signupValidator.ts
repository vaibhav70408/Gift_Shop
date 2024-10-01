import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {

    static emailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const email = control.value;
          if (!email) {
            return { 'emailRequired': 'Email is required' }; 
          } else if (!Validators.email(control)) {
            return { 'emailFormat': 'Invalid email format' }; 
          } else if (!email.includes('@')) {
            return { 'emailAtSymbolMissing': 'Email must contain @ symbol' }; 
          }
          return null;
        };
      }

      static userNameValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const userName = control.value;
          const errors: { [key: string]: any } = {};
      
          if (!userName) {
            errors['userNameRequired'] = "Username is required";
          } else if (userName.length < 5 || userName.length > 20) {
            errors['userNameLength'] = "Username must be between 5 and 20 characters long.";
          } else if (!/\d/.test(userName) || !/[a-zA-Z]/.test(userName)) {
            errors['userNameFormat'] = "Username must contain at least one digit and one letter.";
          }
      
          return Object.keys(errors).length !== 0 ? errors : null;
        };
      }

      static mobileNumberValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const mobileNumber = control.value;
          const errors: { [key: string]: any } = {};
      
          if (!mobileNumber || isNaN(Number(mobileNumber))) {
            errors['mobileNumberRequired'] = "Mobile Number is required";
          } else if (mobileNumber.length !== 10) {
            errors['mobileNumberFormat'] = "Mobile Number must be 10 digits long.";
          }
      
          return Object.keys(errors).length !== 0 ? errors : null;
        };
      }
      

  static passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const errors: { [key: string]: any } = {};

    if (!password || password.trim() === "") {
      errors['passwordRequired'] = "Password is required";
    } else if (password.length < 8) {
      errors['passwordLength'] = "Password must be at least 8 characters long.";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      errors['passwordFormat'] = "Password needs mixed-case letters, digits, and special characters.";
    }

    return Object.keys(errors).length !== 0 ? errors : null;
  };
}

static confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const confirmPassword = control.value;
      const password = passwordControl.value;
      const errors: { [key: string]: any } = {};
  
      if (confirmPassword !== password) {
        errors['passwordMismatch'] = "Password and Confirm Password must be the same";
      }
  
      return Object.keys(errors).length !== 0 ? errors : null;
    };
  }
  
}