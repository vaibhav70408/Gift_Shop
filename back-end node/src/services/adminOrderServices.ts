import OrderAttributes from '../model/orderModel';

const getAllOrders = () => {
  return OrderAttributes.findAll().catch((error) => {
    throw error;
  });
};

export default {
  getAllOrders
};
