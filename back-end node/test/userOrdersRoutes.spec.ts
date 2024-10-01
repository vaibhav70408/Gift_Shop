import request from 'supertest';
import express from 'express';
import userOrderRouter from '../src/routes/userOrderRoutes';

const app = express();
app.use(express.json());
app.use('/order', userOrderRouter);  // mount the route to be tested

describe('POST /order/addOrder', () => {
    it('should create a new order and return 200 status', done => {
        const newOrder = { /* order details */ };

        request(app)
            .post('/order/addOrder')
            .send(newOrder)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('success');
                done();
            });
    });
});

describe('PUT /order/editOrder/:orderId', () => {
    it('should edit the order and return 200 status', done => {
        const orderId = 'id1';
        const updatedOrder = { /* updated order details */ };

        request(app)
            .put(`/order/editOrder/${orderId}`)
            .send(updatedOrder)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('success');
                done();
            });
    });
});

describe('DELETE /order/deleteOrder/:orderId', () => {
    it('should delete the order and return 200 status', done => {
        const orderId = 'id1';

        request(app)
            .delete(`/order/deleteOrder/${orderId}`)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('success');
                done();
            });
    });
});