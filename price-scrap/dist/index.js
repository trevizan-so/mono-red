"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FetchCardPrice_1 = require("./service/FetchCardPrice");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        cardName: "Embercleave",
        isFoil: true,
    };
    const cardPrices = yield (0, FetchCardPrice_1.default)(input.cardName);
    const output = {
        cardName: input.cardName,
        searchTimestamp: new Date(Date.now()).toUTCString(),
        prices: input.set ? [cardPrices.find(price => price.setAbreviation === input.set)] : cardPrices,
    };
    console.log(output);
}))();
//# sourceMappingURL=index.js.map