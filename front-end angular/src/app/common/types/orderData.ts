export default interface OrderData {
    orderName: string,
    orderDescription: string,
    themeModel: object,
    giftModel: object,
    orderDate: string | null | undefined,
    orderPrice: number,
    orderAddress: string,
    orderPhone: number | string,
    orderEmail: string,
    orderStatus: string,
    orderUpdatedBy: string
}