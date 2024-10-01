import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Gift } from '../../common/types/gifts';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  giftModel: Gift = {
    giftId: '',
    giftName: '',
    giftImageUrl: '',
    giftDetails: '',
    giftPrice: 0
  };

  private http = inject(HttpClient);
  constructor() {}
  getGifts() {
    return this.http.get<Gift[]>('http://localhost:4000/user/getallGifts');
  }
}
