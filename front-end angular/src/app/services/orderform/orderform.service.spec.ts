import { TestBed } from '@angular/core/testing';

import { OrderformService } from './orderform.service';

describe('OrderformService', () => {
  let service: OrderformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
