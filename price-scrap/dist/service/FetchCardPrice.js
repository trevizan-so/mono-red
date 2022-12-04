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
const axios_1 = require("axios");
const utils_1 = require("../utils");
const html_entities_1 = require("html-entities");
const LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM = "https:\/\/www.ligamagic.com.br/?view=cards/card&card=";
const ID_POSITION_IN_CARD_DATA = 7;
const SET_POSITION_IN_CARD_DATA = 5;
const SET_ALIAS_IN_CARD_DATA = 3;
const LOWEST_PRICE = "precoMenor";
const MEAN_PRICE = "precoMedio";
const HIGHEST_PRICE = "precoMaior";
const CARD_DATA_REGEX = /vetPorEdicao\[\d+\]=(\[["\w\d,.\\\/ \(\)-:\&\#;]{2,}])/g;
const CARD_PRICE_REGEX = /g_avgprice='(\{[\d\w" :\{\},.]+})'/;
const getCardPageHTML = (cardName) => __awaiter(void 0, void 0, void 0, function* () {
    const cardPageUrl = LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM + (0, utils_1.formatStringToUrlParam)(cardName);
    const config = {
        headers: {
            'accept-encoding': '*'
        }
    };
    try {
        const response = yield axios_1.default.get(cardPageUrl, config);
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
});
const formatPrice = (rawPriceData, rawSetData) => {
    const getParam = (param) => Object.values(rawPriceData)[Object.keys(rawPriceData).indexOf(param)];
    const getNestedParam = (father, son) => Object.values(getParam(father))[Object.keys(getParam(father)).indexOf(son)];
    const cardIds = Object.keys(rawPriceData);
    const output = cardIds.map(id => {
        var _a, _b;
        const price = {
            id: id,
            set: (0, html_entities_1.decode)((_a = rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)) === null || _a === void 0 ? void 0 : _a[SET_POSITION_IN_CARD_DATA]),
            setAbreviation: (0, html_entities_1.decode)((_b = rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)) === null || _b === void 0 ? void 0 : _b[SET_ALIAS_IN_CARD_DATA]),
            lowestPrice: Number(getNestedParam(id, LOWEST_PRICE)),
            meanPrice: Number(getNestedParam(id, MEAN_PRICE)),
            highestPrice: Number(getNestedParam(id, HIGHEST_PRICE)),
        };
        return price;
    });
    return output;
};
const fetchCardPrice = (cardName) => __awaiter(void 0, void 0, void 0, function* () {
    let output = [];
    try {
        const pageHTML = yield getCardPageHTML(cardName);
        const cardData = [...pageHTML.matchAll(CARD_DATA_REGEX)].map((setRow) => JSON.parse(setRow[1]));
        const cardPrice = JSON.parse(pageHTML.match(CARD_PRICE_REGEX)[1]);
        output = formatPrice(cardPrice, cardData);
    }
    catch (e) {
        console.log("Carta nao encontrada lekson");
    }
    return output;
});
exports.default = fetchCardPrice;
//# sourceMappingURL=FetchCardPrice.js.map