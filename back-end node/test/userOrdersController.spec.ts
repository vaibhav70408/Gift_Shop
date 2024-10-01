import userOrderService from "../src/services/userOrdersService";
import commonOrderService from "../src/services/commonOrderService";
import userOrderController from "../src/controller/userOrderController";
import { ORDER_NOT_FOUND, INTERNAL_SERVER_ERROR, ORDER_ADDED_SUCESSFULY, ORDER_DELETED_SUCCESSFULLY, ORDER_UPDATED_SUCCESSFULLY } from "../src/constants/orderConstant";
import { Request, Response } from "express";

jest.mock('../src/services/userOrdersService');
jest.mock('../src/services/commonOrderService');

describe('userOrderController', () => {
    const mockRequest: Partial<Request> = {
        params: {
            orderId: ''
        },
        body: {}
    };
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    } as Partial<Response>;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should add an order", done => {
        const order = {};
        mockRequest.body = order;
        (userOrderService.addOrder as jest.Mock).mockResolvedValue(undefined);

        userOrderController.addOrder(mockRequest as Request, mockResponse as Response)
            .then(() => {
                expect(userOrderService.addOrder).toHaveBeenCalledWith(order);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
                expect(mockResponse.json).toHaveBeenCalledWith({ success: ORDER_ADDED_SUCESSFULY });
                done();
            })
            .catch((err) => done(err));
    });

    it("should edit an order", done => {
        const order = {};
        mockRequest.body = order;
        (commonOrderService.editOrderById as jest.Mock).mockResolvedValue(undefined);

        userOrderController.editOrderById(mockRequest as Request, mockResponse as Response)
            .then(() => {
                expect(commonOrderService.editOrderById).toHaveBeenCalled();
                expect(mockResponse.status).toHaveBeenCalledWith(200);
                expect(mockResponse.json).toHaveBeenCalledWith({ success: ORDER_UPDATED_SUCCESSFULLY });
                done();
            })
            .catch((err) => done(err));
    });

    it("should delete an order", done => {
        const orderId = 'orderId1';
        mockRequest.params!.orderId = orderId;
        (commonOrderService.deleteOrderById as jest.Mock).mockResolvedValue({});

        userOrderController.deleteOrderById(mockRequest as Request, mockResponse as Response)
            .then(() => {
                expect(commonOrderService.deleteOrderById).toHaveBeenCalledWith(orderId);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
                expect(mockResponse.json).toHaveBeenCalledWith({ success: ORDER_DELETED_SUCCESSFULLY });
                done();
            })
            .catch((err) => done(err));
    });

    it("should return not found error when deletion is attempted with a non-existing order", done => {
        const orderId = 'orderId2';
        mockRequest.params!.orderId = orderId;
        (commonOrderService.deleteOrderById as jest.Mock).mockRejectedValue(new Error(ORDER_NOT_FOUND));

        userOrderController.deleteOrderById(mockRequest as Request, mockResponse as Response)
            .then(() => {
                expect(commonOrderService.deleteOrderById).toHaveBeenCalledWith(orderId);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
                expect(mockResponse.json).toHaveBeenCalledWith({ error: ORDER_NOT_FOUND });
                done();
            })
            .catch((err) => done(err));
    });

    it("should return internal server error when deletion fails with any other error", done => {
        const orderId = 'orderId3';
        mockRequest.params!.orderId = orderId;
        (commonOrderService.deleteOrderById as jest.Mock).mockRejectedValue(new Error());

        userOrderController.deleteOrderById(mockRequest as Request, mockResponse as Response)
            .then(() => {
                expect(commonOrderService.deleteOrderById).toHaveBeenCalledWith(orderId);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
                expect(mockResponse.json).toHaveBeenCalledWith({ error: INTERNAL_SERVER_ERROR });
                done();
            })
            .catch((err) => done(err));
    });
});