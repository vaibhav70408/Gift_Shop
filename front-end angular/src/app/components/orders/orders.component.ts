import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Order } from '../../common/types/myOrdersData';
import { OrderService } from '../../services/myOrders/myorders.service';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OptionalOrder} from '../../common/types/myOrdersData';

@Component({
  selector: 'app-orders',
  standalone:true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [MessageService],
  imports: [ FormsModule ,CommonModule , ToastModule, TableModule, DropdownModule ],

})

export class OrdersComponent implements OnInit {
  orders!: Order[];
  statuses!: SelectItem[];
  clonedOrders: { [s: string]: Order } = {};

  constructor(private orderService: OrderService, private messageService: MessageService) {}

  ngOnInit() {
      this.orderService.getAllOrders().subscribe(orders => {
        this.orders = orders;
      });

      this.statuses = [
          { label: 'Confirmed', value: 'confirmed' },
          { label: 'Pending', value: 'pending' },
          { label: 'Processing', value: 'processing' },
          { label: 'Dispatched', value: 'dispatched'},
          { label: 'Delivered', value: 'delivered' },
          { label: 'Cancelled', value: 'cancelled'}
      ];
  }

  onRowEditInit(order: Order) {
      this.clonedOrders[order.orderId] = {...order};
  }

  onRowEditSave(order: Order) {
    let updatedOrder: OptionalOrder = {...order}; 
    delete updatedOrder.createdAt; 
    delete updatedOrder.updatedAt; 

    this.orderService.updateOrder(updatedOrder as Order).subscribe(updatedOrder => {
        delete this.clonedOrders[order.orderId];
        this.messageService.add({severity:'success', summary:'Success', detail:'Order is updated'});
    }, error => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Update failed'});
    });
}

onDeleteOrder(order: Order) {
  this.orderService.deleteOrder(order.orderId).subscribe(response => {
      this.orders = this.orders.filter(o => o.orderId !== order.orderId);
      this.messageService.add({severity:'success', summary:'Success', detail:'Order is deleted'});
  }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Delete operation failed'});
  });
}
  onRowEditCancel(order: Order, index: number) {
      this.orders[index] = this.clonedOrders[order.orderId];
      delete this.clonedOrders[order.orderId];
  }
}