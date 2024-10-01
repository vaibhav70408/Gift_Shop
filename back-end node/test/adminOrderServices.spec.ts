import OrderAttributes from '../src/model/orderModel';
import adminOrderService from '../src/services/adminOrderServices';
import Order from '../src/types/order';

jest.mock('../src/model/orderModel');

const mockOrderData: Order = {
  orderId: 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6',
  orderName: 'Test Order',
  orderDescription: 'Test Description',
  themeModel: { type: 'lighting ' },
  giftModel: { type: 'Photo frame', size: 'large' },
  orderDate: new Date(),
  orderPrice: 29.99,
  orderAddress: '123 Main Street',
  orderPhone: '123-456-7890',
  orderEmail: 'test@example.com',
};

describe('Admin Order Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOrders', () => {
    it('should get all orders successfully', () => {
      const mockOrders = [mockOrderData];
      (OrderAttributes.findAll as jest.Mock).mockResolvedValue(mockOrders);

      return expect(adminOrderService.getAllOrders).resolves.toEqual(mockOrders)
        .then(() => {
          expect(OrderAttributes.findAll).toHaveBeenCalled();
        });
    });

    it('should throw an error if getting orders fails', () => {
      const mockError = new Error('Getting orders failed');
      (OrderAttributes.findAll as jest.Mock).mockRejectedValue(mockError);

      return expect(adminOrderService.getAllOrders).rejects.toThrow(mockError)
        .then(() => {
          expect(OrderAttributes.findAll).toHaveBeenCalled();
        });
    });
  });
});

