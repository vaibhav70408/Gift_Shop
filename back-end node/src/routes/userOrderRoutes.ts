import express from 'express';
import userOrderController from '../controller/userOrderController';
import { orderValidation } from '../middleware/validators/orderValidation';
const userOrderRouter = express.Router();

userOrderRouter.post('/addOrder', orderValidation, userOrderController.addOrder);
userOrderRouter.put('/editOrder/:orderId', orderValidation, userOrderController.editOrderById);
userOrderRouter.delete('/deleteOrder/:orderId', userOrderController.deleteOrderById);

export default userOrderRouter;
