import request from 'supertest'
import { Response } from 'supertest'
import app from '../src/index'
import { gift } from '../src/types/gifts';

const giftData :gift = {
  giftId : "1",
  giftName: 'candel',
  giftImageUrl: 'candel.jpg',
  giftDetails: 'light source',
  giftPrice: 20
};

describe('Admin Gifts Routes', () => {

    it('get all gifts', () => {
      return request(app)
        .get('/admin')
        .then((response:Response) => {
          expect(response.status).toBe(200);
        });
    });
  
    it('Create a new gift', () => {
      
      return request(app)
        .post('/admin')
        .send(giftData)
        .then(response => {
          expect(response.status).toBe(400);
        });
    });
  
    it('Find a gift by ID', () => {
      const giftId = "1";
      return request(app)
        .get(`/admin/${giftId}`)
        .then(response => {
          expect(response.status).toBe(500);
        });
    });
  
    it('Update a gift', () => {
      const giftId = "1";
      return request(app)
        .put(`/admin/${giftId}`)
        .send(giftData)
        .then(response => {
          expect(response.status).toBe(400);
        });
    });
  
    it('Delete a gift', () => {
      const giftId = "1";
      return request(app)
        .delete(`/admin/${giftId}`)
        .then(response => {
          expect(response.status).toBe(500);
        });
    });
  });