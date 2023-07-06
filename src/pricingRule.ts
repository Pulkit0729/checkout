import { Deal, DealType } from "./deal";


export class Item {
    sku: string;
    name: string;
    price: number;
    constructor(sku: string, name: string, price: number) {
        this.sku = sku;
        this.name = name;
        this.price = price;
    }
}
export class Pricingrules {
    catalouge: Item[];
    deals: { [k: string]: Deal }; //A map for items sku to their deal
    constructor() {
        this.catalouge = [];
        this.deals = {};
    }
    public addToCatalouge(item: Item) {
        this.catalouge.push(item);
    }
    public bulkAddToCatalouge(items: Item[]) {
        for (let item of items) {
            this.catalouge.push(item);
        }
    }
    public addDeal(deal: Deal) {
        switch (deal.dealType) {
            case DealType.xOfy:
                if (!deal.y) {
                    throw new Error("Please provide y value")
                }
                break;
            case DealType.aboveX:
                if (!deal.price) {
                    throw new Error("Please provide price value")
                }
                break;
            default:
                break
        }

        return this.deals[deal.itemSku] = deal;
    }
    public calculateItemTotal(itemSku: string, noOfItems: number): number {
        for (let item of this.catalouge) {
            if (item.sku == itemSku) {//if item exist in catalouge
                if (this.deals[itemSku]) { //if item has a special deal
                    let deal = this.deals[itemSku];
                    switch (deal.dealType) {
                        case DealType.xOfy:
                            if (noOfItems >= deal.x) {
                                return item.price * (deal.y! * noOfItems / (deal.x) + noOfItems % deal.x);
                            }
                            return noOfItems * item.price;
                        case DealType.aboveX:
                            if (noOfItems > deal.x) {
                                return deal.price! * noOfItems;
                            }
                            return noOfItems * item.price;
                        default:
                            break
                    }
                }
                return noOfItems * item.price;
            }
        }
        return 0;
    }
}