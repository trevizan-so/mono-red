// EXTREMAMENTE FOFO E EU ADOREI MAS USA MTO RECURSO COMPUTACIONAL POR CONTA DO PUPPETEER,
// VOU DEIXAR COMENTADO MAS MANO QUE CLASSE LINDINHA



// import * as puppeteer from "puppeteer";
// import { InputData, OutputData, CardPrice } from "../dto";
// import getObjectParamValue from "../utils/getObjectParamValue";
// import formatStringToUrlParam from "../utils/formatUrlParam";
// import { decode } from "html-entities";


// ------------------ index.ts -----------------------------------------
// import MagicSiteScrapper from "./service/PuppeterService"; // legado dessa criança fo
// (async () => {

    // fetchCardPrice("Shatterskudl Smashing")

    // console.log("rodando saporra")
    // await scrapper.start();
    // const card: InputData = {
    //     cardName: "Shatterskull Smashing",
    //     isFoil: false
    // }

    // // o role todo de o getPrice instanciar uma nova janela é pesquisar todas as cartas simultanemante (indexador do pc que lute)
    // // ou em paginacao ( 50 de cada vez, sei la) e esperar o resolveAll
    // const data = await scrapper.getPrice(card);

    // console.log(data);
    // await scrapper.stop();
// })();
// ------------------  -----------------------------------------




//#define ou tacar em um enum 
// const LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM = "https:\/\/www.ligamagic.com.br/?view=cards/card&card=";
// const LIGA_MAGIC_PRICE_VARIABLE = "g_avgprice";
// const LIGA_MAGIC_SET_VARIABLE = "vetPorEdicao";
// const ID_POSITION_IN_CARD_DATA = 7;
// const SET_POSITION_IN_CARD_DATA = 5;
// const SET_ALIAS_IN_CARD_DATA = 3;
// const LOWEST_PRICE = "precoMenor";
// const MEAN_PRICE = "precoMedio";
// const HIGHEST_PRICE = "precoMaior";


// class MagicSiteScrapper {
//     browser: puppeteer.Browser;
//     constructor() {
//     };

//     //ignorar foil por enqunato
//     private formatPrice(rawPriceData: JSON, rawSetData: []): CardPrice[] {
//         // isso tudo aqui por que o typescript nao permite Obj["paramentro"] -> sei que tem formas melhores preciso estudar
//         const getParam = (param: string) => Object.values(rawPriceData)[Object.keys(rawPriceData).indexOf(param)];
//         const getNestedParam = (father: string, son: string) => Object.values(getParam(father))[Object.keys(getParam(father)).indexOf(son)]
//         const cardIds = Object.keys(rawPriceData);
//         const output = cardIds.map(id => {
//             const price: CardPrice = {
//                 id: id,
//                 set: decode(rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)?.[SET_POSITION_IN_CARD_DATA]),
//                 setAbreviation: decode(rawSetData.find(row => row[ID_POSITION_IN_CARD_DATA] == id)?.[SET_ALIAS_IN_CARD_DATA]),
//                 lowestPrice: Number(getNestedParam(id, LOWEST_PRICE)),
//                 meanPrice: Number(getNestedParam(id, MEAN_PRICE)),
//                 highestPrice: Number(getNestedParam(id, HIGHEST_PRICE)),
//             }
//             return price;
//         })
//         return output;
//     }

//     public async start(): Promise<void> {
//         this.browser = await puppeteer.launch();
//     }

//     public async stop(): Promise<void> {
//         this.browser.close();
//     }

//     public async getPrice(input: InputData) {
//         const cardName = input.cardName;
//         const cardPageAtLigaMagic = LIGA_MAGIC_CARD_PAGE_URL_WITH_PARAM + formatStringToUrlParam(cardName);
//         try {

//             const page = await this.browser.newPage();
//             await page.goto(cardPageAtLigaMagic);


//             const cardData = await page.evaluate((priceName, setName) => {
//                 const getParam = (param: string) => Object.values(window)[Object.keys(window).indexOf(param)];
//                 // velho que role por conta da tipagem do window
//                 const price = JSON.parse(String(getParam(priceName)));
//                 const data = Array.from(Object(getParam(setName)));
//                 return { price, data };
//             }, LIGA_MAGIC_PRICE_VARIABLE, LIGA_MAGIC_SET_VARIABLE);
//             return this.formatPrice(cardData.price, <[]>cardData.data);

//         } catch (e) {
//             console.error(e)
//             return false
//         }

//     }
// }

// export default MagicSiteScrapper;


