import { Pricingrules } from "./pricingRule";

export class Checkout {
    pricingRules: Pricingrules;
    scannedItems: { [k: string]: number }; // A map from item Sku to no of items in cart.

    constructor(pricingRules: Pricingrules) {
        this.pricingRules = pricingRules;
        this.scannedItems = {};
    }

    public scan(itemSku: string): void {
        if (this.scannedItems[itemSku]) {
            this.scannedItems[itemSku] += 1;
            return;
        }
        this.scannedItems[itemSku] = 1;
        return;
    }

    public total(): number {
        let total = 0;
        for (let sku of Object.keys(this.scannedItems)) {
            total += this.pricingRules.calculateItemTotal(sku, this.scannedItems[sku]);
        }
        return total;
    }

    public clear(): void {
        this.scannedItems = {};
        return;
    }
}
