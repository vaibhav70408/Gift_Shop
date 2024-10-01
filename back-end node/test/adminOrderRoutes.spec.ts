import request from 'supertest';
import express, { Request, Response } from 'express';
import adminOrderController from '../src/controller/adminOrderController';
import router from '../src/routes/adminOrderRoutes';

jest.mock('../src/controller/adminOrderController');

const app = express();
app.use(express.json());
app.use('/api', router);

const mockOrder = {
  orderId: 'df74c504-a15e-4c7a-8da4-bd9aaabe77e6',
  orderName: 'Test Order',
  orderDescription: 'Test Description',
  themeModel: { type: 'lighting' },
  giftModel: { type: 'Photo frame', size: 'large' },
  orderDate: new Date(),
  orderPrice: 29.99,
  orderAddress: '123 Main Street',
  orderPhone: '123-456-7890',
  orderEmail: 'test@example.com',
};

describe('Admin Order Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/admin/getAllOrders', () => {
    it('should call adminOrderController.getAllOrders', () => {
      (adminOrderController.getAllOrders as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          return Promise.resolve(res.status(200).json([]));
        }
      );

      return request(app)
        .get('/api/admin/getAllOrders')
        .expect(200)
        .then(() => {
          expect(adminOrderController.getAllOrders).toHaveBeenCalled();
        });
    });
  });

  describe('PUT /api/admin/editOrder/:orderId', () => {
    it('should call adminOrderController.editOrder', () => {
      const mockRequest = { params: { orderId: mockOrder.orderId }, body: mockOrder } as unknown as Request;
      (adminOrderController.editOrder as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          return Promise.resolve(res.status(200).json({ message: 'Order updated successfully' }));
        }
      );

      return request(app)
        .put(`/api/admin/editOrder/${mockOrder.orderId}`)
        .send(mockOrder)
        .expect(200)
        .then(() => {
          expect(adminOrderController.editOrder).toHaveBeenCalledWith(mockRequest, expect.anything(), expect.anything());
        });
    });
  });

}
);
