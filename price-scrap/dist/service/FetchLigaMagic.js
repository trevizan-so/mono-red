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
const cardDataRegex = /vetPorEdicao\[\d+\] = (\[["\w\d,.\\\/ \(\)-:\&\#;]{2,}])/g;
const cardPriceRegex = /g_avgprice = '(\{[\d\w" :\{\},.]+})'/g;
const LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM = "https:\/\/www.ligamagic.com.br/?view=cards/card&card=";
const LIGA_MAGIC_PRICE_VARIABLE = "g_avgprice";
const LIGA_MAGIC_SET_VARIABLE = "vetPorEdicao";
const ID_POSITION_IN_CARD_DATA = 7;
const SET_POSITION_IN_CARD_DATA = 5;
const SET_ALIAS_IN_CARD_DATA = 3;
const LOWEST_PRICE = "precoMenor";
const MEAN_PRICE = "precoMedio";
const HIGHEST_PRICE = "precoMaior";
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
const fetchCardPrice = (cardName) => __awaiter(void 0, void 0, void 0, function* () {
    const pageHTML = yield getCardPageHTML(cardName);
    const cardData = pageHTML.matchAll(cardDataRegex);
    console.log(cardData);
    const output = [];
    return output;
});
exports.default = fetchCardPrice;
//# sourceMappingURL=FetchLigaMagic.js.map