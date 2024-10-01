import { Request, Response } from "express";
import userOrderService from "../services/userOrdersService";
import { INTERNAL_SERVER_ERROR, ORDER_ADDED_SUCESSFULY, ORDER_DELETED_SUCCESSFULLY, ORDER_NOT_FOUND, ORDER_UPDATED_SUCCESSFULLY } from "../constants/orderConstant";
import commonOrderService from "../services/commonOrderService";

const addOrder = (request: Request, response: Response) => {
    const order = request.body;
    return userOrderService.addOrder(order)
        .then(() => response.status(200).json({ success: ORDER_ADDED_SUCESSFULY }))
        .catch(() => response.status(500).json({ error: INTERNAL_SERVER_ERROR }));
};

const editOrderById = (request: Request, response: Response) => {
    const orderId = request.params.orderId;
    const orderBody = request.body;
    return commonOrderService.editOrderById(orderId, orderBody)
        .then(() => response.status(200).json({ success: ORDER_UPDATED_SUCCESSFULLY }))
        .catch(error => {
            if(error.message === ORDER_NOT_FOUND) response.status(404).json({ error: ORDER_NOT_FOUND });
            response.status(500).json({ error: INTERNAL_SERVER_ERROR });
        });
};

const deleteOrderById = (request: Request, response: Response) => {
    const orderId = request.params.orderId;
    return commonOrderService.deleteOrderById(orderId)
        .then(() => response.status(200).json({ success: ORDER_DELETED_SUCCESSFULLY }))
        .catch(error => {
            if(error.message === ORDER_NOT_FOUND) response.status(404).json({ error: ORDER_NOT_FOUND });
            response.status(500).json({ error: INTERNAL_SERVER_ERROR });
        });
};

const userOrderController = {
    addOrder,
    editOrderById,
    deleteOrderById
};

export default userOrderController;
