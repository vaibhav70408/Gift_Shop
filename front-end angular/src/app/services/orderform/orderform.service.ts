import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import OrderPlacedResponse from '../../common/types/orderPlacedResponse';
import OrderData from '../../common/types/orderData';

@Injectable({
  providedIn: 'root'
})
export class OrderformService {

  constructor(private http: HttpClient) { }

  addOrder(orderData: OrderData) {
    const url = `http://localhost:4000/user/addOrder/`;
    return this.http.post<OrderPlacedResponse>(url, orderData);
  }
}
