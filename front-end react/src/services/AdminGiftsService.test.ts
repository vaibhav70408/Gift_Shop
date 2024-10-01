import axios from 'axios';
import {
    getAllGifts,
    addGift,
    editGiftById,
    deleteGiftById
} from "../services/AdminGiftsService";
import AddEditGift from '../common/types/addEditGift';

jest.mock('axios');

describe('Gift Functions', () => {
    describe('getAllGifts', () => {
        it('should handle errors properly', async () => {
            (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

            await expect(getAllGifts()).rejects.toThrow('Network Error');
        });
    });

    describe('addGift', () => {
        it('should handle errors properly', async () => {
            (axios.post as jest.Mock).mockRejectedValue(new Error('Validation Error'));

            await expect(addGift({} as AddEditGift)).rejects.toThrow('Validation Error');
        });
    });

    describe('editGiftById', () => {
        it('should handle errors properly', async () => {
            (axios.put as jest.Mock).mockRejectedValue(new Error('Server Error'));

            await expect(editGiftById('1', {} as AddEditGift)).rejects.toThrow('Server Error');
        });
    });

    describe('deleteGiftById', () => {
        it('should handle errors properly', async () => {
            (axios.delete as jest.Mock).mockRejectedValue(new Error('Server Error'));

            await expect(deleteGiftById('1')).rejects.toThrow('Server Error');
        });
    });
});