import signUpValidator from './SignUpValidator';

describe('signUpValidator tests', () => {
    it('requires userRole', () => {
        const values = {
            userRole: '',
            email: '',
            userName: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
        };

        const errors = signUpValidator(values);

        expect(errors.userRole).toBe("Admin / User needs to be selected");
    });

    it('requires userName and checks other errors when userName is provided', () => {
        let values = {
            userRole: 'USER',
            userName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
        };

        let errors = signUpValidator(values);

        expect(errors.userName).toBe("Username is required");

        values = { ...values, userName: '12345' };
        errors = signUpValidator(values);

        expect(errors.userName).toBe("Username must contain at least one digit and one letter.");

        values = { ...values, userName: 'Aaaaa' };
        errors = signUpValidator(values);

        expect(errors.userName).toBe("Username must contain at least one digit and one letter.");

        values = { ...values, userName: 'A12345' };
        errors = signUpValidator(values);

        expect(errors.userName).toBe('');
    });

    it('requires valid email', () => {
        let values = {
            userRole: 'USER',
            userName: 'A12345',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
        };

        let errors = signUpValidator(values);

        expect(errors.email).toBe("Email is required");

        values = { ...values, email: 'invalidemail' };
        errors = signUpValidator(values);

        expect(errors.email).toBe("Enter a valid email address");

        values = { ...values, email: 'test@test.com' };
        errors = signUpValidator(values);

        expect(errors.email).toBe('');
    });

    it('validates password correctly', () => {
        let values = {
            userRole: 'USER',
            userName: 'TestUser123',
            email: 'test@test.com',
            password: '',
            confirmPassword: '',
            mobileNumber: '9876543210',
        };

        let errors = signUpValidator(values);
        expect(errors.password).toBe("Password is required");

        values = { ...values, password: 'short' };
        errors = signUpValidator(values);
        expect(errors.password).toBe("Password must be at least 8 characters long.");

        values = { ...values, password: 'Onlylowercase' };
        errors = signUpValidator(values);
        expect(errors.password).toBe("Password needs mixed-case letters, digits, and special characters.");

        values = { ...values, password: 'Correct1$' };
        errors = signUpValidator(values);
        expect(errors.password).toBe("");
    });

    it('checks confirmPassword correctly', () => {
        let values = {
            userRole: 'USER',
            userName: 'TestUser123',
            email: 'test@test.com',
            password: 'Correct1$',
            confirmPassword: 'wrong1$',
            mobileNumber: "9876543210",
        };

        let errors = signUpValidator(values);
        expect(errors.confirmPassword).toBe("Password and Confirm Password must be same");

        values = { ...values, confirmPassword: 'Correct1$' };
        errors = signUpValidator(values);
        expect(errors.confirmPassword).toBe("");
    });

    it('validates mobileNumber correctly', () => {
        let values = {
            userRole: 'USER',
            userName: 'TestUser123',
            email: 'test@test.com',
            password: 'Correct1$',
            confirmPassword: 'Correct1$',
            mobileNumber: '',
        };

        let errors = signUpValidator(values);
        expect(errors.mobileNumber).toBe("Mobile Number is required");

        values = { ...values, mobileNumber: "123" };
        errors = signUpValidator(values);
        expect(errors.mobileNumber).toBe("Mobile Number is required");
    });

});