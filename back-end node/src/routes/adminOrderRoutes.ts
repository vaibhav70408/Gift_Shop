import express from 'express';
import adminOrderController from "../controller/adminOrderController";
import { orderValidation } from '../middleware/validators/orderValidation';
const router = express.Router();

router.get('/getAllOrders', adminOrderController.getAllOrders);
router.put('/editOrder/:orderId', orderValidation, adminOrderController.editOrder);
router.delete('/deleteOrder/:orderId', adminOrderController.deleteOrder);

export default router;
