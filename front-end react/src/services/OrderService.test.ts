import axios from "axios";
import { getAllOrders, updateOrder, deleteOrder } from "./OrderService";

jest.mock("axios");

describe("OrderService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAllOrders should fetch all orders", async () => {
    const mockOrders = [
      {
        orderId: "1",
        orderName: "Order 1",
        orderDescription: "Description of Order 1",
        themeModel: { themeId: "1", themeName: "Theme 1",  themeDetails: "Details about Theme 1",
        themePrice: 50 },
        giftModel: { giftId: "1", giftName: "Gift 1", giftImageUrl:"https://example.com/images/gifts/wool-scarf.jpg", giftDetails:"This is a beautiful, handmade wool scarf. It's warm and soft, perfect for winter!", giftPrice:25 },
        orderDate: "2024-04-02",
        orderPrice: 100,
        orderAddress: "123 Main St",
        orderPhone: "123-456-7890",
        orderEmail: "example@example.com",
        orderUpdatedBy: "Admin",
        updatedAt: "2024-04-02T12:00:00.000Z",
        createdAt: "2024-04-02T12:00:00.000Z",
      },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockOrders });

    const response = await getAllOrders();

    expect(response).toEqual({ data: mockOrders });
    expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/admin/getAllOrders");
  });

  it("updateOrder should update an order", async () => {
    const mockOrder = {
      orderId: "1",
      orderName: "Order 1",
      orderDescription: "Description of Order 1",
      themeModel: { themeId: "1", themeName: "Theme 1",  themeDetails: "Details about Theme 1",
      themePrice: 50 },
      giftModel: { giftId: "1", giftName: "Gift 1", giftImageUrl:"https://example.com/images/gifts/wool-scarf.jpg", giftDetails:"This is a beautiful, handmade wool scarf. It's warm and soft, perfect for winter!", giftPrice:25 },
      orderDate: "2024-04-02",
      orderPrice: "100",
      orderAddress: "123 Main St",
      orderPhone: "123-456-7890",
      orderEmail: "example@example.com",
      orderUpdatedBy: "Admin",
      updatedAt: "2024-04-02T12:00:00.000Z",
      createdAt: "2024-04-02T12:00:00.000Z",
      orderStatus: "pending",
    };
    (axios.put as jest.Mock).mockResolvedValueOnce({});

    const response = await updateOrder(mockOrder);

    expect(response).toEqual({});
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:4000/admin/editOrder/1",
      mockOrder
    );
  });

  it("deleteOrder should delete an order", async () => {
    const orderId = "1";
    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    const response = await deleteOrder(orderId);

    expect(response).toEqual({});
    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:4000/admin/deleteOrder/1"
    );
  });
});
