import axios from 'axios';
import SignUpService from '../services/SignUpService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignUpService', () => {
    const userData = {
        userName: 'TestUser123',
        email: 'test@test.com',
        mobileNumber: '1234567890',
        password: 'TestPassword20$',
        userRole: 'USER'
    };

    it('returns data when SignUpService is called', async () => {
        const expectedData = { data: 'data' };
        mockedAxios.post.mockResolvedValue({ data: expectedData });

        const result = await SignUpService(userData);

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(result.data).toBe(expectedData);
    });

    it('returns error when SignUpService fails due to request error', async () => {
        const expectedError = 'Error!';
        mockedAxios.post.mockRejectedValue({ response: { data: { message: expectedError } } });

        const result = await SignUpService(userData);

        expect(mockedAxios.post).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ data: null, error: expectedError });
    });

    it('returns error when SignUpService fails due to server error', async () => {
        const expectedError = 'Server error!';
        mockedAxios.post.mockRejectedValue(new Error(expectedError));

        const result = await SignUpService(userData);

        expect(mockedAxios.post).toHaveBeenCalledTimes(3);
        expect(result).toEqual({ data: null, error: expectedError });
    });
});