import { Checkout } from "./checkout";
import { DealType } from "./deal";
import { Pricingrules, Item } from "./pricingRule";

const items = [new Item("op10", "Oneplus 10", 849.99),
new Item("op11", "Oneplus 11", 949.99),
new Item("buds", "Earbuds", 129.99),
new Item("wtch", "Smart Watch", 229.99)];

const budsdeal = {
    itemSku: "buds",
    dealType: DealType.xOfy,
    x: 3,
    y: 2,
    price: undefined
}
const op11deal = {
    itemSku: "op11",
    dealType: DealType.aboveX,
    x: 4,
    y: undefined,
    price: 899.99
}
const pricingRules = new Pricingrules();
pricingRules.bulkAddToCatalouge(items);
pricingRules.addDeal(budsdeal);
pricingRules.addDeal(op11deal);
const checkout = new Checkout(pricingRules);

// Case 1: 3 earbuds
console.log("Case 1: 3 earbuds");

checkout.scan("buds");
checkout.scan("buds");
checkout.scan("buds");
console.log("Expected Total: ", 2 * 129.99)
console.log("Total: ", checkout.total());
console.log("\n")

checkout.clear();



// Case 2: 5 op11
console.log("Case 2: 5 op11");

checkout.scan("op11");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("op11");
console.log("Expected Total: ", 5 * 899.99)
console.log("Total: ", checkout.total());
console.log("\n")

checkout.clear();


// Case 3 : buds, op10, buds, buds
console.log("Case 3: buds, op10, buds, buds");

checkout.scan("buds");
checkout.scan("op10");
checkout.scan("buds");
checkout.scan("buds");
console.log("Expected Total: ", 1109.97)
console.log("Total: ", checkout.total());
console.log("\n")

checkout.clear();

// Case 4 : wtch, op11, op11, op11, buds, buds, op11, op11
console.log("Case 4: wtch, op11, op11, op11, buds, buds, op11, op11");

checkout.scan("wtch");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("buds");
checkout.scan("buds");
checkout.scan("op11");
checkout.scan("op11");

console.log("Expected Total: ", 4989.92)
console.log("Total: ", checkout.total());
console.log("\n")

checkout.clear();

// Case 5 : wtch, wtch, op11, op11, buds, buds, op11, op11, buds, buds, op11, op11, buds, buds,
console.log("Case 5: wtch, wtch, op11, op11, buds, buds, op11, op11, buds, buds, op11, op11, buds, buds, op10");

checkout.scan("wtch");
checkout.scan("wtch");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("buds");
checkout.scan("buds");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("buds");
checkout.scan("buds");
checkout.scan("op11");
checkout.scan("op11");
checkout.scan("buds");
checkout.scan("buds");
checkout.scan("op10");

console.log("Expected Total: ", 2 * 229.99 + 6 * 899.99 + 4 * 129.99 + 849.99)
console.log("Total: ", checkout.total());
console.log("\n")

checkout.clear();
