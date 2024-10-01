import { Request, Response } from 'express';
import OrderService from '../services/adminOrderServices';
import {
  ORDER_UPDATED_SUCCESSFULLY,
  ORDER_DELETED_SUCCESSFULLY,
  INTERNAL_SERVER_ERROR
} from '../constants/orderConstant';
import commonOrderService from '../services/commonOrderService';

const editOrder = (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  return commonOrderService.editOrderById(orderId, req.body)
  
    .then(updatedOrder => { 
      res.status(200).json({ success: ORDER_UPDATED_SUCCESSFULLY });

    })
    .catch(error => {
      res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    });
}

const deleteOrder = (req: Request, res: Response) => {
  const orderId = req.params.orderId; 

  return commonOrderService.deleteOrderById(orderId)
    .then(() => {
      
      res.status(204).send({success: ORDER_DELETED_SUCCESSFULLY});
    })
    .catch(error => {
      res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    });
}

const getAllOrders = (req: Request, res: Response) => {
  return OrderService.getAllOrders()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    });
}

export default {
  editOrder,
  deleteOrder,
  getAllOrders,
};
