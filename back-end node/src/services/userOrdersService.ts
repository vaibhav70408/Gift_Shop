import OrderAttributes from "../model/orderModel";
import Order from "../types/order";

const addOrder = (order: Order) => OrderAttributes.create(order);

const userOrderService = {
    addOrder
};

export default userOrderService;
