type ThemeModel = {
    themeName: string;
    themeDetails: string;
    themePrice: number;
};

type GiftModel = {
    giftId: string;
    giftName: string;
    giftImageUrl: string;
    giftDetails: string;
    giftPrice: number;
};

export type Order = {
    orderId: string;
    orderName: string;
    orderDescription: string;
    themeModel: ThemeModel;
    giftModel: GiftModel;
    orderDate: string;
    orderPrice: string;
    orderAddress: string;
    orderPhone: string;
    orderEmail: string;
    createdAt: string;
    updatedAt: string;
    orderStatus: string;
};