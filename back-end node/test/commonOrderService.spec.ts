import Order from '../src/types/order';
import OrderAttributes from '../src/model/orderModel';
import commonOrderService from '../src/services/commonOrderService'
import { ORDER_NOT_FOUND } from '../src/constants/orderConstant';

const mockedOrder: Order = {
    orderId: "aacd4854-05bc-4ad9-85a4-855f049c5fad", 
    orderName: "Order A",
    orderDescription: "This is the first order",
    themeModel: {
        themeId: "8b86189e-09ba-4f94-973e-6898f75b6453",
        themeName: "Theme One",
        themeDetails: "Details for Theme One",
        themePrice: 100
    },
    giftModel: {
        giftId: "c01fada7-2628-4033-87cf-50f3e90d94ac",
        giftName: "Gift One",
        giftImageUrl: "http://example.com/gift1.jpg",
        giftDetails: "This is a description for Gift One",
        giftPrice: 30
    },
    orderDate: new Date('2022-01-01'),
    orderPrice: 150.00,
    orderAddress: "123 Main Street",
    orderPhone: "555-5555",
    orderEmail: "order@example.com"
};

jest.mock('../src/model/orderModel');

describe("userOrderService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should edit an existing order", done => {
        const orderId = "orderId1";
        const updatedOrderData: Order = { ...mockedOrder };
        (OrderAttributes.findByPk as jest.Mock).mockResolvedValue(true);
        (OrderAttributes.update as jest.Mock).mockResolvedValue([1]);

        commonOrderService.editOrderById(orderId, updatedOrderData)
            .then((result) => {
                expect(result).toEqual([1]);
                expect(OrderAttributes.findByPk).toHaveBeenCalledWith(orderId);
                expect(OrderAttributes.update).toHaveBeenCalledWith(updatedOrderData, { where: { orderId } });
                done();
            });
    });

    it("should throw an error when editing nonexisting order", done => {
        const orderId = "orderId1";
        const updatedOrderData: Order = { ...mockedOrder }; // your updated order data
        (OrderAttributes.findByPk as jest.Mock).mockResolvedValue(null);

        commonOrderService.editOrderById(orderId, updatedOrderData)
            .catch((error) => {
                expect(error).toEqual(new Error(ORDER_NOT_FOUND));
                expect(OrderAttributes.findByPk).toHaveBeenCalledWith(orderId);
                done();
            });
    });

    it("should delete an existing order", done => {
        const orderId = "orderId1";
        (OrderAttributes.findByPk as jest.Mock).mockResolvedValue(true);
        (OrderAttributes.destroy as jest.Mock).mockResolvedValue(1);

        commonOrderService.deleteOrderById(orderId)
            .then((result) => {
                expect(result).toEqual(1);
                expect(OrderAttributes.findByPk).toHaveBeenCalledWith(orderId);
                expect(OrderAttributes.destroy).toHaveBeenCalledWith({ where: { orderId } });
                done();
            });
    });

    it("should throw an error when deleting nonexisting order", done => {
        const orderId = "orderId1";
        (OrderAttributes.findByPk as jest.Mock).mockResolvedValue(null);

        commonOrderService.deleteOrderById(orderId)
            .catch((error) => {
                expect(error).toEqual(new Error(ORDER_NOT_FOUND));
                expect(OrderAttributes.findByPk).toHaveBeenCalledWith(orderId);
                done();
            });
    });
});