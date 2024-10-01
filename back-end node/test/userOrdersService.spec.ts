import Order from '../src/types/order';
import OrderAttributes from '../src/model/orderModel';
import userOrderService from '../src/services/userOrdersService';

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

    it("should add an order", done => {
        const newOrder: Order = { ...mockedOrder };
        (OrderAttributes.create as jest.Mock).mockResolvedValue(newOrder);

        userOrderService.addOrder(newOrder)
            .then((result) => {
                expect(result).toEqual(newOrder);
                expect(OrderAttributes.create).toHaveBeenCalledWith(newOrder);
                done();
            });
    });
});