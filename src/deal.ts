export enum DealType {
    xOfy = "xOfy",
    aboveX = "aboveX"
}
export interface Deal {
    itemSku: string,
    dealType: DealType,
    x: number,
    y: number | undefined,
    price: number | undefined,
}
