import axios from "axios";
import { Order } from "../common/types/orderData";


const getAllOrders = () => {
    return axios.get('http://localhost:4000/admin/getAllOrders')
        .then((response) => {
            return response
        })
}

const updateOrder = (data: Order) => {
    return axios.put(`http://localhost:4000/admin/editOrder/${data.orderId}`, data).then((response) => {
        return response
    }
    )
}


const deleteOrder = (orderId: string) => {
    return axios.delete(`http://localhost:4000/admin/deleteOrder/${orderId}`);
};
export { getAllOrders, updateOrder, deleteOrder };