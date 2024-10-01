import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { OrdersComponent } from './orders.component';
import { OrderService } from '../../services/myOrders/myorders.service';
import { Order, ThemeModel, GiftModel } from '../../common/types/myOrdersData';
import { MessageService } from 'primeng/api';
import { EMPTY } from 'rxjs';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let orderService: OrderService;
  let messageService: jasmine.SpyObj<MessageService>;

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
    let spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ OrdersComponent ],
      providers: [
        OrderService, 
        { provide: MessageService, useValue: spy }
      ]
    });

    component = TestBed.createComponent(OrdersComponent).componentInstance;
    orderService = TestBed.inject(OrderService);
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all orders on ngOnInit', () => {
    spyOn(orderService, 'getAllOrders').and.returnValue(of([order]));

    component.ngOnInit();

    expect(component.orders).toEqual([order]);
  });
  
  it('should clone order in onRowEditInit', () => {
    component.clonedOrders = {};
    component.onRowEditInit(order);
    expect(component.clonedOrders[order.orderId]).toEqual(order);
  });

  it('should update order in onRowEditSave and show success message', () => {
    spyOn(orderService, 'updateOrder').and.returnValue(of(order));

    component.onRowEditSave(order);

    expect(orderService.updateOrder).toHaveBeenCalledWith(order);
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Success', detail: 'Order is updated' });
  });

  it('should show error message when order update fails in onRowEditSave', () => {
    spyOn(orderService, 'updateOrder').and.returnValue(throwError({ status: 404 }));

    component.onRowEditSave(order);

    expect(orderService.updateOrder).toHaveBeenCalledWith(order);
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'Update failed' });
  });

  it('should remove order in onDeleteOrder and show success message', () => {
    spyOn(orderService, 'deleteOrder').and.returnValue(EMPTY); 

    component.onDeleteOrder(order);

    expect(orderService.deleteOrder).toHaveBeenCalledWith(order.orderId);
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Success', detail: 'Order is deleted' });
  });

  it('should show error message when order delete fails in onDeleteOrder', () => {
    spyOn(orderService, 'deleteOrder').and.returnValue(throwError({ status: 404 }));

    component.onDeleteOrder(order);

    expect(orderService.deleteOrder).toHaveBeenCalledWith(order.orderId);
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'Delete operation failed' });
  });

  it('should discard changes in onRowEditCancel', () => {
    const originalOrder: Order = { ...order };
    component.clonedOrders = { [order.orderId]: originalOrder };
    component.orders = [order];

    component.onRowEditCancel(order, 0);

    expect(component.orders[0]).toEqual(originalOrder);
    expect(component.clonedOrders[order.orderId]).toBeUndefined();
  });
});