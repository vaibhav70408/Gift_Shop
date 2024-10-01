import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './myorders.service';
import { Order } from '../../common/types/myOrdersData';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  const order: Order = {
    orderId: 'uuid1', 
    orderName: 'Order1', 
    orderDescription: 'This is a description for Order1',
    themeModel: {
        themeName: 'ThemeOne',
        themeDetails: 'Details for Theme One',
        themePrice: 100
    },
    giftModel: {
        giftId: 'c01fada7-2628-4033-87cf-50f3e90d94ac',
        giftName: 'Gift1',
        giftImageUrl: 'https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg?auto=compress&cs=tinysrgb&w=600',
        giftDetails: 'This is a description for Gift1',
        giftPrice: 30
    },
    orderDate: '2022-01-01',
    orderPrice: '100.00',
    orderAddress: '123 Main St',
    orderPhone: '9876543210',
    orderEmail: 'order1@example.com',
    orderStatus: 'confirmed',
    orderUpdatedBy: 'admin1',
    createdAt: '2022-01-01',
    updatedAt: '2022-01-01'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ OrderService ],
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all orders using GET', () => {
    service.getAllOrders().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual([order]);
    });

    const req = httpMock.expectOne('http://localhost:4000/admin/getAllOrders');
    expect(req.request.method).toEqual('GET');
    req.flush([order]);
  });

  it('should update an order using PUT', () => {
    service.updateOrder(order).subscribe((data) => {
      expect(data).toEqual(order);
    });

    const req = httpMock.expectOne(`http://localhost:4000/admin/editOrder/${order.orderId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(order);  
  });

  it('should delete an order using DELETE', () => {
    const orderId = 'uuid1';

    service.deleteOrder(orderId).subscribe((data) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:4000/admin/deleteOrder/${orderId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });
});