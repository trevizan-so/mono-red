import axios from "axios";
import { CardPrice } from "../dto";
import { formatStringToUrlParam } from "../utils";
import { load } from "cheerio";
import { getObjectParamValue } from "../utils";
import { decode } from "html-entities";


//#DEFINE
const LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM = "https:\/\/www.ligamagic.com.br/?view=cards/card&card=";
const ID_POSITION_IN_CARD_DATA = 7;
const SET_POSITION_IN_CARD_DATA = 5;
const SET_ALIAS_IN_CARD_DATA = 3;
const LOWEST_PRICE = "precoMenor";
const MEAN_PRICE = "precoMedio";
const HIGHEST_PRICE = "precoMaior";

const CARD_DATA_REGEX = /vetPorEdicao\[\d+\]=(\[["\w\d,.\\\/ \(\)-:\&\#;]{2,}])/g
const CARD_PRICE_REGEX = /g_avgprice='(\{[\d\w" :\{\},.]+})'/

const getCardPageHTML = async (cardName: string) => {
    const cardPageUrl = LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM + formatStringToUrlParam(cardName);
    const config = {
        headers: {
            'accept-encoding': '*'
        }
    }
    try {
        const response = await axios.get(cardPageUrl, config)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

const formatPrice = (rawPriceData: JSON, rawSetData: any[]): CardPrice[] => {
    // isso tudo aqui por que o typescript nao permite Obj["paramentro"] -> sei que tem formas melhores preciso estudar
    const getParam = (param: string) => Object.values(rawPriceData)[Object.keys(rawPriceData).indexOf(param)];
    const getNestedParam = (father: string, son: string) => Object.values(getParam(father))[Object.keys(getParam(father)).indexOf(son)]
    const cardIds = Object.keys(rawPriceData);
    const output = cardIds.map(id => {
        const price: CardPrice = {
            id: id,
            set: decode(rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)?.[SET_POSITION_IN_CARD_DATA]),
            setAbreviation: decode(rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)?.[SET_ALIAS_IN_CARD_DATA]),
            lowestPrice: Number(getNestedParam(id, LOWEST_PRICE)),
            meanPrice: Number(getNestedParam(id, MEAN_PRICE)),
            highestPrice: Number(getNestedParam(id, HIGHEST_PRICE)),
        }
        return price;
    })
    return output;
}


const fetchCardPrice = async (cardName: string): Promise<CardPrice[]> => {
    let output: CardPrice[] = []
    try {
        const pageHTML = await getCardPageHTML(cardName);
        const cardData = [...pageHTML.matchAll(CARD_DATA_REGEX)].map((setRow: string[]) => JSON.parse(setRow[1]))
        const cardPrice = JSON.parse(pageHTML.match(CARD_PRICE_REGEX)[1])
        output = formatPrice(cardPrice, cardData);
    } catch (e) {
        // se nao conseguir fazer o Parse eh por que nao achou a carta ou o sistema ta fora
        console.log("Carta nao encontrada lekson");
    }
    return output;
}

export default fetchCardPrice;