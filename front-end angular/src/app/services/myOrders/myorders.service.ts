import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../common/types/myOrdersData';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(private httpClient: HttpClient) {  }

	getAllOrders(): Observable<Order[]> {
		return this.httpClient.get<Order[]>('http://localhost:4000/admin/getAllOrders');
	}

	updateOrder(order: Order): Observable<Order> {
		return this.httpClient.put<Order>(`http://localhost:4000/admin/editOrder/${order.orderId}`, order);
	}

	deleteOrder(orderId: string): Observable<void> {
		return this.httpClient.delete<void>(`http://localhost:4000/admin/deleteOrder/${orderId}`);
	}
}