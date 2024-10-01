import { findAllGifts, createGift, findGiftById, editGiftById, deleteGiftById } from '../src/controller/adminGiftsController';
import { getAllGifts, addGift, getGiftById, updateGiftById, destroyGiftById } from '../src/services/adminGiftsService';
import  { Request, Response } from 'express';
import { gift } from '../src/types/gifts';

jest.mock('../src/services/adminGiftsService');

const mockGifts: gift = {
  giftId: "1",
  giftName: 'candel',
  giftImageUrl: 'candel.jpg',
  giftDetails: 'light source',
  giftPrice: 20,
};

describe('Gift Controller', () => {
  const mockRequest: Request = {
    params: {},
    body: {},
  } as Request;
  const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
    end: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Find All Gifts', () => {
    it('Return all gifts', () => {
      (getAllGifts as jest.Mock).mockResolvedValueOnce(mockGifts);
      return new Promise<void>((resolve, reject) => {
        findAllGifts(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(getAllGifts).toHaveBeenCalledTimes(1);
          expect(mockResponse.send).toHaveBeenCalledWith(mockGifts);
          resolve();
        });
      });
    });

    it('Handle error when retrieving gifts', () => {
      const error = new Error('Failed to fetch gifts');
      (getAllGifts as jest.Mock).mockRejectedValueOnce(error);
      return new Promise<void>((resolve, reject) => {
        findAllGifts(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(getAllGifts).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({ Error: error });
          resolve();
        });
      });
    });
  });

  describe('Create Gifts', () => {
    it('Create a new gift', () => {
      (addGift as jest.Mock).mockResolvedValueOnce(mockGifts);
      return new Promise<void>((resolve, reject) => {
        createGift(mockRequest as Request, mockResponse as Response);
        process.nextTick(() => {
          expect(addGift).toHaveBeenCalledWith(mockRequest.body);
          expect(mockResponse.json).toHaveBeenCalledWith({ success: 'Data Added successfully !' });
          resolve();
        });
      });
    });
  });

  describe('Find Gift by ID', () => {
    it('Find gift by its ID', () => {
      const mockGiftId = "1";
      const mockGift = {
        giftId: mockGiftId,
        giftName: 'candel',
        giftImageUrl: 'candel.jpg',
        giftDetails: 'light source',
        giftPrice: 20,
      };
      (getGiftById as jest.Mock).mockResolvedValueOnce(mockGift);
      return new Promise<void>((resolve, reject) => {
        findGiftById({ ...mockRequest, params: { id: mockGiftId.toString() } } as any, mockResponse as any);
        process.nextTick(() => {
          expect(getGiftById).toHaveBeenCalledWith(mockGiftId);
          expect(mockResponse.send).toHaveBeenCalledWith(mockGift);
          resolve();
        });
      });
    });
  });

  describe('Updating The Gift Details', () => {
    it('Edit an existing gift', () => {
      const mockGiftId = "1";
      const mockGiftData = {
        giftName: 'candel',
        giftImageUrl: 'candel.jpg',
        giftDetails: 'light source',
        giftPrice: 20,
      };
      (updateGiftById as jest.Mock).mockResolvedValueOnce(mockGiftData);
      return new Promise<void>((resolve, reject) => {
        editGiftById(
          { ...mockRequest, params: { id: mockGiftId.toString() }, body: mockGiftData } as any,
          mockResponse as any,
        );
        process.nextTick(() => {
          expect(updateGiftById).toHaveBeenCalledWith(mockGiftId, mockGiftData);
          expect(mockResponse.json).toHaveBeenCalledWith({ success: 'Data Updated successfully !' });
          resolve();
        });
      });
    });
  });

  describe('Deleting a Gift', () => {
    it('Delete an existing gift', () => {
      const mockGiftId = "1";
      (destroyGiftById as jest.Mock).mockResolvedValueOnce(mockGiftId);
      return new Promise<void>((resolve, reject) => {
        deleteGiftById({ ...mockRequest, params: { id: mockGiftId.toString() } } as any, mockResponse as any);
        process.nextTick(() => {
          expect(destroyGiftById).toHaveBeenCalledWith(mockGiftId);
          expect(mockResponse.json).toHaveBeenCalledWith({ success: 'Data Deleted successfully !' });
          resolve();
        });
      });
    });
  });
});
