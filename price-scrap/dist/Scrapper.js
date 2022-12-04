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
const puppeteer = require("puppeteer");
const formatUrlParam_1 = require("./utils/formatUrlParam");
const html_entities_1 = require("html-entities");
const LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM = "https:\/\/www.ligamagic.com.br/?view=cards/card&card=";
const LIGA_MAGIC_PRICE_VARIABLE = "g_avgprice";
const LIGA_MAGIC_SET_VARIABLE = "vetPorEdicao";
const ID_POSITION_IN_CARD_DATA = 7;
const SET_POSITION_IN_CARD_DATA = 5;
const LOWEST_PRICE = "precoMenor";
const MEAN_PRICE = "precoMedio";
const HIGHEST_PRICE = "precoMaior";
class MagicSiteScrapper {
    constructor() {
    }
    ;
    formatPrice(rawPriceData, rawSetData) {
        const getParam = (param) => Object.values(rawPriceData)[Object.keys(rawPriceData).indexOf(param)];
        const getNestedParam = (father, son) => Object.values(getParam(father))[Object.keys(getParam(father)).indexOf(son)];
        const cardIds = Object.keys(rawPriceData);
        const output = cardIds.map(id => {
            var _a;
            const price = {
                id: id,
                set: (0, html_entities_1.decode)((_a = rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)) === null || _a === void 0 ? void 0 : _a[SET_POSITION_IN_CARD_DATA]),
                lowestPrice: Number(getNestedParam(id, LOWEST_PRICE)),
                meanPrice: Number(getNestedParam(id, MEAN_PRICE)),
                highestPrice: Number(getNestedParam(id, HIGHEST_PRICE)),
            };
            return price;
        });
        return output;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer.launch();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser.close();
        });
    }
    getPrice(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardName = input.cardName;
            const cardPageAtLigaMagic = LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM + (0, formatUrlParam_1.default)(cardName);
            try {
                const page = yield this.browser.newPage();
                yield page.goto(cardPageAtLigaMagic);
                const cardData = yield page.evaluate((priceName, setName) => {
                    const getParam = (param) => Object.values(window)[Object.keys(window).indexOf(param)];
                    const price = JSON.parse(String(getParam(priceName)));
                    const data = Array.from(Object(getParam(setName)));
                    return { price, data };
                }, LIGA_MAGIC_PRICE_VARIABLE, LIGA_MAGIC_SET_VARIABLE);
                return this.formatPrice(cardData.price, cardData.data);
            }
            catch (e) {
                console.error(e);
                return false;
            }
        });
    }
}
exports.default = MagicSiteScrapper;
//# sourceMappingURL=Scrapper.js.map