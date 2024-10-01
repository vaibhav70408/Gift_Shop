import { ORDER_NOT_FOUND } from "../constants/orderConstant";
import OrderAttributes from "../model/orderModel";
import Order from "../types/order";

const editOrderById = (orderId: string, updatedData: Order) => {
    return OrderAttributes.findByPk(orderId)
        .then((order) => {
            if (!order) throw new Error(ORDER_NOT_FOUND);
            return OrderAttributes.update(updatedData, {
                where: { orderId }
            });
        });
};

const deleteOrderById = (orderId: string) => {
    return OrderAttributes.findByPk(orderId)
        .then((order) => {
            if (!order) throw new Error(ORDER_NOT_FOUND);
            return OrderAttributes.destroy({
                where: { orderId }
            });
        });
};

const commonOrderService = {
    editOrderById,
    deleteOrderById
};

export default commonOrderService;
