import { Request, Response } from 'express';
import controller from '../src/controller/adminOrderController';
import OrderService from '../src/services/adminOrderServices';
import commonOrderService from '../src/services/commonOrderService';

jest.mock('../src/services/adminOrderServices');

describe('Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('editOrder', () => {
    it('should edit an order', () => {
      const mockOrderId = 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6';
      const mockUpdatedData = {
        orderName: 'Updated Test Order',
        orderDescription: 'Updated Test Description',
        themeModel: { type: 'Wooden' },
        giftModel: { type: 'Photo frame', size: 'large' },
        orderDate: new Date(),
        orderPrice: 20.0,
        orderAddress: '456 Elm Street',
        orderPhone: '987-654-3210',
        orderEmail: 'updated@example.com',
      };

      (commonOrderService.editOrderById as jest.Mock).mockResolvedValue(mockUpdatedData);

      req.params = { orderId: mockOrderId };
      req.body = mockUpdatedData;

      return controller.editOrder(req as Request, res as Response)
        .then(() => {
          expect(commonOrderService.editOrderById).toHaveBeenCalledWith(mockOrderId, mockUpdatedData);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({ message: 'Order Updated successfully' });
        });
    });

    it('should handle error when editing order', () => {
      const mockOrderId = 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6';
      const mockError = new Error('Internal server error');

      (commonOrderService.editOrderById as jest.Mock).mockRejectedValue(mockError);

      req.params = { orderId: mockOrderId };

      return controller.editOrder(req as Request, res as Response)
        .then(() => {
          expect(commonOrderService.editOrderById).toHaveBeenCalledWith(mockOrderId, undefined);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order', () => {
      const mockOrderId = 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6';

      (commonOrderService.editOrderById as jest.Mock).mockResolvedValue(undefined);

      req.params = { orderId: mockOrderId };

      return controller.deleteOrder(req as Request, res as Response)
        .then(() => {
          expect(commonOrderService.deleteOrderById).toHaveBeenCalledWith(mockOrderId);
          expect(res.status).toHaveBeenCalledWith(204);
          expect(res.send).toHaveBeenCalledWith({ message: 'Order Deleted successfully' });
        });
    });

    it('should handle error when deleting order', () => {
      const mockOrderId = 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6';
      const mockError = new Error('Internal server error');

      (commonOrderService.deleteOrderById as jest.Mock).mockRejectedValue(mockError);

      req.params = { orderId: mockOrderId };

      return controller.deleteOrder(req as Request, res as Response)
        .then(() => {
          expect(commonOrderService.deleteOrderById).toHaveBeenCalledWith(mockOrderId);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
  });

  describe('getAllOrders', () => {
    it('should get all orders', () => {
      const mockOrders = [
        {
          orderName: 'Test Order',
          orderDescription: 'Test Description',
          themeModel: { type: 'lighting ' },
          giftModel: { type: 'Photo frame', size: 'large' },
          orderDate: new Date(),
          orderPrice: 29.99,
          orderAddress: '123 Main Street',
          orderPhone: '123-456-7890',
          orderEmail: 'test@example.com',
          orderId: 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6',
        }
      ];

      (OrderService.getAllOrders as jest.Mock).mockResolvedValue(mockOrders);

      return controller.getAllOrders(req as Request, res as Response)
        .then(() => {
          expect(OrderService.getAllOrders).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockOrders);
        });
    });

    it('should handle error when getting orders', () => {
      const mockError = new Error('Internal server error');

      (OrderService.getAllOrders as jest.Mock).mockRejectedValue(mockError);

      return controller.getAllOrders(req as Request, res as Response)
        .then(() => {
          expect(OrderService.getAllOrders).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
  });
});
