import { getAllGifts, addGift, getGiftById, updateGiftById, destroyGiftById } from '../src/services/adminGiftsService';
import { gifts } from '../src/model/gifts';
import { gift } from '../src/types/gifts';

jest.mock('../src/model/gifts');

const mockGift = {
  giftId: "1",
  giftName: 'candel',
  giftImageUrl: 'candel.jpg',
  giftDetails: 'light source',
  giftPrice: 20,
};

describe('Gift Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Get all gifts', () => {
    it('Return all gifts', () => {
      const MockGiftdata: gift = { ...mockGift };
      (gifts.findAll as jest.Mock).mockResolvedValue(MockGiftdata);

      return getAllGifts().then(result => {
        expect(result).toEqual(MockGiftdata);
      });
    });
  });

  describe('Adding the Gift', () => {
    it('Add a gift', () => {
      (gifts.create as jest.Mock).mockResolvedValue(mockGift);
      return addGift(mockGift).then(result => {
        expect(gifts.create).toHaveBeenCalledWith(mockGift);
        expect(result).toEqual(mockGift);
      });
    });
  });

  describe('Get gifts by ID', () => {
    it('Get a gift by id', () => {
      const giftId = "1";
      (gifts.findByPk as jest.Mock).mockResolvedValue(mockGift);
      return getGiftById(giftId).then(result => {
        expect(result).toEqual(mockGift);
        expect(gifts.findByPk).toHaveBeenCalledWith(giftId);
      });
    });
  });

  describe('Updating the Gifts', () => {
    it('Update a gift by id', () => {
      const giftId = "1";
      (gifts.update as jest.Mock).mockResolvedValue([1]);
      return updateGiftById(giftId, mockGift).then(() => {
        expect(gifts.update).toHaveBeenCalledWith(mockGift, { where: { giftId } });
      });
    });
  });

  describe('Deleting the Gifts', () => {
    it('Delete a gift by id', () => {
      const giftId = "1";
      (gifts.findByPk as jest.Mock).mockResolvedValue(mockGift);
      const destroyMock = jest.fn().mockResolvedValue(mockGift);
      const mockInstance = { destroy: destroyMock };
      jest.spyOn(gifts, 'findByPk').mockResolvedValue(mockInstance as any);
      return destroyGiftById(giftId).then(() => {
        expect(gifts.findByPk).toHaveBeenCalledWith(giftId);
        expect(destroyMock).toHaveBeenCalled();
      });
    });
  });
});
