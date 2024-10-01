import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SignUp, { checkEmptyErrorProperties } from './SignUp';
import { MemoryRouter as Router, useNavigate } from 'react-router-dom';
import React from "react";
import SignUpService from "../../services/SignUpService";
import signUpValidator from "../../common/validators/SignUpValidator";

jest.mock('../../services/SignUpService');
jest.mock('../../common/validators/SignUpValidator');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('SignUp', () => {
    const mockData = {
        userRole: 'USER',
        email: 'test@gmail.com',
        userName: 'testuser123',
        mobileNumber: '7394827293',
        password: '!Test123',
        confirmPassword: '!Test123',
    };

    const validationErrors = {};

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(() => { });
        (SignUpService as jest.Mock).mockResolvedValue({ data: {}, error: null });
        (signUpValidator as jest.Mock).mockReturnValue(validationErrors);
    });

    afterEach(() => {
        (useNavigate as jest.Mock).mockClear();
        (SignUpService as jest.Mock).mockClear();
        (signUpValidator as jest.Mock).mockClear();
    });

    it('matches entered form data with mock data, and checks navigation on submit', async () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );

        fireEvent.change(screen.getByTestId('userRole'), { target: { value: mockData.userRole } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: mockData.email } });
        fireEvent.change(screen.getByTestId('userName'), { target: { value: mockData.userName } });
        fireEvent.change(screen.getByTestId('mobileNumber'), { target: { value: mockData.mobileNumber } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: mockData.password } });
        fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: mockData.confirmPassword } });

        expect((screen.getByTestId('userRole') as HTMLSelectElement).value).toBe(mockData.userRole);
        expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(mockData.email);
        expect((screen.getByTestId('userName') as HTMLInputElement).value).toBe(mockData.userName);
        expect((screen.getByTestId('mobileNumber') as HTMLInputElement).value).toBe(mockData.mobileNumber);
        expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(mockData.password);
        expect((screen.getByTestId('confirmPassword') as HTMLInputElement).value).toBe(mockData.confirmPassword);

        fireEvent.click(screen.getByTestId('register-button'));

        await waitFor(() => {
            expect(useNavigate).toHaveBeenCalled();
        });

    });
});

describe('checkEmptyErrorProperties', () => {

    it('should return true when all property values of the input object are empty strings', () => {
        const input = { propName1: '', propName2: '', propName3: '' };
        expect(checkEmptyErrorProperties(input)).toBe(true);
    });

    it('should return false when any property value of the input object is a non-empty string', () => {
        const input = { propName1: '', propName2: 'non-empty-string', propName3: '' };
        expect(checkEmptyErrorProperties(input)).toBe(false);
    });
});